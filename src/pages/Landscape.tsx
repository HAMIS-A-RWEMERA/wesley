import React, { useState } from 'react';
import { INITIAL_PHOTOS, Photo } from '../data';
import { MapPin, Maximize2, Tag } from 'lucide-react';

interface LandscapeProps {
  onSelectPhoto: (photo: Photo) => void;
  onNavigateBooking: () => void;
}

export const Landscape: React.FC<LandscapeProps> = ({ onSelectPhoto, onNavigateBooking }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const landscapePhotos = INITIAL_PHOTOS.filter(p => p.category === 'landscape');

  const filters = [
    { id: 'all', label: 'All Landscapes' },
    { id: 'Lakes', label: 'Lakes & Waters' },
    { id: 'Highlands', label: 'Volcanoes & Highlands' },
    { id: 'Forests', label: 'Ancient Rainforests' },
    { id: 'Urban', label: 'Kigali Cityscape' },
  ];

  const filteredPhotos = activeFilter === 'all'
    ? landscapePhotos
    : landscapePhotos.filter(p => p.subCategory === activeFilter);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#d4af37]">
          RWANDA & EAST AFRICA
        </span>
        <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-white tracking-wide">
          LANDSCAPE PHOTOGRAPHY
        </h1>
        <p className="text-sm sm:text-base text-[#9e9eb0] leading-relaxed">
          From the mist-crowned volcanic ridges of Musanze to the tranquil shorelines of Lake Kivu, experiencing the timeless majesty of the Land of a Thousand Hills.
        </p>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'bg-[#15151c] text-[#9e9eb0] hover:text-white border border-[#22222c]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onSelectPhoto(photo)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#111116] border border-[#22222a] hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-300 flex flex-col justify-end"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#2a2a35] flex items-center justify-center text-white group-hover:text-[#d4af37] transition-colors">
              <Maximize2 className="w-4 h-4" />
            </div>

            <div className="relative z-10 p-6 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                {photo.subCategory}
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-[#a0a0b0] line-clamp-2">
                {photo.description}
              </p>
              {photo.location && (
                <div className="flex items-center gap-1.5 text-xs text-[#787888] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{photo.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Print Commission Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-[#22222a] text-center max-w-3xl mx-auto space-y-4">
        <h3 className="font-cinzel text-2xl font-bold text-white">
          Fine-Art Archival Prints & Licensing
        </h3>
        <p className="text-sm text-[#9e9eb0] leading-relaxed">
          High-resolution landscape imagery is available for international gallery exhibitions, architectural installations, and editorial publishing.
        </p>
        <button
          onClick={onNavigateBooking}
          className="px-6 py-3 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors cursor-pointer"
        >
          Inquire Archival Print Commission
        </button>
      </div>

    </div>
  );
};
