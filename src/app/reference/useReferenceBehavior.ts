import { useLayoutEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { spanishAltText, spanishAriaLabels, spanishTitles, translations, type Language } from '../../shared/i18n/translations';
import routeManifest from '../routeManifest.json';

type TextDefaults = {
  route: string;
  text: WeakMap<Element, string>;
  textMarkup: WeakMap<Element, string>;
  html: WeakMap<Element, string>;
  placeholder: WeakMap<Element, string>;
  label: WeakMap<Element, string>;
  alt: WeakMap<Element, string>;
  title: string;
};

function captureDefaults(route: string): TextDefaults {
  const routeEntry = routeManifest.find((item) => item.name === route);
  const baseTitle = routeEntry?.title ?? document.title;
  const defaults: TextDefaults = {
    route,
    text: new WeakMap(),
    textMarkup: new WeakMap(),
    html: new WeakMap(),
    placeholder: new WeakMap(),
    label: new WeakMap(),
    alt: new WeakMap(),
    title: baseTitle,
  };
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    defaults.text.set(el, el.textContent ?? '');
    defaults.textMarkup.set(el, el.innerHTML);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => defaults.html.set(el, el.innerHTML));
  document.querySelectorAll('[data-ph]').forEach((el) => defaults.placeholder.set(el, el.getAttribute('placeholder') ?? ''));
  document.querySelectorAll('[aria-label]').forEach((el) => defaults.label.set(el, el.getAttribute('aria-label') ?? ''));
  document.querySelectorAll('img').forEach((el) => defaults.alt.set(el, el.getAttribute('alt') ?? ''));
  return defaults;
}

export function useReferenceLanguage(language: Language, route = 'home') {
  const defaults = useRef<TextDefaults | null>(null);
  useLayoutEffect(() => {
    if (!defaults.current || defaults.current.route !== route) {
      defaults.current = captureDefaults(route);
    }
    const original = defaults.current;
    document.documentElement.lang = language;
    document.title = language === 'es' ? (spanishTitles[original.title] ?? original.title) : original.title;
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n ?? '';
      const sourceMarkup = original.textMarkup.get(el) ?? '';
      if (language === 'en' && sourceMarkup.includes('<')) el.innerHTML = sourceMarkup;
      else el.textContent = language === 'es' ? (translations.es[key] ?? original.text.get(el) ?? '') : (translations.en[key] ?? original.text.get(el) ?? '');
    });
    document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml ?? '';
      el.innerHTML = language === 'es' ? (translations.es[key] ?? original.html.get(el) ?? '') : (translations.en[key] ?? original.html.get(el) ?? '');
    });
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-ph]').forEach((el) => {
      const key = el.dataset.ph ?? '';
      el.placeholder = language === 'es' ? (translations.es[key] ?? original.placeholder.get(el) ?? '') : (translations.en[key] ?? original.placeholder.get(el) ?? '');
    });
    document.querySelectorAll<HTMLElement>('[aria-label]').forEach((el) => {
      const english = original.label.get(el);
      if (english) el.setAttribute('aria-label', language === 'es' ? (spanishAriaLabels[english] ?? english) : english);
    });
    document.querySelectorAll<HTMLImageElement>('img').forEach((el) => {
      if (el.closest('.memorial-collection') || el.classList.contains('viewer-image')) return;
      const english = original.alt.get(el) ?? el.alt;
      const spanish = el.dataset.altEs ?? spanishAltText[english];
      el.alt = language === 'es' && spanish ? spanish : english;
    });
    const en = document.querySelector('#langEN');
    const es = document.querySelector('#langES');
    en?.classList.toggle('selected', language === 'en');
    es?.classList.toggle('selected', language === 'es');
    document.querySelectorAll<HTMLButtonElement>('.lang-seg button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    const group = document.querySelector('.lang-seg');
    group?.setAttribute('aria-label', language === 'es' ? 'Idioma' : 'Language');
    document.querySelector('#languageBtn')?.setAttribute('aria-label', language === 'es' ? 'Cambiar entre inglés y español' : 'Switch between English and Spanish');
    const menu = document.querySelector('#menuButton');
    if (menu) menu.setAttribute('aria-label', language === 'es'
      ? (menu.getAttribute('aria-expanded') === 'true' ? 'Cerrar navegación' : 'Abrir navegación')
      : (menu.getAttribute('aria-expanded') === 'true' ? 'Close navigation' : 'Open navigation'));
    const studyName = document.querySelector<HTMLInputElement>('#engraveName');
    if (studyName) {
      if (language === 'es' && studyName.value === 'In loving memory') studyName.value = 'En recuerdo de';
      if (language === 'en' && studyName.value === 'En recuerdo de') studyName.value = 'In loving memory';
      const preview = document.querySelector('#previewName');
      if (preview) preview.textContent = studyName.value.trim() || ' ';
    }
    try { localStorage.setItem('afm-lang', language); } catch { /* File previews may deny storage. */ }
  }, [language, route]);
}

function setupHeroCarousel(signal: AbortSignal, reducedMotion: MediaQueryList): () => void {
  const carousel = document.querySelector<HTMLElement>('#heroShowcase');
  if (!carousel) return () => {};
  const slides = [...carousel.querySelectorAll<HTMLElement>('.hero-slide')];
  const dots = [...carousel.querySelectorAll<HTMLButtonElement>('.hero-slide-dot')];
  const prevBtn = carousel.querySelector<HTMLButtonElement>('#heroSlidePrev');
  const nextBtn = carousel.querySelector<HTMLButtonElement>('#heroSlideNext');
  const counterEl = carousel.querySelector<HTMLElement>('#heroSlideCounter');
  if (slides.length <= 1) return () => {};

  let activeIndex = 0;
  let paused = false;

  const showSlide = (nextIndex: number) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      const isCurrent = idx === activeIndex;
      slide.classList.toggle('is-active', isCurrent);
      slide.setAttribute('aria-hidden', String(!isCurrent));
    });
    dots.forEach((dot, idx) => {
      const isCurrent = idx === activeIndex;
      dot.classList.toggle('is-active', isCurrent);
      dot.setAttribute('aria-selected', String(isCurrent));
    });
    if (counterEl) {
      const currentNum = String(activeIndex + 1).padStart(2, '0');
      const totalNum = String(slides.length).padStart(2, '0');
      counterEl.textContent = `${currentNum} / ${totalNum}`;
    }
  };

  prevBtn?.addEventListener('click', () => showSlide(activeIndex - 1), { signal });
  nextBtn?.addEventListener('click', () => showSlide(activeIndex + 1), { signal });
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx), { signal });
  });

  carousel.addEventListener('mouseenter', () => { paused = true; }, { signal });
  carousel.addEventListener('mouseleave', () => { paused = false; }, { signal });
  carousel.addEventListener('focusin', () => { paused = true; }, { signal });
  carousel.addEventListener('focusout', (e) => {
    if (!(e.relatedTarget instanceof Node) || !carousel.contains(e.relatedTarget)) {
      paused = false;
    }
  }, { signal });

  const timer = window.setInterval(() => {
    if (!paused && !reducedMotion.matches) {
      showSlide(activeIndex + 1);
    }
  }, 4600);

  return () => {
    window.clearInterval(timer);
  };
}

export function useReferenceInteractions(
  setLanguage: Dispatch<SetStateAction<Language>>,
  route = 'home',
  onNavigate?: (pathname: string, hash?: string) => void,
) {
  useLayoutEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const nav = document.querySelector<HTMLElement>('#mainNav');
    const menu = document.querySelector<HTMLButtonElement>('#menuButton');
    const paintMenu = () => {
      if (!menu) return;
      const spanish = document.documentElement.lang === 'es';
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-label', spanish ? (open ? 'Cerrar navegación' : 'Abrir navegación') : (open ? 'Close navigation' : 'Open navigation'));
    };
    const closeNavigation = () => {
      nav?.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
      paintMenu();
    };

    document.querySelector('#languageBtn')?.addEventListener('click', () => setLanguage((old) => old === 'en' ? 'es' : 'en'), { signal });
    document.querySelectorAll<HTMLButtonElement>('.lang-seg button').forEach((button) => button.addEventListener('click', () => {
      if (button.dataset.lang === 'en' || button.dataset.lang === 'es') setLanguage(button.dataset.lang);
    }, { signal }));
    menu?.addEventListener('click', () => {
      const open = nav?.classList.toggle('open') ?? false;
      menu.setAttribute('aria-expanded', String(open));
      paintMenu();
    }, { signal });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav?.classList.contains('open')) {
        closeNavigation();
        menu?.focus();
      }
    }, { signal });

    const group = document.querySelector<HTMLElement>('.nav-group');
    const toggle = document.querySelector<HTMLButtonElement>('#exploreToggle');
    let closeTimeout = 0;
    const setExplore = (open: boolean) => {
      if (closeTimeout) {
        window.clearTimeout(closeTimeout);
        closeTimeout = 0;
      }
      group?.classList.toggle('open', open);
      toggle?.setAttribute('aria-expanded', String(open));
    };
    toggle?.addEventListener('click', () => setExplore(!group?.classList.contains('open')), { signal });
    group?.addEventListener('mouseenter', () => {
      if (window.innerWidth > 950) setExplore(true);
    }, { signal });
    group?.addEventListener('mouseleave', () => {
      if (window.innerWidth > 950) {
        closeTimeout = window.setTimeout(() => setExplore(false), 180);
      }
    }, { signal });
    document.addEventListener('click', (event) => { if (event.target instanceof Node && !group?.contains(event.target)) setExplore(false); }, { signal });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && group?.classList.contains('open')) { setExplore(false); toggle?.focus(); }
    }, { signal });
    group?.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && !group.contains(event.relatedTarget)) setExplore(false);
    }, { signal });

    // Client-Side Routing interception for internal links
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a') : null;
      if (!target) return;
      const rawHref = target.getAttribute('href');
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || target.target === '_blank' || target.hasAttribute('download')) {
        return;
      }

      if (rawHref.startsWith('#')) {
        closeNavigation();
        setExplore(false);
        if (rawHref === '#top') {
          event.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          const el = document.getElementById(rawHref.slice(1));
          if (el) {
            event.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState({}, '', `${window.location.pathname}${rawHref}`);
          }
        }
        return;
      }

      try {
        const url = new URL(rawHref, window.location.origin);
        if (url.origin !== window.location.origin) return;
        event.preventDefault();
        closeNavigation();
        setExplore(false);
        if (onNavigate) {
          onNavigate(url.pathname, url.hash);
        }
      } catch {
        // Fallback to native browser navigation
      }
    }, { signal });

    const name = document.querySelector<HTMLInputElement>('#engraveName');
    const dates = document.querySelector<HTMLInputElement>('#engraveDates');
    const updateStudy = () => {
      const namePreview = document.querySelector('#previewName');
      const datesPreview = document.querySelector('#previewDates');
      if (namePreview) namePreview.textContent = name?.value.trim() || ' ';
      if (datesPreview) datesPreview.textContent = dates?.value.trim() || ' ';
    };
    name?.addEventListener('input', updateStudy, { signal });
    dates?.addEventListener('input', updateStudy, { signal });
    const slab = document.querySelector<HTMLElement>('#headstone');
    const colors: Record<string, string> = {
      granite: 'var(--granite)',
      stone: 'var(--stone)',
      rose: '#7D5650',
      mahogany: '#4E3832',
      linen: 'var(--linen)',
    };
    document.querySelectorAll<HTMLButtonElement>('.swatch').forEach((swatch) => swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((button) => button.setAttribute('aria-pressed', String(button === swatch)));
      slab?.style.setProperty('--slab-bg', colors[swatch.dataset.stone ?? ''] ?? colors.granite);
      slab?.classList.toggle('light-slab', swatch.dataset.stone === 'linen');
    }, { signal }));

    
    // Contextual Inquiry storage on links with data-context-en / data-context-es
    document.querySelectorAll<HTMLAnchorElement>('a[data-context-en]').forEach((link) => {
      link.addEventListener('click', () => {
        const titleEn = link.dataset.contextEn ?? '';
        const titleEs = link.dataset.contextEs ?? titleEn;
        const id = link.dataset.contextId ?? 'service';
        try {
          sessionStorage.setItem('afm-inquiry-context', JSON.stringify({ id, titleEn, titleEs }));
          window.dispatchEvent(new CustomEvent('afm-context-change'));
        } catch { /* ignore */ }
      }, { signal });
    });

    // Engraving simulator contextual inquiry button (#studioInquireBtn)
    const studioInquireBtn = document.querySelector<HTMLAnchorElement>('#studioInquireBtn');
    studioInquireBtn?.addEventListener('click', () => {
      const currentLine1 = (document.querySelector<HTMLInputElement>('#engraveName')?.value ?? '').trim();
      const currentLine2 = (document.querySelector<HTMLInputElement>('#engraveDates')?.value ?? '').trim();
      const activeSwatch = document.querySelector<HTMLElement>('.swatch[aria-pressed="true"]')?.dataset.stone ?? 'granite';
      const titleEn = `Inscription study (${activeSwatch}): "${currentLine1 || 'Custom'}" ${currentLine2 ? '· ' + currentLine2 : ''}`;
      const titleEs = `Estudio de inscripción (${activeSwatch}): "${currentLine1 || 'Personalizado'}" ${currentLine2 ? '· ' + currentLine2 : ''}`;
      try {
        sessionStorage.setItem('afm-inquiry-context', JSON.stringify({ id: 'engraving-study', titleEn, titleEs }));
        window.dispatchEvent(new CustomEvent('afm-context-change'));
      } catch { /* ignore */ }
    }, { signal });

    // Monuments by Faith filter pills (.faith-filter-btn)
    const faithFilterBtns = [...document.querySelectorAll<HTMLButtonElement>('.faith-filter-btn')];
    const faithCards = [...document.querySelectorAll<HTMLElement>('.faith-card[data-faith]')];
    faithFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFaith = btn.dataset.faithFilter ?? 'all';
        faithFilterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        faithCards.forEach((card) => {
          const matches = selectedFaith === 'all' || card.dataset.faith === selectedFaith;
          card.style.display = matches ? '' : 'none';
        });
      }, { signal });
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanupCarousel = setupHeroCarousel(signal, reducedMotion);

    let revealObserver: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      document.documentElement.classList.add('js-enabled');
      revealObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }, { threshold: .07, rootMargin: '0px 0px -20px 0px' });
      document.querySelectorAll('.reveal').forEach((element) => revealObserver?.observe(element));
    }
    const timeline = document.querySelector<HTMLElement>('#processTimeline');
    const steps = timeline ? [...timeline.querySelectorAll<HTMLElement>('.step')] : [];
    let frame = 0;
    const drawTimeline = () => {
      frame = 0;
      if (!timeline) return;
      const desktop = window.innerWidth > 950;
      const guideY = desktop ? Math.max(330, Math.min(window.innerHeight * .41, 360)) : window.innerHeight * .55;
      const positions = steps.map((step) => step.getBoundingClientRect().top);
      const start = (positions[0] ?? 0) + 37;
      const length = Math.max(1, (positions.at(-1) ?? 0) + 37 - start);
      const rect = timeline.getBoundingClientRect();
      const progress = desktop
        ? Math.min(1, Math.max(0, (guideY - start) / length))
        : Math.min(1, Math.max(0, (guideY - rect.top) / Math.max(1, rect.height - 85)));
      timeline.style.setProperty('--track-height', `${length}px`);
      timeline.style.setProperty('--progress', `${(progress * 100).toFixed(1)}%`);
      if (desktop) {
        const current = positions.reduce((last, top, index) => top + 37 <= guideY ? index : last, 0);
        steps.forEach((step, index) => {
          step.classList.remove('is-active');
          step.classList.toggle('is-current', index === current);
          step.classList.toggle('is-complete', index < current);
          if (index === current) step.setAttribute('aria-current', 'step');
          else step.removeAttribute('aria-current');
        });
      } else {
        steps.forEach((step, index) => {
          step.classList.remove('is-current', 'is-complete');
          step.removeAttribute('aria-current');
          step.classList.toggle('is-active', positions[index] < guideY);
        });
      }
    };
    const scheduleTimeline = () => { if (!frame) frame = requestAnimationFrame(drawTimeline); };
    window.addEventListener('scroll', scheduleTimeline, { passive: true, signal });
    window.addEventListener('resize', scheduleTimeline, { signal });
    const timelineResize = timeline && 'ResizeObserver' in window ? new ResizeObserver(scheduleTimeline) : null;
    if (timeline) timelineResize?.observe(timeline);
    drawTimeline();

    if (location.hash && location.hash !== '#top') {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    }

    return () => {
      if (closeTimeout) window.clearTimeout(closeTimeout);
      controller.abort();
      cleanupCarousel();
      revealObserver?.disconnect();
      timelineResize?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove('js-enabled');
    };
  }, [setLanguage, route, onNavigate]);
}
