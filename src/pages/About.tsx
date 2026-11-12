import React, { useState, useEffect } from 'react';
import { getStoredSettings } from '../data';
import { Camera, Sparkles, MapPin, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onNavigateBooking: () => void;
  onNavigateContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateBooking, onNavigateContact }) => {
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

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
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-[#121827] p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={settings.profileImage}
                alt="Wesley Filmmaker Kigali"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
                  {settings.creatorRole}
                </span>
                <h2 className="font-display text-3xl font-extrabold text-white">
                  {settings.creatorName}
                </h2>
                <p className="text-xs text-slate-300">
                  Kigali, Rwanda
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800/80 bg-white dark:bg-slate-900/80 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Director & Cinematographer</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
            TELLING STORIES THAT <span className="highlight-word">RESONATE.</span>
          </h1>
          
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {settings.directorBio1}
          </p>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {settings.directorBio2}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateBooking}
              className="px-7 py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-400 dark:text-slate-950" />
              <span>Book a Session</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Contact Director
            </button>
          </div>
        </div>

      </div>

      {/* Focus & Production Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            Core Disciplines
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            WHAT WE <span className="highlight-word">DELIVER.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 space-y-3 transition-colors shadow-xs hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-cyan-600 dark:text-cyan-400">
                  0{idx + 1}
                </span>
                <CheckCircle2 className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Arsenal & Cinema Optics */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-purple-700 dark:text-purple-400">
            Technical Arsenal
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            PRODUCTION CINEMA GEAR & <span className="highlight-word">OPTICS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Equipped to deliver cinema-grade 4K/6K mastering, broadcast compliance, and dynamic field lighting anywhere across East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gearCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-400 space-y-4 shadow-xs hover:shadow-lg transition-colors"
            >
              <div className="flex items-center gap-3 text-purple-700 dark:text-purple-400">
                <Camera className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  {cat.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Headquarters in Kigali */}
      <div className="rounded-3xl bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-xs">
        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-700 dark:text-cyan-400">
            STUDIO LOCATION
          </span>
          <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
            Kigali Headquarters
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Open for client consultations, treatment reviews, edit screenings, and private studio sittings.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <span>{settings.address}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <a href={`mailto:${settings.email}`} className="text-cyan-700 dark:text-cyan-400 hover:underline font-bold">
              {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-white">{settings.phone}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onNavigateBooking}
            className="w-full py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Book Studio Session
          </button>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello%20Wesley%2C%20I%20am%20interested%20in%20a%20film%20project`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-[#25D366] dark:hover:border-[#25D366] bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:text-[#25D366] dark:hover:text-[#25D366] text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-xs"
          >
            WhatsApp +250 792 087 787
          </a>
        </div>
      </div>

    </div>
  );
};
