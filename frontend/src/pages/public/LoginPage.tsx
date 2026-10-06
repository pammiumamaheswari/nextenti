import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext.js';
import { Stethoscope, Lock, Mail, ShieldCheck, Sparkles, ArrowRight, UserCheck, Building2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchRolePersona } = useAuth();
  const [email, setEmail] = useState('ananya.rao@medvance.demo');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('PROFESSIONAL');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, role);
      if (role === 'SUPER_ADMIN') navigate('/admin/dashboard');
      else if (role === 'ORGANIZATION_ADMIN' || role === 'RECRUITER') navigate('/organization/dashboard');
      else navigate('/professional/dashboard');
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-premium p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#102A43]">Welcome Back to MedVance AI</h2>
          <p className="text-xs text-slate-500">Sign in to manage your healthcare applications or recruitment pipeline</p>
        </div>

        {/* Quick Demo Persona One-Click Buttons */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-700 block text-center">Quick 1-Click Demo Logins:</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                switchRolePersona('doctor');
                navigate('/professional/dashboard');
              }}
              className="p-2 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-teal-500 transition text-left"
            >
              👨‍⚕️ Dr. Ananya (Doctor)
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('recruiter');
                navigate('/organization/dashboard');
              }}
              className="p-2 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-teal-500 transition text-left"
            >
              🏥 NovaCare (Recruiter)
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('nurse');
                navigate('/professional/dashboard');
              }}
              className="p-2 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-teal-500 transition text-left"
            >
              👩‍⚕️ Priya (Staff Nurse)
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('admin');
                navigate('/admin/dashboard');
              }}
              className="p-2 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:border-teal-500 transition text-left"
            >
              🛡️ Super Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="doctor@hospital.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 block">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-teal-700 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          New to MedVance AI?{' '}
          <Link to="/register" className="font-bold text-teal-700 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};
