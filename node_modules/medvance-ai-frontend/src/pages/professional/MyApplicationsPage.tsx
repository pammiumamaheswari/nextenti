import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck2, 
  Building2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';

export const MyApplicationsPage: React.FC = () => {
  const applications = [
    {
      id: 'app_01',
      job: INITIAL_MOCK_JOBS[0],
      status: 'INTERVIEW',
      appliedAt: '2 days ago',
      matchScore: 96,
      currentStepIndex: 3,
      history: [
        { title: 'Application Received', date: 'April 11, 2026', done: true },
        { title: 'Credentials Verified & Shortlisted', date: 'April 12, 2026', done: true },
        { title: 'Clinical Round Scheduled', date: 'April 18, 2026', current: true },
        { title: 'Final Medical Board Review', date: 'Pending', done: false },
        { title: 'Offer Letter', date: 'Pending', done: false }
      ]
    },
    {
      id: 'app_02',
      job: INITIAL_MOCK_JOBS[1],
      status: 'SHORTLISTED',
      appliedAt: '5 days ago',
      matchScore: 91,
      currentStepIndex: 2,
      history: [
        { title: 'Application Received', date: 'April 8, 2026', done: true },
        { title: 'Candidate Profile Shortlisted', date: 'April 10, 2026', current: true },
        { title: 'Clinical Assessment', date: 'Pending', done: false },
        { title: 'Offer Decision', date: 'Pending', done: false }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43]">My Healthcare Applications</h1>
        <p className="text-xs text-slate-500 mt-1">Track recruitment milestones, review stages, and interview schedules</p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={app.job.organization.logo}
                  alt={app.job.organization.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                />
                <div>
                  <h3 className="font-bold text-base text-[#102A43]">{app.job.title}</h3>
                  <p className="text-xs text-slate-500">{app.job.organization.name} • Applied {app.appliedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" /> {app.matchScore}% Match
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-teal-700 text-white uppercase tracking-wider">
                  {app.status}
                </span>
              </div>
            </div>

            {/* Application Progress Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Hiring Progress Tracker</h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {app.history.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs ${
                      step.done
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : step.current
                        ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px]">Step {idx + 1}</span>
                      {step.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <p className="font-semibold text-xs leading-snug">{step.title}</p>
                    <span className="text-[10px] opacity-80 block mt-1">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
