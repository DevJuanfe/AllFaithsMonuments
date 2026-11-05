import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLanguage } from '../../../shared/i18n/LanguageContext';
import { translations } from '../../../shared/i18n/translations';
import { submitInquiry } from '../application/submitInquiry';
import type { ContactGateway } from '../domain/Inquiry';

export function ContactForm({ gateway }: { gateway: ContactGateway }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [pending, setPending] = useState(false);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    request.current = new AbortController();
    setPending(true);
    setStatus(null);
    try {
      await submitInquiry(gateway, {
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        message: String(data.get('message') ?? '').trim(),
        locale: language,
      }, request.current.signal);
      setStatus('success');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error');
    } finally {
      setPending(false);
      request.current = null;
    }
  };

  const statusText = status === 'success' ? translations[language].inquiryStatus : status === 'error'
    ? (language === 'es' ? 'No pudimos enviar tu consulta. Inténtalo de nuevo o contáctanos por teléfono.' : 'We could not send your inquiry. Please try again or contact us by phone.')
    : '';

  return <form id="inquiryForm" className="contact-form reveal" onSubmit={submit}>
    <h3 data-i18n="formHeading">Write to us</h3><p data-i18n="formSubheading">Tell us how we can help. You can also call or email us.</p>
    <div className="form-row"><div className="form-field"><label htmlFor="formName" data-i18n="name">Your name</label><input id="formName" name="name" type="text" data-ph="namePh" placeholder="Name and surname" autoComplete="name" /></div>
      <div className="form-field"><label htmlFor="formEmail" data-i18n="email">Email address *</label><input id="formEmail" type="email" name="email" autoComplete="email" required placeholder="name@example.com" /></div></div>
    <div className="form-field"><label htmlFor="formMessage" data-i18n="message">How can we help? *</label><textarea id="formMessage" name="message" required data-ph="messagePh" placeholder="Tell us a little about what you need..."></textarea></div>
    <button className="btn dark" type="submit" data-i18n="formSubmit" disabled={pending}>Send inquiry</button>
    <div id="formStatus" role="status" aria-live="polite" style={{ display: status ? 'block' : 'none' }}>{statusText}</div>
  </form>;
}
