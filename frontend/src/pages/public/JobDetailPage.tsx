import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Send
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { formatSalary, timeAgo } from '../../lib/utils.js';
import { AIMatchWidget } from '../../components/ai/AIMatchWidget.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useNotifications } from '../../contexts/NotificationContext.js';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [saved, setSaved] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(searchParams.get('apply') === 'true');
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    'I am writing to express my strong enthusiasm for this role. With my validated clinical certifications and specialized procedural experience, I look forward to contributing to your medical team.'
  );

  const job = INITIAL_MOCK_JOBS.find(j => j.slug === slug || j._id === slug) || INITIAL_MOCK_JOBS[0];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setApplyModalOpen(false);

    addNotification({
      title: 'Application Submitted!',
      message: `Your application for "${job.title}" at ${job.organization.name} has been received.`,
      type: 'APPLICATION'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition">
        <ArrowLeft className="w-4 h-4" /> Back to Healthcare Search
      </Link>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <img
              src={job.organization.logo}
              alt={job.organization.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-slate-700">{job.organization.name}</span>
                {job.organization.verificationStatus === 'VERIFIED' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> NABH Verified Hospital
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">{job.title}</h1>
              <p className="text-xs text-slate-500 mt-1">{job.department} • Posted {timeAgo(job.postedAt)}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-2xl border transition ${
                saved
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 bg-white'
              }`}
              title={saved ? 'Job Saved' : 'Save Job'}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-teal-600' : ''}`} />
            </button>

            {applied ? (
              <button
                disabled
                className="flex-1 lg:flex-initial bg-emerald-600 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4" />
                Application Submitted
              </button>
            ) : (
              <button
                onClick={() => setApplyModalOpen(true)}
                className="flex-1 lg:flex-initial bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-300" />
                Apply With AI Profile
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Compensation</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{formatSalary(job.salaryMin, job.salaryMax)}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Location</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{job.location} ({job.workMode})</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Required Experience</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{job.experienceMin}–{job.experienceMax} Years</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Employment Type</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{job.jobType}</span>
          </div>
        </div>
      </div>

      {/* Grid: Main Job Details (Left) + AI Match Card & Hospital Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Detailed Content */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle space-y-8">
          {/* About Role */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">About the Clinical Opportunity</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">Key Responsibilities</h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {job.responsibilities.map((r: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {job.requirements && (
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">Qualifications & Requirements</h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required */}
          {job.skills && (
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-3">Clinical Competencies Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Match Widget */}
          <AIMatchWidget />

          {/* Hospital Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
            <h3 className="font-bold text-sm text-slate-900">About {job.organization.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quaternary care hospital network providing comprehensive specialty healthcare and clinical research facilities.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Accreditations:</span>
                <span className="font-semibold text-teal-800">{job.organization.accreditations?.join(', ') || 'NABH / JCI'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Locations:</span>
                <span className="font-semibold">{job.organization.locations?.join(', ') || 'Hyderabad'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Submit Application</h3>
                <p className="text-xs text-teal-200">{job.title} • {job.organization.name}</p>
              </div>
              <button onClick={() => setApplyModalOpen(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
                <div className="text-xs text-teal-900">
                  Applying as <strong className="font-bold">{user?.name || 'Dr. Ananya Rao'}</strong> (Verified Credentials attached)
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Cover Note / Clinical Experience Summary</label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Confirm Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
