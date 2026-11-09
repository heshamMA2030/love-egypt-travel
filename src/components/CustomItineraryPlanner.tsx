import React, { useState } from 'react';
import { Tour } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  Calendar,
  Sparkles,
  Plus,
  Trash2,
  Clock,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  CheckCircle,
  Percent,
  BookmarkCheck
} from 'lucide-react';

interface CustomItineraryPlannerProps {
  tours: Tour[];
  onBookCustomPackage: (selectedTours: Tour[], totalDiscountedUSD: number) => void;
}

interface DayPlan {
  dayNumber: number;
  morningTourId?: string;
  afternoonTourId?: string;
  eveningTourId?: string;
}

export const CustomItineraryPlanner: React.FC<CustomItineraryPlannerProps> = ({
  tours,
  onBookCustomPackage,
}) => {
  const { formatPrice } = useCurrency();
  const [tripLength, setTripLength] = useState<3 | 5 | 7>(3);

  // Pre-populate with recommended starter schedule
  const [itinerary, setItinerary] = useState<Record<number, DayPlan>>({
    1: { dayNumber: 1, morningTourId: 'ras-mohammed-white-island', afternoonTourId: undefined, eveningTourId: 'super-desert-vip-safari' },
    2: { dayNumber: 2, morningTourId: 'straits-of-tiran-diving', afternoonTourId: undefined, eveningTourId: undefined },
    3: { dayNumber: 3, morningTourId: undefined, afternoonTourId: undefined, eveningTourId: 'mount-sinai-sunrise-trek' },
    4: { dayNumber: 4, morningTourId: 'dahab-blue-hole-safari', afternoonTourId: undefined, eveningTourId: undefined },
    5: { dayNumber: 5, morningTourId: 'private-sunset-speedboat', afternoonTourId: undefined, eveningTourId: undefined },
    6: { dayNumber: 6, morningTourId: 'semi-submarine-coral-safari', afternoonTourId: undefined, eveningTourId: undefined },
    7: { dayNumber: 7, morningTourId: undefined, afternoonTourId: undefined, eveningTourId: 'ras-um-sid-night-dive' },
  });

  const getTour = (id?: string) => tours.find((t) => t.id === id);

  const handleSlotChange = (dayNum: number, slot: 'morning' | 'afternoon' | 'evening', tourId: string) => {
    setItinerary((prev) => ({
      ...prev,
      [dayNum]: {
        ...prev[dayNum],
        dayNumber: dayNum,
        [slot === 'morning' ? 'morningTourId' : slot === 'afternoon' ? 'afternoonTourId' : 'eveningTourId']: tourId || undefined,
      },
    }));
  };

  // Calculate selected tours across active days
  const activeDays = Array.from({ length: tripLength }, (_, i) => i + 1);
  const selectedTourIds: string[] = [];
  activeDays.forEach((day) => {
    const plan = itinerary[day];
    if (plan?.morningTourId) selectedTourIds.push(plan.morningTourId);
    if (plan?.afternoonTourId) selectedTourIds.push(plan.afternoonTourId);
    if (plan?.eveningTourId) selectedTourIds.push(plan.eveningTourId);
  });

  // Unique tours
  const uniqueSelectedTours = Array.from(new Set(selectedTourIds))
    .map((id) => getTour(id))
    .filter((t): t is Tour => Boolean(t));

  const rawSubtotalUSD = uniqueSelectedTours.reduce((acc, t) => acc + t.priceUSD, 0);

  // Bundle discount
  let discountPercent = 0;
  if (uniqueSelectedTours.length >= 5) {
    discountPercent = 15;
  } else if (uniqueSelectedTours.length >= 3) {
    discountPercent = 10;
  } else if (uniqueSelectedTours.length >= 2) {
    discountPercent = 5;
  }

  const discountAmountUSD = Math.round((rawSubtotalUSD * discountPercent) / 100);
  const finalPackagePriceUSD = rawSubtotalUSD - discountAmountUSD;

  return (
    <section id="itinerary" className="py-16 bg-[#082B48] text-white relative overflow-hidden">
      {/* Background Desert/Starry Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#D4AF37]/10 via-[#00A896]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Vacation Architect</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3">
            Design Your Sharm Holiday Itinerary
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Select your vacation duration, slot your favorite Red Sea diving & Sinai excursions by day, and unlock up to 15% bundle discounts automatically.
          </p>

          {/* Trip Duration Selector */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/10 border border-[#D4AF37]/30 mt-6 backdrop-blur-md">
            {[3, 5, 7].map((num) => (
              <button
                key={num}
                onClick={() => setTripLength(num as 3 | 5 | 7)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  tripLength === num
                    ? 'bg-[#D4AF37] text-[#082B48] shadow-md shadow-[#D4AF37]/30 scale-105'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {num} Days in Sharm
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Days Timeline vs Summary Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Days Timeline Builder (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {activeDays.map((dayNum) => {
              const dayPlan = itinerary[dayNum] || { dayNumber: dayNum };
              const morningTour = getTour(dayPlan.morningTourId);
              const afternoonTour = getTour(dayPlan.afternoonTourId);
              const eveningTour = getTour(dayPlan.eveningTourId);

              return (
                <div
                  key={dayNum}
                  className="bg-white/95 text-slate-800 rounded-3xl p-5 border border-[#D4AF37]/30 shadow-xl backdrop-blur-md transition-all"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#082B48] text-[#F3E5AB] font-serif font-black text-sm">
                        {dayNum}
                      </div>
                      <span className="font-serif font-bold text-base text-[#082B48]">
                        Day {dayNum} • Sharm Adventure
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {morningTour || afternoonTour || eveningTour ? 'Active Schedule' : 'Free Leisure Day'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Morning Slot */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase mb-2">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Morning (08:00 - 13:00)</span>
                      </div>
                      <select
                        value={dayPlan.morningTourId || ''}
                        onChange={(e) => handleSlotChange(dayNum, 'morning', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      >
                        <option value="">-- Beach / Leisure Pool --</option>
                        {tours.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} ({formatPrice(t.priceUSD)})
                          </option>
                        ))}
                      </select>
                      {morningTour && (
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                          <span className="truncate">{morningTour.duration}</span>
                          <span className="font-bold text-[#082B48]">{formatPrice(morningTour.priceUSD)}</span>
                        </div>
                      )}
                    </div>

                    {/* Afternoon Slot */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase mb-2">
                        <Sunset className="w-3.5 h-3.5 text-orange-500" />
                        <span>Afternoon (13:00 - 17:00)</span>
                      </div>
                      <select
                        value={dayPlan.afternoonTourId || ''}
                        onChange={(e) => handleSlotChange(dayNum, 'afternoon', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      >
                        <option value="">-- Spa / Naama Bay Stroll --</option>
                        {tours.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} ({formatPrice(t.priceUSD)})
                          </option>
                        ))}
                      </select>
                      {afternoonTour && (
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                          <span className="truncate">{afternoonTour.duration}</span>
                          <span className="font-bold text-[#082B48]">{formatPrice(afternoonTour.priceUSD)}</span>
                        </div>
                      )}
                    </div>

                    {/* Evening Slot */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase mb-2">
                        <Moon className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Evening (17:00 - 22:00)</span>
                      </div>
                      <select
                        value={dayPlan.eveningTourId || ''}
                        onChange={(e) => handleSlotChange(dayNum, 'evening', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      >
                        <option value="">-- Resort Dinner / Rest --</option>
                        {tours.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} ({formatPrice(t.priceUSD)})
                          </option>
                        ))}
                      </select>
                      {eveningTour && (
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                          <span className="truncate">{eveningTour.duration}</span>
                          <span className="font-bold text-[#082B48]">{formatPrice(eveningTour.priceUSD)}</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Summary & Booking Package Card (Right 1 col) */}
          <div className="sticky top-24 bg-white text-slate-800 rounded-3xl p-6 border-2 border-[#D4AF37] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  Package Summary
                </span>
                <h3 className="font-serif text-xl font-black text-[#082B48]">
                  {tripLength}-Day Custom Holiday
                </h3>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-[#082B48]">
                <Calendar className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>

            {/* Selected Tours Count */}
            <div className="py-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Selected Excursions:</span>
                <span className="font-bold text-[#082B48]">{uniqueSelectedTours.length} Experiences</span>
              </div>

              {/* Tour list pill chips */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {uniqueSelectedTours.map((t) => (
                  <div key={t.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                    <span className="truncate font-medium text-slate-700 max-w-[180px]">{t.title}</span>
                    <span className="font-bold text-[#082B48]">{formatPrice(t.priceUSD)}</span>
                  </div>
                ))}
                {uniqueSelectedTours.length === 0 && (
                  <p className="text-xs text-slate-400 italic text-center py-4">
                    Select activities above to build your package.
                  </p>
                )}
              </div>

              {/* Bundle Discount Tier Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" />
                    Bundle Saving Tier
                  </span>
                  <span className="text-emerald-700 font-black">{discountPercent}% OFF</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {uniqueSelectedTours.length < 3
                    ? `Add ${3 - uniqueSelectedTours.length} more tour(s) to unlock 10% OFF bundle discount!`
                    : uniqueSelectedTours.length < 5
                    ? `Awesome! 10% discount applied. Add ${5 - uniqueSelectedTours.length} more for 15% OFF.`
                    : `Maximum 15% VIP Holiday Bundle discount unlocked!`}
                </p>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Regular Subtotal:</span>
                  <span className="line-through">{formatPrice(rawSubtotalUSD)}</span>
                </div>
                {discountAmountUSD > 0 && (
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Bundle Savings ({discountPercent}%):</span>
                    <span>-{formatPrice(discountAmountUSD)}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                  <span className="font-serif text-sm font-bold text-[#082B48]">Total Package:</span>
                  <span className="font-serif text-3xl font-black text-[#082B48]">
                    {formatPrice(finalPackagePriceUSD)}
                  </span>
                </div>
              </div>
            </div>

            {/* Book Package CTA */}
            <button
              onClick={() => onBookCustomPackage(uniqueSelectedTours, finalPackagePriceUSD)}
              disabled={uniqueSelectedTours.length === 0}
              className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#e4bf43] hover:brightness-105 disabled:opacity-50 text-[#082B48] font-black text-sm shadow-xl shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Book Vacation Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400 text-center mt-3">
              Includes all hotel transfers, national park permits, and 24h free cancellation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
