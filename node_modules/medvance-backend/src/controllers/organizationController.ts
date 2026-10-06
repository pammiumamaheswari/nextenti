import { Request, Response } from 'express';
import { Organization, ProfessionalProfile, Job, Application } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { AIService } from '../services/aiService.js';

export class OrganizationController {
  public static async getMyOrganization(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization profile not found', 404);
      return ApiResponse.success(res, org, 'Organization retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async updateOrganization(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      let org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization not found', 404);

      Object.assign(org, req.body);
      await org.save();

      return ApiResponse.success(res, org, 'Organization updated');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async searchCandidates(req: AuthRequest, res: Response) {
    try {
      const { profession, location, experienceMin, skills, availability, search } = req.query;
      const filter: any = {};

      if (profession && profession !== 'All') {
        filter.profession = new RegExp(profession as string, 'i');
      }
      if (location && location !== 'All') {
        filter.location = new RegExp(location as string, 'i');
      }
      if (experienceMin) {
        filter.experienceYears = { $gte: parseInt(experienceMin as string, 10) };
      }
      if (availability && availability !== 'All') {
        filter.availability = availability;
      }
      if (skills) {
        filter.skills = { $in: [(skills as string).split(',').map((s) => new RegExp(s.trim(), 'i'))] };
      }
      if (search) {
        const regex = new RegExp(search as string, 'i');
        filter.$or = [
          { headline: regex },
          { specialization: regex },
          { bio: regex },
          { skills: regex }
        ];
      }

      const candidates = await ProfessionalProfile.find(filter)
        .populate('userId', 'name email phone avatar isEmailVerified')
        .sort({ profileCompletion: -1, experienceYears: -1 })
        .limit(30)
        .lean();

      return ApiResponse.success(res, candidates, 'Candidates found');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getDashboardStats(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization not found', 404);

      const [activeJobs, totalApplications, shortlisted, hired] = await Promise.all([
        Job.countDocuments({ organizationId: org._id, status: 'ACTIVE' }),
        Application.countDocuments({ organizationId: org._id }),
        Application.countDocuments({ organizationId: org._id, status: 'SHORTLISTED' }),
        Application.countDocuments({ organizationId: org._id, status: 'HIRED' })
      ]);

      return ApiResponse.success(res, {
        activeJobs,
        totalApplications,
        shortlisted,
        hired,
        funnel: [
          { stage: 'Applied', count: totalApplications },
          { stage: 'Under Review', count: Math.round(totalApplications * 0.7) },
          { stage: 'Shortlisted', count: shortlisted },
          { stage: 'Interview', count: Math.round(shortlisted * 0.6) },
          { stage: 'Hired', count: hired }
        ]
      });
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
