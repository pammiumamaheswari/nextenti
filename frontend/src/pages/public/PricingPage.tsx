import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter Clinic',
      tagline: 'Ideal for specialized polyclinics & standalone diagnostic centers',
      price: billingCycle === 'yearly' ? '₹7,999' : '₹9,499',
      period: '/ month',
      features: [
        'Up to 3 Active Clinical Job Postings',
        'Direct Candidate Messaging',
        'Basic Credential Verification',
        'Standard Applicant Kanban Tracker',
        'Email & Chat Support'
      ],
      cta: 'Choose Starter',
      highlight: false
    },
    {
      name: 'Growth Hospital Network',
      tagline: 'For multi-specialty hospitals & regional health groups',
      price: billingCycle === 'yearly' ? '₹19,999' : '₹24,999',
      period: '/ month',
      features: [
        'Up to 15 Active Clinical Job Postings',
        '7-Factor AI Candidate Match Scoring',
        'State Medical Board Verified Talent Pool Access',
        'Automated Clinical Interview Scheduler',
        'Hiring Analytics & Funnel Reports',
        'Priority Recruiter Support'
      ],
      cta: 'Choose Growth Plan',
      highlight: true
    },
    {
      name: 'Quaternary Enterprise',
      tagline: 'For large quaternary hospital chains & medical colleges',
      price: 'Custom Enterprise',
      period: '',
      features: [
        'Unlimited Active Job Openings',
        'Custom EHR / HIS Integration & FHIR APIs',
        'Dedicated Talent Partner & Clinical Recruiter',
        'Advanced Background Verification Audits',
        'Multi-Hospital Sub-Account Management',
        'SLA & HIPAA/NABH Compliance Guarantee'
      ],
      cta: 'Contact Medical Enterprise Team',
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Transparent Hospital & Recruiter Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43]">
          Accelerate Your Healthcare Recruitment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Empower your hospital talent team with certified clinician matching, credential validation, and seamless applicant tracking.
        </p>

        {/* Billing Switch */}
        <div className="inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl transition ${billingCycle === 'monthly' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-500'}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-500'}`}
          >
            Annual Billing (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
              plan.highlight
                ? 'bg-gradient-to-b from-[#102A43] to-[#0B1C2D] text-white shadow-2xl border-2 border-teal-400/60 ring-4 ring-teal-500/10 scale-105 z-10'
                : 'bg-white text-slate-900 border border-slate-200 shadow-subtle'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-500 text-[#102A43] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Most Popular for Hospitals
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`text-xs mt-1 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.tagline}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black">{plan.price}</span>
                {plan.period && (
                  <span className={`text-xs ${plan.highlight ? 'text-teal-300' : 'text-slate-500'}`}>{plan.period}</span>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200/20 text-xs">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-teal-400' : 'text-teal-600'}`} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/register?role=ORGANIZATION_ADMIN"
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center shadow-md ${
                  plan.highlight
                    ? 'bg-teal-500 hover:bg-teal-400 text-[#102A43]'
                    : 'bg-[#102A43] hover:bg-[#0B1C2D] text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
