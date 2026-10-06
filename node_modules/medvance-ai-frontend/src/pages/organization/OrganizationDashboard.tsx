import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  Users, 
  UserCheck, 
  Calendar, 
  PlusCircle, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitPullRequest
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { INITIAL_CANDIDATES } from '../../lib/mockDb.js';

export const OrganizationDashboard: React.FC = () => {
  const kpis = [
    { title: 'Active Vacancies', value: '5 Openings', change: '+2 this week', icon: Briefcase, color: 'text-teal-700 bg-teal-50' },
    { title: 'Total Applicants', value: '64 Candidates', change: '+18 today', icon: Users, color: 'text-cyan-700 bg-cyan-50' },
    { title: 'Shortlisted Pool', value: '16 Candidates', change: '75% AI Match avg', icon: UserCheck, color: 'text-emerald-700 bg-emerald-50' },
    { title: 'Interviews Scheduled', value: '4 Rounds', change: 'Next: Apr 18', icon: Calendar, color: 'text-indigo-700 bg-indigo-50' }
  ];

  const funnelData = [
    { stage: 'Applied', candidates: 64 },
    { stage: 'Under Review', candidates: 42 },
    { stage: 'Shortlisted', candidates: 16 },
    { stage: 'Interview', candidates: 8 },
    { stage: 'Offer Made', candidates: 4 },
    { stage: 'Hired', candidates: 2 }
  ];

  const trendData = [
    { week: 'W1', applicants: 12, views: 140 },
    { week: 'W2', applicants: 24, views: 280 },
    { week: 'W3', applicants: 45, views: 490 },
    { week: 'W4', applicants: 64, views: 720 }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0F766E] to-[#102A43] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-teal-500/20 border border-teal-300/30 text-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> NABH Verified Hospital Recruiter
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">NovaCare Health Institute</h1>
          <p className="text-xs sm:text-sm text-teal-100">Quaternary Care Clinical Recruitment & Talent Pipeline Suite</p>
        </div>

        <Link
          to="/organization/jobs/create"
          className="bg-white hover:bg-slate-100 text-[#102A43] font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-teal-700" /> Post Clinical Vacancy
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 block">{kpi.title}</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#102A43] mt-1">{kpi.value}</h3>
                <span className="text-[10px] font-semibold text-teal-700 mt-1 block">{kpi.change}</span>
              </div>
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts: Hiring Funnel + Applicant Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Funnel */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#102A43]">Recruitment Stage Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Live candidate progression across clinical stages</p>
            </div>
            <Link to="/organization/applications" className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1">
              Kanban Board <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#102A43', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="candidates" fill="#0F766E" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div>
            <h3 className="font-bold text-base text-[#102A43]">Job View & Application Velocity</h3>
            <p className="text-xs text-slate-500">Weekly candidate acquisition metric</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#102A43', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="applicants" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#appGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommended Candidates Strip */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#102A43]">Matched Medical Candidates for Open Roles</h3>
            <p className="text-xs text-slate-500">Validated specialists matching your active cardiology & ICU nursing criteria</p>
          </div>
          <Link to="/organization/candidates" className="text-xs font-bold text-teal-700 hover:underline">
            Search Candidate Pool ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_CANDIDATES.slice(0, 3).map((cand) => (
            <div key={cand._id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-3">
                <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{cand.name}</h4>
                  <p className="text-[11px] text-teal-700 truncate font-semibold">{cand.specialization}</p>
                  <span className="text-[10px] text-slate-400">{cand.location} • {cand.experienceYears} yrs</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                <span className="font-bold text-teal-800 text-[11px]">95% AI Match</span>
                <Link
                  to="/organization/applications"
                  className="px-3 py-1 bg-teal-700 text-white font-bold rounded-lg text-[11px] hover:bg-teal-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
