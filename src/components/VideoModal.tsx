import React from 'react';
import { Film } from '../data';
import { parseVideoUrl, getVideoWatchUrl } from '../utils/video';
import { X, Clock, Calendar, Film as FilmIcon, ExternalLink, Play } from 'lucide-react';

interface VideoModalProps {
  film: Film | null;
  onClose: () => void;
  onBookFilmProject?: (filmTitle: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ film, onClose, onBookFilmProject }) => {
  if (!film) return null;

  const parsedVideo = parseVideoUrl(film.videoUrl);
  const embedSrc = parsedVideo.embedUrl || film.videoUrl;
  const directWatchUrl = getVideoWatchUrl(film.videoUrl);
  const isYouTube = parsedVideo.type === 'youtube';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#070a12]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe] shrink-0">
              <FilmIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
                {film.title}
              </h3>
              <p className="text-xs text-[#94a3b8]">
                {film.genre} • {film.year}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {directWatchUrl && (
              <a
                href={directWatchUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                title="Open in YouTube"
              >
                <span>{isYouTube ? 'Watch on YouTube' : 'Open Video'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00f2fe] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={film.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <Play className="w-12 h-12 text-[#94a3b8] mx-auto opacity-40" />
              <p className="text-sm text-[#94a3b8]">No video URL configured for this production.</p>
            </div>
          )}
        </div>

        {/* Info & Details */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#0b0f19]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-xs text-[#00f2fe] uppercase tracking-wider font-bold">
                Director's Treatment / Synopsis
              </h4>
              {directWatchUrl && (
                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:hidden inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                >
                  <span>{isYouTube ? 'Open on YouTube' : 'Open Link'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
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

            <div className="flex items-center gap-3">
              {directWatchUrl && (
                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-red-500 hover:text-red-400 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isYouTube ? 'Watch on YouTube' : 'External Link'}</span>
                </a>
              )}

              {onBookFilmProject && (
                <button
                  onClick={() => {
                    onClose();
                    onBookFilmProject(film.title);
                  }}
                  className="px-5 py-2 rounded-full bg-white hover:bg-[#00f2fe] text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Commission Film Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
