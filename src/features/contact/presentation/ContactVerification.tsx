import { useEffect, useRef, useState } from 'react';

interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  remove(id: string): void;
}

declare global { interface Window { turnstile?: TurnstileApi } }

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let loadPromise: Promise<TurnstileApi> | undefined;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    const timer = window.setTimeout(() => fail(), 15000);
    function fail() {
      window.clearTimeout(timer);
      script.remove();
      reject(new Error('Verification unavailable'));
    }
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timer);
      if (window.turnstile) resolve(window.turnstile);
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  }).catch((error: unknown) => { loadPromise = undefined; throw error; });
  return loadPromise;
}

export function ContactVerification({ language, attempt, onToken }: {
  language: 'en' | 'es';
  attempt: number;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [retry, setRetry] = useState(0);
  const [compact, setCompact] = useState<boolean | null>(null);
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const update = () => setCompact(element.clientWidth < 300);
    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let widget: string | undefined;
    let api: TurnstileApi | undefined;
    onToken('');
    if (!sitekey) { setState('error'); return; }
    if (compact === null) return;
    setState('loading');
    loadTurnstile().then((instance) => {
      if (cancelled || !container.current) return;
      api = instance;
      widget = api.render(container.current, {
        sitekey,
        language,
        action: 'contact',
        theme: 'light',
        size: compact ? 'compact' : 'flexible',
        callback: (token: string) => { if (!cancelled) { onToken(token); setState('ready'); } },
        'expired-callback': () => { if (!cancelled) { onToken(''); setState('error'); } },
        'timeout-callback': () => { if (!cancelled) { onToken(''); setState('error'); } },
        'error-callback': () => { if (!cancelled) { onToken(''); setState('error'); } return true; },
      });
      setState('ready');
    }).catch(() => { if (!cancelled) { onToken(''); setState('error'); } });
    return () => {
      cancelled = true;
      if (api && widget) api.remove(widget);
    };
  }, [language, attempt, compact, onToken, retry, sitekey]);

  return (
    <div className="contact-verification">
      <div ref={container} className={sitekey ? 'contact-verification-widget' : 'contact-verification-widget is-unavailable'} />
      {state === 'loading' && <p className="contact-verification-message" role="status">{language === 'es' ? 'Preparando la verificación…' : 'Preparing verification…'}</p>}
      {state === 'error' && (
        <div role="status">
          <p className="contact-verification-message">{language === 'es'
            ? 'No pudimos verificar tu visita. Inténtalo de nuevo o comunícate por teléfono o correo.'
            : 'We could not verify your visit. Please try again or contact us by phone or email.'}</p>
          {sitekey && <button type="button" className="contact-verification-retry" onClick={() => setRetry((value) => value + 1)}>{language === 'es' ? 'Intentar de nuevo' : 'Try again'}</button>}
        </div>
      )}
    </div>
  );
}
