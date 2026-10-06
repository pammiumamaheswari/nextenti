import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { Send, Search, Building2, User, CheckCheck, Paperclip } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();

  const contacts = [
    {
      id: 'conv_1',
      name: 'NovaCare Talent Acquisition',
      role: 'Hospital HR & Medical Recruitment',
      avatar: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'We have scheduled your clinical interview for April 18 at 11 AM.',
      time: '2h ago',
      unread: 1,
      online: true
    },
    {
      id: 'conv_2',
      name: 'Dr. Vikram Malhotra (Medical Director)',
      role: 'Medisphere Hospitals',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'Looking forward to reviewing your catheterization case volume summary.',
      time: 'Yesterday',
      unread: 0,
      online: false
    }
  ];

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'them',
      text: 'Good afternoon Dr. Rao. The Medical Board reviewed your credentials for the Senior Interventional Cardiologist position.',
      time: '10:30 AM'
    },
    {
      id: 'm2',
      sender: 'me',
      text: 'Thank you for the update. I have reviewed the Cath lab infrastructure specifications.',
      time: '10:45 AM'
    },
    {
      id: 'm3',
      sender: 'them',
      text: 'We have scheduled your clinical interview for April 18 at 11 AM. The link is available in your dashboard.',
      time: '11:15 AM'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: input,
      time: 'Just now'
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="h-[75vh] bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden flex flex-col md:flex-row">
      {/* Contact List */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-sm text-slate-900 mb-2">Hospital Conversations</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveContact(c)}
              className={`w-full p-4 text-left flex items-start gap-3 transition ${
                activeContact.id === c.id ? 'bg-teal-50/70 border-l-4 border-teal-600' : 'hover:bg-slate-100/60'
              }`}
            >
              <div className="relative shrink-0">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                {c.online && (
                  <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{c.name}</h4>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{c.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-xs text-slate-900">{activeContact.name}</h3>
              <p className="text-[11px] text-teal-700 font-medium">{activeContact.role}</p>
            </div>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  m.sender === 'me'
                    ? 'bg-[#102A43] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span className={`block text-[10px] mt-1 ${m.sender === 'me' ? 'text-slate-300 text-right' : 'text-slate-400'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex items-center gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to recruiter..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white p-2.5 rounded-xl transition">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
