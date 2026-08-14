import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { parseVideoUrl } from '../utils/videoUtils';
import { SafeImage } from './SafeImage';

interface SafeVideoProps {
  src?: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
}

export const SafeVideo: React.FC<SafeVideoProps> = ({
  src,
  poster,
  title = 'Studio Dance Video',
  className = '',
  autoPlay = false,
  muted = true,
  controls = true,
  loop = true,
  aspectRatio = 'video',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || !src.trim()) {
    return (
      <div className={`relative bg-black rounded-2xl flex items-center justify-center p-6 text-center text-white/60 ${className}`}>
        {poster ? (
          <SafeImage src={poster} alt={title} className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60" />
        ) : null}
        <div className="relative z-10 space-y-1">
          <Play className="w-8 h-8 mx-auto text-white/80 opacity-90" />
          <p className="text-xs font-semibold text-white/80">Video preview available soon</p>
        </div>
      </div>
    );
  }

  const videoInfo = parseVideoUrl(src);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[9/16]';
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[21/9]';
      case 'video':
      default:
        return 'aspect-video';
    }
  };

  // 1. Google Drive Video Embed
  if (videoInfo.type === 'gdrive') {
    return (
      <div className={`relative ${getAspectClass()} w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-white/10 group ${className}`}>
        <iframe
          src={`${videoInfo.embedUrl}${autoPlay ? '?autoplay=1' : ''}`}
          title={title}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className="w-full h-full border-0 absolute inset-0 z-10"
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="flex flex-col items-center gap-2 text-xs text-white/80">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span className="font-medium tracking-wide">Loading...</span>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 p-4 text-center">
            <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />
            <p className="text-xs text-white font-semibold">Unable to load Drive video.</p>
            <p className="text-[11px] text-white/70 mt-1">Please ensure the Drive file is set to "Anyone with the link can view".</p>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="mt-3 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Drive</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  // 2. YouTube Video Embed
  if (videoInfo.type === 'youtube') {
    const embedSrc = `${videoInfo.embedUrl}${autoPlay ? '&autoplay=1&mute=1' : ''}${loop ? `&loop=1&playlist=${videoInfo.videoId}` : ''}`;
    return (
      <div className={`relative ${getAspectClass()} w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-white/10 ${className}`}>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0"
        />
      </div>
    );
  }

  // 3. Vimeo Video Embed
  if (videoInfo.type === 'vimeo') {
    return (
      <div className={`relative ${getAspectClass()} w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-white/10 ${className}`}>
        <iframe
          src={`${videoInfo.embedUrl}${autoPlay ? '&autoplay=1&muted=1' : ''}${loop ? '&loop=1' : ''}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0"
        />
      </div>
    );
  }

  // 4. HTML5 Direct Video
  return (
    <div className={`relative ${getAspectClass()} w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-white/10 group ${className}`}>
      <video
        src={videoInfo.directUrl || src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      >
        Your browser does not support HTML5 video.
      </video>

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 p-4 text-center">
          <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />
          <p className="text-xs text-white font-semibold">Video format not supported directly.</p>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="mt-3 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Link</span>
          </a>
        </div>
      )}
    </div>
  );
};
