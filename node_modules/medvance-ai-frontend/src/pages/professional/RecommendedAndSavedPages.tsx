import React from 'react';
import { Sparkles, Bookmark } from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';

export const RecommendedJobsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102A43] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-teal-600" />
            AI Recommended Healthcare Openings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked based on your medical specialization, procedural scope, and clinical credentials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_MOCK_JOBS.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export const SavedJobsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#102A43] flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-teal-600" />
          Saved Opportunities
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Bookmarked healthcare roles for review and application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_MOCK_JOBS.slice(0, 2).map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};
