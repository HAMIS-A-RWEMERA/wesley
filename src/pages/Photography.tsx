import React, { useState, useEffect } from 'react';
import { 
  getStoredPhotos, Photo, PHOTO_CATEGORIES 
} from '../data';
import { 
  Camera, MapPin, Maximize2, Sparkles
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200 bg-white text-purple-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Camera className="w-3.5 h-3.5 text-purple-500" />
          <span>Visual Arts & Master Lighting Portfolio</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight uppercase">
          PHOTOGRAPHY <span className="highlight-word">GALLERIES.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          High-end portraiture, editorial fashion spreads, lifestyle moments, major events, brand styling, and panoramic Rwandan landscapes captured with master lenses.
        </p>
      </div>

      {/* 6 Categories Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-xs'
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
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-xs'
                }`}
              >
                <span>{pcat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/30 text-white font-extrabold' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner */}
        {currentCategoryMeta && (
          <div className="p-6 rounded-2xl bg-white border border-purple-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-purple-600 tracking-widest">
                Gallery Focus
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                {currentCategoryMeta.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {currentCategoryMeta.shortDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigateBooking(`${currentCategoryMeta.title} Session`)}
              className="px-5 py-2.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              Book {currentCategoryMeta.title} →
            </button>
          </div>
        )}
      </div>

      {/* Photography Masonry-like Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white space-y-4">
          <Camera className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-display text-xl font-bold text-slate-900">
            Gallery Updating Soon
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            High-resolution captures for this category are being archived. Explore other galleries or book a studio shoot.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            View All Photographs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-xs flex flex-col aspect-[4/5]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Meta Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-purple-800 uppercase font-extrabold tracking-wider shadow-xs">
                  {photo.category}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h4 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {photo.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{photo.location}</span>
                  </span>
                  <span className="text-purple-300 font-semibold capitalize">{photo.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Session Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center space-y-6">
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase">
          SCHEDULE YOUR <span className="highlight-word">PHOTOGRAPHY SESSION.</span>
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Book executive portrait sessions, fashion looks, lifestyle campaigns, or commercial brand photography with Director Wesley in our Kigali studio or on location.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigateBooking('Photography Custom Session')}
            className="px-8 py-3.5 rounded-full bg-[#161f30] hover:bg-[#0f172a] text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
          >
            Book Photography Session
          </button>
          <a
            href="https://wa.me/250792087787?text=Hello%20Director%20Wesley%2C%20I%20would%20like%20to%20book%20a%20photography%20session"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 rounded-full border border-slate-300 hover:border-[#25D366] bg-white text-slate-800 hover:text-[#25D366] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            WhatsApp Consultation (+250 792 087 787)
          </a>
        </div>
      </div>

    </div>
  );
};
