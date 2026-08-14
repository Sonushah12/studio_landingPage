import React, { useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Film,
  Users,
  Play,
  Layers,
} from 'lucide-react';
import { SafeVideo } from './SafeVideo';
import { SafeImage } from './SafeImage';
import { VideoShowcaseItem } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoShowcaseItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videos,
  currentIndex,
  onSelectIndex,
}) => {
  const currentVideo = videos[currentIndex] || videos[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, videos.length, onClose]);

  if (!isOpen || !currentVideo) return null;

  const hasMultiple = videos.length > 1;

  const handlePrev = () => {
    if (!hasMultiple) return;
    const nextIdx = (currentIndex - 1 + videos.length) % videos.length;
    onSelectIndex(nextIdx);
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    const nextIdx = (currentIndex + 1) % videos.length;
    onSelectIndex(nextIdx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#161514] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header with Back Button & Navigation Controls */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-white/10 bg-black/60 gap-3">
          {/* Left: Back Button & Title Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer flex-shrink-0 active:scale-95"
              title="Back to Video Gallery (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                  {currentVideo.title}
                </h3>
                {currentVideo.category && (
                  <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider hidden xs:inline-block flex-shrink-0">
                    {currentVideo.category}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/70 truncate hidden sm:block">
                {currentVideo.description || `Choreography by ${currentVideo.instructor}`}
              </p>
            </div>
          </div>

          {/* Right: Prev / Next & Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {hasMultiple && (
              <div className="flex items-center gap-1 bg-white/10 rounded-xl p-0.5">
                <button
                  onClick={handlePrev}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                  title="Previous Video (Left Arrow)"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-white/80 px-1.5 select-none">
                  {currentIndex + 1}/{videos.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                  title="Next Video (Right Arrow)"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer active:scale-95"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex-1 flex flex-col justify-center overflow-hidden">
          {/* Top Left Floating Back Button on Video */}
          <div className="absolute top-3 left-3 z-30">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Prev/Next overlay controls on large screens */}
          {hasMultiple && (
            <>
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 items-center justify-center transition cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
                title="Previous Video"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 items-center justify-center transition cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
                title="Next Video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="p-2 sm:p-4">
            <SafeVideo
              key={currentVideo.id + currentVideo.videoUrl}
              src={currentVideo.videoUrl}
              poster={currentVideo.posterUrl}
              title={currentVideo.title}
              autoPlay={true}
              muted={false}
              aspectRatio="video"
              className="w-full rounded-xl overflow-hidden max-h-[58vh]"
            />
          </div>
        </div>

        {/* Video Reel / Playlist Switcher (Change videos with the same method) */}
        {hasMultiple && (
          <div className="bg-[#121110] border-t border-white/10 p-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                <Layers className="w-3.5 h-3.5" />
                <span>Switch Videos ({videos.length} Available)</span>
              </div>
              <span className="text-[10px] text-white/40">
                Click any reel below to play instantly
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {videos.map((vid, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={vid.id}
                    onClick={() => onSelectIndex(idx)}
                    className={`flex items-center gap-2.5 p-1.5 rounded-xl border transition-all cursor-pointer flex-shrink-0 text-left ${
                      isActive
                        ? 'bg-white/20 border-white text-white shadow-md scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white'
                    }`}
                    style={{ minWidth: '180px', maxWidth: '240px' }}
                  >
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-black flex-shrink-0 relative">
                      <SafeImage
                        src={vid.posterUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold truncate leading-tight">
                        {vid.title}
                      </div>
                      <div className="text-[9px] text-white/60 truncate flex items-center gap-1">
                        <span>{vid.category}</span>
                        {vid.duration && <span>· {vid.duration}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Video Footer Info */}
        <div className="p-3 sm:p-4 bg-[#161514] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
          <div className="flex items-center gap-3">
            {currentVideo.instructor && (
              <span className="text-white flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-white/80" />
                Instructor: {currentVideo.instructor}
              </span>
            )}
            <span className="text-white/50 text-[11px] hidden md:inline">
              ✦ Merrick Dance Studio · Hanshoura Road, Ahmedabad
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

