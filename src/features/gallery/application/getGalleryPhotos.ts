import type { GalleryPhoto, GalleryRepository } from '../domain/GalleryPhoto';

export async function getGalleryPhotos(
  repository: GalleryRepository,
  approvedPhotos: GalleryPhoto[],
  signal?: AbortSignal,
): Promise<GalleryPhoto[]> {
  try {
    return await repository.list(signal);
  } catch {
    // The approved collection remains available if a remote source fails.
    return approvedPhotos;
  }
}
