import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';

interface AIMatchWidgetProps {
  score?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
  reasons?: string[];
}

export const AIMatchWidget: React.FC<AIMatchWidgetProps> = ({
  score = 94,
  matchedSkills = ['Coronary Angioplasty', 'Echocardiography', 'Cath Lab Protocols', 'CCU Management'],
  missingSkills = ['Advanced Robotic PCI Certification'],
  reasons = [
    'Direct DM Cardiology qualification satisfies clinical threshold',
    '8 years procedural experience fits the 5–12 years band',
    'Location preference aligns in Hyderabad quaternary hub'
  ]
}) => {
  return (
    <div className="bg-gradient-to-br from-teal-900 via-[#102A43] to-[#0B1C2D] text-white p-6 rounded-3xl shadow-premium border border-teal-500/30 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">MedVance AI Match Score</h4>
            <p className="text-xs text-teal-200">Intelligent clinical & experience alignment engine</p>
          </div>
        </div>

        {/* Score Ring / Pill */}
        <div className="flex items-baseline gap-1 bg-teal-500/20 border border-teal-400/40 px-3.5 py-1.5 rounded-2xl">
          <span className="text-2xl font-extrabold text-teal-300">{score}%</span>
          <span className="text-[11px] font-semibold text-teal-100 uppercase tracking-wide">Strong Fit</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden p-0.5 border border-slate-700">
        <div 
          className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Why you match */}
      <div className="space-y-3 mb-6">
        <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" /> Key Match Factors
        </h5>
        <div className="space-y-2 text-xs text-slate-200">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-700/60">
        <div>
          <span className="text-[11px] font-bold text-teal-300 block mb-2">Matched Competencies ({matchedSkills.length})</span>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 border border-teal-400/20">
                {s}
              </span>
            ))}
          </div>
        </div>

        {missingSkills.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-amber-300 block mb-2">Optional / Growth Skills ({missingSkills.length})</span>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-200 border border-amber-400/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-400 mt-4 italic">
        * MedVance AI scoring is designed to provide career recommendations based on credential metrics and does not constitute medical employment guarantees.
      </p>
    </div>
  );
};
