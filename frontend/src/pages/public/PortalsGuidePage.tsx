import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { PORTALS_LIST } from '../../components/common/PortalGuideModal.js';
import { 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Building2, 
  Briefcase, 
  Compass,
  Zap,
  Lock,
  MessageSquare
} from 'lucide-react';

export const PortalsGuidePage: React.FC = () => {
  const { switchRolePersona } = useAuth();
  const navigate = useNavigate();

  const handleLaunch = (portalId: string, url: string) => {
    if (portalId === 'doctor') switchRolePersona('doctor');
    else if (portalId === 'nurse') switchRolePersona('nurse');
    else if (portalId === 'recruiter') switchRolePersona('recruiter');
    else if (portalId === 'admin') switchRolePersona('admin');
    navigate(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
          <Layers className="w-4 h-4 text-teal-600" />
          <span>Interactive Platform Portals & Guidance Hub</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#102A43] tracking-tight">
          Explore All 4 Core Healthcare Portals
        </h1>

        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          MedVance AI is architected with purpose-built experiences for each healthcare participant. Click any portal below to launch it directly with pre-configured credentials and realistic workflows.
        </p>
      </div>

      {/* Grid of Portals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {PORTALS_LIST.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all duration-300 p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${portal.badgeColor} mb-1`}>
                        {portal.badge}
                      </span>
                      <h3 className="font-extrabold text-xl text-[#102A43]">{portal.name}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {portal.headline}
                </p>

                {/* Persona Profile Pill */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Demo Persona:</span>
                  <span className="font-bold text-slate-900">{portal.personaName}</span>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Workflows & Features
                  </span>
                  <div className="space-y-2">
                    {portal.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLaunch(portal.id, portal.targetUrl)}
                  className="w-full bg-[#102A43] hover:bg-[#0B1C2D] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2 group"
                >
                  <span>Launch {portal.name}</span>
                  <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Verification Callout */}
      <div className="bg-gradient-to-r from-teal-900 via-[#102A43] to-[#0B1C2D] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Unified Data Integrity
            </span>
            <h3 className="text-2xl font-black">Connected Cross-Portal Architecture</h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
              When a doctor submits an application in the <strong>Professional Portal</strong>, the hospital recruiter immediately sees it on their <strong>Kanban Board</strong>, and the medical license becomes audit-ready in the <strong>Super Admin Console</strong>.
            </p>
          </div>

          <Link
            to="/jobs"
            className="bg-teal-500 hover:bg-teal-400 text-[#102A43] font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shrink-0 shadow-md"
          >
            Start Exploring Jobs ➔
          </Link>
        </div>
      </div>
    </div>
  );
};
