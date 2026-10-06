import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { AIService } from '../services/aiService.js';
import { ProfessionalProfile, Job } from '../models/index.js';

export class AIController {
  public static async calculateMatch(req: AuthRequest, res: Response) {
    try {
      const { profileId, jobId } = req.body;
      const [profile, job] = await Promise.all([
        ProfessionalProfile.findById(profileId),
        Job.findById(jobId)
      ]);

      if (!profile || !job) return ApiResponse.error(res, 'Profile or Job not found', 404);

      const match = AIService.calculateMatch(profile, job);
      return ApiResponse.success(res, match, 'AI Match calculated successfully');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async reviewResume(req: AuthRequest, res: Response) {
    try {
      const { resumeText } = req.body;
      let profile = null;
      if (req.user) {
        profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      }

      const review = await AIService.analyzeResume(resumeText || '', profile);
      return ApiResponse.success(res, review, 'Resume analysis complete');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async askCareerAssistant(req: AuthRequest, res: Response) {
    try {
      const { prompt } = req.body;
      if (!prompt) return ApiResponse.error(res, 'Prompt is required', 400);

      let profile = null;
      if (req.user) {
        profile = await ProfessionalProfile.findOne({ userId: req.user.userId });
      }

      const reply = await AIService.getCareerAdvice(prompt, profile);
      return ApiResponse.success(res, { answer: reply }, 'Assistant reply generated');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
