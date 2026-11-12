import React, { useState, useEffect } from 'react';
import { 
  getStoredSettings, saveMessage, saveSuggestion, 
  Message as MessageType, Suggestion as SuggestionType 
} from '../data';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare, 
  Lightbulb, CheckCircle2 
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Suggestion Box State
  const [sugName, setSugName] = useState('');
  const [sugEmail, setSugEmail] = useState('');
  const [sugCategory, setSugCategory] = useState<'film_idea' | 'website_feedback' | 'collaboration' | 'general'>('film_idea');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const newMsg: MessageType = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      name,
      email,
      subject: subject || 'General Studio Inquiry',
      message,
      isRead: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveMessage(newMsg);
    setSubmitted(true);

    // Direct email notification to Director Wesley
    const emailSubject = encodeURIComponent(`[Website Inquiry] ${subject || 'General Inquiry'} - ${name}`);
    const emailBody = encodeURIComponent(
      `Hello Director Wesley,\n\nA new message has been received from your website:\n\n` +
      `From: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `Message:\n${message}\n\n` +
      `You can reply directly to ${email}.`
    );

    window.open(`mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`, '_blank');
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionText) {
      alert('Please enter your suggestion.');
      return;
    }

    const newSuggestion: SuggestionType = {
      id: `SUG-${Date.now().toString().slice(-4)}`,
      name: sugName || 'Anonymous Contributor',
      email: sugEmail || 'Not provided',
      category: sugCategory,
      suggestion: suggestionText,
      createdAt: new Date().toISOString().split('T')[0],
      isRead: false
    };

    saveSuggestion(newSuggestion);
    setSuggestionSubmitted(true);

    // Prepare and trigger email notification
    const emailSubject = encodeURIComponent(`[Studio Suggestion Box] ${sugCategory.toUpperCase()} - ${sugName || 'Anonymous'}`);
    const emailBody = encodeURIComponent(
      `Hello Director Wesley,\n\nA new entry was submitted to your Studio Suggestion Box:\n\n` +
      `Contributor: ${sugName || 'Anonymous'}\n` +
      `Email: ${sugEmail || 'Not provided'}\n` +
      `Category: ${sugCategory}\n\n` +
      `Suggestion / Feedback:\n"${suggestionText}"\n\n` +
      `This has also been stored in your CMS Suggestion Box tab.`
    );

    window.open(`mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`, '_blank');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header Banner - Seven Media Styling */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 bg-white text-xs font-bold uppercase tracking-wider text-cyan-700 shadow-xs">
          <Mail className="w-3.5 h-3.5 text-cyan-500" />
          <span>Inquiries & Direct Communication</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight uppercase">
          CONTACT & <span className="highlight-word">CONNECT.</span>
        </h1>
        
        <p className="text-base text-slate-600 leading-relaxed">
          Discuss co-productions, schedule studio visits, commission film treatments, or submit ideas to the Director's suggestion box.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Coordinates & Suggestion Box */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Coordinates Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-6 shadow-xs">
            <h3 className="font-display text-xl font-extrabold text-slate-900 uppercase tracking-tight">
              Studio Coordinates
            </h3>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-900">Headquarters</span>
                  <span className="text-slate-500 text-xs">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-900">Direct Email</span>
                  <a href={`mailto:${settings.email}`} className="text-cyan-700 text-xs hover:underline font-bold">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-900">Phone & WhatsApp</span>
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="text-cyan-700 text-xs hover:underline font-bold">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-900">Working Hours</span>
                  <span className="text-slate-500 text-xs">{settings.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello%20Director%20Wesley%2C%20I%20am%20reaching%20out%20via%20your%20website`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text on WhatsApp (+250 792 087 787)</span>
              </a>
            </div>
          </div>

          {/* Suggestion Box Card */}
          <div className="bg-white border border-cyan-300 rounded-3xl p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2.5 text-cyan-700">
              <Lightbulb className="w-5 h-5 text-cyan-600" />
              <h3 className="font-display text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                Studio Suggestion Box
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Have an idea for our next documentary, narrative short, or exhibition topic? Leave your feedback directly for Wesley.
            </p>

            {suggestionSubmitted ? (
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-cyan-600 mx-auto" />
                <span className="block text-xs font-bold text-slate-900 uppercase">Suggestion Received!</span>
                <p className="text-[11px] text-slate-600">
                  Thank you for contributing. It has been routed to Director Wesley's portal.
                </p>
                <button
                  onClick={() => {
                    setSuggestionSubmitted(false);
                    setSuggestionText('');
                  }}
                  className="text-xs text-cyan-700 font-bold hover:underline cursor-pointer pt-1 block mx-auto"
                >
                  Submit Another Idea
                </button>
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={sugName}
                    onChange={(e) => setSugName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    value={sugEmail}
                    onChange={(e) => setSugEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <select
                  value={sugCategory}
                  onChange={(e) => setSugCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-cyan-500 focus:bg-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="film_idea">Film & Story Idea</option>
                  <option value="collaboration">Collaboration / Co-production</option>
                  <option value="website_feedback">Website Experience</option>
                  <option value="general">General Suggestion</option>
                </select>

                <textarea
                  rows={3}
                  required
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  placeholder="Share your creative thoughts..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#161f30] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Submit to Suggestion Box
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: Main Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-cyan-700">
              Send an Inquiry
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Start a Conversation
            </h3>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-cyan-50 border border-cyan-300 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-cyan-600 mx-auto" />
              <h4 className="font-display text-xl font-bold text-slate-900">
                Message Dispatched
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, {name}. Your inquiry has been sent to Director Wesley at <strong className="text-slate-900">{settings.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-6 py-2 rounded-full bg-[#161f30] text-white text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Habimana"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Brand Film Proposal / Commercial Production"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Detailed Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your timeline, target audience, deliverable format, or ideas..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#161f30] hover:bg-[#0f172a] text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Send Direct Inquiry</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
