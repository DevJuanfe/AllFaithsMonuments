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
- **Contacto:** `POST VITE_CONTACT_URL` recibe JSON `{ "name", "email", "message", "locale", "captchaToken" }`. Solo una respuesta HTTP `2xx` muestra el mensaje de recepción; un fallo muestra un aviso para reintentar o llamar. Sin URL configurada, el formulario nunca comunica un envío exitoso.

### Protección del formulario con Turnstile

El formulario incluye una integración preparada de Cloudflare Turnstile. Sin una clave pública configurada, la verificación y el envío permanecen deshabilitados; el sitio todavía no cuenta con un servidor que reciba consultas. Para activarlo:

1. Crear un widget en Cloudflare Turnstile para los dominios definitivos y configurar su **clave pública** como `VITE_TURNSTILE_SITE_KEY` en el entorno de compilación de Vite. La clave pública no es secreta.
2. Configurar `VITE_CONTACT_URL` con el servidor de contacto. En ese servidor guardar la **clave secreta** fuera del repositorio y nunca en variables `VITE_` ni en el navegador.
3. Antes de aceptar, guardar o enviar la consulta, el servidor debe validar `captchaToken` con Siteverify. Se incluye [`server/verifyTurnstile.ts`](server/verifyTurnstile.ts) como ayuda para un backend TypeScript: requiere la clave secreta y una lista explícita de dominios permitidos, valida la acción `contact` y rechaza fallos. El archivo no es un servidor ni queda conectado automáticamente: el endpoint real debe llamarlo y rechazar cualquier solicitud sin verificación válida.
4. Implementar en el servidor los demás controles de SEG-006, incluyendo límites de tamaño y frecuencia, validación de entradas y protección del correo. Revisar con el responsable de privacidad la integración de Cloudflare y los avisos o consentimientos que correspondan.

Cada comprobante caduca a los cinco minutos y es de un solo uso. El formulario solicita otro después de cada intento. Para pruebas locales se puede usar la [clave pública de prueba de Cloudflare](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) en `.env.local`; no debe emplearse en producción. Las claves secretas de prueba devuelven un hostname fijo y no devuelven la acción; las comprobaciones de hostname y acción se prueban aquí con respuestas simuladas y deben verificarse también con claves reales en el entorno definitivo.

El backend debe permitir el origen de esta web si está en otro dominio. Si usa autenticación o un formato JSON distinto, adapta únicamente [`src/features/gallery/infrastructure/galleryRepository.ts`](src/features/gallery/infrastructure/galleryRepository.ts) y [`src/features/contact/infrastructure/contactGateway.ts`](src/features/contact/infrastructure/contactGateway.ts); los componentes y estilos no dependen del proveedor.

## Referencia de diseño

El propietario solicitó el traspaso 1:1 el 5 de noviembre de 2026. Se congeló el commit `0e2d1c552c99d3bfedf55a2e1f3ce4ad66eb910f` como fuente; las sumas SHA-256 y la evidencia están en [`docs/decisiones/traspaso-react.md`](docs/decisiones/traspaso-react.md). El importador [`scripts/import-reference.py`](scripts/import-reference.py) conserva los bytes del video y del póster y genera el marcado estático para React. **Solo debe ejecutarse cuando se apruebe una referencia nueva**, porque regenera `src/features/gallery/data/photos.json` y reemplazaría las fotos añadidas allí.

El sitio conserva `noindex, nofollow`. La publicación y la conexión de un backend real requieren sus propias decisiones de operación y privacidad.
