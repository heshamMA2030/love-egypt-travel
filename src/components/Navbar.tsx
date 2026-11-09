import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Currency } from '../types';
import {
  Compass,
  Calendar,
  Waves,
  Star,
  BookmarkCheck,
  MessageCircle,
  Menu,
  X,
  PhoneCall,
  Sun
} from 'lucide-react';

interface NavbarProps {
  onOpenMyBookings: () => void;
  bookingsCount: number;
  onOpenRamsesChat: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMyBookings,
  bookingsCount,
  onOpenRamsesChat,
  onNavigateSection,
}) => {
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'EGP'];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#082B48]/95 backdrop-blur-md text-white border-b border-[#D4AF37]/30 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Egyptian Lotus Sun Emblem */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-7 h-7 text-[#082B48] animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40 animate-ping opacity-20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-black tracking-wider text-white">
                  LOVE <span className="text-[#D4AF37]">EGYPT</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-medium text-amber-200/80 -mt-0.5">
                Sharm El Sheikh Premier Travel
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => handleNavClick('tours')}
              className="text-slate-200 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              Tours & Diving
            </button>
            <button
              onClick={() => handleNavClick('itinerary')}
              className="text-slate-200 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Custom Itinerary
            </button>
            <button
              onClick={() => handleNavClick('conditions')}
              className="text-slate-200 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1"
            >
              <Waves className="w-4 h-4 text-cyan-400" />
              Live Sea Conditions
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-slate-200 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1"
            >
              <Star className="w-4 h-4 text-[#D4AF37]" />
              Reviews
            </button>
          </nav>

          {/* Action Center: Currency, Bookings, WhatsApp, Chat */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-[#051C30] rounded-lg p-0.5 border border-[#D4AF37]/30 shadow-inner">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    currency === c
                      ? 'bg-[#D4AF37] text-[#082B48] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={`Switch currency to ${c}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* My Bookings Trigger */}
            <button
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>My Bookings</span>
              {bookingsCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37] text-[#082B48] text-[11px] font-black shadow">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Contact Button */}
            <a
              href="https://wa.me/201000000000?text=Hello%20Love%20Egypt%20Sharm%2C%20I%20would%20like%20to%20inquire%20about%20your%20excursions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md hover:shadow-green-500/25 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Ramses AI Concierge Mini CTA */}
            <button
              onClick={onOpenRamsesChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#082B48] text-xs font-black shadow-md hover:brightness-105 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Ask Ramses AI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 rounded-lg bg-white/10 text-[#D4AF37]"
              title="My Bookings"
            >
              <BookmarkCheck className="w-5 h-5" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#D4AF37] text-[#082B48] text-[10px] font-bold">
                  {bookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#051C30] border-b border-[#D4AF37]/30 px-5 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-slate-300 font-medium">Select Currency</span>
            <div className="flex items-center bg-[#082B48] rounded-lg p-0.5 border border-[#D4AF37]/30">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    currency === c
                      ? 'bg-[#D4AF37] text-[#082B48]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('tours')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-left text-slate-200"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              Tours & Diving
            </button>
            <button
              onClick={() => handleNavClick('itinerary')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-left text-slate-200"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Custom Itinerary
            </button>
            <button
              onClick={() => handleNavClick('conditions')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-left text-slate-200"
            >
              <Waves className="w-4 h-4 text-cyan-400" />
              Sea Conditions
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-left text-slate-200"
            >
              <Star className="w-4 h-4 text-[#D4AF37]" />
              Reviews
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRamsesChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#082B48] font-bold text-sm shadow-md"
            >
              <Sun className="w-4 h-4" />
              Chat with Ramses AI Concierge
            </button>

            <a
              href="https://wa.me/201000000000?text=Hello%20Love%20Egypt%20Sharm%2C%20I%20would%20like%20to%20inquire%20about%20your%20excursions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp Direct Assistant
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
