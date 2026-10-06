import { Response } from 'express';
import { Application, Job, ProfessionalProfile, Organization, Notification } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { AIService } from '../services/aiService.js';
import { EmailService } from '../services/emailService.js';
import { AuditService } from '../services/auditService.js';
import { io } from '../server.js';

export class ApplicationController {
  public static async apply(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { jobId } = req.params;
      const { coverLetter, resumeUrl } = req.body;

      const profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      if (!profile) return ApiResponse.error(res, 'Professional profile required to apply', 400);

      const job = await Job.findById(jobId).populate('organizationId');
      if (!job) return ApiResponse.error(res, 'Job opportunity not found', 404);

      const existing = await Application.findOne({ jobId: job._id, professionalId: profile._id });
      if (existing) {
        return ApiResponse.error(res, 'You have already submitted an application for this role', 400);
      }

      // Compute deterministic match score
      const match = AIService.calculateMatch(profile, job);

      const application = await Application.create({
        jobId: job._id,
        professionalId: profile._id,
        organizationId: (job.organizationId as any)._id,
        status: 'APPLIED',
        coverLetter,
        resumeUrl: resumeUrl || profile.resumeUrl,
        matchScore: match.score,
        matchDetails: {
          matchedSkills: match.matchedSkills,
          missingSkills: match.missingSkills,
          reasons: match.reasons
        }
      });

      // Increment application count on Job
      job.applicationCount += 1;
      await job.save();

      // Send In-App & Real-Time Notification to Organization Owner
      const org = job.organizationId as any;
      if (org && org.ownerId) {
        const notif = await Notification.create({
          userId: org.ownerId,
          type: 'APPLICATION_SUBMITTED',
          title: 'New Candidate Applied',
          message: `${profile.headline || 'A candidate'} applied for ${job.title} (${match.score}% AI Match)`,
          data: { applicationId: application._id, jobId: job._id }
        });

        if (io) {
          io.to(`user_${org.ownerId.toString()}`).emit('notification', notif);
        }
      }

      await AuditService.log(req.user.userId, 'APPLICATION_SUBMITTED', 'Application', application._id.toString(), {
        jobTitle: job.title,
        orgName: org.name
      });

      return ApiResponse.success(res, application, 'Application successfully submitted', 201);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getMyApplications(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      if (!profile) return ApiResponse.success(res, [], 'No profile found');

      const applications = await Application.find({ professionalId: profile._id })
        .populate({
          path: 'jobId',
          populate: { path: 'organizationId', select: 'name logo locations slug' }
        })
        .sort({ appliedAt: -1 });

      return ApiResponse.success(res, applications, 'Applications fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getOrganizationApplications(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization not found', 404);

      const { jobId, status } = req.query;
      const filter: any = { organizationId: org._id };
      if (jobId) filter.jobId = jobId;
      if (status && status !== 'ALL') filter.status = status;

      const applications = await Application.find(filter)
        .populate('jobId', 'title department location workMode')
        .populate({
          path: 'professionalId',
          populate: { path: 'userId', select: 'name email phone avatar' }
        })
        .sort({ appliedAt: -1 });

      return ApiResponse.success(res, applications, 'Organization applications fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async updateApplicationStatus(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { id } = req.params;
      const { status, note } = req.body;

      const application = await Application.findById(id)
        .populate('jobId', 'title')
        .populate('organizationId', 'name')
        .populate({
          path: 'professionalId',
          populate: { path: 'userId', select: 'name email _id' }
        });

      if (!application) return ApiResponse.error(res, 'Application not found', 404);

      application.status = status;
      if (note) application.notes.push(note);
      await application.save();

      // Trigger candidate notification & email update
      const candidateUser = (application.professionalId as any)?.userId;
      if (candidateUser) {
        const notif = await Notification.create({
          userId: candidateUser._id,
          type: 'STATUS_CHANGED',
          title: 'Application Status Updated',
          message: `Your application for ${(application.jobId as any).title} at ${(application.organizationId as any).name} is now ${status}.`,
          data: { applicationId: application._id }
        });

        if (io) {
          io.to(`user_${candidateUser._id.toString()}`).emit('notification', notif);
        }

        EmailService.sendEmail(
          candidateUser.email,
          `Application Update: ${(application.jobId as any).title}`,
          EmailService.getTemplate('APPLICATION_STATUS', {
            candidateName: candidateUser.name,
            jobTitle: (application.jobId as any).title,
            organizationName: (application.organizationId as any).name,
            status
          })
        );
      }

      await AuditService.log(req.user.userId, 'APPLICATION_STATUS_UPDATED', 'Application', application._id.toString(), {
        newStatus: status
      });

      return ApiResponse.success(res, application, `Status updated to ${status}`);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
