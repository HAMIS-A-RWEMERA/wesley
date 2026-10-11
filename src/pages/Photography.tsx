import React, { useState, useEffect } from 'react';
import { 
  getStoredPhotos, Photo, PhotoCategory, PHOTO_CATEGORIES 
} from '../data';
import { 
  Camera, MapPin, Maximize2, Sparkles, Calendar, ArrowRight 
} from 'lucide-react';

interface PhotographyProps {
  initialCategory?: string;
  onSelectPhoto: (photo: Photo) => void;
  onNavigateBooking: (serviceName?: string) => void;
}

export const Photography: React.FC<PhotographyProps> = ({ 
  initialCategory = 'all', 
  onSelectPhoto, 
  onNavigateBooking 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const photos = getStoredPhotos();

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const currentCategoryMeta = PHOTO_CATEGORIES.find(c => c.id === activeCategory);

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Banner - Seven Media Styling */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#a78bfa] text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Arts & Master Lighting Portfolio</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase">
          PHOTOGRAPHY <span className="highlight-word">GALLERIES.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
          High-end portraiture, editorial fashion spreads, lifestyle moments, major events, brand styling, and panoramic Rwandan landscapes captured with master lenses.
        </p>
      </div>

      {/* 6 Categories Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#a78bfa] text-[#07090e] shadow-[0_0_25px_rgba(167,139,250,0.4)]'
                : 'bg-[#0d121f] text-[#94a3b8] hover:text-white border border-white/[0.08]'
            }`}
          >
            All Works ({photos.length})
          </button>

          {PHOTO_CATEGORIES.map((pcat) => {
            const count = photos.filter(p => p.category === pcat.id).length;
            const isActive = activeCategory === pcat.id;

            return (
              <button
                key={pcat.id}
                onClick={() => setActiveCategory(pcat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#a78bfa] text-[#07090e] shadow-[0_0_25px_rgba(167,139,250,0.4)]'
                    : 'bg-[#0d121f] text-[#94a3b8] hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>{pcat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-[#94a3b8]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        {currentCategoryMeta && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#120f24] via-[#101426] to-[#0e1220] border border-[#a78bfa]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#a78bfa] tracking-widest">
                Portfolio Sector
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                {currentCategoryMeta.title}
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
                {currentCategoryMeta.shortDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigateBooking(`${currentCategoryMeta.title} Session`)}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#a78bfa] text-[#07090e] font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
            >
              Book {currentCategoryMeta.title.replace(' Photography', '')} Shoot →
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-white/10 bg-[#0d121f] space-y-4">
          <Camera className="w-10 h-10 text-[#94a3b8] mx-auto" />
          <h3 className="font-display text-xl font-bold text-white">
            Upcoming Shoot Gallery
          </h3>
          <p className="text-sm text-[#94a3b8] max-w-md mx-auto">
            Images for this category will be uploaded shortly via the Studio CMS.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-6 py-2.5 rounded-full bg-[#a78bfa] text-black font-bold text-xs uppercase tracking-wider"
          >
            View All Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#0d121f] border border-white/[0.08] hover:border-[#a78bfa]/50 transition-all duration-300 cursor-pointer shadow-xl flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Hover Maximize Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                  <Maximize2 className="w-4 h-4 text-[#a78bfa]" />
                </div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-[#a78bfa] uppercase font-bold tracking-wider">
                  {PHOTO_CATEGORIES.find(c => c.id === photo.category)?.title.replace(' Photography', '') || photo.category}
                </div>
              </div>

              {/* Photo Caption */}
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#94a3b8] line-clamp-2 mt-1">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </span>
                  <span className="text-[#a78bfa] font-semibold text-[11px] shrink-0">
                    View HD →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Booking CTA Footer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#120f24] via-[#0a0e1c] to-[#07090e] border border-white/10 text-center space-y-6">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          COMMISSION A BESPOKE <span className="highlight-word">PHOTO SESSION.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto">
          Whether for high-profile portraiture, fashion editorial spreads, commercial campaigns, or private events in Rwanda, Wesley delivers timeless optical mastery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigateBooking('Portrait & Editorial Photography')}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#a78bfa] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_30px_rgba(167,139,250,0.4)] transition-all cursor-pointer"
          >
            Book Photography Session
          </button>
          <a
            href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20would%20like%20to%20book%20a%20photography%20session"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 rounded-full border border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Direct WhatsApp Booking
          </a>
        </div>
      </div>

    </div>
  );
};
