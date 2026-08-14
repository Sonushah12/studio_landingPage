import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { ScheduleSlot } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { useStudioData } from '../context/StudioDataContext';

interface ScheduleSectionProps {
  onReserveSlot: (slot: ScheduleSlot) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onReserveSlot }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedStudio, setSelectedStudio] = useState<string>('all');
  const { data } = useStudioData();
  const scheduleSlots = data.scheduleSlots || [];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredSlots = scheduleSlots.filter((slot) => {
    const dayMatch = slot.day === selectedDay;
    const studioMatch =
      selectedStudio === 'all'
        ? true
        : selectedStudio === 'alpha'
        ? slot.studioRoom.includes('Alpha')
        : slot.studioRoom.includes('Beta');
    return dayMatch && studioMatch;
  });

  return (
    <section id="schedule" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Weekly Timetable</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
                Class Schedule &amp; Timings
              </h2>
              <p className="text-[#5A5854] text-sm mt-2 max-w-xl">
                Hanshoura Road, Ahmedabad campus. Select any day below to view morning and evening batch availability.
              </p>
            </div>

            {/* Studio Room Switcher */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#D9D7D0] self-start md:self-auto">
              <button
                onClick={() => setSelectedStudio('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedStudio === 'all'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:bg-[#F7F5F0]'
                }`}
              >
                All Studios
              </button>
              <button
                onClick={() => setSelectedStudio('alpha')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedStudio === 'alpha'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:bg-[#F7F5F0]'
                }`}
              >
                Studio Alpha (Main)
              </button>
              <button
                onClick={() => setSelectedStudio('beta')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedStudio === 'beta'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:bg-[#F7F5F0]'
                }`}
              >
                Studio Beta (Acoustic)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Day of the Week Tabs with Scroll Reveal */}
        <ScrollReveal animation="fade-up" delay={100} duration={650}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {days.map((day) => {
              const isSelected = selectedDay === day;
              const slotsCount = scheduleSlots.filter((s) => s.day === day).length;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 py-3 rounded-2xl font-medium text-xs whitespace-nowrap transition-all flex flex-col items-center gap-1 cursor-pointer flex-1 min-w-[100px] border ${
                    isSelected
                      ? 'bg-[#3D6338] text-white border-[#3D6338] shadow-md scale-102'
                      : 'bg-white text-[#5A5854] border-[#D9D7D0] hover:border-[#B5CAB0] hover:bg-[#F7F5F0]'
                  }`}
                >
                  <span className="font-bold text-sm">{day.slice(0, 3)}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-[#D8E8D4]' : 'text-[#9E9B92]'}`}>
                    {slotsCount} Batches
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Schedule Slots Table / Cards */}
        <div className="mt-8 space-y-3">
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot, idx) => {
              const isLow = slot.availableSpots <= 3;

              return (
                <ScrollReveal
                  key={slot.id}
                  animation="fade-up"
                  delay={idx * 60}
                  duration={600}
                >
                  <div className="bg-white rounded-2xl p-5 border border-[#D9D7D0] hover:border-[#7A9E74] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Left: Timing & Class Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="px-4 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-center min-w-[170px]">
                        <div className="text-xs font-bold text-[#1E1D1B] flex items-center justify-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#3D6338]" />
                          {slot.time}
                        </div>
                        <div className="text-[10px] text-[#7A9E74] font-semibold mt-0.5">
                          {slot.studioRoom}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-xl text-[#1E1D1B]">
                            {slot.className}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D8E8D4] text-[#3D6338] font-bold">
                            {slot.level}
                          </span>
                        </div>
                        <div className="text-xs text-[#5A5854] mt-0.5 flex items-center gap-2">
                          <span>Lead: <strong className="text-[#2C2B29]">{slot.instructor}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Availability & Action */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#EFEDE7]">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1D1B]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isLow ? 'bg-amber-500 animate-ping' : 'bg-[#3D6338]'
                            }`}
                          />
                          <span>{slot.availableSpots} Free Trial Spots Left</span>
                        </div>
                        <div className="text-[10px] text-[#9E9B92] mt-0.5">
                          Max {slot.totalSpots} dancers / batch
                        </div>
                      </div>

                      <button
                        onClick={() => onReserveSlot(slot)}
                        className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold tracking-wider uppercase rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>Reserve Spot</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#D9D7D0]">
              <Calendar className="w-8 h-8 text-[#9E9B92] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#1E1D1B]">No batches in this studio on {selectedDay}</p>
              <p className="text-xs text-[#5A5854] mt-1">Switch to "All Studios" or select another day.</p>
            </div>
          )}
        </div>

        {/* Timetable Notice */}
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="mt-8 text-center text-xs text-[#7A9E74] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#3D6338]" />
            <span>Flexible makeup classes allowed for enrolled students across all parallel batches.</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
