import React from 'react';
import { Waves, Thermometer, Eye, Wind, Sun, Compass, Info, CheckCircle, ShieldAlert } from 'lucide-react';
import { CURRENT_CONDITIONS } from '../data/toursData';

export const RedSeaConditionsWidget: React.FC = () => {
  const cond = CURRENT_CONDITIONS;

  return (
    <section id="conditions" className="py-14 bg-gradient-to-b from-[#FDFCF7] via-[#F4F1E8] to-[#FDFCF7] border-y border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082B48]/10 text-[#082B48] text-xs font-bold tracking-widest uppercase mb-2">
            <Waves className="w-3.5 h-3.5 text-[#082B48]" />
            <span>Live Marine & Dive Radar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#082B48] mb-3">
            Today's Red Sea & Sinai Dive Conditions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Updated daily by our local PADI divemasters and South Sinai harbor master. Ideal conditions for Ras Mohammed, Tiran Straits, and Dahab.
          </p>
        </div>

        {/* Condition Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          
          {/* Water Temp */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Water Temp</span>
              <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700">
                <Thermometer className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-black text-[#082B48]">
              {cond.waterTempC}°C
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {cond.waterTempF}°F (3mm/5mm wetsuit)
            </p>
          </div>

          {/* Visibility */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Visibility</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-black text-[#082B48]">
              {cond.visibilityMeters}m+
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              Crystal Glass Visibility
            </p>
          </div>

          {/* Air Temp */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Air Temp</span>
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <Sun className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-black text-[#082B48]">
              {cond.airTempC}°C
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {cond.airTempF}°F • 100% Sunny
            </p>
          </div>

          {/* Waves / Swell */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Sea State</span>
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <Waves className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-xl font-black text-[#082B48] leading-tight">
              Calm
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              Flat water inside reefs
            </p>
          </div>

          {/* Wind */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Wind</span>
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <Wind className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-black text-[#082B48]">
              {cond.windSpeedKnots} <span className="text-xs font-normal">kts</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium truncate">
              {cond.windDirection}
            </p>
          </div>

          {/* Tide & Current */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Tide State</span>
              <div className="p-1.5 rounded-lg bg-yellow-50 text-yellow-700">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-lg font-black text-[#082B48]">
              High Tide
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium truncate">
              Mild drift current
            </p>
          </div>

        </div>

        {/* Featured Dive Spots Table & Daily Tip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dive Spots Status */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#082B48] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Today's Reef Spot Recommendations
            </h3>
            
            <div className="divide-y divide-slate-100">
              {cond.diveSites.map((site) => (
                <div key={site.name} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#082B48]">{site.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {site.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{site.highlight}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      Depth: {site.depthMeters}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divemaster Tip of the Day */}
          <div className="bg-gradient-to-br from-[#082B48] to-[#0c395e] text-white rounded-2xl p-6 shadow-md border border-[#D4AF37]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-2">
                <Info className="w-4 h-4" />
                <span>Divemaster Briefing</span>
              </div>
              <h4 className="font-serif text-xl font-bold mb-3 text-[#F3E5AB]">
                Ideal Visibility for Ras Mohammed & Tiran
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                "Gentle northern breeze creates mirror-smooth water inside the bay at Yolanda Reef. High tide around 11:30 AM will make the White Island sandbank shallow and turquoise. Perfect for both introductory divers and photographers."
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-amber-200/80 font-medium">Captain Karim • Red Sea Master</span>
              <span className="text-[11px] font-bold text-emerald-400">Harbor Open 🟢</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
