import React, { useState, useEffect } from 'react';
import { 
  getStoredServices, saveBooking, Booking as BookingType, 
  getStoredSettings 
} from '../data';
import { Calendar, Clock, CheckCircle2, Send, ShieldCheck, MessageSquare } from 'lucide-react';

interface BookingProps {
  preselectedServiceName?: string;
  onNavigateHome: () => void;
}

export const Booking: React.FC<BookingProps> = ({ preselectedServiceName, onNavigateHome }) => {
  const [services, setServices] = useState(() => getStoredServices());
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setServices(getStoredServices());
      setSettings(getStoredSettings());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

  const [selectedServiceId, setSelectedServiceId] = useState<number>(() => {
    if (preselectedServiceName) {
      const match = services.find(s => s.name.toLowerCase().includes(preselectedServiceName.toLowerCase()));
      if (match) return match.id;
    }
    return services[0]?.id || 1;
  });

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!clientName.trim() || !email.trim() || !date.trim()) {
      setFormError('Please fill in your name, email, and preferred shoot date.');
      return;
    }

    const newBookingId = `BK-${Date.now().toString().slice(-4)}`;
    const newBooking: BookingType = {
      id: newBookingId,
      clientName: clientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time: time || 'Morning (TBD)',
      location: location.trim() || 'Kigali Studio',
      notes: notes.trim(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveBooking(newBooking);
    setSubmittedBookingId(newBookingId);
    setSubmitted(true);

    // Prepare direct email notification to Director Wesley
    const emailSubject = encodeURIComponent(`[New Shoot Booking] ${selectedService.name} - ${clientName}`);
    const emailBody = encodeURIComponent(
      `Hello Director Wesley,\n\nA new session booking has been requested on the website:\n\n` +
      `Booking ID: ${newBookingId}\n` +
      `Client: ${clientName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Production Service: ${selectedService.name} (${selectedService.price})\n` +
      `Preferred Date: ${date} at ${time || 'Flexible'}\n` +
      `Shoot Location: ${location || 'Studio'}\n\n` +
      `Project Brief / Notes:\n${notes}\n\n` +
      `Please review and confirm this booking in the Studio Portal.`
    );

    try {
      window.location.href = `mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`;
    } catch {}
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner - Seven Media Styling */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 bg-white text-xs font-bold uppercase tracking-wider text-cyan-700 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
          <span>Production Scheduling & Commissions</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight uppercase">
          BOOK A <span className="highlight-word">SESSION.</span>
        </h1>
        
        <p className="text-base text-slate-600 leading-relaxed">
          Select your film production package, schedule a corporate shoot, or book an editorial portrait session with Director Wesley in Kigali.
        </p>
      </div>

      {submitted ? (
        <div className="max-w-xl mx-auto p-10 rounded-3xl bg-white border border-cyan-400 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto border border-cyan-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-700">
              Request Logged Successfully
            </span>
            <h2 className="font-display text-2xl font-extrabold text-slate-900">
              Booking Ref: {submittedBookingId}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{clientName}</strong>. Your session for <strong className="text-slate-900">{selectedService.name}</strong> has been transmitted to Director Wesley.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 text-left font-normal">
            <div className="flex justify-between">
              <span>Client Email:</span>
              <span className="text-slate-900 font-mono font-bold">{email}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Shoot Date:</span>
              <span className="text-slate-900 font-mono font-bold">{date}</span>
            </div>
            <div className="flex justify-between">
              <span>Studio Response Time:</span>
              <span className="text-cyan-700 font-bold">Within 24 Hours</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/250792087787?text=Hello%20Wesley%2C%20I%20just%20submitted%20booking%20${submittedBookingId}%20for%20${encodeURIComponent(selectedService.name)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>
            <button
              onClick={onNavigateHome}
              className="flex-1 py-3.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Packages Selection */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
              1. Choose Production Package
            </h3>

            <div className="space-y-3">
              {services.map((srv) => {
                const isSelected = srv.id === selectedServiceId;

                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-50/70 border-cyan-400 shadow-md ring-2 ring-cyan-400/20'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-base font-extrabold text-slate-900">
                        {srv.name}
                      </h4>
                      <span className="font-mono text-sm font-extrabold text-cyan-700">
                        {srv.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {srv.tagline}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-600" />
                        {srv.duration}
                      </span>
                      <span>•</span>
                      <span>{srv.features.length} deliverables included</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Package Features preview */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                What's Included in {selectedService.name}
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Booking Details Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-10 space-y-6 shadow-sm">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-cyan-700">
                2. Project & Client Info
              </span>
              <h3 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                Schedule Your Session
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Marie Claire / Kigali Tech"
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
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Preferred Shoot Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none cursor-pointer transition-colors"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="Morning (09:00 AM – 12:00 PM)">Morning (09:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (01:00 PM – 04:00 PM)">Afternoon (01:00 PM – 04:00 PM)</option>
                    <option value="Golden Hour (04:30 PM – 06:30 PM)">Golden Hour (04:30 PM – 06:30 PM)</option>
                    <option value="Full Day Production">Full Day Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Kigali Studio or on-location"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Project Brief & Specific Requirements
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell Director Wesley about your creative vision, deliverable format, or deadline..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-cyan-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#161f30] hover:bg-[#0f172a] text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Submit Session Request</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Submissions route directly to Director Wesley's portal and email.</span>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
