import React from 'react';
import { 
  getStoredSettings, getStoredFilms, getStoredPhotos, 
  Film, Photo, FILM_CATEGORIES, PHOTO_CATEGORIES 
} from '../data';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { 
  Play, Calendar, ArrowRight, Film as FilmIcon, 
  Camera, Sparkles, MapPin, ChevronRight, Video, CheckCircle2 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, category?: string) => void;
  onSelectFilm: (film: Film) => void;
  onSelectPhoto: (photo: Photo) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectFilm, onSelectPhoto }) => {
  const settings = getStoredSettings();
  const films = getStoredFilms();
  const photos = getStoredPhotos();

  // Highlight short film THREE NIGHTS or top featured film
  const heroFilm = films.find(f => f.title.toUpperCase().includes('THREE NIGHTS')) || films[0];
  const featuredFilms = films.slice(0, 4);
  const featuredPhotos = photos.slice(0, 6);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. SEVEN MEDIA ATMOSPHERIC HERO SECTION */}
      <section className="atmos-cool relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <span className="glow-ambient glow-cyan top-[-10rem] left-[-15vw] w-[45rem] h-[45rem] opacity-70" aria-hidden="true" />
        <span className="glow-ambient glow-lavender bottom-[-15rem] right-[-10vw] w-[40rem] h-[40rem] opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#0d121f]/80 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.16em] text-[#00f2fe]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production × Visual Arts Agency</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
              MEDIA THAT MOVES<br />
              STORIES <span className="highlight-word">FORWARD.</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              Directed by Wesley from Kigali, Rwanda. Producing television-grade corporate videos, cinematic brand films, independent narratives like <em>THREE NIGHTS</em>, and fine-art photography.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('booking')}
                className="px-8 py-4 rounded-full bg-white hover:bg-[#00f2fe] text-[#07090e] font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_35px_rgba(0,242,254,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Session</span>
              </button>

              <button
                onClick={() => onNavigate('films')}
                className="px-8 py-4 rounded-full bg-[#0d121f]/90 hover:bg-[#131b2e] border border-white/10 hover:border-[#00f2fe]/50 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-[#00f2fe] fill-current" />
                <span>Explore Film & Video</span>
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                <span>Based in Kigali, Rwanda</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-2">
                <span>WhatsApp:</span>
                <a href="https://wa.me/250792087787" target="_blank" rel="noreferrer" className="text-[#00f2fe] hover:underline font-semibold">
                  +250 792 087 787
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Video-led Showcase Card (Seven Media Hero Anchor) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card border border-white/15 p-2 shadow-2xl group">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-black">
                <img
                  src={heroFilm.poster}
                  alt={heroFilm.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/30 to-transparent" />

                {/* Central Play Button */}
                <button
                  onClick={() => onSelectFilm(heroFilm)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                  aria-label={`Play trailer for ${heroFilm.title}`}
                >
                  <div className="w-18 h-18 rounded-full bg-white text-black flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(255,255,255,0.7)] group-hover/play:scale-110 group-hover/play:bg-[#00f2fe] transition-all">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                </button>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#00f2fe] uppercase tracking-wider">
                  Featured Presentation
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                  <span className="font-mono text-[#00f2fe]">{heroFilm.duration} • {heroFilm.year}</span>
                  <span className="uppercase tracking-wider font-semibold">{heroFilm.genre}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {heroFilm.title}
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-2">
                  {heroFilm.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SEVEN MEDIA MOVING TEXTS TICKER */}
      <MarqueeTicker />

      {/* 3. FILM & VIDEO CATEGORIES GRID (7 SECTORS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#00f2fe]">
              Cinematography Sectors
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 uppercase">
              FILM & VIDEO <span className="highlight-word">CATEGORIES.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00f2fe] hover:text-white uppercase tracking-wider cursor-pointer self-start md:self-auto"
          >
            <span>Explore All 7 Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FILM_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('films', cat.id)}
              className="p-7 rounded-3xl bg-[#0d121f] border border-white/[0.08] hover:border-[#00f2fe]/40 hover:shadow-[0_10px_35px_-10px_rgba(0,242,254,0.15)] transition-all cursor-pointer group flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#00f2fe] font-bold">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-[#00f2fe] group-hover:text-black text-[#94a3b8] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00f2fe] transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] text-[11px] font-semibold text-[#00f2fe] flex items-center gap-1">
                <span>View Portfolio Projects</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#a78bfa]">
              Curated Selection
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 uppercase">
              FEATURED <span className="highlight-word">PRODUCTIONS.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#a78bfa] hover:text-white uppercase tracking-wider cursor-pointer self-start md:self-auto"
          >
            <span>View All Works ({films.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredFilms.map((film) => (
            <div
              key={film.id}
              className="group bg-[#0d121f] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-[#00f2fe]/50 transition-all duration-300 flex flex-col shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-black/40 to-transparent" />

                <button
                  onClick={() => onSelectFilm(film)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center pl-1 shadow-2xl group-hover/btn:scale-110 group-hover/btn:bg-[#00f2fe] transition-all">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                </button>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07090e]/85 backdrop-blur-md border border-white/10 text-xs text-[#00f2fe] uppercase font-bold tracking-wider">
                  {film.genre}
                </div>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#94a3b8] mb-2 font-mono">
                    <span>{film.duration}</span>
                    <span>•</span>
                    <span>{film.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00f2fe] transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-2 line-clamp-2">
                    {film.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="text-xs font-bold text-[#00f2fe] hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Trailer</span>
                  </button>
                  <button
                    onClick={() => onNavigate('booking', film.title)}
                    className="text-xs text-white hover:text-[#00f2fe] font-semibold cursor-pointer"
                  >
                    Inquire Production →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PHOTOGRAPHY SHOWCASE (6 CATEGORIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#a78bfa]">
              Visual Arts Portfolio
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1 uppercase">
              PHOTOGRAPHY <span className="highlight-word">GALLERIES.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('photography')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#a78bfa] hover:text-white uppercase tracking-wider cursor-pointer self-start md:self-auto"
          >
            <span>View All Photography ({photos.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Quick Badges */}
        <div className="flex flex-wrap gap-2">
          {PHOTO_CATEGORIES.map((pcat) => (
            <button
              key={pcat.id}
              onClick={() => onNavigate('photography', pcat.id)}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0d121f] hover:bg-[#a78bfa] hover:text-black text-[#cbd5e1] border border-white/[0.08] transition-all cursor-pointer"
            >
              {pcat.title}
            </button>
          ))}
        </div>

        {/* Photo Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#0d121f] border border-white/[0.08] hover:border-[#a78bfa]/50 transition-all duration-300 cursor-pointer shadow-xl flex flex-col aspect-[4/5]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-[#a78bfa] uppercase font-bold tracking-wider">
                {photo.category}
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h4 className="font-display text-lg font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-[#94a3b8] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#00f2fe]" />
                  <span>{photo.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DIRECTOR WESLEY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0d121f] border border-white/[0.08] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={settings.profileImage}
                alt="Wesley Rwandan Director"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#00f2fe] text-xs font-semibold uppercase tracking-widest">
                  {settings.creatorRole}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {settings.creatorName}
                </h3>
                <p className="text-xs text-[#94a3b8]">
                  Based in Kigali, Rwanda
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#00f2fe]">
              DIRECTOR'S STATEMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              "{settings.directorQuote}"
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              {settings.directorBio1}
            </p>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              {settings.directorBio2}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#00f2fe] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Read Biography & Camera Equipment →
              </button>
              <a 
                href={`mailto:${settings.email}`} 
                className="text-xs text-[#94a3b8] hover:text-white transition-colors"
              >
                Inquiries: <strong className="text-[#00f2fe]">{settings.email}</strong>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#09101d] to-[#070a12] border border-white/10 text-center space-y-6 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            LET'S BRING YOUR VISION TO <span className="highlight-word">LIFE.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto">
            Book a session directly through our portal or message Director Wesley on WhatsApp for tailored production proposals and studio scheduling.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 rounded-full bg-white hover:bg-[#00f2fe] text-black font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,242,254,0.45)] transition-all cursor-pointer"
            >
              Book a Session Now
            </button>
            <a
              href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20am%20interested%20in%20working%20with%20your%20studio"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Chat on WhatsApp (+250 792 087 787)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
