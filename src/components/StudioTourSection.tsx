import React, { useState, useRef } from 'react';
import { ShieldCheck, Maximize2, Volume2, Wind, Sparkles, Lock, CheckCircle2, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SafeImage } from './SafeImage';
import { useStudioData } from '../context/StudioDataContext';
import { performFlipTransition } from '../utils/gsapAnimations';

export const StudioTourSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alpha' | 'beta' | 'flooring' | 'lounge'>('alpha');
  const spaceCardRef = useRef<HTMLDivElement>(null);
  const { data } = useStudioData();
  const { generalInfo } = data;
  const amenitiesList = data.amenities || [];

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';

  const shortAddress = currentAddress.split(',')[0] || 'Hanshoura Road';

  const spaces = {
    alpha: {
      title: 'Studio Alpha — The Grand Ballroom',
      badge: 'Main Stage & Showcase Space',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80',
      description: `Our crown jewel rehearsal space features 1,800 sq.ft of pillar-free sprung hardwood flooring, 12-foot distortion-free mirror walls, adjustable warm theatrical lighting, and JBL concert-grade surround sound at our ${shortAddress} facility.`,
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
        `Dedicated Parking at ${shortAddress}`
      ]
    }
  };

  const handleTabChange = (tabId: typeof activeTab) => {
    if (tabId === activeTab) return;
    performFlipTransition(
      spaceCardRef.current,
      () => {
        setActiveTab(tabId);
      },
      { duration: 0.45, ease: 'power3.out' }
    );
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
              <span>{generalInfo.city || 'Ahmedabad'}'s Flagship Dance Facility</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Designed for Artistic Excellence &amp; Safety
            </h2>
            <p className="text-[#5A5854] text-sm sm:text-base mt-3">
              Over 3,500 sq.ft of premium dance environment located at {currentAddress}, equipped with concert acoustic sound, injury-preventing sprung floors, and climate control.
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
                  onClick={() => handleTabChange(tab.id as typeof activeTab)}
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

        {/* Feature Display Area with GSAP Flip */}
        <ScrollReveal animation="fade-up" delay={120} duration={700}>
          <div ref={spaceCardRef} className="bg-white rounded-3xl border border-[#D9D7D0] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Image Side */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-[#2C2B29] overflow-hidden group">
              <SafeImage
                key={activeTab}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#3D6338] text-white text-xs font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {current.badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display font-bold text-2xl text-white drop-shadow-sm">
                  {current.title}
                </h3>
              </div>
            </div>

            {/* Description & Specs Side */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs uppercase font-bold tracking-widest text-[#7A9E74] mb-2">
                  Studio Infrastructure
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1E1D1B] leading-tight mb-3">
                  {current.title}
                </h3>
                <p className="text-[#5A5854] text-sm leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="border-t border-[#EFEDE7] pt-4">
                <div className="text-xs font-bold text-[#1E1D1B] uppercase tracking-wider mb-3">
                  Key Technical Features:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#2C2B29] bg-[#F7F5F0] p-2.5 rounded-xl border border-[#D9D7D0]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#3D6338] flex-shrink-0" />
                      <span className="font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Injury Prevention Guarantee Pill */}
              <div className="p-3 bg-[#D8E8D4]/60 border border-[#B5CAB0] rounded-2xl flex items-center gap-2.5 text-xs text-[#3D6338]">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Certified shock-damping sprung floor technology protecting dancers' knees and joints.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Studio Amenities Grid */}
        {amenitiesList.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#D9D7D0]">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7A9E74]">
                Everything You Need Under One Roof
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1E1D1B] mt-1">
                Studio Amenities &amp; Member Perks
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {amenitiesList.map((amenity, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-[#D9D7D0] text-center flex flex-col items-center justify-center space-y-1.5 shadow-2xs hover:border-[#7A9E74] transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#D8E8D4]/60 text-[#3D6338] flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                    {amenity.icon || '✓'}
                  </div>
                  <span className="text-xs font-bold text-[#1E1D1B] block">{amenity.name}</span>
                  <span className="text-[10px] text-[#9E9B92] block">{amenity.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
