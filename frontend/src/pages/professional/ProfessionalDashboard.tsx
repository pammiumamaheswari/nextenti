import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  FileCheck2, 
  Calendar, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';

export const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuth();

  const profileCompletion = 92;

  const upcomingInterviews = [
    {
      id: 'int_1',
      hospital: 'NovaCare Health Institute',
      role: 'Senior Interventional Cardiologist',
      date: 'April 18, 2026',
      time: '11:00 AM IST',
      type: 'Video Medical Round',
      meetingLink: 'https://meet.medvance.ai/room-novacare-cardio'
    }
  ];

  const recentApplications = [
    {
      id: 'app_1',
      hospital: 'NovaCare Health Institute',
      role: 'Senior Interventional Cardiologist',
      status: 'INTERVIEW',
      appliedDate: '2 days ago',
      matchScore: 96
    },
    {
      id: 'app_2',
      hospital: 'Medisphere Hospitals',
      role: 'Consultant Clinical Cardiologist',
      status: 'SHORTLISTED',
      appliedDate: '5 days ago',
      matchScore: 91
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Profile Strength Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0F766E] to-[#102A43] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-teal-500/20 border border-teal-300/30 text-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> Medical Registration Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Dr. Ananya Rao'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
              {user?.headline || 'Senior Interventional Cardiologist • MD, DM Cardiology'}
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl w-full lg:w-72 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Profile Strength</span>
              <span className="font-extrabold text-teal-300">{profileCompletion}% Complete</span>
            </div>
            <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full" style={{ width: `${profileCompletion}%` }} />
            </div>
            <Link to="/professional/profile" className="text-[11px] text-teal-200 hover:text-white font-semibold block text-right">
              Edit Clinical Credentials ➔
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link to="/professional/recommended" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle hover:border-teal-400 transition flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#102A43]">8</span>
            <span className="text-xs font-medium text-slate-500 block mt-0.5">AI Recommended Jobs</span>
          </div>
          <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
        </Link>

        <Link to="/professional/applications" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle hover:border-teal-400 transition flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#102A43]">4</span>
            <span className="text-xs font-medium text-slate-500 block mt-0.5">Active Applications</span>
          </div>
          <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#102A43]">1</span>
            <span className="text-xs font-medium text-slate-500 block mt-0.5">Upcoming Interview</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <Link to="/professional/saved" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle hover:border-teal-400 transition flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#102A43]">5</span>
            <span className="text-xs font-medium text-slate-500 block mt-0.5">Saved Openings</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
            <Bookmark className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Grid: Recommended Jobs (Left) + Upcoming Interviews & Applications (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recommended Opportunities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-[#102A43] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              High-Match Clinical Opportunities
            </h2>
            <Link to="/professional/recommended" className="text-xs font-bold text-teal-700 hover:underline">
              View All ➔
            </Link>
          </div>

          <div className="space-y-4">
            {INITIAL_MOCK_JOBS.slice(0, 2).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>

        {/* Right: Upcoming Interviews & Applications Tracker */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" /> Upcoming Hospital Interview
            </h3>
            {upcomingInterviews.map((int) => (
              <div key={int.id} className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
                <div>
                  <span className="font-bold text-xs text-teal-900 block">{int.role}</span>
                  <span className="text-[11px] text-teal-700 font-semibold">{int.hospital}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Date:</strong> {int.date} at {int.time}</p>
                  <p><strong>Format:</strong> {int.type}</p>
                </div>
                <a
                  href={int.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs py-2 rounded-xl shadow-xs transition"
                >
                  Join Clinical Meeting
                </a>
              </div>
            ))}
          </div>

          {/* Recent Applications Mini Tracker */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-600" /> Active Application Status
            </h3>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 truncate max-w-[140px]">{app.role}</h4>
                    <span className="text-[10px] text-slate-500">{app.hospital}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-200">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/professional/applications" className="text-xs font-bold text-teal-700 block text-center hover:underline pt-2">
              Open Complete Applications Tracker ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
