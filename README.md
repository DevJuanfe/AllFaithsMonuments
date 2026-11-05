# All Faiths Monuments

La aplicación React reproduce las siete páginas de [`docs/referencias/`](docs/referencias/) aprobadas para el traspaso 1:1. El HTML de referencia se conserva como fuente de diseño; la versión React vive en `src/`, con Vite y TypeScript. La mejora posterior de la guía de scroll (DC-040) está reflejada en ambas versiones.

## Ejecutar

```bash
npm ci
npm run dev
```

`npm run build` comprueba TypeScript y crea `dist/`. `npm test` prueba los contratos de galería y contacto. El build genera en `dist/` las siete rutas directas (`/`, `/about/`, `/contact/`, `/engraving/`, `/gallery/`, `/granite-colors/`, `/guidance/`). En el código fuente solo existe un `index.html` en la raíz.

## Organización

```text
src/
├── app/                   # composición, rutas y referencia visual congelada
├── features/
│   ├── gallery/
│   │   ├── domain/        # modelo y contrato del repositorio
│   │   ├── application/   # carga con colección aprobada de respaldo
│   │   ├── infrastructure/ # JSON local y adaptador HTTP
│   │   ├── presentation/  # tarjetas y visor React
│   │   └── data/          # fotos iniciales editables
│   └── contact/           # mismo flujo: contrato, envío, HTTP y formulario
├── shared/                # idioma e interfaz común
└── tests/                 # contratos de los adaptadores
```

El flujo de dependencias va de la interfaz a los casos de uso y contratos; `app/` conecta los adaptadores HTTP concretos. [`src/app/routeManifest.json`](src/app/routeManifest.json) define las rutas. [`scripts/emit-route-pages.mjs`](scripts/emit-route-pages.mjs) crea sus entradas HTML al compilar, por lo que no hacen falta carpetas `about/`, `gallery/` y similares en la raíz del proyecto.

## Añadir una fotografía

1. Guarda el archivo aprobado, preferiblemente WebP, en `public/assets/img/monumentos/`.
2. Añade una entrada al final de [`src/features/gallery/data/photos.json`](src/features/gallery/data/photos.json), o en la posición deseada:

```json
{
  "id": "mi-foto-001",
  "src": "/assets/img/monumentos/mi-foto-001.webp",
  "width": 1600,
  "height": 1067,
  "altEn": "Brief factual description in English",
  "altEs": "Descripción breve y factual en español",
  "captionEn": "Editorial caption",
  "captionEs": "Pie editorial"
}
```

La tarjeta, el contador y el visor se actualizan desde ese manifiesto al reconstruir o recargar el servidor de desarrollo. `id` debe ser único. Las descripciones deben referirse a rasgos visibles y no inventar datos de personas o creencias.

## Conectar cualquier backend HTTP

Copia [`.env.example`](.env.example) a `.env.local` y configura las URL:

```dotenv
VITE_GALLERY_URL=https://api.example.com/gallery
VITE_CONTACT_URL=https://api.example.com/contact
```

- **Galería:** `GET VITE_GALLERY_URL` devuelve un arreglo ordenado de fotos con los campos del ejemplo anterior, o `{ "photos": [...] }`. La respuesta reemplaza la colección local. Al entrar en la ruta, las 19 fotos aprobadas se muestran de inmediato mientras llega la respuesta remota. Si falla, se conserva esa colección.
- **Contacto:** `POST VITE_CONTACT_URL` recibe JSON `{ "name", "email", "message", "locale" }`. Solo una respuesta HTTP `2xx` muestra el mensaje de recepción; un fallo muestra un aviso para reintentar o llamar. Sin URL configurada, el formulario nunca comunica un envío exitoso.

El backend debe permitir el origen de esta web si está en otro dominio. Si usa autenticación o un formato JSON distinto, adapta únicamente [`src/features/gallery/infrastructure/galleryRepository.ts`](src/features/gallery/infrastructure/galleryRepository.ts) y [`src/features/contact/infrastructure/contactGateway.ts`](src/features/contact/infrastructure/contactGateway.ts); los componentes y estilos no dependen del proveedor.

## Referencia de diseño

El propietario solicitó el traspaso 1:1 el 5 de noviembre de 2026. Se congeló el commit `0e2d1c552c99d3bfedf55a2e1f3ce4ad66eb910f` como fuente; las sumas SHA-256 y la evidencia están en [`docs/decisiones/traspaso-react.md`](docs/decisiones/traspaso-react.md). El importador [`scripts/import-reference.py`](scripts/import-reference.py) conserva los bytes del video y del póster y genera el marcado estático para React. **Solo debe ejecutarse cuando se apruebe una referencia nueva**, porque regenera `src/features/gallery/data/photos.json` y reemplazaría las fotos añadidas allí.

El sitio conserva `noindex, nofollow`. La publicación y la conexión de un backend real requieren sus propias decisiones de operación y privacidad.
