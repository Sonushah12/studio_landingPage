import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Clock, Calendar, Users, Flame, ArrowRight, Check, Info } from 'lucide-react';
import { DANCE_CLASSES } from '../data/studioData';
import { DanceClass } from '../types';
import { rhythmSynth } from '../utils/audioSynth';

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
      ? DANCE_CLASSES
      : DANCE_CLASSES.filter((c) => c.category === activeCategory);

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
        {/* Section Header */}
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
                    ? 'bg-[#3D6338] text-white shadow-md'
                    : 'bg-white text-[#5A5854] border border-[#D9D7D0] hover:bg-[#EFEDE7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((item) => {
            const isPlaying = activePlayingGenre === item.soundRhythmType;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#D9D7D0] hover:border-[#7A9E74] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Visual Header Banner */}
                  <div
                    className="p-6 relative overflow-hidden flex items-center justify-between border-b border-[#D9D7D0]/40"
                    style={{ backgroundColor: item.lightColor }}
                  >
                    <div>
                      {item.badge && (
                        <span className="inline-block px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold uppercase rounded-full tracking-wider mb-2">
                          {item.badge}
                        </span>
                      )}
                      <div className="text-xs uppercase tracking-widest font-bold text-[#3D6338]">
                        {item.categoryLabel}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#1E1D1B] mt-0.5">
                        {item.name}
                      </h3>
                    </div>

                    {/* Interactive Rhythm Button */}
                    <button
                      onClick={(e) => handleToggleSound(item.soundRhythmType, e)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-sm ${
                        isPlaying
                          ? 'bg-[#3D6338] text-white animate-pulse'
                          : 'bg-white text-[#3D6338] border border-[#B5CAB0]'
                      }`}
                      title={isPlaying ? 'Pause Rhythm' : 'Sample Music Beat'}
                    >
                      {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-[#5A5854] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Curriculum Bullet Highlights */}
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider">
                        Key Focus Areas:
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
                      <div className="flex items-center gap-1.5 text-[#5A5854] bg-[#F7F5F0] p-2 rounded-xl">
                        <Calendar className="w-3.5 h-3.5 text-[#7A9E74]" />
                        <span className="font-semibold text-[#1E1D1B]">{item.scheduleDays}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#5A5854] bg-[#F7F5F0] p-2 rounded-xl">
                        <Users className="w-3.5 h-3.5 text-[#7A9E74]" />
                        <span className="font-semibold text-[#1E1D1B]">{item.ageGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onBookTrial(item.name)}
                    className="w-full py-3 px-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectClassDetail(item)}
                    className="w-full py-2 text-center text-xs font-semibold text-[#5A5854] hover:text-[#3D6338] transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Detailed Syllabus &amp; Faculty</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Box */}
        <div className="mt-12 p-6 rounded-3xl bg-[#EFEDE7] border border-[#D9D7D0] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3D6338] text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-[#1E1D1B]">
                Looking for Wedding Sangeet Choreography or Private Coaching?
              </h4>
              <p className="text-xs text-[#5A5854] mt-0.5">
                Sonu Shah and our senior faculty design custom couple routines, track mashups, and family sangeet rehearsals.
              </p>
            </div>
          </div>

          <a
            href="#wedding-services"
            className="px-6 py-3 bg-[#1E1D1B] hover:bg-[#2C2B29] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap"
          >
            Explore Special Choreography
          </a>
        </div>
      </div>
    </section>
  );
};
