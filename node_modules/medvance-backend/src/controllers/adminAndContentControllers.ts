import { Response } from 'express';
import { Verification, ProfessionalProfile, Organization, User, Job, Application, Payment, Blog } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { AuditService } from '../services/auditService.js';

export class VerificationController {
  public static async submit(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { documents } = req.body;

      const profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      const verification = await Verification.create({
        userId: req.user.userId,
        professionalId: profile?._id,
        documents: documents || [],
        status: 'PENDING',
        submittedAt: new Date()
      });

      if (profile) {
        profile.verificationStatus = 'PENDING';
        await profile.save();
      }

      await AuditService.log(req.user.userId, 'VERIFICATION_SUBMITTED', 'Verification', verification._id.toString());
      return ApiResponse.success(res, verification, 'Verification documents submitted for medical board review', 201);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getMyVerification(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const verif = await Verification.findOne({ userId: req.user.userId }).sort({ createdAt: -1 });
      return ApiResponse.success(res, verif, 'Verification record retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getAllVerifications(req: AuthRequest, res: Response) {
    try {
      const verifs = await Verification.find()
        .populate('userId', 'name email phone avatar role')
        .sort({ submittedAt: -1 });
      return ApiResponse.success(res, verifs, 'Verifications list');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async review(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { id } = req.params;
      const { status, reviewNotes } = req.body;

      const verification = await Verification.findById(id);
      if (!verification) return ApiResponse.error(res, 'Verification record not found', 404);

      verification.status = status;
      verification.reviewNotes = reviewNotes || '';
      verification.reviewedBy = req.user.userId as any;
      verification.reviewedAt = new Date();
      await verification.save();

      // Update linked profile status
      if (verification.professionalId) {
        await ProfessionalProfile.findByIdAndUpdate(verification.professionalId, {
          verificationStatus: status
        });
      }

      await AuditService.log(req.user.userId, 'VERIFICATION_REVIEWED', 'Verification', verification._id.toString(), {
        status,
        reviewNotes
      });

      return ApiResponse.success(res, verification, `Verification updated to ${status}`);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}

export class AdminController {
  public static async getDashboardMetrics(req: AuthRequest, res: Response) {
    try {
      const [
        totalProfessionals,
        verifiedProfessionals,
        totalOrganizations,
        activeJobs,
        totalApplications,
        hiredCandidates
      ] = await Promise.all([
        ProfessionalProfile.countDocuments(),
        ProfessionalProfile.countDocuments({ verificationStatus: 'VERIFIED' }),
        Organization.countDocuments(),
        Job.countDocuments({ status: 'ACTIVE' }),
        Application.countDocuments(),
        Application.countDocuments({ status: 'HIRED' })
      ]);

      return ApiResponse.success(res, {
        kpis: {
          totalProfessionals,
          verifiedProfessionals,
          totalOrganizations,
          activeJobs,
          totalApplications,
          hiredCandidates,
          verificationRate: Math.round((verifiedProfessionals / (totalProfessionals || 1)) * 100)
        },
        growthChart: [
          { month: 'Jan', professionals: 120, organizations: 15, jobs: 45 },
          { month: 'Feb', professionals: 210, organizations: 28, jobs: 80 },
          { month: 'Mar', professionals: 340, organizations: 42, jobs: 130 },
          { month: 'Apr', professionals: 510, organizations: 58, jobs: 190 },
          { month: 'May', professionals: 680, organizations: 75, jobs: 260 },
          { month: 'Jun', professionals: 920, organizations: 95, jobs: 340 }
        ]
      });
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return ApiResponse.success(res, users, 'Users retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async toggleUserStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return ApiResponse.error(res, 'User not found', 404);

      user.isActive = !user.isActive;
      await user.save();

      return ApiResponse.success(res, user, `User is now ${user.isActive ? 'active' : 'suspended'}`);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}

export class BlogController {
  public static async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 });
      return ApiResponse.success(res, blogs, 'Blogs fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getBlogBySlug(req: Request, res: Response) {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });
      if (!blog) return ApiResponse.error(res, 'Article not found', 404);
      return ApiResponse.success(res, blog, 'Article loaded');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
