import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, Stethoscope, Lightbulb } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.js';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface AICareerAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICareerAssistantModal: React.FC<AICareerAssistantModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${user?.name || 'Doctor'}! I am your MedVance AI Healthcare Career Advisor. Ask me anything about specialty compensation benchmarks, hospital medical board interviews, or optimizing your clinical profile.`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'How can I prepare for tertiary hospital interviews?',
    'What are the 2026 salary benchmarks for my specialty?',
    'How do I highlight NABH protocols on my CV?'
  ];

  const handleSend = (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let reply = '';
      const q = question.toLowerCase();

      if (q.includes('interview') || q.includes('prepare')) {
        reply = `**Healthcare Selection Board Strategy:**
1. **Clinical Scenarios**: Expect queries on deteriorating patients using SBAR (Situation, Background, Assessment, Recommendation).
2. **Clinical Governance**: Emphasize familiarity with hospital infection control committee (HICC) and antibiotic stewardship.
3. **Research the Hospital**: Know their bed capacity, NABH accreditations, and recent surgical milestones.`;
      } else if (q.includes('salary') || q.includes('compensation') || q.includes('benchmark')) {
        reply = `**2026 Healthcare Compensation Benchmarks (Metros):**
- **Specialist Doctors (MD/DM)**: ₹24L – ₹45L+ p.a.
- **Critical Care Staff Nurses**: ₹5.5L – ₹8.5L p.a.
- **Clinical Pharmacists (Pharm.D)**: ₹4.5L – ₹7.5L p.a.
- **Healthcare IT / Informatics Leads**: ₹18L – ₹32L p.a.`;
      } else {
        reply = `Based on your profile as ${user?.headline || 'a Healthcare Specialist'}, you have strong clinical fundamentals. To accelerate your career into leadership roles, consider adding NABH Internal Auditor certification and documenting procedural volume metrics.`;
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#102A43] to-[#0F766E] text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-teal-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">MedVance AI Career Advisor</h3>
              <p className="text-xs text-teal-200">Context-aware healthcare mentorship</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user' ? 'bg-[#102A43] text-white' : 'bg-teal-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#102A43] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
                <span
                  className={`block text-[10px] mt-1.5 ${
                    m.sender === 'user' ? 'text-slate-300 text-right' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 pl-11">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span>Analyzing healthcare career database...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Suggestions:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 transition whitespace-nowrap border border-slate-200/60"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your career or interview question..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white p-2.5 rounded-xl shadow-sm transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
