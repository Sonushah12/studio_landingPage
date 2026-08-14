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

/**
 * GSAP ScrollTrigger Parallax effect for Hero section
 * Gives distinct scrolling speeds to background ambient glows, floating cards, media card, and content
 */
export const setupHeroParallax = (container: HTMLElement | null) => {
  if (!container || typeof window === 'undefined') return () => {};

  const ctx = gsap.context(() => {
    // 1. Ambient background gradient blobs (move at differentiated slower speeds)
    const blob1 = container.querySelector('.gsap-hero-blob-1');
    const blob2 = container.querySelector('.gsap-hero-blob-2');
    const blob3 = container.querySelector('.gsap-hero-blob-3');

    if (blob1) {
      gsap.to(blob1, {
        yPercent: 45,
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    if (blob2) {
      gsap.to(blob2, {
        yPercent: 35,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    if (blob3) {
      gsap.to(blob3, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // 2. Main visual photo card (drifts at a distinct foreground depth)
    const imageWrapper = container.querySelector('.gsap-hero-image-parallax');
    if (imageWrapper) {
      gsap.to(imageWrapper, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    // 3. Floating review badge (counter-float for multi-plane depth effect)
    const floatingBadge = container.querySelector('.gsap-hero-floating-badge');
    if (floatingBadge) {
      gsap.to(floatingBadge, {
        y: -35,
        x: 10,
        rotate: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }

    // 4. Hero text column subtle parallax delay
    const textCol = container.querySelector('.gsap-hero-text-col');
    if (textCol) {
      gsap.to(textCol, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }

    // 5. Stats bar subtle parallax rise
    const statsBar = container.querySelector('.gsap-hero-stats-row');
    if (statsBar) {
      gsap.fromTo(
        statsBar,
        { y: 15 },
        {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: statsBar,
            start: 'top 95%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        }
      );
    }
  }, container);

  return () => ctx.revert();
};

/**
 * GSAP ScrollTrigger Parallax effect for Studio Tour section
 * Creates subtle multi-layered depth across background ambient glows, preview frame, and tech specs
 */
export const setupStudioTourParallax = (container: HTMLElement | null) => {
  if (!container || typeof window === 'undefined') return () => {};

  const ctx = gsap.context(() => {
    // 1. Ambient background decorative glow blobs
    const bgGlow = container.querySelector('.gsap-tour-bg-glow');
    const bgGlow2 = container.querySelector('.gsap-tour-bg-glow-2');

    if (bgGlow) {
      gsap.to(bgGlow, {
        yPercent: 35,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
    }

    if (bgGlow2) {
      gsap.to(bgGlow2, {
        yPercent: -30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // 2. Large showcase card depth
    const showcaseCard = container.querySelector('.gsap-tour-showcase-card');
    if (showcaseCard) {
      gsap.fromTo(
        showcaseCard,
        { y: 25 },
        {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.9,
          },
        }
      );
    }

    // 3. Inner image subtle zoom/shift
    const innerImage = container.querySelector('.gsap-tour-inner-image');
    if (innerImage) {
      gsap.fromTo(
        innerImage,
        { scale: 1.02, yPercent: -4 },
        {
          scale: 1.12,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: showcaseCard || container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    // 4. Amenities cards staggered parallax wave
    const amenityCards = container.querySelectorAll('.gsap-tour-amenity-card');
    if (amenityCards.length) {
      amenityCards.forEach((card, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * (10 + (index % 3) * 5);
        gsap.fromTo(
          card,
          { y: offset },
          {
            y: -offset,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'bottom 35%',
              scrub: 0.8,
            },
          }
        );
      });
    }
  }, container);

  return () => ctx.revert();
};

