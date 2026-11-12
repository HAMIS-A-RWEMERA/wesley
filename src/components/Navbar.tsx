import React, { useState, useRef } from 'react';
import { Film as FilmIcon, ChevronDown, Calendar, Lock, Menu, X, Sun, Moon } from 'lucide-react';
import { FILM_CATEGORIES, PHOTO_CATEGORIES } from '../data';

interface NavbarProps {
  currentPage: string;
  selectedCategory?: string;
  onNavigate: (page: string, category?: string) => void;
  onOpenAdmin: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  selectedCategory, 
  onNavigate, 
  onOpenAdmin,
  theme = 'light',
  onToggleTheme 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filmDropdownOpen, setFilmDropdownOpen] = useState(false);
  const [photoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const filmTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const photoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDark = theme === 'dark';

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
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 sm:px-6 py-2.5 glass-nav transition-all">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <FilmIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-display text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-extrabold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              WESLEY
            </span>
            <span className="block text-[9px] tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase -mt-0.5 font-semibold">
              FILM & VISUAL ARTS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'text-cyan-700 bg-cyan-50/80 dark:text-cyan-300 dark:bg-cyan-950/70 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          {/* 2. About */}
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              currentPage === 'about'
                ? 'text-cyan-700 bg-cyan-50/80 dark:text-cyan-300 dark:bg-cyan-950/70 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                currentPage === 'films'
                  ? 'text-cyan-700 bg-cyan-50/80 dark:text-cyan-300 dark:bg-cyan-950/70 shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>Film & Video</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${filmDropdownOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {filmDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white/95 dark:bg-[#0f1422] backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 p-2 shadow-2xl animate-in fade-in-50 zoom-in-95 z-50">
                <div className="space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400">
                    Cinema Sectors
                  </div>
                  {FILM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick('films', cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer group ${
                        currentPage === 'films' && selectedCategory === cat.id
                          ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-200'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {cat.title}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {cat.shortDesc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleNavClick('films', 'all')}
                    className="w-full text-center py-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 transition-colors cursor-pointer"
                  >
                    View All 7 Film Sectors →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Photography (DROPDOWN) */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnterPhoto}
            onMouseLeave={handleMouseLeavePhoto}
          >
            <button
              onClick={() => handleNavClick('photography')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                currentPage === 'photography'
                  ? 'text-purple-700 bg-purple-50/80 dark:text-purple-300 dark:bg-purple-950/70 shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>Photography</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${photoDropdownOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {photoDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white/95 dark:bg-[#0f1422] backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 p-2 shadow-2xl animate-in fade-in-50 zoom-in-95 z-50">
                <div className="space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
                    Fine-Art Photography
                  </div>
                  {PHOTO_CATEGORIES.map((pcat) => (
                    <button
                      key={pcat.id}
                      onClick={() => handleNavClick('photography', pcat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer group ${
                        currentPage === 'photography' && selectedCategory === pcat.id
                          ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {pcat.title}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {pcat.shortDesc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleNavClick('photography', 'all')}
                    className="w-full text-center py-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    View All Photography Galleries →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Book a Session */}
          <button
            onClick={() => handleNavClick('booking')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              currentPage === 'booking'
                ? 'text-cyan-700 bg-cyan-50/80 dark:text-cyan-300 dark:bg-cyan-950/70 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
            }`}
          >
            Book a Session
          </button>

          {/* 6. Contact */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              currentPage === 'contact'
                ? 'text-cyan-700 bg-cyan-50/80 dark:text-cyan-300 dark:bg-cyan-950/70 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-8.5 h-8.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-600 dark:text-amber-300 flex items-center justify-center transition-all bg-white dark:bg-slate-800/90 cursor-pointer shadow-xs hover:scale-105"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform rotate-0" />
              )}
            </button>
          )}

          <button
            onClick={() => handleNavClick('booking')}
            className="px-5 py-2 rounded-full bg-[#161f30] dark:bg-cyan-500 hover:bg-[#0f172a] dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400 dark:text-slate-950" />
            <span>Book Session</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title="Studio Portal / CMS"
            className="w-8.5 h-8.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-cyan-400 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer bg-white dark:bg-slate-800/90"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-300 flex items-center justify-center bg-white dark:bg-slate-800 cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light mode"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onOpenAdmin}
            title="Studio Portal"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center bg-white dark:bg-slate-800"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-2 mx-auto max-w-lg bg-white/95 dark:bg-[#0c101a]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto animate-in fade-in-50 zoom-in-95">
          
          {/* Mobile Theme Toggle Row */}
          {onToggleTheme && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Display Theme
              </span>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer shadow-xs"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dark Mode (Active)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Light Mode (Active)</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === 'home' 
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300' 
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === 'about' 
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300' 
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              About
            </button>

            {/* Mobile Film & Video with Dropdown */}
            <div>
              <button
                onClick={() => setFilmDropdownOpen(!filmDropdownOpen)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span>Film & Video (7 Categories)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${filmDropdownOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {filmDropdownOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-900/80 rounded-2xl my-1 border border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleNavClick('films', 'all')}
                    className="w-full text-left px-3 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:underline"
                  >
                    View All Film Work →
                  </button>
                  {FILM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick('films', cat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        currentPage === 'films' && selectedCategory === cat.id
                          ? 'text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Photography with Dropdown */}
            <div>
              <button
                onClick={() => setPhotoDropdownOpen(!photoDropdownOpen)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span>Photography (6 Categories)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${photoDropdownOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
              </button>

              {photoDropdownOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-900/80 rounded-2xl my-1 border border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleNavClick('photography', 'all')}
                    className="w-full text-left px-3 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-400 hover:underline"
                  >
                    View All Photography Galleries →
                  </button>
                  {PHOTO_CATEGORIES.map((pcat) => (
                    <button
                      key={pcat.id}
                      onClick={() => handleNavClick('photography', pcat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        currentPage === 'photography' && selectedCategory === pcat.id
                          ? 'text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {pcat.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('booking')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === 'booking' 
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300' 
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              Book a Session
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === 'contact' 
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300' 
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3 rounded-full bg-[#161f30] dark:bg-cyan-500 hover:bg-[#0f172a] dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-cyan-400 dark:text-slate-950" />
              <span>Book a Session Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
