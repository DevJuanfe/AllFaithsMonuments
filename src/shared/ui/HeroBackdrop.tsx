import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * DC-051: the original photograph stays intact; the sunset is painted with
 * slowly animated colour and light layers instead of a cut-out sky video.
 * DC-052: a real sunset timelapse is blended (not pasted) over the photograph's
 * own sky, so the clouds move without reintroducing halos around the trees.
 */
export function HeroBackdrop() {
  const { language } = useLanguage();
  const backdrop = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const moving = !reduced && !paused && visible;

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    let inView = true;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    });
    if (backdrop.current) observer?.observe(backdrop.current);
    document.addEventListener('visibilitychange', updateVisibility);
    updateVisibility();
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Two layers of the same clip cross-fade so the ~10 s loop never shows a cut.
  useEffect(() => {
    if (!first.current || !second.current) return;
    const layers = [first.current, second.current];
    if (!moving || failed) {
      layers.forEach((video) => video.pause());
      return;
    }
    let disposed = false;
    let frame = 0;
    let active = Number(layers[1].style.opacity || 0) > Number(layers[0].style.opacity || 1) ? 1 : 0;
    let blending = false;
    let incomingReady = false;
    let blendStart = 0;
    const blendSeconds = 1.8;
    const fail = () => { if (!disposed) setFailed(true); };
    layers.forEach((video, index) => {
      video.muted = true;
      video.playbackRate = 1;
      video.style.opacity = index === active ? '1' : '0';
    });
    layers[active].play().catch(fail);

    const tick = () => {
      if (disposed) return;
      const current = layers[active];
      const incoming = layers[1 - active];
      if (!blending && Number.isFinite(current.duration) && current.currentTime >= current.duration - blendSeconds) {
        blending = true;
        incoming.currentTime = 0;
        incoming.play().then(() => {
          if (disposed) { incoming.pause(); return; }
          blendStart = incoming.currentTime;
          incomingReady = true;
        }).catch(fail);
      }
      if (blending && incomingReady) {
        const progress = Math.min(1, (incoming.currentTime - blendStart) / blendSeconds);
        current.style.zIndex = '0';
        incoming.style.zIndex = '1';
        incoming.style.opacity = String(progress);
        if (progress >= 1) {
          current.pause();
          current.style.opacity = '0';
          active = 1 - active;
          blending = false;
          incomingReady = false;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      layers.forEach((video) => video.pause());
    };
  }, [moving, failed, reduced]);

  const label = language === 'es'
    ? (paused ? 'Reanudar animación del atardecer' : 'Pausar animación del atardecer')
    : (paused ? 'Resume sunset animation' : 'Pause sunset animation');

  return <>
    <div ref={backdrop} className="hero-backdrop hero-sunset" data-moving={moving} aria-hidden="true">
      <img className="hero-backdrop-photo" src="/assets/img/Photo1-graveyard.webp" alt="" width="1600" height="1066" fetchPriority="high" decoding="async" />
      <div className="hero-sunset-tint" />
      <div className="hero-sunset-clouds">
        <div className="hero-sunset-drift">
          {!reduced && !failed && <>
            <video ref={first} className="hero-sunset-film" src="/assets/sky-film.mp4" muted playsInline preload="metadata" onError={() => setFailed(true)} />
            <video ref={second} className="hero-sunset-film" src="/assets/sky-film.mp4" muted playsInline preload="metadata" onError={() => setFailed(true)} />
          </>}
        </div>
      </div>
      <div className="hero-sunset-dusk" />
      <div className="hero-sunset-grade" />
      <div className="hero-sunset-shadows" />
      <div className="hero-sunset-sun" />
      <div className="hero-sunset-light" />
      <div className="hero-backdrop-veil" />
    </div>
    {!reduced && <button type="button" className="hero-motion-toggle" aria-label={label} title={label} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" fill="currentColor">
        {paused ? <path d="M6 3.5 16 10 6 16.5Z" /> : <path d="M5 4h3v12H5zm7 0h3v12h-3z" />}
      </svg>
    </button>}
  </>;
}
