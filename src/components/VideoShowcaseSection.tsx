import React, { useState, useRef } from 'react';
import { Play, Sparkles, Film, Eye, Users, ChevronRight, HardDrive } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { ScrollReveal } from './ScrollReveal';
import { SafeImage } from './SafeImage';
import { VideoModal } from './VideoModal';
import { isGoogleDriveUrl } from '../utils/imageUtils';
import { performFlipTransition } from '../utils/gsapAnimations';

export const VideoShowcaseSection: React.FC = () => {
  const { data } = useStudioData();
  const showcases = data.videoShowcases || [];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoGridRef = useRef<HTMLDivElement>(null);

  if (!showcases || showcases.length === 0) return null;

  const categories: string[] = ['All', ...Array.from(new Set<string>(showcases.map((s) => s.category)))];

  const filtered = selectedCategory === 'All'
    ? showcases
    : showcases.filter((s) => s.category === selectedCategory);

  const handleCategoryChange = (newCat: string) => {
    if (newCat === selectedCategory) return;
    performFlipTransition(
      videoGridRef.current,
      () => {
        setSelectedCategory(newCat);
      },
      { duration: 0.45, stagger: 0.03, ease: 'power3.out' }
    );
  };

  const openVideoAtIndex = (idx: number) => {
    setCurrentVideoIndex(idx);
    setIsVideoModalOpen(true);
  };

  return (
    <section id="videos" className="py-24 bg-[#1E1D1B] text-white relative overflow-hidden">
      {/* Background Ambience & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#3D6338_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#3D6338]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D6338]/30 border border-[#3D6338] text-[#D8E8D4] text-xs font-bold uppercase tracking-widest">
                <Film className="w-3.5 h-3.5 text-[#7A9E74]" />
                <span>Studio Video Reel &amp; Stage Recitals</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                Watch Our Dancers <span className="text-[#7A9E74] italic">Own The Stage</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D9D7D0] leading-relaxed">
                Experience high-energy student routines, masterclass choreography, and grand annual recitals recorded inside our studios on Hanshoura Road.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#3D6338] text-white shadow-lg shadow-[#3D6338]/30 scale-105'
                      : 'bg-white/10 text-[#D9D7D0] hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Video Cards Grid with GSAP Flip */}
        <div ref={videoGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              data-flip-id={item.id}
              className="h-full"
            >
              <div
                onClick={() => openVideoAtIndex(idx)}
                className="group h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7A9E74]/60 rounded-3xl overflow-hidden transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Poster Thumbnail + Play Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <SafeImage
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Central Clean Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-[#1E1D1B] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <Play className="w-6 h-6 fill-current ml-1 text-[#1E1D1B]" />
                      </div>
                    </div>

                    {/* Category Badge & Duration */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/80 text-white text-[11px] font-mono font-medium">
                      {item.duration || 'HD Video'}
                    </div>

                    {isGoogleDriveUrl(item.videoUrl) && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-medium flex items-center gap-1 backdrop-blur-xs">
                        <HardDrive className="w-3 h-3" />
                        <span>HD Reel</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D8E8D4] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#D9D7D0] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#D9D7D0]">
                  <div className="flex items-center gap-1.5 font-medium truncate">
                    <Users className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                    <span className="truncate">{item.instructor}</span>
                  </div>
                  <span className="text-white font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5 flex-shrink-0">
                    Watch HD <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Video Modal with Back Button & Seamless Playlist Switching */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={filtered}
        currentIndex={currentVideoIndex}
        onSelectIndex={(newIdx) => setCurrentVideoIndex(newIdx)}
      />
    </section>
  );
};
