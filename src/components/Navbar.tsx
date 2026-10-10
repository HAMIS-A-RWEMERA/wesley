import React, { useState } from 'react';
import { STUDIO_INFO } from '../data';
import { Film, Camera, Calendar, Mail, User, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'films', label: 'Cinema Showcase' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'booking', label: 'Book Session' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-[#22222a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] transition-all">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-cinzel text-xl sm:text-2xl tracking-widest text-[#f5f5f7] font-bold group-hover:text-[#d4af37] transition-colors">
              WESLEY
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#a0a0aa] uppercase -mt-1 font-sans">
              FILMMAKER & STORYTELLER
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm tracking-wide font-medium transition-colors cursor-pointer relative py-1 ${
                currentPage === item.id
                  ? 'text-[#d4af37]'
                  : 'text-[#c0c0cc] hover:text-white'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('booking')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0c0c0e] font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Session
          </button>

          <button
            onClick={onOpenAdmin}
            title="Studio CMS Portal"
            className="w-9 h-9 rounded-full border border-[#2a2a35] hover:border-[#d4af37]/60 text-[#888896] hover:text-[#d4af37] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            title="Studio CMS"
            className="w-9 h-9 rounded-full border border-[#2a2a35] text-[#888896] flex items-center justify-center"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#c0c0cc] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111116] border-b border-[#22222a] px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-base font-medium py-2 border-b border-[#1c1c24] flex items-center justify-between ${
                  currentPage === item.id ? 'text-[#d4af37]' : 'text-[#c0c0cc]'
                }`}
              >
                <span>{item.label}</span>
                {currentPage === item.id && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('booking')}
              className="mt-3 w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0c0c0e] font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
