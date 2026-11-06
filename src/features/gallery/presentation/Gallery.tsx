import { createContext, useContext, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useLanguage } from '../../../shared/i18n/LanguageContext';
import { getGalleryPhotos } from '../application/getGalleryPhotos';
import type { GalleryPhoto, GalleryRepository } from '../domain/GalleryPhoto';

export type GalleryCategory = 'all' | 'upright' | 'sculpted' | 'portrait' | 'architecture' | 'multicultural';

const PHOTO_CATEGORIES: Record<string, GalleryCategory[]> = {
  sny01843: ['multicultural', 'upright'],
  sny01596: ['upright', 'sculpted'],
  sny01757: ['architecture', 'sculpted'],
  sny01669: ['upright', 'sculpted'],
  sny01648: ['portrait', 'upright'],
  sny01654: ['upright', 'sculpted'],
  sny01672: ['upright', 'sculpted'],
  sny01680: ['portrait', 'upright'],
  sny01729: ['portrait', 'upright'],
  sny01737: ['sculpted', 'upright'],
  sny01766: ['sculpted', 'architecture'],
  sny01799: ['upright', 'sculpted'],
  sny01849: ['sculpted', 'architecture'],
  sny01603: ['portrait', 'sculpted'],
  sny01661: ['upright'],
  sny01696: ['sculpted', 'upright'],
  sny01711: ['sculpted', 'upright'],
  sny01814: ['sculpted', 'upright'],
  sny01823: ['portrait', 'sculpted'],
};

const FILTER_LABELS: { id: GalleryCategory; en: string; es: string }[] = [
  { id: 'all', en: 'All works', es: 'Todas las obras' },
  { id: 'upright', en: 'Classic upright', es: 'Verticales clásicos' },
  { id: 'sculpted', en: 'Sculpted & relief', es: 'Esculturas y relieves' },
  { id: 'portrait', en: 'Portraits & etching', es: 'Retratos y grabados' },
  { id: 'architecture', en: 'Mausoleums & arches', es: 'Mausoleos y arcos' },
  { id: 'multicultural', en: 'Multicultural calligraphy', es: 'Caligrafía multicultural' },
];

interface GalleryState {
  photos: GalleryPhoto[];
  filteredPhotos: GalleryPhoto[];
  category: GalleryCategory;
  setCategory: (category: GalleryCategory) => void;
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

export function saveInquiryContext(id: string, titleEn: string, titleEs: string) {
  try {
    sessionStorage.setItem('afm-inquiry-context', JSON.stringify({ id, titleEn, titleEs }));
    window.dispatchEvent(new CustomEvent('afm-context-change'));
  } catch {
    // Storage may be restricted in private previews
  }
}

export function GalleryProvider({ children, repository, initialPhotos }: { children: ReactNode; repository: GalleryRepository; initialPhotos: GalleryPhoto[] }) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [category, setCategory] = useState<GalleryCategory>('all');
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

  const filteredPhotos = useMemo(() => {
    if (category === 'all') return photos;
    return photos.filter((photo) => {
      const cats = PHOTO_CATEGORIES[photo.id] ?? ['upright'];
      return cats.includes(category);
    });
  }, [photos, category]);

  const handleCategoryChange = (nextCategory: GalleryCategory) => {
    setSelected(null);
    setCategory(nextCategory);
  };

  const open = (index: number, opener: HTMLAnchorElement) => { openerRef.current = opener; setSelected(index); };
  const next = () => setSelected((current) => current === null || filteredPhotos.length === 0 ? null : (current + 1) % filteredPhotos.length);
  const previous = () => setSelected((current) => current === null || filteredPhotos.length === 0 ? null : (current - 1 + filteredPhotos.length) % filteredPhotos.length);
  const closed = () => { setSelected(null); openerRef.current?.focus(); };

  return (
    <GalleryContext.Provider value={{ photos, filteredPhotos, category, setCategory: handleCategoryChange, selected, open, next, previous, dialogRef, closed }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function GalleryCount() {
  const { filteredPhotos, photos, category } = useGallery();
  const count = filteredPhotos.length;
  const total = photos.length;
  return (
    <span>
      <span className="gallery-en">
        {category === 'all' ? `${total} photographs · Select a photo to enlarge` : `Showing ${count} of ${total} photographs · Select a photo to enlarge`}
      </span>
      <span className="gallery-es" lang="es">
        {category === 'all' ? `${total} fotografías · Selecciona una para ampliarla` : `Mostrando ${count} de ${total} fotografías · Selecciona una para ampliarla`}
      </span>
    </span>
  );
}

export function GalleryCollection() {
  const { filteredPhotos, category, setCategory, open } = useGallery();
  const { language } = useLanguage();

  const openPhoto = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(index, event.currentTarget);
  };

  const handleInquireClick = (photo: GalleryPhoto) => {
    const refCode = photo.id.toUpperCase();
    saveInquiryContext(
      photo.id,
      `${photo.captionEn} (Ref. ${refCode})`,
      `${photo.captionEs} (Ref. ${refCode})`
    );
  };

  return (
    <div className="gallery-catalog-wrapper">
      <div className="gallery-filter-bar" role="toolbar" aria-label={language === 'es' ? 'Filtrar obras por estilo' : 'Filter works by style'}>
        {FILTER_LABELS.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`gallery-filter-chip${active ? ' is-active' : ''}`}
              aria-pressed={active}
              onClick={() => setCategory(item.id)}
            >
              <span className="gallery-en">{item.en}</span>
              <span className="gallery-es" lang="es">{item.es}</span>
            </button>
          );
        })}
        {category !== 'all' && (
          <button
            type="button"
            className="gallery-filter-reset"
            onClick={() => setCategory('all')}
          >
            <span className="gallery-en">Clear filter ×</span>
            <span className="gallery-es" lang="es">Limpiar filtro ×</span>
          </button>
        )}
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="gallery-empty-state" role="status">
          <p>
            <span className="gallery-en">No photographs match this filter combination. You can reset the filter or ask our team for examples from our workshop archive.</span>
            <span className="gallery-es" lang="es">No hay fotografías para este filtro. Puedes restablecer el filtro o consultar a nuestro equipo por ejemplos adicionales del taller.</span>
          </p>
          <div className="gallery-empty-actions">
            <button type="button" className="btn light" onClick={() => setCategory('all')}>
              <span className="gallery-en">Show all photographs</span>
              <span className="gallery-es" lang="es">Ver todas las fotografías</span>
            </button>
            <a className="btn dark" href="/contact/#inquiryForm">
              <span className="gallery-en">Ask our team</span>
              <span className="gallery-es" lang="es">Consultar al equipo</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="memorial-collection">
          {filteredPhotos.map((photo, index) => (
            <figure className="collection-card" key={photo.id}>
              <a className="collection-open" href={photo.src} onClick={(event) => openPhoto(event, index)}>
                <span className="sr-only gallery-en">Open larger image: </span>
                <span className="sr-only gallery-es" lang="es">Ampliar imagen: </span>
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={language === 'es' ? photo.altEs : photo.altEn}
                  data-alt-es={photo.altEs}
                  loading="lazy"
                  decoding="async"
                />
                <span className="collection-zoom" aria-hidden="true">↗</span>
              </a>
              <figcaption className="collection-caption-row">
                <div className="collection-caption-text">
                  <span className="gallery-en">{photo.captionEn}</span>
                  <span className="gallery-es" lang="es">{photo.captionEs}</span>
                  <small className="collection-ref">Ref. {photo.id.toUpperCase()}</small>
                </div>
                <a
                  className="collection-inquire-link"
                  href="/contact/#inquiryForm"
                  onClick={() => handleInquireClick(photo)}
                >
                  <span className="gallery-en">Inquire →</span>
                  <span className="gallery-es" lang="es">Consultar →</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

export function GalleryViewer() {
  const { filteredPhotos, selected, next, previous, dialogRef, closed } = useGallery();
  const { language } = useLanguage();
  const [announcement, setAnnouncement] = useState('');
  const photo = selected === null ? null : filteredPhotos[selected];

  useEffect(() => {
    if (!photo || selected === null) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const alt = language === 'es' ? photo.altEs : photo.altEn;
    setAnnouncement(language === 'es'
      ? `Imagen ${selected + 1} de ${filteredPhotos.length}: ${alt}`
      : `Image ${selected + 1} of ${filteredPhotos.length}: ${alt}`);
  }, [photo, selected, filteredPhotos.length, language, dialogRef]);

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

  const handleViewerInquire = () => {
    if (!photo) return;
    const refCode = photo.id.toUpperCase();
    saveInquiryContext(
      photo.id,
      `${photo.captionEn} (Ref. ${refCode})`,
      `${photo.captionEs} (Ref. ${refCode})`
    );
    close();
  };

  return (
    <dialog className="photo-viewer" aria-labelledby="photo-viewer-title" ref={dialogRef} onClose={closed} onKeyDown={keyDown} onClick={backdropClick}>
      <div className="viewer-toolbar">
        <div>
          <h2 id="photo-viewer-title">
            <span className="gallery-en">{photo ? photo.captionEn : 'A closer look'}</span>
            <span className="gallery-es" lang="es">{photo ? photo.captionEs : 'Una mirada de cerca'}</span>
          </h2>
          {photo && <small className="viewer-ref">Ref. {photo.id.toUpperCase()}</small>}
        </div>
        <div className="viewer-toolbar-actions">
          {photo && (
            <a className="btn dark viewer-inquire-btn" href="/contact/#inquiryForm" onClick={handleViewerInquire}>
              <span className="gallery-en">Ask about this piece</span>
              <span className="gallery-es" lang="es">Consultar por esta pieza</span>
            </a>
          )}
          <button type="button" className="viewer-close" onClick={close}>
            <span className="gallery-en">Close ×</span>
            <span className="gallery-es" lang="es">Cerrar ×</span>
          </button>
        </div>
      </div>
      <div className="viewer-stage">
        <img className="viewer-image" src={photo?.src} alt={photo ? (language === 'es' ? photo.altEs : photo.altEn) : ''} />
      </div>
      <div className="viewer-bottom">
        <button type="button" className="viewer-prev" onClick={previous}>
          <span className="gallery-en">← Previous</span>
          <span className="gallery-es" lang="es">← Anterior</span>
        </button>
        <p className="viewer-count">{photo && selected !== null ? `${selected + 1} / ${filteredPhotos.length}` : ''}</p>
        <button type="button" className="viewer-next" onClick={next}>
          <span className="gallery-en">Next →</span>
          <span className="gallery-es" lang="es">Siguiente →</span>
        </button>
      </div>
      <p className="sr-only viewer-announcement" aria-live="polite" aria-atomic="true">{announcement}</p>
    </dialog>
  );
}
