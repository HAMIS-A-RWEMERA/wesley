import React, { useState, useEffect } from 'react';
import { STUDIO_INFO, FILM_CATEGORIES, PHOTO_CATEGORIES, getStoredSettings } from '../data';
import { Film, Instagram, Youtube, Linkedin, ArrowUp, Lock, Sun, Moon } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, category?: string) => void;
  onOpenAdmin: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenAdmin,
  theme = 'light',
  onToggleTheme 
}) => {
  const [settings, setSettings] = useState(() => getStoredSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('wesley_content_changed', handleUpdate);
    return () => window.removeEventListener('wesley_content_changed', handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const youtubeLink = settings.youtubeUrl || STUDIO_INFO.socials.youtube;
  const instagramLink = settings.instagramUrl || STUDIO_INFO.socials.instagram;
  const linkedinLink = settings.linkedinUrl || STUDIO_INFO.socials.linkedin;

  return (
    <footer className="bg-[#161f30] border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display text-2xl text-white font-extrabold tracking-tight">
                WESLEY
              </span>
            </div>
            
            <p className="text-[11px] tracking-[0.2em] text-cyan-400 font-bold uppercase">
              FILM & PHOTOGRAPHY STUDIO
            </p>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to high-impact corporate cinema, brand films, independent narrative productions including <em>THREE NIGHTS</em>, and master editorial photography. Headquartered in Kigali, Rwanda.
            </p>

            <div className="pt-2 flex items-center gap-3 text-white">
              <a 
                href={instagramLink} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-colors bg-slate-900/50"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={youtubeLink} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700 hover:border-red-500 hover:text-red-400 flex items-center justify-center transition-colors bg-slate-900/50"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={linkedinLink} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-colors bg-slate-900/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Film & Video Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs text-cyan-400 tracking-widest uppercase font-extrabold mb-4">
              Film & Video Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              {FILM_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate('films', cat.id)} 
                    className="hover:text-cyan-400 text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Photography Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs text-purple-400 tracking-widest uppercase font-extrabold mb-4">
              Photography Galleries
            </h4>
            <ul className="space-y-2 text-xs">
              {PHOTO_CATEGORIES.map((pcat) => (
                <li key={pcat.id}>
                  <button 
                    onClick={() => onNavigate('photography', pcat.id)} 
                    className="hover:text-purple-400 text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    {pcat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs text-white tracking-widest uppercase font-extrabold mb-4">
              Get in Touch
            </h4>
            <p className="text-xs text-slate-300">
              KG 7 Ave, Kacyiru<br />Kigali, Rwanda
            </p>
            <p className="text-xs">
              <a href="mailto:rwemera30@gmail.com" className="text-cyan-400 hover:underline">
                rwemera30@gmail.com
              </a>
            </p>
            <p className="text-xs text-white">
              <a href="https://wa.me/250792087787" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline font-bold">
                +250 792 087 787
              </a>
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="w-full py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Book a Session
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Wesley Studio. All rights reserved. Directed from Kigali, Rwanda.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="hover:text-cyan-400 text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-300" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenAdmin}
              className="hover:text-cyan-400 text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Studio CMS Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="hover:text-white text-slate-400 flex items-center gap-1 transition-colors cursor-pointer"
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
