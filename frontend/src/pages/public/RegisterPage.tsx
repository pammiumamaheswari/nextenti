import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext.js';
import { Stethoscope, Building2, User, Mail, Phone, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'PROFESSIONAL');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('Doctor');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        password,
        role,
        profession,
        organizationName: orgName
      });

      if (role === 'ORGANIZATION_ADMIN') {
        navigate('/organization/dashboard');
      } else {
        navigate('/professional/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-premium p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#102A43]">Create Your MedVance AI Account</h2>
          <p className="text-xs text-slate-500">Join the verified healthcare talent ecosystem</p>
        </div>

        {/* Persona Select */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('PROFESSIONAL')}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              role === 'PROFESSIONAL'
                ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <User className={`w-5 h-5 ${role === 'PROFESSIONAL' ? 'text-teal-700' : 'text-slate-400'}`} />
            <div>
              <span className="font-bold text-xs text-slate-900 block">Healthcare Professional</span>
              <span className="text-[10px] text-slate-500">Doctor, Nurse, Pharmacist</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('ORGANIZATION_ADMIN')}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              role === 'ORGANIZATION_ADMIN'
                ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <Building2 className={`w-5 h-5 ${role === 'ORGANIZATION_ADMIN' ? 'text-teal-700' : 'text-slate-400'}`} />
            <div>
              <span className="font-bold text-xs text-slate-900 block">Hospital / Employer</span>
              <span className="text-[10px] text-slate-500">Hospitals, Clinics, Labs</span>
            </div>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {role === 'PROFESSIONAL' ? 'Full Name & Title' : 'Contact Person Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'PROFESSIONAL' ? 'Dr. Sarah Smith' : 'Rohit Sharma (HR Lead)'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@healthcare.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              {role === 'PROFESSIONAL' ? (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Profession</label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Doctor">Doctor / Specialist</option>
                    <option value="Nurse">Staff Nurse / ICU Specialist</option>
                    <option value="Pharmacist">Clinical Pharmacist</option>
                    <option value="Lab Technologist">Medical Lab Technologist</option>
                    <option value="Healthcare IT">Health Informatics / Clinical IT</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hospital / Entity Name</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Apollo / Fortis / NovaCare"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Create Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-teal-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
