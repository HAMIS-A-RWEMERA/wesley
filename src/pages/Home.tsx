import React from 'react';
import { 
  getStoredSettings, getStoredFilms, getStoredPhotos, 
  getStoredServices, Film, Photo 
} from '../data';
import { 
  Play, Calendar, ArrowRight, Award, Film as FilmIcon, 
  Camera, Compass, Sparkles, CheckCircle2, MapPin, ChevronRight 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  onSelectFilm: (film: Film) => void;
  onSelectPhoto: (photo: Photo) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectFilm, onSelectPhoto }) => {
  const settings = getStoredSettings();
  const films = getStoredFilms();
  const photos = getStoredPhotos();
  const services = getStoredServices();

  const featuredFilms = films.filter(f => f.featured);
  const featuredPhotos = photos.filter(p => p.featured).slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${settings.heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/80 to-[#0c0c0e]/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] z-10" />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{settings.heroTagline}</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider leading-tight">
            {settings.heroHeading}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#b8b8c8] font-light leading-relaxed">
            {settings.heroSubheading}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('films')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FilmIcon className="w-4 h-4" />
              <span>Watch Cinema Showcase</span>
            </button>

            <button
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#d4af37]/50 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-semibold text-xs uppercase tracking-widest bg-black/40 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <span>Book Film or Portrait Session</span>
            </button>
          </div>

          {/* Festival Highlights */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#8e8e9c]">
            {settings.heroLaurels.map((laurel, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37]" />
                <span>{laurel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#111116] border border-[#22222a] rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
              <img
                src={settings.profileImage}
                alt="Wesley Rwandan Director"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
                  {settings.creatorRole}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  {settings.creatorName}
                </h3>
                <p className="text-xs text-[#a0a0b0]">
                  Based in Kigali, Rwanda
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
              PHILOSOPHY & VISION
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide leading-tight">
              "{settings.directorQuote}"
            </h2>
            <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
              {settings.directorBio1}
            </p>
            <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
              {settings.directorBio2}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-[#f3e5ab] uppercase tracking-wider cursor-pointer"
              >
                <span>Read Full Biography & Equipment List</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[#3a3a46]">•</span>
              <a 
                href={`mailto:${settings.email}`} 
                className="text-xs text-[#a0a0b0] hover:text-white transition-colors"
              >
                Inquiries: <strong className="text-[#d4af37]">{settings.email}</strong>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Cinema Showcase (Featured Films) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#22222a] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
              FEATURED PRODUCTIONS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
              CINEMA SHOWCASE
            </h2>
          </div>
          <button
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-[#f3e5ab] uppercase tracking-wider cursor-pointer self-start md:self-auto"
          >
            <span>View All Films & Trailers ({films.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFilms.map((film) => (
            <div
              key={film.id}
              className="group bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg"
            >
              {/* Poster & Play Button */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-black/30 to-transparent" />
                <button
                  onClick={() => onSelectFilm(film)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  aria-label={`Play trailer for ${film.title}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#d4af37]/90 text-black flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </button>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-[#2a2a35] text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">
                  {film.genre.split('/')[0]}
                </div>
              </div>

              {/* Film Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8e8e9c] mb-1.5">
                    <span>{film.duration}</span>
                    <span>{film.year}</span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-xs text-[#9a9aa8] line-clamp-2 mt-2 leading-relaxed">
                    {film.description}
                  </p>
                </div>

                {film.awards && (
                  <div className="pt-3 border-t border-[#1c1c24] flex items-center gap-2 text-[11px] text-[#d4af37]">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{film.awards}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photography Highlights (Landscape & Portrait) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#22222a] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
              VISUAL CHRONICLES
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
              PHOTOGRAPHY GALLERIES
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('landscape')}
              className="text-xs font-bold text-[#b0b0be] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              Landscape ({photos.filter(p => p.category === 'landscape').length})
            </button>
            <span className="text-[#33333d]">/</span>
            <button
              onClick={() => onNavigate('portrait')}
              className="text-xs font-bold text-[#b0b0be] hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              Portrait ({photos.filter(p => p.category === 'portrait').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#16161c] border border-[#22222a] hover:border-[#d4af37]/60 cursor-pointer shadow-lg"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                  {photo.category} • {photo.subCategory}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white">
                  {photo.title}
                </h4>
                {photo.location && (
                  <p className="text-[11px] text-[#8e8e9c] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span className="truncate">{photo.location}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
            SERVICES & COMMISSIONS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
            BESPOKE STUDIO PACKAGES
          </h2>
          <p className="text-sm text-[#9e9eb0]">
            From editorial portraits in Kigali to international feature documentaries, we deliver cinema-grade craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/60 rounded-2xl p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-lg relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#d4af37]">
                    {service.duration}
                  </span>
                  <span className="font-cinzel text-xl font-bold text-white">
                    {service.price}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-[#9090a0] leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-[#1c1c24]">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#a0a0b0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-3 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Select Package & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#171408] via-[#1f1a0b] to-[#121008] border border-[#d4af37]/40 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.08)]">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
            READY TO CREATE?
          </span>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wide max-w-3xl mx-auto leading-tight">
            COMMISSION YOUR NEXT FILM OR RESERVE A PRIVATE SESSION
          </h2>

          <p className="max-w-xl mx-auto text-sm text-[#b0b0be] leading-relaxed">
            Directly connect with Wesley in Kigali. We are currently accepting commercial film briefs, festival co-productions, and portrait bookings.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Launch Booking Schedule</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Contact Studio Directly
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
