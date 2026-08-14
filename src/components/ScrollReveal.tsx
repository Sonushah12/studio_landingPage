import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type RevealAnimation = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin, triggerOnce: true });
  const animPlayedRef = useRef(false);

  useEffect(() => {
    if (isVisible && ref.current && !animPlayedRef.current) {
      animPlayedRef.current = true;
      const el = ref.current;

      const durSec = Math.max(duration / 1000, 0.4);
      const delaySec = Math.max(delay / 1000, 0);

      switch (animation) {
        case 'fade-up':
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: durSec, delay: delaySec, ease: 'power3.out' }
          );
          break;
        case 'fade-down':
          gsap.fromTo(
            el,
            { opacity: 0, y: -35 },
            { opacity: 1, y: 0, duration: durSec, delay: delaySec, ease: 'power3.out' }
          );
          break;
        case 'fade-left':
          gsap.fromTo(
            el,
            { opacity: 0, x: 35 },
            { opacity: 1, x: 0, duration: durSec, delay: delaySec, ease: 'power3.out' }
          );
          break;
        case 'fade-right':
          gsap.fromTo(
            el,
            { opacity: 0, x: -35 },
            { opacity: 1, x: 0, duration: durSec, delay: delaySec, ease: 'power3.out' }
          );
          break;
        case 'zoom-in':
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: durSec, delay: delaySec, ease: 'back.out(1.4)' }
          );
          break;
        case 'fade-in':
        default:
          gsap.fromTo(
            el,
            { opacity: 0 },
            { opacity: 1, duration: durSec, delay: delaySec, ease: 'power2.out' }
          );
          break;
      }
    }
  }, [isVisible, animation, delay, duration, ref]);

  return (
    <Component
      ref={ref}
      style={{ opacity: 0 }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </Component>
  );
};
