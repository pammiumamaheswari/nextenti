import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  ArrowUpDown,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';

export const JobSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [profession, setProfession] = useState(searchParams.get('profession') || 'All');
  const [location, setLocation] = useState(searchParams.get('location') || 'All Locations');
  const [workMode, setWorkMode] = useState(searchParams.get('workMode') || 'All');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || 'All');
  const [minExp, setMinExp] = useState(searchParams.get('experience') || '0');
  const [sortBy, setSortBy] = useState('match');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync back to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (profession !== 'All') params.set('profession', profession);
    if (location !== 'All Locations') params.set('location', location);
    if (workMode !== 'All') params.set('workMode', workMode);
    if (jobType !== 'All') params.set('jobType', jobType);
    if (minExp !== '0') params.set('experience', minExp);
    setSearchParams(params, { replace: true });
  }, [searchTerm, profession, location, workMode, jobType, minExp]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return INITIAL_MOCK_JOBS.filter((job) => {
      // Search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesOrg = job.organization?.name?.toLowerCase().includes(query);
        const matchesSkills = job.skills?.some(s => s.toLowerCase().includes(query));
        const matchesSpec = job.specialization?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrg && !matchesSkills && !matchesSpec) return false;
      }

      // Profession
      if (profession !== 'All' && !job.profession.toLowerCase().includes(profession.toLowerCase())) {
        return false;
      }

      // Location
      if (location !== 'All Locations' && !job.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Work Mode
      if (workMode !== 'All' && job.workMode !== workMode) {
        return false;
      }

      // Job Type
      if (jobType !== 'All' && job.jobType !== jobType) {
        return false;
      }

      // Experience
      if (parseInt(minExp, 10) > 0 && job.experienceMin > parseInt(minExp, 10)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary') return (b.salaryMax || 0) - (a.salaryMax || 0);
      if (sortBy === 'newest') return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      return 0; // Default match ranking
    });
  }, [searchTerm, profession, location, workMode, jobType, minExp, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setProfession('All');
    setLocation('All Locations');
    setWorkMode('All');
    setJobType('All');
    setMinExp('0');
  };

  const professionsList = ['All', 'Doctor', 'Nurse', 'Pharmacist', 'Lab Technologist', 'Healthcare IT', 'Healthcare Administrator'];
  const locationsList = ['All Locations', 'Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Delhi', 'Kochi'];
  const workModesList = ['All', 'On-site', 'Hybrid', 'Remote', 'Shift-based'];
  const jobTypesList = ['All', 'Full-time', 'Part-time', 'Contract', 'Locum', 'Fellowship'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by specialty, role, skill (e.g. Cardiology, Cath Lab, ICU)..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 w-full md:w-auto justify-between">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="match">AI Match Score</option>
              <option value="newest">Latest Posted</option>
              <option value="salary">Highest Compensation</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-6`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-teal-700" />
              Filter Opportunities
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs text-teal-700 hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Profession */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Profession</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {professionsList.map((p) => (
                <label key={p} className="flex items-center gap-2 text-xs text-slate-700 hover:text-teal-800 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="profession"
                    checked={profession === p}
                    onChange={() => setProfession(p)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Work Mode</label>
            <div className="space-y-1.5">
              {workModesList.map((wm) => (
                <label key={wm} className="flex items-center gap-2 text-xs text-slate-700 hover:text-teal-800 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="workMode"
                    checked={workMode === wm}
                    onChange={() => setWorkMode(wm)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>{wm}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Job Type</label>
            <div className="space-y-1.5">
              {jobTypesList.map((jt) => (
                <label key={jt} className="flex items-center gap-2 text-xs text-slate-700 hover:text-teal-800 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="jobType"
                    checked={jobType === jt}
                    onChange={() => setJobType(jt)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>{jt}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Job Results Feed */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong className="text-slate-800">{filteredJobs.length}</strong> matching verified openings</span>
            {(profession !== 'All' || location !== 'All Locations' || searchTerm) && (
              <span className="text-teal-700 font-medium">Filtered results applied</span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-subtle">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">No matching clinical jobs found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing some filters or searching with broader clinical terms.
              </p>
              <button
                onClick={clearFilters}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
