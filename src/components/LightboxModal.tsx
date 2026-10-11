import React from 'react';
import { Photo, PHOTO_CATEGORIES } from '../data';
import { X, MapPin, Tag } from 'lucide-react';

interface LightboxModalProps {
  photo: Photo | null;
  onClose: () => void;
  onInquirePhoto?: (title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ photo, onClose, onInquirePhoto }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-[#0b0f19] border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#00f2fe] text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High-res Image Display */}
        <div className="relative w-full flex-1 min-h-[350px] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Caption & Location metadata */}
        <div className="p-6 bg-[#0b0f19] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#a78bfa] font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{PHOTO_CATEGORIES.find(c => c.id === photo.category)?.title || photo.category}</span>
            </div>
            <h3 className="font-display text-xl text-white font-bold tracking-wide">
              {photo.title}
            </h3>
            <p className="text-sm text-[#94a3b8] max-w-2xl">
              {photo.description}
            </p>
            {photo.location && (
              <div className="flex items-center gap-1.5 text-xs text-[#64748b] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>{photo.location}</span>
              </div>
            )}
          </div>

          {onInquirePhoto && (
            <button
              onClick={() => {
                onClose();
                onInquirePhoto(photo.title);
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#a78bfa] text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shrink-0"
            >
              Order Print / Inquire
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
