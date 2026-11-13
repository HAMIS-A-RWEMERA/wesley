import React, { useState, useEffect } from 'react';
import { 
  Booking, Message, Suggestion, Service, Film, Photo, SiteSettings,
  getStoredBookings, getStoredMessages, getStoredSuggestions, 
  getStoredServices, getStoredFilms, getStoredPhotos, getStoredSettings,
  updateBookingWithDecision, markMessageRead, markSuggestionRead,
  saveStoredServices, saveStoredSettings, saveFilm, deleteFilm, savePhoto, deletePhoto
} from '../data';
import { parseVideoUrl, getVideoWatchUrl } from '../utils/video';
import { 
  X, Lock, ShieldCheck, Calendar, Mail, Lightbulb, 
  DollarSign, FileText, Image as ImageIcon, CheckCircle2, 
  XCircle, Clock, Eye, LogOut, Check, Phone, MapPin, 
  Send, Plus, Trash2, Edit3, Upload, Film as FilmIcon, MessageSquare,
  Youtube, Play, ExternalLink, Sparkles
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated?: () => void;
  onDataChanged?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ 
  isOpen, 
  onClose, 
  onContentUpdated,
  onDataChanged 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('wesleymwizerwa09@gmail.com');
  const [passwordInput, setPasswordInput] = useState('wesley2026!');
  const [loginError, setLoginError] = useState('');

  // Password Update State
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  
  // Tabs: bookings | messages | suggestions | services | content | media
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'suggestions' | 'services' | 'content' | 'media'>('bookings');
  
  // Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());

  // Decision Modal State
  const [decisionBooking, setDecisionBooking] = useState<Booking | null>(null);
  const [decisionStatus, setDecisionStatus] = useState<'confirmed' | 'cancelled'>('confirmed');
  const [directorNote, setDirectorNote] = useState('');

  // Film Form & Editing State
  const [showAddFilm, setShowAddFilm] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<number | null>(null);
  const [previewTestUrl, setPreviewTestUrl] = useState<string | null>(null);
  const [newFilm, setNewFilm] = useState<Partial<Film>>({
    title: '',
    genre: 'Corporate Video / Profile',
    category: 'corporate',
    duration: '15 min',
    year: new Date().getFullYear(),
    description: '',
    synopsis: '',
    poster: '',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    awards: '',
    featured: true
  });

  // New Photo Form State
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState<Partial<Photo>>({
    title: '',
    category: 'landscape',
    location: 'Kigali, Rwanda',
    description: '',
    imageUrl: '',
    featured: true
  });

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const refreshAllData = () => {
    setBookings(getStoredBookings());
    setMessages(getStoredMessages());
    setSuggestions(getStoredSuggestions());
    setServices(getStoredServices());
    setFilms(getStoredFilms());
    setPhotos(getStoredPhotos());
    const currentSettings = getStoredSettings();
    setSettings(currentSettings);
    setEmailInput(currentSettings.email);
    setPasswordInput(currentSettings.adminPassword || 'wesley2026!');
  };

  useEffect(() => {
    if (isOpen) {
      refreshAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerSaveAlert = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 5000);
    if (onContentUpdated) onContentUpdated();
    if (onDataChanged) onDataChanged();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSettings = getStoredSettings();
    const activePassword = currentSettings.adminPassword || 'wesley2026!';
    if (emailInput.trim().toLowerCase() === currentSettings.email.toLowerCase() && passwordInput === activePassword) {
      setIsAuthenticated(true);
      setLoginError('');
      refreshAllData();
    } else {
      setLoginError(`Invalid credentials. Check your email and password.`);
    }
  };

  const handleUpdatePassword = () => {
    if (!newPasswordInput || newPasswordInput.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    const updated = { ...settings, adminPassword: newPasswordInput };
    setSettings(updated);
    saveStoredSettings(updated);
    setPasswordInput(newPasswordInput);
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    triggerSaveAlert(`Security password changed successfully! Your new password is now active for future logins.`);
  };

  // Open Decision Modal with pre-filled message
  const handleOpenDecision = (booking: Booking, status: 'confirmed' | 'cancelled') => {
    setDecisionBooking(booking);
    setDecisionStatus(status);
    if (status === 'confirmed') {
      setDirectorNote(`Dear ${booking.clientName},\n\nWe are pleased to confirm your reservation for ${booking.serviceName} on ${booking.date} at ${booking.time} (${booking.location}).\n\nPlease arrive 15 minutes before call time. Our cinema and lighting equipment will be pre-staged.\n\nWarm regards,\nDirector Wesley\n${settings.phone} | ${settings.email}`);
    } else {
      setDirectorNote(`Dear ${booking.clientName},\n\nThank you for your booking request for ${booking.serviceName} on ${booking.date}.\n\nUnfortunately, Director Wesley and our production crew are fully booked on that date for a documentary shoot. We would be delighted to reschedule you for another date that suits your calendar.\n\nWarm regards,\nDirector Wesley\n${settings.phone} | ${settings.email}`);
    }
  };

  // Submit Decision & Launch Email Client
  const handleSubmitDecision = () => {
    if (!decisionBooking) return;
    const updated = updateBookingWithDecision(decisionBooking.id, decisionStatus, directorNote);
    setBookings(updated);

    const subject = encodeURIComponent(`Wesley Studio Booking ${decisionStatus === 'confirmed' ? 'Confirmation' : 'Update'} [${decisionBooking.id}] - ${decisionBooking.serviceName}`);
    const body = encodeURIComponent(directorNote);
    
    // Launch client email
    window.open(`mailto:${decisionBooking.email}?subject=${subject}&body=${body}`, '_blank');

    triggerSaveAlert(`Booking ${decisionBooking.id} updated to ${decisionStatus} and notification launched!`);
    setDecisionBooking(null);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    triggerSaveAlert('Bio, about, and studio contact details updated successfully!');
  };

  // Save Services / Pricing
  const handleUpdateServicePrice = (id: number, price: string, duration: string) => {
    const updated = services.map(s => s.id === id ? { ...s, price, duration } : s);
    setServices(updated);
    saveStoredServices(updated);
    triggerSaveAlert('Pricing and durations saved!');
  };

  // Image Upload helper (converts to base64 for instant display)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'film' | 'photo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'film') {
          setNewFilm(prev => ({ ...prev, poster: base64 }));
        } else {
          setNewPhoto(prev => ({ ...prev, imageUrl: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Film Form Helpers
  const handleStartEditFilm = (film: Film) => {
    setEditingFilmId(film.id);
    setNewFilm({
      title: film.title,
      genre: film.genre,
      category: film.category,
      duration: film.duration,
      year: film.year,
      description: film.description,
      synopsis: film.synopsis,
      poster: film.poster,
      videoUrl: film.videoUrl,
      awards: film.awards || '',
      featured: Boolean(film.featured)
    });
    setShowAddFilm(true);
  };

  const handleCancelFilmForm = () => {
    setShowAddFilm(false);
    setEditingFilmId(null);
    setNewFilm({
      title: '',
      genre: 'Corporate Video / Profile',
      category: 'corporate',
      duration: '15 min',
      year: new Date().getFullYear(),
      description: '',
      synopsis: '',
      poster: '',
      videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      awards: '',
      featured: true
    });
  };

  // Save Film (Add or Update)
  const handleSaveNewFilm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilm.title || !newFilm.title.trim()) {
      alert('Please provide a Title for the film.');
      return;
    }

    const videoInput = newFilm.videoUrl || '';
    const parsedVideo = parseVideoUrl(videoInput);

    // If poster is empty, automatically use YouTube thumbnail!
    const effectivePoster = (newFilm.poster && newFilm.poster.trim() !== '')
      ? newFilm.poster.trim()
      : (parsedVideo.thumbnailUrl || '/src/assets/images/film_kigali_1785877521721.jpg');

    const effectiveVideoUrl = parsedVideo.embedUrl || videoInput || 'https://www.youtube.com/embed/ScMzIvxBSi4';

    const filmToSave: Film = {
      id: editingFilmId || Date.now(),
      title: newFilm.title.trim(),
      genre: newFilm.genre || 'Cinematic Film',
      category: (newFilm.category as any) || 'corporate',
      duration: newFilm.duration || '15 min',
      year: Number(newFilm.year) || new Date().getFullYear(),
      description: newFilm.description || '',
      synopsis: newFilm.synopsis || newFilm.description || '',
      poster: effectivePoster,
      videoUrl: effectiveVideoUrl,
      awards: newFilm.awards || '',
      featured: Boolean(newFilm.featured)
    };

    const updated = saveFilm(filmToSave);
    setFilms(updated);
    const wasEditing = Boolean(editingFilmId);
    handleCancelFilmForm();
    triggerSaveAlert(wasEditing ? `Film "${filmToSave.title}" updated successfully!` : `Film "${filmToSave.title}" added to showcase!`);
  };

  // Save New Photo
  const handleSaveNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.imageUrl) {
      alert('Please provide a Title and Photo image.');
      return;
    }
    const createdPhoto: Photo = {
      id: Date.now(),
      title: newPhoto.title || 'Untitled Photo',
      category: (newPhoto.category as any) || 'portrait',
      location: newPhoto.location || 'Kigali, Rwanda',
      description: newPhoto.description || '',
      imageUrl: newPhoto.imageUrl || '',
      featured: Boolean(newPhoto.featured)
    };
    const updated = savePhoto(createdPhoto);
    setPhotos(updated);
    setShowAddPhoto(false);
    triggerSaveAlert(`Photo "${createdPhoto.title}" added to gallery!`);
  };

  const unreadMessagesCount = messages.filter(m => !m.isRead).length;
  const unreadSuggestionsCount = suggestions.filter(s => !s.isRead).length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#111116] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22222c] bg-[#0c0c10]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                WESLEY STUDIO CMS & CONTENT MANAGER
              </h3>
              <p className="text-xs text-[#8e8e9c]">
                {isAuthenticated ? `Signed in as ${settings.email}` : 'Director Portal Authentication'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c24] hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="px-6 py-2.5 bg-emerald-950/80 border-b border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Authentication View */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-white mb-2 text-center">
              Studio Portal Access
            </h2>
            <p className="text-xs text-[#8e8e9c] text-center mb-6">
              Edit bio, prices, upload films/photos, manage bookings, review client suggestions & send direct acceptance/denial emails.
            </p>

            {loginError && (
              <div className="w-full mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                  Director Email
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer mt-2"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-[#1c1c24] text-center text-xs text-[#6e6e7c]">
              <span>Active Portal Credentials: </span>
              <code className="text-[#d4af37] font-mono">{settings.email} / {settings.adminPassword || 'wesley2026!'}</code>
            </div>
          </div>
        ) : (
          /* Main Authenticated CMS */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Nav Tabs Bar */}
            <div className="px-6 py-3 bg-[#14141b] border-b border-[#22222c] flex flex-wrap items-center justify-between gap-3 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'bookings' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bookings ({bookings.length})</span>
                  {pendingBookingsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-extrabold text-[10px]">
                      {pendingBookingsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'messages' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquiries ({messages.length})</span>
                  {unreadMessagesCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white font-extrabold text-[10px]">
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'suggestions' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Suggestions ({suggestions.length})</span>
                  {unreadSuggestionsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-bold text-[10px]">
                      {unreadSuggestionsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'services' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Prices & Services</span>
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'content' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bio & Content</span>
                </button>

                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'media' ? 'bg-[#d4af37] text-black' : 'bg-[#1c1c24] text-[#b0b0be] hover:text-white'
                  }`}
                >
                  <FilmIcon className="w-3.5 h-3.5" />
                  <span>Films & Photos</span>
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-lg border border-[#2a2a35] text-xs text-[#9090a0] hover:text-red-400 hover:border-red-500/40 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Dashboard Tab Panels */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#0f0f14]">
              
              {/* TAB 1: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinzel text-lg font-bold text-white">
                        Client Shoot Reservations
                      </h4>
                      <p className="text-xs text-[#8e8e9c]">
                        Accept or deny bookings. When deciding, an email notification with your customized Director Note will be sent directly to the client.
                      </p>
                    </div>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="p-12 text-center text-[#707080] border border-dashed border-[#22222a] rounded-xl">
                      No bookings recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-5 rounded-xl bg-[#14141b] border border-[#22222c] hover:border-[#d4af37]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white text-base">
                                {booking.clientName}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                                booking.status === 'confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : booking.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
                              }`}>
                                {booking.status}
                              </span>
                              <span className="text-[11px] text-[#707080]">
                                ID: {booking.id}
                              </span>
                            </div>

                            <div className="text-xs text-[#d4af37] font-semibold">
                              {booking.serviceName}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8e8e9c]">
                              <span className="flex items-center gap-1 text-[#f0f0f4]">
                                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                                {booking.date} at {booking.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5" />
                                {booking.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5" />
                                {booking.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {booking.location}
                              </span>
                            </div>

                            {booking.notes && (
                              <p className="text-xs text-[#a0a0b0] bg-[#0c0c10] p-2.5 rounded border border-[#1e1e26] mt-2">
                                <span className="text-[#d4af37] font-semibold">Client Request: </span>
                                {booking.notes}
                              </p>
                            )}

                            {booking.directorNote && (
                              <div className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded border border-emerald-800/40 mt-1">
                                <span className="font-bold text-[#d4af37]">Director's Note to Client: </span>
                                {booking.directorNote}
                              </div>
                            )}
                          </div>

                          {/* Decision Action Buttons */}
                          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 self-end md:self-center">
                            <button
                              onClick={() => handleOpenDecision(booking, 'confirmed')}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-500/40 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept & Notify Email</span>
                            </button>

                            <button
                              onClick={() => handleOpenDecision(booking, 'cancelled')}
                              className="px-3.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 border border-red-500/40 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Deny & Send Note</span>
                            </button>

                            <a
                              href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(booking.clientName)}%2C%20this%20is%20Director%20Wesley%20regarding%20your%20studio%20booking%20for%20${encodeURIComponent(booking.serviceName)}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#182a1d] text-[#25D366] hover:bg-[#203a27] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#25D366]/40 text-center"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp Client</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: INQUIRIES & MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-lg font-bold text-white">
                      Direct Contact Inquiries
                    </h4>
                    <span className="text-xs text-[#8e8e9c]">
                      {unreadMessagesCount} unread
                    </span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-12 text-center text-[#707080] border border-dashed border-[#22222a] rounded-xl">
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-xl border transition-all ${
                            !msg.isRead ? 'bg-[#181822] border-[#d4af37]/40' : 'bg-[#131319] border-[#22222c]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-white text-sm">
                              {msg.name} ({msg.email})
                            </span>
                            <span className="text-xs text-[#707080]">
                              {msg.createdAt}
                            </span>
                          </div>
                          <div className="text-xs text-[#d4af37] font-semibold mb-2">
                            Subject: {msg.subject}
                          </div>
                          <p className="text-xs text-[#c0c0d0] leading-relaxed bg-[#0e0e12] p-3 rounded border border-[#1e1e26] mb-3">
                            {msg.message}
                          </p>
                          <div className="flex items-center justify-end gap-3">
                            {!msg.isRead && (
                              <button
                                onClick={() => {
                                  const updated = markMessageRead(msg.id);
                                  setMessages(updated);
                                }}
                                className="text-xs text-[#a0a0b0] hover:text-white cursor-pointer"
                              >
                                Mark as Read
                              </button>
                            )}
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply to {msg.email}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SUGGESTION BOX */}
              {activeTab === 'suggestions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinzel text-lg font-bold text-white">
                        Visitor & Community Suggestion Box
                      </h4>
                      <p className="text-xs text-[#8e8e9c]">
                        Creative ideas, documentary topics, exhibition proposals, and viewer feedback submitted via the public site.
                      </p>
                    </div>
                    <span className="text-xs text-[#d4af37] font-bold">
                      {suggestions.length} Submissions
                    </span>
                  </div>

                  {suggestions.length === 0 ? (
                    <div className="p-12 text-center text-[#707080] border border-dashed border-[#22222a] rounded-xl">
                      No suggestions submitted yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suggestions.map((sug) => (
                        <div
                          key={sug.id}
                          className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${
                            !sug.isRead ? 'bg-[#181822] border-[#d4af37]/40' : 'bg-[#131319] border-[#202028]'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-sm">
                                {sug.name || 'Anonymous Contributor'}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-bold uppercase">
                                {sug.category.replace('_', ' ')}
                              </span>
                            </div>
                            <span className="text-xs text-[#888898] block">
                              {sug.email} • {sug.createdAt}
                            </span>
                            <p className="text-xs text-[#d0d0dc] leading-relaxed bg-[#0c0c10] p-3 rounded border border-[#1e1e26]">
                              "{sug.suggestion}"
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#1e1e28] flex items-center justify-between">
                            {!sug.isRead ? (
                              <button
                                onClick={() => {
                                  const updated = markSuggestionRead(sug.id);
                                  setSuggestions(updated);
                                }}
                                className="text-xs text-[#d4af37] hover:underline cursor-pointer"
                              >
                                Mark Reviewed
                              </button>
                            ) : (
                              <span className="text-xs text-[#606070]">Reviewed</span>
                            )}

                            {sug.email && (
                              <a
                                href={`mailto:${sug.email}?subject=Thank you for your suggestion to Wesley Studio`}
                                className="text-xs text-[#a0a0b0] hover:text-white flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                <span>Thank Contributor</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PRICES & SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-white">
                      Edit Production Packages & Pricing
                    </h4>
                    <p className="text-xs text-[#8e8e9c]">
                      Update prices and session durations live. Changes reflect immediately on the website and booking forms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-6 rounded-2xl bg-[#131319] border border-[#22222c] space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-cinzel text-base font-bold text-white">
                            {srv.name}
                          </h5>
                          <span className="text-xs text-[#d4af37] font-semibold">
                            ID: {srv.id}
                          </span>
                        </div>

                        <p className="text-xs text-[#8e8e9c]">
                          {srv.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              Displayed Price
                            </label>
                            <input
                              type="text"
                              defaultValue={srv.price}
                              onBlur={(e) => handleUpdateServicePrice(srv.id, e.target.value, srv.duration)}
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs font-bold text-[#d4af37] focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              Session Duration
                            </label>
                            <input
                              type="text"
                              defaultValue={srv.duration}
                              onBlur={(e) => handleUpdateServicePrice(srv.id, srv.price, e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-2 text-[11px] text-[#707080]">
                          Click outside an input box to save the price automatically.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CONTENT & BIO */}
              {activeTab === 'content' && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-white">
                      Edit Website Content & Bio
                    </h4>
                    <p className="text-xs text-[#8e8e9c]">
                      Customize your artistic statement, biography paragraphs, studio headquarters, and contact information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#131319] p-6 rounded-2xl border border-[#22222c]">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Home Hero Heading
                        </label>
                        <input
                          type="text"
                          value={settings.heroHeading}
                          onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Home Hero Subheading
                        </label>
                        <textarea
                          rows={3}
                          value={settings.heroSubheading}
                          onChange={(e) => setSettings({ ...settings, heroSubheading: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Director's Core Artistic Quote
                        </label>
                        <input
                          type="text"
                          value={settings.directorQuote}
                          onChange={(e) => setSettings({ ...settings, directorQuote: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Director Biography (Paragraph 1)
                        </label>
                        <textarea
                          rows={3}
                          value={settings.directorBio1}
                          onChange={(e) => setSettings({ ...settings, directorBio1: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Director Biography (Paragraph 2)
                        </label>
                        <textarea
                          rows={3}
                          value={settings.directorBio2}
                          onChange={(e) => setSettings({ ...settings, directorBio2: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                            Official Email *
                          </label>
                          <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="text"
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Official YouTube & Social Media Links */}
                      <div className="p-4 rounded-xl bg-[#161622] border border-[#2a2a38] space-y-3">
                        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                          <Youtube className="w-3.5 h-3.5 text-red-500" />
                          <span>Official YouTube & Social Media Channels</span>
                        </div>
                        <p className="text-[11px] text-[#8e8e9c]">
                          These channel links appear directly in the website footer, navigation bar, and contact channels.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              YouTube Channel URL
                            </label>
                            <input
                              type="text"
                              value={settings.youtubeUrl || ''}
                              onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                              placeholder="https://youtube.com/@wesleystudio"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              Instagram Profile URL
                            </label>
                            <input
                              type="text"
                              value={settings.instagramUrl || ''}
                              onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                              placeholder="https://instagram.com/wesleystudio"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              Vimeo Profile URL
                            </label>
                            <input
                              type="text"
                              value={settings.vimeoUrl || ''}
                              onChange={(e) => setSettings({ ...settings, vimeoUrl: e.target.value })}
                              placeholder="https://vimeo.com/wesleystudio"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              LinkedIn Company URL
                            </label>
                            <input
                              type="text"
                              value={settings.linkedinUrl || ''}
                              onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                              placeholder="https://linkedin.com/in/wesleystudio"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Clarification Box on Email Changes */}
                      <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-[#d4af37]">
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>IMPORTANT NOTICE ON CHANGING EMAIL:</span>
                        </div>
                        <p className="text-[11px] text-[#e0e0ec]">
                          Changing this email directly updates:
                        </p>
                        <ul className="list-disc list-inside text-[11px] space-y-0.5 text-[#d4af37]">
                          <li><strong>CMS Login Email:</strong> You will use this new email to log into this Director Portal.</li>
                          <li><strong>Booking & Suggestion Inbox:</strong> All new client shoot reservations and ideas will be emailed to this address.</li>
                          <li><strong>Public Website Display:</strong> Automatically updates the contact email across the entire website and footer.</li>
                        </ul>
                      </div>

                      {/* Change Password Card */}
                      <div className="p-4 rounded-xl bg-[#161622] border border-[#2a2a38] space-y-3">
                        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                          <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Change Studio CMS Password</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={newPasswordInput}
                              onChange={(e) => setNewPasswordInput(e.target.value)}
                              placeholder="Minimum 6 characters"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#9e9ea8] mb-1 font-semibold">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={confirmPasswordInput}
                              onChange={(e) => setConfirmPasswordInput(e.target.value)}
                              placeholder="Confirm password"
                              className="w-full px-3 py-2 rounded-lg bg-[#101016] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleUpdatePassword}
                          className="px-4 py-2 rounded-lg bg-[#22222e] hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Save New Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors cursor-pointer"
                  >
                    Save All Content & Bio Changes
                  </button>
                </form>
              )}

              {/* TAB 6: FILMS & PHOTOS (MEDIA UPLOAD) */}
              {activeTab === 'media' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-cinzel text-lg font-bold text-white">
                        Manage Cinema Works & Photography Galleries
                      </h4>
                      <p className="text-xs text-[#8e8e9c]">
                        Upload images or paste media URLs for new films and gallery shots.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowAddFilm(!showAddFilm)}
                        className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Film</span>
                      </button>

                      <button
                        onClick={() => setShowAddPhoto(!showAddPhoto)}
                        className="px-4 py-2 rounded-lg border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Add / Edit Film Form Modal */}
                  {showAddFilm && (() => {
                    const parsedFilmVideo = parseVideoUrl(newFilm.videoUrl);
                    return (
                      <form onSubmit={handleSaveNewFilm} className="p-6 rounded-2xl bg-[#14141c] border border-[#d4af37]/60 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-[#22222e] pb-3">
                          <h5 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                            <FilmIcon className="w-4 h-4 text-[#d4af37]" />
                            <span>{editingFilmId ? 'Edit Film Production' : 'Add New Film Production'}</span>
                            {editingFilmId && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] font-sans font-bold">
                                Editing Film #{editingFilmId}
                              </span>
                            )}
                          </h5>
                          <button
                            type="button"
                            onClick={handleCancelFilmForm}
                            className="text-xs text-[#8e8e9c] hover:text-white cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Film Title *</label>
                            <input
                              type="text"
                              required
                              value={newFilm.title}
                              onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
                              placeholder="e.g. Voices of the Thousand Hills"
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Film & Video Category *</label>
                            <select
                              value={newFilm.category}
                              onChange={(e) => setNewFilm({ ...newFilm, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#00f2fe] focus:outline-none cursor-pointer"
                            >
                              <option value="corporate">Corporate Videos</option>
                              <option value="brand">Brand Films</option>
                              <option value="commercials">Commercials & Ads</option>
                              <option value="shorts">Short Films</option>
                              <option value="documentaries">Documentaries</option>
                              <option value="social">Social Media Content</option>
                              <option value="events">Event Films</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Genre / Tag</label>
                            <input
                              type="text"
                              value={newFilm.genre}
                              onChange={(e) => setNewFilm({ ...newFilm, genre: e.target.value })}
                              placeholder="Corporate / NGO / Narrative"
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#00f2fe] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Runtime Duration</label>
                            <input
                              type="text"
                              value={newFilm.duration}
                              onChange={(e) => setNewFilm({ ...newFilm, duration: e.target.value })}
                              placeholder="28 min"
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Release Year</label>
                            <input
                              type="number"
                              value={newFilm.year}
                              onChange={(e) => setNewFilm({ ...newFilm, year: Number(e.target.value) })}
                              placeholder="2026"
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Awards / Laurels (Optional)</label>
                            <input
                              type="text"
                              value={newFilm.awards || ''}
                              onChange={(e) => setNewFilm({ ...newFilm, awards: e.target.value })}
                              placeholder="Official Selection / Pan-African Award"
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Video URL & Poster Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          
                          {/* Video Link with Auto Detection */}
                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1 flex items-center justify-between">
                              <span>Video Link (YouTube, Vimeo, or Embed) *</span>
                              {parsedFilmVideo.isValid && (
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                  ✓ Valid format
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              required
                              value={newFilm.videoUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNewFilm({ ...newFilm, videoUrl: val });
                              }}
                              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                              className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none font-mono"
                            />

                            {/* Real-Time Detection Pill & Actions */}
                            {parsedFilmVideo.isValid ? (
                              <div className="mt-2 p-2.5 rounded-xl bg-[#191924] border border-[#2e2e40] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                  {parsedFilmVideo.type === 'youtube' && (
                                    <div className="w-6 h-6 rounded bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                                      <Youtube className="w-3.5 h-3.5" />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-bold text-white block text-[11px]">
                                      {parsedFilmVideo.type === 'youtube' ? 'YouTube Video Recognized' : `${parsedFilmVideo.type.toUpperCase()} Link Detected`}
                                    </span>
                                    <span className="text-[10px] text-[#8e8e9c]">
                                      Embed URL: <code className="text-cyan-400 font-mono">{parsedFilmVideo.embedUrl.slice(0, 38)}...</code>
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {parsedFilmVideo.thumbnailUrl && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewFilm(prev => ({ ...prev, poster: parsedFilmVideo.thumbnailUrl }));
                                        triggerSaveAlert('YouTube high-res thumbnail applied as poster!');
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#252536] hover:bg-[#d4af37] text-[#d4af37] hover:text-black text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                                      title="Auto-fetch high-resolution thumbnail from YouTube"
                                    >
                                      <span>⚡ Set as Poster</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => setPreviewTestUrl(parsedFilmVideo.embedUrl)}
                                    className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    <Play className="w-2.5 h-2.5 fill-current" />
                                    <span>Test Play</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-1.5 text-[11px] text-[#8e8e9c] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span>Paste standard YouTube links (<code>https://www.youtube.com/watch?v=...</code> or <code>https://youtu.be/...</code>).</span>
                              </div>
                            )}
                          </div>

                          {/* Poster Image */}
                          <div>
                            <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                              Poster Image (Upload, Paste URL, or use YouTube Thumbnail)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newFilm.poster}
                                onChange={(e) => setNewFilm({ ...newFilm, poster: e.target.value })}
                                placeholder="Paste image link or click 'Set as Poster' from YouTube"
                                className="flex-1 px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                              />
                              <label className="px-3 py-2 rounded-lg bg-[#22222e] text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Browse</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, 'film')}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {newFilm.poster && (
                              <div className="mt-2 flex items-center gap-2 text-[11px] text-[#8e8e9c]">
                                <img src={newFilm.poster} alt="Poster preview" className="w-10 h-6 object-cover rounded border border-[#2a2a36]" />
                                <span className="truncate max-w-xs">{newFilm.poster}</span>
                              </div>
                            )}
                          </div>

                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Short Description / Synopsis</label>
                          <textarea
                            rows={2}
                            value={newFilm.description}
                            onChange={(e) => setNewFilm({ ...newFilm, description: e.target.value })}
                            placeholder="Describe the story narrative, impact, or client scope..."
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#22222e]">
                          <button
                            type="button"
                            onClick={handleCancelFilmForm}
                            className="px-4 py-2 rounded-lg text-xs text-[#8e8e9c] hover:text-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{editingFilmId ? 'Update Film' : 'Save & Publish Film'}</span>
                          </button>
                        </div>
                      </form>
                    );
                  })()}

                  {/* Add Photo Form Modal */}
                  {showAddPhoto && (
                    <form onSubmit={handleSaveNewPhoto} className="p-6 rounded-2xl bg-[#14141c] border border-[#d4af37]/50 space-y-4">
                      <h5 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#d4af37]" />
                        <span>Add New Gallery Photo</span>
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Photo Title *</label>
                          <input
                            type="text"
                            required
                            value={newPhoto.title}
                            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                            placeholder="e.g. Dawn at Karongi"
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Photography Sector</label>
                          <select
                            value={newPhoto.category}
                            onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#a78bfa] focus:outline-none cursor-pointer"
                          >
                            <option value="portrait">Portrait Photography</option>
                            <option value="fashion">Fashion Photography</option>
                            <option value="lifestyle">Lifestyle Photography</option>
                            <option value="event">Event Photography</option>
                            <option value="brand">Brand Photography</option>
                            <option value="landscape">Landscape Photography</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">Shoot Location</label>
                          <input
                            type="text"
                            value={newPhoto.location}
                            onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                            placeholder="Musanze, Rwanda"
                            className="w-full px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-[#9e9ea8] mb-1">
                          Photo Image (Upload File or Paste Image URL) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPhoto.imageUrl}
                            onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                            placeholder="https://... or upload from device"
                            className="flex-1 px-3 py-2 rounded-lg bg-[#181820] border border-[#2a2a36] text-white text-xs focus:border-[#d4af37] focus:outline-none"
                          />
                          <label className="px-3 py-2 rounded-lg bg-[#22222e] text-[#d4af37] hover:bg-[#d4af37] hover:text-black text-xs font-bold cursor-pointer flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'photo')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddPhoto(false)}
                          className="px-4 py-2 rounded-lg text-xs text-[#8e8e9c] hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors cursor-pointer"
                        >
                          Save Photo
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Existing Films with Edit & Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                        Current Films in Showcase ({films.length})
                      </h5>
                      <span className="text-[11px] text-[#8e8e9c]">
                        Click pencil icon to edit video links, or play to test trailer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {films.map((f) => {
                        const parsed = parseVideoUrl(f.videoUrl);
                        const isYT = parsed.type === 'youtube';

                        return (
                          <div
                            key={f.id}
                            className={`p-4 rounded-xl bg-[#131319] border transition-all flex flex-col justify-between gap-3 ${
                              editingFilmId === f.id
                                ? 'border-[#d4af37] ring-1 ring-[#d4af37]/40 bg-[#171722]'
                                : 'border-[#22222c] hover:border-[#d4af37]/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900 group">
                                <img
                                  src={f.poster}
                                  alt={f.title}
                                  className="w-full h-full object-cover"
                                />
                                {f.videoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewTestUrl(parsed.embedUrl || f.videoUrl)}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-cyan-400"
                                    title="Play Trailer Preview"
                                  >
                                    <Play className="w-5 h-5 fill-current" />
                                  </button>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-white text-xs block truncate" title={f.title}>
                                  {f.title}
                                </span>
                                <span className="text-[10px] text-[#8e8e9c] block capitalize">
                                  {f.category} • {f.duration} • {f.year}
                                </span>
                                
                                <div className="flex items-center gap-1.5 mt-1">
                                  {isYT ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-500/30">
                                      <Youtube className="w-2.5 h-2.5 shrink-0" />
                                      <span>YouTube: {parsed.videoId}</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/30 truncate max-w-[140px]">
                                      <FilmIcon className="w-2.5 h-2.5 shrink-0" />
                                      <span className="truncate">Video Link</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="pt-2 border-t border-[#1f1f28] flex items-center justify-between gap-2">
                              {f.videoUrl ? (
                                <button
                                  type="button"
                                  onClick={() => setPreviewTestUrl(parsed.embedUrl || f.videoUrl)}
                                  className="px-2.5 py-1 rounded bg-[#1c1c26] hover:bg-cyan-500 hover:text-black text-cyan-400 text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                  <span>Test Play</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-500">No Video</span>
                              )}

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditFilm(f)}
                                  className="p-1.5 rounded text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
                                  title="Edit Film & Video Link"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Delete film "${f.title}"?`)) {
                                      const updated = deleteFilm(f.id);
                                      setFilms(updated);
                                      triggerSaveAlert(`Film deleted.`);
                                    }
                                  }}
                                  className="p-1.5 rounded text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                                  title="Delete Film"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* List of Existing Photos */}
                  <div className="space-y-3 pt-4 border-t border-[#1e1e28]">
                    <h5 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                      Current Photos ({photos.length})
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {photos.map((p) => (
                        <div key={p.id} className="p-3 rounded-xl bg-[#131319] border border-[#22222c] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 truncate">
                            <img src={p.imageUrl} alt={p.title} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                            <div className="truncate">
                              <span className="font-bold text-white text-[11px] block truncate">{p.title}</span>
                              <span className="text-[10px] text-[#d4af37] capitalize">{p.category}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`Delete photo "${p.title}"?`)) {
                                const updated = deletePhoto(p.id);
                                setPhotos(updated);
                                triggerSaveAlert(`Photo deleted.`);
                              }
                            }}
                            className="p-1.5 rounded text-red-400 hover:bg-red-500/20 cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Decision & Direct Email Modal */}
      {decisionBooking && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="max-w-xl w-full bg-[#13131a] border border-[#d4af37] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#22222e] pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  DIRECTOR DECISION & NOTIFICATION
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Booking Ref: {decisionBooking.id}
                </h3>
              </div>
              <button
                onClick={() => setDecisionBooking(null)}
                className="text-[#888898] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#a0a0b0] bg-[#1a1a24] p-3 rounded-lg border border-[#282836] space-y-1">
              <div><strong>Client:</strong> {decisionBooking.clientName} ({decisionBooking.email})</div>
              <div><strong>Service:</strong> {decisionBooking.serviceName}</div>
              <div><strong>Date & Time:</strong> {decisionBooking.date} at {decisionBooking.time}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase font-bold text-[#9e9ea8]">
                Decision Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenDecision(decisionBooking, 'confirmed')}
                  className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    decisionStatus === 'confirmed'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'border-[#2a2a36] text-[#8e8e9c]'
                  }`}
                >
                  ✓ Accept / Confirm
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDecision(decisionBooking, 'cancelled')}
                  className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    decisionStatus === 'cancelled'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'border-[#2a2a36] text-[#8e8e9c]'
                  }`}
                >
                  ✗ Deny / Cancel
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-bold text-[#9e9ea8]">
                Director's Note (Will be emailed directly to {decisionBooking.email})
              </label>
              <textarea
                rows={6}
                value={directorNote}
                onChange={(e) => setDirectorNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#181822] border border-[#2e2e3e] text-white text-xs leading-relaxed focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDecisionBooking(null)}
                className="px-4 py-2 rounded-lg text-xs text-[#8e8e9c] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitDecision}
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#f3e5ab] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Status & Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Play Video Preview Modal */}
      {previewTestUrl && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#0e0e14] border border-[#d4af37]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#22222e] bg-[#07070a]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Trailer Player Verification</span>
              </span>
              <button
                type="button"
                onClick={() => setPreviewTestUrl(null)}
                className="text-[#94a3b8] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full aspect-video bg-black">
              <iframe
                src={previewTestUrl}
                title="Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="p-3 bg-[#07070a] border-t border-[#22222e] flex items-center justify-between text-xs text-[#8e8e9c]">
              <span>Verified player output using converted embed URL.</span>
              <button
                type="button"
                onClick={() => setPreviewTestUrl(null)}
                className="px-4 py-1.5 rounded-full bg-[#d4af37] text-black font-bold text-xs uppercase"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
