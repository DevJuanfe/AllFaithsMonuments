import { useCallback, useEffect, useMemo, useState } from 'react';
import parse, { Element, type HTMLReactParserOptions } from 'html-react-parser';
import { ContactForm } from '../features/contact/presentation/ContactForm';
import { createContactGateway } from '../features/contact/infrastructure/contactGateway';
import type { ContactGateway } from '../features/contact/domain/Inquiry';
import { GalleryCollection, GalleryCount, GalleryProvider, GalleryViewer } from '../features/gallery/presentation/Gallery';
import { approvedPhotos, createGalleryRepository } from '../features/gallery/infrastructure/galleryRepository';
import { ErrorBoundary } from '../shared/ui/ErrorBoundary';
import { LanguageProvider, useLanguage } from '../shared/i18n/LanguageContext';
import { frozenPages } from './reference/frozenPages';
import { useReferenceInteractions, useReferenceLanguage } from './reference/useReferenceBehavior';
import routeManifest from './routeManifest.json';
import '../features/guidance/presentation/guidance.css';
import '../shared/ui/responsive.css';

const galleryRepository = createGalleryRepository();
const contactGateway = createContactGateway();

export function resolveRoute(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  return routeManifest.find((route) => route.name === segment)?.name ?? 'home';
}

function parserOptions(gateway: ContactGateway): HTMLReactParserOptions {
  return {
    replace(node) {
      if (!(node instanceof Element)) return;
      // DC-041: the spacing itself invites scrolling through the four steps.
      if (node.attribs.class === 'process-scroll-cue') return <></>;
      if ('data-gallery-count' in node.attribs) return <GalleryCount />;
      if (node.attribs.class === 'memorial-collection') return <GalleryCollection />;
      if ('data-gallery-viewer' in node.attribs) return <GalleryViewer />;
      if ('data-contact-form' in node.attribs) return <ContactForm gateway={gateway} />;
    },
  };
}

function ReferencePage({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: (pathname: string, hash?: string) => void;
}) {
  const { language, setLanguage } = useLanguage();
  const markup = useMemo(() => parse(frozenPages[route] ?? frozenPages.home, parserOptions(contactGateway)), [route]);
  useReferenceLanguage(language, route);
  useReferenceInteractions(setLanguage, route, onNavigate);
  return <>{markup}</>;
}

export function App() {
  const [route, setRoute] = useState<string>(() => resolveRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((pathname: string, hash = '') => {
    const nextRoute = resolveRoute(pathname);
    const normalizedPath = nextRoute === 'home' ? '/' : `/${nextRoute}/`;
    const nextUrl = `${normalizedPath}${hash}`;
    if (window.location.pathname !== normalizedPath || window.location.hash !== hash) {
      window.history.pushState({}, '', nextUrl);
    }
    setRoute(nextRoute);
    requestAnimationFrame(() => {
      if (hash && hash !== '#top') {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, []);

  const page = <ReferencePage route={route} onNavigate={handleNavigate} />;
  return (
    <LanguageProvider>
      <ErrorBoundary>
        {route === 'gallery' ? (
          <GalleryProvider repository={galleryRepository} initialPhotos={approvedPhotos}>
            {page}
          </GalleryProvider>
        ) : (
          page
        )}
      </ErrorBoundary>
    </LanguageProvider>
  );
}
