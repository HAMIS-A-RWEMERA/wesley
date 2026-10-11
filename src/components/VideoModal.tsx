import React from 'react';
import { Film } from '../data';
import { X, Clock, Calendar, Film as FilmIcon } from 'lucide-react';

interface VideoModalProps {
  film: Film | null;
  onClose: () => void;
  onBookFilmProject?: (filmTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ film, onClose, onBookFilmProject }) => {
  if (!film) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070a12]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
              <FilmIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-wide">
                {film.title}
              </h3>
              <p className="text-xs text-[#94a3b8]">
                {film.genre} • {film.year}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00f2fe] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
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
        <div className="p-6 overflow-y-auto space-y-4 bg-[#0b0f19]">
          <div className="space-y-2">
            <h4 className="font-display text-xs text-[#00f2fe] uppercase tracking-wider font-bold">
              Director's Treatment / Synopsis
            </h4>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {film.synopsis || film.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00f2fe]" />
                <span>Runtime: {film.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#a78bfa]" />
                <span>Release: {film.year}</span>
              </div>
            </div>

            {onBookFilmProject && (
              <button
                onClick={() => {
                  onClose();
                  onBookFilmProject(film.title);
                }}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#00f2fe] text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Commission Film Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
