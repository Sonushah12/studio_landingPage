import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

/**
 * GSAP Animation Utilities for Merrick Dance Studio
 */

export { Flip, ScrollTrigger };

/**
 * Performs a high-performance GSAP Flip transition on any container or target elements.
 * Ideal for category tab switching, item reordering, and filter updates.
 */
export const performFlipTransition = (
  container: HTMLElement | null,
  updateStateCallback: () => void,
  options?: {
    duration?: number;
    stagger?: number;
    ease?: string;
    targets?: any;
    onComplete?: () => void;
  }
) => {
  if (!container && !options?.targets) {
    updateStateCallback();
    return;
  }

  try {
    const targets = options?.targets || container;
    const state = Flip.getState(targets as any);

    // Apply the React state / DOM mutation
    updateStateCallback();

    // Request animation frame to ensure DOM is updated before Flip calculates delta
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: options?.duration ?? 0.45,
        ease: options?.ease ?? 'power3.out',
        stagger: options?.stagger ?? 0.03,
        absolute: false,
        fade: true,
        simple: true,
        onComplete: options?.onComplete,
      });
    });
  } catch (err) {
    // Graceful fallback if Flip fails in any edge case
    updateStateCallback();
  }
};

/**
 * Smooth Section-to-Section Transition Animation
 * Creates a fluid, cinematic entry for each major landing page section
 */
export const animateSectionTransition = (sectionEl: HTMLElement | null) => {
  if (!sectionEl || typeof window === 'undefined') return;

  const header = sectionEl.querySelector('.gsap-section-header');
  const content = sectionEl.querySelectorAll('.gsap-section-content');
  const cards = sectionEl.querySelectorAll('.gsap-card-item');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });

  if (header) {
    tl.fromTo(
      header,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 }
    );
  }

  if (content.length) {
    tl.fromTo(
      content,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
      header ? '-=0.4' : '0'
    );
  }

  if (cards.length) {
    tl.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06 },
      '-=0.35'
    );
  }

  return tl;
};

export const animateHeroEntrance = (container: HTMLElement | null) => {
  if (!container) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  const badges = container.querySelectorAll('.gsap-hero-badge');
  const title = container.querySelector('.gsap-hero-title');
  const desc = container.querySelector('.gsap-hero-desc');
  const ctas = container.querySelectorAll('.gsap-hero-cta');
  const pills = container.querySelectorAll('.gsap-hero-pill');
  const image = container.querySelector('.gsap-hero-image');
  const stats = container.querySelectorAll('.gsap-hero-stat');

  if (badges.length) {
    tl.fromTo(
      badges,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.3'
    );
  }

  if (desc) {
    tl.fromTo(
      desc,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
  }

  if (ctas.length) {
    tl.fromTo(
      ctas,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.7)' },
      '-=0.3'
    );
  }

  if (pills.length) {
    tl.fromTo(
      pills,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      '-=0.2'
    );
  }

  if (image) {
    tl.fromTo(
      image,
      { scale: 0.94, opacity: 0, filter: 'blur(8px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
      '-=0.6'
    );
  }

  if (stats.length) {
    tl.fromTo(
      stats,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    );
  }

  return tl;
};

/**
 * Slide-out drawer entrance animation
 */
export const animateDrawerIn = (
  drawerEl: HTMLElement | null,
  backdropEl: HTMLElement | null,
  itemsContainer: HTMLElement | null,
  onComplete?: () => void
) => {
  if (!drawerEl || !backdropEl) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete,
  });

  // Fade in backdrop
  tl.fromTo(
    backdropEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: 'power2.out' }
  );

  // Slide in drawer panel
  tl.fromTo(
    drawerEl,
    { x: '100%' },
    { x: '0%', duration: 0.45, ease: 'power3.out' },
    '-=0.25'
  );

  // Stagger in menu items
  if (itemsContainer) {
    const menuItems = itemsContainer.querySelectorAll('.gsap-drawer-item');
    if (menuItems.length) {
      tl.fromTo(
        menuItems,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }

  return tl;
};

/**
 * Slide-out drawer exit animation
 */
export const animateDrawerOut = (
  drawerEl: HTMLElement | null,
  backdropEl: HTMLElement | null,
  onComplete: () => void
) => {
  if (!drawerEl || !backdropEl) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.in' },
    onComplete,
  });

  tl.to(drawerEl, { x: '100%', duration: 0.35, ease: 'power3.in' });
  tl.to(backdropEl, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15');

  return tl;
};

/**
 * Subtle pulse / bounce for CTA badges
 */
export const animatePulse = (element: HTMLElement | null) => {
  if (!element) return;
  return gsap.to(element, {
    scale: 1.04,
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: 'sine.inOut',
  });
};

/**
 * Smooth reveal for cards and sections
 */
export const animateElementReveal = (
  element: HTMLElement | null,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay: number = 0
) => {
  if (!element) return;

  const offsets = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
  };

  const { x, y } = offsets[direction] || offsets.up;

  return gsap.fromTo(
    element,
    { x, y, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay,
      ease: 'power3.out',
    }
  );
};

/**
 * Staggers children entrance with smooth GSAP flow
 */
export const animateStaggeredChildren = (
  container: HTMLElement | null,
  childSelector: string,
  staggerDelay: number = 0.08
) => {
  if (!container) return;
  const elements = container.querySelectorAll(childSelector);
  if (!elements.length) return;

  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.65,
      stagger: staggerDelay,
      ease: 'power3.out',
    }
  );
};

/**
 * Adds smooth tilt/magnetic hover effect to cards
 */
export const applyCardHover = (element: HTMLElement | null) => {
  if (!element) return;
  
  const handleMouseEnter = () => {
    gsap.to(element, { y: -6, scale: 1.015, duration: 0.3, ease: 'power2.out' });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

