import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { TOURS_DATA } from './data/toursData';
import { Tour, Booking, TourCategory } from './types';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RedSeaConditionsWidget } from './components/RedSeaConditionsWidget';
import { TourCatalog } from './components/TourCatalog';
import { TourDetailModal } from './components/TourDetailModal';
import { CustomItineraryPlanner } from './components/CustomItineraryPlanner';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { RamsesChatbot } from './components/RamsesChatbot';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [tours] = useState<Tour[]>(TOURS_DATA);

  // Modals state
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<Tour | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [tourToBook, setTourToBook] = useState<Tour | null>(null);
  const [bundledToursToBook, setBundledToursToBook] = useState<Tour[]>([]);
  const [bundlePriceUSD, setBundlePriceUSD] = useState<number | undefined>(undefined);

  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [ramsesChatOpen, setRamsesChatOpen] = useState(false);

  // Hero search transfer state
  const [heroSearchCategory, setHeroSearchCategory] = useState<TourCategory>('all');
  const [heroSearchQuery, setHeroSearchQuery] = useState<string>('');
  const [heroHotelArea, setHeroHotelArea] = useState<string>('');

  // Persisted Bookings in localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('love_egypt_bookings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading bookings:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('love_egypt_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings:', e);
    }
  }, [bookings]);

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleOpenBookingForTour = (tour: Tour) => {
    setTourToBook(tour);
    setBundledToursToBook([]);
    setBundlePriceUSD(undefined);
    setBookingModalOpen(true);
  };

  const handleOpenBookingForBundle = (selectedTours: Tour[], discountedUSD: number) => {
    setTourToBook(null);
    setBundledToursToBook(selectedTours);
    setBundlePriceUSD(discountedUSD);
    setBookingModalOpen(true);
  };

  const handleHeroSearch = (category: TourCategory, query: string, hotelArea: string) => {
    setHeroSearchCategory(category);
    setHeroSearchQuery(query);
    setHeroHotelArea(hotelArea);

    const toursElement = document.getElementById('tours');
    if (toursElement) {
      toursElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFCF7] text-[#1E293B]">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenMyBookings={() => setMyBookingsOpen(true)}
          bookingsCount={bookings.length}
          onOpenRamsesChat={() => setRamsesChatOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* Hero Banner */}
        <main className="flex-1">
          <HeroSection
            onSearch={handleHeroSearch}
            onOpenRamses={() => setRamsesChatOpen(true)}
            onExploreTours={() => handleNavigateSection('tours')}
          />

          {/* Live Marine & Dive Conditions Radar */}
          <RedSeaConditionsWidget />

          {/* Excursions Catalog with Live Filters */}
          <TourCatalog
            tours={tours}
            onSelectTour={(tour) => setSelectedTourForDetail(tour)}
            onBookTour={(tour) => handleOpenBookingForTour(tour)}
            initialCategory={heroSearchCategory}
            initialQuery={heroSearchQuery}
            initialHotelArea={heroHotelArea}
          />

          {/* Custom Holiday Itinerary Planner */}
          <CustomItineraryPlanner
            tours={tours}
            onBookCustomPackage={handleOpenBookingForBundle}
          />

          {/* Verified Traveler Reviews */}
          <ReviewsSection />
        </main>

        {/* Brand Footer */}
        <Footer
          onNavigateSection={handleNavigateSection}
          onOpenRamsesChat={() => setRamsesChatOpen(true)}
        />

        {/* Tour Detail Modal */}
        <TourDetailModal
          tour={selectedTourForDetail}
          onClose={() => setSelectedTourForDetail(null)}
          onBookNow={(tour) => handleOpenBookingForTour(tour)}
        />

        {/* Multi-Step Booking Modal */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          tour={tourToBook}
          bundledTours={bundledToursToBook}
          customPriceUSD={bundlePriceUSD}
          onBookingComplete={handleBookingComplete}
        />

        {/* My Bookings Modal */}
        <MyBookingsModal
          isOpen={myBookingsOpen}
          onClose={() => setMyBookingsOpen(false)}
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
        />

        {/* Interactive Floating AI Travel Concierge (Ramses) */}
        <RamsesChatbot
          isOpen={ramsesChatOpen}
          onClose={() => setRamsesChatOpen(false)}
          onOpen={() => setRamsesChatOpen(true)}
          tours={tours}
          onBookTour={(tour) => handleOpenBookingForTour(tour)}
        />

      </div>
    </CurrencyProvider>
  );
}
