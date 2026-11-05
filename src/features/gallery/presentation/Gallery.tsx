import { createContext, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useLanguage } from '../../../shared/i18n/LanguageContext';
import { getGalleryPhotos } from '../application/getGalleryPhotos';
import type { GalleryPhoto, GalleryRepository } from '../domain/GalleryPhoto';

interface GalleryState {
  photos: GalleryPhoto[];
  selected: number | null;
  open: (index: number, opener: HTMLAnchorElement) => void;
  next: () => void;
  previous: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  closed: () => void;
}

const GalleryContext = createContext<GalleryState | null>(null);

function useGallery() {
  const gallery = useContext(GalleryContext);
  if (!gallery) throw new Error('GalleryProvider is missing');
  return gallery;
}

export function GalleryProvider({ children, repository, initialPhotos }: { children: ReactNode; repository: GalleryRepository; initialPhotos: GalleryPhoto[] }) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    getGalleryPhotos(repository, initialPhotos, controller.signal).then((loaded) => {
      if (active) setPhotos(loaded);
    });
    return () => { active = false; controller.abort(); };
  }, [repository, initialPhotos]);

  const open = (index: number, opener: HTMLAnchorElement) => { openerRef.current = opener; setSelected(index); };
  const next = () => setSelected((current) => current === null ? null : (current + 1) % photos.length);
  const previous = () => setSelected((current) => current === null ? null : (current - 1 + photos.length) % photos.length);
  const closed = () => { setSelected(null); openerRef.current?.focus(); };

  return <GalleryContext.Provider value={{ photos, selected, open, next, previous, dialogRef, closed }}>{children}</GalleryContext.Provider>;
}

export function GalleryCount() {
  const { photos } = useGallery();
  return <span><span className="gallery-en">{photos.length} photographs · Select a photo to enlarge</span><span className="gallery-es" lang="es">{photos.length} fotografías · Selecciona una para ampliarla</span></span>;
}

export function GalleryCollection() {
  const { photos, open } = useGallery();
  const { language } = useLanguage();
  const openPhoto = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(index, event.currentTarget);
  };
  return <div className="memorial-collection">
    {photos.map((photo, index) => <figure className="collection-card" key={photo.id}>
      <a className="collection-open" href={photo.src} onClick={(event) => openPhoto(event, index)}>
        <span className="sr-only gallery-en">Open larger image: </span><span className="sr-only gallery-es" lang="es">Ampliar imagen: </span>
        <img src={photo.src} width={photo.width} height={photo.height} alt={language === 'es' ? photo.altEs : photo.altEn} data-alt-es={photo.altEs} loading="lazy" decoding="async" />
        <span className="collection-zoom" aria-hidden="true">↗</span>
      </a>
      <figcaption><span className="gallery-en">{photo.captionEn}</span><span className="gallery-es" lang="es">{photo.captionEs}</span></figcaption>
    </figure>)}
  </div>;
}

export function GalleryViewer() {
  const { photos, selected, next, previous, dialogRef, closed } = useGallery();
  const { language } = useLanguage();
  const [announcement, setAnnouncement] = useState('');
  const photo = selected === null ? null : photos[selected];

  useEffect(() => {
    if (!photo || selected === null) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const alt = language === 'es' ? photo.altEs : photo.altEn;
    setAnnouncement(language === 'es'
      ? `Imagen ${selected + 1} de ${photos.length}: ${alt}`
      : `Image ${selected + 1} of ${photos.length}: ${alt}`);
  }, [photo, selected, photos.length, language, dialogRef]);

  const close = () => dialogRef.current?.close();
  const keyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
  };
  const backdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  };

  return <dialog className="photo-viewer" aria-labelledby="photo-viewer-title" ref={dialogRef} onClose={closed} onKeyDown={keyDown} onClick={backdropClick}>
    <div className="viewer-toolbar"><h2 id="photo-viewer-title"><span className="gallery-en">A closer look</span><span className="gallery-es" lang="es">Una mirada de cerca</span></h2><button type="button" className="viewer-close" onClick={close}><span className="gallery-en">Close ×</span><span className="gallery-es" lang="es">Cerrar ×</span></button></div>
    <div className="viewer-stage"><img className="viewer-image" src={photo?.src} alt={photo ? (language === 'es' ? photo.altEs : photo.altEn) : ''} /></div>
    <div className="viewer-bottom"><button type="button" className="viewer-prev" onClick={previous}><span className="gallery-en">← Previous</span><span className="gallery-es" lang="es">← Anterior</span></button><p className="viewer-count">{photo && selected !== null ? `${selected + 1} / ${photos.length}` : ''}</p><button type="button" className="viewer-next" onClick={next}><span className="gallery-en">Next →</span><span className="gallery-es" lang="es">Siguiente →</span></button></div>
    <p className="sr-only viewer-announcement" aria-live="polite" aria-atomic="true">{announcement}</p>
  </dialog>;
}
