import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatSalary, timeAgo } from '../../lib/utils.js';

interface JobCardProps {
  job: any;
  onApply?: (job: any) => void;
  onSave?: (job: any) => void;
  showMatchScore?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onSave, showMatchScore = true }) => {
  const [saved, setSaved] = useState(false);

  // Fallback / Deterministic score simulation for card display
  const matchScore = job.aiMatch?.score || 94;

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onSave) onSave(job);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 p-6 shadow-subtle hover:shadow-premium transition-all duration-300 relative flex flex-col justify-between">
      {/* Top Header with Org Logo & Badges */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={job.organization?.logo || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80'}
              alt={job.organization?.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700 hover:text-teal-700 transition">
                  {job.organization?.name || 'Healthcare Network'}
                </span>
                {job.organization?.verificationStatus === 'VERIFIED' && (
                  <span title="Verified Healthcare Institution">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 inline" />
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg text-[#102A43] group-hover:text-teal-800 transition line-clamp-1">
                <Link to={`/jobs/${job.slug || job._id}`}>{job.title}</Link>
              </h3>
            </div>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={handleSaveToggle}
            className={`p-2 rounded-xl border transition ${
              saved
                ? 'bg-teal-50 border-teal-200 text-teal-700'
                : 'border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 bg-slate-50/50'
            }`}
            title={saved ? 'Job Saved' : 'Save Opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-teal-600' : ''}`} />
          </button>
        </div>

        {/* Clinical Department / Specialization */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-100">
            {job.profession}
          </span>
          {job.specialization && (
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
              {job.specialization}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100">
            {job.workMode || 'On-site'}
          </span>
        </div>

        {/* Key Metrics: Location, Salary, Experience */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.experienceMin}-{job.experienceMax} yrs exp</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1 truncate font-semibold text-slate-800">
            <IndianRupee className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          </div>
        </div>

        {/* Skills Pills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {job.skills.slice(0, 4).map((skill: string, idx: number) => (
              <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded text-slate-400">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with AI Match & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        {showMatchScore && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-300/40 text-teal-800 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{matchScore}% AI Match</span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">{timeAgo(job.postedAt || new Date().toISOString())}</span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Link
            to={`/jobs/${job.slug || job._id}`}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 px-3 py-2 rounded-lg hover:bg-teal-50 transition flex items-center gap-1"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to={`/jobs/${job.slug || job._id}?apply=true`}
            className="text-xs font-bold bg-[#102A43] hover:bg-[#0B1C2D] text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};
