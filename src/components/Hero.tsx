import React, { useState } from 'react';
import { Sparkles, Calendar, Volume2, VolumeX, ArrowRight, Award, Users, Music, Heart, CheckCircle2 } from 'lucide-react';
import { rhythmSynth } from '../utils/audioSynth';

interface HeroProps {
  onOpenTrialModal: () => void;
  onOpenQuiz: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onOpenQuiz, onScrollToSection }) => {
  const [activeSoundGenre, setActiveSoundGenre] = useState<string | null>(null);

  const toggleGenreSound = (genre: string) => {
    if (activeSoundGenre === genre) {
      rhythmSynth.stop();
      setActiveSoundGenre(null);
    } else {
      setActiveSoundGenre(genre);
      rhythmSynth.playRhythm(genre, () => {
        setActiveSoundGenre(null);
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] bg-[#F7F5F0] overflow-hidden pt-6 pb-16 lg:py-20 flex flex-col justify-center">
      {/* Subtle Background Ambiance Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D8E8D4]/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-[#B5CAB0]/30 blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Urgent/Social Proof Pill */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8E8D4] border border-[#B5CAB0] text-[#3D6338] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#3D6338] animate-ping" />
            <span>Admissions Open for New Batches · Satellite, Ahmedabad</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-[#5A5854] font-medium">
            🔥 Free 1st Trial Class Included
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-[#3D6338] pl-3 py-0.5">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#3D6338]">
                Dance · Mastery · Expression · Stage
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#1E1D1B] leading-[1.08]">
              Move with{' '}
              <span className="italic font-normal text-[#3D6338] relative inline-block">
                Passion,
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#B5CAB0]" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              Perform with Purpose.
            </h1>

            <p className="text-base sm:text-lg text-[#5A5854] leading-relaxed max-w-xl font-normal">
              Ahmedabad’s premier studio for <strong className="text-[#1E1D1B] font-semibold">Bollywood Commercial &amp; Fusion, Urban Hip-Hop, Salsa Bachata, and Contemporary Movement</strong>. 
              Train directly under master mentors <strong className="text-[#1E1D1B]">Nitin Oad, Shubham Rajput, and Sonu Shah</strong> on European sprung floors in a welcoming, energized community.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenTrialModal}
                className="px-7 py-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-full font-semibold text-sm tracking-wide shadow-lg shadow-[#3D6338]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-[#D8E8D4]" />
                <span>Book Your Free Trial Class</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-6 py-4 bg-[#EFEDE7] hover:bg-[#E4E1D7] text-[#1E1D1B] border border-[#B5CAB0] rounded-full font-semibold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#7A9E74]" />
                <span>Find Your Dance Match</span>
              </button>
            </div>

            {/* Quick Benefits Bullet Badges */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#2C2B29]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>Zero Prior Experience Needed</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>All Age Groups (3 to 60+)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>Grand Annual Stage Recital</span>
              </div>
            </div>

            {/* Interactive Rhythm Sample Bar */}
            <div className="pt-4 p-3.5 bg-[#EFEDE7]/90 rounded-2xl border border-[#D9D7D0] max-w-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1E1D1B]">
                  <Music className="w-3.5 h-3.5 text-[#3D6338]" />
                  <span>Interactive Beat Sampler — Feel the Rhythm:</span>
                </div>
                {activeSoundGenre && (
                  <button
                    onClick={() => {
                      rhythmSynth.stop();
                      setActiveSoundGenre(null);
                    }}
                    className="text-[10px] text-[#3D6338] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <VolumeX className="w-3 h-3" /> Stop
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { key: 'bollywood', label: 'Bollywood Dhol', icon: '🎬' },
                  { key: 'hiphop', label: 'Hip-Hop 808', icon: '🔥' },
                  { key: 'salsa', label: 'Salsa Clave', icon: '💃' },
                  { key: 'contemporary', label: 'Contemporary', icon: '🌊' }
                ].map((item) => {
                  const isPlaying = activeSoundGenre === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleGenreSound(item.key)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                        isPlaying
                          ? 'bg-[#3D6338] text-white border-[#3D6338] shadow-sm'
                          : 'bg-white text-[#2C2B29] border-[#D9D7D0] hover:bg-[#D8E8D4]/60'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="truncate text-[11px]">{item.label}</span>
                      {isPlaying && (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Centerpiece & Studio Art Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Container Card */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#EFEDE7] to-[#D8E8D4]/60 rounded-3xl p-6 border border-[#D9D7D0] shadow-xl overflow-hidden text-center">
              {/* Decorative Aura */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#B5CAB0]/40 blur-xl pointer-events-none" />

              {/* Floating Badge Top Left */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#B5CAB0] shadow-sm flex items-center gap-1.5 text-xs font-semibold text-[#3D6338] z-10">
                <Award className="w-3.5 h-3.5 text-[#7A9E74]" />
                <span>Premier Dance Academy · Ahmedabad</span>
              </div>

              {/* Artistic Vector Illustration with dynamic dancer */}
              <div className="py-8 relative flex items-center justify-center">
                <svg width="280" height="340" viewBox="0 0 320 380" fill="none" className="transform hover:scale-105 transition-transform duration-500">
                  {/* Glowing Stage Ellipse */}
                  <ellipse cx="160" cy="320" rx="120" ry="24" fill="#B5CAB0" opacity="0.45" />
                  <ellipse cx="160" cy="320" rx="80" ry="14" fill="#7A9E74" opacity="0.3" />
                  <rect x="50" y="312" width="220" height="10" rx="5" fill="#D8E8D4" stroke="#B5CAB0" strokeWidth="1" />

                  {/* Dancer Silhouette in Grand Arabesque Pose */}
                  {/* Torso & Spine */}
                  <path d="M160 160 C155 185 148 215 145 245 C142 260 140 275 145 290 C148 298 155 304 160 304 C165 304 172 298 175 290 C180 275 178 260 175 245 C172 215 165 185 160 160Z" fill="#1E1D1B" />
                  
                  {/* Head & Chignon */}
                  <circle cx="160" cy="140" r="20" fill="#1E1D1B" />
                  <circle cx="148" cy="132" r="9" fill="#2C2B29" />

                  {/* Graceful Raised Lead Arm */}
                  <path d="M162 175 C180 160 205 142 228 126 C238 118 245 110 252 102" stroke="#1E1D1B" strokeWidth="9" strokeLinecap="round" fill="none" />
                  <circle cx="254" cy="100" r="4.5" fill="#1E1D1B" />

                  {/* Trailing Fluid Arm */}
                  <path d="M156 182 C140 195 120 210 98 220" stroke="#1E1D1B" strokeWidth="9" strokeLinecap="round" fill="none" />
                  <circle cx="95" cy="222" r="4" fill="#1E1D1B" />

                  {/* Layered Flowing Skirt / Modern Fusion Ribbon Overlay */}
                  <path d="M145 240 C110 235 80 250 65 270 C85 245 105 235 145 240Z" fill="#3D6338" opacity="0.8" />
                  <path d="M145 240 C115 255 95 275 80 295 C100 268 118 252 145 245Z" fill="#7A9E74" opacity="0.7" />
                  <path d="M175 240 C205 235 235 250 255 270 C235 245 215 235 175 240Z" fill="#3D6338" opacity="0.8" />
                  <path d="M175 240 C205 255 225 275 240 295 C220 268 202 252 175 245Z" fill="#7A9E74" opacity="0.7" />
                  <path d="M145 245 C150 265 155 280 160 292 C165 280 170 265 175 245 C166 250 154 250 145 245Z" fill="#B5CAB0" opacity="0.9" />

                  {/* Arabesque Back Leg */}
                  <path d="M168 285 C190 268 215 245 235 224 C244 212 250 198 248 190" stroke="#1E1D1B" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M248 190 C252 184 258 182 260 186" stroke="#1E1D1B" strokeWidth="5" strokeLinecap="round" fill="none" />

                  {/* Supporting Ground Leg */}
                  <path d="M155 290 C150 298 147 306 146 312" stroke="#1E1D1B" strokeWidth="9" strokeLinecap="round" fill="none" />

                  {/* Ambient Musical Sparkles */}
                  <circle cx="80" cy="110" r="3" fill="#3D6338" opacity="0.8" />
                  <circle cx="65" cy="135" r="2" fill="#7A9E74" />
                  <circle cx="260" cy="160" r="3" fill="#3D6338" opacity="0.8" />
                  <text x="60" y="80" fontSize="18" fill="#3D6338" opacity="0.6" fontFamily="Georgia">♪</text>
                  <text x="245" y="65" fontSize="16" fill="#7A9E74" opacity="0.7" fontFamily="Georgia">♫</text>
                </svg>
              </div>

              {/* Floating Feature Card Bottom */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-[#D9D7D0] flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D8E8D4] flex items-center justify-center text-[#3D6338]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E1D1B]">Next Trial Batch: Saturday</div>
                    <div className="text-[11px] text-[#5A5854]">11:00 AM · Satellite Studio 1</div>
                  </div>
                </div>
                <button
                  onClick={onOpenTrialModal}
                  className="px-3 py-1.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Join Batch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Key Stats Strip */}
        <div className="mt-14 pt-8 border-t border-[#D9D7D0]/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/60 border border-[#D9D7D0]/40 backdrop-blur-sm">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">12+</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Years of Excellence</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Est. 2012 in Ahmedabad</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-[#D9D7D0]/40 backdrop-blur-sm">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">1,200+</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Dancers Trained</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Kids, Teens &amp; Adults</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-[#D9D7D0]/40 backdrop-blur-sm">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">3</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Master Tutors</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Nitin, Shubham &amp; Sonu</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-[#D9D7D0]/40 backdrop-blur-sm">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">50+</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Stage Productions</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Annual Showcases &amp; Sangeets</div>
          </div>
        </div>
      </div>
    </section>
  );
};
