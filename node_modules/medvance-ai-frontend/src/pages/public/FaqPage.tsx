import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, PhoneCall, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does MedVance AI verify doctor and nurse medical council licenses?',
      a: 'During profile onboarding, doctors and nurses submit their State Medical Council (e.g. Telangana Medical Council, Karnataka Medical Council, Delhi Medical Council) or Nursing Council registration numbers and digital certificate. Our administrative compliance team validates registration against national/state registries, awarding a verified check badge.'
    },
    {
      q: 'How does the 7-Factor AI Match Score work?',
      a: 'The matching engine computes a transparent compatibility percentage (0–100%) evaluating clinical specialty sub-disciplines, procedural caseload volume, ICU bed capacity familiarity, on-call/shift availability, NABH/JCI protocol experience, geographical preference, and compensation alignment.'
    },
    {
      q: 'Is MedVance AI free for healthcare practitioners to use?',
      a: 'Yes! Healthcare professionals (doctors, nurses, clinical pharmacists, lab technologists, allied health) can explore jobs, create verified profiles, run AI resume reviews, and apply to openings completely free of charge.'
    },
    {
      q: 'What types of healthcare career modes are supported?',
      a: 'We support Full-Time hospital positions, Locum Tenens (temporary specialist cover), Shift-Based ICU/Ward rotations, and Telehealth / Remote Medical Review opportunities across India.'
    },
    {
      q: 'How fast can hospitals fill critical clinical vacancies?',
      a: 'Because our talent pool is pre-screened and council-verified, accredited hospitals on MedVance AI reduce average clinical vacancy fulfillment times from 45 days down to an average of 12 days.'
    },
    {
      q: 'Is MedVance AI a healthcare provider or a medical service?',
      a: 'MedVance AI is strictly an AI-powered talent marketplace and recruitment technology SaaS platform. We do not provide clinical medical care, diagnostic assessments, or patient health advice.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>Frequently Asked Questions</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43]">
          Got Questions? We’ve Got Answers.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Everything you need to know about our healthcare hiring platform, council verification, and AI matching.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#102A43] hover:text-teal-800 transition"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-teal-50 border border-teal-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="font-bold text-lg text-teal-950">Have a specific question not listed here?</h3>
        <p className="text-xs sm:text-sm text-teal-800 max-w-md mx-auto">
          Our clinical staffing advisors and technical support team are here to assist 24/7.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm transition"
        >
          <Mail className="w-4 h-4" /> Contact Support Team
        </Link>
      </div>
    </div>
  );
};
