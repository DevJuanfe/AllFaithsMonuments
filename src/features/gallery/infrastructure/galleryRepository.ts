import initialGallery from '../data/photos.json';
import type { GalleryPhoto, GalleryRepository } from '../domain/GalleryPhoto';

export const approvedPhotos = initialGallery as GalleryPhoto[];

function validPhoto(value: unknown): value is GalleryPhoto {
  if (typeof value !== 'object' || value === null) return false;
  const photo = value as Record<string, unknown>;
  return (
    ['id', 'src', 'altEn', 'altEs', 'captionEn', 'captionEs'].every(
      (key) => typeof photo[key] === 'string' && (photo[key] as string).trim().length > 0,
    ) &&
    (photo.src as string).match(/^(https?:\/\/|\/[^/])/) !== null &&
    Number.isInteger(photo.width) && Number(photo.width) > 0 &&
    Number.isInteger(photo.height) && Number(photo.height) > 0
  );
}

/** HTTP is an outer adapter; the gallery UI depends only on GalleryRepository. */
export function createGalleryRepository(
  endpoint: string | undefined = import.meta.env.VITE_GALLERY_URL,
  request: typeof fetch = fetch,
): GalleryRepository {
  return {
    async list(signal) {
      if (!endpoint) return approvedPhotos;
      const response = await request(endpoint, { headers: { Accept: 'application/json' }, signal });
      if (!response.ok) throw new Error(`Gallery request failed: ${response.status}`);
      const body: unknown = await response.json();
      const photos = Array.isArray(body) ? body :
        typeof body === 'object' && body !== null && 'photos' in body ? (body as { photos: unknown }).photos : null;
      if (!Array.isArray(photos) || !photos.every(validPhoto)) throw new Error('Invalid gallery response');
      if (new Set(photos.map((photo: GalleryPhoto) => photo.id)).size !== photos.length) throw new Error('Duplicate gallery IDs');
      return photos;
    },
  };
}
