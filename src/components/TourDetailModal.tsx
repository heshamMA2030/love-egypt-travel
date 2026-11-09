import React, { useState } from 'react';
import { Tour } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  X,
  Star,
  Clock,
  Compass,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun
} from 'lucide-react';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
  onBookNow: (tour: Tour) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  onClose,
  onBookNow,
}) => {
  const { formatPrice } = useCurrency();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!tour) return null;

  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#D4AF37]/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Carousel Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900">
          <img
            src={images[activeImageIndex]}
            alt={tour.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Floating Badges on Image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {tour.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow-md">
                {tour.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#082B48]/90 text-white backdrop-blur-md">
              {tour.categoryLabel}
            </span>
          </div>

          {/* Title & Rating in Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1 bg-amber-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{tour.rating}</span>
              </div>
              <span className="text-xs text-slate-200">({tour.reviewsCount} verified traveler reviews)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold drop-shadow-md">
              {tour.title}
            </h2>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-slate-100 overflow-x-auto border-b border-slate-200">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 text-slate-700">
          
          {/* Quick Info Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FDFCF7] p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Duration</span>
              <div className="flex items-center gap-1 font-bold text-sm text-[#082B48] mt-0.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>{tour.duration}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Difficulty</span>
              <div className="flex items-center gap-1 font-bold text-sm text-[#082B48] mt-0.5">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>{tour.difficulty}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Group Setup</span>
              <div className="flex items-center gap-1 font-bold text-sm text-[#082B48] mt-0.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="truncate">{tour.groupSize}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Cancellation</span>
              <div className="flex items-center gap-1 font-bold text-sm text-emerald-700 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Free 24h Prior</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#082B48] mb-2">About This Experience</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {tour.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#082B48] mb-3">Expedition Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tour.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-sm text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                What's Included
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
              <h4 className="font-bold text-sm text-rose-900 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                Not Included / Optional
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What to Bring Checklist */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
            <h4 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Essential Packing & Preparation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {tour.whatToBring.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Pickup Areas */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#082B48] mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Sharm El Sheikh Hotel Pickup Zones
            </h4>
            <div className="flex flex-wrap gap-2">
              {tour.pickupZones.map((zone) => (
                <span key={zone} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                  {zone}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar: Price & Action */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-6 rounded-b-3xl flex items-center justify-between shadow-2xl">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total per person</span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-black text-[#082B48]">
                {formatPrice(tour.priceUSD)}
              </span>
              {tour.originalPriceUSD && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(tour.originalPriceUSD)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hidden sm:inline-block px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(tour);
              }}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e4bf43] hover:brightness-105 text-[#082B48] font-black text-sm shadow-xl shadow-[#D4AF37]/30 transition-all cursor-pointer"
            >
              Book This Excursion
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
