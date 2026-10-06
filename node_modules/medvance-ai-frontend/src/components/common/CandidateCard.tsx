import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';

interface CandidateCardProps {
  candidate: any;
  onShortlist?: (cand: any) => void;
  onMessage?: (cand: any) => void;
  onSchedule?: (cand: any) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onShortlist,
  onMessage,
  onSchedule
}) => {
  const [shortlisted, setShortlisted] = useState(false);

  const handleShortlist = () => {
    setShortlisted(!shortlisted);
    if (onShortlist) onShortlist(candidate);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 p-6 shadow-subtle hover:shadow-premium transition-all duration-300 relative flex flex-col justify-between">
      <div>
        {/* Top Header with Avatar, Verified status, Headline */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={candidate.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
              alt={candidate.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
            />
            {candidate.verificationStatus === 'VERIFIED' && (
              <span className="absolute -bottom-1 -right-1 bg-teal-600 text-white p-0.5 rounded-full ring-2 ring-white" title="Council Verified">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base text-[#102A43] truncate">{candidate.name}</h3>
              <span className="inline-flex items-center gap-1 bg-teal-50 border border-teal-200/60 text-teal-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-teal-600" />
                94% Match
              </span>
            </div>
            <p className="text-xs font-semibold text-teal-700 truncate">{candidate.headline}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> {candidate.experienceYears} yrs exp
              </span>
            </div>
          </div>
        </div>

        {/* Bio summary */}
        {candidate.bio && (
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
            {candidate.bio}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {candidate.skills?.slice(0, 5).map((skill: string, idx: number) => (
            <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Strip */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500 font-medium">
          Available: <strong className="text-slate-800">{candidate.availability || 'Immediate'}</strong>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShortlist}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
              shortlisted
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
            {shortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
          <button
            onClick={() => onSchedule && onSchedule(candidate)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#102A43] hover:bg-[#0B1C2D] text-white transition flex items-center gap-1 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-teal-300" />
            Interview
          </button>
        </div>
      </div>
    </div>
  );
};
