import React from 'react';
import { Heart, Music, Building2, Sparkles, Check, ArrowRight, Video, MessageCircle } from 'lucide-react';

interface SpecialServicesSectionProps {
  onRequestCustomQuote: (serviceName: string) => void;
}

export const SpecialServicesSection: React.FC<SpecialServicesSectionProps> = ({ onRequestCustomQuote }) => {
  return (
    <section id="wedding-services" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Signature Bespoke Choreography</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
            Wedding Sangeet &amp; Event Choreography
          </h2>
          <p className="text-[#5A5854] text-sm mt-3">
            Make your milestone celebrations unforgettable. From romantic couple first dances to showstopping 40-person family medleys and corporate team-building.
          </p>
        </div>

        {/* 3 Specialized Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Wedding Sangeet */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm hover:shadow-xl transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D8E8D4] text-[#3D6338] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1E1D1B]">
                Grand Wedding Sangeet Choreography
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Complete choreography management for bride &amp; groom, parents, bridesmaids, groomsmen, and grand family finale.
              </p>

              <ul className="space-y-2 text-xs text-[#2C2B29] pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Custom studio audio mixing &amp; song seamless mashups</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Step-by-step video practice tutorials for out-of-town guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Flexible rehearsal at Merrick Studio or at your residence</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRequestCustomQuote('Wedding Sangeet Choreography')}
              className="mt-6 w-full py-3 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Inquire Wedding Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 2: Corporate Wellness */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm hover:shadow-xl transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFEDE7] text-[#5A5854] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1E1D1B]">
                Corporate Wellness &amp; Annual Day
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Energize your workplace culture with rhythmic stress-buster workshops, flashmobs, and company anniversary performance coaching.
              </p>

              <ul className="space-y-2 text-xs text-[#2C2B29] pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Post-work office wellness Zumba &amp; Bollywood cardio</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Annual corporate gala troupe coaching &amp; stage direction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Team bonding challenges &amp; dance cyphers</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRequestCustomQuote('Corporate Dance & Wellness')}
              className="mt-6 w-full py-3 bg-[#1E1D1B] hover:bg-[#2C2B29] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Inquire Corporate Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 3: Professional Performance Troupe */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm hover:shadow-xl transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D8E8D4] text-[#3D6338] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1E1D1B]">
                Merrick Professional Dance Troupe
              </h3>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                Book our signature professional company dancers for high-profile cultural festivals, award ceremonies, grand inaugurations, and music concerts.
              </p>

              <ul className="space-y-2 text-xs text-[#2C2B29] pt-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Mesmerizing Classical fusion and Kathak jugalbandis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Grand theatrical LED prop &amp; contemporary act choreography</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>Turnkey costume, soundtrack, and lighting coordination</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRequestCustomQuote('Professional Dance Troupe Booking')}
              className="mt-6 w-full py-3 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Dance Troupe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
