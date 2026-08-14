import React, { useState } from 'react';
import { Volume2, Sparkles, Calendar, Users, ArrowRight, Check, Info, UserCheck } from 'lucide-react';
import { DanceClass } from '../types';
import { rhythmSynth } from '../utils/audioSynth';
import { ScrollReveal } from './ScrollReveal';
import { SafeImage } from './SafeImage';
import { useStudioData } from '../context/StudioDataContext';

interface ClassesSectionProps {
  onSelectClassDetail: (danceClass: DanceClass) => void;
  onBookTrial: (className: string) => void;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({
  onSelectClassDetail,
  onBookTrial,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePlayingGenre, setActivePlayingGenre] = useState<string | null>(null);
  const { data } = useStudioData();
  const classesList = data.classes || [];

  const categories = [
    { key: 'all', label: 'All Disciplines' },
    { key: 'bollywood', label: 'Bollywood & Fusion' },
    { key: 'urban', label: 'Urban Hip-Hop' },
    { key: 'latin', label: 'Salsa & Bachata' },
    { key: 'contemporary', label: 'Contemporary' },
    { key: 'kids', label: 'Kids Little Stars' },
    { key: 'events', label: 'Wedding Sangeet' },
  ];

  const filteredClasses =
    activeCategory === 'all'
      ? classesList
      : classesList.filter((c) => c.category === activeCategory);

  const handleToggleSound = (genre: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePlayingGenre === genre) {
      rhythmSynth.stop();
      setActivePlayingGenre(null);
    } else {
      setActivePlayingGenre(genre);
      rhythmSynth.playRhythm(genre, () => {
        setActivePlayingGenre(null);
      });
    }
  };

  return (
    <section id="classes" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Dance Disciplines</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Find Your Rhythm, Master Your Craft
            </h2>
            <p className="text-[#5A5854] text-base mt-3 max-w-2xl mx-auto">
              From high-energy Bollywood commercial routines and street urban isolations to sensual Latin partnering, fluid contemporary, and playful kids movement.
            </p>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-[#3D6338] text-white shadow-md scale-105'
                      : 'bg-white text-[#5A5854] border border-[#D9D7D0] hover:bg-[#EFEDE7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Classes Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((item, idx) => {
            const isPlaying = activePlayingGenre === item.soundRhythmType;

            return (
              <ScrollReveal
                key={item.id}
                animation="fade-up"
                delay={idx * 90}
                duration={700}
                className="h-full"
              >
                <div className="bg-white rounded-3xl border border-[#D9D7D0] hover:border-[#7A9E74] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 h-full">
                  <div>
                    {/* Photo Header with dynamic overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#2C2B29]">
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                      {/* Top Badges & Rhythm Button */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <div className="flex flex-wrap gap-1.5">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">
                              {item.badge}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/20">
                            {item.categoryLabel}
                          </span>
                        </div>

                        {/* Interactive Rhythm Button */}
                        <button
                          onClick={(e) => handleToggleSound(item.soundRhythmType, e)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-md backdrop-blur-md ${
                            isPlaying
                              ? 'bg-[#3D6338] text-white ring-2 ring-white scale-110'
                              : 'bg-black/50 text-white hover:bg-black/80 border border-white/30'
                          }`}
                          title={isPlaying ? 'Pause Rhythm' : 'Sample Music Beat'}
                        >
                          {isPlaying ? (
                            <span className="flex gap-0.5 items-end h-3">
                              <span className="w-1 h-3 bg-white animate-soundbar-1 rounded-full"></span>
                              <span className="w-1 h-2 bg-white animate-soundbar-2 rounded-full"></span>
                              <span className="w-1 h-3 bg-white animate-soundbar-3 rounded-full"></span>
                            </span>
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#D8E8D4] font-medium">
                          <UserCheck className="w-3.5 h-3.5 text-[#B5CAB0]" />
                          <span>Lead Mentor: {item.instructorName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#5A5854] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Curriculum Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider">
                          Key Curriculum Highlights:
                        </div>
                        <ul className="space-y-1 text-xs text-[#2C2B29]">
                          {item.curriculumHighlights.slice(0, 3).map((high, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{high}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Batch Timing Metadata Pills */}
                      <div className="pt-2 border-t border-[#EFEDE7] grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#5A5854] bg-[#F7F5F0] p-2 rounded-xl border border-[#D9D7D0]/60">
                          <Calendar className="w-3.5 h-3.5 text-[#7A9E74]" />
                          <span className="font-semibold text-[#1E1D1B] truncate">{item.scheduleDays}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#5A5854] bg-[#F7F5F0] p-2 rounded-xl border border-[#D9D7D0]/60">
                          <Users className="w-3.5 h-3.5 text-[#7A9E74]" />
                          <span className="font-semibold text-[#1E1D1B] truncate">{item.ageGroup}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => onBookTrial(item.name)}
                      className="w-full py-3 px-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Book Free Trial Class</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectClassDetail(item)}
                      className="w-full py-2 text-center text-xs font-semibold text-[#5A5854] hover:text-[#3D6338] transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>View Full Syllabus &amp; Schedule</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Helper Box with Scroll Reveal */}
        <ScrollReveal animation="fade-up" delay={200} duration={650}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#EFEDE7] border border-[#D9D7D0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#3D6338] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-[#1E1D1B]">
                  Looking for Wedding Sangeet Choreography or Private Coaching?
                </h4>
                <p className="text-xs sm:text-sm text-[#5A5854] mt-1">
                  Nitin Oad &amp; Shubham Rajput design bespoke couple first dances, custom music mixes, and family sangeet flashmobs on Hanshoura Road.
                </p>
              </div>
            </div>

            <a
              href="#wedding-services"
              className="px-6 py-3.5 bg-[#1E1D1B] hover:bg-[#2C2B29] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap shadow-md hover:scale-105 active:scale-95"
            >
              Explore Sangeet Choreography
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
