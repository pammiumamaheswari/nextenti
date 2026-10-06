import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { JobController } from '../controllers/jobController.js';
import { ApplicationController } from '../controllers/applicationController.js';
import { ProfessionalController } from '../controllers/professionalController.js';
import { OrganizationController } from '../controllers/organizationController.js';
import { InterviewController } from '../controllers/interviewController.js';
import { MessageController } from '../controllers/messageController.js';
import { AIController } from '../controllers/aiController.js';
import { VerificationController, AdminController, BlogController } from '../controllers/adminAndContentControllers.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';
import { upload } from '../middleware/errorHandler.js';

const router = Router();

// AUTH ROUTES
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/refresh', AuthController.refreshToken);
router.get('/auth/me', authenticate as any, AuthController.me as any);

// PUBLIC & JOB ROUTES
router.get('/jobs', JobController.getJobs as any);
router.get('/jobs/:id', JobController.getJobById as any);
router.post('/jobs', authenticate as any, authorize(['ORGANIZATION_ADMIN', 'RECRUITER', 'SUPER_ADMIN']) as any, JobController.createJob as any);
router.put('/jobs/:id', authenticate as any, authorize(['ORGANIZATION_ADMIN', 'RECRUITER', 'SUPER_ADMIN']) as any, JobController.updateJob as any);

// SAVED JOBS
router.get('/saved-jobs', authenticate as any, JobController.getSavedJobs as any);
router.post('/saved-jobs/:jobId', authenticate as any, JobController.toggleSavedJob as any);

// APPLICATIONS
router.post('/jobs/:jobId/apply', authenticate as any, ApplicationController.apply as any);
router.get('/applications/me', authenticate as any, ApplicationController.getMyApplications as any);
router.get('/applications/org', authenticate as any, ApplicationController.getOrganizationApplications as any);
router.patch('/applications/:id/status', authenticate as any, ApplicationController.updateApplicationStatus as any);

// PROFESSIONAL PORTAL
router.get('/professionals/me', authenticate as any, ProfessionalController.getProfile as any);
router.put('/professionals/me', authenticate as any, ProfessionalController.updateProfile as any);
router.post('/professionals/resume', authenticate as any, upload.single('resume'), ProfessionalController.uploadResume as any);
router.get('/professionals/:id', ProfessionalController.getPublicProfile as any);

// ORGANIZATION PORTAL & CANDIDATE SEARCH
router.get('/organization/me', authenticate as any, OrganizationController.getMyOrganization as any);
router.put('/organization/me', authenticate as any, OrganizationController.updateOrganization as any);
router.get('/organization/candidates', authenticate as any, OrganizationController.searchCandidates as any);
router.get('/organization/stats', authenticate as any, OrganizationController.getDashboardStats as any);

// INTERVIEW SYSTEM
router.post('/interviews', authenticate as any, InterviewController.schedule as any);
router.get('/interviews', authenticate as any, InterviewController.getMyInterviews as any);
router.put('/interviews/:id', authenticate as any, InterviewController.updateInterview as any);

// REAL-TIME MESSAGING
router.get('/conversations', authenticate as any, MessageController.getConversations as any);
router.get('/conversations/:conversationId/messages', authenticate as any, MessageController.getMessages as any);
router.post('/messages', authenticate as any, MessageController.sendMessage as any);

// AI ENGINE
router.post('/ai/match', AIController.calculateMatch as any);
router.post('/ai/resume-review', AIController.reviewResume as any);
router.post('/ai/career-advice', AIController.askCareerAssistant as any);

// VERIFICATION WORKFLOW
router.post('/verifications/submit', authenticate as any, VerificationController.submit as any);
router.get('/verifications/me', authenticate as any, VerificationController.getMyVerification as any);
router.get('/verifications/all', authenticate as any, authorize(['SUPER_ADMIN']) as any, VerificationController.getAllVerifications as any);
router.patch('/verifications/:id/review', authenticate as any, authorize(['SUPER_ADMIN']) as any, VerificationController.review as any);

// ADMIN PORTAL
router.get('/admin/metrics', authenticate as any, authorize(['SUPER_ADMIN']) as any, AdminController.getDashboardMetrics as any);
router.get('/admin/users', authenticate as any, authorize(['SUPER_ADMIN']) as any, AdminController.getAllUsers as any);
router.patch('/admin/users/:id/toggle-status', authenticate as any, authorize(['SUPER_ADMIN']) as any, AdminController.toggleUserStatus as any);

// BLOGS & RESOURCES
router.get('/blogs', BlogController.getBlogs);
router.get('/blogs/:slug', BlogController.getBlogBySlug);

export default router;
