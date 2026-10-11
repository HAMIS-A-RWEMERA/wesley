import React, { useState } from 'react';
import { getStoredSettings } from '../data';
import { MessageSquare, X, Send, Sparkles, Check, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const settings = getStoredSettings();

  const phoneNumber = '250792087787';

  const quickPrompts = [
    '🎬 Hi Wesley, I have a corporate video or brand film project inquiry.',
    '📸 Hello Wesley, I would like to book a photography session in Kigali.',
    '🎥 Loved THREE NIGHTS! Can we discuss a film co-production?'
  ];

  const handleStartChat = (customText?: string) => {
    const messageToSend = customText || userMessage || 'Hello Director Wesley! I am visiting your studio website and would like to connect.';
    const encoded = encodeURIComponent(messageToSend);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Chat Popup Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-[#0c101d] border border-[#25D366]/40 rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.85)] overflow-hidden animate-in slide-in-from-bottom-5 duration-250 flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d2a1b] via-[#0b1f15] to-[#0c101d] border-b border-[#25D366]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={settings.profileImage}
                  alt="Director Wesley"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#25D366]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#0c101d] rounded-full" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Wesley</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] font-mono">Director</span>
                </h4>
                <p className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Online • +250 792 087 787</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#25D366] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body & Quick Prompts */}
          <div className="p-4 space-y-3 bg-[#070a12]/90">
            <div className="bg-[#101726] p-3 rounded-2xl rounded-tl-none border border-white/10 text-xs text-[#cbd5e1] leading-relaxed">
              Hello! 👋 Welcome to Wesley Studio. How can we collaborate on your next film, commercial, or photo project today?
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8] block">
                Quick Options:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleStartChat(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#0c1322] hover:bg-[#25D366]/15 hover:border-[#25D366]/40 border border-white/[0.06] text-xs text-[#cbd5e1] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <span className="text-[#25D366] opacity-0 group-hover:opacity-100 font-bold">→</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message to Wesley..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartChat();
                }}
                className="flex-1 px-3 py-2.5 rounded-xl bg-[#0e1628] border border-white/10 text-white text-xs focus:border-[#25D366] focus:outline-none"
              />
              <button
                onClick={() => handleStartChat()}
                className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold flex items-center justify-center transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-4 py-2 bg-[#06080e] border-t border-white/[0.06] text-[10px] text-[#64748b] text-center flex items-center justify-center gap-1.5">
            <Phone className="w-3 h-3 text-[#25D366]" />
            <span>Direct WhatsApp line: +250 792 087 787</span>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Chat on WhatsApp with Director Wesley"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#25D366] text-black font-extrabold shadow-[0_10px_35px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_45px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open WhatsApp conversation"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs tracking-wider uppercase hidden sm:inline-block">
          WhatsApp Wesley
        </span>
      </button>

    </div>
  );
};
