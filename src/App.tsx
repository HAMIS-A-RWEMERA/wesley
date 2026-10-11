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
import { Photography } from './pages/Photography';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';

import { Film, Photo } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [activeVideoFilm, setActiveVideoFilm] = useState<Film | null>(null);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<Photo | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);
  const [contentVersion, setContentVersion] = useState<number>(0);

  // Sync with browser hash if user opens direct link like #booking, #films, #photography
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setAdminModalOpen(true);
      } else if (['home', 'about', 'films', 'photography', 'booking', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else if (['landscape', 'portrait'].includes(hash)) {
        // Backwards compatibility redirect
        setCurrentPage('photography');
        setSelectedCategory(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, category?: string) => {
    setCurrentPage(page);
    setSelectedCategory(category);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceName?: string) => {
    if (serviceName) setPreselectedBookingService(serviceName);
    navigateTo('booking');
  };

  return (
    <div key={contentVersion} className="min-h-screen flex flex-col bg-[#07090e] text-[#f1f5f9]">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        selectedCategory={selectedCategory}
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
            initialCategory={selectedCategory}
            onSelectFilm={(film) => setActiveVideoFilm(film)}
            onNavigateBooking={handleBookService}
          />
        )}

        {currentPage === 'photography' && (
          <Photography
            initialCategory={selectedCategory}
            onSelectPhoto={(photo) => setActiveLightboxPhoto(photo)}
            onNavigateBooking={handleBookService}
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
      />

      {/* Photography Fullscreen Lightbox */}
      <LightboxModal
        photo={activeLightboxPhoto}
        onClose={() => setActiveLightboxPhoto(null)}
      />

      {/* Studio CMS & Director Admin Portal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            window.location.hash = currentPage;
          }
        }}
        onDataChanged={() => {
          setContentVersion((v) => v + 1);
        }}
      />

      {/* Direct WhatsApp Concierge Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
