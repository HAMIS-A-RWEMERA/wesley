import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { LightboxModal } from './components/LightboxModal';
import { AdminModal } from './components/AdminModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Films } from './pages/Films';
import { Landscape } from './pages/Landscape';
import { Portrait } from './pages/Portrait';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';

import { Film, Photo } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeVideoFilm, setActiveVideoFilm] = useState<Film | null>(null);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<Photo | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);
  const [contentVersion, setContentVersion] = useState<number>(0);

  // Sync with browser hash if user opens direct link like #booking, #films, #admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setAdminModalOpen(true);
      } else if (['home', 'about', 'films', 'landscape', 'portrait', 'booking', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceName?: string) => {
    if (serviceName) setPreselectedBookingService(serviceName);
    navigateTo('booking');
  };

  return (
    <div key={contentVersion} className="min-h-screen flex flex-col bg-[#0c0c0e] text-[#f2f2f4]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onNavigate={navigateTo}
            onSelectFilm={(film) => setActiveVideoFilm(film)}
            onSelectPhoto={(photo) => setActiveLightboxPhoto(photo)}
          />
        )}

        {currentPage === 'about' && (
          <About
            onNavigateBooking={() => navigateTo('booking')}
            onNavigateContact={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'films' && (
          <Films
            onSelectFilm={(film) => setActiveVideoFilm(film)}
            onNavigateBooking={() => handleBookService('Documentary Filming')}
          />
        )}

        {currentPage === 'landscape' && (
          <Landscape
            onSelectPhoto={(photo) => setActiveLightboxPhoto(photo)}
            onNavigateBooking={() => navigateTo('contact')}
          />
        )}

        {currentPage === 'portrait' && (
          <Portrait
            onSelectPhoto={(photo) => setActiveLightboxPhoto(photo)}
            onNavigateBooking={() => handleBookService('Portrait Session')}
          />
        )}

        {currentPage === 'booking' && (
          <Booking
            preselectedServiceName={preselectedBookingService}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Cinema Trailer Lightbox Player */}
      <VideoModal
        film={activeVideoFilm}
        onClose={() => setActiveVideoFilm(null)}
        onBookFilmProject={(title) => handleBookService(title)}
      />

      {/* Photography Fullscreen Lightbox */}
      <LightboxModal
        photo={activeLightboxPhoto}
        onClose={() => setActiveLightboxPhoto(null)}
        onInquirePhoto={(title) => navigateTo('contact')}
      />

      {/* Studio CMS Portal Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onContentUpdated={() => setContentVersion(v => v + 1)}
      />

      {/* Persistent Floating WhatsApp Quick-Chat Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
