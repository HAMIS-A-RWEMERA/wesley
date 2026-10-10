import React, { useState } from 'react';
import { 
  getStoredServices, getStoredSettings, saveBooking, 
  Booking as BookingType 
} from '../data';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, 
  MapPin, Phone, Mail, User, Sparkles, MessageSquare, ArrowRight 
} from 'lucide-react';

interface BookingProps {
  preselectedServiceName?: string;
  onNavigateHome: () => void;
}

export const Booking: React.FC<BookingProps> = ({ preselectedServiceName, onNavigateHome }) => {
  const services = getStoredServices();
  const settings = getStoredSettings();

  const [selectedServiceId, setSelectedServiceId] = useState<number>(() => {
    if (preselectedServiceName) {
      const match = services.find(s => s.name.toLowerCase().includes(preselectedServiceName.toLowerCase()));
      if (match) return match.id;
    }
    return services[0]?.id || 1;
  });

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [location, setLocation] = useState('Kigali Studio (Kacyiru)');
  const [notes, setNotes] = useState('');

  const [submittedBooking, setSubmittedBooking] = useState<BookingType | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '03:00 PM',
    '04:30 PM',
    'Full Day Schedule'
  ];

  const locationPresets = [
    'Kigali Studio (Kacyiru)',
    'On-Location Kigali (Outdoors / Venue)',
    'Musanze / Volcanoes Foothills',
    'Lake Kivu (Karongi / Rubavu)',
    'Akagera National Park',
    'Other East Africa Destination'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientEmail || !clientPhone || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const newBooking: BookingType = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      email: clientEmail,
      phone: clientPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time,
      location,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveBooking(newBooking);
    setSubmittedBooking(newBooking);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Directly prepare and trigger email notification to Director Wesley at settings.email (rwemera30@gmail.com)
    const emailSubject = encodeURIComponent(`New Shoot Booking [${newBooking.id}]: ${clientName} - ${selectedService.name}`);
    const emailBody = encodeURIComponent(
      `Hello Wesley,\n\nA new client booking has been registered:\n\nBooking ID: ${newBooking.id}\nClient: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nService: ${selectedService.name} (${selectedService.price})\nDate: ${date} at ${time}\nLocation: ${location}\nNotes: ${notes || 'None'}\n\nPlease review in the studio CMS to confirm or deny.`
    );
    window.open(`mailto:${settings.email}?subject=${emailSubject}&body=${emailBody}`, '_blank');
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
          DIRECTOR & CINEMA RESERVATIONS
        </span>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          BOOK A SESSION
        </h1>
        <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
          Reserve your film commission, documentary crew, or fine-art portrait sitting with Wesley. Real-time scheduling directly processed for our Kigali production calendar.
        </p>
      </div>

      {submittedBooking ? (
        /* Booking Confirmation Card */
        <div className="max-w-2xl mx-auto bg-[#111116] border border-[#d4af37] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-[0_0_60px_rgba(212,175,55,0.15)] animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
              RESERVATION REQUEST RECEIVED & DIRECTLY NOTIFIED
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Thank You, {submittedBooking.clientName}!
            </h2>
            <p className="text-xs text-[#8e8e9c]">
              Confirmation Ref: <strong className="text-white font-mono">{submittedBooking.id}</strong>
            </p>
          </div>

          <div className="bg-[#181822] border border-[#262634] rounded-2xl p-6 text-left space-y-3 text-xs sm:text-sm text-[#b0b0be]">
            <div className="flex justify-between border-b border-[#22222e] pb-2">
              <span className="text-[#888898]">Service Package:</span>
              <strong className="text-white">{submittedBooking.serviceName}</strong>
            </div>
            <div className="flex justify-between border-b border-[#22222e] pb-2">
              <span className="text-[#888898]">Scheduled Date & Time:</span>
              <strong className="text-[#d4af37]">{submittedBooking.date} at {submittedBooking.time}</strong>
            </div>
            <div className="flex justify-between border-b border-[#22222e] pb-2">
              <span className="text-[#888898]">Shooting Location:</span>
              <span className="text-white">{submittedBooking.location}</span>
            </div>
            <div className="flex justify-between border-b border-[#22222e] pb-2">
              <span className="text-[#888898]">Client Email:</span>
              <span className="text-white">{submittedBooking.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888898]">Contact Phone:</span>
              <span className="text-white">{submittedBooking.phone}</span>
            </div>
          </div>

          <p className="text-xs text-[#9090a0] leading-relaxed">
            Wesley has been notified at <strong className="text-[#d4af37]">{settings.email}</strong>. When Director Wesley accepts or reviews your session in the studio CMS, you will receive an official confirmation email with any director notes at <strong className="text-white">{submittedBooking.email}</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hello%20Wesley%2C%20I%20have%20submitted%20booking%20${submittedBooking.id}%20for%20${encodeURIComponent(submittedBooking.serviceName)}%20on%20${submittedBooking.date}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm via WhatsApp Directly</span>
            </a>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Book Another Session
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Booking Form */
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Step 1: Select Service */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
                Select Production Package
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedServiceId === srv.id
                      ? 'bg-[#181822] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                      : 'bg-[#111116] border-[#22222a] hover:border-[#383848]'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {srv.duration}
                    </span>
                    <h4 className="font-cinzel text-base font-bold text-white">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-[#8e8e9c] line-clamp-3 leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#1e1e28] mt-4 flex items-center justify-between">
                    <span className="font-cinzel text-base font-bold text-white">
                      {srv.price}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${
                      selectedServiceId === srv.id ? 'text-[#d4af37]' : 'text-[#606070]'
                    }`}>
                      {selectedServiceId === srv.id ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Date, Time & Location */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
                Date, Time & Location
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#111116] border border-[#22222a] p-6 sm:p-8 rounded-3xl">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Preferred Shoot Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              {/* Time Slot Picker */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Preferred Time Slot</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  {timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts} className="bg-[#161620] text-white">
                      {ts}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Picker */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Production Location</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  {locationPresets.map((loc, idx) => (
                    <option key={idx} value={loc} className="bg-[#161620] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Client Details & Notes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#d4af37] text-black font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
                Client Contact & Creative Brief
              </h3>
            </div>

            <div className="bg-[#111116] border border-[#22222a] p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Marie Claire Uwase"
                    className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Email Address (For Notifications) *</span>
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#9e9ea8] mb-1.5">
                  Creative Notes, Moodboard Links or Production Goals (Optional)
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your project, desired look, wardrobe ideas, or broadcast objectives..."
                  className="w-full px-4 py-3 rounded-xl bg-[#161620] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#1e1e28] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#8e8e9c]">
                  Directly notified to: <strong className="text-[#d4af37]">{settings.email}</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm & Send Booking to Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
