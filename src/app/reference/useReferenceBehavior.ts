import { useLayoutEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { spanishAltText, spanishAriaLabels, spanishTitles, translations, type Language } from '../../shared/i18n/translations';

type TextDefaults = {
  text: WeakMap<Element, string>;
  textMarkup: WeakMap<Element, string>;
  html: WeakMap<Element, string>;
  placeholder: WeakMap<Element, string>;
  label: WeakMap<Element, string>;
  alt: WeakMap<Element, string>;
  title: string;
};

function captureDefaults(): TextDefaults {
  const defaults: TextDefaults = {
    text: new WeakMap(), textMarkup: new WeakMap(), html: new WeakMap(), placeholder: new WeakMap(),
    label: new WeakMap(), alt: new WeakMap(), title: document.title,
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

export function useReferenceLanguage(language: Language) {
  const defaults = useRef<TextDefaults | null>(null);
  useLayoutEffect(() => {
    defaults.current ??= captureDefaults();
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
  }, [language]);
}

function setupSkyFilm(signal: AbortSignal, reducedMotion: MediaQueryList): () => void {
  const first = document.querySelector<HTMLVideoElement>('#skyVideo');
  if (!first?.parentElement) return () => {};
  const second = first.cloneNode(false) as HTMLVideoElement;
  second.removeAttribute('id');
  second.removeAttribute('autoplay');
  second.removeAttribute('aria-label');
  second.setAttribute('aria-hidden', 'true');
  second.setAttribute('tabindex', '-1');
  second.muted = true;
  second.preload = 'auto';
  first.removeAttribute('loop');
  second.removeAttribute('loop');
  first.style.zIndex = '2';
  second.style.zIndex = '1';
  second.style.opacity = '0';
  first.parentElement.appendChild(second);
  let front = first, back = second, fading = false;
  const timeouts = new Set<number>();
  const finish = () => {
    back.pause();
    try { back.currentTime = 0; } catch { /* Loading has not completed. */ }
    back.style.transition = 'none';
    back.style.opacity = '0';
    fading = false;
  };
  const startFade = () => {
    if (fading || reducedMotion.matches) return;
    fading = true;
    const incoming = back, outgoing = front;
    try { incoming.currentTime = 0; } catch { /* Loading has not completed. */ }
    incoming.style.transition = 'none';
    incoming.style.opacity = '0';
    incoming.style.zIndex = '2';
    outgoing.style.zIndex = '1';
    incoming.play().catch(() => {});
    void incoming.offsetWidth;
    incoming.style.transition = 'opacity 1.6s linear';
    incoming.style.opacity = '1';
    front = incoming;
    back = outgoing;
    const timeout = window.setTimeout(() => { timeouts.delete(timeout); finish(); }, 1680);
    timeouts.add(timeout);
  };
  const interval = window.setInterval(() => {
    if (front.paused || fading) return;
    const duration = front.duration;
    if (duration && Number.isFinite(duration) && duration > 3.2 && front.currentTime >= duration - 1.6) startFade();
  }, 100);
  for (const video of [first, second]) {
    video.addEventListener('ended', () => { if (video === front && !fading) startFade(); }, { signal });
    video.addEventListener('pause', () => { if (video === front && fading) back.pause(); }, { signal });
    video.addEventListener('play', () => { if (video === front && fading) back.play().catch(() => {}); }, { signal });
  }
  if (reducedMotion.matches) first.pause(); else first.play().catch(() => {});
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) { first.pause(); second.pause(); }
  }, { signal });
  return () => {
    window.clearInterval(interval);
    timeouts.forEach((timeout) => window.clearTimeout(timeout));
    first.pause(); second.pause(); second.remove();
    first.setAttribute('loop', '');
    first.style.zIndex = '';
  };
}

export function useReferenceInteractions(setLanguage: Dispatch<SetStateAction<Language>>) {
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
    document.querySelector('#languageBtn')?.addEventListener('click', () => setLanguage((old) => old === 'en' ? 'es' : 'en'), { signal });
    document.querySelectorAll<HTMLButtonElement>('.lang-seg button').forEach((button) => button.addEventListener('click', () => {
      if (button.dataset.lang === 'en' || button.dataset.lang === 'es') setLanguage(button.dataset.lang);
    }, { signal }));
    menu?.addEventListener('click', () => {
      const open = nav?.classList.toggle('open') ?? false;
      menu.setAttribute('aria-expanded', String(open));
      paintMenu();
    }, { signal });
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
      paintMenu();
    }, { signal }));
    const group = document.querySelector<HTMLElement>('.nav-group');
    const toggle = document.querySelector<HTMLButtonElement>('#exploreToggle');
    const setExplore = (open: boolean) => {
      group?.classList.toggle('open', open);
      toggle?.setAttribute('aria-expanded', String(open));
    };
    toggle?.addEventListener('click', () => setExplore(!group?.classList.contains('open')), { signal });
    document.addEventListener('click', (event) => { if (event.target instanceof Node && !group?.contains(event.target)) setExplore(false); }, { signal });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && group?.classList.contains('open')) { setExplore(false); toggle?.focus(); }
    }, { signal });
    group?.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && !group.contains(event.relatedTarget)) setExplore(false);
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
    const colors: Record<string, string> = { granite: 'var(--granite)', stone: 'var(--stone)', linen: 'var(--linen)' };
    document.querySelectorAll<HTMLButtonElement>('.swatch').forEach((swatch) => swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((button) => button.setAttribute('aria-pressed', String(button === swatch)));
      slab?.style.setProperty('--slab-bg', colors[swatch.dataset.stone ?? ''] ?? colors.granite);
      slab?.classList.toggle('light-slab', swatch.dataset.stone === 'linen');
    }, { signal }));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanupSky = setupSkyFilm(signal, reducedMotion);
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
      // Read geometry together before writing styles; the axis joins the dot centers.
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
    const fab = document.querySelector<HTMLElement>('.contact-fab');
    const footer = document.querySelector<HTMLElement>('.footer');
    const fabObserver = fab && footer && 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => fab.classList.toggle('is-hidden', entry.isIntersecting), { rootMargin: '0px 0px -40px 0px' }) : null;
    if (fabObserver && footer) fabObserver.observe(footer);
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());

    return () => {
      controller.abort();
      cleanupSky();
      revealObserver?.disconnect();
      fabObserver?.disconnect();
      timelineResize?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove('js-enabled');
    };
  }, [setLanguage]);
}
