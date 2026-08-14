import React, { useState } from 'react';
import { Award, Quote, Sparkles, Star, Calendar, ChevronRight, Check, Users } from 'lucide-react';
import { INSTRUCTORS } from '../data/studioData';
import { Instructor } from '../types';

interface InstructorsSectionProps {
  onBookWithInstructor: (instructorName: string) => void;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({ onBookWithInstructor }) => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor>(INSTRUCTORS[0]);

  return (
    <section id="instructors" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Master Tutors &amp; Faculty</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
            Learn from Acclaimed Choreographers
          </h2>
          <p className="text-[#5A5854] text-sm mt-3">
            Our powerhouse 3-member faculty brings over 33 combined years of industry experience across Bollywood cinema, street battles, Latin social partner dancing, and stage productions.
          </p>
        </div>

        {/* Instructors Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Profile List Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {INSTRUCTORS.map((instructor) => {
              const isSelected = selectedInstructor.id === instructor.id;

              return (
                <div
                  key={instructor.id}
                  onClick={() => setSelectedInstructor(instructor)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#3D6338] shadow-md scale-[1.02]'
                      : 'bg-white/70 border-[#D9D7D0] hover:bg-white hover:border-[#B5CAB0]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg text-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: instructor.accentColor }}
                    >
                      {instructor.avatarText}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-lg text-[#1E1D1B] leading-none">
                        {instructor.name}
                      </h4>
                      <div className="text-xs text-[#3D6338] font-semibold mt-1">
                        {instructor.role}
                      </div>
                      <div className="text-[11px] text-[#9E9B92] mt-0.5">
                        {instructor.experience}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? 'text-[#3D6338] translate-x-1' : 'text-[#9E9B92]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-dive Spotlight Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-lg animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EFEDE7] pb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: selectedInstructor.accentColor }}
                >
                  {selectedInstructor.avatarText}
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1D1B]">
                    {selectedInstructor.name}
                  </h3>
                  <div className="text-xs text-[#3D6338] font-bold tracking-wider uppercase mt-0.5">
                    {selectedInstructor.role} · {selectedInstructor.experience}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onBookWithInstructor(selectedInstructor.name)}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold rounded-full uppercase tracking-wider transition shadow-sm cursor-pointer whitespace-nowrap"
              >
                Book with {selectedInstructor.name.split(' ')[0]}
              </button>
            </div>

            {/* Specialties Badges */}
            <div className="py-5 border-b border-[#EFEDE7]">
              <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider mb-2">
                Specialties &amp; Disciplines:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedInstructor.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#D8E8D4]/60 text-[#3D6338] rounded-full text-xs font-medium border border-[#B5CAB0]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="py-5 space-y-3">
              <p className="text-sm text-[#2C2B29] leading-relaxed">
                {selectedInstructor.bio}
              </p>

              {/* Achievements */}
              <div className="pt-2">
                <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider mb-2">
                  Notable Career Milestones:
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A5854]">
                  {selectedInstructor.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-3.5 h-3.5 text-[#7A9E74] flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Philosophy Quote */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F7F5F0] border-l-4 border-[#3D6338] italic text-xs sm:text-sm text-[#1E1D1B] flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#7A9E74] flex-shrink-0 transform rotate-180" />
              <span>"{selectedInstructor.quote}"</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
