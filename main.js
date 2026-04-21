import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ============================
   LENIS SMOOTH SCROLL
   ============================ */
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  infinite: false,
  gestureOrientation: 'vertical',
  normalizeWheel: true,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* ============================
   HERO ANIMATIONS
   ============================ */
const initHeroAnimations = () => {
  const video = document.querySelector('.bg-video');
  const heroDetails = document.querySelector('.hero-details');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta-group');
  const nav = document.querySelector('.nav');

  if (!video) return;

  // Entrance timeline
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  gsap.set(video, { scale: 1.2, opacity: 0 });
  gsap.set([heroTitle, heroSubtitle, heroCta], { y: 60, opacity: 0 });
  gsap.set(nav, { y: -100, opacity: 0 });

  tl.to(video, { scale: 1.05, opacity: 1, duration: 2.5 })
    .to(heroTitle, { y: 0, opacity: 1, duration: 1.2 }, '-=1')
    .to(heroSubtitle, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
    .to(heroCta, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
    .to(nav, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.8');

  // Scroll-driven parallax
  gsap.to(video, {
    scale: 1,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(heroDetails, {
    y: -150,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

};

/* ============================
   PRODUCT REVEAL ANIMATIONS
   ============================ */
const initProductRevealAnimations = () => {
  const watch = document.querySelector('.product-reveal-watch');
  const title = document.querySelector('.product-reveal-title');
  const subtitle = document.querySelector('.product-reveal-subtitle');
  const cta = document.querySelector('.product-reveal-cta-group');
  const bgText = document.querySelector('.product-reveal-text-bg');
  const details = document.querySelector('.product-reveal-details');

  if (!watch) return;

  // Entrance
  gsap.from(watch, {
    y: 50,
    opacity: 0,
    rotation: -5,
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(title, {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(subtitle, {
    y: 40,
    opacity: 0,
    duration: 1.2,
    delay: 0.15,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(cta, {
    y: 40,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  // Scroll-driven watch rotation + zoom
  gsap.to(watch, {
    rotation: 20,
    scale: 1.3,
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  gsap.to(details, {
    y: -150,
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(bgText, {
    y: -250,
    scrollTrigger: {
      trigger: '.product-reveal',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
};

/* ============================
   ETHOS (COLLECTION) ANIMATIONS
   ============================ */
const initEthosAnimations = () => {
  const bgImgs = document.querySelectorAll('.ethos-bg-img');
  const nextBtns = document.querySelectorAll('.ethos-next-btn');
  const variants = document.querySelectorAll('.ethos-main');

  if (!bgImgs.length) return;

  // Background parallax
  bgImgs.forEach((img) => {
    gsap.to(img, {
      scale: 1.1,
      yPercent: 10,
      scrollTrigger: {
        trigger: '.ethos',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Variant switch
  let isAnimating = false;

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isAnimating) return;
      isAnimating = true;

      const target = btn.dataset.target;
      const currentVariant = document.querySelector('.ethos-main.active');
      const nextVariant = document.querySelector(`.ethos-main.variant-${target}`);
      const currentBg = document.querySelector('.ethos-bg-img.active');
      const nextBg = document.querySelector(`.ethos-bg-${target}`);

      if (!nextVariant || currentVariant === nextVariant) {
        isAnimating = false;
        return;
      }

      const currentText = currentVariant.querySelector('.ethos-text-side');
      const currentWatch = currentVariant.querySelector('.ethos-watch-img');
      const nextText = nextVariant.querySelector('.ethos-text-side');
      const nextWatch = nextVariant.querySelector('.ethos-watch-img');

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        },
      });

      // Animate out
      tl.to(currentText, { x: -100, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0)
        .to(currentWatch, { x: -150, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0)
        .call(() => {
          currentVariant.classList.remove('active');
          currentBg?.classList.remove('active');
          nextVariant.classList.add('active');
          nextBg?.classList.add('active');
          gsap.set(nextText, { x: 100, opacity: 0 });
          gsap.set(nextWatch, { x: 150, opacity: 0 });
        })
        // Animate in
        .to(nextText, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '+=0.1')
        .to(nextWatch, { x: 0, opacity: 0.85, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    });
  });
};

/* ============================
   CATALOG — ANIMATIONS + DETAIL NAV
   ============================ */
const initCatalogAnimations = () => {
  const header = document.querySelector('.catalog-header');
  const cards = document.querySelectorAll('.catalog-card');

  if (!cards.length) return;

  if (header) {
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.catalog',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  cards.forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: i * 0.12,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.catalog-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Navigate to detail page on card or button click
  document.querySelectorAll('.catalog-detail-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const watchId = btn.dataset.watch;
      window.location.href = `watch-detail.html?watch=${watchId}`;
    });
  });

  document.querySelectorAll('.catalog-card[data-watch]').forEach((card) => {
    card.addEventListener('click', () => {
      const watchId = card.dataset.watch;
      window.location.href = `watch-detail.html?watch=${watchId}`;
    });
  });
};

/* ============================
   NAV SCROLL HIDE/SHOW
   ============================ */
const initNavScroll = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  lenis.on('scroll', ({ scroll }) => {
    if (scroll > lastScroll && scroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = scroll;
  });
};

/* ============================
   MODAL + SMOOTH SCROLL ANCHORS
   ============================ */
const initModal = () => {
  const modal = document.getElementById('reserve-modal');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-reserve-modal');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: 0 });
      }
    });
  });
};

/* ============================
   INIT ALL
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initProductRevealAnimations();
  initEthosAnimations();
  initCatalogAnimations();
  initNavScroll();
  initModal();
});
