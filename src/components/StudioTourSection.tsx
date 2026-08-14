import React, { useState } from 'react';
import { ShieldCheck, Maximize2, Volume2, Wind, Sparkles, Lock, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { STUDIO_AMENITIES } from '../data/studioData';

export const StudioTourSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alpha' | 'beta' | 'flooring' | 'lounge'>('alpha');

  return (
    <section id="about" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ahmedabad's Flagship Dance Facility</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
            Designed for Artistic Excellence &amp; Safety
          </h2>
          <p className="text-[#5A5854] text-sm mt-3">
            Over 3,500 sq.ft of premium dance environment located in Satellite, equipped with professional acoustic sound, injury-preventing sprung floors, and climate control.
          </p>

          {/* Interactive Space Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {[
              { id: 'alpha', label: 'Studio Alpha (Grand Ballroom - 1,800 sq.ft)' },
              { id: 'beta', label: 'Studio Beta (Urban & Acoustic Suite)' },
              { id: 'flooring', label: 'Sprung Wood Floor Technology' },
              { id: 'lounge', label: 'Student Lounge & Green Room' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#3D6338] text-white shadow-md'
                    : 'bg-white text-[#5A5854] border border-[#D9D7D0] hover:bg-[#EFEDE7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Space Spotlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9D7D0] shadow-md mb-14">
          {activeTab === 'alpha' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase font-bold text-[#3D6338] tracking-wider">
                  Main Rehearsal Hall
                </span>
                <h3 className="font-display text-3xl font-bold text-[#1E1D1B]">
                  Studio Alpha — The Grand Ballroom
                </h3>
                <p className="text-sm text-[#5A5854] leading-relaxed">
                  Our crown jewel rehearsal space features 1,800 sq.ft of pillar-free sprung hardwood flooring, 12-foot distortion-free mirror walls, adjustable warm theatrical lighting, and JBL concert-grade surround sound. Ideal for large group Bollywood routines, Classical Varnams, and full-troupe choreography.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#2C2B29]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>Capacity: 35 Dancers</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>Dual Barre Stations</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#EFEDE7] rounded-2xl p-6 border border-[#D9D7D0] flex flex-col items-center justify-center text-center">
                {/* SVG Studio Blueprint Visual */}
                <svg width="260" height="180" viewBox="0 0 260 180" fill="none" className="mb-3">
                  <rect x="10" y="20" width="240" height="140" rx="8" fill="#F7F5F0" stroke="#7A9E74" strokeWidth="2" />
                  {/* Mirrors along back */}
                  <line x1="20" y1="28" x2="240" y2="28" stroke="#3D6338" strokeWidth="4" strokeLinecap="round" />
                  <rect x="25" y="34" width="60" height="40" rx="4" fill="#D8E8D4" opacity="0.6" />
                  <rect x="100" y="34" width="60" height="40" rx="4" fill="#D8E8D4" opacity="0.6" />
                  <rect x="175" y="34" width="60" height="40" rx="4" fill="#D8E8D4" opacity="0.6" />
                  {/* Wooden Floor plank lines */}
                  <line x1="10" y1="90" x2="250" y2="90" stroke="#D9D7D0" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="10" y1="120" x2="250" y2="120" stroke="#D9D7D0" strokeWidth="1" strokeDasharray="4 4" />
                  {/* Sound Monitors */}
                  <circle cx="25" cy="145" r="8" fill="#1E1D1B" />
                  <circle cx="235" cy="145" r="8" fill="#1E1D1B" />
                  <text x="75" y="165" fontSize="10" fill="#5A5854" fontFamily="sans-serif">Studio Alpha · 1,800 sq.ft</text>
                </svg>
                <div className="text-xs font-semibold text-[#1E1D1B]">Acoustically Treated Hardwood Studio</div>
                <div className="text-[11px] text-[#5A5854]">Equipped for Live Stream &amp; 4K Video Shoots</div>
              </div>
            </div>
          )}

          {activeTab === 'beta' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase font-bold text-[#3D6338] tracking-wider">
                  Urban &amp; Intimate Suite
                </span>
                <h3 className="font-display text-3xl font-bold text-[#1E1D1B]">
                  Studio Beta — The Acoustic Beat Lab
                </h3>
                <p className="text-sm text-[#5A5854] leading-relaxed">
                  Tailored for Hip-Hop popping, contemporary floorwork, and specialized Kids Little Stars sessions. Featuring dense acoustic paneling, specialized dynamic mood lighting for cyphers, and dedicated floor padding zones for b-boy breaking tutorials.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#2C2B29]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>Capacity: 20 Dancers</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>RGB Cypher Mood Lighting</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#EFEDE7] rounded-2xl p-6 border border-[#D9D7D0] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#3D6338] text-white flex items-center justify-center mb-3">
                  <Volume2 className="w-10 h-10" />
                </div>
                <div className="text-sm font-bold text-[#1E1D1B]">Heavy Bass &amp; Cypher Atmosphere</div>
                <div className="text-xs text-[#5A5854] mt-1 max-w-xs">
                  Zero acoustic bleed between studios, allowing simultaneous high-energy sessions.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flooring' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase font-bold text-[#3D6338] tracking-wider">
                  Dancer Health &amp; Joint Safety
                </span>
                <h3 className="font-display text-3xl font-bold text-[#1E1D1B]">
                  Multi-Layer Sprung Flooring Anatomy
                </h3>
                <p className="text-sm text-[#5A5854] leading-relaxed">
                  Dancing on concrete or standard tile causes micro-trauma to dancer knees, shins, and spinal discs. Merrick uses a specialized 3-tier European floating sprung floor system with dual elastomer shock absorbers that absorb 62% of jump impact.
                </p>
                <ul className="space-y-1.5 text-xs text-[#2C2B29] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" /> Top Layer: Non-slip Maple Hardwood with matte finish
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" /> Sub-Layer: Cross-laid birch plywood subfloor
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" /> Base: 50mm High-density elastomer dampener pads
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 bg-[#EFEDE7] rounded-2xl p-6 border border-[#D9D7D0] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#7A9E74] text-white flex items-center justify-center mb-3">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="text-sm font-bold text-[#1E1D1B]">62% Impact Absorption Rating</div>
                <div className="text-xs text-[#5A5854] mt-1 max-w-xs">
                  Allows students of all ages to jump, leap, and spin without joint fatigue.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lounge' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase font-bold text-[#3D6338] tracking-wider">
                  Comfort &amp; Hospitality
                </span>
                <h3 className="font-display text-3xl font-bold text-[#1E1D1B]">
                  Lounge, Changing Suites &amp; Parent Viewing
                </h3>
                <p className="text-sm text-[#5A5854] leading-relaxed">
                  Relax between sessions in our serene student lounge. Enjoy purified infused water, secure biometric lockers, private changing booths with vanity mirrors, high-speed Wi-Fi, and a comfortable waiting area for parents.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#2C2B29]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>Free High-Speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F5F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
                    <span>Secure Locker Storage</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#EFEDE7] rounded-2xl p-6 border border-[#D9D7D0] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#3D6338] text-white flex items-center justify-center mb-3">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="text-sm font-bold text-[#1E1D1B]">Luxury Green Rooms &amp; Vanities</div>
                <div className="text-xs text-[#5A5854] mt-1 max-w-xs">
                  Designed for seamless transitions between work, school, and dance rehearsal.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Studio Amenities 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#D9D7D0] hover:border-[#7A9E74] transition shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D8E8D4] text-[#3D6338] flex items-center justify-center mb-4">
                {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                {idx === 1 && <Maximize2 className="w-5 h-5" />}
                {idx === 2 && <Volume2 className="w-5 h-5" />}
                {idx === 3 && <Wind className="w-5 h-5" />}
                {idx === 4 && <Sparkles className="w-5 h-5" />}
                {idx === 5 && <Lock className="w-5 h-5" />}
              </div>
              <h4 className="font-display font-bold text-lg text-[#1E1D1B] mb-1.5">
                {amenity.title}
              </h4>
              <p className="text-xs text-[#5A5854] leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
