import React, { useState } from 'react';
import { Calendar, PlusCircle, Video, MapPin, CheckCircle2, Clock, User, X } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext.js';

export const InterviewsPage: React.FC = () => {
  const { addNotification } = useNotifications();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const [interviews, setInterviews] = useState([
    {
      id: 'int_1',
      candidateName: 'Dr. Ananya Rao',
      role: 'Senior Interventional Cardiologist',
      date: 'April 18, 2026',
      time: '11:00 AM IST',
      type: 'Video Medical Round',
      meetingLink: 'https://meet.medvance.ai/room-novacare-cardio',
      status: 'SCHEDULED'
    },
    {
      id: 'int_2',
      candidateName: 'Priya Nair',
      role: 'Lead ICU Staff Nurse',
      date: 'April 20, 2026',
      time: '02:30 PM IST',
      type: 'In-Person Hospital Assessment',
      meetingLink: '',
      status: 'SCHEDULED'
    }
  ]);

  const [candidateName, setCandidateName] = useState('Dr. Arjun Mehta');
  const [role, setRole] = useState('Consultant Neurologist');
  const [date, setDate] = useState('2026-04-22');
  const [time, setTime] = useState('10:00 AM');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt = {
      id: `int_${Date.now()}`,
      candidateName,
      role,
      date,
      time,
      type: 'Video Medical Round',
      meetingLink: 'https://meet.medvance.ai/room-' + Math.random().toString(36).substring(7),
      status: 'SCHEDULED'
    };

    setInterviews([...interviews, newInt]);
    setScheduleModalOpen(false);

    addNotification({
      title: 'Interview Scheduled',
      message: `Interview with ${candidateName} for ${role} set for ${date}.`,
      type: 'INTERVIEW'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102A43]">Clinical Interviews & Medical Rounds</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage scheduled clinical panel assessments and video interviews</p>
        </div>

        <button
          onClick={() => setScheduleModalOpen(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" /> Schedule Clinical Interview
        </button>
      </div>

      <div className="space-y-4">
        {interviews.map((int) => (
          <div key={int.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">{int.candidateName}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  {int.status}
                </span>
              </div>
              <p className="text-xs text-teal-700 font-semibold">{int.role}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {int.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {int.time}</span>
                <span>• {int.type}</span>
              </div>
            </div>

            {int.meetingLink && (
              <a
                href={int.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="bg-[#102A43] hover:bg-[#0B1C2D] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <Video className="w-4 h-4 text-teal-300" /> Start Meeting
              </a>
            )}
          </div>
        ))}
      </div>

      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Schedule Clinical Round</h3>
              <button onClick={() => setScheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Position</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2 rounded-xl shadow-sm"
                >
                  Schedule Round
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const ManageJobsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102A43]">Manage Hospital Openings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Active and draft vacancies published by your institution</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Jobs list */}
        {INITIAL_CANDIDATES.slice(0, 3).map((_, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle flex items-center justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                ACTIVE
              </span>
              <h3 className="font-bold text-base text-slate-900 mt-1">
                {idx === 0 ? 'Senior Interventional Cardiologist' : idx === 1 ? 'Lead ICU Staff Nurse' : 'Senior Molecular Pathologist'}
              </h3>
              <p className="text-xs text-slate-500">Department of Clinical Medicine • Hyderabad</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-teal-800 block">{14 + idx * 5} Applicants</span>
              <span className="text-[11px] text-slate-400">Published 4 days ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
