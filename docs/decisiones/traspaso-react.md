# Traspaso 1:1 a React — 5 de noviembre de 2026

El propietario indicó por escrito que `docs/referencias/` es la referencia web y solicitó copiarla 1:1 a React, con una entrada sencilla para nuevas fotos y un formulario conectable a cualquier backend HTTP. Se tomó como diseño congelado el commit `0e2d1c552c99d3bfedf55a2e1f3ce4ad66eb910f` de `primera-version`. La mejora de la guía de scroll, autorizada después como DC-040, se aplicó primero en la referencia HTML y luego en React.

## Identidad de la referencia

| Ruta de referencia | SHA-256 |
|---|---|
| `All_Faiths_Monuments_Editorial_Desktop.html` | `43036ad042453285ba4b9a00afda03be38ebfb4c00e6c48ac1a31c0933020219` |
| `about/index.html` | `e7f047016cda5e6dde913b1b1ce0129d313f3b330773b938ba4c91f1b96a65b1` |
| `contact/index.html` | `8e89c21550199ee8da2d2bd108820a3c07e049e2c325c1e89af3565a83e86e24` |
| `engraving/index.html` | `9b17c10a906997f73588b938e9b8d6657b167984040720be10b6106dbcfb0537` |
| `gallery/index.html` | `103260d1df452de802560eb9c115683cb24f19c3c641c217f04ce30896f8bac0` |
| `granite-colors/index.html` | `9f6781b891c9ffe7d807044aa77479c0172d5521df2b28cd1c45a5385486a8b2` |
| `guidance/index.html` | `c97a27157a2c9daa180b5a7ffb020ab67b478f0bd24c6961e2c9dbcd9ce15983` |

El CSS y las 34 imágenes se copiaron sin modificación a `public/assets/`. El video y póster embebidos se extrajeron conservando los bytes. Sus SHA-256 coinciden antes y después de la extracción: video `8d9ecc755a7cd7f26b5ddcc6ae3a96feaba9ee043c5f9910288faa499828b138`; póster `069b3406bad093a93605f95cf92c1148b014657267c559e714bcd36c23a48fe3`. El manifiesto reproducible está en `react-assets.json`.

## Cómo se trasladó

El código fuente usa una sola entrada HTML en la raíz. `scripts/emit-route-pages.mjs` genera las seis entradas restantes en `dist/` durante el build, conservando la carga directa de cada URL. `src/app/` compone las rutas y el marcado congelado; `src/features/gallery/` y `src/features/contact/` separan contratos, casos de uso, adaptadores y presentación. React conserva los mismos selectores y CSS; las interacciones de idioma, navegación, video, revelado, proceso y simulador se activan desde hooks con limpieza de eventos, observadores y temporizadores. La colección y el visor se alimentan de `src/features/gallery/data/photos.json` o del adaptador HTTP. El formulario solo comunica éxito tras una respuesta `2xx` del backend configurado. No se añadió un servicio de envío ni un proveedor de datos.

## Verificación

- `npm run build`: TypeScript estricto y compilación de las siete rutas, sin errores.
- `npm test`: cuatro pruebas de contratos de galería y contacto, aprobadas.
- Comparación en Chrome a **1280 × 900, 1440 × 900 y 1920 × 1080**: en las siete rutas, las coordenadas y dimensiones de encabezado, `main`, secciones y pie, y la altura total de página coinciden con el HTML de referencia (desviación medida: 0 px); no hay desbordamiento horizontal.
- Capturas temporales fuera del repositorio: en primera pantalla a 1440 × 900, portada, contacto, grabados y granito no tuvieron diferencias de píxel en la comparación ejecutada. Historia, orientación y galería mostraron diferencias pequeñas o variables de rasterización y carga de imágenes; la comparación visual y las medidas de cajas no revelaron cambios de composición. No se afirma igualdad de píxeles para esas vistas.
- Navegador: enlace de salto, desplegable y navegación, idioma persistente entre rutas, visor con teclado y devolución del foco, simulador y línea de proceso funcionan; no hubo errores JavaScript. Con un backend HTTP local de prueba, una foto adicional apareció como imagen 20 de 20 y el formulario envió los datos y mostró éxito tras HTTP 201. Sin URL de contacto, mostró un error genérico en vez de un éxito falso.
- Los estilos móviles heredados conservaron la geometría medida a 375 y 768 px tras cargar imágenes y fuentes; el menú móvil abrió y navegó a la galería. No se diseñó una nueva versión móvil.

## Pendientes externos

**Evolución posterior DC-041:** por instrucción del propietario, la lectura guiada sin flecha se implementa directamente en React. Amplía el recorrido de las etapas y sincroniza el eje con el scroll nativo. El HTML conserva DC-040; la paridad histórica del traspaso no se aplica a esta interacción posterior. Los ajustes están fuera de los archivos generados por el importador.

**Ajuste DC-042:** se mantiene la introducción fija durante la lectura de las etapas y se reduce el espacio entre ellas, con desplazamiento normal hacia el pie y una alternativa legible para ventanas demasiado bajas.

**Evolución posterior DC-043:** el propietario autorizó adaptar las siete rutas React a teléfonos y tabletas. La composición móvil ya no busca reproducir el HTML congelado; mantiene su contenido, identidad y funciones. La hoja responsive está fuera de los archivos generados por el importador.

La aplicación trae contratos de integración, pero no un backend real ni credenciales. Para operar el formulario y administrar fotografías remotamente hay que configurar `VITE_CONTACT_URL` y `VITE_GALLERY_URL` o adaptar los dos servicios al backend escogido, además de resolver la política de privacidad y los permisos de publicación correspondientes. Se conserva `noindex, nofollow`.
