import React, { useState } from 'react';
import { Booking } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  X,
  BookmarkCheck,
  Calendar,
  MapPin,
  Users,
  Printer,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  const [activeVoucher, setActiveVoucher] = useState<Booking | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/40 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#082B48] text-white p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37] text-[#082B48]">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">My Excursion Bookings</h3>
              <p className="text-xs text-amber-200/80">
                {bookings.length} {bookings.length === 1 ? 'reservation' : 'reservations'} found in your browser
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <BookmarkCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
              <h4 className="font-serif text-lg font-bold text-[#082B48] mb-1">
                No Active Bookings Yet
              </h4>
              <p className="text-xs max-w-sm mx-auto mb-6">
                Explore our Ras Mohammed yacht trips, desert quad safaris, or Mount Sinai sunrise climbs to make your first reservation.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#082B48] text-[#F3E5AB] font-bold text-xs shadow-md"
              >
                Browse Excursions
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={b.tourImage}
                    alt={b.tourTitle}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {b.bookingReference}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {b.status.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#082B48] mb-1.5 leading-snug">
                      {b.tourTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {b.date} ({b.timeSlot.split(' ')[0]})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {b.pickupHotel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {b.adults} Adults {b.children > 0 ? `, ${b.children} Children` : ''}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-black text-[#082B48]">
                      Total Paid: {b.totalPaidFormatted}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <button
                    onClick={() => setActiveVoucher(b)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View Voucher</span>
                  </button>

                  <a
                    href={`https://wa.me/201000000000?text=${encodeURIComponent(
                      `Hello Love Egypt, I need support regarding booking ref ${b.bookingReference} for ${b.tourTitle}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel booking ${b.bookingReference}? You will receive a 100% full refund as per our 24h flexibility policy.`)) {
                        onCancelBooking(b.id);
                      }
                    }}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    title="Cancel Booking"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher Detail Sub-Modal */}
        {activeVoucher && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-2 border-[#D4AF37] shadow-2xl relative">
              <button
                onClick={() => setActiveVoucher(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-slate-200 pb-4 mb-4">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">
                  Official Travel Document
                </span>
                <h4 className="font-serif text-xl font-bold text-[#082B48]">
                  Love Egypt Boarding Pass
                </h4>
                <p className="font-mono text-xs text-slate-500">Ref: {activeVoucher.bookingReference}</p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Excursion:</span>
                  <span className="font-bold text-right">{activeVoucher.tourTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold">{activeVoucher.date} • {activeVoucher.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guest Name:</span>
                  <span className="font-bold">{activeVoucher.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pickup Hotel:</span>
                  <span className="font-bold">{activeVoucher.pickupHotel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Party Size:</span>
                  <span className="font-bold">{activeVoucher.adults} Adults {activeVoucher.children > 0 ? `, ${activeVoucher.children} Children` : ''}</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-black text-[#082B48] pt-2 border-t border-slate-200">
                  <span>Total Paid ({activeVoucher.currency}):</span>
                  <span>{activeVoucher.totalPaidFormatted}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl bg-[#082B48] text-[#F3E5AB] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={() => setActiveVoucher(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
