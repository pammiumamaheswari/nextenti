import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Building2, 
  PlusCircle, 
  Briefcase, 
  Users, 
  GitPullRequest, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Home,
  CheckCircle2
} from 'lucide-react';

export const OrganizationLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard Overview', path: '/organization/dashboard', icon: BarChart3 },
    { name: 'Post Clinical Job', path: '/organization/jobs/create', icon: PlusCircle, highlight: true },
    { name: 'Manage Openings', path: '/organization/jobs', icon: Briefcase },
    { name: 'Candidate Search', path: '/organization/candidates', icon: Users },
    { name: 'Recruitment Pipeline', path: '/organization/applications', icon: GitPullRequest, badge: 'Kanban' },
    { name: 'Clinical Interviews', path: '/organization/interviews', icon: Calendar },
    { name: 'Messages & Inquiries', path: '/organization/messages', icon: MessageSquare },
    { name: 'Hospital Profile', path: '/organization/profile', icon: Building2 },
    { name: 'Settings & Billing', path: '/organization/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#102A43] text-slate-200 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">NovaCare</span>
              <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded bg-teal-900 text-teal-300 font-bold">RECRUITER</span>
            </div>
          </Link>
        </div>

        {/* Organization Status */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80'}
            alt="Hospital"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-teal-500/40"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.organizationName || 'NovaCare Health'}</h4>
            <div className="flex items-center gap-1 text-[11px] text-teal-300 font-medium">
              <CheckCircle2 className="w-3 h-3 text-teal-400" /> Verified Hospital
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-teal-700 text-white font-semibold shadow-sm'
                    : item.highlight
                    ? 'bg-teal-600/20 text-teal-200 border border-teal-500/30 hover:bg-teal-600/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => switchRolePersona('doctor')}
            className="w-full bg-slate-800 text-teal-300 p-2 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
          >
            Switch to Doctor Persona
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-rose-400 p-2 text-xs transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Platform Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800">Recruiter SaaS Suite</span>
          </div>

          <Link
            to="/organization/jobs/create"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Post New Job
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
