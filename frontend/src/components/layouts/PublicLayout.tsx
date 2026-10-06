import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar.js';
import { Footer } from '../common/Footer.js';
import { AICareerAssistantModal } from '../ai/AICareerAssistantModal.js';
import { Sparkles, MessageSquare } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating AI Assistant Trigger */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-700 to-[#102A43] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group ring-4 ring-teal-500/20"
        title="MedVance AI Career Advisor"
      >
        <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
        <span className="font-bold text-xs pr-1 hidden sm:inline">Ask AI Career Assistant</span>
      </button>

      <AICareerAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
};
