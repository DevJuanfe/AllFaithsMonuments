export interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  altEn: string;
  altEs: string;
  captionEn: string;
  captionEs: string;
}

export interface GalleryRepository {
  list(signal?: AbortSignal): Promise<GalleryPhoto[]>;
}
