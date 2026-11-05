import type { ContactGateway } from '../domain/Inquiry';

/** Swap this adapter if the selected backend requires another transport or payload. */
export function createContactGateway(
  endpoint: string | undefined = import.meta.env.VITE_CONTACT_URL,
  request: typeof fetch = fetch,
): ContactGateway {
  return {
    async send(inquiry, signal) {
      if (!endpoint) throw new Error('Contact service is not configured');
      const response = await request(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(inquiry),
        signal,
      });
      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);
    },
  };
}
