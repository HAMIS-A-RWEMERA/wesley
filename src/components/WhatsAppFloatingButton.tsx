import React, { useState } from 'react';
import { getStoredSettings } from '../data';
import { MessageSquare, X, Send, Sparkles, Check, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const settings = getStoredSettings();

  const phoneNumber = settings.whatsapp || '250792087787';

  const quickPrompts = [
    '🎬 Hi Wesley, I have a documentary or film production inquiry.',
    '📸 Hello Wesley, I would like to book a portrait or wedding session.',
    '✨ Love your films and visual work! Can we connect?'
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
        <div className="mb-4 w-[340px] sm:w-[380px] bg-[#121217] border border-[#25D366]/40 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-5 duration-250 flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d3319] via-[#0f2e1a] to-[#121217] border-b border-[#25D366]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={settings.profileImage}
                  alt="Director Wesley"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#25D366]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#121217] rounded-full" />
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Wesley</span>
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
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
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#0a0a0d] space-y-3.5 max-h-[320px] overflow-y-auto">
            {/* Studio Greeting Bubble */}
            <div className="bg-[#181822] border border-[#252535] rounded-2xl rounded-tl-none p-3.5 space-y-1.5 text-xs text-[#e0e0ec] shadow-sm">
              <p className="font-semibold text-white">
                Muraho! 👋 Welcome to Wesley Studio.
              </p>
              <p className="text-[#a0a0b0] leading-relaxed">
                Whether you need a full documentary crew in Rwanda, a private portrait sitting, or footage licensing, tap below to chat directly with me on WhatsApp.
              </p>
              <span className="text-[10px] text-[#606070] block text-right">Just now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e8e9c]">
                Quick Starters:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartChat(prompt)}
                    className="text-left text-[11px] p-2 rounded-xl bg-[#14141c] hover:bg-[#25D366]/20 border border-[#22222e] hover:border-[#25D366]/50 text-[#c0c0d0] hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="truncate">{prompt}</span>
                    <Send className="w-3 h-3 text-[#25D366] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-[#111116] border-t border-[#1e1e26] flex items-center gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message to Wesley..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStartChat();
              }}
              className="flex-1 px-3 py-2 rounded-full bg-[#181822] border border-[#2a2a38] text-white text-xs focus:border-[#25D366] focus:outline-none"
            />
            <button
              onClick={() => handleStartChat()}
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shrink-0 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
              title="Open WhatsApp"
            >
              <Send className="w-4 h-4 fill-current ml-0.5" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-black font-bold shadow-[0_5px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-6 h-6 flex items-center justify-center text-black">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-black/80 leading-none">
            Chat on WhatsApp
          </span>
          <span className="text-xs font-bold text-black leading-tight">
            +250 792 087 787
          </span>
        </div>
      </button>

    </div>
  );
};
