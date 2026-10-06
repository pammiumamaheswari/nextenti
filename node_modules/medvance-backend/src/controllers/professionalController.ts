import { Response } from 'express';
import { ProfessionalProfile, User } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { StorageService } from '../services/storageService.js';

export class ProfessionalController {
  public static async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const profile = await ProfessionalProfile.findOne({ userId: req.user.userId }).populate(
        'userId',
        'name email phone avatar isEmailVerified'
      );
      if (!profile) return ApiResponse.error(res, 'Profile not found', 404);
      return ApiResponse.success(res, profile, 'Profile retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      let profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      if (!profile) {
        profile = new ProfessionalProfile({ userId: req.user.userId, ...req.body });
      } else {
        Object.assign(profile, req.body);
      }

      profile.calculateCompletion();
      await profile.save();

      // If name or phone updated, update User record as well
      if (req.body.name || req.body.phone) {
        await User.findByIdAndUpdate(req.user.userId, {
          ...(req.body.name && { name: req.body.name }),
          ...(req.body.phone && { phone: req.body.phone })
        });
      }

      return ApiResponse.success(res, profile, 'Profile updated successfully');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async uploadResume(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      if (!req.file) return ApiResponse.error(res, 'No resume file uploaded', 400);

      const result = await StorageService.uploadFile(req.file, 'resumes');
      const profile = await ProfessionalProfile.findOneAndUpdate(
        { userId: req.user.userId },
        { resumeUrl: result.url },
        { new: true }
      );

      if (profile) {
        profile.calculateCompletion();
        await profile.save();
      }

      return ApiResponse.success(res, { url: result.url, profile }, 'Resume uploaded successfully');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getPublicProfile(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const profile = await ProfessionalProfile.findById(id).populate('userId', 'name avatar isEmailVerified');
      if (!profile) return ApiResponse.error(res, 'Candidate not found', 404);
      return ApiResponse.success(res, profile, 'Candidate profile retrieved');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
