import React, { useState, useEffect } from 'react';
import { 
  getStoredFilms, Film, FilmCategory, FILM_CATEGORIES 
} from '../data';
import { parseVideoUrl, getVideoWatchUrl } from '../utils/video';
import { 
  Play, Video, Sparkles, ExternalLink 
} from 'lucide-react';

interface FilmsProps {
  initialCategory?: string;
  onSelectFilm: (film: Film) => void;
  onNavigateBooking: (serviceName?: string) => void;
}

export const Films: React.FC<FilmsProps> = ({ 
  initialCategory = 'all', 
  onSelectFilm, 
  onNavigateBooking 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [films, setFilms] = useState<Film[]>(() => getStoredFilms());

  // Listen for content updates from Admin CMS
  useEffect(() => {
    const handleUpdate = () => {
      setFilms(getStoredFilms());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const currentCategoryMeta = FILM_CATEGORIES.find(c => c.id === activeCategory);

  const filteredFilms = activeCategory === 'all'
    ? films
    : films.filter(f => f.category === activeCategory);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner - Seven Media Styling */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800/80 bg-white dark:bg-slate-900/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Cinematography & Directing Portfolio</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
          FILM & <span className="highlight-word">VIDEO.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore our complete cinematic portfolio across seven specialized sectors — from executive corporate films and brand stories to independent short cinema and documentaries.
        </p>
      </div>

      {/* 7 Categories Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'bg-white dark:bg-[#121827] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/90 dark:border-slate-800 shadow-xs'
            }`}
          >
            All Work ({films.length})
          </button>

          {FILM_CATEGORIES.map((cat) => {
            const count = films.filter(f => f.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-white dark:bg-[#121827] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/90 dark:border-slate-800 shadow-xs'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/30 text-white font-extrabold' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner */}
        {currentCategoryMeta && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121827] border border-cyan-200/80 dark:border-cyan-900/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-cyan-600 dark:text-cyan-400 tracking-widest">
                Sector Overview
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {currentCategoryMeta.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                {currentCategoryMeta.shortDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigateBooking(`${currentCategoryMeta.title} Production`)}
              className="px-5 py-2.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              Book {currentCategoryMeta.title} →
            </button>
          </div>
        )}
      </div>

      {/* Films Portfolio Grid */}
      {filteredFilms.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#121827] space-y-4">
          <Video className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Projects currently in post-production
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            New works for this category are being finalized. Check out our full portfolio or book a custom production with Director Wesley.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-6 py-2.5 rounded-full bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            View All Films
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredFilms.map((film) => {
            const isThreeNights = film.title.toUpperCase().includes('THREE NIGHTS');

            return (
              <div
                key={film.id}
                className={`group bg-white dark:bg-[#121827] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col shadow-xs ${
                  isThreeNights 
                    ? 'border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.15)] ring-2 ring-cyan-400/20' 
                    : 'border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-xl'
                }`}
              >
                {/* Special Tag for THREE NIGHTS */}
                {isThreeNights && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-cyan-500 text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    Featured Short Film
                  </div>
                )}

                {/* Poster & Play Button */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Play Trigger */}
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                    aria-label={`Watch trailer for ${film.title}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center pl-1 shadow-xl group-hover/btn:scale-110 group-hover/btn:bg-cyan-400 group-hover/btn:text-slate-950 transition-all">
                      <Play className="w-7 h-7 fill-current" />
                    </div>
                  </button>

                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider shadow-xs">
                    {film.genre}
                  </div>
                </div>

                {/* Film Information */}
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

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {film.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectFilm(film)}
                        className="text-xs font-extrabold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Trailer</span>
                      </button>
                      {film.videoUrl && (
                        <a
                          href={getVideoWatchUrl(film.videoUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                          title="Watch on YouTube / External Link"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>YouTube</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigateBooking(`${film.title} (${film.genre})`)}
                      className="text-xs text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 font-bold cursor-pointer"
                    >
                      Inquire Similar Project →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Production Session Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#121827] border border-slate-200/90 dark:border-slate-800 shadow-sm text-center space-y-6">
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase">
          READY TO START YOUR NEXT <span className="highlight-word">FILM?</span>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          From full commercial advertising campaigns and company documentaries to narrative short films, Director Wesley offers end-to-end cinema production.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigateBooking('Film & Video Custom Project')}
            className="px-8 py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
          >
            Book Film Production
          </button>
          <a
            href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20have%20a%20film%20project%20inquiry"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-[#25D366] dark:hover:border-[#25D366] bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:text-[#25D366] dark:hover:text-[#25D366] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Direct WhatsApp Chat
          </a>
        </div>
      </div>

    </div>
  );
};
