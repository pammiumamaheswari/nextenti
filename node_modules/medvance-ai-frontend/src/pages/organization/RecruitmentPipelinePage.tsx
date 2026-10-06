import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext.js';

interface KanbanCandidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialization: string;
  matchScore: number;
  stage: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFER' | 'HIRED';
  experienceYears: number;
}

export const RecruitmentPipelinePage: React.FC = () => {
  const { addNotification } = useNotifications();

  const [candidates, setCandidates] = useState<KanbanCandidate[]>([
    {
      id: 'k1',
      name: 'Dr. Ananya Rao',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
      role: 'Senior Interventional Cardiologist',
      specialization: 'Cardiology',
      matchScore: 96,
      stage: 'INTERVIEW',
      experienceYears: 8
    },
    {
      id: 'k2',
      name: 'Priya Nair',
      avatar: 'https://images.unsplash.com/photo-1594824813591-13723383a54b?w=100&auto=format&fit=crop&q=80',
      role: 'Lead ICU Staff Nurse',
      specialization: 'Critical Care / ICU',
      matchScore: 92,
      stage: 'SHORTLISTED',
      experienceYears: 5
    },
    {
      id: 'k3',
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop&q=80',
      role: 'Molecular Pathologist',
      specialization: 'Genomics & Lab',
      matchScore: 89,
      stage: 'UNDER_REVIEW',
      experienceYears: 4
    },
    {
      id: 'k4',
      name: 'Sneha Iyer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      role: 'Senior Clinical Pharmacist',
      specialization: 'Pharmacology',
      matchScore: 94,
      stage: 'OFFER',
      experienceYears: 4
    }
  ]);

  const stages: { key: KanbanCandidate['stage']; label: string; color: string }[] = [
    { key: 'APPLIED', label: 'Applied', color: 'border-slate-300' },
    { key: 'UNDER_REVIEW', label: 'Under Review', color: 'border-cyan-400' },
    { key: 'SHORTLISTED', label: 'Shortlisted', color: 'border-emerald-400' },
    { key: 'INTERVIEW', label: 'Clinical Interview', color: 'border-teal-500' },
    { key: 'OFFER', label: 'Offer Extended', color: 'border-indigo-500' },
    { key: 'HIRED', label: 'Hired', color: 'border-green-600' }
  ];

  const moveCandidate = (candidateId: string, nextStage: KanbanCandidate['stage']) => {
    setCandidates(prev =>
      prev.map(c => (c.id === candidateId ? { ...c, stage: nextStage } : c))
    );
    const cand = candidates.find(c => c.id === candidateId);
    addNotification({
      title: 'Recruitment Stage Updated',
      message: `${cand?.name} moved to ${nextStage}`,
      type: 'APPLICATION'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102A43] flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-teal-600" />
            Clinical Recruitment Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Interactive Kanban board for candidate progression across hospital departments</p>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 items-start min-w-[900px]">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter(c => c.stage === stage.key);
          return (
            <div key={stage.key} className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200 min-h-[500px] flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-800">{stage.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-[11px] font-bold text-slate-700 shadow-2xs">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stageCandidates.map((cand) => (
                  <div key={cand.id} className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs space-y-3 hover:shadow-subtle transition">
                    <div className="flex items-center gap-2.5">
                      <img src={cand.avatar} alt={cand.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{cand.name}</h4>
                        <p className="text-[10px] text-teal-700 font-semibold truncate">{cand.specialization}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">{cand.matchScore}% Match</span>
                      <span>{cand.experienceYears} yrs exp</span>
                    </div>

                    {/* Advance Stage Control */}
                    {stage.key !== 'HIRED' && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            const nextStageIndex = stages.findIndex(s => s.key === stage.key) + 1;
                            if (nextStageIndex < stages.length) {
                              moveCandidate(cand.id, stages[nextStageIndex].key);
                            }
                          }}
                          className="text-[10px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-teal-200"
                        >
                          Advance ➔
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
