import React, { useState, useEffect } from 'react';
import { extractGoogleDriveFileId, isGoogleDriveUrl, resolveDirectImageUrl } from '../utils/imageUtils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackSrc?: string;
  className?: string;
  alt?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
  className = '',
  alt = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => resolveDirectImageUrl(src, fallbackSrc));
  const [attempt, setAttempt] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(resolveDirectImageUrl(src, fallbackSrc));
    setAttempt(0);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    const rawSrc = src || '';
    const fileId = extractGoogleDriveFileId(rawSrc);

    if (fileId) {
      if (attempt === 0) {
        // Fallback 1: Drive thumbnail high-res
        setAttempt(1);
        setCurrentSrc(`https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`);
        return;
      } else if (attempt === 1) {
        // Fallback 2: Google Drive uc export view
        setAttempt(2);
        setCurrentSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
        return;
      }
    }

    // Ultimate fallback if all attempts fail
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
