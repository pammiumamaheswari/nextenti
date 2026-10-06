import { Request, Response } from 'express';
import { User, ProfessionalProfile, Organization } from '../models/index.js';
import { generateTokens, verifyRefreshToken } from '../utils/token.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { EmailService } from '../services/emailService.js';
import { AuditService } from '../services/auditService.js';
import { AuthRequest } from '../middleware/auth.js';

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const { name, email, phone, password, role, profession, organizationName, organizationType } = req.body;

      if (!name || !email || !password || !phone) {
        return ApiResponse.error(res, 'Name, email, phone, and password are required', 400, 'VALIDATION_ERROR');
      }

      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return ApiResponse.error(res, 'An account with this email address already exists.', 409, 'USER_EXISTS');
      }

      const assignedRole = role || 'PROFESSIONAL';
      const user = await User.create({
        name,
        email: email.toLowerCase().trim(),
        phone,
        passwordHash: password,
        role: assignedRole,
        isEmailVerified: true // Set to true for smooth onboarding in demo environment
      });

      // Create linked role-specific entity
      if (assignedRole === 'PROFESSIONAL') {
        await ProfessionalProfile.create({
          userId: user._id,
          headline: `${profession || 'Healthcare Professional'}`,
          profession: profession || 'Doctor',
          specialization: 'General Practice',
          location: 'Hyderabad, India',
          experienceYears: 2,
          skills: ['Patient Care', 'Clinical Diagnosis', 'Medical Documentation'],
          profileCompletion: 45
        });
      } else if (assignedRole === 'ORGANIZATION_ADMIN' || assignedRole === 'RECRUITER') {
        const slug = (organizationName || name).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
        await Organization.create({
          ownerId: user._id,
          name: organizationName || `${name} Healthcare`,
          slug,
          organizationType: organizationType || 'Hospital',
          locations: ['Hyderabad', 'Bangalore'],
          contactEmail: email,
          phone,
          description: 'Premier healthcare services institution.'
        });
      }

      const tokens = generateTokens({
        userId: user._id.toString(),
        role: user.role,
        email: user.email
      });

      // Send Welcome Email
      EmailService.sendEmail(
        user.email,
        'Welcome to MedVance AI - Your Healthcare Career Ecosystem',
        EmailService.getTemplate('WELCOME', { name: user.name })
      );

      await AuditService.log(user._id.toString(), 'USER_REGISTERED', 'User', user._id.toString());

      return ApiResponse.success(
        res,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          ...tokens
        },
        'Registration successful',
        201
      );
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return ApiResponse.error(res, 'Email and password are required', 400, 'VALIDATION_ERROR');
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
      if (!user) {
        return ApiResponse.error(res, 'Invalid credentials provided', 401, 'INVALID_CREDENTIALS');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return ApiResponse.error(res, 'Invalid credentials provided', 401, 'INVALID_CREDENTIALS');
      }

      if (!user.isActive) {
        return ApiResponse.error(res, 'Your account has been deactivated. Please contact support.', 403, 'DEACTIVATED');
      }

      user.lastLogin = new Date();
      await user.save();

      const tokens = generateTokens({
        userId: user._id.toString(),
        role: user.role,
        email: user.email
      });

      let profileData = null;
      if (user.role === 'PROFESSIONAL') {
        profileData = await ProfessionalProfile.findOne({ userId: user._id });
      } else if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') {
        profileData = await Organization.findOne({ ownerId: user._id });
      }

      return ApiResponse.success(
        res,
        {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            profile: profileData
          },
          ...tokens
        },
        'Login successful'
      );
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);

      const user = await User.findById(req.user.userId);
      if (!user) return ApiResponse.error(res, 'User not found', 404);

      let profile = null;
      if (user.role === 'PROFESSIONAL') {
        profile = await ProfessionalProfile.findOne({ userId: user._id });
      } else if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') {
        profile = await Organization.findOne({ ownerId: user._id });
      }

      return ApiResponse.success(res, { user, profile }, 'Profile loaded');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return ApiResponse.error(res, 'Refresh token required', 400);

      const payload = verifyRefreshToken(refreshToken);
      const user = await User.findById(payload.userId);
      if (!user || !user.isActive) return ApiResponse.error(res, 'Invalid user state', 401);

      const tokens = generateTokens({
        userId: user._id.toString(),
        role: user.role,
        email: user.email
      });

      return ApiResponse.success(res, tokens, 'Tokens refreshed');
    } catch (err: any) {
      return ApiResponse.error(res, 'Expired or invalid refresh token', 401);
    }
  }
}
