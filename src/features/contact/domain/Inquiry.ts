export interface Inquiry {
  name: string;
  email: string;
  message: string;
  locale: 'en' | 'es';
}

export interface ContactGateway {
  send(inquiry: Inquiry, signal?: AbortSignal): Promise<void>;
}
