import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Building2,
  Users,
  Award,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Microscope,
  Activity,
  Calendar,
  Lock,
  PhoneCall,
  Laptop,
  Pill,
  Brain,
  Smile,
  Truck,
  FileCheck2,
  ChevronDown,
  HelpCircle,
  Radio,
  UserCheck,
  Building,
  CreditCard,
  MessageCircle,
  Download,
  ChevronUp
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';
import { HealthcareSalaryCalculator } from '../../components/common/HealthcareSalaryCalculator.js';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orgQuery, setOrgQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'profession' | 'role' | 'location'>('role');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (orgQuery) params.append('search', orgQuery);
    if (locationQuery) params.append('location', locationQuery);
    navigate(`/jobs?${params.toString()}`);
  };

  const partnerHospitals = [
    { name: 'Apollo 24/7 & Hospitals', city: 'Pan India' },
    { name: 'KIMS Hospitals', city: 'Hyderabad & Bangalore' },
    { name: 'Aster DM Healthcare', city: 'Kochi & Bangalore' },
    { name: 'Medicover Hospitals', city: 'Hyderabad & Vizag' },
    { name: 'Omega Cancer Hospitals', city: 'Hyderabad' },
    { name: 'Ankura Hospitals', city: 'Telangana & AP' },
    { name: 'Prathima Hospitals', city: 'Hyderabad' },
    { name: 'Renova Hospitals', city: 'Hyderabad & Jaipur' },
    { name: 'Basavatarakam Cancer Hospital', city: 'Hyderabad' },
    { name: 'NovaCare Health', city: 'Bangalore' },
    { name: 'Medisphere Hospitals', city: 'Bangalore' },
    { name: 'Vitalis Diagnostics', city: 'Mumbai' },
    { name: 'CareBridge Medical', city: 'Chennai' },
    { name: 'Aurelia Health AI', city: 'Pune' },
    { name: 'MedPlus Healthcare', city: 'Pan India' },
    { name: 'CallHealth Services', city: 'Hyderabad' },
  ];

  // Explore Healthcare Jobs Tabbed Data (Exactly matching Nextenti.ai)
  const directoryData = {
    role: [
      { title: 'General Physician Jobs', icon: Stethoscope, query: 'General Physician' },
      { title: 'Staff Nurse Jobs', icon: HeartPulse, query: 'Staff Nurse' },
      { title: 'Radiologist Jobs', icon: Microscope, query: 'Radiologist' },
      { title: 'Receptionist Jobs', icon: Users, query: 'Receptionist' },
      { title: 'Pharmacy Assistant Jobs', icon: Pill, query: 'Pharmacy Assistant' },
      { title: 'OT Technician Jobs', icon: Building2, query: 'OT Technician' },
      { title: 'Physiotherapist Jobs', icon: Activity, query: 'Physiotherapist' },
      { title: 'Duty Medical Officer Jobs', icon: Stethoscope, query: 'Duty Medical Officer' },
      { title: 'ICU Nurse Jobs', icon: HeartPulse, query: 'ICU Nurse' },
      { title: 'Technician - CT & MRI Jobs', icon: Microscope, query: 'CT MRI Technician' },
      { title: 'Finance Manager Jobs', icon: CreditCard, query: 'Finance Manager' },
      { title: 'HR Manager Jobs', icon: UserCheck, query: 'HR Manager' },
    ],
    profession: [
      { title: 'Doctor / Specialist Jobs', icon: Stethoscope, query: 'Doctor' },
      { title: 'Nursing & Critical Care Jobs', icon: HeartPulse, query: 'Nurse' },
      { title: 'Pharmacist & Pharmacy Jobs', icon: Pill, query: 'Pharmacist' },
      { title: 'Diagnostic & Lab Tech Jobs', icon: Microscope, query: 'Lab Technologist' },
      { title: 'Physiotherapy & Rehab Jobs', icon: Activity, query: 'Physiotherapy' },
      { title: 'Radiology & Imaging Jobs', icon: Microscope, query: 'Radiology' },
      { title: 'Healthcare IT & Informatics', icon: Laptop, query: 'Healthcare IT' },
      { title: 'Hospital Admin & Ops Jobs', icon: Building2, query: 'Healthcare Administrator' },
      { title: 'Biomedical Engineering Jobs', icon: Sparkles, query: 'Biomedical' },
      { title: 'Clinical Research Jobs', icon: Activity, query: 'Clinical Research' },
      { title: 'Dentist & Dental Sciences', icon: Smile, query: 'Dentist' },
      { title: 'Mental Health & Psychology', icon: Brain, query: 'Psychiatrist' },
    ],
    location: [
      { title: 'Healthcare Jobs in Hyderabad', icon: MapPin, query: 'Hyderabad' },
      { title: 'Healthcare Jobs in Bangalore', icon: MapPin, query: 'Bangalore' },
      { title: 'Healthcare Jobs in Mumbai', icon: MapPin, query: 'Mumbai' },
      { title: 'Healthcare Jobs in Chennai', icon: MapPin, query: 'Chennai' },
      { title: 'Healthcare Jobs in Delhi NCR', icon: MapPin, query: 'Delhi' },
      { title: 'Healthcare Jobs in Pune', icon: MapPin, query: 'Pune' },
      { title: 'Healthcare Jobs in Kolkata', icon: MapPin, query: 'Kolkata' },
      { title: 'Healthcare Jobs in Ahmedabad', icon: MapPin, query: 'Ahmedabad' },
      { title: 'Healthcare Jobs in Kochi', icon: MapPin, query: 'Kochi' },
      { title: 'Healthcare Jobs in Jaipur', icon: MapPin, query: 'Jaipur' },
      { title: 'Healthcare Jobs in Vizag', icon: MapPin, query: 'Visakhapatnam' },
      { title: 'Healthcare Jobs in Coimbatore', icon: MapPin, query: 'Coimbatore' },
    ]
  };

  const sectors = [
    { name: 'Quaternary & Tertiary Hospitals', count: '1,450+ Roles', icon: Building2, tag: 'Hospitals' },
    { name: 'Critical Care & Nursing Units', count: '890+ Roles', icon: HeartPulse, tag: 'Nursing' },
    { name: 'Diagnostic & Genomics Labs', count: '410+ Roles', icon: Microscope, tag: 'Diagnostics' },
    { name: 'Clinical Pharmacy & Pharma', count: '340+ Roles', icon: Pill, tag: 'Pharma' },
    { name: 'Healthcare IT & AI Informatics', count: '280+ Roles', icon: Laptop, tag: 'Healthcare IT' },
    { name: 'Telehealth & Digital Suites', count: '220+ Roles', icon: PhoneCall, tag: 'Telehealth' },
    { name: 'Biotech & Clinical Trials R&D', count: '190+ Roles', icon: Activity, tag: 'Biotech' },
    { name: 'Mental Health & Psychiatry', count: '160+ Roles', icon: Brain, tag: 'Mental Health' },
    { name: 'Dental Sciences & Clinics', count: '140+ Roles', icon: Smile, tag: 'Dental' },
    { name: 'Home Healthcare Services', count: '320+ Roles', icon: Truck, tag: 'Home Care' },
    { name: 'Hospital Operations & Admin', count: '210+ Roles', icon: FileCheck2, tag: 'Admin' },
    { name: 'Medical Devices & Equipment', count: '175+ Roles', icon: Sparkles, tag: 'MedTech' },
  ];

  const popularChips = [
    { label: 'Cardiology', query: 'Cardiology' },
    { label: 'ICU & Critical Care', query: 'ICU' },
    { label: 'Staff Nurses', query: 'Nurse' },
    { label: 'Radiology & Imaging', query: 'Radiology' },
    { label: 'Clinical Pharmacist', query: 'Pharmacist' },
    { label: 'Locum Shifts', query: 'Locum' },
    { label: 'Pediatrics', query: 'Pediatrics' },
    { label: 'Healthcare IT', query: 'Healthcare IT' },
  ];

  const faqs = [
    {
      q: 'How does MedVance AI verify clinical and medical credentials?',
      a: 'We cross-reference registration details with State Medical Councils (NMC/SMC), State Nursing Councils, and Pharmacy Councils to ensure 100% verified authentic healthcare practitioners.'
    },
    {
      q: 'Can hospitals recruit for locum, shift-based, and permanent full-time roles?',
      a: 'Yes. MedVance AI supports multi-tier staffing including on-demand locum duty doctors, ICU night shifts, clinical rotations, and permanent senior consultants.'
    },
    {
      q: 'How does the 7-Factor AI Match score work?',
      a: 'Our proprietary algorithm analyzes specialty alignment, clinical experience, procedural logbook volume, shift preferences, accreditation familiarity (NABH/JCI), and salary expectations.'
    },
    {
      q: 'Is candidate data protected under medical privacy standards?',
      a: 'Absolutely. Personal contact details and uploaded credential documents are encrypted and only accessible to accredited healthcare organizations when candidates apply.'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div className="bg-[#102A43] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Hiring</span>
            <span className="text-slate-200">Looking for verified doctors, nurses, or hospital talent?</span>
            <Link to="/organization/jobs/create" className="text-teal-300 font-bold hover:underline ml-1">
              Post a Job Now &rarr;
            </Link>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> 100% Council Verified</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-teal-400" /> AI Match Engine</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-2 pb-4 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-[-5%] right-[5%] w-[420px] h-[420px] bg-teal-100/40 rounded-full blur-3xl" />
          <div className="absolute top-[15%] left-[5%] w-[380px] h-[380px] bg-cyan-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Next-Gen Healthcare Career & Talent Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight leading-[1.15]">
                Find Where Your Healthcare Career <span className="text-teal-700">Belongs.</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empowering doctors, nurses, pharmacists, and hospital networks with intelligent AI matching, verified medical council credentials, and flexible career models.
              </p>

              {/* 3-Field Unified Search Bar */}
              <form
                onSubmit={handleSearch}
                className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200/90 flex flex-col md:flex-row gap-1.5 max-w-3xl mx-auto lg:mx-0 mt-1"
              >
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border-b md:border-b-0 md:border-r border-slate-200">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Role / specialty (e.g. Cardiology, ICU)"
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border-b md:border-b-0 md:border-r border-slate-200">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={orgQuery}
                    onChange={(e) => setOrgQuery(e.target.value)}
                    placeholder="Hospital / Network (e.g. NovaCare, Apollo)"
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 flex items-center gap-2 px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="City (e.g. Hyderabad, Bangalore)"
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  Find Jobs
                </button>
              </form>

              {/* Flexible Career Mode Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1 text-xs">
                <span className="font-semibold text-slate-600 text-[11px] mr-1">Career Modes:</span>
                {[
                  { label: 'Full-Time Roles', mode: 'Full-time' },
                  { label: 'Locum & Temporary', mode: 'Locum' },
                  { label: 'Shift-Based ICU', mode: 'Shift-based' },
                  { label: 'Remote / Telemedicine', mode: 'Remote' }
                ].map((wm, idx) => (
                  <Link
                    key={idx}
                    to={`/jobs?workMode=${encodeURIComponent(wm.mode)}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold transition text-[11px] border border-slate-200/60"
                  >
                    {wm.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Visual with Clean Floating Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Main Hero Doctor Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1000&auto=format&fit=crop&q=80"
                    alt="Healthcare Specialist"
                    className="w-full h-[360px] sm:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300">MedVance Verified</span>
                    <h4 className="font-bold text-sm">Dr. Ananya Rao — Senior Interventional Cardiologist</h4>
                  </div>
                </div>

                {/* Floating Card 1: Verified Professional */}
                <div className="absolute -top-3 -left-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 animate-float">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Medical Council Verified</h5>
                    <p className="text-[10px] text-slate-500">State Medical Board Validated</p>
                  </div>
                </div>

                {/* Floating Card 2: AI Match Score */}
                <div className="absolute -bottom-3 -right-3 bg-[#102A43] text-white p-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-float-delayed">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
                    <Sparkles className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-teal-300">96% AI Match</span>
                    </div>
                    <p className="text-[10px] text-slate-300">Cath Lab & CCU Alignment</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INFINITE LOGO MARQUEE: "TRUSTED BY" */}
      <section className="bg-white py-3.5 border-y border-slate-200/80 overflow-hidden shadow-xs">
        <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Trusted by Premier Accredited Healthcare Networks:
          </span>
        </div>

        {/* Continuous Infinite Marquee Track */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap py-1">
            {partnerHospitals.concat(partnerHospitals).map((h, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-xl bg-slate-50/90 border border-slate-200/70 hover:border-teal-400 transition">
                <Building2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-bold text-xs text-slate-800">{h.name}</span>
                <span className="text-[10px] text-slate-500 font-medium">({h.city})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPACT STATS KPI BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 shadow-subtle border border-slate-200/90 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-[#102A43]">4,500+</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">Verified Clinicians & Nurses</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-teal-700">320+</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">Accredited Hospitals & Labs</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-[#102A43]">94.8%</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">AI Match Accuracy Rate</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-black text-teal-700">12 Days</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">Average Time to Clinical Hire</span>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE HEALTHCARE JOBS DIRECTORY (EXACT MATCH FOR USER SCREENSHOT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
            Browse Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Explore Healthcare Jobs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Pick a profession, role or location to find the healthcare jobs that fit you best.
          </p>
        </div>

        {/* Tab Switcher: Profession | Role | Location */}
        <div className="flex items-center justify-center gap-8 border-b border-slate-200 max-w-md mx-auto mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('profession')}
            className={`pb-2 text-sm font-bold transition relative ${
              activeTab === 'profession'
                ? 'text-[#102A43] border-b-2 border-[#102A43]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Profession
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('role')}
            className={`pb-2 text-sm font-bold transition relative ${
              activeTab === 'role'
                ? 'text-[#102A43] border-b-2 border-[#102A43]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Role
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`pb-2 text-sm font-bold transition relative ${
              activeTab === 'location'
                ? 'text-[#102A43] border-b-2 border-[#102A43]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Location
          </button>
        </div>

        {/* 4-Column Directory Grid (Soft Blue Rounded Pills from Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {directoryData[activeTab].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={`/jobs?search=${encodeURIComponent(item.query)}`}
                className="bg-[#F0F6FF] hover:bg-[#E0EDFF] text-[#102A43] p-3.5 sm:p-4 rounded-2xl border border-[#DBEAFE] hover:border-blue-300 transition duration-200 flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-white text-teal-700 flex items-center justify-center shrink-0 shadow-xs border border-blue-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-[#102A43] group-hover:text-teal-800 truncate">
                    {item.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#102A43] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </Link>
            );
          })}
        </div>

        {/* Centered Navy Pill Button: Search Jobs */}
        <div className="flex justify-center mt-6">
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4 text-teal-300" />
            <span>Search Jobs</span>
          </Link>
        </div>
      </section>

      {/* 6. COMPREHENSIVE COVERAGE: HIRING ACROSS KEY HEALTHCARE SECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block mb-1">
            Comprehensive Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
            Hiring Across Key Healthcare Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Connecting professionals with tertiary hospitals, diagnostic chains, telehealth suites, and home health providers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                to={`/jobs?search=${encodeURIComponent(sec.tag)}`}
                className="group bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-500 hover:shadow-md hover:-translate-y-0.5 transition-all text-center flex flex-col items-center justify-center cursor-pointer space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors leading-tight line-clamp-2">
                    {sec.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">{sec.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. DUAL PERSONA VALUE CARDS (JOB SEEKERS VS EMPLOYERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* For Job Seekers */}
          <div className="bg-gradient-to-br from-white to-teal-50/50 p-6 sm:p-8 rounded-3xl border border-teal-200/80 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>For Healthcare Professionals</span>
              </div>
              <h3 className="text-2xl font-bold text-[#102A43]">Advance Your Clinical Practice</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unlock opportunities with leading hospital networks, get matched by your exact specialty, and choose between full-time, locum, or night ICU shifts.
              </p>
              
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>1-Click Medical Council credential verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Transparent salary benchmarks & shift compensation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Direct contact with Chief Medical Officers & Department Heads</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm transition w-full sm:w-auto"
              >
                Browse Open Clinical Roles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* For Employers */}
          <div className="bg-gradient-to-br from-white to-slate-100/60 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>For Hospitals & Healthcare Employers</span>
              </div>
              <h3 className="text-2xl font-bold text-[#102A43]">Hire Verified Medical Talent Faster</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Eliminate unverified resumes. Source board-certified specialists, ICU-trained nurses, and clinical pharmacists with AI-scored credential matching.
              </p>
              
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Pre-screened candidates with 7-factor AI matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Built-in ATS with clinical interview scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Fast turnaround: average clinical hire in under 12 days</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/organization/jobs/create"
                className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm transition w-full sm:w-auto"
              >
                Post Hospital Vacancies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE SALARY CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HealthcareSalaryCalculator />
      </section>

      {/* 9. FEATURED CLINICAL OPENINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-2">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">Curated Openings</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">Featured Healthcare Jobs</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              High-priority positions from accredited medical centers with full salary transparency.
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200"
          >
            View All Openings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_MOCK_JOBS.slice(0, 3).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* 10. HOW IT WORKS (3-STEP PROCESS) */}
      <section className="bg-white py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Simple & Transparent</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">How MedVance AI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Verify Clinical Credentials</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your Medical Council registration or Nursing Board details. We authenticate your license to grant verified clinician status.
              </p>
            </div>

            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">7-Factor AI Match Scoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our algorithm matches you with hospitals based on procedural expertise, shift preferences, accreditation standards, and compensation.
              </p>
            </div>

            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Direct Hospital Connection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with Medical Directors and HR leadership for clinical interviews and expedited offer rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Answers & Guidance</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#102A43] hover:text-teal-700"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#102A43] via-teal-900 to-[#102A43] text-white rounded-3xl p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3.5 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Advance Your Healthcare Practice?
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Join thousands of verified doctors, nurses, and allied professionals discovering their next career milestone on MedVance AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/register"
                className="bg-white hover:bg-slate-100 text-[#102A43] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition"
              >
                Create Professional Account
              </Link>
              <Link
                to="/organization/jobs/create"
                className="bg-teal-900/80 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl border border-teal-400/40 transition"
              >
                Post Hospital Vacancies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FLOATING SPEED-DIAL ACTION BUTTONS (Matching Nextenti Right Floaters) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <Link
          to="/register"
          className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-teal-600/40 transition transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span>Ask AI Career Assistant</span>
        </Link>
      </div>

    </div>
  );
};
