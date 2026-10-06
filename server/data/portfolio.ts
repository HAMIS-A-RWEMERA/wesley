export interface Film {
  id: number;
  title: string;
  description: string;
  poster: string;
  video: string; // YouTube, Vimeo, or direct embed URL
  youtubeUrl?: string; // Optional direct YouTube watch link
  genre: string;
  duration: string;
  year: number;
  awards: string;
}

export interface Photo {
  id: number;
  title: string;
  description: string;
  filename: string; // Image link (local asset, Pixieset, or high-res CDN)
  category: 'landscape' | 'portrait';
  location: string;
  pixiesetUrl?: string; // Optional Pixieset link to open original gallery
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
}

// ==========================================
// 🎬 CINEMA SHOWCASE / FILMS
// Easy to edit: paste YouTube watch or embed links
// ==========================================
export const films: Film[] = [
  {
    id: 1,
    title: 'The Echoes of Akagera',
    description: "A poignant narrative following a young Rwandan boy who discovers his grandfather's lost ancestral drum in the wildlife reserves of Akagera, symbolizing resilience and cultural rebirth.",
    poster: '/src/assets/images/film_akagera_1785877508167.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    genre: 'Drama / Cultural Narrative',
    duration: '24 min',
    year: 2025,
    awards: 'FESPACO Official Selection 2025 • Durban Int Film Fest Award'
  },
  {
    id: 2,
    title: 'Whispers of Kigali',
    description: "An intimate urban documentary showcasing Kigali's vibrant night economy, young fashion designers, and street musicians shaping the modern identity of Rwanda.",
    poster: '/src/assets/images/film_kigali_1785877521721.jpg',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    genre: 'Documentary / Urban Culture',
    duration: '42 min',
    year: 2024,
    awards: 'Silicon Valley African Film Festival Best Short Doc'
  },
  {
    id: 3,
    title: 'Threads of Heritage',
    description: 'A short poetic film celebrating the intricate art of Rwandan Imigongo, weaving traditional patterns with modern cinematic lighting and music score.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    genre: 'Poetic Short / Art Film',
    duration: '14 min',
    year: 2023,
    awards: 'Kigali Cine Festival Special Jury Prize'
  }
];

// ==========================================
// 🌄 LANDSCAPE PHOTOGRAPHY
// Paste image links and Pixieset gallery URLs
// ==========================================
export const landscapePhotos: Photo[] = [
  {
    id: 1,
    title: 'Mist Over Lake Kivu',
    description: 'Dawn breaking over the serene waters of Lake Kivu, featuring traditional fishermen casting nets.',
    filename: '/src/assets/images/landscape_rwanda_1785877535052.jpg',
    category: 'landscape',
    location: 'Lake Kivu, Karongi, Rwanda',
    pixiesetUrl: 'https://pixieset.com'
  },
  {
    id: 2,
    title: 'The Thousand Hills Canopy',
    description: 'Panoramic sunset landscape capturing the endless layered green crests of Northern Province.',
    filename: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'landscape',
    location: 'Musanze, Rwanda',
    pixiesetUrl: 'https://pixieset.com'
  },
  {
    id: 3,
    title: 'Nyungwe Rainforest Sanctuary',
    description: 'Sunbeams penetrating the ancient rainforest canopy of Nyungwe National Park.',
    filename: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    category: 'landscape',
    location: 'Nyungwe, Rwanda',
    pixiesetUrl: 'https://pixieset.com'
  },
  {
    id: 4,
    title: 'Kigali City Lights at Dusk',
    description: "A clean architectural twilight shot of Kigali's convention center and modern cityscape.",
    filename: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    category: 'landscape',
    location: 'Kigali, Rwanda',
    pixiesetUrl: 'https://pixieset.com'
  }
];

// ==========================================
// 👤 PORTRAIT PHOTOGRAPHY
// Paste portrait links and Pixieset gallery URLs
// ==========================================
export const portraitPhotos: Photo[] = [
  {
    id: 5,
    title: 'Dancer of Umushanana',
    description: 'Fine art portrait highlighting the graceful movement and traditional attire of a Rwandan dancer.',
    filename: '/src/assets/images/portrait_story_1785877547350.jpg',
    category: 'portrait',
    location: 'Kigali Cultural Village, Rwanda',
    pixiesetUrl: 'https://pixieset.com'
  },
  {
    id: 6,
    title: 'The Master Craftsman',
    description: 'An intimate character portrait of a veteran woodcarver in Nyamirambo with natural key lighting.',
    filename: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    category: 'portrait',
    location: 'Nyamirambo, Kigali',
    pixiesetUrl: 'https://pixieset.com'
  },
  {
    id: 7,
    title: 'Youth of Kigali',
    description: 'Editorial fashion portrait showcasing modern African creative youth culture.',
    filename: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    category: 'portrait',
    location: 'Kacyiru, Kigali',
    pixiesetUrl: 'https://pixieset.com'
  }
];

// All photos combined for home showcase
export const allPhotos: Photo[] = [...landscapePhotos, ...portraitPhotos];

// ==========================================
// 🛠️ STUDIO SERVICES
// ==========================================
export const services: Service[] = [
  {
    id: 1,
    name: 'Portrait Session',
    description: 'Editorial, fine-art or personal character portraits captured in Kigali studio or outdoor location.',
    duration: '2 Hours',
    price: '$250'
  },
  {
    id: 2,
    name: 'Wedding Photography & Film',
    description: 'Full-day cinema and photography coverage of traditional and modern African wedding celebrations.',
    duration: 'Full Day',
    price: '$1,200'
  },
  {
    id: 3,
    name: 'Documentary Filming',
    description: 'In-depth storytelling and production for non-profits, cultural archives, or humanitarian features.',
    duration: 'Custom Project',
    price: 'Quote Upon Request'
  },
  {
    id: 4,
    name: 'Commercial & Brand Video',
    description: 'Cinematic promo videos, television commercials, and brand visual stories for African and global brands.',
    duration: 'Half / Full Day',
    price: '$800'
  },
  {
    id: 5,
    name: 'Creative Direction & Consulting',
    description: 'Script development, visual treatment, and creative consulting for film projects across East Africa.',
    duration: '3 Hours',
    price: '$400'
  }
];
