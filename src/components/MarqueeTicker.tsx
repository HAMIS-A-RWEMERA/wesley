import React from 'react';

interface MarqueeTickerProps {
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = '' }) => {
  const items = [
    { label: 'Corporate Videos', tag: 'Company Profiles & NGOs' },
    { label: 'Brand Films', tag: 'Cinematic Storytelling' },
    { label: 'Commercials & Ads', tag: 'High-Impact Campaigns' },
    { label: 'Short Films', tag: 'Narratives & THREE NIGHTS' },
    { label: 'Documentaries', tag: 'Human & Community Stories' },
    { label: 'Social Media Content', tag: 'Reels & Digital Platforms' },
    { label: 'Event Films', tag: 'Conferences & Galas' },
    { label: 'Fine-Art Photography', tag: 'Portraits, Fashion & Editorial' },
    { label: 'Master Cinema Optics', tag: 'RED & Sony FX Cinematic Rigs' }
  ];

  return (
    <div className={`marquee-container py-3.5 border-y border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-[#0c101a]/85 backdrop-blur-md shadow-xs relative overflow-hidden transition-colors ${className}`}>
      <div className="marquee-content flex items-center gap-10 pr-10">
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-xs" />
            <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              {item.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              — {item.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="marquee-content flex items-center gap-10 pr-10" aria-hidden="true">
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-xs" />
            <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              {item.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              — {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
