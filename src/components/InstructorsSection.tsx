import React, { useState, useEffect } from 'react';
import { Award, Quote, Star, ChevronRight, Zap, Flame } from 'lucide-react';
import { Instructor } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { useStudioData } from '../context/StudioDataContext';

interface InstructorsSectionProps {
  onBookWithInstructor: (instructorName: string) => void;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({ onBookWithInstructor }) => {
  const { data } = useStudioData();
  const instructorsList = data.instructors || [];
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor>(instructorsList[0]);
  const [viewMode, setViewMode] = useState<'portrait' | 'action'>('portrait');

  useEffect(() => {
    if (instructorsList.length > 0) {
      const match = instructorsList.find((i) => i.id === selectedInstructor?.id);
      setSelectedInstructor(match || instructorsList[0]);
    }
  }, [instructorsList]);

  if (!instructorsList.length || !selectedInstructor) return null;

  return (
    <section id="instructors" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Master Choreographers &amp; Faculty</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Learn from Ahmedabad's Finest Choreographers
            </h2>
            <p className="text-[#5A5854] text-sm sm:text-base mt-3">
              Our master choreographers bring over 19 combined years of professional experience across Bollywood cinema, street battles, Latin partnering, and stage productions on Hanshoura Road.
            </p>
          </div>
        </ScrollReveal>

        {/* Instructors Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Instructor Select Cards with fade-right */}
          <div className="lg:col-span-5 space-y-4">
            {instructorsList.map((instructor, idx) => {
              const isSelected = selectedInstructor.id === instructor.id;

              return (
                <ScrollReveal
                  key={instructor.id}
                  animation="fade-right"
                  delay={idx * 120}
                  duration={650}
                >
                  <div
                    onClick={() => setSelectedInstructor(instructor)}
                    className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-white border-[#3D6338] shadow-xl ring-2 ring-[#3D6338]/20 scale-[1.02]'
                        : 'bg-white/80 border-[#D9D7D0] hover:bg-white hover:border-[#B5CAB0] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Instructor Photo Avatar */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-[#2C2B29]">
                        <img
                          src={instructor.imageUrl}
                          alt={instructor.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#3D6338]/10 ring-2 ring-[#3D6338] rounded-2xl" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-xl text-[#1E1D1B] leading-none">
                            {instructor.name}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#3D6338] animate-ping" />
                          )}
                        </div>
                        <div className="text-xs text-[#3D6338] font-bold mt-1">
                          {instructor.role}
                        </div>
                        <div className="text-[11px] text-[#9E9B92] mt-0.5 font-medium">
                          {instructor.experience} · {instructor.specialties[0]}
                        </div>
                      </div>
                    </div>

                    <div className="pl-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#3D6338] text-white shadow-sm'
                            : 'bg-[#F7F5F0] text-[#9E9B92] group-hover:bg-[#D8E8D4] group-hover:text-[#3D6338]'
                        }`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5' : ''}`} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Quick Trust Highlight Card with Reveal */}
            <ScrollReveal animation="fade-up" delay={260} duration={650}>
              <div className="bg-[#D8E8D4]/50 border border-[#B5CAB0] rounded-3xl p-5 mt-4 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3D6338] uppercase tracking-wider mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Personal Attention Guarantee</span>
                </div>
                <p className="text-xs text-[#2C2B29] leading-relaxed">
                  Every batch is capped at 18–24 dancers to ensure Nitin Oad and Shubham Rajput give 1-on-1 posture and musicality corrections to every student.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Deep-dive Spotlight Card with fade-left */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-left" delay={150} duration={750}>
              <div className="bg-white rounded-3xl border border-[#D9D7D0] shadow-xl overflow-hidden">
                {/* Visual Photo Header & Switcher */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#1E1D1B] overflow-hidden group">
                  <img
                    src={viewMode === 'portrait' ? selectedInstructor.imageUrl : selectedInstructor.actionPhotoUrl}
                    alt={selectedInstructor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* View Mode Toggle Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                    <button
                      onClick={() => setViewMode('portrait')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                        viewMode === 'portrait'
                          ? 'bg-white text-[#1E1D1B] shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Portrait
                    </button>
                    <button
                      onClick={() => setViewMode('action')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                        viewMode === 'action'
                          ? 'bg-[#3D6338] text-white shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Action Floor
                    </button>
                  </div>

                  {/* Top Experience Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#3D6338] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      {selectedInstructor.experience}
                    </span>
                  </div>

                  {/* Bottom Details Banner */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-4xl text-white leading-none drop-shadow-sm">
                        {selectedInstructor.name}
                      </h3>
                      <div className="text-xs sm:text-sm text-[#D8E8D4] font-semibold mt-1">
                        {selectedInstructor.role}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookWithInstructor(selectedInstructor.name)}
                      className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold rounded-full uppercase tracking-wider transition shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      Book with {(selectedInstructor.name || 'Faculty').split(' ')[0]}
                    </button>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Specialties Badges */}
                  <div>
                    <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider mb-2">
                      Specialized Disciplines:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedInstructor.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 bg-[#D8E8D4]/60 text-[#3D6338] rounded-full text-xs font-semibold border border-[#B5CAB0] shadow-2xs hover:bg-[#D8E8D4] transition"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio Description */}
                  <p className="text-sm text-[#2C2B29] leading-relaxed">
                    {selectedInstructor.bio}
                  </p>

                  {/* Achievements */}
                  <div className="pt-2 border-t border-[#EFEDE7]">
                    <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider mb-2.5">
                      Career Highlights &amp; Accomplishments:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#5A5854]">
                      {selectedInstructor.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#D8E8D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="w-3 h-3 text-[#3D6338] fill-[#3D6338]" />
                          </div>
                          <span className="text-[#1E1D1B] font-medium">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Philosophy Quote Box */}
                  <div className="p-4 rounded-2xl bg-[#F7F5F0] border-l-4 border-[#3D6338] italic text-xs sm:text-sm text-[#1E1D1B] flex items-start gap-3 shadow-2xs">
                    <Quote className="w-5 h-5 text-[#7A9E74] flex-shrink-0 transform rotate-180" />
                    <span>"{selectedInstructor.quote}"</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
