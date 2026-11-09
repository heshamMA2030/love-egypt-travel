import React, { useState } from 'react';
import { Compass, ShieldCheck, MapPin, Sparkles, Anchor, Search, Calendar, Users, Award, ChevronDown } from 'lucide-react';
import { SHARM_HOTEL_ZONES } from '../data/toursData';
import { TourCategory } from '../types';

interface HeroSectionProps {
  onSearch: (category: TourCategory, query: string, hotelArea: string) => void;
  onOpenRamses: () => void;
  onExploreTours: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenRamses,
  onExploreTours,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TourCategory>('all');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCategory, searchQuery, selectedZone);
  };

  return (
    <div id="hero" className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#082B48] text-white">
      {/* Background Imagery with Ocean Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#082B48]/85 via-[#082B48]/75 to-[#082B48]" />
      
      {/* Subtle Golden Ambient Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        
        {/* Egyptian Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Premier Red Sea Excursions & VIP Sinai Charters</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Hero Title with Cinzel Serif */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
          Unveil the Magic of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
            Sharm El Sheikh
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-light leading-relaxed mb-10">
          World-class coral reefs at Ras Mohammed, golden desert quad safaris under star-filled Sinai skies, and private yacht charters curated with 5-star Egyptian hospitality.
        </p>

        {/* Quick Search & Hotel Area Selector Card */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-4xl mx-auto bg-white/95 text-slate-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/40 backdrop-blur-lg mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left">
            
            {/* Category Select */}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                Experience Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as TourCategory)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Experiences</option>
                <option value="diving">Snorkeling & Diving</option>
                <option value="safari">Desert Safari & Quads</option>
                <option value="sinai">Mount Sinai & Heritage</option>
                <option value="boat">Yacht & Speedboat Charters</option>
                <option value="dahab">Dahab Blue Hole Trips</option>
              </select>
            </div>

            {/* Hotel Pickup Zone */}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Hotel Pickup Zone
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="">Any Sharm Hotel</option>
                {SHARM_HOTEL_ZONES.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Keyword */}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                Keywords
              </label>
              <input
                type="text"
                placeholder="e.g. White Island, Quad, Moses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Submit Action */}
            <div className="sm:col-span-3 lg:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full h-[52px] rounded-xl bg-gradient-to-r from-[#082B48] to-[#0d3f68] hover:from-[#051C30] hover:to-[#082B48] text-[#F3E5AB] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#082B48]/30 transition-all border border-[#D4AF37]/50 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span>Search Tours</span>
              </button>
            </div>

          </div>
        </form>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={onExploreTours}
            className="px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a02e] text-[#082B48] font-black text-sm tracking-wide shadow-xl shadow-[#D4AF37]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Featured Excursions
          </button>
          <button
            onClick={onOpenRamses}
            className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-[#D4AF37]/40 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Ask Ramses AI Concierge
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs text-slate-300">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>100% Free 24h Cancellation</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Free Hotel Pickup Included</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>PADI 5-Star Certified Partners</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>Over 50,000 Happy Guests</span>
          </div>
        </div>

      </div>
    </div>
  );
};
