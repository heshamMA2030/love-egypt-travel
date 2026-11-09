import React, { useState, useMemo } from 'react';
import { Tour, TourCategory, TourDifficulty } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  Check,
  SlidersHorizontal,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

interface TourCatalogProps {
  tours: Tour[];
  onSelectTour: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
  initialCategory?: TourCategory;
  initialQuery?: string;
  initialHotelArea?: string;
}

export const TourCatalog: React.FC<TourCatalogProps> = ({
  tours,
  onSelectTour,
  onBookTour,
  initialCategory = 'all',
  initialQuery = '',
  initialHotelArea = '',
}) => {
  const { formatPrice, currency } = useCurrency();

  const [activeCategory, setActiveCategory] = useState<TourCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sync with initial props if changed from Hero Search
  React.useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
    if (initialQuery) setSearchQuery(initialQuery);
  }, [initialCategory, initialQuery]);

  const categories: { key: TourCategory; label: string }[] = [
    { key: 'all', label: 'All Experiences' },
    { key: 'diving', label: 'Snorkeling & Diving' },
    { key: 'safari', label: 'Desert Safari & Quads' },
    { key: 'sinai', label: 'Mount Sinai & Culture' },
    { key: 'boat', label: 'Boat & Speedboat Charters' },
    { key: 'dahab', label: 'Dahab Day Trips' },
  ];

  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => {
        // Category filter
        if (activeCategory !== 'all' && tour.category !== activeCategory) return false;

        // Difficulty filter
        if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) return false;

        // Price filter
        if (tour.priceUSD > maxPrice) return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = tour.title.toLowerCase().includes(q);
          const matchSub = tour.subtitle.toLowerCase().includes(q);
          const matchHighlights = tour.highlights.some((h) => h.toLowerCase().includes(q));
          const matchCoral = tour.coralSpot?.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchHighlights && !matchCoral) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [tours, activeCategory, selectedDifficulty, maxPrice, searchQuery, sortBy]);

  return (
    <section id="tours" className="py-16 bg-[#FDFCF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#082B48] text-xs font-bold tracking-widest uppercase mb-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Curated South Sinai Expeditions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#082B48]">
              Featured Sharm El Sheikh Excursions
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Handcrafted tours with professional guides, guaranteed hotel transfers, and real-time live currency conversion.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="mt-4 md:mt-0 flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
              Showing <strong className="text-[#082B48]">{filteredTours.length}</strong> of {tours.length} experiences
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#082B48] text-[#F3E5AB] shadow-md shadow-[#082B48]/20 ring-2 ring-[#D4AF37]/50'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Controls Bar: Search, Difficulty, Max Price, Sort */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search excursions, coral spots, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Difficulty select */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span>Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy (Family)</option>
                <option value="Moderate">Moderate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Max price slider */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span>Max:</span>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-[#D4AF37] cursor-pointer"
              />
              <span className="font-bold text-[#082B48] min-w-10">
                {formatPrice(maxPrice)}
              </span>
            </div>

            {/* Sort select */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Empty Search Result State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Compass className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#082B48] mb-2">
              No excursions matched your filter criteria
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Try adjusting your price range or reset category filters to view all Red Sea experiences.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedDifficulty('all');
                setMaxPrice(200);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#082B48] text-[#F3E5AB] text-xs font-bold shadow hover:bg-[#051C30]"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {tour.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow-md">
                        {tour.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#082B48]/85 text-white backdrop-blur-md">
                      {tour.categoryLabel}
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow-md backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{tour.rating}</span>
                    <span className="text-[10px] text-slate-500">({tour.reviewsCount})</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Coral spot / Highlight line */}
                  {tour.coralSpot && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-700 mb-1.5 uppercase tracking-wide">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{tour.coralSpot}</span>
                    </div>
                  )}

                  <h3 
                    onClick={() => onSelectTour(tour)}
                    className="font-serif text-lg font-bold text-[#082B48] group-hover:text-[#0a3a60] transition-colors leading-snug cursor-pointer line-clamp-2 mb-2"
                  >
                    {tour.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {tour.subtitle}
                  </p>

                  {/* Metadata Chips: Duration, Difficulty, Hotel Pickup */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-4 bg-[#FDFCF7] p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-slate-400" />
                      <span>{tour.difficulty} Level</span>
                    </div>
                  </div>

                  {/* Key inclusions checklist */}
                  <div className="space-y-1 mb-4">
                    {tour.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Price & CTA Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <div className="flex items-baseline justify-between pt-3 mb-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Price per guest</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl font-black text-[#082B48]">
                        {formatPrice(tour.priceUSD)}
                      </span>
                      {tour.originalPriceUSD && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(tour.originalPriceUSD)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Free Cancellation
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectTour(tour)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Details & Schedule
                  </button>
                  <button
                    onClick={() => onBookTour(tour)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e4bf43] hover:brightness-105 text-[#082B48] text-xs font-black shadow-md shadow-[#D4AF37]/20 transition-all text-center cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
