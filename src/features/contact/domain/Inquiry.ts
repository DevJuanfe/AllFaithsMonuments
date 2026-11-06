export interface Inquiry {
  name: string;
  email: string;
  message: string;
  locale: 'en' | 'es';
  captchaToken: string;
}

export interface ContactGateway {
  send(inquiry: Inquiry, signal?: AbortSignal): Promise<void>;
}
