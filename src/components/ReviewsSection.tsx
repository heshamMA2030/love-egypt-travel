import React, { useState } from 'react';
import { Review } from '../types';
import { REVIEWS_DATA } from '../data/toursData';
import { Star, ShieldCheck, MessageSquarePlus, Check, X, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [tourTitle, setTourTitle] = useState('Ras Mohammed National Park & White Island Luxury Yacht');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author,
      country: country || 'International Traveler',
      countryFlag: '🌍',
      tourTitle,
      rating,
      date: 'Just now',
      comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setShowReviewModal(false);
    setAuthor('');
    setCountry('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-16 bg-[#FDFCF7] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#082B48] text-xs font-bold tracking-widest uppercase mb-2">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Verified Traveler Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#082B48]">
              Loved by Explorers Worldwide
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Real testimonials from guests who embarked on our diving yachts, desert buggies, and mountain pilgrimages.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#D4AF37]" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Rating Overview Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="font-serif text-4xl font-black text-[#082B48]">4.95</span>
            <div className="flex justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">Average Trip Rating</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="font-serif text-4xl font-black text-[#082B48]">99.4%</span>
            <span className="text-xs text-emerald-600 font-bold block my-1">Recommendation Rate</span>
            <span className="text-xs text-slate-500 font-medium">Based on 2,400+ surveys</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="font-serif text-4xl font-black text-[#082B48]">100%</span>
            <span className="text-xs text-emerald-600 font-bold block my-1">Guaranteed Pickup</span>
            <span className="text-xs text-slate-500 font-medium">From all Sharm hotels</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <span className="font-serif text-4xl font-black text-[#082B48]">#1</span>
            <span className="text-xs text-[#D4AF37] font-bold block my-1">Top Rated Agency</span>
            <span className="text-xs text-slate-500 font-medium">South Sinai Tourism 2026</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.author}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#082B48] flex items-center gap-1.5">
                        <span>{r.author}</span>
                        <span>{r.countryFlag}</span>
                      </h4>
                      <span className="text-[11px] text-slate-400">{r.country} • {r.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Guest</span>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mb-2">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                  "{r.comment}"
                </p>
              </div>

              {/* Tour Tag */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate text-[11px] font-semibold text-[#082B48]">
                  Experience: {r.tourTitle}
                </span>
                <span className="text-emerald-700 font-bold shrink-0">100% Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-2 border-[#D4AF37] shadow-2xl relative">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                  Community Feedback
                </span>
                <h4 className="font-serif text-xl font-bold text-[#082B48]">
                  Write a Review for Love Egypt
                </h4>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Liam Smith"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Home Country / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. London, UK"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Excursion Taken
                  </label>
                  <select
                    value={tourTitle}
                    onChange={(e) => setTourTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="Ras Mohammed National Park & White Island Luxury Yacht">Ras Mohammed & White Island Yacht</option>
                    <option value="Straits of Tiran Scuba & Snorkel Safari: Jackson Reef">Straits of Tiran Diving & Snorkeling</option>
                    <option value="Super Sinai VIP Desert Safari: Quads & Bedouin Feast">Super Desert Quad Safari & Bedouin Dinner</option>
                    <option value="Mount Sinai Sunrise Pilgrimage & St. Catherine">Mount Sinai Sunrise & St. Catherine</option>
                    <option value="Dahab Blue Hole & Canyon Jeep Expedition">Dahab Blue Hole & Canyon Safari</option>
                    <option value="Private VIP Speedboat Charter & Wild Dolphin Bay">Private VIP Speedboat Charter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Your Review & Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How was the boat, guide, reef visibility, or quad ride?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#082B48] text-[#F3E5AB] font-bold text-xs shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
