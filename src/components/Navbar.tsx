import React, { useState, useRef, useEffect } from 'react';
import { Film as FilmIcon, ChevronDown, Calendar, Lock, Menu, X, Camera, Sparkles } from 'lucide-react';
import { FILM_CATEGORIES, PHOTO_CATEGORIES, FilmCategory, PhotoCategory } from '../data';

interface NavbarProps {
  currentPage: string;
  selectedCategory?: string;
  onNavigate: (page: string, category?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  selectedCategory, 
  onNavigate, 
  onOpenAdmin 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filmDropdownOpen, setFilmDropdownOpen] = useState(false);
  const [photoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const filmTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const photoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (page: string, category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
    setFilmDropdownOpen(false);
    setPhotoDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterFilm = () => {
    if (filmTimeoutRef.current) clearTimeout(filmTimeoutRef.current);
    setFilmDropdownOpen(true);
  };

  const handleMouseLeaveFilm = () => {
    filmTimeoutRef.current = setTimeout(() => {
      setFilmDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterPhoto = () => {
    if (photoTimeoutRef.current) clearTimeout(photoTimeoutRef.current);
    setPhotoDropdownOpen(true);
  };

  const handleMouseLeavePhoto = () => {
    photoTimeoutRef.current = setTimeout(() => {
      setPhotoDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Seven Media Inspired */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f2fe]/20 to-[#a78bfa]/20 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] group-hover:border-[#00f2fe] group-hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all">
            <FilmIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-display text-xl sm:text-2xl tracking-tight text-white font-extrabold group-hover:text-[#00f2fe] transition-colors">
              WESLEY
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase -mt-0.5 font-medium">
              FILM & VISUAL ARTS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#00f2fe] bg-white/[0.04]'
                : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            Home
          </button>

          {/* 2. About */}
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors cursor-pointer ${
              currentPage === 'about'
                ? 'text-[#00f2fe] bg-white/[0.04]'
                : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            About
          </button>

          {/* 3. Film & Video (DROPDOWN) */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnterFilm}
            onMouseLeave={handleMouseLeaveFilm}
          >
            <button
              onClick={() => handleNavClick('films')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'films'
                  ? 'text-[#00f2fe] bg-white/[0.04]'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span>Film & Video</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${filmDropdownOpen ? 'rotate-180 text-[#00f2fe]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {filmDropdownOpen && (
              <div className="absolute top-full left-0 w-80 pt-2 z-50">
                <div className="bg-[#0b0f19] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 backdrop-blur-2xl">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] border-b border-white/[0.06] mb-1 flex items-center justify-between">
                    <span>Film & Video Categories</span>
                    <span className="text-[#00f2fe]">7 Sectors</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    {FILM_CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('films', cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer group flex items-start gap-3 ${
                          currentPage === 'films' && selectedCategory === cat.id
                            ? 'bg-[#00f2fe]/10 text-white'
                            : 'hover:bg-white/[0.04] text-[#cbd5e1]'
                        }`}
                      >
                        <span className="text-[11px] font-mono text-[#00f2fe] opacity-70 group-hover:opacity-100 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-[#00f2fe] transition-colors">
                            {cat.title}
                          </div>
                          <p className="text-[10px] text-[#94a3b8] line-clamp-1">
                            {cat.shortDesc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleNavClick('films', 'all')}
                      className="w-full text-center py-1.5 text-xs font-semibold text-[#00f2fe] hover:text-white transition-colors cursor-pointer"
                    >
                      View All Films Portfolio →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Photography (Separate Nav Item with category fast-jump) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterPhoto}
            onMouseLeave={handleMouseLeavePhoto}
          >
            <button
              onClick={() => handleNavClick('photography')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'photography'
                  ? 'text-[#00f2fe] bg-white/[0.04]'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span>Photography</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${photoDropdownOpen ? 'rotate-180 text-[#00f2fe]' : ''}`} />
            </button>

            {photoDropdownOpen && (
              <div className="absolute top-full left-0 w-72 pt-2 z-50">
                <div className="bg-[#0b0f19] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 backdrop-blur-2xl">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] border-b border-white/[0.06] mb-1 flex items-center justify-between">
                    <span>Photography Portfolios</span>
                    <span className="text-[#a78bfa]">6 Galleries</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    {PHOTO_CATEGORIES.map((pcat) => (
                      <button
                        key={pcat.id}
                        onClick={() => handleNavClick('photography', pcat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer group ${
                          currentPage === 'photography' && selectedCategory === pcat.id
                            ? 'bg-[#a78bfa]/15 text-white'
                            : 'hover:bg-white/[0.04] text-[#cbd5e1]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                          {pcat.title}
                        </div>
                        <p className="text-[10px] text-[#94a3b8] line-clamp-1">
                          {pcat.shortDesc}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleNavClick('photography', 'all')}
                      className="w-full text-center py-1.5 text-xs font-semibold text-[#a78bfa] hover:text-white transition-colors cursor-pointer"
                    >
                      View All Photography Galleries →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. Book a Session (Visible in Navigation) */}
          <button
            onClick={() => handleNavClick('booking')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              currentPage === 'booking'
                ? 'text-[#00f2fe] bg-white/[0.04]'
                : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            Book a Session
          </button>

          {/* 6. Contact */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#00f2fe] bg-white/[0.04]'
                : 'text-[#cbd5e1] hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('booking')}
            className="px-5 py-2.5 rounded-full bg-white text-[#07090e] hover:bg-[#00f2fe] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Session</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title="Studio Portal / CMS"
            className="w-9 h-9 rounded-full border border-white/10 hover:border-[#00f2fe]/60 text-[#94a3b8] hover:text-[#00f2fe] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            title="Studio Portal"
            className="w-9 h-9 rounded-full border border-white/10 text-[#94a3b8] flex items-center justify-center"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-white flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090e]/98 border-b border-white/10 px-4 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold ${
                currentPage === 'home' ? 'bg-[#00f2fe]/10 text-[#00f2fe]' : 'text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold ${
                currentPage === 'about' ? 'bg-[#00f2fe]/10 text-[#00f2fe]' : 'text-white'
              }`}
            >
              About
            </button>
          </div>

          {/* Film & Video Categories Dropdown in Mobile */}
          <div className="bg-[#0e1320] rounded-2xl p-3 border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00f2fe]">
                Film & Video Categories
              </span>
              <button 
                onClick={() => handleNavClick('films')}
                className="text-[11px] text-[#94a3b8] hover:text-white"
              >
                All Films →
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {FILM_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('films', cat.id)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#e2e8f0] hover:bg-[#00f2fe]/10 flex items-center justify-between"
                >
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-[#94a3b8]">0{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photography Categories in Mobile */}
          <div className="bg-[#0e1320] rounded-2xl p-3 border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
                Photography Portfolios
              </span>
              <button 
                onClick={() => handleNavClick('photography')}
                className="text-[11px] text-[#94a3b8] hover:text-white"
              >
                All Galleries →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {PHOTO_CATEGORIES.map((pcat) => (
                <button
                  key={pcat.id}
                  onClick={() => handleNavClick('photography', pcat.id)}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium text-[#e2e8f0] hover:bg-[#a78bfa]/10"
                >
                  {pcat.title.replace(' Photography', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Session</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 rounded-xl border border-white/10 text-white font-medium text-sm text-center"
            >
              Contact Director Wesley
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
