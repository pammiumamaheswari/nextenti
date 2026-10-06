import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import { NotificationProvider } from './contexts/NotificationContext.js';

// Layouts
import { PublicLayout } from './components/layouts/PublicLayout.js';
import { ProfessionalLayout } from './components/layouts/ProfessionalLayout.js';
import { OrganizationLayout } from './components/layouts/OrganizationLayout.js';
import { AdminLayout } from './components/layouts/AdminLayout.js';

// Public Pages
import { HomePage } from './pages/public/HomePage.js';
import { JobSearchPage } from './pages/public/JobSearchPage.js';
import { JobDetailPage } from './pages/public/JobDetailPage.js';
import { ProfessionalsExplorePage } from './pages/public/ProfessionalsExplorePage.js';
import { OrganizationsExplorePage } from './pages/public/OrganizationsExplorePage.js';
import { ResourcesBlogPage } from './pages/public/ResourcesBlogPage.js';
import { BlogDetailPage } from './pages/public/BlogDetailPage.js';
import { PricingPage } from './pages/public/PricingPage.js';
import { LoginPage } from './pages/public/LoginPage.js';
import { RegisterPage } from './pages/public/RegisterPage.js';
import { PortalsGuidePage } from './pages/public/PortalsGuidePage.js';
import { AboutUsPage } from './pages/public/AboutUsPage.js';
import { HowItWorksPage } from './pages/public/HowItWorksPage.js';
import { FaqPage } from './pages/public/FaqPage.js';
import { ContactUsPage } from './pages/public/ContactUsPage.js';

// Professional Pages
import { ProfessionalDashboard } from './pages/professional/ProfessionalDashboard.js';
import { RecommendedJobsPage, SavedJobsPage } from './pages/professional/RecommendedAndSavedPages.js';
import { MyApplicationsPage } from './pages/professional/MyApplicationsPage.js';
import { ProfileEditPage } from './pages/professional/ProfileEditPage.js';
import { VerificationPage } from './pages/professional/VerificationPage.js';
import { MessagesPage } from './pages/professional/MessagesPage.js';

// Organization Pages
import { OrganizationDashboard } from './pages/organization/OrganizationDashboard.js';
import { CreateJobPage } from './pages/organization/CreateJobPage.js';
import { CandidateSearchPage } from './pages/organization/CandidateSearchPage.js';
import { RecruitmentPipelinePage } from './pages/organization/RecruitmentPipelinePage.js';
import { InterviewsPage, ManageJobsPage } from './pages/organization/InterviewsAndManagePages.js';

// Admin Pages
import { AdminDashboard, AdminVerificationsPage } from './pages/admin/AdminPages.js';

// Global Portals Dock & Guide Modal
import { FloatingPortalDock, PortalGuideModal } from './components/common/PortalGuideModal.js';

function AppContent() {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portals" element={<PortalsGuidePage />} />
          <Route path="/jobs" element={<JobSearchPage />} />
          <Route path="/jobs/:slug" element={<JobDetailPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/leadership" element={<AboutUsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/professionals" element={<ProfessionalsExplorePage />} />
          <Route path="/organizations" element={<OrganizationsExplorePage />} />
          <Route path="/resources" element={<ResourcesBlogPage />} />
          <Route path="/blogs" element={<ResourcesBlogPage />} />
          <Route path="/resources/:slug" element={<BlogDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Professional Portal */}
        <Route path="/professional" element={<ProfessionalLayout />}>
          <Route path="dashboard" element={<ProfessionalDashboard />} />
          <Route path="recommended" element={<RecommendedJobsPage />} />
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="saved" element={<SavedJobsPage />} />
          <Route path="profile" element={<ProfileEditPage />} />
          <Route path="verification" element={<VerificationPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<ProfileEditPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Organization / Recruiter Portal */}
        <Route path="/organization" element={<OrganizationLayout />}>
          <Route path="dashboard" element={<OrganizationDashboard />} />
          <Route path="jobs" element={<ManageJobsPage />} />
          <Route path="jobs/create" element={<CreateJobPage />} />
          <Route path="candidates" element={<CandidateSearchPage />} />
          <Route path="applications" element={<RecruitmentPipelinePage />} />
          <Route path="interviews" element={<InterviewsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<OrganizationsExplorePage />} />
          <Route path="settings" element={<PricingPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Super Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verifications" element={<AdminVerificationsPage />} />
          <Route path="users" element={<AdminDashboard />} />
          <Route path="jobs" element={<ManageJobsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Floating Portals Dock */}
      <FloatingPortalDock onOpenGuide={() => setGuideModalOpen(true)} />

      {/* Global Portal Guidance & Switching Modal */}
      <PortalGuideModal isOpen={guideModalOpen} onClose={() => setGuideModalOpen(false)} />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
