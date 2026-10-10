import React from 'react';
import { getStoredSettings } from '../data';
import { Award, Camera, Film, Video, Mic, Compass, Sparkles, MapPin, Mail, Phone, Calendar } from 'lucide-react';

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

  const milestones = [
    {
      year: '2025',
      title: 'FESPACO Official Selection & Screening',
      desc: '"The Echoes of Akagera" selected for the official Pan-African competition in Ouagadougou.'
    },
    {
      year: '2024',
      title: 'Silicon Valley African Film Festival Winner',
      desc: 'Awarded Best Short Documentary for "Whispers of Kigali" celebrating urban Rwandan arts.'
    },
    {
      year: '2024',
      title: 'Durban International Film Festival Recognition',
      desc: 'Selected in the African Visionaries showcase for outstanding cinematographic composition.'
    },
    {
      year: '2023',
      title: 'Kigali Cine Festival Special Jury Prize',
      desc: 'Celebrated for "Threads of Heritage" poetic short honoring traditional Imigongo art.'
    }
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl">
            <img
              src={settings.profileImage}
              alt="Wesley Filmmaker Kigali"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
                {settings.creatorRole}
              </span>
              <h2 className="font-cinzel text-3xl font-extrabold text-white">
                {settings.creatorName}
              </h2>
              <p className="text-xs text-[#a0a0b0]">
                Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
            BIOGRAPHY & JOURNEY
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wide leading-tight">
            TELLING THE UNTOLD STORIES OF RWANDA & AFRICA
          </h1>
          <p className="text-sm sm:text-base text-[#a0a0b0] leading-relaxed">
            {settings.directorBio1}
          </p>
          <p className="text-sm sm:text-base text-[#a0a0b0] leading-relaxed">
            {settings.directorBio2}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateBooking}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Studio Session</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="px-6 py-3 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-[#d4af37] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Contact Director
            </button>
          </div>
        </div>

      </div>

      {/* Festival Recognitions & Milestones */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
            HONORS & SCREENINGS
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-white">
            FESTIVAL SELECTIONS & ACCOLADES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/50 space-y-3 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-2xl font-bold text-[#d4af37]">
                  {item.year}
                </span>
                <Award className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs text-[#9090a0] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Production Cinema Gear */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
            TECHNICAL ARSENAL
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-white">
            PRODUCTION CINEMA GEAR & OPTICS
          </h2>
          <p className="text-xs sm:text-sm text-[#8e8e9c]">
            Equipped to deliver cinema-grade 4K/6K mastering, broadcast compliance, and dynamic field lighting anywhere across East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gearCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/40 space-y-4 shadow-lg transition-colors"
            >
              <div className="flex items-center gap-3 text-[#d4af37]">
                <Camera className="w-5 h-5" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  {cat.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#a0a0b0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Headquarters in Kigali */}
      <div className="rounded-3xl bg-[#121218] border border-[#22222c] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37]">
            LOCATION
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white">
            Kigali Headquarters
          </h3>
          <p className="text-xs text-[#9090a0]">
            Our studio is open for client consultations, edit screenings, and private portrait sittings.
          </p>
        </div>

        <div className="space-y-3 text-sm text-[#b0b0be]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <span>{settings.address}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
            <a href={`mailto:${settings.email}`} className="text-[#d4af37] hover:underline">
              {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{settings.phone}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onNavigateBooking}
            className="w-full py-3 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors cursor-pointer"
          >
            Schedule Studio Visit
          </button>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello%20Wesley%2C%20I%20am%20interested%20in%20a%20film%20project`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-full border border-[#2a2a35] hover:border-[#25D366] text-[#b0b0be] hover:text-[#25D366] text-xs font-semibold uppercase tracking-wider text-center transition-colors"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};
