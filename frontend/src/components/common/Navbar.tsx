import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { useNotifications } from '../../contexts/NotificationContext.js';
import { 
  Stethoscope, 
  Bell, 
  User, 
  Building2, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Briefcase,
  Layers,
  PlusCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'SUPER_ADMIN') return '/admin/dashboard';
    if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') return '/organization/dashboard';
    return '/professional/dashboard';
  };

  const getDashboardLabel = () => {
    if (!user) return 'My Portal';
    if (user.role === 'SUPER_ADMIN') return 'Admin Portal';
    if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') return 'Employer Portal';
    return 'Clinician Portal';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 border-b border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A43] to-[#0F766E] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#102A43]">MedVance</span>
                <span className="px-1.5 py-0.5 rounded text-[11px] font-black bg-teal-100 text-teal-800 tracking-wider">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide -mt-0.5">HEALTHCARE TALENT ECOSYSTEM</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-7 text-[15px] font-bold text-slate-800">
            <Link 
              to="/jobs" 
              className={`transition hover:text-teal-700 ${location.pathname.startsWith('/jobs') ? 'text-teal-700' : ''}`}
            >
              Jobs
            </Link>
            <Link 
              to="/about" 
              className={`transition hover:text-teal-700 ${location.pathname === '/about' && !location.hash ? 'text-teal-700' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/about#leadership" 
              className="transition hover:text-teal-700"
            >
              Leadership
            </Link>
            <Link 
              to="/how-it-works" 
              className={`transition hover:text-teal-700 ${location.pathname === '/how-it-works' ? 'text-teal-700' : ''}`}
            >
              How It Works
            </Link>
            <Link 
              to="/faqs" 
              className={`transition hover:text-teal-700 ${location.pathname === '/faqs' ? 'text-teal-700' : ''}`}
            >
              FAQ's
            </Link>
            <Link 
              to="/contact" 
              className={`transition hover:text-teal-700 ${location.pathname === '/contact' ? 'text-teal-700' : ''}`}
            >
              Contact Us
            </Link>
            <Link 
              to="/resources" 
              className={`transition hover:text-teal-700 ${location.pathname.startsWith('/resources') || location.pathname.startsWith('/blogs') ? 'text-teal-700' : ''}`}
            >
              Blogs
            </Link>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Notification Bell (Only when logged in or with alerts) */}
            {user && (
              <div className="relative" ref={notifDropdownRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-full transition"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-teal-700 hover:underline font-semibold"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition ${!n.isRead ? 'bg-teal-50/50' : ''}`}>
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authenticated User Menu */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardLink()}
                  className="bg-[#102A43] hover:bg-[#0B1C2D] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-teal-300" />
                  {getDashboardLabel()}
                </Link>

                {/* User Profile Pill & Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-600/30"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-teal-700 font-semibold truncate capitalize">{user.role?.toLowerCase().replace('_', ' ')}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                        >
                          <span>Open Dashboard</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                        {user.role === 'PROFESSIONAL' && (
                          <>
                            <Link
                              to="/professional/profile"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Edit Profile & CV
                            </Link>
                            <Link
                              to="/professional/verification"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              License & Credentials
                            </Link>
                            <Link
                              to="/professional/applications"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              My Applications
                            </Link>
                          </>
                        )}
                        {(user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') && (
                          <>
                            <Link
                              to="/organization/candidates"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Find Candidates
                            </Link>
                            <Link
                              to="/organization/applications"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Recruitment Pipeline
                            </Link>
                            <Link
                              to="/organization/jobs/create"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              + Post New Job
                            </Link>
                          </>
                        )}
                      </div>

                      {/* Quick Portal Switcher */}
                      <div className="pt-2 border-t border-slate-100 px-3 pb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Switch View / Persona:</span>
                        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
                          <button
                            onClick={() => {
                              switchRole('PROFESSIONAL');
                              setUserDropdownOpen(false);
                              navigate('/professional/dashboard');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'PROFESSIONAL' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Doctor
                          </button>
                          <button
                            onClick={() => {
                              switchRole('ORGANIZATION_ADMIN');
                              setUserDropdownOpen(false);
                              navigate('/organization/dashboard');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'ORGANIZATION_ADMIN' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Employer
                          </button>
                          <button
                            onClick={() => {
                              switchRole('SUPER_ADMIN');
                              setUserDropdownOpen(false);
                              navigate('/admin/dashboard');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'SUPER_ADMIN' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 mt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Public Logged-Out Actions */
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="bg-[#102A43] hover:bg-[#0B1C2D] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-white text-xs sm:text-sm font-bold px-5 py-1.5 rounded-full transition"
                >
                  Sign Up
                </Link>

                <div className="hidden sm:block h-6 w-px bg-slate-300 mx-1" />

                {/* For Employer Dropdown Button */}
                <div className="relative group">
                  <Link
                    to="/organization/jobs/create"
                    className="bg-[#D92534] hover:bg-[#B91C1C] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-1.5"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>For Employer</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>

                  {/* Dropdown on Hover/Click */}
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95">
                    <Link
                      to="/organization/jobs/create"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      + Post a Healthcare Job
                    </Link>
                    <Link
                      to="/organization/candidates"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      Browse Talent Pool
                    </Link>
                    <Link
                      to="/organization/dashboard"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      Employer Talent SaaS
                    </Link>
                    <Link
                      to="/pricing"
                      className="block px-4 py-2 text-xs text-teal-700 hover:bg-slate-50 font-bold border-t border-slate-100"
                    >
                      View Pricing & Plans
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2.5">
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            About Us
          </Link>
          <Link
            to="/about#leadership"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Leadership
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            How It Works
          </Link>
          <Link
            to="/faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            FAQ's
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Contact Us
          </Link>
          <Link
            to="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Blogs
          </Link>
          {user ? (
            <Link
              to={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-teal-700 text-white text-center py-2.5 rounded-xl font-bold text-sm shadow-sm"
            >
              Open {getDashboardLabel()}
            </Link>
          ) : (
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-full font-bold text-xs bg-[#102A43] text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-full font-bold text-xs border-2 border-[#102A43] text-[#102A43]"
              >
                Sign Up
              </Link>
              <Link
                to="/organization/jobs/create"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 block text-center py-2.5 rounded-full font-bold text-xs bg-[#D92534] text-white shadow-sm mt-1"
              >
                For Employer (Post a Job)
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
