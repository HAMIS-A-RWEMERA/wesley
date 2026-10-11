import React from 'react';
import { STUDIO_INFO, FILM_CATEGORIES, PHOTO_CATEGORIES } from '../data';
import { Film, Instagram, Youtube, Linkedin, ArrowUp, Lock, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, category?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070c] border-t border-white/[0.08] text-[#94a3b8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00f2fe]/20 to-[#a78bfa]/20 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display text-2xl text-white font-extrabold tracking-tight">
                WESLEY
              </span>
            </div>
            
            <p className="text-[11px] tracking-[0.2em] text-[#00f2fe] font-bold uppercase">
              FILM & PHOTOGRAPHY STUDIO
            </p>
            
            <p className="text-xs text-[#94a3b8] leading-relaxed max-w-sm">
              Dedicated to high-impact corporate cinema, brand films, independent narrative productions including <em>THREE NIGHTS</em>, and master editorial photography. Headquartered in Kigali, Rwanda.
            </p>

            <div className="pt-2 flex items-center gap-3 text-white">
              <a 
                href={STUDIO_INFO.socials.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#00f2fe] hover:text-[#00f2fe] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={STUDIO_INFO.socials.youtube} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#00f2fe] hover:text-[#00f2fe] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={STUDIO_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#00f2fe] hover:text-[#00f2fe] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Film & Video Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs text-white tracking-widest uppercase font-bold mb-4 text-[#00f2fe]">
              Film & Video Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              {FILM_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate('films', cat.id)} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Photography Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs text-white tracking-widest uppercase font-bold mb-4 text-[#a78bfa]">
              Photography Galleries
            </h4>
            <ul className="space-y-2 text-xs">
              {PHOTO_CATEGORIES.map((pcat) => (
                <li key={pcat.id}>
                  <button 
                    onClick={() => onNavigate('photography', pcat.id)} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {pcat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs text-white tracking-widest uppercase font-bold mb-4">
              Get in Touch
            </h4>
            <p className="text-xs text-[#cbd5e1]">
              KG 7 Ave, Kacyiru<br />Kigali, Rwanda
            </p>
            <p className="text-xs">
              <a href="mailto:rwemera30@gmail.com" className="text-[#00f2fe] hover:underline">
                rwemera30@gmail.com
              </a>
            </p>
            <p className="text-xs text-white">
              <a href="https://wa.me/250792087787" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline font-medium">
                +250 792 087 787
              </a>
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-2.5 rounded-full bg-white hover:bg-[#00f2fe] text-black font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book a Session
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div>
            © {new Date().getFullYear()} Wesley Studio. All rights reserved. Directed from Kigali, Rwanda.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#00f2fe] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Studio CMS Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
