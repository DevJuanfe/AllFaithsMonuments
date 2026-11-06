import type { ContactGateway, Inquiry } from '../domain/Inquiry';

export async function submitInquiry(
  gateway: ContactGateway,
  inquiry: Inquiry,
  signal?: AbortSignal,
): Promise<void> {
  const cleanInquiry = {
    ...inquiry,
    name: inquiry.name.trim(),
    email: inquiry.email.trim(),
    message: inquiry.message.trim(),
  };
  if (!cleanInquiry.email || !cleanInquiry.message) throw new Error('Email and message are required');
  if (!cleanInquiry.captchaToken || cleanInquiry.captchaToken.length > 2048) throw new Error('Verification is required');
  await gateway.send(cleanInquiry, signal);
}
