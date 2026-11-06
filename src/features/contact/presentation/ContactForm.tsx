import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '../../../shared/i18n/LanguageContext';
import { translations } from '../../../shared/i18n/translations';
import { submitInquiry } from '../application/submitInquiry';
import type { ContactGateway } from '../domain/Inquiry';
import { ContactVerification } from './ContactVerification';
import './contact-verification.css';

interface InquiryContextItem {
  id: string;
  titleEn: string;
  titleEs: string;
}

function readStoredContext(): InquiryContextItem | null {
  try {
    const raw = sessionStorage.getItem('afm-inquiry-context');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.titleEn === 'string' && typeof parsed.titleEs === 'string') {
      return { id: String(parsed.id ?? ''), titleEn: parsed.titleEn, titleEs: parsed.titleEs };
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

export function ContactForm({ gateway }: { gateway: ContactGateway }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaAttempt, setCaptchaAttempt] = useState(0);
  const onCaptchaToken = useCallback((token: string) => setCaptchaToken(token), []);
  const [contextItem, setContextItem] = useState<InquiryContextItem | null>(() => readStoredContext());
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    const syncContext = () => setContextItem(readStoredContext());
    window.addEventListener('afm-context-change', syncContext);
    return () => {
      window.removeEventListener('afm-context-change', syncContext);
      request.current?.abort();
    };
  }, []);

  const clearContext = () => {
    try {
      sessionStorage.removeItem('afm-inquiry-context');
    } catch {
      // Ignore
    }
    setContextItem(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    if (!captchaToken) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const honeypot = String(data.get('website_url') ?? '').trim();
    if (honeypot) {
      // Silently reject automated bot fills
      setStatus('success');
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const cemetery = String(data.get('cemetery') ?? '').trim();
    const rawMessage = String(data.get('message') ?? '').trim();

    const metaLines: string[] = [];
    if (contextItem) {
      metaLines.push(`[Reference: ${language === 'es' ? contextItem.titleEs : contextItem.titleEn}]`);
    }
    if (service) metaLines.push(`[Service: ${service}]`);
    if (phone) metaLines.push(`[Phone: ${phone}]`);
    if (cemetery) metaLines.push(`[Cemetery: ${cemetery}]`);

    const composedMessage = metaLines.length > 0
      ? `${metaLines.join(' ')}\n\n${rawMessage}`
      : rawMessage;

    request.current = new AbortController();
    setPending(true);
    setStatus(null);
    try {
      await submitInquiry(gateway, {
        name,
        email,
        message: composedMessage,
        locale: language,
        captchaToken,
      }, request.current.signal);
      setStatus('success');
      form.reset();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error');
    } finally {
      setPending(false);
      request.current = null;
      setCaptchaToken('');
      setCaptchaAttempt((value) => value + 1);
    }
  };

  const statusText = status === 'success'
    ? translations[language].inquiryStatus
    : status === 'error'
      ? (language === 'es'
          ? 'No pudimos enviar tu consulta en este momento. Por favor llámanos al 718-628-9671 o escríbenos a afmonuments1@gmail.com.'
          : 'We could not send your inquiry right now. Please call us at 718-628-9671 or email afmonuments1@gmail.com.')
      : '';

  return (
    <form id="inquiryForm" className="contact-form reveal" onSubmit={submit}>
      <h3 data-i18n="formHeading">Write to us</h3>
      <p data-i18n="formSubheading">Tell us how we can help. You can also call or email us.</p>

      {contextItem && (
        <div className="inquiry-context-banner" role="region" aria-label={language === 'es' ? 'Referencia seleccionada' : 'Selected reference'}>
          <div className="inquiry-context-text">
            <small>{language === 'es' ? 'CONSULTANDO SOBRE:' : 'INQUIRING ABOUT:'}</small>
            <strong>{language === 'es' ? contextItem.titleEs : contextItem.titleEn}</strong>
          </div>
          <button
            type="button"
            className="inquiry-context-clear"
            onClick={clearContext}
            aria-label={language === 'es' ? 'Quitar referencia seleccionada' : 'Remove selected reference'}
          >
            ×
          </button>
        </div>
      )}

      {/* Honeypot anti-spam field (SEG-006) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="formWebsiteUrl">Website</label>
        <input id="formWebsiteUrl" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="formName" data-i18n="name">Your name *</label>
          <input id="formName" name="name" type="text" required maxLength={120} data-ph="namePh" placeholder="Name and surname" autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="formEmail" data-i18n="email">Email address *</label>
          <input id="formEmail" type="email" name="email" autoComplete="email" required maxLength={160} placeholder="name@example.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="formPhone" data-i18n="formPhoneLabel">Phone number (optional)</label>
          <input id="formPhone" name="phone" type="tel" maxLength={40} data-ph="formPhonePh" placeholder="(718) 000-0000" autoComplete="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="formCemetery" data-i18n="formCemeteryLabel">Cemetery (if known)</label>
          <input id="formCemetery" name="cemetery" type="text" maxLength={120} data-ph="formCemeteryPh" placeholder="e.g. All Faiths, Calvary, Mount Zion..." />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="formService" data-i18n="formServiceLabel">How can we support your family?</label>
        <select id="formService" name="service" className="form-select" defaultValue="">
          <option value="" data-i18n="formServiceOpt0">Select an option (optional)</option>
          <option value="New single or companion monument" data-i18n="formServiceOpt1">New single or companion monument</option>
          <option value="Additional inscription on existing stone (in situ)" data-i18n="formServiceOpt2">Additional inscription on an existing monument</option>
          <option value="Custom engraving, portrait or calligraphy" data-i18n="formServiceOpt3">Custom engraving, portrait or calligraphy</option>
          <option value="Family mausoleum or architectural work" data-i18n="formServiceOpt4">Family mausoleum or architectural memorial</option>
          <option value="General guidance & cemetery regulations" data-i18n="formServiceOpt5">General guidance &amp; cemetery regulations</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="formMessage" data-i18n="message">How can we help? *</label>
        <textarea id="formMessage" name="message" required maxLength={2000} data-ph="messagePh" placeholder="Tell us a little about what you need..."></textarea>
      </div>

      <ContactVerification language={language} attempt={captchaAttempt} onToken={onCaptchaToken} />
      <button className="btn dark" type="submit" data-i18n="formSubmit" disabled={pending || !captchaToken}>Send inquiry</button>
      <p className="privacy-note" data-i18n="formPrivacyRespect">Personal attention from our family team — never automated quotes. Your information is used solely to answer your inquiry.</p>
      <div id="formStatus" role="status" aria-live="polite" style={{ display: status ? 'block' : 'none' }}>{statusText}</div>
    </form>
  );
}
