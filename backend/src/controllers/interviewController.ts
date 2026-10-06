import { Response } from 'express';
import { Interview, Job, Organization, ProfessionalProfile, Notification } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { EmailService } from '../services/emailService.js';
import { io } from '../server.js';

export class InterviewController {
  public static async schedule(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { jobId, candidateId, date, startTime, endTime, type, meetingLink, location, notes } = req.body;

      const org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization not found', 404);

      const candidate = await ProfessionalProfile.findById(candidateId).populate('userId', 'name email _id');
      if (!candidate) return ApiResponse.error(res, 'Candidate profile not found', 404);

      const job = await Job.findById(jobId);
      if (!job) return ApiResponse.error(res, 'Job not found', 404);

      const interview = await Interview.create({
        jobId,
        candidateId,
        organizationId: org._id,
        scheduledBy: req.user.userId,
        date,
        startTime,
        endTime,
        type: type || 'Video Call',
        meetingLink: meetingLink || 'https://meet.medvance.ai/room-' + Math.random().toString(36).substring(7),
        location,
        notes
      });

      // Notify candidate
      const candidateUser = candidate.userId as any;
      if (candidateUser) {
        const notif = await Notification.create({
          userId: candidateUser._id,
          type: 'INTERVIEW_SCHEDULED',
          title: 'Clinical Interview Scheduled',
          message: `${org.name} scheduled your interview for ${job.title} on ${date} at ${startTime}.`,
          data: { interviewId: interview._id, jobId }
        });

        if (io) {
          io.to(`user_${candidateUser._id.toString()}`).emit('notification', notif);
        }

        EmailService.sendEmail(
          candidateUser.email,
          `Interview Scheduled: ${job.title} at ${org.name}`,
          EmailService.getTemplate('INTERVIEW_SCHEDULED', {
            candidateName: candidateUser.name,
            jobTitle: job.title,
            organizationName: org.name,
            date,
            startTime,
            endTime,
            type,
            meetingLink: interview.meetingLink
          })
        );
      }

      return ApiResponse.success(res, interview, 'Interview scheduled successfully', 201);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getMyInterviews(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);

      let filter: any = {};
      if (req.user.role === 'PROFESSIONAL') {
        const profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
        if (!profile) return ApiResponse.success(res, []);
        filter.candidateId = profile._id;
      } else {
        const org = await Organization.findOne({ ownerId: req.user.userId });
        if (!org) return ApiResponse.success(res, []);
        filter.organizationId = org._id;
      }

      const interviews = await Interview.find(filter)
        .populate('jobId', 'title department location')
        .populate('organizationId', 'name logo slug')
        .populate({
          path: 'candidateId',
          populate: { path: 'userId', select: 'name email phone avatar' }
        })
        .sort({ date: 1, startTime: 1 });

      return ApiResponse.success(res, interviews, 'Interviews fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async updateInterview(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const interview = await Interview.findByIdAndUpdate(id, req.body, { new: true });
      if (!interview) return ApiResponse.error(res, 'Interview not found', 404);
      return ApiResponse.success(res, interview, 'Interview updated');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
