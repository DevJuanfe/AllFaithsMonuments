import { describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from '../../server/verifyTurnstile';

const config = { secret: 'server-only-secret', allowedHostnames: ['example.test'] };
const mock = (value: unknown, status = 200) => vi.fn().mockResolvedValue(new Response(JSON.stringify(value), { status }));

describe('server-side contact verification', () => {
  it('accepts only a valid token for the configured host and contact action', async () => {
    const request = mock({ success: true, hostname: 'example.test', action: 'contact' });
    expect(await verifyTurnstile('valid', config, request)).toBe(true);
    expect(request).toHaveBeenCalledWith('https://challenges.cloudflare.com/turnstile/v0/siteverify', expect.objectContaining({
      method: 'POST', body: JSON.stringify({ secret: config.secret, response: 'valid' }),
    }));
  });

  it.each([
    { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'other.test', action: 'contact' },
    { success: true, hostname: 'example.test', action: 'other' },
    { success: true },
  ])('rejects invalid, expired, replayed or mismatched validation: %o', async (result) => {
    expect(await verifyTurnstile('token', config, mock(result))).toBe(false);
  });

  it('fails closed for missing configuration, invalid input and provider outages', async () => {
    const request = mock({ success: true });
    expect(await verifyTurnstile('', config, request)).toBe(false);
    expect(await verifyTurnstile('x'.repeat(2049), config, request)).toBe(false);
    expect(await verifyTurnstile('token', { ...config, secret: '' }, request)).toBe(false);
    expect(await verifyTurnstile('token', { ...config, allowedHostnames: [] }, request)).toBe(false);
    expect(request).not.toHaveBeenCalled();
    expect(await verifyTurnstile('token', config, mock({}, 503))).toBe(false);
    expect(await verifyTurnstile('token', config, vi.fn().mockRejectedValue(new Error('offline')))).toBe(false);
  });
});
