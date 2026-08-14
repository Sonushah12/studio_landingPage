import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Calendar, Volume2, VolumeX, ArrowRight, Award, Users, Music, CheckCircle2, Play, Pause, Flame, Heart } from 'lucide-react';
import { rhythmSynth } from '../utils/audioSynth';
import { useStudioData } from '../context/StudioDataContext';
import { animateHeroEntrance } from '../utils/gsapAnimations';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOpenTrialModal: () => void;
  onOpenQuiz: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onOpenQuiz, onScrollToSection }) => {
  const [activeSoundGenre, setActiveSoundGenre] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useStudioData();
  const { heroConfig, generalInfo } = data;

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';

  const heroImages = heroConfig?.slides?.length ? heroConfig.slides : [
    {
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      title: 'Main Studio Rehearsal',
      badge: `${currentAddress.split(',')[0]} Studio`,
      genre: 'Urban & Contemporary'
    }
  ];

  useEffect(() => {
    // GSAP entrance animation
    const tl = animateHeroEntrance(containerRef.current);
    return () => {
      tl?.kill();
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroImages.length]);

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

  const currentHeroImage = heroImages[activeImageIdx] || heroImages[0];
  const currentHeroImgUrl = (currentHeroImage as any)?.imageUrl || (currentHeroImage as any)?.url || '';

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[92vh] bg-[#F7F5F0] overflow-hidden pt-6 pb-14 lg:py-16 flex flex-col justify-center"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#D8E8D4]/60 blur-3xl pointer-events-none animate-pulse-subtle -z-10" />
      <div className="absolute top-1/2 -left-36 w-96 h-96 rounded-full bg-[#B5CAB0]/40 blur-3xl pointer-events-none animate-float -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#E8EAD0]/50 blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Urgent Live Pill */}
        <div className="flex wrap items-center gap-2.5 mb-6">
          <div className="gsap-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8E8D4] border border-[#B5CAB0] text-[#3D6338] text-xs font-semibold tracking-wide shadow-sm hover:scale-105 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D6338] animate-ping" />
            <span className="font-bold">
              {heroConfig.badgeText || `Admissions Open · ${currentAddress}`}
            </span>
          </div>
          <div className="gsap-hero-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#D9D7D0] text-xs text-[#5A5854] font-medium shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>1st Complimentary Trial Class Included</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="gsap-hero-badge inline-flex items-center gap-2 border-l-4 border-[#3D6338] pl-3 py-0.5">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#3D6338]">
                Mastery · Passion · Rhythm · Stage
              </span>
            </div>

            <h1 className="gsap-hero-title font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#1E1D1B] leading-[1.08]">
              {heroConfig.mainHeadline1}{' '}
              <span className="italic font-normal text-[#3D6338] relative inline-block">
                {heroConfig.mainHeadlineHighlight}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#B5CAB0]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              {heroConfig.mainHeadline2}
            </h1>

            <p className="gsap-hero-desc text-base sm:text-lg text-[#5A5854] leading-relaxed max-w-xl font-normal">
              {heroConfig.subDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenTrialModal}
                className="gsap-hero-cta px-7 py-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-full font-semibold text-sm tracking-wide shadow-lg shadow-[#3D6338]/25 hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-[#D8E8D4]" />
                <span>{heroConfig.ctaPrimaryText || 'Book Your Free Trial Class'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="gsap-hero-cta px-6 py-4 bg-white hover:bg-[#EFEDE7] text-[#1E1D1B] border border-[#B5CAB0] rounded-full font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#7A9E74] animate-spin" style={{ animationDuration: '8s' }} />
                <span>{heroConfig.ctaSecondaryText || 'Find Your Dance Match'}</span>
              </button>
            </div>

            {/* Quick Benefits Bullet Badges */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#2C2B29]">
              <div className="gsap-hero-pill flex items-center gap-2 font-medium bg-white/70 px-3 py-2 rounded-xl border border-[#D9D7D0]/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>No Experience Needed</span>
              </div>
              <div className="gsap-hero-pill flex items-center gap-2 font-medium bg-white/70 px-3 py-2 rounded-xl border border-[#D9D7D0]/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>All Ages (3 to 60+)</span>
              </div>
              <div className="gsap-hero-pill flex items-center gap-2 font-medium bg-white/70 px-3 py-2 rounded-xl border border-[#D9D7D0]/60 shadow-2xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>Grand Stage Recital</span>
              </div>
            </div>

            {/* Interactive Rhythm Sample Bar */}
            <div className="gsap-hero-pill pt-2 p-4 bg-white/85 backdrop-blur-sm rounded-2xl border border-[#D9D7D0] shadow-sm max-w-xl">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E1D1B]">
                  <div className="w-6 h-6 rounded-full bg-[#D8E8D4] flex items-center justify-center text-[#3D6338]">
                    <Music className="w-3.5 h-3.5" />
                  </div>
                  <span>Audio Rhythm Sampler — Tap to feel the beat:</span>
                </div>
                {activeSoundGenre && (
                  <button
                    onClick={() => {
                      rhythmSynth.stop();
                      setActiveSoundGenre(null);
                    }}
                    className="text-[11px] text-red-600 font-bold flex items-center gap-1 hover:underline cursor-pointer bg-red-50 px-2 py-0.5 rounded-full"
                  >
                    <VolumeX className="w-3 h-3" /> Stop Beat
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                        isPlaying
                          ? 'bg-[#3D6338] text-white border-[#3D6338] shadow-md scale-102'
                          : 'bg-[#F7F5F0] text-[#2C2B29] border-[#D9D7D0] hover:bg-[#D8E8D4]/60 hover:border-[#B5CAB0]'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="truncate text-[11px]">{item.label}</span>
                      {isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-1 h-3 bg-white animate-soundbar-1 rounded-full"></span>
                          <span className="w-1 h-2 bg-white animate-soundbar-2 rounded-full"></span>
                          <span className="w-1 h-3 bg-white animate-soundbar-3 rounded-full"></span>
                        </span>
                      ) : (
                        <Volume2 className="w-3 h-3 text-[#9E9B92] opacity-70" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Centerpiece with Dynamic Animations */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Visual Container Card */}
            <div className="gsap-hero-image relative w-full max-w-md bg-white rounded-3xl p-3 sm:p-4 border border-[#D9D7D0] shadow-2xl overflow-hidden group">
              {/* Photo Showcase Carousel */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2C2B29]">
                <SafeImage
                  key={activeImageIdx}
                  src={currentHeroImgUrl}
                  alt={currentHeroImage.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold tracking-wide border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <Award className="w-3 h-3 text-[#B5CAB0]" />
                    {currentHeroImage.badge}
                  </span>

                  {heroImages.length > 1 && (
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white/90 flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
                      title={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                    >
                      {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                  )}
                </div>

                {/* Bottom Image Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#D8E8D4]">
                    {currentHeroImage.genre}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {currentHeroImage.title}
                  </h3>
                </div>
              </div>

              {/* Thumbnail Selector Dots */}
              {heroImages.length > 1 && (
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center gap-1.5">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveImageIdx(idx);
                          setIsAutoPlaying(false);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeImageIdx === idx ? 'w-7 bg-[#3D6338]' : 'w-2 bg-[#D9D7D0] hover:bg-[#B5CAB0]'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#5A5854]">
                    {activeImageIdx + 1} of {heroImages.length}
                  </span>
                </div>
              )}

              {/* Floating Feature Card Bottom */}
              <div className="mt-3 bg-[#F7F5F0] rounded-2xl p-3.5 border border-[#D9D7D0] flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#D8E8D4] flex items-center justify-center text-[#3D6338] font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1E1D1B]">Next Batch Rehearsal: Saturday</div>
                    <div className="text-[11px] text-[#5A5854]">11:00 AM · {currentAddress}</div>
                  </div>
                </div>
                <button
                  onClick={onOpenTrialModal}
                  className="px-3.5 py-1.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold rounded-xl transition shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Join Free
                </button>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white rounded-2xl p-3 border border-[#D9D7D0] shadow-lg items-center gap-3 animate-float">
              <div className="flex -space-x-2">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Dancer"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
                <SafeImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Dancer"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
                <SafeImage
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Dancer"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div className="text-left pr-1">
                <div className="text-[11px] font-bold text-[#1E1D1B]">{generalInfo.stats?.studentsTrained || generalInfo.stats?.studentsCount || '1,200+'} Dancers</div>
                <div className="text-[10px] text-amber-600 font-bold">★ {generalInfo.stats?.googleRating || '4.9'} Star Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Key Stats Strip */}
        <div className="mt-12 pt-8 border-t border-[#D9D7D0]/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="gsap-hero-stat p-4 rounded-2xl bg-white/70 border border-[#D9D7D0]/60 backdrop-blur-sm shadow-xs hover:border-[#B5CAB0] transition">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">{generalInfo.stats?.yearsOfExcellence || generalInfo.stats?.yearsExp || '12+'}</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Years of Excellence</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Est. 2012 in {generalInfo.city || 'Ahmedabad'}</div>
          </div>

          <div className="gsap-hero-stat p-4 rounded-2xl bg-white/70 border border-[#D9D7D0]/60 backdrop-blur-sm shadow-xs hover:border-[#B5CAB0] transition">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">{generalInfo.stats?.studentsTrained || generalInfo.stats?.studentsCount || '1,200+'}</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Dancers Trained</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Kids, Teens &amp; Adults</div>
          </div>

          <div className="gsap-hero-stat p-4 rounded-2xl bg-white/70 border border-[#D9D7D0]/60 backdrop-blur-sm shadow-xs hover:border-[#B5CAB0] transition">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">{generalInfo.stats?.danceDisciplines || generalInfo.stats?.choreographersCount || '8+'}</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Dance Disciplines</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Bollywood, Hip-Hop, Salsa &amp; More</div>
          </div>

          <div className="gsap-hero-stat p-4 rounded-2xl bg-white/70 border border-[#D9D7D0]/60 backdrop-blur-sm shadow-xs hover:border-[#B5CAB0] transition">
            <div className="font-display text-3xl sm:text-4xl font-bold text-[#1E1D1B]">{generalInfo.stats?.reviewsCount || generalInfo.stats?.productionsCount || '340+'}</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#3D6338] mt-1">Verified 5★ Reviews</div>
            <div className="text-[11px] text-[#9E9B92] mt-0.5">Google &amp; Student Testimonials</div>
          </div>
        </div>
      </div>

      {/* Animated Marquee Strip */}
      <div className="w-full bg-[#1E1D1B] text-[#F7F5F0] py-2.5 mt-10 overflow-hidden border-y border-[#3D6338]/30">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#B5CAB0]">
          <span className="flex items-center gap-2">✦ NEW BATCHES STARTING THIS WEEK AT {currentAddress.toUpperCase()}</span>
          <span className="text-amber-400">★ MASTER CHOREOGRAPHERS NITIN OAD &amp; SHUBHAM RAJPUT</span>
          <span className="flex items-center gap-2">✦ BOLLYWOOD COMMERCIAL · URBAN HIP-HOP · SALSA BACHATA · CONTEMPORARY FLOW</span>
          <span className="text-emerald-400">★ 100% FREE TRIAL CLASS WITH ZERO COMMITMENT</span>
          <span className="flex items-center gap-2">✦ SPRUNG HARDWOOD FLOORING &amp; JBL CONCERT SOUND</span>
          <span className="flex items-center gap-2">✦ NEW BATCHES STARTING THIS WEEK AT {currentAddress.toUpperCase()}</span>
          <span className="text-amber-400">★ MASTER CHOREOGRAPHERS NITIN OAD &amp; SHUBHAM RAJPUT</span>
          <span className="flex items-center gap-2">✦ BOLLYWOOD COMMERCIAL · URBAN HIP-HOP · SALSA BACHATA · CONTEMPORARY FLOW</span>
          <span className="text-emerald-400">★ 100% FREE TRIAL CLASS WITH ZERO COMMITMENT</span>
          <span className="flex items-center gap-2">✦ SPRUNG HARDWOOD FLOORING &amp; JBL CONCERT SOUND</span>
        </div>
      </div>
    </section>
  );
};
