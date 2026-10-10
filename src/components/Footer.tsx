import React from 'react';
import { STUDIO_INFO } from '../data';
import { MapPin, Mail, Phone, Lock, Film, Instagram, Youtube, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-[#1a1a22] text-[#8e8e9c] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded border border-[#d4af37]/40 bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-cinzel text-xl text-[#f5f5f7] font-bold tracking-widest">
                WESLEY
              </span>
            </div>
            <p className="text-xs tracking-[0.2em] text-[#d4af37] font-medium uppercase mb-4">
              FILMMAKER & PHOTOGRAPHER
            </p>
            <p className="text-sm text-[#9b9ba8] leading-relaxed mb-6">
              Dedicated to crafting authentic African cinema and timeless portraiture for global audiences. Headquartered in Kigali, Rwanda.
            </p>
            <div className="flex items-center gap-3 text-[#d4af37]">
              <a 
                href={STUDIO_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#2a2a35] hover:border-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={STUDIO_INFO.socials.youtube} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#2a2a35] hover:border-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/10 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={STUDIO_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#2a2a35] hover:border-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-sm text-[#f5f5f7] tracking-wider uppercase font-semibold mb-5">
              Explore Portfolio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  About Director Wesley
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('films')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Cinema & Documentaries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landscape')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Landscape Photography
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portrait')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Fine-Art Portraiture
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Services */}
          <div>
            <h4 className="font-cinzel text-sm text-[#f5f5f7] tracking-wider uppercase font-semibold mb-5">
              Production Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Documentary Feature Commission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Commercial & Brand Cinema
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Studio Editorial Sessions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  African Wedding Chronicles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Script & Creative Direction
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters & Contacts */}
          <div>
            <h4 className="font-cinzel text-sm text-[#f5f5f7] tracking-wider uppercase font-semibold mb-5">
              Kigali Studio
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`mailto:${STUDIO_INFO.email}`} className="text-[#d4af37] hover:underline font-medium">
                  {STUDIO_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1a1a22]">
              <button 
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-xs text-[#a0a0b0] hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Studio CMS Management Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#16161e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70707e]">
          <p>
            &copy; {new Date().getFullYear()} WESLEY STUDIO. All Rights Reserved. Crafted with cinematic passion in Kigali, Rwanda.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#d4af37] hover:text-[#f3e5ab] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
