# Registro de cambios de diseño — Fase A

Cada cambio aplicado a [`docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html`](../referencias/All_Faiths_Monuments_Editorial_Desktop.html) se anota aquí (AGENTS.md §2). El HTML se edita directamente; no hay copias paralelas ni imágenes de evidencia.

**Nota de organización (4 de noviembre de 2026):** las rutas `media/logos/` y `media/Licencias Fonts/` de las decisiones anteriores son históricas. Los originales oficiales están ahora en `docs/referencias/assets/img/originales-oficiales/` y las licencias en `docs/licencias/fuentes/`. Se trasladaron sin modificar sus bytes; las imágenes utilizadas por el prototipo permanecen en `docs/referencias/assets/img/`. Esta reorganización no modifica el diseño ni las decisiones registradas.

**Versión original:** commit `a65e09d`, SHA-256 `f1033508aaebed48…` (prefijo). Para comparar: `git diff a65e09d -- docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html`.

---

## DC-001 — Header: reparto del espacio libre entre marca, enlaces y contacto

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aprobado por el propietario el 2 de noviembre de 2026.** |
| Solicitado por | Propietario |
| Sección | Header sticky (`.site-header`, `.brand`, `.nav`) |
| Problema | En escritorio, toda la navegación queda pegada a la derecha y deja un vacío grande entre el isotipo y el primer enlace. |

### Opciones consideradas
1. **Añadir «All Faiths Monuments» como texto junto al isotipo con la tipografía del logo.** Descartada. El manual prohíbe recrear «ALL FAITHS» con una fuente CSS (el lettering es arte oficial con contornos propios) y separar símbolo y texto (p. 15, «Reordenar elementos»). Además esa tipografía no es una fuente instalable.
2. **Lockup horizontal oficial.** Pendiente de solicitar al diseñador con la entrega de vectorizados. Si llega, sustituye a este ajuste.
3. **Reajuste del header sin texto.** **Elegida por el propietario.**

### Cambio aplicado
- `.brand img` pasa de `60px` a `72px` de ancho. El isotipo se usa íntegro y sin alterar proporciones. Con el header de 98 px de alto caben 72 px sin tocar la altura. El manual pide ≥ 32 px de isotipo.
- Nueva regla `@media(min-width:951px)`: `.nav{flex:1;margin-left:0}`, `.nav>a:first-child{margin-left:auto}` y `.nav>.nav-cta{margin-left:auto}`. El espacio libre se divide en dos vacíos iguales: marca | enlaces | Contact us + EN/ES.
- No se tocó el marcado, el texto, los colores, las tipografías ni los tamaños de letra. No se modificó ninguna media query heredada (≤1120, ≤950, ≤660 px). Por debajo de 951 px el menú móvil queda como estaba.

### Antes / después (descripción)
- **Antes:** isotipo de 60 px a la izquierda. Los 6 enlaces y el botón «Contact us» juntos a la derecha, con unos 700–800 px vacíos en medio.
- **Después:** isotipo mayor a la izquierda. Los 6 enlaces quedan en el centro del header y «Contact us» con EN/ES a la derecha. El espacio libre no desaparece, se reparte en dos vacíos más cortos (unos 170–190 px a 1440 px).

### Verificación
- Revisado en Edge headless en 1024, 1280, 1440 y 1920 px: sin desbordamiento ni solapamiento visible en el header. A 1024 px sigue vigente el isotipo heredado de 58 px.
- Pendiente: revisar foco por teclado en el header y el menú móvil (≤950 px) en un navegador real.

### Pendientes / riesgos
- El vacío sigue existiendo, repartido. Si el propietario quiere reducirlo más, habría que cambiar el tamaño o el espaciado de la navegación (altera la tipografía aprobada) o esperar el lockup horizontal oficial.
- El isotipo del header sigue siendo el PNG incrustado de 245×250 px, no el oficial de `media/logos/` (ver TODOS.md §4.1).
- Aprobación visual dada por el propietario en la conversación. Quedan sin revisar en navegador real el foco por teclado del header y el menú móvil.

---

## DC-002 — Menú principal: máximo 5 opciones y apartados en rutas propias

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aprobado por el propietario el 2 de noviembre de 2026.** |
| Solicitado por | Propietario |
| Sección | Header, navegación principal (`#mainNav`) |
| Problema | El menú tenía 6 enlaces más el botón de contacto. El propietario quiere un máximo de 5 opciones y que el producto no sea una sola página con scroll, sino rutas. |

### Cambio aplicado
- **Nueva categoría «Explore» / «Explorar»** (nombre elegido por el agente, por confirmar). Agrupa **Engraving, Gallery, Granite colors y Guidance**. Queda en la posición del primer enlace agrupado.
- **Opciones visibles en el menú:** Monuments · Explore · Our story · botón Contact us. Son 3 enlaces más el botón, dentro del máximo de 5.
- **Desplegable de escritorio** (sin librerías): botón con `aria-expanded` y `aria-controls`; panel plano en Hueso con borde fino, sin sombras, hover en Arena. Abre con clic o Enter/Espacio; cierra con Esc (devuelve el foco al botón), clic fuera o al salir el foco.
- **Rutas:** los cuatro enlaces pasan de anclas a `engraving/`, `gallery/`, `granite-colors/` y `guidance/`. **Esas páginas aún no existen, así que en este prototipo los enlaces no abren nada.**
- **Idioma:** nueva clave `navExplore` («Explore» / «Explorar»). Los cuatro enlaces conservan sus traducciones.
- **Menú móvil heredado (≤ 950 px):** sin cambios visibles. El botón del grupo se oculta y los cuatro enlaces siguen como lista plana, en el mismo orden y con el mismo estilo.
- Los 3 enlaces visibles conservan tipografía, tamaños y colores. La separación entre marca, enlaces y contacto sigue el reparto de DC-001.

### Antes / después (descripción)
- **Antes:** Monuments · Engraving · Gallery · Granite colors · Guidance · Our story · [Contact us].
- **Después:** Monuments · Explore ▾ · Our story · [Contact us]. Al abrir «Explore ▾» aparece un panel bajo el botón con los cuatro enlaces en lista vertical.

### Verificación
Probado en Edge headless con el navegador real, sin guardar imágenes:
- En 1280, 1440 y 1920 px: 4 elementos visibles en el menú, submenú cerrado al cargar, sin desbordamiento horizontal y sin errores de consola.
- Desplegable: abre con clic y con Enter, cierra con Esc (foco vuelve al botón) y con clic fuera. El panel queda dentro del viewport y a ras del borde inferior del header.
- ES: el botón pasa a «Explorar» y los enlaces a Grabados, Galería, Colores de granito y Orientación.
- 800 px: menú móvil abre con `aria-expanded`, el botón del grupo no se ve y se listan 7 enlaces en una columna, igual que antes.

### Efectos y pendientes (requieren decisión del propietario)
- **Separación visual.** Al haber menos enlaces, el espacio libre del header crece: unos 345 px a cada lado a 1280 px, 425 px a 1440 y 490 px a 1920. Es consecuencia de la agrupación; DC-001 quedó aprobado con 6 enlaces.
- **Nombre de la categoría.** «Explore»/«Explorar» es provisional. Alternativas posibles: «Our work», «Services», «Discover».
- **Contenido de la página de inicio.** Siguen en el HTML las secciones `#engraving` (tarjeta de servicios), `#gallery`, `#granite` (estudio de grabado) y `#guidance` (proceso). También siguen los enlaces del footer y de los botones («Ask about our work», etc.) que apuntan a esas anclas. No se tocó nada de eso: falta decidir qué queda en inicio como adelanto, qué se mueve y a dónde apunta cada enlace.
- **Diseño de las cuatro páginas nuevas:** pendiente de instrucciones.
- **Nombres y estructura de rutas** (también la propuesta `/en/` y `/es/` del SRS): placeholders hasta que se decidan.
- Foco por teclado del header y menú móvil revisados solo en navegador automatizado; no hay revisión humana.

---

## DC-003 — Rutas: Engraving, Gallery, Granite colors y Guidance

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («crea las rutas con lo que había previamente en los apartados») |
| Sección | Portada y cuatro páginas nuevas |
| Problema | Los enlaces del menú «Explore» (DC-002) no tenían destino. |

### Cambio aplicado
- **Cuatro páginas**, cada una en su carpeta con `index.html` (ruta `…/engraving/`, `…/gallery/`, `…/granite-colors/`, `…/guidance/`). Mismo utility bar, header, footer, ribbon y botón móvil que la portada. El enlace de la página activa lleva `aria-current="page"` en el desplegable.
- **Contenido movido tal cual desde la portada:**
  - `guidance/` → sección del proceso (columna fija y línea vertical numerada con scroll).
  - `gallery/` → galería de mosaico con los tres placeholders.
  - `granite-colors/` → sección «Every detail has meaning» con el estudio de grabado y las 3 muestras.
  - `engraving/` → contenido de la tarjeta «Engraving & lettering» de la sección de servicios («ON EXISTING STONE», título y texto).
- **Estas secciones se quitaron de la portada** (`#guidance`, `#gallery`, `#granite`). La portada queda con: hero, cielo, valores, servicios, historia y contacto. La tarjeta «Engraving & lettering» sigue en servicios.
- **Enlaces de la portada actualizados:** la tarjeta «Engraving & lettering» enlaza a `engraving/` (antes apuntaba a `#granite`); la tarjeta «Granite & finishes» («View materials») enlaza a `granite-colors/`; en el pie, Gallery, Granite colors y Guidance enlazan a sus rutas.
- **Títulos:** en las páginas nuevas el título de cada sección pasa de `h2` a `h1` (misma clase, mismo aspecto).
- **Estructura compartida.** Para no repetir 7 MB en cada página se extrajeron a `docs/referencias/assets/`: `site.css` (el CSS completo, sin cambios de reglas), `site.js` (el JS con comprobaciones para páginas que no tienen cada componente) y los dos PNG de logo (`afm-isotipo-header.png`, SHA-256 `f391a034…`; `afm-logo-completo-negativo.png`, SHA-256 `581a0759…`; bytes idénticos a los incrustados). La portada conserva embebidos el video y su póster. **El prototipo deja de ser un solo archivo autocontenido.**
- **Idioma entre páginas:** la elección EN/ES se guarda en `localStorage` (clave `afm-lang`) para que no vuelva al inglés al cambiar de ruta. El idioma inicial sigue siendo inglés.

### Página nueva `engraving/` (decisión de diseño del agente, por confirmar)
Como el contenido previo era solo una tarjeta, la página reutiliza el estilo del hero de la portada: eyebrow, título, texto, dos botones («Talk with our team» hacia el contacto de la portada y «Learn more» hacia `granite-colors/`) y a la derecha un placeholder de imagen con la nota de fotografía pendiente. Los botones son los de la portada; no se añadió texto nuevo.

### Verificación
Probado en Edge headless, sin guardar imágenes:
- Las 5 páginas cargan sin errores de consola ni recursos fallidos; no hay enlaces rotos entre ellas; sin desbordamiento horizontal en 1280, 1440 y 1920 px (portada) ni a 1440 px (páginas nuevas).
- Idioma: ES elegido en la portada se mantiene en `gallery/` y `engraving/`; al volver a EN se restaura en la ruta y se guarda.
- `granite-colors/`: escribir en el simulador actualiza la vista previa; elegir «Light» marca `aria-pressed` y aplica la placa clara. `guidance/`: el progreso de la línea cambia con el scroll y los 4 pasos se activan.
- Portada: el botón del video alterna «Pause film»/«Play film» y el formulario demo muestra que no se envió nada.
- Menú móvil (800 px) en una ruta: abre, 7 enlaces en lista plana, sin botón de grupo.

### Pendientes / decisiones del propietario
- Aprobación visual de las cuatro páginas, y en especial de `engraving/`, que es nueva en su composición.
- Qué contenido nuevo lleva cada página. Hoy `engraving/` y `guidance/` reutilizan solo lo que había.
- Navegación entre rutas: no hay migas de pan ni enlaces entre páginas más allá del menú y el pie.
- Nombres definitivos de las rutas y la propuesta `/en/` y `/es/` del SRS: siguen como placeholders (carpeta + `index.html` para que funcione abriendo los archivos en el navegador).
- El pie de página conserva «Gallery», «Granite colors» y «Guidance», pero no «Engraving».
- Title y description de las páginas nuevas son estáticos en inglés, como en la portada.
- Los PNG de logo siguen siendo los incrustados originales, no los oficiales de `media/logos/` (ver TODOS.md §4.1).

---

## DC-004 — Menú principal: texto más grande

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («se ve muy pequeño») |
| Sección | Header, navegación principal y selector de idioma |
| Problema | El texto del menú medía 11 px y se leía muy pequeño. |

### Cambio aplicado
- Enlaces del menú y botón «Explore» (y los enlaces del desplegable): **11 px → 15 px**, mismo peso y espaciado entre letras. 15 px es el tamaño del texto de párrafo de la web.
- «Contact us» y selector «EN / ES»: **11 px → 14 px**, un punto menos que los enlaces para que el botón no pese más que la navegación. Es decisión del agente, ajustable.
- Solo escritorio (≥ 951 px). Entre 951 y 1120 px sustituye al valor heredado de 10 px. El menú móvil heredado (13 px) no cambia.

### Verificación
- Tamaños computados en las cinco páginas: 15 px (enlaces y «Explore»), 14 px («Contact us» y EN/ES). Desplegable alineado al borde del header.
- Sin desbordamiento horizontal en 1280, 1440 y 1920 px.
- Pendiente: revisar a 951–1120 px en un navegador real.

### Pendientes
- Aprobación visual del tamaño. Si sigue pequeño, se sube; si el botón pesa, se igualan.

---

## DC-005 — Selector EN/ES en la barra superior

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Parcialmente sustituido por DC-012:** el control sigue igual, pero se movió de la barra superior al header. |
| Solicitado por | Propietario («reemplaza el personal guidance por el EN/ES y hazlo más intuitivo, que se vea más clickeable») |
| Sección | Barra superior (`.utility`) |

### Cambio aplicado
- El texto «PERSONAL GUIDANCE IN ENGLISH & SPANISH» se retira de la barra superior. Su traducción queda sin uso en `site.js`.
- En su lugar hay un **control segmentado** con dos botones, **EN** y **ES**, dentro de un recuadro de borde fino (Tinta). El idioma activo va **relleno** (fondo Tinta, texto Hueso). El inactivo es transparente y se oscurece al pasar el ratón. Cada botón mide unos 42×24 px, 12 px en negrita; el control completo, unos 86×26 px dentro de los 34 px de la barra. La barra no cambia de altura.
- Accesibilidad: grupo con `role="group"` y nombre «Language»/«Idioma»; cada botón con `aria-pressed`, `lang` propio y nombre «English»/«Español». Se maneja con teclado (Enter y Espacio). Tamaño de cada botón por encima del mínimo de 24 px de WCAG 2.2 AA.
- Se sustituye el control anterior, que era un solo botón («EN / ES» con el activo subrayado) que alternaba el idioma al pulsarlo.
- **Solo escritorio (≥ 951 px).** En ≤ 950 px se conserva el selector heredado del header, que ya existía en móvil (la barra superior se ocultaba por debajo de 660 px). Ambos controles se sincronizan. En escritorio el selector del header está oculto.
- Las traducciones, la persistencia entre rutas y el resto del comportamiento de idioma no cambian.

### Antes / después (descripción)
- **Antes:** a la derecha de la barra, texto «PERSONAL GUIDANCE IN ENGLISH & SPANISH»; el selector «EN / ES» en el header, junto al botón de contacto.
- **Después:** a la derecha de la barra, el control EN | ES con el idioma activo relleno. El header ya no lleva selector en escritorio.

### Verificación
Probado en Edge headless, sin guardar imágenes: en las 5 páginas el control aparece con EN activo; al pulsar ES cambian `lang`, `aria-pressed`, el nombre del grupo («Idioma») y los textos; la elección persiste al pasar a otra ruta; funciona con Enter y con Espacio. En 900, 800 y 600 px el control no aparece, el selector heredado sí, y al usarlo el control segmentado queda sincronizado.
**No he revisado el aspecto a ojo;** solo se midió con el navegador.

### Pendientes
- Aprobación visual (tamaño, grosor del borde, contraste del activo). El tamaño de 12 px y los 24 px de alto son decisión del agente y se pueden subir.

---

## DC-006 — «Contact us» como botón flotante

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («el Contact Us ahora será un botón flotante abajo a la derecha») |
| Sección | Header y botón fijo en todas las páginas |

### Cambio aplicado
- Nuevo botón fijo **abajo a la derecha** (32 px de cada borde), en todas las páginas. Fondo Tinta, texto Hueso, 15 px en negrita, 52 px de alto, relleno horizontal de 28 px. Al pasar el ratón o enfocarlo, pasa a Granito negro. Sin sombras ni iconos. Enlaza a `#contact` de la portada (desde las rutas, a esa misma sección de la portada). El texto es el de la traducción «Contact us»/«Contáctanos».
- **Sale del header** en escritorio. El menú (Monuments, Explore, Our story) queda **centrado** en el header, respecto del centro de la página. Esto sustituye el reparto de espacio de DC-001, pensado para el menú con el botón y el selector a la derecha. La parte derecha del header queda vacía.
- **En ≤ 950 px no se muestra el botón flotante.** Se conserva lo heredado: «Contact us» como última opción del menú desplegable y, en ≤ 660 px, la barra de contacto fija inferior.

### Antes / después (descripción)
- **Antes:** el botón oscuro «Contact us» a la derecha del header, junto al selector de idioma.
- **Después:** header con marca a la izquierda y los tres enlaces centrados. Botón oscuro flotante en la esquina inferior derecha, visible al hacer scroll.

### Verificación
Probado en Edge headless, sin guardar imágenes: en las 5 páginas el botón está en posición fija a 32 px del borde inferior y derecho y queda por encima de cualquier otro elemento en su posición; en la portada, al pulsarlo, se llega a `#contact`. El menú queda centrado en 1280, 1440 y 1920 px (el desfase de 7 px es el de la barra de desplazamiento) y no hay desbordamiento horizontal.
En 900, 800 y 600 px el botón flotante no se muestra y «Contact us» sigue en el menú.

### Pendientes / riesgos
- **Zona 661–950 px:** no hay barra inferior ni botón flotante; solo el contacto dentro del menú. Es el comportamiento heredado, no lo introdujo este cambio.
- **Solapamiento al final de la página:** el botón flotante tapa la esquina inferior derecha del pie, donde está el texto «Privacy policy · Accessibility · Draft for design review», y puede tapar contenido bajo él mientras se hace scroll. El recuadro «Desktop study» ocupaba ese mismo sitio.
- **Parte derecha del header vacía.** Alternativas posibles: alinear los enlaces a la derecha o reubicar algún elemento.
- En la portada el botón apunta al formulario también cuando ya estás viendo esa sección.

---

## DC-007 — Se elimina el recuadro «Desktop study · V1»

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario |

### Cambio aplicado
Se quita de las 5 páginas el recuadro fijo «DESKTOP STUDY · V1» (y sus reglas CSS, incluidas las móviles). Sus claves de traducción quedan sin uso en `site.js`. Resuelve el punto de TODOS.md §4.1 sobre si el recuadro formaba parte del diseño. La barra de contacto fija inferior móvil heredada se conserva.

### Verificación
Probado en Edge headless: el recuadro no existe en ninguna de las 5 páginas.

---

## Nota sobre DC-001 y DC-004
DC-005 y DC-006 sustituyen parte de ellos. El reparto de espacio de DC-001 (dos vacíos iguales con el botón y el selector a la derecha) ya no aplica, y los tamaños de «Contact us» y «EN / ES» de DC-004 (14 px) tampoco. Siguen vigentes del DC-001 el isotipo de 72 px y del DC-004 los 15 px de los enlaces del menú.

---

## DC-008 — Barra superior y header fijos juntos al hacer scroll

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Sin efecto desde DC-012:** la barra superior ya no existe en escritorio y solo el header queda fijo. |
| Solicitado por | Propietario («el espacio del selector EN/ES debe bajar junto al espacio del menú superior al scrollear») |
| Sección | Barra superior (`.utility`) y header |

### Cambio aplicado
- Solo escritorio (≥ 951 px). La barra superior (con el selector EN/ES) pasa a `position: sticky; top: 0` y el header a `top: 34px`, así que **los dos permanecen visibles juntos** al bajar. Alto total fijo: 34 + 99 = 133 px.
- Ajustes que acompañan al cambio, porque el bloque fijo es 34 px más alto: el desplazamiento de anclas (`scroll-padding-top`) pasa de 125 a 160 px y la columna fija del proceso (`.process-head`) de `top: 155px` a `189px`.
- En ≤ 950 px no cambia nada: la barra superior sigue desplazándose y solo el header queda fijo, como antes.

### Verificación
Probado en Edge headless: a 0, 800 y 2500 px de scroll la barra está en `top: 0` y el header entre 34 y 133 px. Con la navegación a `#monuments`, `#about` y `#contact` los destinos quedan a 160 px, libres del bloque fijo (que acaba en 133 px). A 900, 800 y 600 px la barra es `static` y el header sigue con `top: 0`.
No he verificado a ojo la columna fija del proceso: su nuevo `top` sale del CSS y no de una medición directa.

### Pendientes
- Con la barra y el header fijos, la zona de contenido visible se reduce 34 px. Aprobación visual pendiente.

---

## DC-009 — Prueba: logo completo oficial en el header

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado como prueba. Pendiente de decisión del propietario.** |
| Solicitado por | Propietario («probemos a usar el logo con el nombre de la empresa, no el isotipo… puedes eliminar el texto con el nombre y la ubicación») |
| Sección | Header y barra superior |

### Cambio aplicado
- **Logo:** en escritorio el header usa el logo completo oficial, versión positiva Tinta (`media/logos/A01_Completo_Tinta_Transparente.webp`). Se copió sin modificar a `assets/img/afm-logo-completo-tinta.webp` (SHA-256 `62feb546…`). Altura 96 px y ancho automático (137 px), con las proporciones originales. Se desplaza 10 px a la izquierda para que el **trazo** (no la transparencia del archivo) quede alineado con el borde del contenido. El header no cambia de altura.
- **Isotipo:** el header incluye las dos imágenes y CSS muestra una u otra. En ≤ 950 px se sigue usando el isotipo heredado, con sus tamaños de 56 y 50 px.
- **Texto de nombre y ubicación:** «ALL FAITHS MONUMENTS, INC. · GLENDALE · QUEENS · NEW YORK» deja de mostrarse en escritorio. Se oculta, no se borra, porque en ≤ 950 px sigue siendo el único texto de marca del móvil heredado. La barra superior queda solo con el selector EN/ES, a la derecha.
- El PNG del isotipo sigue usándose para el móvil.

### Corrección durante la prueba
La regla global `img{max-width:100%}` comprimía el logo a 127 px de ancho (proporción 1,32 en lugar de 1,43), es decir, lo deformaba. Se añadió `max-width: none`. Medido tras la corrección: 137,1 × 96 px, proporción 1,428, igual a la del archivo (3000 × 2100).

### ⚠ Incumple el manual
- **Ancho visible: ≈ 116 px** (el arte ocupa el 85 % del ancho del archivo). El manual exige **al menos 320 px** para el logo completo en pantalla y, si no cabe, usar una variante oficial apropiada en lugar de comprimirlo.
- **Descriptor «MONUMENTS»:** con 96 px de alto de archivo, sus mayúsculas miden unos **4 px** (estimación a partir de las proporciones del archivo, no medida). No se lee; el checklist A.6 del manual pide que el descriptor se distinga a la escala final.
- Para llegar a 320 px de ancho visible haría falta un logo de unos 265 px de alto, y por tanto un header de esa altura, inviable con un header fijo.

### Verificación
Probado en Edge headless: el logo carga en las cinco páginas (3000 × 2100 natural), sin errores de consola; sin desbordamiento en 1280, 1440 y 1920 px; sin solape con el menú en 960, 1120, 1280, 1440 y 1920 px (separación de 192 px o más entre el logo y el menú). El logo oficial es un WebP de un solo fotograma marcado como animado (todos los archivos de `media/logos/`); el navegador lo muestra como imagen estática. No he revisado el aspecto a ojo.

### Pendientes / decisiones del propietario
- **Qué hacer con este experimento:** (a) mantener el logo completo aunque incumpla el mínimo; (b) volver al isotipo; (c) pedir al diseñador una **variante horizontal** oficial legible en 98 px de alto, que es la solución prevista en el manual.
- Los WebP oficiales no son vectores: pedir los vectorizados sigue pendiente.
- Si se mantiene el logo completo, revisar si el logo negativo del pie y de «Our story» (460 px de ancho, PNG incrustado, no oficial) debe sustituirse por el oficial.

---

## DC-010 — El botón «Contact us» se oculta al llegar al pie

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («el botón de Contact us puede desaparecer al llegar al final») |
| Sección | Botón flotante (`.contact-fab`) |

### Cambio aplicado
- El botón se oculta con un fundido de 0,3 s (`opacity` y `visibility`, sin `pointer-events`) cuando el pie de página llega a su zona, y reaparece al subir. Así no tapa el texto legal del pie, que era uno de los pendientes de DC-006.
- Se usa un `IntersectionObserver` sobre el pie, con margen de 40 px. El botón ocupa de 32 a 84 px sobre el borde inferior; se oculta cuando el pie sube más allá de los 40 px inferiores de la ventana, es decir, justo cuando empezaría a solaparlo.
- Oculto, el botón sale del orden de tabulación. Con `prefers-reduced-motion` no hay fundido.
- Si el navegador no admite `IntersectionObserver`, el botón queda siempre visible.

### Verificación
Probado en Edge headless (ventana de 900 px de alto): con el pie a 900, 880 y 868 px del borde superior el botón sigue visible; con el pie a 850 y 820 px está oculto (el botón ocupa de 816 a 868 px). Al ir al final de la página queda oculto y al volver arriba reaparece. En la página `engraving/` (corta, 1589 px) el botón está visible al cargar y se oculta al acercarse al pie.

### Pendientes
- En páginas muy cortas, si el pie queda visible al cargar, el botón no se muestra.
- Aprobación visual.

---

## DC-011 — Nuevo eslogan principal

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Texto en inglés indicado por el propietario; traducción al español pendiente de su revisión.** |
| Solicitado por | Propietario |
| Sección | Título principal de la portada (`#hero-title`) |

### Cambio aplicado
- **Inglés:** «A lasting tribute / for every story.» pasa a «**A quiet place / for a name to rest.**» El texto es el que indicó el propietario.
- **Español:** el diccionario tenía «Un homenaje duradero / para cada historia.» (definido dos veces en `site.js`, la segunda sobrescribe a la primera). Se actualizaron ambas a «**Un lugar sereno / para que un nombre descanse.**». **Es una propuesta del agente**: el propietario no dio la versión en español, y AGENTS.md pide no publicar traducciones sin revisar cuando cambia un texto con carga emocional o funeraria.
- **Estructura (decisión del agente):** se conservó el formato del titular anterior: dos líneas, con la segunda en cursiva y color Piedra mediante `<em>`, y el corte después de «place» / «sereno». El propietario dio la frase en una sola línea; si la quiere sin cursiva o con otro corte, es un cambio de una línea.
- No se tocaron estilos ni tamaños.

### Verificación
Probado en Edge headless, sin guardar imágenes: en 1280, 1440 y 1920 px el titular en inglés ocupa **2 líneas** (80,6, 90,7 y 94 px de letra) y no desborda horizontalmente. En español a 1440 px ocupa **3 líneas** (la segunda, «para que un nombre descanse.», se parte), sin desbordar y sin cambiar la altura de la sección (886 px, fijada por la columna de la imagen). El cambio de idioma EN/ES/EN restaura el texto correcto. Sin errores de consola. No he revisado el aspecto a ojo.

### Pendientes
- Revisión de la traducción al español. Una alternativa más corta, para que quepa en 2 líneas, tendría que acortar la segunda línea.
- No se tocaron `<title>` («Memories made to last»), el `<meta description>` ni los textos secundarios de la portada que aún mencionan «lasting tribute» («Respectful support, from first idea to lasting tribute.»). Por si el nuevo eslogan debe reflejarse también ahí.
- Esos textos pertenecen a la voz de marca del manual: conviene que el propietario confirme que el eslogan encaja con el tono previsto.

---

## DC-012 — Selector EN/ES en el header y sin barra superior en escritorio

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («una mejor forma de mostrar el EN/ES sin esa barra de arriba, es espacio muerto») |
| Sección | Barra superior y header |

### Opciones propuestas
1. **Control segmentado en el header** (elegida por el propietario).
2. Selector compacto con desplegable («EN ▾»).
3. Texto simple «EN / ES» con el activo subrayado.

### Cambio aplicado
- **El control EN | ES pasa al header**, a la derecha, en el hueco que quedó libre tras sacar el botón de contacto. Es el mismo control de DC-005 (activo relleno, `aria-pressed`, `lang` propio, Enter y Espacio, grupo «Language»/«Idioma»). Queda alineado con el borde derecho del contenido y centrado en vertical dentro del header.
- **Tamaño algo mayor** que en la barra superior, decisión del agente para que no se vea pequeño junto a los enlaces de 15 px: cada botón de 46 × 28 px con letra de 13 px (antes 42 × 24 px y 12 px). Ajustable.
- **La barra superior desaparece en escritorio** (≥ 951 px, `display: none`). Se deja sin efecto DC-008: el header es lo único fijo, el desplazamiento de anclas vuelve a 125 px y la columna fija del proceso a `top: 155px`.
- **En ≤ 950 px no cambia nada:** la barra superior con el texto de nombre y ubicación sigue visible, el selector heredado del header está activo y el control segmentado oculto.
- Se quitó de las cinco páginas el contenedor `utility-right`, que ya estaba vacío.

### Antes / después (descripción)
- **Antes:** barra de 34 px arriba con el control EN | ES a la derecha, y debajo el header con el logo y el menú centrado, con la parte derecha vacía.
- **Después:** solo el header: logo a la izquierda, menú centrado y el control EN | ES a la derecha. Se recuperan los 34 px de la barra.

### Verificación
Probado en Edge headless, sin guardar imágenes:
- En las 5 páginas: la barra superior está oculta, el header está en `top: 0` con 99 px, el control está dentro del header y centrado en vertical (diferencia 0 px), sin errores de consola ni desbordamiento horizontal.
- Con scroll de 900 px el header sigue fijo y el control visible. Los destinos de `#monuments`, `#about` y `#contact` quedan a 125 px, libres del header (99 px). La columna del proceso tiene `top: 155px`.
- Idioma: ES por clic cambia `lang`, `aria-pressed`, el nombre del grupo, «Explorar» y «Contáctanos»; se mantiene al cambiar de ruta; EN por Enter.
- Separación a 960, 1120, 1280, 1440 y 1920 px: de 225 px o más entre el menú y el control, y de 192 px o más entre el logo y el menú; sin solapes.
- A 900, 800 y 600 px: barra superior visible con el texto, control segmentado oculto, selector heredado visible, isotipo, y la barra de contacto inferior en 600 px como antes.
No he revisado el aspecto a ojo.

### Pendientes
- Aprobación visual del tamaño del control (13 px, 28 px de alto) y de su posición.
- En escritorio el texto «ALL FAITHS MONUMENTS, INC. · GLENDALE · QUEENS · NEW YORK» ya no aparece en ningún sitio, ni siquiera oculto en la pantalla; sigue solo en ≤ 950 px.
- Con la barra fuera, el menú centrado y el control a la derecha dejan un hueco amplio entre ellos (unos 430 px a 1440 px).

---

## DC-013 — Header oscuro (Granito negro)

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («cambia el color de la barra del menú de arriba para que haga contraste con el resto de la página») |
| Sección | Header (escritorio) |

### Cambio aplicado
- **Color elegido por el agente:** **Granito negro `#15161A`**, de la paleta cerrada. Es la opción oscura que más contrasta con el Hueso de la portada y el fondo que el manual indica para el logo en versión negativa. No se añadió ningún color nuevo.
- **Header:** fondo Granito negro, texto Hueso y borde inferior fino en Hueso al 22 % (`--line-light`, ya usado en la web) para que se distinga sobre las secciones oscuras.
- **Logo:** al ser un fondo oscuro, el header pasa del logo oficial Tinta al **logo oficial claro `A03_Completo_Hueso`**, copiado sin modificar a `assets/img/afm-logo-completo-hueso.webp` (SHA-256 `b6c69a61…`). Se elimina la copia Tinta, que ya no se usa. Mismo tamaño (137 × 96 px) y mismas proporciones.
- **Menú:** enlaces, «Explore» y su flecha en Hueso; el subrayado al pasar el ratón en Hueso; el panel del desplegable en Granito negro con borde fino y hover en Hueso al 10 %.
- **Selector EN | ES:** borde y texto en Hueso; el idioma activo, relleno Hueso con texto Tinta.
- **Solo escritorio (≥ 951 px).** En ≤ 950 px se conserva el header claro heredado con el isotipo oscuro.

### Antes / después (descripción)
- **Antes:** header Hueso (casi igual que el fondo de la portada), con logo oscuro, enlaces oscuros y selector con relleno oscuro.
- **Después:** header Granito negro con logo, enlaces y selector claros, claramente separado de la portada.

### Verificación
Probado en Edge headless, sin guardar imágenes, en las 5 páginas:
- Contrastes calculados en el navegador: enlaces, «Explore», idioma inactivo y borde del selector, **16,8 : 1** sobre el header; idioma activo (Tinta sobre Hueso), **14,2 : 1**; enlaces del desplegable sobre su panel, **16,8 : 1**; header frente al fondo de la página, **16,8 : 1**. Todo por encima del mínimo AA de 4,5 : 1.
- El logo claro carga en las cinco páginas (3000 × 2100 natural, 137,1 × 96 px mostrado). Sin errores de consola ni desbordamiento horizontal.
- A 900 y 800 px el header sigue siendo el claro heredado: fondo Hueso, isotipo, enlaces y selector oscuros.
- Anillo de foco: es el global de la web, Bronce `#9A7B4F`; sobre Granito negro da unos 4,6 : 1 (cálculo manual; no verificado en el navegador porque el anillo solo existe al enfocar).
No he revisado el aspecto a ojo.

### Pendientes
- **Aprobación del color.** Alternativa: Tinta `#282520` (más cálida y algo menos oscura). También se podría probar un tono claro (Arena `#EFE7D4`), pero contrastaría muy poco con el Hueso.
- **Sobre secciones oscuras** (franja del cielo, historia, pie), el header también es Granito negro y solo lo separa el borde fino al 22 %. No se comprobó a ojo cómo se lee al pasar por ahí.
- Sigue vigente la prueba del logo completo (DC-009): su tamaño visible queda por debajo del mínimo del manual y el descriptor no se lee; en negativo sobre fondo oscuro la legibilidad puede ser distinta y no se ha comprobado.

---

## DC-014 — Pie de página: sin texto bajo el logo y logo centrado

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («quita este texto y ajusta el logo para que quede en esa ubicación centrado tanto en X como en Y») |
| Sección | Pie de página (`.footer-brand`) |

### Cambio aplicado
- **Texto eliminado:** «Thoughtfully crafted memorials and personal guidance for the families we serve.» (y su traducción) se quita del pie de las cinco páginas, en todos los anchos. La clave de traducción `footerDesc` y la regla CSS `.footer-brand p` quedan sin uso.
- **Logo centrado, solo escritorio (≥ 951 px).** El logo (el mismo PNG negativo, 400 × 274 px, sin modificar) queda:
  - **En X:** centrado dentro de la columna izquierda del pie (la de 1,2 fr).
  - **En Y:** con la misma distancia, **85 px**, entre el borde superior del pie y el logo, y entre el logo y la línea divisoria de «© All Faiths Monuments». Para igualarlas, el espacio inferior del bloque pasa de 90 a 85 px.
- **Referencia del centrado (decisión del agente):** la petición no decía respecto a qué centrar. Se tomó la columna del logo en horizontal y el espacio del pie en vertical. El PNG no tiene márgenes transparentes, así que centrar la caja equivale a centrar el trazo.
- Las columnas «Explore» y «Help & information» no cambian de sitio (siguen a 85 px del borde superior, alineadas arriba).
- En ≤ 950 px el pie conserva su composición heredada, con el logo a la izquierda; solo desaparece el texto.

### Antes / después (descripción)
- **Antes:** logo a la izquierda, con la frase debajo, y las dos columnas de enlaces a la derecha.
- **Después:** solo el logo, centrado en su mitad izquierda del pie. El pie es más bajo (unos 100 px menos) porque ya no ocupa el texto ni sus márgenes.

### Verificación
Probado en Edge headless, sin guardar imágenes: en las 5 páginas el texto no está en el pie. En 960, 1280, 1440 y 1920 px el centro del logo coincide con el centro de su columna (desfase 0 px) y hay 85 px arriba y 85 px abajo; sin desbordamiento horizontal ni errores de consola. A 800 y 600 px el pie sigue con el logo a la izquierda.
No he revisado el aspecto a ojo.

### Pendientes
- Si por «centrado» se quería respecto a toda la anchura del pie o al centro de la página, es otro cálculo: dímelo.
- Con el logo centrado en su columna y los enlaces pegados a la derecha, queda un hueco amplio entre ambos.

---

## DC-015 — Prueba de color: Bronce envejecido como acento

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML como prueba. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («usemos el color de este elemento para algunos otros elementos de la página; ese bronce le gustó mucho al cliente y quiere que juguemos un poco con él») |
| Sección | Portada, menú, secciones oscuras y pie (CSS compartido) |

### Cambio aplicado
Se usa el **Bronce envejecido de la paleta (`--bronze`, #9A7B4F)**, sin color nuevo, en seis acentos:
- **Titular de la portada:** la segunda línea en cursiva («for a name to rest.») pasa de Piedra a Bronce.
- **Línea de la portada** junto a «Scroll to explore»: de Piedra a Bronce (decorativa).
- **Subrayado del menú del header** (y el del grupo «Explore» al pasar el ratón): de Hueso a Bronce (solo escritorio).
- **Etiquetas pequeñas sobre fondo oscuro** (franja del cielo y sección de historia): de Lino a Bronce.
- **Títulos de columna del pie** («Explore», «Help & information»): de Lino a Bronce.
- **Subrayado al pasar el ratón por los enlaces del pie:** Bronce.

Ya usaban Bronce antes: el anillo de foco, el punto de la barra superior, el «1975» de la historia y el paso activo del proceso. Se deja sin tocar la regla de uso del manual: el bronce es un acento discreto, no un segundo color dominante.

### Criterio de contraste (WCAG 2.2 AA)
Bronce sobre Hueso da 3,66:1 y sobre Granito negro 4,58:1. Por eso: sobre claro solo se usa en texto grande (el titular, 81–94 px, exige 3:1) y en una línea decorativa; el texto pequeño con Bronce solo va sobre Granito, donde supera 4,5:1. **No se usó** en texto pequeño sobre Hueso o Arena, ni como fondo de botones con texto claro, porque no llegarían a 4,5:1.

### Antes / después (descripción)
- **Antes:** el bronce solo aparecía en detalles minúsculos; el resto de acentos eran Piedra, Lino o Hueso.
- **Después:** una nota cálida recorre la página: titular de la portada, subrayado del menú, etiquetas de las secciones oscuras y títulos del pie.

### Verificación
Probado en Edge headless, sin guardar imágenes: en las 5 páginas, a 1280, 1440 y 1920 px, los colores calculados y los contrastes son los indicados arriba; sin desbordamiento horizontal ni errores de consola. A 800 px el titular también va en Bronce y no hay desbordamiento. No he revisado el aspecto a ojo. El subrayado del pie al pasar el ratón está comprobado en el código, no con el cursor.

### Pendientes
- Al no recibir la imagen del elemento de referencia, tomé el Bronce de la paleta como el color pedido. Si el elemento tenía un tono distinto, indícalo.
- La elección de los seis acentos es mía; el propietario puede quitar o añadir. Candidatos que no apliqué por contraste: botones, enlaces y etiquetas pequeñas sobre fondos claros.

---

## DC-016 — «Contact us» como ruta propia

| Campo | Detalle |
|---|---|
| Fecha | 2 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («el apartado de Contact us debería ser una ruta específica para el usuario, no la parte final de la página») |
| Sección | Portada, nueva ruta `contact/`, y enlaces de las cinco páginas |

### Cambio aplicado
- **Nueva página `docs/referencias/contact/index.html`** con la sección de contacto que estaba al final de la portada, sin cambios de contenido, diseño ni traducciones: encabezado «We're here to listen.», datos de visita, contacto directo y horarios, y el formulario de **demostración** (sigue sin enviar nada). Usa el mismo header, pie, CSS y JS que las demás rutas. El título «We're here to listen.» pasa de `h2` a `h1`, como en las otras rutas, para que la página tenga un encabezado principal.
- **Portada:** se elimina la sección de contacto (y el ancla `#contact`). Ahora termina en la historia del taller y el pie.
- **Enlaces:** todos los que iban a `#contact` apuntan a la ruta: botón «Talk with our team» de la portada, «Contact us» del menú (visible en ≤ 950 px), botón flotante, llamado móvil heredado, enlace del pie y el enlace «Ask about our work» de Gallery y similares. Eran 6 en la portada y 3–4 en cada ruta.
- **Dentro de la propia ruta `contact/`:** se quitan el botón flotante y el llamado móvil heredado, porque enlazarían a la misma página; el enlace del menú móvil queda marcado con `aria-current="page"`.
- **Sin cambios:** el desplegable «Explore» sigue con sus cuatro rutas y el menú principal con sus cinco opciones; las anclas `#top`, `#monuments` y `#about` siguen igual.

### Antes / después (descripción)
- **Antes:** «Contact us» llevaba al final de la portada, tras recorrer toda la página.
- **Después:** «Contact us» abre una página propia, con el mismo diseño de dos columnas. La portada es más corta.

### Verificación
Probado en Edge headless, sin guardar imágenes: en las 6 páginas no hay enlaces `#contact` ni anclas rotas, sin errores de consola. El botón de la portada y el flotante llevan a `contact/`. El formulario de la nueva ruta muestra el aviso de que no se envió nada, en inglés y en español, y el idioma elegido se mantiene. A 1280, 1440 y 1920 px no hay desbordamiento horizontal y el texto y el formulario quedan lado a lado; a 800 y 600 px se apilan, como antes, sin desbordamiento. No he revisado el aspecto a ojo.

### Pendientes
- La ruta se llama `contact/` como placeholder; el SRS propone rutas por idioma (`/en/`, `/es/`) y los nombres definitivos siguen sin decidir.
- La página es solo la sección que ya existía. Si debe tener otra composición (por ejemplo un encabezado de página o un mapa), dime qué.
- En escritorio el enlace «Contact us» del menú sigue oculto, como en DC-006, y la entrada es el botón flotante. Si quieres que aparezca en el menú, dímelo.

---

## DC-017 — «Our story» como ruta propia, con el monograma y el Bronce como protagonistas

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («esta sección se solapa con el footer; Our Story debería ser una ruta aparte y una sección completa; usar el monograma, no el logo con texto, y bastante el color bronce») |
| Sección | Portada (se retira la historia), nueva ruta `about/`, enlaces de las seis páginas, CSS y textos ES |

### Problema
La historia era la última sección de la portada, en Granito negro, igual que el pie: ambos bloques se fundían sin separación visible y la sección parecía solaparse con el footer. Además era una franja corta, con el logo completo repetido (también está en el pie).

### Cambio aplicado
- **Nueva página `docs/referencias/about/index.html`**, con header, pie, CSS y JS compartidos, en tres tramos:
  1. **Monograma + titular (Granito negro).** A la izquierda, la **paloma oficial en Bronce envejecido** (`A05_Paloma_Bronce_envejecido`, copia sin modificar en `assets/img/afm-paloma-bronce.webp`; SHA-256 `45a37c97de18…` igual al original) entre dos filetes de Bronce, con «FAMILY-OWNED · QUEENS, NEW YORK» en Bronce. A la derecha, la etiqueta en Bronce, el titular «Crafted by hand. *Guided by heart.*» (segunda línea en cursiva Bronce), el texto de siempre y las tres insignias con el filete en Bronce.
  2. **Principios (Granito negro).** «What guides us» + lista numerada 01–03 con los textos ya existentes de los valores (We listen / We guide / We preserve), números y filetes en Bronce. Es una lista, no tres tarjetas iguales.
  3. **Desde 1975 (Hueso).** Placeholder de fotografía del taller, «Since **1975**» con el año en Bronce grande, ubicación (dato ya existente en el sitio), nota de que el año requiere confirmación documental (PD-01) y botón «Talk with our team» hacia `contact/`. Esta franja clara separa la página del pie oscuro.
- **Portada:** se elimina la sección de historia y el ancla `#about`. Termina en servicios y pie.
- **Enlaces:** «Our story» (menú del header y pie) apunta ahora a `about/index.html` en las seis páginas; en la propia ruta lleva `aria-current="page"`.
- **Textos nuevos (EN/ES):** `aboutTitle`, `aboutPrinciplesKicker`, `aboutPrinciplesTitle`, `aboutPhotoNote`, `aboutSinceKicker`, `aboutSince`, `aboutSinceCopy`, `aboutSinceNote`. El resto reutiliza claves existentes.

### Antes / después (descripción)
- **Antes:** franja oscura al final de la portada con el logo completo en blanco y un bloque de texto, pegada al pie también oscuro.
- **Después:** página completa; la paloma en Bronce sustituye al logo con texto en esta sección; el Bronce marca etiquetas, filetes, números, la cursiva del titular y el año. Granito → Granito → Hueso → pie.

### Contraste (WCAG 2.2 AA)
Bronce sobre Granito negro: 4,58:1 (texto pequeño admitido). Bronce sobre Hueso: 3,66:1, usado **solo en texto grande** («Since 1975», 40–168 px, exige 3:1). El texto pequeño sobre Hueso va en Piedra/Tinta. Cuerpo sobre Granito en Lino.

### Verificación
Edge headless, sin guardar imágenes en el repositorio: a 1280, 1440 y 1920 px (y 800 px) sin desbordamiento horizontal; ES cambia titular (con la cursiva Bronce), «Desde» y la nota; la portada ya no tiene `#about` y enlaza dos veces a la ruta. Revisada a ojo a 1440 px y a 480 px (heredado). No he comprobado el desplegable ni el foco con teclado en la nueva página más allá de reutilizar el mismo markup y JS.

### Pendientes
- **1975:** se mantiene por la regla del proyecto, pero publicarlo exige respaldo documental (PD-01); por eso la página lleva la nota visible. Si prefieres quitar el año hasta tenerlo, dímelo.
- **Fotografía del taller:** placeholder, a la espera de imagen autorizada.
- **Contenido:** la página solo usa textos y datos ya existentes; no hay historia de fundadores, fechas ni hechos nuevos. Si quieres más contenido (la historia de la familia, hitos, equipo), hay que aportarlo.
- La ruta se llama `about/` como placeholder (rutas definitivas sin decidir).
- La variante del monograma sobre Granito (Bronce, A05) es mi elección; la paloma Piedra (A04) quedaría más apagada. Confirma si es la variante definitiva.
- En el HTML queda CSS `.story*` sin uso en la portada; se conserva por si se reutiliza y se limpiará en otro cambio.

---

## DC-018 — Enlace «Our story» en la sección «How we work» de la portada

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («esta sección debería tener un CTA que te lleve a Our Story») |
| Sección | Portada, sección de valores en Arena («What matters in our work.» / «Lo que importa en nuestro trabajo.») |

### Cambio aplicado
- Bajo el párrafo de la columna izquierda se añade un enlace de texto **«Read our story» / «Conoce nuestra historia»** hacia `about/index.html`. Usa el estilo `textlink` ya existente (Tinta con subrayado fino de Piedra), igual que «Not sure where to begin? We can help.» en servicios; sin color ni componente nuevos.
- Nuevo texto `valuesCta` (EN/ES) y 38 px de separación sobre el enlace.

### Antes / después (descripción)
- **Antes:** la sección terminaba con el párrafo; sin salida hacia la historia.
- **Después:** el párrafo es seguido por un enlace discreto a la ruta «Our story». La lista de tres valores de la derecha queda igual.

### Verificación
Edge headless, sin guardar imágenes en el repositorio: a 1280, 1440 y 1920 px el enlace apunta a `about/index.html`, cambia a «Conoce nuestra historia» en ES y no hay desbordamiento horizontal. Revisado a ojo a 1440 px. Contraste de Tinta sobre Arena, muy por encima de 4,5:1.

### Pendientes
- Elegí un enlace de texto y no un botón para no competir con el CTA principal de la portada; si lo quieres como botón, dímelo.

---

## DC-019 — Fotografía real en el hero y retiro de los textos internos de trabajo

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Estado | **Aplicado en el HTML. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («usaremos esta foto en este espacio»; «elimina todos los textos de descripciones que digan cosas como "espacio para" o "pendiente de"… son de trabajo interno») |
| Sección | Hero de la portada; servicios; rutas `about/`, `engraving/`, `gallery/`, `contact/`; pie de las seis páginas; textos ES |

### Cambio aplicado
- **Foto del hero:** el placeholder de la portada se sustituye por `assets/img/Photo1-graveyard.jpg` (aportada por el propietario, 1600 × 1066, sin modificar), con `object-fit: cover` (encuadre al 42 % horizontal) y el marco interior en Hueso para que se vea sobre la foto. Texto alternativo en EN y ES (`data-alt-es`, aplicado al cambiar de idioma).
- **Textos internos retirados** (EN y ES): «PHOTO PLACEHOLDER · REAL MEMORIAL», «Authorized photography · natural light», «Photography reserved for approved real work.», «IMAGE PLACEHOLDER» (3 tarjetas de servicios, `about/`, `engraving/`), «Image areas are reserved for authorized photographs…», «APPROVED PROJECT PHOTO · A/B/C» y «Portfolio images will display only real work…» (Gallery), «Space reserved for an authorized photograph of the workshop.» (`about/`), «The founding year requires documentary confirmation before publication.» (`about/`), «Hours require confirmation before publication.» y «· FROM PROVIDED SITE» (Contact; la etiqueta queda en «HOURS»/«HORARIO») y «· Draft for design review» del pie.
- Los recuadros de fotografía que aún no tienen imagen (servicios, Gallery, Engraving, About) se quedan como bloques de color Lino, sin rótulo; ahora son `aria-hidden` en lugar de anunciar «placeholder» a lectores de pantalla.
- **Se conservan** los avisos que informan al visitante: la nota del formulario de que **no envía mensajes** (AGENTS §6/§7), «Please confirm your route before visiting», y los avisos de que las muestras de granito y el simulador son **ilustrativos** (Granite colors).

### Antes / después (descripción)
- **Antes:** rectángulo Lino con etiqueta «PHOTO PLACEHOLDER» y dos rótulos internos bajo la foto; etiquetas de «IMAGE PLACEHOLDER» en servicios y About; leyendas de trabajo en Gallery, Contact y pie.
- **Después:** fotografía real del cementerio en el hero; el resto de bloques sin imagen quedan limpios y sin texto interno.

### Verificación
Edge headless, sin guardar imágenes en el repositorio: en las 7 páginas se leyó el texto visible en EN y ES y no queda ninguno de los textos retirados; a 1440 px no hay desbordamiento horizontal; el alt de la foto cambia a español. Revisado a ojo el hero a 1440 px (se corrigió un estirado inicial de la imagen con `object-fit`).

### Pendientes / riesgos para el propietario
- **Permisos de la foto:** en las lápidas se leen apellidos de personas (por ejemplo Vassallo, Korb, Collado). AGENTS §4.4 pide revisar nombres y permisos de publicación; conviene confirmarlo o recortar/difuminar antes de publicar.
- **Tono de la foto:** el cielo azul y el verde son bastante saturados frente al manual («luz natural suave, sin dramatismo»). No se retocó (se conserva el archivo original).
- **Autoría:** la foto muestra un cementerio, no una obra de la empresa; no lleva leyenda. El placeholder previo decía «trabajo real».
- **Textos retirados con efecto comercial:** al quitar las notas, el año **1975** y los **horarios** se muestran sin aviso de «por confirmar» (siguen pendientes PD-01 y PD-11 del SRS). Si prefieres, se pueden retirar esos datos hasta confirmarlos.
- **Redes y tamaño:** la foto pesa ~420 KB; se puede optimizar en la Fase B sin cambiar el aspecto.

---

## DC-020 — Bucle del video del cielo sin corte visible

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Estado | **Aplicado en el HTML/JS. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («ajusta esta animación para que no se note en qué momento acaba y vuelve a comenzar») |
| Sección | Franja del cielo de la portada (`site.js`) |

### Problema
El video dura unos 10 s y el `loop` nativo salta del último fotograma al primero: las nubes y el rayo de luz «saltan» y se nota el reinicio.

### Cambio aplicado
- **Mismo archivo, sin recodificar.** El JS crea una segunda capa `<video>` con el mismo contenido (copia en memoria del mismo `data:` URI; el HTML no crece) y la apila sobre la primera.
- **Fundido cruzado de 1,6 s:** cuando la capa activa llega a 1,6 s del final, la otra arranca desde el inicio y aparece con un fundido lineal mientras la primera sigue reproduciéndose debajo; al terminar, la saliente se pausa y vuelve al inicio, lista para el siguiente ciclo. Resultado: el final se disuelve en el principio en lugar de saltar.
- **Controles conservados:** el botón «Pause film / Play film» actúa sobre la capa activa (y la otra si está en pleno fundido) y su rótulo/`aria-pressed` siguen coherentes en EN y ES; con `prefers-reduced-motion` el video sigue sin arrancar; sin JS queda el `loop` nativo del HTML.
- La segunda capa es decorativa (`aria-hidden`, sin foco). El atributo `loop` se retira por JS solo cuando el fundido está activo.
- No cambia el aspecto del video, su tamaño, su póster ni el panel de texto.

### Antes / después (descripción)
- **Antes:** a los ~10 s la imagen salta al comienzo.
- **Después:** a los ~8,4 s el final se disuelve suavemente en el principio, de modo que el ciclo completo dura ~8,4 s y no se aprecia el corte.

### Verificación
Edge real (modo headless, controlado por CDP), sin guardar imágenes: adelantando el video a 3 s del final se observó el fundido (opacidad de la capa entrante 0,23 → 0,68 → 1,00 en ~1,6 s), la capa saliente pausada y reiniciada al terminar, y la reproducción continua en el siguiente ciclo; pausar y reanudar con el botón funciona durante y después del bucle; las dos capas siguen silenciadas. No he podido comprobar a ojo la calidad del fundido en movimiento, solo la mecánica; conviene verlo un par de ciclos.

### Pendientes
- Si el fundido se nota demasiado largo o corto, se ajusta `FADE` (1,6 s) en `site.js`.
- Cada capa decodifica el video: en equipos muy modestos puede notarse algo más de consumo mientras dura el fundido.
- En la Fase B hay que reproducir este mecanismo (dos capas) y no volver al `loop` nativo.

---

## DC-021 — Imágenes en WebP para reducir el peso

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Estado | **Aplicado. Pendiente de aprobación visual del propietario.** |
| Solicitado por | Propietario («¿puedes pasar las imágenes a WebP para que pesen menos?») |
| Sección | `assets/img/` y las referencias de las 7 páginas |

### Cambio aplicado
| Archivo | Antes | Después | Método |
|---|---|---|---|
| Foto del hero | `Photo1-graveyard.jpg` 428,9 KB | `Photo1-graveyard.webp` 357,0 KB (−17 %) | WebP con pérdida, calidad 70, mismas dimensiones (1600 × 1066) |
| Isotipo del header (≤ 950 px) | `afm-isotipo-header.png` 41,5 KB | `.webp` 19,0 KB (−54 %) | WebP **sin pérdida** |
| Logo negativo del pie | `afm-logo-completo-negativo.png` 61,8 KB | `.webp` 33,6 KB (−46 %) | WebP **sin pérdida** |

Ahorro total en archivos de imagen: ~121 KB. Los originales se eliminan del árbol de trabajo y quedan en el historial de Git.

### Lo que no se tocó
- **Logos oficiales** (`afm-logo-completo-hueso.webp`, `afm-paloma-bronce.webp`): ya eran WebP y se conservan sin modificar.
- **Póster del video** (JPEG de ~44 KB, embebido en el HTML) y **video** (MP4 de ~5 MB embebido): AGENTS exige reutilizarlos sin reemplazo ni transcodificación.

### Verificación
- Los dos logos convertidos se compararon píxel a píxel (RGBA) con sus PNG: **idénticos**, sin diferencia alguna.
- La foto se pasó de JPEG a WebP con pérdida: PSNR ≈ 33 dB frente al JPG (diferencia no visible a simple vista en el hero). No se probó a calidad 80–85: el WebP salía más pesado que el JPG original, que ya estaba bien comprimido.
- Edge headless, sin guardar imágenes: las 7 páginas cargan todas sus imágenes con las dimensiones esperadas y sin referencias a los archivos antiguos; el hero a 1440 px se ve igual.

### Pendientes / propuestas
- **El mayor peso no es de imágenes:** el video (~5 MB) va embebido en el HTML de la portada (~6,9 MB en total). Sacarlo a un archivo `.mp4` con los mismos bytes bajaría el HTML a unas decenas de KB y permitiría caché del navegador; no cambia el aspecto, pero cambia cómo se carga. Se propone para aprobación (la Fase B lo permite).
- **Logo del header:** `afm-logo-completo-hueso.webp` (3000 × 2100, 197 KB) se muestra a 96 px de alto en todas las páginas. Una versión reducida bastaría, pero implica modificar un archivo oficial; se deja a decisión del propietario (idealmente con los vectores).
- Navegadores sin WebP: no se contempla (WebP se admite en todos los navegadores actuales).

## DC-022 — Atribución de Incubia Lab en el pie

| Campo | Detalle |
|---|---|
| Fecha | 3 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Copyright del pie de página en la portada y las rutas |

### Cambio aplicado

Se añadió `- By Incubia Lab` después de `© All Faiths Monuments, Inc.` y antes de la ubicación en el pie de la portada y de las seis rutas (`about/`, `contact/`, `engraving/`, `gallery/`, `granite-colors/` y `guidance/`).

### Verificación

Se comprobó la misma atribución en las siete páginas fuente y se actualizó la exportación estática empaquetada. El cambio solo añade la línea de atribución; no altera composición, navegación ni interacciones.


## DC-023 — Encabezado y pie luminosos

| Campo | Detalle |
|---|---|
| Fecha | 4 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: aclarar encabezado y pie y contrastarlos con el cuerpo crema. |
| Estado | Aplicado en prototipo; pendiente de revisión visual del propietario. |

Se sustituye el Granito negro del encabezado de escritorio y del pie por Arena (`#EFE7D4`), diferenciada del fondo Hueso (`#FAF6ED`) mediante el cambio de tono y un filete. Se usa Tinta para navegación y texto, Piedra para etiquetas secundarias y el logo positivo oficial A01 sobre Arena, combinación contemplada por el manual. El encabezado móvil y su menú adoptan la misma superficie. Se conservan las dimensiones, navegación, selector de idioma e isotipo móvil. El contenido y los fondos oscuros fuera del encabezado y pie no cambian.

Verificación: Edge cargó la portada a 390, 1280, 1440 y 1920 px sin desbordamiento horizontal y con los logos disponibles; revisión visual del pie y encabezado a 1440 px. Pendiente la revisión visual completa de las demás rutas y tamaños.


## DC-024 — Fotografías aportadas por el propietario

Fecha: 4 de noviembre de 2026. El propietario entregó un ZIP de 53 fotografías y autorizó su organización y uso en el sitio. Se seleccionan tres imágenes para los espacios de galería y una para grabados, sin atribuir materiales ni técnicas no verificadas. Las versiones web respetan orientación y proporciones, limitan el lado mayor a 1600 px y se exportan en WebP; el nombre conserva el identificador original. El ZIP original se conserva y las fotografías originales se organizan aparte del repositorio. Pendiente de revisión visual del propietario y validación de derechos y datos visibles antes de publicar.

## DC-025 — Fotografías completas en la galería

Fecha: 4 de noviembre de 2026. A petición del propietario, se sustituyen los marcos de altura fija por una cuadrícula que muestra las tres imágenes completas, a su proporción natural: tres columnas en escritorio y una en móvil. La composición anterior recortaba partes de los monumentos. No se modifican las fotografías originales.


## DC-026 — Fotografías para servicios e historia

Fecha: 4 de noviembre de 2026. A solicitud del propietario se ocupan los tres espacios de imagen de servicios con fotografías aportadas y el espacio de la página de historia con la fotografía existente del cementerio, sin presentarla como taller o local. Las fotografías de monumentos se muestran completas, conservando proporciones. Las muestras del simulador de granito permanecen ilustrativas, no representan inventario confirmado.


## DC-027 — Fotografías variadas

Fecha: 4 de noviembre de 2026. A solicitud del propietario, cada espacio fotográfico utiliza una imagen diferente de las aportadas. Se conservan los identificadores originales, las proporciones y los textos alternativos bilingües.


## DC-028 — Galería ampliada y visor de detalles

4 de noviembre de 2026. El propietario solicita más fotografías y un diseño de galería más atractivo. Se amplía de 3 a 12 espacios con imágenes distintas, ya ocupados con fotografías reales aportadas. Composición en columnas de altura natural (3/2/1), pie descriptivo bilingüe y fondo Hueso. Las imágenes conservan su encuadre completo. Se añade visor ampliado con diálogo nativo, cierre con Escape, anterior/siguiente y flechas de teclado; sin JS los enlaces abren las imágenes.

Verificación: Edge a 390, 1280, 1440 y 1920 px; 12 imágenes distintas cargadas y proporciones conservadas; sin desbordamiento horizontal ni errores de JavaScript. Apertura, cambio con flechas, cierre con Escape, restitución del foco y cambio EN/ES comprobados. Revisión visual de la página completa a 1440 px.


## DC-029 — Colección de 18 fotografías

4 de noviembre de 2026. Por solicitud del propietario se añaden seis fotografías distintas (SNY01603, SNY01661, SNY01696, SNY01711, SNY01814 y SNY01823) a los doce espacios existentes. Se preparan desde el ZIP WebP conservando proporciones y un lado máximo de 1600 px. Se actualiza el contador bilingüe; el visor incorpora automáticamente las nuevas imágenes.

Verificado en Edge a 390, 1280, 1440 y 1920 px: 18 imágenes distintas cargadas, proporciones completas, sin desbordamiento horizontal ni errores de JavaScript; apertura del visor, flechas, Escape, retorno del foco e idioma EN/ES correctos.


## DC-030 — Contacto orientado a las familias

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Formulario de la ruta `contact/` |

### Cambio aplicado

Se reemplazó el texto de demostración por una invitación dirigida a las familias que consultan al negocio. El encabezado, la explicación, el botón y la nota se actualizaron en inglés y español. La nota explica que las consultas en línea aún no están disponibles, que los datos ingresados no se envían y ofrece usar teléfono o correo; al intentar enviar, un estado accesible aclara que la consulta no fue enviada y remite a esos canales. No se añadió almacenamiento ni servicio de envío.

### Verificación

Revisión estática de las copias EN/ES y del manejador `submit`: no presenta el formulario como operativo ni muestra confirmación de recepción. Pendiente verificar en navegador cuando esté disponible.


## DC-031 — Formulario con contenido de versión final

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Formulario de la ruta `contact/` |

### Cambio aplicado

Se retiró la nota visible sobre el estado del formulario y el aviso posterior al envío que decía que la consulta no se había enviado. El formulario ahora presenta el contenido final dirigido a las familias y la confirmación bilingüe esperada tras enviar. La integración de persistencia y envío queda pendiente para la etapa de backend.

### Verificación

Revisión estática de las copias EN/ES y del estado accesible `role="status"`. La confirmación es actualmente una representación del flujo esperado hasta conectar el envío real; no se verificó en navegador.


## DC-032 — Video del cielo sin leyenda ni control manual

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Video panorámico del cielo en portada |

### Cambio aplicado

Se retiraron la leyenda «SKY · MOTION STUDY» / «CIELO · VIDEO» y el botón para pausar o reproducir. El video conserva su reproducción silenciosa en bucle, el fundido cruzado existente y la pausa automática del sistema cuando está activado `prefers-reduced-motion`. Se mantuvo el filete divisorio sobre la nota editorial.

### Verificación

Inspección estática del HTML, estilos y lógica compartida: no quedan control ni leyenda asociados al video; el bucle y el respeto a `prefers-reduced-motion` se conservan. Pendiente verificación visual en navegador.


## DC-033 — Legibilidad de textos secundarios

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Textos secundarios de las páginas del prototipo |

### Cambio aplicado

Se aumentó en escritorio el tamaño de las descripciones de servicios y valores, pasos de orientación, notas sobre muestras, información y campos de contacto, etiquetas de categorías, enlaces secundarios, galería y pies de imagen. Se conservaron intactos los estilos móviles heredados. Se retiró del contenido visible «Privacy policy · Accessibility», que no tenía enlaces a destinos implementados, y se dejó una nota HTML para incorporarlos cuando existan.

### Verificación

Revisión estática de las reglas CSS y de las siete páginas; los textos informativos con color Piedra sobre Hueso/Arena mantienen contraste superior a 4.5:1. `git diff --check` sin errores. No se pudo verificar visualmente en navegador.


## DC-034 — Llamadas de servicio y materiales temporalmente ocultos

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Tarjetas de servicios, navegación Explore y pies |

### Cambio aplicado

The monuments and engraving card calls to action lead to `gallery/` to view examples. The former materials card now invites visitors to contact the team at `contact/` and does not present material or finish options. The `granite-colors/` route is temporarily removed from menus, footers, and the engraving page; its source page remains available for later reactivation.

### Verificación

Inspección estática de enlaces de las siete páginas: se retiraron los catorce enlaces a `granite-colors/` de navegación y pies, el CTA de monumentos apunta a `gallery/`, el de grabados a `engraving/` y el de materiales a `contact/`. Pendiente comprobación visual en navegador.

## DC-035 — Indicador de la ruta actual en la navegación

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Encabezado y desplegable «Explore» en escritorio |

### Problema y cambio aplicado

Los enlaces de las rutas ya tenían `aria-current="page"`, pero no se distinguían visualmente. Con el desplegable cerrado, tampoco se veía que Grabados, Galería u Orientación pertenecían a la sección actual. Ahora el grupo «Explore» conserva un subrayado de bronce en esas tres rutas; al abrirlo, el enlace activo muestra una superficie Hueso y una línea lateral de bronce. «Our story» también conserva el subrayado cuando es la ruta actual. Se reutilizan la paleta y la geometría del menú, sin cambios en el HTML, el JavaScript ni los estilos móviles heredados.

### Verificación

Revisión visual en Chrome a 1280, 1440 y 1920 px en Galería, con el desplegable cerrado y abierto; «Explore» conserva el subrayado y «Gallery» muestra la marca lateral. El ancho del documento coincide con el ancho disponible en los tres tamaños, sin desbordamiento horizontal. En Grabados y Orientación, el grupo conserva la misma marca; en «Our story», el enlace principal queda subrayado. Los estilos calculados confirman subrayado de 2 px, fondo Hueso y línea lateral de 2 px en el enlace activo. El contraste del bronce es 3,21:1 sobre Arena y 3,66:1 sobre Hueso, suficiente para estos indicadores no textuales según WCAG 2.2 AA. No se guardaron capturas en el repositorio; `git diff --check` no reportó errores.

## DC-036 — Idioma completo en nombres accesibles y títulos

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Idioma EN/ES en las siete rutas; nota bajo la fotografía principal |

### Problema y cambio aplicado

Al elegir español, el título de la pestaña y varios nombres anunciados por lectores de pantalla seguían en inglés: navegación principal, enlace del logo, cielo y grupos del simulador. Los textos alternativos del símbolo y del logo oficial también conservaban descripciones en inglés. Ahora esos contextos se traducen al seleccionar español y recuperan su versión inglesa al regresar a EN. El botón del menú anuncia «Abrir» o «Cerrar navegación» según su estado. **All Faiths Monuments** conserva siempre su nombre en inglés; no se modificó el archivo ni el arte del logotipo.

En la portada, la nota bajo la fotografía rebasaba por la derecha el marco editorial que la acompaña, especialmente al mostrarse en español. Su ancho máximo ahora se ajusta a ese marco en todos los tamaños; el texto pasa a más líneas cuando hace falta y queda dentro del borde. También evita que coincida con el botón flotante de contacto en las vistas de escritorio revisadas. No se alteraron la fotografía, el botón ni el orden del contenido.

### Verificación

`node --check` y `git diff --check` sin errores. Revisión en Chrome de las siete rutas en español a 768, 1280, 1440 y 1920 px: títulos y nombres accesibles correctos, sin desbordamiento horizontal ni texto recortado. La nota de la portada se midió a 375, 660, 768, 950, 1020, 1280, 1440 y 1920 px: su borde derecho queda al menos 20 px antes del borde del marco y no desborda internamente. Se revisó visualmente en escritorio. En el simulador, «En recuerdo de» aparece en entrada y vista previa; al volver a inglés se restauran el valor, el título y los nombres accesibles. No se guardaron capturas en el repositorio.

## DC-037 — Monumento con inscripciones en chino en la galería

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, quien aportó `SNY01843.jpg` y pidió convertirla y añadirla a la galería |
| Sección | Colección fotográfica de `gallery/` |

### Problema y cambio aplicado

La colección de 18 fotografías mostraba principalmente motivos cristianos y no incluía la imagen aportada por el propietario. Se convirtió `SNY01843.jpg` a `sny01843.webp` de 1600 × 1067 px, el tamaño horizontal utilizado en la galería. Se añadió al comienzo de la colección, con el mismo visor, estructura y rótulos EN/ES que las demás fotos; el contador pasó de 18 a 19. La descripción se limita a elementos visibles —inscripciones en chino y grullas talladas—, sin atribuir una religión a partir de la escritura o la estética del monumento.

### Verificación

El WebP abre correctamente y conserva la composición de la foto original. La galería contiene 19 tarjetas y el archivo nuevo está enlazado tanto desde la miniatura como desde el visor. Revisión visual en Chrome a 1280, 1440 y 1920 px: la foto y su pie permanecen dentro de la primera columna, sin desbordamiento horizontal visible. No se guardaron capturas en el repositorio.

## DC-038 — Descripciones y acciones accesibles de la galería

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, aprobación explícita de la propuesta en esta conversación |
| Sección | Las 19 fotografías de `gallery/` y su visor |

### Problema y cambio aplicado

Los textos alternativos repetían títulos editoriales generales que apenas describían las fotografías. Además, al enfocar una miniatura se anunciaba la imagen sin indicar que el enlace abría el visor. Se conservaron los pies visibles y se redactaron 19 descripciones específicas en inglés y español a partir de rasgos observables: forma, piedra, talla, símbolos y flores. No se transcribieron nombres o fechas ni se atribuyeron creencias. Cada enlace ahora antepone a la descripción «Open larger image» o «Ampliar imagen» mediante texto oculto visualmente. El visor conserva el texto alternativo y anuncia en el idioma activo la descripción y la posición al abrir o cambiar de fotografía. El contador visible sigue mostrando la misma numeración.

### Verificación

Las 19 imágenes tienen `alt` y `data-alt-es` distintos y no vacíos. En Chrome, el árbol de accesibilidad dio a la primera miniatura los nombres «Open larger image: Granite memorial…» y «Ampliar imagen: Monumento de granito…» al cambiar de idioma. La región viva del visor contenía «Image 2 of 19…» al avanzar y «Imagen 1 de 19…» en español; al cerrar, el foco volvió a la miniatura que lo abrió. `node --check` y `git diff --check` sin errores. A 1280, 1440 y 1920 px, la página no presentó desbordamiento horizontal. No se guardaron capturas en el repositorio.

## DC-039 — Enlace para saltar al contenido principal

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, aprobación explícita de la propuesta en esta conversación |
| Sección | Inicio de las siete páginas y estilos compartidos |

### Problema y cambio aplicado

Quien usa teclado debía atravesar de nuevo el encabezado y la navegación al entrar en cada página. Se añadió como primer elemento interactivo un enlace «Skip to main content» / «Saltar al contenido principal». Permanece fuera de la vista hasta recibir foco y lleva al `<main id="top">`, ahora enfocable por programa con `tabindex="-1"`. Se reutilizan Hueso, Tinta y Bronce envejecido; el enlace no ocupa espacio en la composición normal.

### Verificación

Chrome confirmó que Tab muestra el enlace y Enter mueve el foco al contenido principal; la preferencia ES traduce su texto. Se comprobaron las siete páginas a 1280, 1440 y 1920 px, sin desbordamiento horizontal. El texto Tinta sobre Hueso tiene contraste 14,15:1; el contorno de foco Bronce envejecido sobre Hueso, 3,66:1. Revisión visual del enlace enfocado en la galería a 1280 px, sin guardar la captura en el repositorio.

## DC-040 — Lectura guiada de las etapas al desplazarse

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario, solicitud explícita en esta conversación |
| Sección | Ruta `guidance/`, eje de etapas y panel introductorio |

### Problema y cambio aplicado

La guía marcaba las etapas 01 y 02 al mismo tiempo cerca del comienzo porque activaba todos los puntos situados por encima del 55 % de la ventana. Eso adelantaba la lectura y hacía que el progreso de la línea no correspondiera al paso en foco. Ahora el inicio marca solo el 01; un punto en Bronce envejecido identifica la etapa actual, los puntos ya recorridos se muestran en Piedra y los siguientes permanecen vacíos. La etapa actual también lleva `aria-current="step"`. La línea avanza continuamente hasta la zona de lectura mientras se baja. Una indicación discreta «Scroll to follow each step» / «Desplázate para recorrer cada etapa», junto a una flecha hacia abajo, invita a continuar y desaparece después de la primera etapa. No se cambiaron el orden, el contenido ni la retícula. La animación de la flecha se desactiva con movimiento reducido. Se conservó la lógica heredada en ancho móvil.

### Verificación

En Chrome, a 1280, 1440 y 1920 px de ancho y 831 px de alto, HTML y React mostraron únicamente el paso 01 al abrir y activaron 02, 03 y 04 sucesivamente al desplazarse; no hubo desbordamiento horizontal. Revisión visual del estado inicial y del segundo paso en español a 1440 px, sin guardar imágenes en el repositorio. El texto Piedra sobre Hueso tiene contraste 5,62:1, la flecha Tinta sobre Hueso 14,15:1 y el punto Bronce envejecido sobre Hueso 3,66:1. `node --check`, compilación de React y cuatro pruebas automatizadas sin errores.

## DC-041 — Recorrido de lectura natural sin flecha en React

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: pide scroll fluido, lectura de los cuatro puntos sin flecha y comprobación en varios tamaños; aclara que no hace falta ceñirse al HTML |
| Sección | Ruta React `guidance/` |

### Problema y cambio aplicado

Las cuatro etapas de 176 px cabían casi completas en una pantalla. React omite ahora la flecha y su indicación. Cada etapa de escritorio reserva al menos 340 px o el 60 % de la altura estable de la ventana, para que completar la lectura requiera desplazarse. La introducción permanece sticky a 155 px; en ventanas de hasta 700 px de altura vuelve al flujo normal para poder leerla completa.

El eje une los centros de los puntos 01 y 04 y alcanza el final al llegar a la última etapa. Su progreso sigue directamente el scroll nativo, sin la transición de altura que añadía retraso. Se agrupan las lecturas de geometría antes de actualizar estilos y se recalcula ante cambios de tamaño. Se conserva un único paso actual con `aria-current="step"`, también al retroceder. No se intercepta la rueda ni se fuerzan desplazamientos.

Se conservan textos EN/ES, retícula, tipografías, colores, logotipos y presentación móvil heredada. Por instrucción del propietario, esta evolución se implementa en React mediante estilos propios y transformación del marcado al renderizar. El HTML de referencia queda sin modificar. Los ajustes están fuera de los archivos generados por el importador.

### Verificación

- Chrome a 1280 × 900, 1440 × 900 y 1920 × 1080, en EN y ES: secuencia 01 → 02 → 03 → 04 y regreso, cuatro puntos que requieren scroll, introducción visible, eje completo en 04 y ausencia de desbordamiento horizontal. Revisión visual de los tres anchos; sin imágenes guardadas en el repositorio.
- Rueda del navegador en incrementos de 100 px a 951 × 768, 1024 × 768, 1366 × 768, 1536 × 864, 1920 × 600 y 2560 × 1440: progreso reversible, sin saltos de etapa ni desplazamientos inesperados. Panel fijo íntegramente visible en alturas superiores a 700 px.
- Ventana 1280 × 600: introducción en flujo normal. Page Down y movimiento reducido comprobados; sin transición de los puntos con esa preferencia.
- Anchos móviles 375, 768 y 950 px: scroll nativo operativo y alturas de etapas coincidentes con el HTML heredado.
- Contrastes conservados: Tinta/Hueso 14,15:1, Piedra/Hueso 5,62:1 y Bronce/Hueso 3,66:1 (indicador gráfico). Sin errores JavaScript.
- `npm run build`, `npm test` (4 pruebas existentes) y `git diff --check` correctos. No hay script de lint definido.

## DC-042 — Panel introductorio fijo y etapas más próximas

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: mantener fijo el panel izquierdo hasta terminar las cuatro etapas y reducir la separación entre puntos |
| Sección | Ruta React `guidance/` |

### Problema y cambio aplicado

En DC-041 el panel izquierdo se desplazaba al comienzo antes de fijarse y las etapas quedaban demasiado separadas. Ahora la introducción comienza en su posición sticky y permanece allí mientras las cuatro etapas pasan a su derecha. Tras la última etapa, el contenido continúa su curso normal hacia el pie. No se intercepta el scroll ni se crea un contenedor desplazable independiente.

La altura mínima por etapa pasa de `max(340px, 60svh)` a `max(260px, 38svh)`: por ejemplo, de 540 a 342 px en una ventana de 900 px de alto. Se añade espacio al final del eje para mantener fijo el panel al llegar a la cuarta etapa, incluso en ventanas bajas. En alturas de hasta 560 px, el panel vuelve al flujo normal para que todo su texto sea accesible. La presentación móvil heredada y los textos no cambian.

### Verificación

- Chrome en inglés y español: panel a 155 px desde el inicio y al activar las cuatro etapas, tanto al avanzar como al regresar, con acceso posterior al pie y sin desbordamiento horizontal. Tamaños: 951 × 561, 951 × 600, 1024 × 600, 951 × 768, 1024 × 768, 1280 × 900, 1366 × 768, 1440 × 900, 1536 × 864, 1920 × 1080, 1920 × 600 y 2560 × 1440.
- Revisión visual a 1280, 1440 y 1920 px sin guardar capturas en el repositorio. A 1280 × 500 el panel vuelve al flujo normal. Teclado, rueda, movimiento reducido y scroll móvil a 375, 768 y 950 px comprobados.
- Se conservan los colores y contrastes de DC-041. `npm run build`, `npm test` y `git diff --check` completados sin errores.

## DC-043 — Adaptación responsive de las siete rutas React

| Campo | Detalle |
|---|---|
| Fecha | 5 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: revisión responsive de todo el aplicativo, incluidos celulares |
| Sección | Las siete rutas React; encabezado, portada, guía, contacto, simulador y pie |

### Problema y cambio aplicado

La guía conservaba dos columnas en celular y desbordaba horizontalmente. Contacto y el simulador también excedían el ancho por los mínimos de sus columnas. En la portada, el título de servicios y su enlace competían por espacio y las tarjetas secundarias comprimían la lectura; el cielo reservaba una columna muy estrecha al texto. Algunas etiquetas y controles eran pequeños para uso táctil.

En hasta 950 px, la guía pasa a una sola columna, con introducción y cuatro etapas legibles; contacto y simulador permiten que sus columnas se contraigan. El encabezado presenta EN y ES como botones individuales de al menos 44 px, con su estado y nombres accesibles existentes. Los enlaces del menú tienen mayor área táctil; el menú puede desplazarse en ventanas bajas y oculta temporalmente la barra inferior de contacto para evitar acciones duplicadas.

En hasta 660 px se apilan el video y su texto, el encabezado de servicios y los campos de formularios; se amplían tamaños de texto para lectura. En hasta 480 px las tarjetas secundarias de servicio apilan foto y descripción. Se preservan las fotografías, el video, logotipos, colores, fuentes, textos, orden de las secciones y funciones. Los cambios se aplican en una hoja React separada; el HTML de referencia y la composición de escritorio no se alteran.

### Verificación

- Chrome emulado, siete rutas en EN y ES a anchos de 280, 300, 320, 360, 375, 390, 414, 480, 660, 768 y 950 px: sin desbordamiento horizontal ni elementos de texto o formularios fuera de la ventana detectados por la inspección de geometría. Revisión visual de las siete rutas a 375 px, y del menú y visor a 320 px; sin capturas en el repositorio.
- Prueba táctil a 280 × 653, 320 × 568, 375 × 812, 430 × 932, 568 × 320, 768 × 1024 y 950 × 800: menú, idiomas, visor de fotos, cambio de imagen, simulador y respuesta de error del formulario sin backend. Se verificó carga al recorrer las tres fotos de servicios y las 19 de galería. Los campos en celular usan 16 px para evitar el zoom automático de entrada en navegadores compatibles.
- Escritorio a 1280 × 900, 1440 × 900 y 1920 × 1080: sin desbordamiento y geometría del panel de guía conservada. Probados movimiento reducido y teclado; ninguna excepción JavaScript detectada.
- Contrastes de las combinaciones usadas: Piedra/Arena 4,92:1, Piedra/Hueso 5,62:1, Bronce/Granito 4,58:1 y Tinta/Arena 12,39:1. `npm run build`, `npm test` (4 pruebas) y `git diff --check` sin errores.
- La auditoría estática adicional de frontend mantiene dos observaciones anteriores en el formulario de contacto sobre la estrategia de validación nativa y el redimensionado del campo; no forman parte de este ajuste visual. Las pruebas de tamaño usan emulación de Chrome, no dispositivos físicos ni otros motores.
## DC-044 — Tarjetas de servicios abiertas y fotografías a sangre

| Campo | Detalle |
|---|---|
| Fecha | 6 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario en esta conversación: modernizar los tres cuadros de la captura, integrarlos con la página y hacer que las mismas imágenes llenen su espacio sin sobrantes |
| Sección | Las tres tarjetas de servicios de la portada React |

### Problema y cambio aplicado

Las fotografías usaban `object-fit: contain` en marcos de otras proporciones, dejando franjas Arena y Piedra. El borde perimetral y el relleno de las tarjetas secundarias acentuaban el aspecto de cajas cerradas.

Se conservan la composición asimétrica (una pieza principal y dos secundarias), las tres fotografías originales sin modificar sus archivos, los textos EN/ES y los destinos de los enlaces. Las fotos llenan sus marcos mediante `cover`, con recorte centrado del entorno en las secundarias; la principal reserva una proporción 3:2 para conservar la figura completa. Desaparecen los bordes perimetrales y los paneles de color, y las descripciones se integran en el fondo Hueso. Se ajustan separación, jerarquía serif y lectura del cuerpo; los enlaces mantienen el subrayado y tienen 44 px de altura para facilitar el uso táctil, sin desplazarse al pasar el puntero.

Hasta 950 px, la pieza principal precede a las secundarias en una columna. Hasta 480 px, cada fotografía queda encima de su descripción. Los marcos reservan su espacio antes de cargar las imágenes. Los estilos están acotados a `.services` en `src/shared/ui/services.css`, fuera de los archivos generados; esta evolución posterior a la migración no modifica la referencia congelada.

### Verificación

- Chrome: 20 combinaciones EN/ES y anchos 320, 375, 480, 660, 768, 950, 1024, 1280, 1440 y 1920 px. Sin desbordamiento horizontal, solapamiento entre foto y texto ni recorte horizontal del texto. Las tres imágenes cargan y ocupan las dimensiones completas del marco.
- Revisión visual a 1280 × 900, 1440 × 900 y 1920 × 1080; además, teléfono de 375 px y tableta de 768 px. Capturas temporales fuera del repositorio. Se mantienen Cormorant Garamond, Lato y los tokens institucionales.
- EN/ES, destinos Gallery/Contact, navegación por Tab y Enter y preferencia de movimiento reducido comprobados; ninguna excepción JavaScript. Contraste Piedra/Hueso 5,62:1 y Tinta/Hueso 14,15:1; foco Bronce/Hueso 3,66:1.
- `npm run build`, `npm test` (4 pruebas) y `git diff --check` correctos; no hay script de lint. La auditoría estática general señala tres asuntos preexistentes en ContactForm (decisión del selector nativo, validación nativa y redimensionado del textarea), ajenos a las tarjetas. No se afirma una auditoría global aprobada ni pruebas en dispositivos físicos.

## DC-045 — Movimiento del cielo en la fotografía de portada

| Campo | Detalle |
|---|---|
| Fecha | 6 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario en esta conversación: animar el cielo de `Photo1-graveyard.webp` |
| Sección | Fondo del hero de la portada React |

### Problema y cambio aplicado

El fondo animaba toda la fotografía mediante un acercamiento. Para concentrar el movimiento en el cielo se mantiene estática la fotografía original y se desplaza lentamente una segunda capa de esa misma imagen, limitada al cielo por una máscara SVG de bordes suaves. La capa queda debajo del velo existente. Se conservan los bytes de la imagen, el texto, la composición y el encuadre; no se sustituyen las nubes ni los monumentos. La animación alterna suavemente durante 38 segundos y no se muestra cuando el visitante prefiere movimiento reducido. Esta evolución se aplica únicamente a React, sin alterar el HTML congelado.

### Verificación

- Chrome emulado en 320, 375, 768, 950, 1280, 1440 y 1920 px: imagen y máscara cargadas, fondo base sin movimiento, animación de la capa del cielo activa y sin desbordamiento horizontal. Revisión visual en 375, 768, 1280, 1440 y 1920 px; capturas temporales fuera del repositorio.
- Movimiento reducido: la capa animada se oculta y permanece visible la imagen original. Cambio a español y visibilidad del título comprobados, sin excepciones JavaScript.
- Se conserva el velo oscuro sobre el fondo animado y las combinaciones de texto existentes. `npm run build`, `npm test` (4 pruebas) y `git diff --check` correctos. Las pruebas usan Chrome emulado, no dispositivos físicos ni otros motores.

## DC-046 — Verificación antibots preparada para contacto

| Campo | Detalle |
|---|---|
| Fecha | 6 de noviembre de 2026 |
| Solicitado por | Propietario: agregar una verificación para reducir envíos automatizados; informó que aún no dispone de proveedor ni servidor |
| Sección | Formulario de contacto React |

### Problema y cambio aplicado

El formulario tenía un campo trampa, pero no una verificación adicional; ese campo por sí solo no protege el endpoint. Se preparó una integración de Cloudflare Turnstile antes del botón de envío: ofrece mensajes de carga, error y reintento en EN/ES, renueva el comprobante después de cada intento y adapta el tamaño al ancho disponible. Los mensajes ingresados se conservan ante errores. Mientras no haya clave pública o la verificación falle, el botón de envío permanece deshabilitado y se ofrece recurrir al teléfono o correo. No se modifican los textos existentes ni los recursos del HTML congelado.

El comprobante se incorpora al contrato del adaptador HTTP. También se añadió una función separada, exclusiva para servidor, que verifica el comprobante con Cloudflare y exige coincidencia del dominio autorizado y la acción `contact`; rechaza errores de red, comprobantes inválidos y configuración ausente. **No existe todavía un servidor conectado que use esa función ni un servicio real de recepción de consultas: la protección efectiva y el envío quedan pendientes de configuración.** El servidor futuro debe verificar antes de aceptar o entregar cada mensaje y añadir los límites y validaciones de SEG-006. Las claves reales y la evaluación de privacidad del proveedor siguen pendientes; no se almacena ninguna clave secreta en el cliente.

### Verificación

- Chrome con clave pública oficial de prueba de Cloudflare: comprobación aceptada en 375, 1280, 1440 y 1920 px; la clave se proporcionó solo al servidor local de pruebas. Revisión visual de las cuatro anchuras sin capturas en el repositorio.
- Integración simulada: ausencia de clave, fallo y reintento, caducidad, dos envíos con comprobantes distintos, error del servidor con conservación del mensaje, éxito simulado, cambio EN/ES y redimensionado de móvil a escritorio. Geometría comprobada en EN/ES a 320, 375, 480, 768, 950, 1280, 1440 y 1920 px sin desbordamiento horizontal.
- Pruebas unitarias del rechazo de comprobantes ausentes, fallidos, repetidos, de otra acción o dominio, y de fallos de red. Se probaron respuestas simuladas: la validación real de servidor con claves de producción y el endpoint quedan pendientes.
- Se conservan los colores y estilos del formulario. `npm run build`, `npm test` (11 pruebas) y `git diff --check` correctos; no hay script de lint. Pruebas de navegador con Chrome emulado, sin dispositivos físicos.

## DC-047 — Retirar el acercamiento de la fotografía de portada

| Campo | Detalle |
|---|---|
| Fecha | 6 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: quitar el efecto de zoom de la fotografía |
| Sección | Fondo del hero de la portada React |

La animación de acercamiento heredada permanecía declarada en la hoja compartida, aunque DC-045 la desactivaba con una regla posterior. Se retiraron la animación y sus fotogramas de la hoja para que el fondo permanezca fijo sin depender de esa excepción. Se conserva el movimiento independiente del cielo de DC-045 y la preferencia de movimiento reducido; no se modifican el encuadre, la imagen ni el contenido.

**Verificación:** Chrome emulado a 320, 375, 768, 950, 1280, 1440 y 1920 px: la fotografía no tiene animación ni transformación, el cielo conserva su desplazamiento, movimiento reducido detiene la capa, sin desbordamiento ni errores de JavaScript. `npm run build`, `npm test` (11 pruebas) y `git diff --check` correctos.

## DC-048 — Retirar la franja del video de cielo

| Campo | Detalle |
|---|---|
| Fecha | 6 de noviembre de 2026 |
| Solicitado y aprobado por | Propietario: quitar la sección señalada en la captura |
| Sección | Portada React, entre la introducción y «What matters in our work» |

Se retira de la portada la franja del video de cielo con el texto «Some things deserve to be remembered». La sección de valores sigue inmediatamente a la introducción. Se eliminan la precarga del póster y la lógica del bucle del video, sin borrar los activos originales ni modificar la referencia congelada. La animación del cielo de la fotografía principal es independiente y se conserva.

**Verificación:** Chrome emulado en EN y ES a 320, 375, 768, 1280, 1440 y 1920 px: sección ausente, valores a continuación del hero, video y póster sin solicitudes de red, carrusel funcional y sin desbordamiento ni errores JavaScript. Revisión de la distribución en 375, 1280, 1440 y 1920 px. `npm run build`, `npm test` (11 pruebas) y `git diff --check` correctos. Sin cambio de colores ni tipografías.
