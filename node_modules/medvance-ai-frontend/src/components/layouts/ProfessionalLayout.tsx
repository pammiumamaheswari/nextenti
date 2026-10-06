import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  LayoutDashboard, 
  Briefcase, 
  Sparkles, 
  FileCheck2, 
  Bookmark, 
  UserCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Stethoscope,
  Home
} from 'lucide-react';
import { AICareerAssistantModal } from '../ai/AICareerAssistantModal.js';
import { ResumeReviewModal } from '../ai/ResumeReviewModal.js';

export const ProfessionalLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/professional/dashboard', icon: LayoutDashboard },
    { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
    { name: 'AI Recommended', path: '/professional/recommended', icon: Sparkles, badge: 'AI' },
    { name: 'My Applications', path: '/professional/applications', icon: FileCheck2 },
    { name: 'Saved Opportunities', path: '/professional/saved', icon: Bookmark },
    { name: 'My Profile', path: '/professional/profile', icon: UserCircle2 },
    { name: 'Credential Verification', path: '/professional/verification', icon: ShieldCheck, badge: user?.verificationStatus === 'VERIFIED' ? 'Verified' : 'Pending' },
    { name: 'Messages', path: '/professional/messages', icon: MessageSquare },
    { name: 'Settings', path: '/professional/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Persona Demo Bar at Top */}
      <div className="md:hidden bg-[#102A43] text-white text-[11px] p-2 flex items-center justify-between">
        <span className="truncate">{user?.name} ({user?.profession})</span>
        <button onClick={() => switchRolePersona('recruiter')} className="text-teal-300 font-bold">
          Switch to Recruiter ➔
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#102A43] text-slate-200 border-r border-slate-800 shrink-0 select-none">
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">MedVance</span>
              <span className="text-[10px] ml-1 px-1 rounded bg-teal-900 text-teal-300 font-bold">PRO</span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/40">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/40"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
            <p className="text-[11px] text-teal-300 truncate font-medium">{user?.headline || user?.profession || 'Specialist'}</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-teal-700 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      item.badge === 'Verified'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : item.badge === 'AI'
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Tools Quick Trigger */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="w-full bg-slate-800/80 hover:bg-slate-800 text-teal-300 p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            AI Resume Audit
          </button>
          <button
            onClick={() => setAiModalOpen(true)}
            className="w-full bg-teal-800/40 hover:bg-teal-800/60 text-white p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-teal-500/30 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
            AI Career Advisor
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-rose-400 p-2 text-xs transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Platform Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800">Professional Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRolePersona('recruiter')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition hidden sm:inline-block"
            >
              Test as Recruiter ➔
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Responsive Mobile Bottom Navigation (Requirement #45) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 z-40 flex items-center justify-around text-[10px] font-medium text-slate-600 shadow-lg">
        <Link to="/professional/dashboard" className={`flex flex-col items-center gap-1 ${location.pathname === '/professional/dashboard' ? 'text-teal-700 font-bold' : ''}`}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link to="/jobs" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/jobs') ? 'text-teal-700 font-bold' : ''}`}>
          <Briefcase className="w-5 h-5" />
          Jobs
        </Link>
        <Link to="/professional/applications" className={`flex flex-col items-center gap-1 ${location.pathname === '/professional/applications' ? 'text-teal-700 font-bold' : ''}`}>
          <FileCheck2 className="w-5 h-5" />
          Applied
        </Link>
        <Link to="/professional/messages" className={`flex flex-col items-center gap-1 ${location.pathname === '/professional/messages' ? 'text-teal-700 font-bold' : ''}`}>
          <MessageSquare className="w-5 h-5" />
          Chat
        </Link>
        <Link to="/professional/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/professional/profile' ? 'text-teal-700 font-bold' : ''}`}>
          <UserCircle2 className="w-5 h-5" />
          Profile
        </Link>
      </nav>

      {/* Modals */}
      <AICareerAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <ResumeReviewModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </div>
  );
};
