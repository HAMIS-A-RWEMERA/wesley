import React, { useState } from 'react';
import { INITIAL_FILMS, Film } from '../data';
import { Play, Award, Clock, Calendar, Filter } from 'lucide-react';

interface FilmsProps {
  onSelectFilm: (film: Film) => void;
  onNavigateBooking: () => void;
}

export const Films: React.FC<FilmsProps> = ({ onSelectFilm, onNavigateBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Cinema' },
    { id: 'narrative', label: 'Narrative Features' },
    { id: 'documentary', label: 'Documentaries' },
    { id: 'art', label: 'Poetic & Art Shorts' },
  ];

  const filteredFilms = activeCategory === 'all'
    ? INITIAL_FILMS
    : INITIAL_FILMS.filter(f => f.category === activeCategory);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
          DIRECTOR WESLEY FILMOGRAPHY
        </span>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          CINEMA SHOWCASE
        </h1>
        <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
          Award-winning African storytelling exploring ancestral heritage, wildlife conservation, modern cultural movements, and urban resilience.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'bg-[#15151c] text-[#9e9eb0] hover:text-white border border-[#22222c]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl"
          >
            {/* Poster & Play Button */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
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
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/90 text-black flex items-center justify-center pl-1 shadow-[0_0_35px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current" />
                </div>
              </button>

              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#2a2a35] text-xs text-[#d4af37] uppercase font-bold tracking-wider">
                {film.genre}
              </div>
            </div>

            {/* Info */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-6 text-xs text-[#8e8e9c]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    {film.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {film.year}
                  </span>
                </div>

                <h2 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {film.title}
                </h2>

                <p className="text-sm text-[#9e9eb0] leading-relaxed">
                  {film.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1e1e28]">
                {film.awards && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{film.awards}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="text-xs font-bold text-white hover:text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Watch Full Trailer</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>

                  <button
                    onClick={onNavigateBooking}
                    className="px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Commission Film
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
