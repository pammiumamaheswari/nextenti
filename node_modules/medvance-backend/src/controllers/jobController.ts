import { Request, Response } from 'express';
import { Job, Organization, ProfessionalProfile, SavedJob } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { AIService } from '../services/aiService.js';
import { AuditService } from '../services/auditService.js';

export class JobController {
  public static async getJobs(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const skip = (page - 1) * limit;

      const {
        search,
        profession,
        specialization,
        location,
        workMode,
        jobType,
        experienceMin,
        experienceMax,
        salaryMin,
        status = 'ACTIVE',
        sortBy = 'postedAt',
        sortOrder = 'desc'
      } = req.query;

      const filter: any = {};
      if (status !== 'ALL') {
        filter.status = status;
      }

      if (profession && profession !== 'All') {
        filter.profession = new RegExp(profession as string, 'i');
      }

      if (specialization) {
        filter.specialization = new RegExp(specialization as string, 'i');
      }

      if (location && location !== 'All Locations') {
        filter.location = new RegExp(location as string, 'i');
      }

      if (workMode && workMode !== 'All') {
        filter.workMode = workMode;
      }

      if (jobType && jobType !== 'All') {
        filter.jobType = jobType;
      }

      if (experienceMin) {
        filter.experienceMin = { $lte: parseInt(experienceMin as string, 10) };
      }

      if (salaryMin) {
        filter.salaryMax = { $gte: parseInt(salaryMin as string, 10) };
      }

      if (search) {
        const regex = new RegExp(search as string, 'i');
        filter.$or = [
          { title: regex },
          { description: regex },
          { skills: regex },
          { department: regex }
        ];
      }

      const sortOptions: any = {};
      sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

      const [jobs, total] = await Promise.all([
        Job.find(filter)
          .populate('organizationId', 'name logo slug verificationStatus locations organizationType')
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        Job.countDocuments(filter)
      ]);

      // If a logged-in healthcare professional is browsing, enrich each job with real-time AI Match score!
      let enrichedJobs = jobs;
      if (req.user && req.user.role === 'PROFESSIONAL') {
        const profile = await ProfessionalProfile.findOne({ userId: req.user.userId }).lean();
        if (profile) {
          enrichedJobs = jobs.map((job) => {
            const match = AIService.calculateMatch(profile, job);
            return {
              ...job,
              aiMatch: match
            };
          });
        }
      }

      return ApiResponse.paginated(res, enrichedJobs, page, limit, total, 'Jobs fetched successfully');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getJobById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const job = await Job.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }]
      }).populate('organizationId');

      if (!job) return ApiResponse.error(res, 'Job opportunity not found', 404);

      // Increment view count asynchronously
      job.viewCount += 1;
      await job.save();

      let aiMatch = null;
      let isSaved = false;

      if (req.user && req.user.role === 'PROFESSIONAL') {
        const profile = await ProfessionalProfile.findOne({ userId: req.user.userId }).lean();
        if (profile) {
          aiMatch = AIService.calculateMatch(profile, job);
        }
        const saved = await SavedJob.findOne({ userId: req.user.userId, jobId: job._id });
        isSaved = !!saved;
      }

      return ApiResponse.success(res, { job, aiMatch, isSaved }, 'Job details retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async createJob(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);

      const org = await Organization.findOne({ ownerId: req.user.userId });
      if (!org) return ApiResponse.error(res, 'Organization profile not found for user', 404);

      const {
        title,
        profession,
        specialization,
        department,
        description,
        responsibilities,
        requirements,
        qualifications,
        skills,
        experienceMin,
        experienceMax,
        salaryMin,
        salaryMax,
        salaryNegotiable,
        location,
        workMode,
        jobType,
        status = 'ACTIVE'
      } = req.body;

      const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;

      const newJob = await Job.create({
        organizationId: org._id,
        title,
        slug,
        profession,
        specialization,
        department,
        description,
        responsibilities: responsibilities || [],
        requirements: requirements || [],
        qualifications: qualifications || [],
        skills: skills || [],
        experienceMin: experienceMin || 0,
        experienceMax: experienceMax || 15,
        salaryMin: salaryMin || 0,
        salaryMax: salaryMax || 0,
        salaryNegotiable: salaryNegotiable ?? true,
        location,
        workMode: workMode || 'On-site',
        jobType: jobType || 'Full-time',
        status,
        postedAt: new Date()
      });

      await AuditService.log(req.user.userId, 'JOB_CREATED', 'Job', newJob._id.toString(), { title });

      return ApiResponse.success(res, newJob, 'Job posted successfully', 201);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async updateJob(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (!job) return ApiResponse.error(res, 'Job not found', 404);

      Object.assign(job, req.body);
      await job.save();

      return ApiResponse.success(res, job, 'Job updated successfully');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async toggleSavedJob(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { jobId } = req.params;

      const existing = await SavedJob.findOne({ userId: req.user.userId, jobId });
      if (existing) {
        await SavedJob.deleteOne({ _id: existing._id });
        return ApiResponse.success(res, { saved: false }, 'Job removed from saved list');
      } else {
        await SavedJob.create({ userId: req.user.userId, jobId });
        return ApiResponse.success(res, { saved: true }, 'Job saved successfully');
      }
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getSavedJobs(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const saved = await SavedJob.find({ userId: req.user.userId })
        .populate({
          path: 'jobId',
          populate: { path: 'organizationId', select: 'name logo locations' }
        })
        .sort({ createdAt: -1 });

      return ApiResponse.success(res, saved, 'Saved jobs fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
