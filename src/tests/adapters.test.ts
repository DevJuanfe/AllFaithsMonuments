import { describe, expect, it, vi } from 'vitest';
import { getGalleryPhotos } from '../features/gallery/application/getGalleryPhotos';
import { approvedPhotos, createGalleryRepository } from '../features/gallery/infrastructure/galleryRepository';
import { submitInquiry } from '../features/contact/application/submitInquiry';
import { createContactGateway } from '../features/contact/infrastructure/contactGateway';

describe('backend adapters', () => {
  it('shows a newly returned gallery photo without changing the approved entries', async () => {
    const extra = {
      id: 'new-memorial', src: 'https://cdn.example.test/new.webp', width: 1600, height: 1067,
      altEn: 'Gray headstone with a carved tree', altEs: 'Lápida gris con un árbol tallado',
      captionEn: 'Carved tree', captionEs: 'Árbol tallado',
    };
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ photos: [...approvedPhotos, extra] }), { status: 200 }));
    const photos = await getGalleryPhotos(createGalleryRepository('https://api.example.test/gallery', request), approvedPhotos);
    expect(photos).toHaveLength(20);
    expect(photos.at(-1)).toEqual(extra);
    expect(request).toHaveBeenCalledWith('https://api.example.test/gallery', expect.objectContaining({ headers: { Accept: 'application/json' } }));
  });

  it('keeps the approved gallery when the remote source fails', async () => {
    const request = vi.fn().mockRejectedValue(new Error('offline'));
    const photos = await getGalleryPhotos(createGalleryRepository('https://api.example.test/gallery', request), approvedPhotos);
    expect(photos).toBe(approvedPhotos);
  });

  it('posts the contact inquiry and accepts success only from a successful response', async () => {
    const request = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    const inquiry = { name: 'A visitor', email: 'visitor@example.test', message: 'Please contact me', locale: 'en' as const };
    const gateway = createContactGateway('https://api.example.test/contact', request);
    await submitInquiry(gateway, inquiry);
    expect(request).toHaveBeenCalledWith('https://api.example.test/contact', expect.objectContaining({
      method: 'POST', body: JSON.stringify(inquiry), headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }));
    request.mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(submitInquiry(gateway, inquiry)).rejects.toThrow('500');
  });

  it('rejects a contact submission without an endpoint', async () => {
    await expect(submitInquiry(createContactGateway(''), { name: '', email: 'visitor@example.test', message: 'Hello', locale: 'en' })).rejects.toThrow('not configured');
  });
});
