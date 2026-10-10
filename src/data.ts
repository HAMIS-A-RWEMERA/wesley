export interface Film {
  id: number;
  title: string;
  description: string;
  synopsis: string;
  poster: string;
  videoUrl: string;
  genre: string;
  category: 'documentary' | 'narrative' | 'commercial' | 'art';
  duration: string;
  year: number;
  awards: string;
  featured?: boolean;
}

export interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: 'landscape' | 'portrait';
  subCategory?: string;
  location: string;
  featured?: boolean;
}

export interface Service {
  id: number;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
}

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceId: number;
  serviceName: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const STUDIO_INFO = {
  name: 'WESLEY STUDIO',
  creator: 'Wesley',
  role: 'African Filmmaker & Visual Storyteller',
  bio: 'Wesley is a renowned Rwandan director, cinematographer, and fine-art photographer based in Kigali, Rwanda. Dedicated to authentic African narratives, his documentary and narrative films have screened at major festivals including FESPACO, Durban International Film Festival, and Silicon Valley African Film Festival.',
  email: 'rwemera30@gmail.com',
  phone: '+250 788 000 123',
  whatsapp: '+250788000123',
  address: 'KG 7 Ave, Kacyiru, Kigali, Rwanda',
  workingHours: 'Monday – Saturday: 08:30 AM – 06:00 PM (GMT+2)',
  profileImage: '/src/assets/images/wesley_profile_1785877494136.jpg',
  heroBg: '/src/assets/images/hero_background_1785877478689.jpg',
  socials: {
    instagram: 'https://instagram.com',
    vimeo: 'https://vimeo.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  }
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Fine-Art & Editorial Portraiture',
    tagline: 'Capturing depth, dignity, and authentic African character',
    description: 'High-end studio or environmental portrait session conducted in Kigali or bespoke East African locations with master lighting and editorial styling.',
    duration: '2 – 3 Hours',
    price: '$250',
    features: [
      'Pre-shoot creative direction & moodboard',
      'Studio or on-location Kigali setup',
      '15 master retouched high-res deliverables',
      'Private cloud archival gallery',
      'Print release & digital licensing'
    ]
  },
  {
    id: 2,
    name: 'Documentary Feature & Short Production',
    tagline: 'Compelling humanitarian, cultural & ecological stories',
    description: 'Full-pipeline documentary cinema for cultural institutes, global non-profits, wildlife archives, and independent festival commissions.',
    duration: 'Bespoke Production',
    price: 'Custom Quote',
    features: [
      'Archival research & local scriptwriting',
      'Cinema 4K/6K multi-cam field crew',
      'Drone & aerial cinema clearance',
      'Multi-language translation & subtitles',
      'Color grading & Dolby cinema audio mix'
    ]
  },
  {
    id: 3,
    name: 'Commercial & Brand Cinema',
    tagline: 'Transformative visual identities for modern Africa',
    description: 'Cinematic commercials, architectural showcases, and brand narrative films tailored for broadcast, digital campaigns, and executive pitch decks.',
    duration: 'Full Production Cycle',
    price: '$800+',
    features: [
      'Storyboarding & visual treatments',
      'Dedicated director & sound engineer',
      'High-dynamic range lighting & staging',
      'Fast-turnaround social cutdowns (9:16 & 16:9)',
      'Global distribution licensing'
    ]
  },
  {
    id: 4,
    name: 'African Wedding Narratives',
    tagline: 'Timeless cinematic celebration of love and legacy',
    description: 'Bespoke wedding films blending traditional Gusaba and modern celebrations with poetic documentary storytelling.',
    duration: 'Full Day Coverage',
    price: '$1,200',
    features: [
      '2 Cinematographers + 1 Master Photographer',
      'Full-day coverage (Traditional + Reception)',
      'Cinematic 7-10 minute highlight film',
      'Full ceremony & speech edits',
      'Handcrafted luxury presentation box'
    ]
  },
  {
    id: 5,
    name: 'Creative Direction & Script Consultation',
    tagline: 'Refining African screenplays and visual aesthetics',
    description: 'Consultation for emerging and international filmmakers shooting in Rwanda or the Great Lakes region.',
    duration: 'Per Session / Project',
    price: '$400',
    features: [
      'Script breakdown & cultural advisory',
      'Location scouting recommendations in Rwanda',
      'Production crew & talent sourcing advice',
      'Festival distribution roadmap'
    ]
  }
];

export const INITIAL_FILMS: Film[] = [
  {
    id: 1,
    title: 'The Echoes of Akagera',
    description: 'A poignant narrative following a young Rwandan boy who uncovers his ancestral drum in the wild savannah of Akagera, sparking cultural rebirth.',
    synopsis: 'Set against the golden savannah grasses and sweeping lakes of Akagera National Park, this narrative explores generational healing and the sacred rhythm of the Intore drums.',
    poster: '/src/assets/images/film_akagera_1785877508167.jpg',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Drama / Cultural Narrative',
    category: 'narrative',
    duration: '24 min',
    year: 2025,
    awards: 'FESPACO Official Selection 2025 • Durban International Film Festival Winner',
    featured: true
  },
  {
    id: 2,
    title: 'Whispers of Kigali',
    description: 'An intimate urban documentary tracking Kigali\'s nocturnal heartbeat, creative fashion collectives, and the sounds shaping a forward-looking Rwanda.',
    synopsis: 'Through hypnotic night cinematography, Whispers of Kigali immerses viewers into the bustling creative studios of Nyamirambo and contemporary galleries of Kiyovu.',
    poster: '/src/assets/images/film_kigali_1785877521721.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Documentary / Urban Culture',
    category: 'documentary',
    duration: '42 min',
    year: 2024,
    awards: 'Silicon Valley African Film Fest • Best Short Documentary 2024',
    featured: true
  },
  {
    id: 3,
    title: 'Threads of Heritage',
    description: 'A short poetic film celebrating the sacred geometry of Imigongo and traditional Rwandan weavers, paired with an original orchestral score.',
    synopsis: 'A mesmerizing visual symphony meditating on natural volcanic pigments, cow dung relief textures, and centuries-old mathematical artistry preserved across generations.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Poetic Short / Art Film',
    category: 'art',
    duration: '14 min',
    year: 2023,
    awards: 'Kigali Cine Festival Special Jury Prize 2023',
    featured: true
  },
  {
    id: 4,
    title: 'Nyungwe: The Ancient Canopy',
    description: 'An ecological documentary exploring the mist-shrouded montane rainforest that feeds both the Nile and the Congo river basins.',
    synopsis: 'Deep inside one of Africa\'s oldest surviving high-altitude rainforests, Wesley documents endangered chimpanzees, ancient ferns, and indigenous forest wardens protecting biodiversity.',
    poster: '/src/assets/images/landscape_rwanda_1785877535052.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Conservation / Ecological Cinema',
    category: 'documentary',
    duration: '31 min',
    year: 2024,
    awards: 'East African Environmental Film Gala Nominee',
    featured: false
  }
];

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: 1,
    title: 'Mist Over Lake Kivu',
    description: 'Dawn breaking over the calm waters of Karongi as traditional wooden pirogue fishermen cast nets in morning fog.',
    imageUrl: '/src/assets/images/landscape_rwanda_1785877535052.jpg',
    category: 'landscape',
    subCategory: 'Lakes',
    location: 'Karongi, Western Province, Rwanda',
    featured: true
  },
  {
    id: 2,
    title: 'The Thousand Hills Canopy',
    description: 'Panoramic emerald terrace ridges bathed in golden twilight along the foothills of the Virunga volcanoes.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    category: 'landscape',
    subCategory: 'Highlands',
    location: 'Musanze, Northern Province, Rwanda',
    featured: true
  },
  {
    id: 3,
    title: 'Nyungwe Rainforest Sanctuary',
    description: 'Sun rays penetrating the dense primordial canopy above the hanging rope bridge in Southern Rwanda.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    category: 'landscape',
    subCategory: 'Forests',
    location: 'Nyungwe National Park, Rwanda',
    featured: false
  },
  {
    id: 4,
    title: 'Kigali Skyline at Twilight',
    description: 'Architectural luminescence of Kigali Convention Center glowing beneath equatorial blue hour skies.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
    category: 'landscape',
    subCategory: 'Urban',
    location: 'Kacyiru, Kigali, Rwanda',
    featured: true
  },
  {
    id: 5,
    title: 'Dancer of Umushanana',
    description: 'Fine-art editorial portrait celebrating the poise, golden silks, and crown ornament of traditional Rwandan choreography.',
    imageUrl: '/src/assets/images/portrait_story_1785877547350.jpg',
    category: 'portrait',
    subCategory: 'Cultural',
    location: 'Kigali Cultural Village, Rwanda',
    featured: true
  },
  {
    id: 6,
    title: 'The Master Woodcarver',
    description: 'Atmospheric character portrait of a veteran craftsman in Nyamirambo, hands weathered with half a century of artistry.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
    category: 'portrait',
    subCategory: 'Editorial',
    location: 'Nyamirambo, Kigali, Rwanda',
    featured: true
  },
  {
    id: 7,
    title: 'Youth & Contemporary Rhythm',
    description: 'High-contrast studio session exploring modern African youth identity, avant-garde textiles, and confident gaze.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80',
    category: 'portrait',
    subCategory: 'Studio',
    location: 'Wesley Studio, Kacyiru, Kigali',
    featured: true
  },
  {
    id: 8,
    title: 'Tea Harvester of Gisovu',
    description: 'Sunlit morning portrait of a tea artisan on the high slopes overlooking Lake Kivu.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=80',
    category: 'portrait',
    subCategory: 'Editorial',
    location: 'Gisovu, Western Province, Rwanda',
    featured: false
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-101',
    clientName: 'Jean-Pierre Mugisha',
    email: 'mugisha@example.com',
    phone: '+250 788 123 456',
    serviceId: 1,
    serviceName: 'Fine-Art & Editorial Portraiture',
    date: '2026-10-18',
    time: '10:00 AM',
    location: 'Kigali Studio',
    notes: 'Editorial portraits for upcoming theatre premiere playbill and press kit.',
    status: 'confirmed',
    createdAt: '2026-10-01'
  },
  {
    id: 'BK-102',
    clientName: 'Ingabire Clarisse',
    email: 'clarisse.in@gmail.com',
    phone: '+250 789 222 333',
    serviceId: 4,
    serviceName: 'African Wedding Narratives',
    date: '2026-11-07',
    time: '08:00 AM',
    location: 'Kigali Serena & Gako Farm',
    notes: 'Traditional Gusaba ceremony and evening garden banquet.',
    status: 'pending',
    createdAt: '2026-10-03'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'MSG-1',
    name: 'Amina Diallo',
    email: 'amina@dakarfilmfest.org',
    subject: 'Festival Invitation: The Echoes of Akagera',
    message: 'Greetings Wesley, We would be thrilled to program your film in our Pan-African Panorama section in Dakar this November.',
    isRead: false,
    createdAt: '2026-10-04'
  },
  {
    id: 'MSG-2',
    name: 'Eric Karemera',
    email: 'karemera.e@rwandafilm.rw',
    subject: 'Documentary Co-production Inquiry',
    message: 'Hello, looking to discuss a potential 3-part wildlife documentary commission across Nyungwe and Volcanoes parks.',
    isRead: true,
    createdAt: '2026-09-28'
  }
];

// LocalStorage Persistence Helpers
const BOOKINGS_KEY = 'wesley_studio_bookings_v2';
const MESSAGES_KEY = 'wesley_studio_messages_v2';
const FILMS_KEY = 'wesley_studio_films_v2';
const PHOTOS_KEY = 'wesley_studio_photos_v2';

export function getStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export function saveBooking(booking: Booking): Booking[] {
  const list = getStoredBookings();
  const updated = [booking, ...list];
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage save error:', e);
  }
  return updated;
}

export function updateBookingStatus(id: string, status: 'confirmed' | 'pending' | 'cancelled'): Booking[] {
  const list = getStoredBookings();
  const updated = list.map(b => b.id === id ? { ...b, status } : b);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage update error:', e);
  }
  return updated;
}

export function getStoredMessages(): Message[] {
  try {
    const data = localStorage.getItem(MESSAGES_KEY);
    return data ? JSON.parse(data) : INITIAL_MESSAGES;
  } catch {
    return INITIAL_MESSAGES;
  }
}

export function saveMessage(msg: Message): Message[] {
  const list = getStoredMessages();
  const updated = [msg, ...list];
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage save message error:', e);
  }
  return updated;
}

export function markMessageRead(id: string): Message[] {
  const list = getStoredMessages();
  const updated = list.map(m => m.id === id ? { ...m, isRead: true } : m);
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage update message error:', e);
  }
  return updated;
}
