import React, { useState } from 'react';
import { STUDIO_INFO, saveMessage, Message as MessageType } from '../data';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const newMessage: MessageType = {
      id: `MSG-${Date.now()}`,
      name,
      email,
      subject,
      message,
      isRead: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveMessage(newMessage);
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
          GET IN TOUCH
        </span>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          CONTACT WESLEY STUDIO
        </h1>
        <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
          Inquiries for film commissions, co-productions, documentary shoots, press interviews, and fine-art print acquisitions across East Africa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Studio Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#d4af37]">
              HEADQUARTERS
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
              KIGALI STUDIO
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111116] border border-[#22222a]">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Physical Address</h4>
                <p className="text-xs text-[#9e9ea8]">{STUDIO_INFO.address}</p>
                <p className="text-[11px] text-[#707080]">Kacyiru Embassy District, Kigali</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111116] border border-[#22222a]">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Official Email</h4>
                <a href={`mailto:${STUDIO_INFO.email}`} className="text-xs text-[#d4af37] hover:underline block font-semibold">
                  {STUDIO_INFO.email}
                </a>
                <p className="text-[11px] text-[#707080]">Monitored daily by Director Wesley</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111116] border border-[#22222a]">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Telephone & WhatsApp</h4>
                <p className="text-xs text-white font-mono">{STUDIO_INFO.phone}</p>
                <a 
                  href={`https://wa.me/${STUDIO_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[11px] text-[#25D366] hover:underline block"
                >
                  Direct WhatsApp Chat Available →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111116] border border-[#22222a]">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Studio Operating Hours</h4>
                <p className="text-xs text-[#9e9ea8]">{STUDIO_INFO.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Press and Licensing Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171408] to-[#12110a] border border-[#d4af37]/30 space-y-2">
            <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
              Press, Festival & Footage Licensing
            </h4>
            <p className="text-xs text-[#a0a0b0] leading-relaxed">
              For 4K/6K archival Rwanda landscape footage licensing, media interviews, or festival screener links, email directly to <strong className="text-white">{STUDIO_INFO.email}</strong>.
            </p>
          </div>
        </div>

        {/* Contact Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#111116] border border-[#22222a] rounded-3xl p-8 sm:p-12 space-y-6">
          
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
              DIRECT MESSAGE
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
              SEND INQUIRY TO DIRECTOR WESLEY
            </h3>
            <p className="text-xs text-[#8e8e9c]">
              Fill out the form below and our studio team will respond promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#161622] border border-[#d4af37] text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-[#a0a0b0]">
                Thank you, {name}. Your inquiry has been forwarded to Wesley at <strong className="text-[#d4af37]">{STUDIO_INFO.email}</strong>.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
                  className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors inline-block"
                >
                  Send via Email Client Also
                </a>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="text-xs text-[#707080] hover:text-white underline cursor-pointer pt-2 block mx-auto"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean-Luc Habimana"
                    className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Documentary Co-production / Fine-Art Commission"
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                  Message Body *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project timeline, location, budget scope, or specific inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#8e8e9c]">
                  Recipient: <strong className="text-[#d4af37]">{STUDIO_INFO.email}</strong>
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
