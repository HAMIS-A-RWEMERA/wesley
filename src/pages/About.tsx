import React from 'react';
import { getStoredSettings } from '../data';
import { Camera, Film, Video, Mic, Sparkles, MapPin, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onNavigateBooking: () => void;
  onNavigateContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateBooking, onNavigateContact }) => {
  const settings = getStoredSettings();

  const gearCategories = [
    {
      category: 'Cinema Camera Systems',
      items: [
        'Sony FX6 Cinema Line Full-Frame 4K (DCI 4K 120p, 10-bit 4:2:2)',
        'Sony FX3 Cinema Rig with XLR Handle Unit & Tilta Cage',
        'Blackmagic Cinema Pocket 6K Pro (Dual Native ISO, Internal NDs)',
        'DJI Ronin 4D 4-Axis Cinema Stabilization System'
      ]
    },
    {
      category: 'Master Optics & Primes',
      items: [
        'Sony G-Master 24mm f/1.4 GM Prime',
        'Sony G-Master 35mm f/1.4 GM Prime',
        'Sony G-Master 50mm f/1.2 GM Prime (Dreamlike Cinematic Bokeh)',
        'Sony G-Master 85mm f/1.4 GM Portrait Prime',
        'Sony G-Master 70-200mm f/2.8 GM OSS II Telephoto Cinema Zoom'
      ]
    },
    {
      category: 'Cinema Lighting & Staging',
      items: [
        'Aputure LS 600d Pro Daylight Cinema Fixture with Lantern 90',
        'Aputure Amaran 300c Full-Color RGBWW Staging Key',
        'Nanlite PavoTube II 30C RGBWW Tube Light Kit (4-Light Kit)',
        'Matthews C-Stands, American Grip Flags & 8x8 Diffusion Frames'
      ]
    },
    {
      category: 'Field Audio & Drone Aerials',
      items: [
        'Sennheiser MKH 416 Industry Shotgun Microphone with Rycote Blimp',
        'Røde Wireless PRO Dual 32-bit Float Audio Transmitters',
        'Zoom F6 6-Channel / 14-Track 32-bit Float Field Recorder',
        'DJI Mavic 3 Pro Cine Drone with Apple ProRes 422 HQ Recording'
      ]
    }
  ];

  const focusAreas = [
    {
      title: 'Corporate & Organizational Cinema',
      desc: 'Company profiles, NGO impact films, and executive interview suites delivering strategic clarity and TV-grade polish.'
    },
    {
      title: 'Cinematic Brand Campaigns',
      desc: 'High-impact visual narratives communicating brand identity, premium textures, and distinct storytelling.'
    },
    {
      title: 'Independent Shorts & Narratives',
      desc: 'Original narrative films exploring raw human emotion and cultural depth, including our short film THREE NIGHTS.'
    },
    {
      title: 'Master Fine-Art Photography',
      desc: 'High-end portraiture, editorial fashion spreads, commercial assets, and landscape vistas of Rwanda.'
    }
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={settings.profileImage}
              alt="Wesley Filmmaker Kigali"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#00f2fe]">
                {settings.creatorRole}
              </span>
              <h2 className="font-display text-3xl font-extrabold text-white">
                {settings.creatorName}
              </h2>
              <p className="text-xs text-[#94a3b8]">
                Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0d121f] text-xs font-semibold uppercase tracking-wider text-[#00f2fe]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Director & Cinematographer</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
            TELLING STORIES THAT <span className="highlight-word">RESONATE.</span>
          </h1>
          
          <p className="text-base text-[#94a3b8] leading-relaxed">
            {settings.directorBio1}
          </p>
          <p className="text-base text-[#94a3b8] leading-relaxed">
            {settings.directorBio2}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateBooking}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#00f2fe] text-black font-extrabold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Session</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="px-7 py-3.5 rounded-full border border-white/15 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact Director
            </button>
          </div>
        </div>

      </div>

      {/* Focus & Production Capabilities (Replaced generic awards with actual production capabilities) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#00f2fe]">
            Core Disciplines
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight">
            WHAT WE <span className="highlight-word">DELIVER.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#0d121f] border border-white/[0.08] hover:border-[#00f2fe]/40 space-y-3 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#00f2fe]">
                  0{idx + 1}
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#00f2fe]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Arsenal & Cinema Optics */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#a78bfa]">
            Technical Arsenal
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight">
            PRODUCTION CINEMA GEAR & <span className="highlight-word">OPTICS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8]">
            Equipped to deliver cinema-grade 4K/6K mastering, broadcast compliance, and dynamic field lighting anywhere across East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gearCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#0d121f] border border-white/[0.08] hover:border-[#a78bfa]/40 space-y-4 shadow-lg transition-colors"
            >
              <div className="flex items-center gap-3 text-[#a78bfa]">
                <Camera className="w-5 h-5" />
                <h3 className="font-display text-lg font-bold text-white">
                  {cat.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94a3b8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Headquarters in Kigali */}
      <div className="rounded-3xl bg-[#0d121f] border border-white/10 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#00f2fe]">
            STUDIO LOCATION
          </span>
          <h3 className="font-display text-2xl font-bold text-white">
            Kigali Headquarters
          </h3>
          <p className="text-xs text-[#94a3b8]">
            Open for client consultations, treatment reviews, edit screenings, and private studio sittings.
          </p>
        </div>

        <div className="space-y-3 text-sm text-[#cbd5e1]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#00f2fe] shrink-0 mt-0.5" />
            <span>{settings.address}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#00f2fe] shrink-0" />
            <a href={`mailto:${settings.email}`} className="text-[#00f2fe] hover:underline">
              {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#00f2fe] shrink-0" />
            <span>{settings.phone}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onNavigateBooking}
            className="w-full py-3.5 rounded-full bg-white hover:bg-[#00f2fe] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Book Studio Session
          </button>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello%20Wesley%2C%20I%20am%20interested%20in%20a%20film%20project`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full border border-white/15 hover:border-[#25D366] text-[#cbd5e1] hover:text-[#25D366] text-xs font-semibold uppercase tracking-wider text-center transition-colors"
          >
            WhatsApp +250 792 087 787
          </a>
        </div>
      </div>

    </div>
  );
};
