import React from 'react';
import { Calendar, Clock, Flame, ArrowRight, UserCheck } from 'lucide-react';
import { Workshop } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { useStudioData } from '../context/StudioDataContext';

interface WorkshopsSectionProps {
  onRSVPWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onRSVPWorkshop }) => {
  const { data } = useStudioData();
  const workshopsList = data.workshops || [];

  return (
    <section id="workshops" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>Weekend Intensives &amp; Masterclasses</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
                Upcoming Guest Workshops
              </h2>
              <p className="text-[#5A5854] text-sm mt-2 max-w-xl">
                Immerse yourself in specialized weekend intensives with our senior master choreographers on Hanshoura Road. Open to members and guest dancers.
              </p>
            </div>

            <div className="text-xs text-[#3D6338] font-bold bg-white px-4 py-2.5 rounded-2xl border border-[#D9D7D0] self-start md:self-auto shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Professional 4K Video Shoot Included with Workshops</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Workshop Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshopsList.map((workshop, idx) => {
            return (
              <ScrollReveal
                key={workshop.id}
                animation="fade-up"
                delay={idx * 110}
                duration={700}
                className="h-full"
              >
                <div className="bg-white rounded-3xl border border-[#D9D7D0] hover:border-[#3D6338] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 h-full">
                  <div>
                    {/* Photo Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#2C2B29]">
                      <img
                        src={workshop.imageUrl}
                        alt={workshop.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">
                          {workshop.badge}
                        </span>
                        <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/20 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {workshop.spotsLeft} Spots Left
                        </span>
                      </div>

                      {/* Bottom Title over photo */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="font-display font-bold text-xl text-white leading-tight drop-shadow-sm">
                          {workshop.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#D8E8D4]">
                          <UserCheck className="w-3.5 h-3.5 text-[#B5CAB0]" />
                          <span>Led by {workshop.instructor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Body details */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-[#5A5854] leading-relaxed">
                        {workshop.description}
                      </p>

                      <div className="space-y-2 pt-1 text-xs">
                        <div className="flex items-center gap-2 text-[#2C2B29] bg-[#F7F5F0] p-2 rounded-xl border border-[#D9D7D0]/60">
                          <Calendar className="w-3.5 h-3.5 text-[#7A9E74] flex-shrink-0" />
                          <span className="font-semibold">{workshop.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2C2B29] bg-[#F7F5F0] p-2 rounded-xl border border-[#D9D7D0]/60">
                          <Clock className="w-3.5 h-3.5 text-[#7A9E74] flex-shrink-0" />
                          <span>{workshop.time}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {workshop.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 bg-[#EFEDE7] text-[#5A5854] text-[10px] font-semibold rounded-full border border-[#D9D7D0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA & Pricing */}
                  <div className="p-6 pt-0 border-t border-[#EFEDE7]">
                    <div className="flex items-center justify-between my-3">
                      <div>
                        <div className="text-[10px] text-[#9E9B92] uppercase font-bold">Early-Bird Fee</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-display text-[#1E1D1B]">
                            ₹{workshop.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#9E9B92] line-through">
                            ₹{workshop.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRSVPWorkshop(workshop)}
                        className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
                      >
                        <span>RSVP Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
