import React, { useState } from 'react';
import { 
  STUDIO_INFO, saveMessage, saveSuggestion, 
  Message as MessageType, Suggestion as SuggestionType 
} from '../data';
import { 
  MapPin, Mail, Phone, Clock, Send, CheckCircle2, 
  MessageSquare, Lightbulb, MessageCircle 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'inquiry' | 'suggestion'>('inquiry');

  // Inquiry state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Suggestion state
  const [sugName, setSugName] = useState('');
  const [sugEmail, setSugEmail] = useState('');
  const [sugCategory, setSugCategory] = useState<'film_idea' | 'website_feedback' | 'collaboration' | 'general'>('film_idea');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
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
    setInquirySubmitted(true);

    // Also trigger direct email draft to rwemera30@gmail.com
    const mailtoUrl = `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionText) {
      alert('Please enter your suggestion.');
      return;
    }

    const newSuggestion: SuggestionType = {
      id: `SUG-${Date.now()}`,
      name: sugName || 'Anonymous Contributor',
      email: sugEmail || '',
      category: sugCategory,
      suggestion: suggestionText,
      createdAt: new Date().toISOString().split('T')[0],
      isRead: false
    };

    saveSuggestion(newSuggestion);
    setSuggestionSubmitted(true);

    // Directly prepare and trigger email notification to Director Wesley at studio email
    const emailSubject = encodeURIComponent(`[Studio Suggestion Box] ${sugCategory.toUpperCase().replace('_', ' ')} from ${sugName || 'Anonymous'}`);
    const emailBody = encodeURIComponent(
      `Hello Wesley,\n\nA new suggestion has been submitted to your studio website suggestion box:\n\nCategory: ${sugCategory}\nContributor: ${sugName || 'Anonymous'} (${sugEmail || 'No email provided'})\nDate: ${new Date().toLocaleDateString()}\n\nSuggestion Message:\n"${suggestionText}"\n\nThis suggestion has also been recorded in your Studio CMS Dashboard for your review.`
    );
    window.open(`mailto:${STUDIO_INFO.email}?subject=${emailSubject}&body=${emailBody}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
          DIRECT CONNECT
        </span>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          CONTACT & SUGGESTIONS
        </h1>
        <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
          Reach Director Wesley directly for film commissions, co-productions, press inquiries, or share your creative concepts in our studio suggestion box.
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
                <h4 className="font-bold text-white text-sm">Official Studio Email</h4>
                <a href={`mailto:${STUDIO_INFO.email}`} className="text-xs text-[#d4af37] hover:underline block font-semibold">
                  {STUDIO_INFO.email}
                </a>
                <p className="text-[11px] text-[#707080]">Directly monitored by Director Wesley</p>
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
                  href={`https://wa.me/${STUDIO_INFO.whatsapp}?text=Hello%20Wesley%2C%20I%20am%20interested%20in%20discussing%20a%20project`} 
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

        {/* Form Column with Toggle (7 cols) */}
        <div className="lg:col-span-7 bg-[#111116] border border-[#22222a] rounded-3xl p-8 sm:p-12 space-y-6">
          
          {/* Form Switcher */}
          <div className="flex items-center gap-3 p-1.5 rounded-xl bg-[#0c0c10] border border-[#202028]">
            <button
              onClick={() => setActiveForm('inquiry')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeForm === 'inquiry'
                  ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-[#9e9ea8] hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Studio Inquiry Form</span>
            </button>

            <button
              onClick={() => setActiveForm('suggestion')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeForm === 'suggestion'
                  ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-[#9e9ea8] hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Suggestion & Idea Box</span>
            </button>
          </div>

          {/* Form 1: Studio Inquiry Form */}
          {activeForm === 'inquiry' ? (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
                  DIRECT MESSAGE
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  SEND MESSAGE TO WESLEY
                </h3>
                <p className="text-xs text-[#8e8e9c]">
                  Delivers straight to <strong className="text-[#d4af37]">{STUDIO_INFO.email}</strong> and studio CMS.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="p-8 rounded-2xl bg-[#161622] border border-[#d4af37] text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#a0a0b0]">
                    Thank you, {name}. Your inquiry has been registered and emailed to Wesley at <strong className="text-[#d4af37]">{STUDIO_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setInquirySubmitted(false);
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
                <form onSubmit={handleInquirySubmit} className="space-y-5">
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
                      Direct Recipient: <strong className="text-[#d4af37]">{STUDIO_INFO.email}</strong>
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
          ) : (
            /* Form 2: Suggestion & Creative Idea Box */
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
                  COMMUNITY VOICE
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                  STUDIO SUGGESTION & FILM IDEA BOX
                </h3>
                <p className="text-xs text-[#8e8e9c]">
                  Have an untold Rwandan story, an exhibition concept, or creative suggestion for Wesley? Drop it in our suggestion box for review in the director CMS!
                </p>
              </div>

              {suggestionSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#161622] border border-[#d4af37] text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white">
                    Thank You for Your Suggestion!
                  </h4>
                  <p className="text-xs text-[#a0a0b0]">
                    Your idea has been safely placed in Director Wesley's suggestion box. We deeply appreciate your creative voice and perspective.
                  </p>
                  <button
                    onClick={() => {
                      setSuggestionSubmitted(false);
                      setSuggestionText('');
                    }}
                    className="text-xs text-[#707080] hover:text-white underline cursor-pointer pt-2 block mx-auto"
                  >
                    Submit Another Idea
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSuggestionSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={sugName}
                        onChange={(e) => setSugName(e.target.value)}
                        placeholder="Anonymous or your name"
                        className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                        Email (Optional, if you wish for a reply)
                      </label>
                      <input
                        type="email"
                        value={sugEmail}
                        onChange={(e) => setSugEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                      Suggestion Category
                    </label>
                    <select
                      value={sugCategory}
                      onChange={(e) => setSugCategory(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none cursor-pointer"
                    >
                      <option value="film_idea">Untold African Story / Documentary Film Idea</option>
                      <option value="collaboration">Exhibition / Artistic Collaboration Proposal</option>
                      <option value="website_feedback">Studio Website Feedback & Feature Request</option>
                      <option value="general">General Studio Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                      Your Suggestion / Story Pitch *
                    </label>
                    <textarea
                      rows={5}
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)}
                      placeholder="Share your ideas, characters, community stories, or constructive thoughts..."
                      className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Submit to Director's Suggestion Box</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
