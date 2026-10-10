import React from 'react';
import { Film } from '../data';
import { X, Award, Clock, Calendar, Film as FilmIcon } from 'lucide-react';

interface VideoModalProps {
  film: Film | null;
  onClose: () => void;
  onBookFilmProject: (filmTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ film, onClose, onBookFilmProject }) => {
  if (!film) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121217] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222c] bg-[#0c0c10]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <FilmIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                {film.title}
              </h3>
              <p className="text-xs text-[#a0a0b0]">
                {film.genre} • {film.year}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c24] hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={film.videoUrl}
            title={film.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info & Details */}
        <div className="p-6 overflow-y-auto space-y-4 bg-[#121217]">
          {film.awards && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-medium">
              <Award className="w-4 h-4 shrink-0" />
              <span>{film.awards}</span>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-cinzel text-sm text-[#e0e0e8] uppercase tracking-wider font-semibold">
              Director's Synopsis
            </h4>
            <p className="text-sm text-[#b0b0be] leading-relaxed">
              {film.synopsis || film.description}
            </p>
          </div>

          <div className="pt-4 border-t border-[#22222c] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-[#8e8e9c]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Runtime: {film.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span>Release: {film.year}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookFilmProject(film.title);
              }}
              className="px-5 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#f3e5ab] text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Commission Film Production
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
