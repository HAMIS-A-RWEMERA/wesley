import React, { useState, useEffect } from 'react';
import { 
  getStoredSettings, getStoredFilms, getStoredPhotos, 
  Film, Photo, FILM_CATEGORIES, PHOTO_CATEGORIES, INITIAL_FILMS 
} from '../data';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { 
  Play, Calendar, ArrowRight, 
  Sparkles, MapPin, ChevronRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, category?: string) => void;
  onSelectFilm: (film: Film) => void;
  onSelectPhoto: (photo: Photo) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectFilm, onSelectPhoto }) => {
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [films, setFilms] = useState<Film[]>(() => getStoredFilms());
  const [photos, setPhotos] = useState<Photo[]>(() => getStoredPhotos());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getStoredSettings());
      setFilms(getStoredFilms());
      setPhotos(getStoredPhotos());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

  // Highlight short film THREE NIGHTS or top featured film
  const heroFilm = films.find(f => f.title.toUpperCase().includes('THREE NIGHTS')) || films[0] || INITIAL_FILMS[0];
  const featuredFilms = films.slice(0, 4);
  const featuredPhotos = photos.slice(0, 6);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden">
      
      {/* 1. SEVEN MEDIA ATMOSPHERIC HERO SECTION (Light & Luminous Canvas) */}
      <section className="atmos-cool relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <span className="glow-ambient glow-cyan top-[-8rem] left-[-10vw] w-[42rem] h-[42rem] opacity-70" aria-hidden="true" />
        <span className="glow-ambient glow-lavender bottom-[-12rem] right-[-8vw] w-[38rem] h-[38rem] opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Production × Visual Arts Agency</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] tracking-tight text-slate-900 dark:text-white">
              MEDIA THAT MOVES<br />
              STORIES <span className="highlight-word">FORWARD.</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Directed by Wesley from Kigali, Rwanda. Producing television-grade corporate videos, cinematic brand films, independent narratives like <em>THREE NIGHTS</em>, and fine-art photography.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('booking')}
                className="px-8 py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-4 h-4 text-cyan-400 dark:text-slate-950" />
                <span>Book a Session</span>
              </button>

              <button
                onClick={() => onNavigate('films')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 fill-current" />
                <span>Explore Film & Video</span>
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Based in Kigali, Rwanda</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-2">
                <span>WhatsApp:</span>
                <a href="https://wa.me/250792087787" target="_blank" rel="noreferrer" className="text-cyan-700 dark:text-cyan-400 hover:underline font-bold">
                  +250 792 087 787
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Video-led Showcase Card (Seven Media Hero Anchor) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 p-2.5 shadow-xl group hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={heroFilm.poster}
                  alt={heroFilm.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Central Play Button */}
                <button
                  onClick={() => onSelectFilm(heroFilm)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                  aria-label={`Play trailer for ${heroFilm.title}`}
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white text-slate-900 flex items-center justify-center pl-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover/play:scale-110 group-hover/play:bg-cyan-400 group-hover/play:text-slate-950 transition-all">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                </button>

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-extrabold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider shadow-xs">
                  Featured Presentation
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 sm:p-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">{heroFilm.duration} • {heroFilm.year}</span>
                  <span className="uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400">{heroFilm.genre}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {heroFilm.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
              Cinematography Sectors
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 uppercase">
              FILM & VIDEO <span className="highlight-word">CATEGORIES.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 uppercase tracking-wider cursor-pointer self-start md:self-auto"
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
              className="p-7 rounded-3xl bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_12px_32px_-4px_rgba(6,182,212,0.15)] transition-all cursor-pointer group flex flex-col justify-between space-y-5 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-extrabold">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-cyan-500 group-hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
                <span>View Sector Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-purple-700 dark:text-purple-400">
              Curated Selection
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 uppercase">
              FEATURED <span className="highlight-word">PRODUCTIONS.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('films')}
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 uppercase tracking-wider cursor-pointer self-start md:self-auto"
          >
            <span>View All Works ({films.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredFilms.map((film) => (
            <div
              key={film.id}
              className="group bg-white dark:bg-[#121827] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-xl transition-all duration-300 flex flex-col shadow-xs"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <button
                  onClick={() => onSelectFilm(film)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center pl-1 shadow-xl group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 group-hover/btn:text-slate-950 transition-all">
                    <Play className="w-7 h-7 fill-current" />
                  </div>
                </button>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs text-slate-900 dark:text-white uppercase font-bold tracking-wider shadow-xs">
                  {film.genre}
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                    <span className="font-bold text-cyan-700 dark:text-cyan-400">{film.duration}</span>
                    <span>•</span>
                    <span>{film.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {film.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Trailer</span>
                  </button>
                  <button
                    onClick={() => onNavigate('booking', film.title)}
                    className="text-xs text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 font-bold cursor-pointer"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-purple-700 dark:text-purple-400">
              Visual Arts Portfolio
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 uppercase">
              PHOTOGRAPHY <span className="highlight-word">GALLERIES.</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('photography')}
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 uppercase tracking-wider cursor-pointer self-start md:self-auto"
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
              className="px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-[#121827] hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all cursor-pointer"
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
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-xs flex flex-col aspect-[4/5]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] text-purple-800 dark:text-purple-300 uppercase font-extrabold tracking-wider shadow-xs">
                {photo.category}
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{photo.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DIRECTOR WESLEY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
              <img
                src={settings.profileImage}
                alt="Wesley Rwandan Director"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
                  {settings.creatorRole}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  {settings.creatorName}
                </h3>
                <p className="text-xs text-slate-300">
                  Based in Kigali, Rwanda
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-cyan-700 dark:text-cyan-400">
              DIRECTOR'S STATEMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              "{settings.directorQuote}"
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {settings.directorBio1}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {settings.directorBio2}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Read Biography & Camera Equipment →
              </button>
              <a 
                href={`mailto:${settings.email}`} 
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Inquiries: <strong className="text-cyan-700 dark:text-cyan-400">{settings.email}</strong>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-white via-cyan-50/40 to-purple-50/40 dark:from-[#111726] dark:via-[#0e1422] dark:to-[#141226] border border-slate-200/90 dark:border-slate-800 text-center space-y-6 relative overflow-hidden shadow-sm">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
            LET'S BRING YOUR VISION TO <span className="highlight-word">LIFE.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Book a session directly through our portal or message Director Wesley on WhatsApp for tailored production proposals and studio scheduling.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
            >
              Book a Session Now
            </button>
            <a
              href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20am%20interested%20in%20working%20with%20your%20studio"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-[#25D366] dark:hover:border-[#25D366] bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:text-[#25D366] dark:hover:text-[#25D366] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Chat on WhatsApp (+250 792 087 787)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
