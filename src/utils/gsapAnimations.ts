import gsap from 'gsap';

/**
 * GSAP Animation Utilities for Merrick Dance Studio
 */

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
