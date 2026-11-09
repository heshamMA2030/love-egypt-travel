import React from 'react';
import { Sun, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Award, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenRamsesChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenRamsesChat }) => {
  return (
    <footer className="bg-[#051C30] text-slate-300 border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow">
                <Sun className="w-6 h-6 text-[#082B48]" />
              </div>
              <span className="font-serif text-2xl font-black text-white tracking-wider">
                LOVE <span className="text-[#D4AF37]">EGYPT</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Premier Sharm El Sheikh travel agency specializing in luxury Red Sea yacht expeditions, Ras Mohammed diving, Sinai quad safaris, and Mount Sinai sunrise treks.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>Egypt Ministry of Tourism License #4921</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              Explore Sharm
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('tours')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Ras Mohammed & White Island Yacht
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tours')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Straits of Tiran Scuba & Snorkeling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tours')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Super Desert Quad & Bedouin Feasts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tours')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Mount Sinai & St. Catherine Monastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tours')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Dahab Blue Hole & Canyon Safari
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('itinerary')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-[#D4AF37] font-semibold"
                >
                  Custom Vacation Itinerary Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Sharm Pickup Hubs */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              Free Pickup Zones
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Naama Bay Promenade & Resorts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Nabq Bay Lagoon Hotels</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Hadaba & Ras Um Sid Cliffs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Shark's Bay & Coral Bay Marina</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Pasha Coast & Tower Bay</span>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              Sinai Operations Desk
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Peace Road, Naama Bay Marina, Sharm El Sheikh, South Sinai, Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+20 69 360 4821 (Office 06:00 - 23:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@loveegyptsharm.com</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/201000000000?text=Hello%20Love%20Egypt%20Sharm%2C%20I%20am%20ready%20to%20book."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp 24/7</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Love Egypt Sharm El Sheikh. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the Red Sea By <a href="https://compusharm.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline font-semibold">CompuSharm.com</a>
            </span>
            <span>•</span>
            <button onClick={onOpenRamsesChat} className="text-[#D4AF37] hover:underline font-bold">
              Chat with Ramses AI
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
