import React, { useState } from 'react';
import { ShieldCheck, Maximize2, Volume2, Wind, Sparkles, Lock, CheckCircle2, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useStudioData } from '../context/StudioDataContext';

export const StudioTourSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alpha' | 'beta' | 'flooring' | 'lounge'>('alpha');
  const { data } = useStudioData();
  const amenitiesList = data.amenities || [];

  const spaces = {
    alpha: {
      title: 'Studio Alpha — The Grand Ballroom',
      badge: 'Main Stage & Showcase Space',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80',
      description: 'Our crown jewel rehearsal space features 1,800 sq.ft of pillar-free sprung hardwood flooring, 12-foot distortion-free mirror walls, adjustable warm theatrical lighting, and JBL concert-grade surround sound on Hanshoura Road.',
      specs: [
        'Capacity: 35 Dancers',
        '1,800 sq.ft Pillar-Free Space',
        'Distortion-Free 12ft Mirrors',
        '4K Multi-Angle Video Setup'
      ]
    },
    beta: {
      title: 'Studio Beta — The Acoustic Street Lab',
      badge: 'Urban & Partnering Suite',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'Tailored for Hip-Hop popping, breaking footwork, contemporary flow, and Kids Little Stars. Dense acoustic dampening walls, customizable mood lights, and specialized floor impact padding for battle rehearsals.',
      specs: [
        'Capacity: 20 Dancers',
        'Sound-Dampened Acoustic Walls',
        'RGB Cypher Mood Lighting',
        'Breaking & Floorwork Padding'
      ]
    },
    flooring: {
      title: 'Multi-Layer Sprung Flooring Anatomy',
      badge: '62% Impact Absorption Tech',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
      description: 'Dancing on rigid concrete or standard tiles damages knees and back discs. Merrick features an authentic European floating sprung subfloor with dual elastomer shock absorbers that cushion every landing.',
      specs: [
        'Non-Slip Maple Hardwood Top',
        'Cross-Laid Birch Plywood',
        '50mm High-Density Elastomer Base',
        'Reduces Shin Splints & Joint Strain'
      ]
    },
    lounge: {
      title: 'Lounge, Green Rooms & Vanity Suites',
      badge: 'Comfort & Hospitality',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      description: 'Relax between intense dance sessions in our serene student lounge. Enjoy purified infused water, private biometric lockers, changing vanity stations with mirrors, and high-speed Wi-Fi.',
      specs: [
        'Private Changing Booths & Vanity',
        'Biometric Secure Lockers',
        'Filtered Water & Coffee Bar',
        'Dedicated Parking on Hanshoura Road'
      ]
    }
  };

  const current = spaces[activeTab];

  return (
    <section id="about" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ahmedabad's Flagship Dance Facility</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Designed for Artistic Excellence &amp; Safety
            </h2>
            <p className="text-[#5A5854] text-sm sm:text-base mt-3">
              Over 3,500 sq.ft of premium dance environment located on Hanshoura Road, Ahmedabad, equipped with concert acoustic sound, injury-preventing sprung floors, and climate control.
            </p>

            {/* Interactive Space Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
              {[
                { id: 'alpha', label: 'Studio Alpha (Grand Ballroom)' },
                { id: 'beta', label: 'Studio Beta (Urban Acoustic)' },
                { id: 'flooring', label: 'Sprung Wood Technology' },
                { id: 'lounge', label: 'Student Lounge & Green Rooms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#3D6338] text-white shadow-md scale-105'
                      : 'bg-white text-[#5A5854] border border-[#D9D7D0] hover:bg-[#EFEDE7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Space Spotlight Card with Zoom/Fade Reveal */}
        <ScrollReveal animation="fade-up" delay={100} duration={700}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-xl mb-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="px-3 py-1 bg-[#D8E8D4] text-[#3D6338] rounded-full text-xs font-bold uppercase tracking-wider">
                    {current.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#1E1D1B] mt-2">
                    {current.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#5A5854] leading-relaxed">
                  {current.description}
                </p>

                {/* Specs Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#F7F5F0] border border-[#D9D7D0]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#3D6338] flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#1E1D1B]">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Photo */}
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#2C2B29] shadow-lg group">
                <img
                  key={activeTab}
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="backdrop-blur-md bg-black/40 px-3 py-1 rounded-full border border-white/20">
                    Hanshoura Road Campus · Ahmedabad
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#B5CAB0]" /> Verified Facility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Studio Amenities 6-Card Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenitiesList.map((amenity, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={idx * 80}
              duration={650}
              className="h-full"
            >
              <div className="p-6 rounded-3xl bg-white border border-[#D9D7D0] hover:border-[#7A9E74] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D8E8D4] text-[#3D6338] flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:bg-[#3D6338] group-hover:text-white transition-all">
                      {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                      {idx === 1 && <Maximize2 className="w-6 h-6" />}
                      {idx === 2 && <Volume2 className="w-6 h-6" />}
                      {idx === 3 && <Wind className="w-6 h-6" />}
                      {idx === 4 && <Sparkles className="w-6 h-6" />}
                      {idx === 5 && <Lock className="w-6 h-6" />}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9B92]">
                      Amenity 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-[#1E1D1B] mb-2">
                    {amenity.title}
                  </h4>
                  <p className="text-xs text-[#5A5854] leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
