import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ShieldCheck, Heart, Award, Lock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-2xl tracking-tight text-white">MedVance</span>
                <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-teal-900 text-teal-300">AI</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier healthcare career & talent ecosystem connecting certified clinicians, specialists, and nursing officers with accredited hospitals and health networks.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-teal-300">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Medical Council Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-cyan-300">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> HIPAA Compliant Architecture
              </span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Professionals</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/jobs" className="hover:text-teal-400 transition">Explore Healthcare Jobs</Link></li>
              <li><Link to="/professional/recommended" className="hover:text-teal-400 transition">AI Job Recommendations</Link></li>
              <li><Link to="/professional/verification" className="hover:text-teal-400 transition">Credential Verification</Link></li>
              <li><Link to="/resources" className="hover:text-teal-400 transition">Salary & Compensation Benchmarks</Link></li>
              <li><Link to="/resources" className="hover:text-teal-400 transition">Medical Board Interview Prep</Link></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Organizations</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/organization/jobs/create" className="hover:text-teal-400 transition">Post Clinical Openings</Link></li>
              <li><Link to="/organization/candidates" className="hover:text-teal-400 transition">Search Candidate Pool</Link></li>
              <li><Link to="/organization/applications" className="hover:text-teal-400 transition">Recruitment Pipeline Kanban</Link></li>
              <li><Link to="/pricing" className="hover:text-teal-400 transition">Enterprise Hospital Plans</Link></li>
              <li><Link to="/organization/analytics" className="hover:text-teal-400 transition">Hiring Analytics & Funnel</Link></li>
            </ul>
          </div>

          {/* Quick Links 3 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Top Hubs & Roles</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/jobs?location=Hyderabad" className="hover:text-teal-400 transition">Doctors in Hyderabad</Link></li>
              <li><Link to="/jobs?location=Bangalore" className="hover:text-teal-400 transition">Hospitals in Bangalore</Link></li>
              <li><Link to="/jobs?profession=Nurse" className="hover:text-teal-400 transition">Critical Care Nurses</Link></li>
              <li><Link to="/jobs?profession=Pharmacist" className="hover:text-teal-400 transition">Clinical Pharmacists</Link></li>
              <li><Link to="/jobs?profession=Healthcare+IT" className="hover:text-teal-400 transition">Health Informatics & AI</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; 2026 MedVance AI Platform. All rights reserved. Original Healthcare Career System.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">About Us</Link>
            <Link to="/contact" className="hover:text-slate-400">Support & Compliance</Link>
            <Link to="/pricing" className="hover:text-slate-400">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
