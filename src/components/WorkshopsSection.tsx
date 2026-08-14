import React from 'react';
import { Calendar, Clock, Flame, Tag, Sparkles, ArrowRight, Check } from 'lucide-react';
import { UPCOMING_WORKSHOPS } from '../data/studioData';
import { Workshop } from '../types';

interface WorkshopsSectionProps {
  onRSVPWorkshop: (workshop: Workshop) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onRSVPWorkshop }) => {
  return (
    <section id="workshops" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              Immerse yourself in specialized weekend intensives with guest national choreographers. Open to studio members and guest dancers.
            </p>
          </div>

          <div className="text-xs text-[#3D6338] font-bold bg-white px-4 py-2 rounded-2xl border border-[#D9D7D0] self-start md:self-auto shadow-sm">
            ✨ Professional 4K Video Shoot Included with Select Workshops
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING_WORKSHOPS.map((workshop) => {
            const spotsPercentage = (workshop.spotsLeft / workshop.totalSpots) * 100;

            return (
              <div
                key={workshop.id}
                className="bg-white rounded-3xl border border-[#D9D7D0] hover:border-[#3D6338] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Card Header Banner */}
                  <div className="bg-[#D8E8D4]/60 p-6 border-b border-[#D9D7D0] relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                        {workshop.badge}
                      </span>
                      <span className="text-xs font-bold text-[#3D6338] flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {workshop.spotsLeft} Spots Remaining
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#1E1D1B] leading-snug">
                      {workshop.title}
                    </h3>
                  </div>

                  {/* Body details */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#5A5854] leading-relaxed">
                      {workshop.description}
                    </p>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="flex items-center gap-2 text-[#2C2B29]">
                        <Calendar className="w-3.5 h-3.5 text-[#7A9E74]" />
                        <span className="font-semibold">{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2C2B29]">
                        <Clock className="w-3.5 h-3.5 text-[#7A9E74]" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2C2B29]">
                        <Sparkles className="w-3.5 h-3.5 text-[#7A9E74]" />
                        <span>Mentor: <strong>{workshop.instructor}</strong></span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {workshop.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-[#F7F5F0] text-[#5A5854] text-[10px] font-semibold rounded-full border border-[#D9D7D0]"
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
                        <span className="text-xl font-bold font-display text-[#1E1D1B]">
                          ₹{workshop.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#9E9B92] line-through">
                          ₹{workshop.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRSVPWorkshop(workshop)}
                      className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <span>RSVP Seat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
