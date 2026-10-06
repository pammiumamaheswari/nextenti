import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Award, Building2, Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const leaders = [
    {
      name: 'Dr. Vikramaditya Reddy',
      role: 'Chief Medical Officer & Co-Founder',
      qual: 'MD (Cardiology), Ex-Director Apollo Healthcare',
      bio: 'Over 22 years of clinical practice and hospital administration, spearheading clinical credential standards.',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Shalini Mukhopadhyay',
      role: 'Head of Clinical AI & Matching Algorithms',
      qual: 'Ph.D. Biomedical Informatics (AIIMS / IISc)',
      bio: 'Pioneered ethical 7-factor competency scoring for ICU intensivists and quaternary surgical teams.',
      avatar: 'https://images.unsplash.com/photo-1594824813590-4892c90f5c93?w=300&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rajesh Subramanian',
      role: 'Chief Technology Officer',
      qual: 'Ex-Engineering Director, Healthcare SaaS Systems',
      bio: 'Built scalable real-time healthcare talent platforms and HIPAA/NABH compliant verified credential vaults.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>About MedVance AI</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102A43] tracking-tight leading-tight">
          Empowering Healthcare Careers, Elevating Patient Care.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          MedVance AI is India’s premier dedicated healthcare talent ecosystem, connecting verified clinicians, nurses, pharmacists, and allied professionals with accredited quaternary hospitals and research laboratories.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
            <HeartPulse className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#102A43]">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To eliminate clinical staffing bottlenecks, protect medical compliance through automated council credential verification, and offer healthcare professionals transparent, fulfilling, and flexible career journeys.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100">
            <Sparkles className="w-6 h-6 text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#102A43]">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A future where every hospital ward, emergency ICU, and specialized clinic is staffed by verified, motivated, and optimally matched clinical talent powered by transparent AI matching.
          </p>
        </div>
      </div>

      {/* Leadership Section */}
      <section id="leadership" className="space-y-8 pt-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-2">Executive Team</span>
          <h2 className="text-3xl font-extrabold text-[#102A43]">Clinical & Technology Leadership</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Guided by seasoned medical directors, healthcare informatics researchers, and enterprise platform architects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle hover:shadow-premium transition flex flex-col items-center text-center space-y-4"
            >
              <img
                src={leader.avatar}
                alt={leader.name}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-teal-50 shadow-md"
              />
              <div>
                <h3 className="font-bold text-lg text-[#102A43]">{leader.name}</h3>
                <span className="text-xs font-semibold text-teal-700 block">{leader.role}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">{leader.qual}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-[#102A43] to-[#0F766E] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-black">Join the MedVance Network Today</h3>
          <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
            Whether you are a specialist physician looking for your next clinical fellowship or a hospital hiring manager, we are here for you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/jobs"
            className="bg-white text-teal-900 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm hover:bg-teal-50 transition shadow-sm"
          >
            Explore Healthcare Jobs
          </Link>
          <Link
            to="/organization/jobs/create"
            className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition border border-teal-400"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};
