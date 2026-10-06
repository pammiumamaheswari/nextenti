import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  FileCheck2, 
  BookOpen, 
  CreditCard, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Organization Verifications', path: '/admin/organizations', icon: Building2 },
    { name: 'Job Moderation', path: '/admin/jobs', icon: Briefcase },
    { name: 'Medical Credential Audits', path: '/admin/verifications', icon: ShieldCheck, badge: 'Active' },
    { name: 'Blog / Content CMS', path: '/admin/blogs', icon: BookOpen },
    { name: 'Settings & Security', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#102A43] text-slate-200 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">MedVance</span>
              <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-bold">SUPER ADMIN</span>
            </div>
          </Link>
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
                    ? 'bg-rose-700 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300">
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Platform Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800">Super Administrator Console</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
