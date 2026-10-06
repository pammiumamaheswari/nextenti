import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  User, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  UploadCloud, 
  Save, 
  Sparkles,
  Plus
} from 'lucide-react';

export const ProfileEditPage: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || 'Dr. Ananya Rao');
  const [headline, setHeadline] = useState('Senior Interventional Cardiologist | MD, DM Cardiology (AIIMS)');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [experience, setExperience] = useState('8');
  const [location, setLocation] = useState('Hyderabad');
  const [bio, setBio] = useState(
    'Board-certified Interventional Cardiologist with extensive fellowship training in complex coronary interventions, radial access PCI, and structural heart disease protocols.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [skills, setSkills] = useState([
    'Coronary Angioplasty',
    'Echocardiography',
    'Heart Failure Management',
    'TAVR',
    'Clinical Research',
    'ICU Care'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102A43]">Professional Healthcare Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Keep your clinical qualifications, council registration, and procedural volume updated</p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Changes Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
        {/* Avatar & Verification Indicator */}
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80'}
            alt="Doctor"
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">{name}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Verified Practitioner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">State Medical Council Reg: REG-492104</p>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name & Honorific</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Specialization / Department</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Professional Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Experience (Years)</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Primary Clinical Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Biography & Procedural Scope</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Skills Tag Input */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">Clinical Competencies & Procedural Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((s, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
                {s}
                <button type="button" onClick={() => handleRemoveSkill(s)} className="text-teal-600 hover:text-teal-900">×</button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Critical Care Triage, NABH Compliance)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Updates
          </button>
        </div>
      </form>
    </div>
  );
};
