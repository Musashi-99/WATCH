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
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ============================
   WATCH DATA
   ============================ */
const watches = {
  1: {
    name: 'Royal Oak',
    subtitle: 'Double Balance Wheel Openworked',
    eyebrow: 'Haute Horlogerie · 18K Rose Gold',
    ref: 'Ref. 15407OR.OO.1220OR.01',
    image: '/assets/photo/ethos-watch.png',
    imageDark: true,
    description: 'A 41mm masterpiece in 18-karat pink gold. The openworked Calibre 3132 reveals 255 hand-finished components through an anti-reflective sapphire crystal. Two balance wheels and two hairsprings deliver unparalleled precision — a mechanical triumph visible through the skeletonized architecture.',
    specs: [
      { label: 'Case', value: '41mm · 18K Pink Gold' },
      { label: 'Movement', value: 'Calibre 3132' },
      { label: 'Power Reserve', value: '60 Hours' },
      { label: 'Crystal', value: 'Anti-reflective Sapphire' },
      { label: 'Water Resistance', value: '50 Metres' },
      { label: 'Bracelet', value: '18K Pink Gold' },
    ],
    features: [
      { label: 'Components', value: '255', icon: 'gear' },
      { label: 'Balance Wheels', value: '2', icon: 'balance' },
      { label: 'Power Reserve', value: '60h', icon: 'power' },
    ],
    modalNameLine1: 'Royal Oak',
    modalNameLine2: 'Openworked',
    selectValue: 'rose-gold-openworked',
  },
  2: {
    name: 'Royal Oak',
    subtitle: 'Selfwinding 36mm',
    eyebrow: 'Selfwinding · Stainless Steel',
    ref: 'Ref. 26674ST.OO.1320ST.01',
    image: '/assets/photo/watch-ro-steel.avif',
    imageDark: false,
    description: 'The Royal Oak Selfwinding 36mm in stainless steel — an icon refined to its purest expression. Calibre 5800 beats within the legendary octagonal bezel, delivering 50 hours of power reserve. The Grande Tapisserie dial, integrated steel bracelet, and hand-chamfered bezel screws make every glance a revelation.',
    specs: [
      { label: 'Case', value: '36mm · Stainless Steel' },
      { label: 'Movement', value: 'Calibre 5800' },
      { label: 'Power Reserve', value: '50 Hours' },
      { label: 'Crystal', value: 'Anti-reflective Sapphire' },
      { label: 'Water Resistance', value: '50 Metres' },
      { label: 'Dial', value: 'Grande Tapisserie' },
    ],
    features: [
      { label: 'Case Size', value: '36mm', icon: 'dial' },
      { label: 'Calibre', value: '5800', icon: 'gear' },
      { label: 'Power Reserve', value: '50h', icon: 'power' },
    ],
    modalNameLine1: 'Royal Oak',
    modalNameLine2: 'Selfwinding 36mm',
    selectValue: 'steel-36mm',
  },
  3: {
    name: 'Royal Oak',
    subtitle: 'Selfwinding Mini',
    eyebrow: 'Novelty · Stainless Steel',
    ref: 'Ref. 77351ST.OO.1261ST.01',
    image: '/assets/photo/watch-ro-mini.avif',
    imageDark: false,
    description: 'The Royal Oak Mini — where architectural heritage meets refined elegance. A 34mm expression of the iconic octagonal bezel in stainless steel, housing Calibre 5800. The Grande Tapisserie dial and supple integrated bracelet are scaled to perfection, making this novelty the definitive statement piece.',
    specs: [
      { label: 'Case', value: '34mm · Stainless Steel' },
      { label: 'Movement', value: 'Calibre 5800' },
      { label: 'Power Reserve', value: '50 Hours' },
      { label: 'Crystal', value: 'Anti-reflective Sapphire' },
      { label: 'Water Resistance', value: '50 Metres' },
      { label: 'Dial', value: 'Grande Tapisserie' },
    ],
    features: [
      { label: 'Case Size', value: '34mm', icon: 'dial' },
      { label: 'Calibre', value: '5800', icon: 'gear' },
      { label: 'Power Reserve', value: '50h', icon: 'power' },
    ],
    modalNameLine1: 'Royal Oak',
    modalNameLine2: 'Mini',
    selectValue: 'steel-mini',
  },
};

/* ============================
   DOM HELPERS
   ============================ */
function el(tag, classes, text) {
  const node = document.createElement(tag);
  if (classes) classes.split(' ').forEach(c => c && node.classList.add(c));
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeSVGIcon(type) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.2');

  const paths = {
    gear: ['circle cx="12" cy="12" r="3"', 'path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"'],
    balance: ['circle cx="12" cy="12" r="10"', 'circle cx="12" cy="12" r="4"', 'line x1="12" y1="2" x2="12" y2="8"', 'line x1="12" y1="16" x2="12" y2="22"'],
    power: ['path d="M18.36 6.64a9 9 0 11-12.73 0"', 'line x1="12" y1="2" x2="12" y2="12"'],
    dial: ['circle cx="12" cy="12" r="10"', 'polyline points="12 6 12 12 16 14"'],
  };

  (paths[type] || paths.gear).forEach(desc => {
    const [tagName, ...rest] = desc.split(' ');
    const elem = document.createElementNS(ns, tagName);
    rest.join(' ').match(/([a-zA-Z-]+)="([^"]*)"/g)?.forEach(attr => {
      const [k, v] = attr.split('=');
      elem.setAttribute(k, v.replace(/"/g, ''));
    });
    svg.appendChild(elem);
  });

  return svg;
}

/* ============================
   POPULATE PAGE FROM URL PARAM
   ============================ */
const populatePage = () => {
  const params = new URLSearchParams(window.location.search);
  const watchId = parseInt(params.get('watch')) || 1;
  const watch = watches[watchId] || watches[1];

  document.title = `Audemars Piguet — ${watch.name} ${watch.subtitle}`;

  // Breadcrumb
  const breadcrumb = document.getElementById('detail-breadcrumb-name');
  if (breadcrumb) breadcrumb.textContent = watch.subtitle;

  // Image
  const imgEl = document.getElementById('detail-watch-img');
  const frameEl = document.getElementById('detail-image-frame');
  if (imgEl) { imgEl.src = watch.image; imgEl.alt = `${watch.name} ${watch.subtitle}`; }
  if (frameEl && watch.imageDark) frameEl.classList.add('detail-image-frame--dark');

  // Slide indicator dots
  const dots = document.querySelectorAll('.detail-slide-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === watchId - 1));

  // Text fields
  const setText = (id, text) => { const n = document.getElementById(id); if (n) n.textContent = text; };
  setText('detail-eyebrow', watch.eyebrow);
  setText('detail-title', watch.name);
  setText('detail-subtitle', watch.subtitle);
  setText('detail-ref', watch.ref);
  setText('detail-description', watch.description);

  // Specs grid — safe DOM construction
  const specsGrid = document.getElementById('detail-specs-grid');
  if (specsGrid) {
    specsGrid.textContent = '';
    watch.specs.forEach(s => {
      const item = el('div', 'detail-spec-item');
      item.appendChild(el('span', 'detail-spec-label', s.label));
      item.appendChild(el('span', 'detail-spec-value', s.value));
      specsGrid.appendChild(item);
    });
  }

  // Features grid — safe DOM construction
  const featsGrid = document.getElementById('detail-features-grid');
  if (featsGrid) {
    featsGrid.textContent = '';
    watch.features.forEach(f => {
      const item = el('div', 'detail-feature-item');
      const iconWrap = el('div', 'detail-feature-icon');
      iconWrap.appendChild(makeSVGIcon(f.icon));
      item.appendChild(iconWrap);
      item.appendChild(el('p', 'detail-feature-label', f.label));
      item.appendChild(el('p', 'detail-feature-value', f.value));
      featsGrid.appendChild(item);
    });
  }

  // Modal image + name (plain text, no HTML injection)
  const modalImg = document.getElementById('modal-watch-img');
  const modalNameEl = document.getElementById('modal-watch-name');
  if (modalImg) modalImg.src = watch.image;
  if (modalNameEl) {
    modalNameEl.textContent = '';
    modalNameEl.appendChild(document.createTextNode(watch.modalNameLine1));
    modalNameEl.appendChild(document.createElement('br'));
    modalNameEl.appendChild(document.createTextNode(watch.modalNameLine2));
  }

  // Pre-select variant in modal form
  const variantSelect = document.getElementById('variant');
  if (variantSelect) variantSelect.value = watch.selectValue;
};

/* ============================
   ENTRANCE ANIMATIONS
   ============================ */
const initAnimations = () => {
  const nav = document.querySelector('.nav');
  gsap.set(nav, { y: -100, opacity: 0 });
  gsap.to(nav, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 });

  gsap.from('.detail-image-frame', {
    x: -60,
    opacity: 0,
    duration: 1.4,
    ease: 'power4.out',
    delay: 0.4,
  });

  gsap.from('.detail-info-col > *', {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.5,
  });

  gsap.from('.detail-feature-item', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.detail-features',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
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
   MODAL
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
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
};

/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  populatePage();
  initAnimations();
  initNavScroll();
  initModal();
});
