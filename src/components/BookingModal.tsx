import React, { useState } from 'react';
import { Tour, Booking, BookingAddon } from '../types';
import { BOOKING_ADDONS, SHARM_HOTEL_ZONES } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Printer,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
  bundledTours?: Tour[];
  customPriceUSD?: number;
  onBookingComplete: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  tour,
  bundledTours,
  customPriceUSD,
  onBookingComplete,
}) => {
  const { formatPrice, currency } = useCurrency();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [timeSlot, setTimeSlot] = useState<string>('08:00 AM (Morning Departure)');
  const [pickupArea, setPickupArea] = useState<string>(SHARM_HOTEL_ZONES[0]);
  const [pickupHotel, setPickupHotel] = useState<string>('');

  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen || (!tour && (!bundledTours || bundledTours.length === 0))) return null;

  const isBundle = Boolean(bundledTours && bundledTours.length > 0);
  const displayTitle = isBundle
    ? `${bundledTours!.length}-Excursion Vacation Bundle (${bundledTours!.map((t) => t.title).join(', ')})`
    : tour!.title;

  const displayImage = isBundle ? bundledTours![0].image : tour!.image;
  const baseRatePerAdultUSD = isBundle ? customPriceUSD || 120 : tour!.priceUSD;
  const childRateUSD = Math.round(baseRatePerAdultUSD * 0.5); // 50% child rate

  // Addons total
  const selectedAddons = BOOKING_ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotalUSD = selectedAddons.reduce((sum, a) => sum + a.priceUSD, 0);

  // Grand Total in USD
  const subtotalUSD = adults * baseRatePerAdultUSD + children * childRateUSD;
  const totalUSD = subtotalUSD + addonsTotalUSD;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!pickupHotel.trim()) {
        alert('Please enter your hotel or resort name in Sharm El Sheikh for pickup.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
        alert('Please complete your name, email, and WhatsApp contact phone.');
        return;
      }

      // Generate simulated booking reference
      const randomRef = 'LE-SHM-' + Math.floor(10000 + Math.random() * 90000);
      const newBooking: Booking = {
        id: 'book-' + Date.now(),
        bookingReference: randomRef,
        tourId: isBundle ? 'custom-bundle' : tour!.id,
        tourTitle: displayTitle,
        tourImage: displayImage,
        date: selectedDate,
        timeSlot,
        pickupHotel,
        pickupArea,
        adults,
        children,
        currency,
        basePriceUSD: baseRatePerAdultUSD,
        totalUSD,
        totalPaidFormatted: formatPrice(totalUSD),
        addons: selectedAddons.map((a) => ({ id: a.id, name: a.name, priceUSD: a.priceUSD })),
        customerName,
        customerEmail,
        customerPhone,
        specialRequests,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(newBooking);
      onBookingComplete(newBooking);
      setStep(4);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#082B48', '#00A896', '#F3E5AB'],
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#082B48] text-white p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
                Love Egypt Excursions
              </span>
              <span className="text-xs text-slate-400">• Step {step} of 4</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold truncate max-w-md">
              {step === 4 ? 'Booking Confirmed!' : `Reserve: ${isBundle ? 'Holiday Package' : tour?.title}`}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="grid grid-cols-4 bg-slate-100 p-1 border-b border-slate-200 text-center text-xs font-bold text-slate-500">
          <div className={`py-1.5 rounded-lg ${step >= 1 ? 'bg-[#082B48] text-[#F3E5AB]' : ''}`}>
            1. Date & Pickup
          </div>
          <div className={`py-1.5 rounded-lg ${step >= 2 ? 'bg-[#082B48] text-[#F3E5AB]' : ''}`}>
            2. Guests & Addons
          </div>
          <div className={`py-1.5 rounded-lg ${step >= 3 ? 'bg-[#082B48] text-[#F3E5AB]' : ''}`}>
            3. Traveler Info
          </div>
          <div className={`py-1.5 rounded-lg ${step >= 4 ? 'bg-emerald-600 text-white' : ''}`}>
            4. Voucher
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-700 flex-1">
          
          {/* STEP 1: DATE & HOTEL PICKUP */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="flex items-center gap-3 p-3 bg-amber-50/80 rounded-2xl border border-amber-200">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Complimentary door-to-door transfer included from every hotel and resort in Sharm El Sheikh.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  Excursion Date
                </label>
                <input
                  type="date"
                  min={tomorrow}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  Preferred Departure Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="08:00 AM (Morning Departure)">08:00 AM (Morning Departure - Recommended)</option>
                  <option value="10:30 AM (Mid-Morning Slot)">10:30 AM (Mid-Morning Slot)</option>
                  <option value="15:00 PM (Sunset / Afternoon Safari)">15:00 PM (Sunset / Afternoon Safari)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  Sharm El Sheikh Hotel Region
                </label>
                <select
                  value={pickupArea}
                  onChange={(e) => setPickupArea(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  {SHARM_HOTEL_ZONES.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Resort Name & Room Number (If known)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Four Seasons Resort Sharm / Rixos Premium Seagate (Room 214)"
                  value={pickupHotel}
                  onChange={(e) => setPickupHotel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e4bf43] hover:brightness-105 text-[#082B48] font-black text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Guests & Addons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GUEST COUNT & ADDONS */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* Guest Counts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 uppercase block">Adults (Age 12+)</span>
                  <span className="text-[11px] text-slate-400 block mb-2">{formatPrice(baseRatePerAdultUSD)} each</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-sm shadow-xs"
                    >
                      -
                    </button>
                    <span className="font-serif font-black text-lg text-[#082B48]">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-sm shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 uppercase block">Children (Age 4-11)</span>
                  <span className="text-[11px] text-emerald-600 font-bold block mb-2">50% Discount ({formatPrice(childRateUSD)})</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-sm shadow-xs"
                    >
                      -
                    </button>
                    <span className="font-serif font-black text-lg text-[#082B48]">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-sm shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Addons */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#082B48] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Enhance Your Experience (Optional Add-ons)
                </h4>
                <div className="space-y-2.5">
                  {BOOKING_ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50/60 border-[#D4AF37] shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="pr-3">
                          <span className="font-bold text-xs text-[#082B48] block">{addon.name}</span>
                          <span className="text-[11px] text-slate-500">{addon.description}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif font-bold text-sm text-[#082B48] block">
                            +{formatPrice(addon.priceUSD)}
                          </span>
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                            {isSelected ? '✓ Added' : '+ Add'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Running Total Preview */}
              <div className="p-4 rounded-2xl bg-[#082B48] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-200/80 block">Current Calculated Total:</span>
                  <span className="font-serif text-2xl font-black text-[#F3E5AB]">
                    {formatPrice(totalUSD)}
                  </span>
                </div>
                <span className="text-xs text-slate-300">
                  {adults} Adult(s){children > 0 ? `, ${children} Child(ren)` : ''}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e4bf43] hover:brightness-105 text-[#082B48] font-black text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Traveler Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: TRAVELER CONTACT */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Lead Traveler Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Captain Alexander Wright"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Email Address (For Confirmation & Voucher)
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex.wright@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  WhatsApp Contact Number (With Country Code)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7911 123456 or +20 100 000 0000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Our guide will send exact lobby pickup time via WhatsApp 12h prior.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Special Notes / Dietary / Scuba License
                </label>
                <textarea
                  placeholder="e.g. Vegetarian lunch requested, PADI Advanced #1234, celebrating anniversary"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Tour Experience:</span>
                  <span className="truncate max-w-[200px]">{displayTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup:</span>
                  <span>{pickupHotel} ({pickupArea})</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <span>{selectedDate} • {timeSlot}</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-black text-[#082B48] pt-2 border-t border-amber-200/80">
                  <span>Total Amount ({currency}):</span>
                  <span>{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-105 text-white font-black text-sm shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation & Issue Voucher</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: INSTANT CONFIRMATION & DIGITAL VOUCHER */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6">
              
              {/* Confirmed Banner */}
              <div className="text-center p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-black text-emerald-900">
                  Reservation Confirmed!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Booking Reference: <strong className="font-mono text-sm">{confirmedBooking.bookingReference}</strong>
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Saved to "My Bookings" in your browser
                </span>
              </div>

              {/* Digital Boarding Voucher Card */}
              <div className="p-6 rounded-3xl bg-white border-2 border-dashed border-[#D4AF37] shadow-lg relative print:m-0">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="font-serif text-lg font-black text-[#082B48] block">
                      LOVE EGYPT SHARM
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                      Official Excursion Boarding Pass
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Voucher Code</span>
                    <span className="font-mono text-sm font-black text-[#082B48]">
                      {confirmedBooking.bookingReference}
                    </span>
                  </div>
                </div>

                <div className="py-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Lead Guest</span>
                    <span className="font-bold text-slate-800">{confirmedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Date & Time</span>
                    <span className="font-bold text-slate-800">
                      {confirmedBooking.date} ({confirmedBooking.timeSlot.split(' ')[0]})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pickup Hotel</span>
                    <span className="font-bold text-slate-800 truncate block">
                      {confirmedBooking.pickupHotel}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Paid ({confirmedBooking.currency})</span>
                    <span className="font-serif font-black text-[#082B48] text-base">
                      {confirmedBooking.totalPaidFormatted}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Transfer: Door-to-door A/C Mercedes</span>
                  <span className="text-emerald-700 font-bold">Status: Active Confirmed</span>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrintVoucher}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher / Save PDF</span>
                </button>

                <a
                  href={`https://wa.me/201000000000?text=${encodeURIComponent(
                    `Hello Love Egypt, I have confirmed booking ${confirmedBooking.bookingReference} for ${confirmedBooking.tourTitle} on ${confirmedBooking.date}. My hotel is ${confirmedBooking.pickupHotel}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp Guide</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-[#082B48] underline cursor-pointer"
                >
                  Return to Excursions Catalog
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
