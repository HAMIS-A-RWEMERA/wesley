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
    { label: 'Netflix-Certified 4K/6K', tag: 'Master Cinema Optics' }
  ];

  return (
    <div className={`marquee-container py-3.5 border-y border-white/[0.08] bg-[#070a12]/80 backdrop-blur-md relative overflow-hidden ${className}`}>
      <div className="marquee-content flex items-center gap-8 pr-8">
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
            <span className="font-display font-bold text-sm uppercase tracking-wider text-white">
              {item.label}
            </span>
            <span className="text-[11px] text-[#94a3b8] font-medium tracking-wide">
              — {item.tag}
            </span>
          </div>
        ))}
      </div>

      <div className="marquee-content flex items-center gap-8 pr-8" aria-hidden="true">
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
            <span className="font-display font-bold text-sm uppercase tracking-wider text-white">
              {item.label}
            </span>
            <span className="text-[11px] text-[#94a3b8] font-medium tracking-wide">
              — {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
