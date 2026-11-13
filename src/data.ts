import { formatVideoEmbedUrl, getVideoThumbnail } from './utils/video';

export type FilmCategory = 
  | 'corporate' 
  | 'brand' 
  | 'commercials' 
  | 'shorts' 
  | 'documentaries' 
  | 'social' 
  | 'events';

export interface FilmCategoryMeta {
  id: FilmCategory;
  title: string;
  shortDesc: string;
}

export const FILM_CATEGORIES: FilmCategoryMeta[] = [
  { 
    id: 'corporate', 
    title: 'Corporate Videos', 
    shortDesc: 'Company profiles, NGO projects, interviews, testimonials, organizational stories, and event coverage.' 
  },
  { 
    id: 'brand', 
    title: 'Brand Films', 
    shortDesc: "Cinematic videos that communicate a brand's identity, values, personality, and story." 
  },
  { 
    id: 'commercials', 
    title: 'Commercials & Ads', 
    shortDesc: 'Product advertisements, promotional videos, and marketing campaigns.' 
  },
  { 
    id: 'shorts', 
    title: 'Short Films', 
    shortDesc: 'Narrative films, fictional stories, and independent filmmaking projects, including THREE NIGHTS.' 
  },
  { 
    id: 'documentaries', 
    title: 'Documentaries', 
    shortDesc: 'Real-life stories, community projects, human experiences, and documentary filmmaking.' 
  },
  { 
    id: 'social', 
    title: 'Social Media Content', 
    shortDesc: 'Instagram Reels, short-form videos, lifestyle content, and content for digital platforms.' 
  },
  { 
    id: 'events', 
    title: 'Event Films', 
    shortDesc: 'Event highlights, conferences, celebrations, and special occasions.' 
  }
];

export type PhotoCategory =
  | 'portrait'
  | 'fashion'
  | 'lifestyle'
  | 'event'
  | 'brand'
  | 'landscape';

export interface PhotoCategoryMeta {
  id: PhotoCategory;
  title: string;
  shortDesc: string;
}

export const PHOTO_CATEGORIES: PhotoCategoryMeta[] = [
  { id: 'portrait', title: 'Portrait Photography', shortDesc: 'Intimate character studies, studio lighting & authentic African expressions.' },
  { id: 'fashion', title: 'Fashion Photography', shortDesc: 'High-fashion editorial, modern textiles, and avant-garde aesthetic direction.' },
  { id: 'lifestyle', title: 'Lifestyle Photography', shortDesc: 'Natural, spontaneous visual moments reflecting authentic contemporary culture.' },
  { id: 'event', title: 'Event Photography', shortDesc: 'High-caliber galas, cultural celebrations, private summits, and milestone events.' },
  { id: 'brand', title: 'Brand Photography', shortDesc: 'Product styling, commercial assets, executive profiles, and campaign visuals.' },
  { id: 'landscape', title: 'Landscape Photography', shortDesc: 'Timeless panoramic vistas of Rwanda, the Great Lakes, and African nature.' }
];

export interface Film {
  id: number;
  title: string;
  description: string;
  synopsis: string;
  poster: string;
  videoUrl: string;
  genre: string;
  category: FilmCategory;
  duration: string;
  year: number;
  awards?: string;
  client?: string;
  featured?: boolean;
}

export interface Photo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: PhotoCategory;
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
  directorNote?: string;
  decisionDate?: string;
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

export interface Suggestion {
  id: string;
  name: string;
  email: string;
  category: 'film_idea' | 'website_feedback' | 'collaboration' | 'general';
  suggestion: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteSettings {
  heroTagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroLaurels: string[];
  directorQuote: string;
  directorBio1: string;
  directorBio2: string;
  studioName: string;
  creatorName: string;
  creatorRole: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  profileImage: string;
  heroBg: string;
  adminPassword: string;
  youtubeUrl: string;
  instagramUrl: string;
  vimeoUrl: string;
  linkedinUrl: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroTagline: 'Kigali, Rwanda • Cinematic Film & Visual Arts',
  heroHeading: 'STORIES THAT MOVE AUDIENCES FORWARD.',
  heroSubheading: 'High-impact corporate videos, cinematic brand films, independent narratives, and fine-art photography crafted with master optics in Rwanda.',
  heroLaurels: [
    'Pan-African Cinema Production',
    'Broadcast & Commercial 4K/6K Delivery',
    'Bespoke Editorial & Creative Direction'
  ],
  directorQuote: 'CINEMA IS OUR MEMORY, OUR RESILIENCE, AND OUR HORIZON.',
  directorBio1: 'Every frame created at Wesley Studio honors the complexity, dignity, and authenticity of our subjects. We produce media engineered to communicate vision with clarity, emotional power, and timeless technical perfection.',
  directorBio2: 'Equipped with Netflix-certified cinema cameras, master prime optics, and full field audio rigs, we partner with enterprises, organizations, independent artists, and brands seeking immortal visual storytelling.',
  studioName: 'WESLEY STUDIO',
  creatorName: 'Wesley',
  creatorRole: 'Filmmaker & Visual Storyteller',
  email: 'wesleymwizerwa09@gmail.com',
  phone: '+250 792 087 787',
  whatsapp: '250792087787',
  address: 'KG 7 Ave, Kacyiru, Kigali, Rwanda',
  workingHours: 'Monday – Saturday: 08:30 AM – 06:00 PM (GMT+2)',
  profileImage: '/src/assets/images/wesley_profile_1785877494136.jpg',
  heroBg: '/src/assets/images/hero_background_1785877478689.jpg',
  adminPassword: 'wesley2026!',
  youtubeUrl: 'https://youtube.com',
  instagramUrl: 'https://instagram.com',
  vimeoUrl: 'https://vimeo.com',
  linkedinUrl: 'https://linkedin.com'
};

export const STUDIO_INFO = {
  get name() { return getStoredSettings().studioName; },
  get creator() { return getStoredSettings().creatorName; },
  get role() { return getStoredSettings().creatorRole; },
  get bio() { return getStoredSettings().directorBio1; },
  get email() { return getStoredSettings().email; },
  get phone() { return getStoredSettings().phone; },
  get whatsapp() { return getStoredSettings().whatsapp; },
  get address() { return getStoredSettings().address; },
  get workingHours() { return getStoredSettings().workingHours; },
  get profileImage() { return getStoredSettings().profileImage; },
  get heroBg() { return getStoredSettings().heroBg; },
  socials: {
    get instagram() { return getStoredSettings().instagramUrl || 'https://instagram.com'; },
    get vimeo() { return getStoredSettings().vimeoUrl || 'https://vimeo.com'; },
    get youtube() { return getStoredSettings().youtubeUrl || 'https://youtube.com'; },
    get linkedin() { return getStoredSettings().linkedinUrl || 'https://linkedin.com'; }
  }
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Corporate & Organizational Storytelling',
    tagline: 'Company profiles, NGO documentaries, interviews & executive testimonials',
    description: 'High-impact film production communicating mission, operational scale, and community impact with television-grade polish.',
    duration: 'Full Production Cycle',
    price: '$750',
    features: [
      'Concept development & treatment script',
      'Dual 4K cinema cameras with pro lighting setup',
      'High-fidelity 32-bit float audio capture',
      'Color grading & executive revisions',
      'Deliverables in 16:9 4K and multi-platform cutdowns'
    ]
  },
  {
    id: 2,
    name: 'Brand Films & Cinematic Commercials',
    tagline: 'Visual identities that elevate brand perception and generate conversions',
    description: 'Cinematic commercials, product launches, and brand narrative campaigns crafted for digital ads and broadcast release.',
    duration: 'Bespoke Production',
    price: '$950',
    features: [
      'Creative strategy & visual moodboard',
      'Master prime lenses & dynamic camera staging',
      'Drone aerial cinematic footage clearance',
      'High-impact motion graphics & sound design',
      'Ad-ready cutdowns (9:16 vertical & 16:9 broadcast)'
    ]
  },
  {
    id: 3,
    name: 'Documentary & Narrative Commission',
    tagline: 'Authentic real-life stories and independent cinema',
    description: 'Long-form and short-form documentary production for cultural institutes, broadcasters, and humanitarian initiatives.',
    duration: 'Production Dependent',
    price: 'Custom Quote',
    features: [
      'Field research & protagonist interviews',
      'Multi-day expedition crew coverage across Rwanda',
      'Dolby 5.1/Stereo cinema audio mixing',
      'Multi-language subtitling & festival mastering',
      'Full archival media delivery'
    ]
  },
  {
    id: 4,
    name: 'Portrait, Fashion & Brand Photography',
    tagline: 'High-end studio sessions, editorial spreads, and campaign imagery',
    description: 'Master lighting sessions in our Kigali studio or bespoke East African locations for personalities, models, and brands.',
    duration: '2 – 4 Hours',
    price: '$300',
    features: [
      'Pre-session creative direction & style guide',
      'Studio strobe lighting & backdrops in Kigali',
      '20 master retouched high-resolution images',
      'Online client proofing portal',
      'Commercial usage release'
    ]
  },
  {
    id: 5,
    name: 'Event Films & Conference Coverage',
    tagline: 'Event highlights, global summits, and milestone galas',
    description: 'Dynamic event cinematography capturing keynotes, audience reactions, VIP interviews, and atmospheric highlight reels.',
    duration: 'Full Day Coverage',
    price: '$600',
    features: [
      'Multi-operator field team with gimbal stabilization',
      'Same-day or 48-hour social teaser delivery',
      'Full keynote session recordings',
      'High-energy 3-minute recap film',
      'High-res event photography add-on'
    ]
  }
];

export const INITIAL_FILMS: Film[] = [
  // 1. Short Films (including THREE NIGHTS)
  {
    id: 1,
    title: 'THREE NIGHTS',
    description: 'An evocative narrative short film exploring guilt, silence, and emotional reckoning over three transformative nocturnal encounters in Kigali.',
    synopsis: 'A signature fictional narrative directed by Wesley, following a reclusive protagonist confronting an unresolved truth across three consecutive nights under the city lights of Kigali.',
    poster: '/src/assets/images/film_kigali_1785877521721.jpg',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Narrative Drama / Psychological',
    category: 'shorts',
    duration: '18 min',
    year: 2025,
    featured: true
  },
  {
    id: 2,
    title: 'The Echoes of Akagera',
    description: 'A poignant narrative following a young Rwandan boy who uncovers his ancestral drum in the wild savannah of Akagera, sparking cultural rebirth.',
    synopsis: 'Set against the golden savannah grasses and sweeping lakes of Akagera, exploring generational healing and sacred Intore rhythms.',
    poster: '/src/assets/images/film_akagera_1785877508167.jpg',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Cultural Narrative',
    category: 'shorts',
    duration: '24 min',
    year: 2025,
    featured: true
  },
  // 2. Corporate Videos
  {
    id: 3,
    title: 'Rwanda Green Horizons: NGO Impact',
    description: 'A compelling organizational documentary for a sustainable agriculture initiative empowering rural farming cooperatives in the Northern Province.',
    synopsis: 'Produced for community development leaders, highlighting agricultural modernization, water collection infrastructure, and farmer testimonies.',
    poster: '/src/assets/images/landscape_rwanda_1785877535052.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Corporate Documentary',
    category: 'corporate',
    duration: '8 min',
    year: 2025,
    featured: true
  },
  {
    id: 4,
    title: 'Bank of Kigali Tech Labs — Annual Showcase',
    description: 'Executive interviews, agile engineering culture, and fintech innovation overview presented at the Africa Tech Summit.',
    synopsis: 'High-energy corporate overview combining dynamic office steadicam shots, client testimonials, and kinetic typography.',
    poster: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Executive Corporate Profile',
    category: 'corporate',
    duration: '5 min',
    year: 2024,
    featured: false
  },
  // 3. Brand Films
  {
    id: 5,
    title: 'House of Tayo: Modern African Tailoring',
    description: 'Cinematic brand film exploring the textures, bold colors, and tailored philosophy of Kigali bespoke menswear.',
    synopsis: 'A visually arresting brand piece weaving sewing machine rhythms, silk textures, and street runway aesthetics into a cohesive narrative.',
    poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Brand Story',
    category: 'brand',
    duration: '3 min',
    year: 2025,
    featured: true
  },
  // 4. Commercials & Ads
  {
    id: 6,
    title: 'Virunga Roast: Speciality Coffee Campaign',
    description: 'Commercial campaign filming high-altitude coffee cultivation, roasting craft, and sensory espresso extraction.',
    synopsis: 'Television and digital marketing ad commissioned for international export markets, highlighting Rwandan volcanic soil coffee.',
    poster: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Product Commercial',
    category: 'commercials',
    duration: '60 sec',
    year: 2025,
    featured: true
  },
  // 5. Documentaries
  {
    id: 7,
    title: 'Whispers of Kigali: The Midnight Canvas',
    description: 'An intimate urban documentary tracking Kigali’s nocturnal heartbeat, creative fashion collectives, and underground soundscapes.',
    synopsis: 'Through hypnotic night cinematography, immersing viewers into creative studios of Nyamirambo and contemporary galleries of Kiyovu.',
    poster: '/src/assets/images/film_kigali_1785877521721.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Feature Documentary',
    category: 'documentaries',
    duration: '36 min',
    year: 2024,
    featured: true
  },
  {
    id: 8,
    title: 'Nyungwe: The Ancient Canopy',
    description: 'An ecological documentary exploring the mist-shrouded montane rainforest that feeds both the Nile and the Congo river basins.',
    synopsis: 'Documenting indigenous forest wardens, ancient ferns, and biodiversity conservation in Southern Rwanda.',
    poster: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Conservation Cinema',
    category: 'documentaries',
    duration: '22 min',
    year: 2024,
    featured: false
  },
  // 6. Social Media Content
  {
    id: 9,
    title: 'Kigali Fashion Week: 9:16 Reel Suite',
    description: 'High-tempo vertical social reels and lifestyle cuts engineered for maximum engagement and brand virality on Instagram.',
    synopsis: 'A suite of 6 vertical video cutdowns with sync sound, fast cuts, and punchy color grading.',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Social Reel Suite',
    category: 'social',
    duration: '45 sec',
    year: 2025,
    featured: false
  },
  // 7. Event Films
  {
    id: 10,
    title: 'Africa CEO Forum Kigali: High-Impact Recap',
    description: 'Cinematic event film capturing bilateral meetings, panel sessions, and evening networking receptions at Kigali Convention Center.',
    synopsis: 'Fast-turnaround cinematic film summarizing 3 days of international summit proceedings with aerial drone sequences and soundbites.',
    poster: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    genre: 'Event Film',
    category: 'events',
    duration: '4 min',
    year: 2025,
    featured: true
  }
];

export const INITIAL_PHOTOS: Photo[] = [
  // 1. Portrait Photography
  {
    id: 1,
    title: 'The Master Woodcarver',
    description: 'Atmospheric character portrait of a veteran craftsman in Nyamirambo, hands weathered with half a century of artistry.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
    category: 'portrait',
    location: 'Nyamirambo, Kigali, Rwanda',
    featured: true
  },
  {
    id: 2,
    title: 'Dancer of Umushanana',
    description: 'Editorial portrait celebrating poise, traditional silks, and crown ornament of Rwandan choreography.',
    imageUrl: '/src/assets/images/portrait_story_1785877547350.jpg',
    category: 'portrait',
    location: 'Kigali Cultural Village, Rwanda',
    featured: true
  },
  // 2. Fashion Photography
  {
    id: 3,
    title: 'Emerald Silks of Kigali',
    description: 'Avant-garde fashion editorial featuring contemporary Rwandan draped silhouettes against geometric concrete architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
    category: 'fashion',
    location: 'Kiyovu, Kigali, Rwanda',
    featured: true
  },
  {
    id: 4,
    title: 'Youth & Contemporary Rhythm',
    description: 'High-contrast studio fashion session exploring modern African youth identity and bold textiles.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80',
    category: 'fashion',
    location: 'Wesley Studio, Kigali',
    featured: true
  },
  // 3. Lifestyle Photography
  {
    id: 5,
    title: 'Morning Along Lake Kivu',
    description: 'Spontaneous candid lifestyle frame of lakeside coffee baristas greeting the morning mist in Karongi.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=80',
    category: 'lifestyle',
    location: 'Karongi, Western Rwanda',
    featured: true
  },
  // 4. Event Photography
  {
    id: 6,
    title: 'Gusaba Heritage Nuptials',
    description: 'Intimate, emotional moment during traditional Rwandan dowry blessings and bridal entourage celebration.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    category: 'event',
    location: 'Gako, Rwanda',
    featured: true
  },
  // 5. Brand Photography
  {
    id: 7,
    title: 'Handmade Rwandan Ceramics',
    description: 'Minimalist product styling and studio lighting for contemporary artisanal clay tableware.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    category: 'brand',
    location: 'Wesley Studio, Kacyiru',
    featured: false
  },
  // 6. Landscape Photography
  {
    id: 8,
    title: 'Mist Over Lake Kivu',
    description: 'Dawn breaking over calm waters of Karongi as traditional wooden pirogue fishermen cast nets.',
    imageUrl: '/src/assets/images/landscape_rwanda_1785877535052.jpg',
    category: 'landscape',
    location: 'Karongi, Western Province, Rwanda',
    featured: true
  },
  {
    id: 9,
    title: 'The Thousand Hills Ridge',
    description: 'Panoramic emerald terrace ridges bathed in golden twilight along the foothills of the Virunga volcanoes.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    category: 'landscape',
    location: 'Musanze, Northern Province, Rwanda',
    featured: true
  },
  {
    id: 10,
    title: 'Kigali Skyline at Twilight',
    description: 'Architectural luminescence of Kigali Convention Center glowing beneath equatorial blue hour skies.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
    category: 'landscape',
    location: 'Kacyiru, Kigali, Rwanda',
    featured: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-101',
    clientName: 'Jean-Pierre Mugisha',
    email: 'mugisha@example.com',
    phone: '+250 788 123 456',
    serviceId: 1,
    serviceName: 'Corporate & Organizational Storytelling',
    date: '2026-10-18',
    time: '10:00 AM',
    location: 'Kigali Headquarters',
    notes: 'Documentary profile on agricultural innovation and youth employment.',
    status: 'confirmed',
    directorNote: 'Confirmed! Cinema crew and audio gear reserved for morning session.',
    decisionDate: '2026-10-02',
    createdAt: '2026-10-01'
  },
  {
    id: 'BK-102',
    clientName: 'Ingabire Clarisse',
    email: 'clarisse.in@gmail.com',
    phone: '+250 789 222 333',
    serviceId: 2,
    serviceName: 'Brand Films & Cinematic Commercials',
    date: '2026-11-07',
    time: '08:00 AM',
    location: 'Kigali Serena',
    notes: 'Brand campaign film launch and social media teaser package.',
    status: 'pending',
    createdAt: '2026-10-03'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'MSG-1',
    name: 'Amina Diallo',
    email: 'amina@panfilm.org',
    subject: 'Co-Production Inquiry: Short Narrative',
    message: 'Greetings Wesley, We loved THREE NIGHTS and would be thrilled to discuss a narrative co-production in Kigali.',
    isRead: false,
    createdAt: '2026-10-04'
  },
  {
    id: 'MSG-2',
    name: 'Eric Karemera',
    email: 'karemera.e@rwandafilm.rw',
    subject: 'Corporate Film Commission',
    message: 'Hello Wesley, looking to commission a 3-part corporate brand film series across Rwanda.',
    isRead: true,
    createdAt: '2026-09-28'
  }
];

export const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 'SUG-1',
    name: 'Patrick Habineza',
    email: 'patrick@kigalimedia.rw',
    category: 'film_idea',
    suggestion: 'It would be amazing to see a documentary exploring traditional cattle heritage in Nyanza!',
    createdAt: '2026-10-05',
    isRead: false
  }
];

// LocalStorage Keys - v4 with new Seven Media & categorical schema
const SETTINGS_KEY = 'wesley_studio_settings_v4';
const SERVICES_KEY = 'wesley_studio_services_v4';
const FILMS_KEY = 'wesley_studio_films_v4';
const PHOTOS_KEY = 'wesley_studio_photos_v4';
const BOOKINGS_KEY = 'wesley_studio_bookings_v4';
const MESSAGES_KEY = 'wesley_studio_messages_v4';
const SUGGESTIONS_KEY = 'wesley_studio_suggestions_v4';

function notifyContentChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wesley_content_changed'));
  }
}

// Site Settings
export function getStoredSettings(): SiteSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(data) } : DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveStoredSettings(settings: SiteSettings): SiteSettings {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
  return settings;
}

// Services & Prices
export function getStoredServices(): Service[] {
  try {
    const data = localStorage.getItem(SERVICES_KEY);
    return data ? JSON.parse(data) : INITIAL_SERVICES;
  } catch {
    return INITIAL_SERVICES;
  }
}

export function saveStoredServices(services: Service[]): Service[] {
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
    notifyContentChanged();
  } catch (e) {
    console.error('Failed to save services:', e);
  }
  return services;
}

// Films
export function getStoredFilms(): Film[] {
  let list: Film[];
  try {
    const data = localStorage.getItem(FILMS_KEY);
    list = data ? JSON.parse(data) : INITIAL_FILMS;
  } catch {
    list = INITIAL_FILMS;
  }

  // Guarantee clean embed URLs and fallback posters for all films
  return list.map(f => {
    const safeVideoUrl = formatVideoEmbedUrl(f.videoUrl) || f.videoUrl;
    const autoPoster = (!f.poster || f.poster.trim() === '')
      ? (getVideoThumbnail(f.videoUrl) || '/src/assets/images/film_kigali_1785877521721.jpg')
      : f.poster;
    return {
      ...f,
      videoUrl: safeVideoUrl,
      poster: autoPoster
    };
  });
}

export function saveFilm(film: Film): Film[] {
  const current = getStoredFilms();
  const safeVideoUrl = formatVideoEmbedUrl(film.videoUrl) || film.videoUrl;
  const autoPoster = (!film.poster || film.poster.trim() === '')
    ? (getVideoThumbnail(safeVideoUrl) || film.poster || '/src/assets/images/film_kigali_1785877521721.jpg')
    : film.poster;

  const normalizedFilm: Film = {
    ...film,
    videoUrl: safeVideoUrl,
    poster: autoPoster
  };

  const existingIdx = current.findIndex(f => f.id === normalizedFilm.id);
  let updated: Film[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = normalizedFilm;
  } else {
    updated = [normalizedFilm, ...current];
  }
  try {
    localStorage.setItem(FILMS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save film:', e);
  }
  notifyContentChanged();
  return updated;
}

export function deleteFilm(filmId: number): Film[] {
  const current = getStoredFilms();
  const updated = current.filter(f => f.id !== filmId);
  try {
    localStorage.setItem(FILMS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete film:', e);
  }
  notifyContentChanged();
  return updated;
}

// Photos
export function getStoredPhotos(): Photo[] {
  try {
    const data = localStorage.getItem(PHOTOS_KEY);
    return data ? JSON.parse(data) : INITIAL_PHOTOS;
  } catch {
    return INITIAL_PHOTOS;
  }
}

export function savePhoto(photo: Photo): Photo[] {
  const current = getStoredPhotos();
  const existingIdx = current.findIndex(p => p.id === photo.id);
  let updated: Photo[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = photo;
  } else {
    updated = [photo, ...current];
  }
  try {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save photo:', e);
  }
  return updated;
}

export function deletePhoto(photoId: number): Photo[] {
  const current = getStoredPhotos();
  const updated = current.filter(p => p.id !== photoId);
  try {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete photo:', e);
  }
  return updated;
}

// Bookings
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

export function updateBookingWithDecision(
  id: string, 
  status: 'confirmed' | 'pending' | 'cancelled',
  directorNote: string
): Booking[] {
  const list = getStoredBookings();
  const updated = list.map(b => b.id === id ? { 
    ...b, 
    status, 
    directorNote, 
    decisionDate: new Date().toISOString().split('T')[0] 
  } : b);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage update error:', e);
  }
  return updated;
}

// Messages
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

// Suggestions Box
export function getStoredSuggestions(): Suggestion[] {
  try {
    const data = localStorage.getItem(SUGGESTIONS_KEY);
    return data ? JSON.parse(data) : INITIAL_SUGGESTIONS;
  } catch {
    return INITIAL_SUGGESTIONS;
  }
}

export function saveSuggestion(sug: Suggestion): Suggestion[] {
  const list = getStoredSuggestions();
  const updated = [sug, ...list];
  try {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage save suggestion error:', e);
  }
  return updated;
}

export function markSuggestionRead(id: string): Suggestion[] {
  const list = getStoredSuggestions();
  const updated = list.map(s => s.id === id ? { ...s, isRead: true } : s);
  try {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage update suggestion error:', e);
  }
  return updated;
}
