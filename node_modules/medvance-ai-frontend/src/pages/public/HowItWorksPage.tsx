import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope,
  Briefcase,
  FileCheck
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PROFESSIONAL' | 'EMPLOYER'>('PROFESSIONAL');

  const clinicianSteps = [
    {
      num: '01',
      title: 'Create Your Verified Clinical Profile',
      desc: 'Enter your medical qualifications, post-MBBS/MD clinical experience, procedural competencies, and upload your State Medical Council / Nursing Board registration.',
      icon: Stethoscope
    },
    {
      num: '02',
      title: '7-Factor AI Matching & Instant Job Fit',
      desc: 'Our engine computes live compatibility scores based on specialty sub-disciplines, hospital accreditation match (NABH/JCI), and shift preferences.',
      icon: Sparkles
    },
    {
      num: '03',
      title: '1-Click Fast Apply & Milestone Tracking',
      desc: 'Apply directly to verified quaternary hospital openings without repetitive form fills and track your application stages in real-time.',
      icon: FileCheck
    },
    {
      num: '04',
      title: 'Direct Interview & Placement',
      desc: 'Connect with HODs and medical directors via integrated telehealth interview suites and secure your clinical appointment.',
      icon: Calendar
    }
  ];

  const employerSteps = [
    {
      num: '01',
      title: 'Post Healthcare Job Openings',
      desc: 'Use our 6-step clinical job builder to specify required council registrations, on-call expectations, ICU bed capacities, and salary brackets.',
      icon: Briefcase
    },
    {
      num: '02',
      title: 'Automated AI Candidate Shortlisting',
      desc: 'Filter 4,500+ pre-verified doctors and staff nurses with detailed compatibility breakdowns and council verification audits.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'Manage 6-Stage Kanban Pipeline',
      desc: 'Move candidates smoothly from Applied ➔ Screening ➔ Clinical Interview ➔ Offer Letter with real-time team collaboration.',
      icon: UserCheck
    },
    {
      num: '04',
      title: 'Instant Interview Scheduling & Rapid Onboarding',
      desc: 'Send 1-click video and hospital board interview invites, reducing your clinical vacancy time-to-hire from 45 days to just 12 days.',
      icon: CheckCircle2
    }
  ];

  const currentSteps = activeTab === 'PROFESSIONAL' ? clinicianSteps : employerSteps;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Simple, Transparent Healthcare Recruitment</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102A43] tracking-tight">
          How MedVance AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Whether you are a healthcare practitioner looking for flexible career growth or a hospital scaling critical care teams, our platform simplifies the entire journey.
        </p>

        {/* Persona Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-4">
          <button
            onClick={() => setActiveTab('PROFESSIONAL')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'PROFESSIONAL'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4" /> For Healthcare Professionals
          </button>
          <button
            onClick={() => setActiveTab('EMPLOYER')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'EMPLOYER'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> For Hospitals & Employers
          </button>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle hover:shadow-premium transition flex flex-col justify-between relative space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">{step.num}</span>
                </div>
                <h3 className="font-bold text-base text-[#102A43] mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center text-[11px] font-bold text-teal-700">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
          Ready to experience frictionless healthcare staffing?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            Search Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/organization/jobs/create"
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition"
          >
            Post a Hospital Job Opening
          </Link>
        </div>
      </div>
    </div>
  );
};
