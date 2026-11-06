/** Server-only helper. Call before accepting or delivering a contact inquiry. */
export async function verifyTurnstile(
  token: unknown,
  config: { secret: string; allowedHostnames: readonly string[] },
  request: typeof fetch = fetch,
): Promise<boolean> {
  if (typeof token !== 'string' || !token || token.length > 2048 || !config.secret || !config.allowedHostnames.length) return false;
  try {
    const response = await request('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ secret: config.secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object') return false;
    const verification = result as Record<string, unknown>;
    return verification.success === true && verification.action === 'contact' &&
      typeof verification.hostname === 'string' && config.allowedHostnames.includes(verification.hostname);
  } catch {
    return false;
  }
}
