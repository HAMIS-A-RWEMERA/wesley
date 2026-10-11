import React, { useState, useEffect } from 'react';
import { 
  getStoredFilms, Film, FilmCategory, FILM_CATEGORIES 
} from '../data';
import { 
  Play, Clock, Calendar, ArrowRight, Video, Sparkles, Filter 
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
  const films = getStoredFilms();

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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 text-[#00f2fe] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cinematography & Directing Portfolio</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase">
          FILM & <span className="highlight-word">VIDEO.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
          Explore our complete cinematic portfolio across seven specialized sectors — from executive corporate films and brand stories to independent short cinema and documentaries.
        </p>
      </div>

      {/* 7 Categories Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#00f2fe] text-[#07090e] shadow-[0_0_25px_rgba(0,242,254,0.4)]'
                : 'bg-[#0d121f] text-[#94a3b8] hover:text-white border border-white/[0.08]'
            }`}
          >
            All Work ({films.length})
          </button>

          {FILM_CATEGORIES.map((cat, idx) => {
            const count = films.filter(f => f.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#00f2fe] text-[#07090e] shadow-[0_0_25px_rgba(0,242,254,0.4)]'
                    : 'bg-[#0d121f] text-[#94a3b8] hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-[#94a3b8]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner */}
        {currentCategoryMeta && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1424] via-[#0e1628] to-[#0d1424] border border-[#00f2fe]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#00f2fe] tracking-widest">
                Sector Overview
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                {currentCategoryMeta.title}
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
                {currentCategoryMeta.shortDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigateBooking(`${currentCategoryMeta.title} Production`)}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#00f2fe] text-[#07090e] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
            >
              Book {currentCategoryMeta.title} →
            </button>
          </div>
        )}
      </div>

      {/* Films Portfolio Grid */}
      {filteredFilms.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-white/10 bg-[#0d121f] space-y-4">
          <Video className="w-10 h-10 text-[#94a3b8] mx-auto" />
          <h3 className="font-display text-xl font-bold text-white">
            Projects currently in post-production
          </h3>
          <p className="text-sm text-[#94a3b8] max-w-md mx-auto">
            New works for this category are being finalized. Check out our full portfolio or book a custom production with Director Wesley.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-6 py-2.5 rounded-full bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider"
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
                className={`group bg-[#0d121f] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col shadow-2xl relative ${
                  isThreeNights 
                    ? 'border-[#00f2fe]/60 shadow-[0_0_40px_rgba(0,242,254,0.15)]' 
                    : 'border-white/[0.08] hover:border-[#00f2fe]/50'
                }`}
              >
                {/* Special Tag for THREE NIGHTS */}
                {isThreeNights && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#00f2fe] text-[#07090e] text-[11px] font-extrabold uppercase tracking-widest shadow-lg">
                    Featured Short Film
                  </div>
                )}

                {/* Poster & Play Button */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-black/40 to-transparent" />
                  
                  {/* Play Trigger */}
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                    aria-label={`Watch trailer for ${film.title}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/90 text-[#07090e] flex items-center justify-center pl-1 shadow-[0_0_35px_rgba(255,255,255,0.6)] group-hover/btn:scale-110 group-hover/btn:bg-[#00f2fe] transition-all">
                      <Play className="w-7 h-7 fill-current" />
                    </div>
                  </button>

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#07090e]/85 backdrop-blur-md border border-white/10 text-xs text-[#00f2fe] uppercase font-bold tracking-wider">
                    {film.genre}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-5 text-xs text-[#94a3b8]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00f2fe]" />
                        {film.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#a78bfa]" />
                        {film.year}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] uppercase font-semibold text-[#cbd5e1]">
                        {FILM_CATEGORIES.find(c => c.id === film.category)?.title || film.category}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00f2fe] transition-colors">
                      {film.title}
                    </h2>

                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {film.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => onSelectFilm(film)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#00f2fe] hover:text-white uppercase tracking-wider cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Trailer</span>
                    </button>

                    <button
                      onClick={() => onNavigateBooking(film.title)}
                      className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
                    >
                      Commission Similar →
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Production Services CTA Bottom Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#090e1a] to-[#070a12] border border-white/10 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          READY TO PRODUCE YOUR NEXT <span className="highlight-word">FILM?</span>
        </h2>
        <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto">
          From corporate profiles and commercials to high-production narrative films, Wesley Studio provides end-to-end cinematography and post-production in Kigali.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigateBooking()}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#00f2fe] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
          >
            Book a Film Session
          </button>
          <a
            href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20would%20like%20to%20discuss%20a%20Film%20%26%20Video%20production"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 rounded-full border border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            WhatsApp Director Wesley
          </a>
        </div>
      </div>

    </div>
  );
};
