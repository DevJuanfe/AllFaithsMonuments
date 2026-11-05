# TODOS.md — All Faiths Monuments, Inc.

> **Hoja de ruta del proyecto.** Primero se afina el diseño en el HTML autocontenido; cuando el diseño esté precisado y aprobado, se migra a React.
> Última revisión: 5 de noviembre de 2026. El propietario aprobó el inicio de la Fase B para las siete rutas; la fuente congelada y la verificación están en [`docs/decisiones/traspaso-react.md`](docs/decisiones/traspaso-react.md).

## 1. Plan en dos fases

| Fase | Qué se hace | Dónde se trabaja | Se da por cerrada cuando |
|---|---|---|---|
| **1 — Precisar el diseño** | Corregir y refinar el diseño del HTML autocontenido: composición, copias, logos, tipografía, contraste, estados e interacciones. | El HTML de `docs/referencias/`, editado directamente (ver 2.1). | El propietario aprueba por escrito el diseño final y queda registrado cada cambio. |
| **2 — Migrar a React** | Pasar el HTML aprobado a React sin rediseñarlo: paridad visual e interactiva 1:1. | Proyecto React en la raíz del repositorio. | La paridad queda verificada con capturas en 1280, 1440 y 1920 px y con pruebas funcionales (AGENTS.md §9). |

**Razón del orden:** cambiar el diseño en un HTML de un solo archivo es mucho más barato que hacerlo en componentes React. Migrar un diseño que aún se mueve obligaría a rehacer el trabajo. Por eso React empieza solo con un diseño cerrado.

**No hay migración parcial.** No se empieza React "en paralelo" mientras el diseño siga cambiando.

## 2. Reglas de trabajo de la Fase A

### 2.1 Archivo de trabajo y trazabilidad
- Los cambios de diseño se hacen **directamente** en [`docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html`](docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html). No hay copias paralelas.
- La versión original queda en el historial de Git (commit `a65e09d`; SHA-256 `f1033508aaebed48…`).
- Cada cambio se registra en [`docs/decisiones/registro-de-cambios-diseno.md`](docs/decisiones/registro-de-cambios-diseno.md): qué cambia, por qué, antes/después en texto y quién lo aprueba. Así se cumple "no interpretar silencio como autorización".
- No se crean ni se guardan imágenes (capturas, diffs) en el repositorio durante la Fase A.

### 2.2 Lo que no cambia sin decisión expresa
Se mantienen las restricciones de [AGENTS.md](AGENTS.md) §3 y §4. En concreto:
- Logotipo: solo archivos oficiales, sin redibujar ni deformar, con área de protección del 10 % medida desde el arte visible.
- Paleta cerrada de 7 colores y tipografías Cormorant Garamond y Lato.
- Placeholders en lugar de fotos mientras no haya fotografías autorizadas. Nada de stock ni imágenes generadas.
- Los textos con datos comerciales (horarios, plazos, cobertura, materiales, año) no se inventan.
- El formulario presenta el flujo final aprobado; conectar y verificar su envío persistente antes de producción. El `noindex, nofollow` se mantiene.
- Diseño móvil: el encargo es de escritorio. El CSS móvil heredado se conserva y no se rediseña.

### 2.3 Entregables de una iteración de diseño
Cada iteración debe dejar el cambio revisado en 1280, 1440 y 1920 px (sin guardar imágenes), la revisión de contraste WCAG 2.2 AA de lo tocado, el registro de cambios actualizado y una lista de pendientes para el propietario.

## 3. Estado actual (verificado en el repositorio)

| Elemento | Estado |
|---|---|
| HTML | En `docs/referencias/`. Es el archivo de trabajo de la Fase A y se edita directamente (lleva DC-001 a DC-016). Ya son 6 páginas (portada y 5 rutas) con `assets/` compartido. El original sigue en Git (`a65e09d`). |
| Manual de identidad | [`AFM_Manual_Identidad_Corporativa_Detallado.md`](docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md). Normativo para marca. |
| SRS | [`AFM_SRS_V1_0_Detallado.md`](docs/contexto/AFM_SRS_V1_0_Detallado.md) (`AFM-SRS-001` v1.0, 27-oct-2026). **Guía aprobada de momento** por decisión del propietario. Sus pendientes PD-01 a PD-18 siguen abiertos. |
| Logos oficiales | 5 archivos WebP en `docs/referencias/assets/img/originales-oficiales/` (3 completos 3000×2100 y 2 palomas 1024×1024). Son raster. **Los vectorizados los entrega el propietario más adelante.** |
| Licencias de fuentes | Resuelto: `docs/licencias/fuentes/` tiene `cormorant_licence.txt` y `lato_licence.txt` (SIL OFL 1.1). |
| AGENTS.md | Actualizado al orden Fase A (diseño) → Fase B (traspaso 1:1) y a las fuentes reales. |
| Fotografías, muestras de granito, fotos del taller | **No entregadas.** Se mantienen los placeholders. |
| Proyecto React | Implementado en la raíz con Vite, TypeScript y React. Usa las siete rutas y los adaptadores de galería y contacto documentados en `README.md`. |

### Qué contiene el HTML
Es un prototipo de escritorio (referencia de 1440 px). La **portada** tiene barra de utilidad, header sticky, hero asimétrico, franja de cielo con video, valores, servicios (`#monuments`, con `#engraving` en la 2.ª tarjeta), historia (`#about`), contacto (`#contact`) y footer. Las secciones de proceso, galería y estudio de granito/grabado pasaron a **rutas propias** (DC-003).

- **Estructura:** `All_Faiths_Monuments_Editorial_Desktop.html` (portada), `engraving/`, `gallery/`, `granite-colors/` y `guidance/` (cada una con su `index.html`), y `assets/` con `site.css`, `site.js` y los logos PNG.
- **Interacciones en JS:** idioma EN/ES con diccionario propio, menú móvil, simulador de inscripción con 3 muestras, video del cielo con play/pausa y `prefers-reduced-motion`, revelado al scroll con `IntersectionObserver`, línea de proceso por scroll, formulario con estado de confirmación previsto.
- **Activos:** un video MP4 de ~5,1 MB con póster JPEG, que siguen embebidos en la portada. Los PNG (isotipo 245×250 y logo negativo 460×315) se extrajeron a `assets/img/` con los bytes intactos (SHA-256 `f391a034…` y `581a0759…`).
- **Fuentes:** se cargan desde Google Fonts. Cormorant Garamond con pesos 400, 500 y 600. Lato con 400, 500, 600 y 700.
- **Media queries heredadas:** 1120, 950 y 660 px, más `prefers-reduced-motion`.

## 4. Fase A — Tareas de diseño

### 4.0 Preparación
- [x] Commit de la base documental (`docs/`, la antigua carpeta `media/`, `AGENTS.md`, este archivo) y push a `origin/main`.
- [x] Registro [`docs/decisiones/registro-de-cambios-diseno.md`](docs/decisiones/registro-de-cambios-diseno.md) creado. Se trabaja directamente sobre el HTML de `docs/referencias/`.
- [x] SHA-256 del HTML original anotado (`f1033508aaebed48…`, commit `a65e09d`) para poder recuperarlo y compararlo.
- [ ] **El propietario lista los arreglos de diseño que quiere.** Este archivo no inventa esa lista. Se añaden como §4.4.

### 4.1 Auditoría contra el manual y el SRS (candidatos, no decisiones)
Son diferencias o riesgos detectados al comparar el HTML con los documentos. Cada uno requiere decisión del propietario antes de tocarse.

- [ ] **Logos embebidos distintos a los oficiales.** El HTML lleva PNG de 245×250 y 460×315. Los oficiales de `docs/referencias/assets/img/originales-oficiales/` son 3000×2100 y 1024×1024, con transparencia alrededor. Sustituirlos por los oficiales (cambio registrado) y verificar tamaños visibles. No regenerar ni trazar. Cuando el propietario entregue los vectorizados, estos pasan a ser la fuente.
- [ ] **Mapa de variantes de logo por fondo.** Los nombres de archivo (Tinta, Granito negro, Hueso) indican el color del arte. Confirmar con el propietario cuál va sobre Hueso/Arena y cuál sobre Granito/Tinta, según la p. 16 del manual. Falta una versión blanca.
- [ ] **Tamaño visible del logo.** El manual pide ≥ 320 px de ancho visible para el logo completo y ≥ 32 px para el isotipo. Medir el arte visible (no la caja del PNG) en historia (460 px) y footer (400 px). Header: isotipo a 60 px (ahora 72 px, y en escritorio el logo completo de prueba de DC-009, con unos 116 px de ancho visible y el descriptor ilegible).
- [ ] **Área de protección del 10 %.** Comprobarla en historia, footer y header, midiendo desde el arte visible.
- [ ] **Favicon.** No se vio uno definido en el HTML. El manual pide isotipo de 32 px y no autoriza 16 px. Falta decidir el archivo (extraído del oficial).
- [ ] **Contraste WCAG 2.2 AA.** Muchas etiquetas son de 8–11 px y van en Piedra, Lino o Bronce sobre Arena, Granito o Hueso (`.eyebrow`, `.photo-label`, `.card-label`, `.hero-hint`, notas del footer). Medir y proponer ajustes dentro de la paleta.
- [ ] **Foco visible y teclado.** El foco existe (`outline` de 3 px en Bronce). Revisarlo sobre fondos oscuros y en los swatches.
- [ ] **Datos de contacto y horarios.** El HTML tiene dirección, teléfono 718-628-9671, correo `afmonuments1@gmail.com` y horarios "from provided site". Siguen sin confirmar (PD-11 y nota de horarios). No convertirlos en promesa publicada.
- [ ] **Año de fundación (1975).** El owner indicó 1975 y el SRS pide respaldo documental antes de publicar (PD-01). Si el diseño final lo menciona, marcar como pendiente de validación.
- [ ] **Redacción comercial.** Revisar que ninguna copia afirme precios, plazos 24–48 h, cobertura o materiales no aprobados (PD-02, PD-04, PD-05, PD-06, NEG-002).
- [ ] **Símbolos de una sola tradición.** Confirmar que ningún elemento global usa cruces, estrellas de David, menorás u otros símbolos (DIS-005).
- [ ] **Fuentes: carga desde CDN.** El HTML usa Google Fonts. Las licencias SIL OFL ya están en el repositorio. Decidir si se autoalojan antes de la Fase B (SRS PD-10 y PD-14 tocan hosting y privacidad).
- [ ] **Revisar la traducción ES** sobre la copia de diseño final, sobre todo en textos sobre cementerios, procesos y estados del formulario. No aplicar traducción automática sin revisión humana.
- [x] **Ribbon "DESKTOP STUDY · V1".** Eliminado por decisión del propietario (DC-007). El llamado móvil heredado (barra inferior ≤ 660 px) se conserva.

### 4.2 Contenidos y activos que bloquean cerrar el diseño
- [ ] Vectorizados oficiales del logotipo, **que entregará el propietario** (PD-07). Hasta entonces se usan los WebP de `docs/referencias/assets/img/originales-oficiales/`.
- [ ] Fotografías reales autorizadas de monumentos, taller y establecimiento, con permisos y derechos (PD-07, MED-001 a MED-009).
- [ ] Muestras de granito verificadas (nombres, tonos y acabados). Hasta entonces, el simulador sigue marcado como ilustrativo.
- [ ] Matriz de servicios y materiales aprobada (PD-02, PD-03).
- [x] Licencias de las fuentes en `docs/licencias/fuentes/`.

### 4.3 Criterio de salida de la Fase A
- [ ] El propietario aprueba el diseño final **por escrito** y se congela la versión (SHA-256 y fecha).
- [ ] Todos los cambios están en el registro de decisiones.
- [ ] El checklist final de identidad (manual, A.6) está revisado.
- [ ] La versión congelada queda identificada por commit o etiqueta de Git y por su SHA-256.
- [ ] La lista de pendientes comerciales (4.2) está resuelta o aceptada como placeholder por el propietario.

### 4.4 Arreglos de diseño solicitados por el propietario
_Cada entrada debe indicar: problema, razón centrada en el usuario, sección afectada y cómo se verificará. El detalle vive en el [registro de cambios](docs/decisiones/registro-de-cambios-diseno.md)._

- [x] **DC-002 — Menú principal: máximo 5 opciones y rutas.** Aplicado en el HTML: Engraving, Gallery, Granite colors y Guidance pasan a un desplegable «Explore»/«Explorar» y enlazan a rutas propias. **Aprobado por el propietario.** Dudas abiertas en el [registro](docs/decisiones/registro-de-cambios-diseno.md).
- [ ] **DC-003 — Rutas: Engraving, Gallery, Granite colors y Guidance.** Cada una tiene ya su página con el contenido que tenía en la portada; esas secciones salieron de la portada. Prototipo con CSS, JS y logos compartidos en `assets/`. **Pendiente de aprobación visual.** Dudas abiertas en el [registro](docs/decisiones/registro-de-cambios-diseno.md).
- [ ] **DC-005 — Selector EN/ES en la barra superior.** Sustituye el texto «Personal guidance in English & Spanish» por dos botones EN y ES (el activo relleno). Solo escritorio; en móvil sigue el selector del header. Reubicado en el header por DC-012. **Pendiente de aprobación visual.**
- [ ] **DC-006 — «Contact us» como botón flotante** abajo a la derecha (escritorio). Sale del header, y el menú queda centrado. **Pendiente de aprobación visual.**
- [ ] **DC-007 — Se elimina el recuadro «Desktop study · V1».** **Pendiente de aprobación visual.**
- [ ] **DC-008 — Barra superior y header fijos juntos al hacer scroll** (escritorio). **Sin efecto desde DC-012: ya no hay barra superior en escritorio.**
- [ ] **DC-009 — Prueba: logo completo oficial en el header** en lugar del isotipo, y fuera el texto de nombre y ubicación de la barra superior (escritorio). **Incumple el mínimo de 320 px del manual**; pendiente de decisión.
- [ ] **DC-010 — El botón «Contact us» flotante se oculta al llegar al pie.** **Pendiente de aprobación visual.**
- [ ] **DC-011 — Nuevo eslogan principal:** «A quiet place for a name to rest.» (antes «A lasting tribute for every story.»). **Traducción al español propuesta por el agente, pendiente de revisión del propietario.**
- [ ] **DC-012 — Selector EN/ES en el header y sin barra superior en escritorio.** El control EN | ES pasa a la derecha del header y la barra superior desaparece en escritorio (en ≤ 950 px se conserva). **Pendiente de aprobación visual.**
- [ ] **DC-013 — Header oscuro (Granito negro)** para contrastar con la página clara, con el logo completo oficial claro y el selector y menú en Hueso. Solo escritorio. **Pendiente de aprobación visual.**
- [ ] **DC-014 — Pie de página: se quita el texto bajo el logo** y el logo queda centrado en X dentro de su columna y en Y entre el borde superior del pie y la línea divisoria (escritorio). **Pendiente de aprobación visual.**
- [ ] **DC-015 — Prueba de color: Bronce envejecido (`--bronze`) como acento** en el titular de la portada, el subrayado del menú, las etiquetas de las secciones oscuras y los títulos del pie. Sobre fondo claro solo en texto grande por contraste. **Pendiente de aprobación visual.**
- [ ] **DC-016 — «Contact us» pasa a ser una ruta propia (`contact/`)**: la sección de contacto sale del final de la portada y todos los enlaces «Contact us» apuntan a la nueva página. **Pendiente de aprobación visual.**
- [ ] **DC-004 — Menú principal con texto más grande.** Enlaces y «Explore» de 11 a 15 px, solo en escritorio. (Los tamaños de «Contact us» y «EN / ES» quedaron sustituidos por DC-005 y DC-006.) **Pendiente de aprobación visual.**
- [x] **DC-001 — Header: vacío entre isotipo y navegación.** Aplicado en el HTML (isotipo a 72 px y espacio repartido entre marca, enlaces y contacto). **Aprobado por el propietario.** No se añadió texto de marca: el manual prohíbe recrear el lettering con una fuente. Alternativa abierta: pedir al diseñador un lockup horizontal oficial junto con los vectorizados.

## 5. Fase B — Migración a React

- [x] **DC-041 — Evolución posterior en React:** lectura guiada sin flecha, recorrido espaciado y progreso sincronizado con scroll nativo. Verificación de escritorio, ventanas bajas y móvil documentada en el registro de diseño; sin réplica obligatoria en HTML por instrucción del propietario.
- [x] **DC-042 — Introducción fija y etapas más próximas:** fijar el panel desde el inicio hasta la última etapa y permitir después el recorrido al pie; conservar legibilidad en ventanas bajas.
- [x] **DC-043 — Revisión responsive en React:** adaptar las siete rutas a celulares y tabletas, revisar desplazamiento horizontal, lectura e interacciones, y documentar la verificación.

Parte del HTML aprobado y congelado en `0e2d1c5`. La implementación y las pruebas se documentan en [`docs/decisiones/traspaso-react.md`](docs/decisiones/traspaso-react.md).

- [x] Inspeccionar el repositorio y elegir el stack menos invasivo: Vite, React y TypeScript; sin framework de estilos ni kit de interfaz.
- [x] Extraer el video y póster con los mismos bytes; copiar CSS e imágenes sin alterarlos y registrar sus SHA-256.
- [x] Reutilizar el CSS original, clases, orden de cascada y media queries.
- [x] Renderizar las siete rutas desde el marcado congelado; separar galería, visor y formulario en componentes React sin cambiar su DOM visible.
- [x] Trasladar idioma a estado React y las interacciones heredadas a hooks con limpieza de listeners, observadores y temporizadores.
- [x] Conservar los `<em>`, saltos de línea y traducciones aprobadas, sin incorporar HTML recibido de un backend.
- [x] Preservar el marcado que usan los selectores `:first-child` y `:nth-child`.
- [x] Verificar idioma, menú, anclas, video, revelado, proceso, simulador y formulario. El envío real depende de configurar un backend.
- [x] Comparar las siete rutas en 1280×900, 1440×900 y 1920×1080 y revisar interacciones de teclado.
- [x] Ejecutar build, comprobación TypeScript y tests de integración de los adaptadores.
- [x] Documentar evidencia y diferencias visuales observadas.

## 6. Fuera de alcance mientras dure este plan
Estos puntos salen del SRS, que ya los distingue como trabajo posterior o de otra línea. No se hacen sin aprobación explícita.

- Backend real de contacto, correo, almacenamiento de mensajes y política de privacidad (SRS §7.3 y §15, PD-14). Los adaptadores HTTP de frontend ya están preparados por solicitud del propietario.
- Nombres definitivos de rutas, rutas por idioma `/en/` y `/es/`, rediseño de las páginas de Engraving, Gallery, Granite colors y Guidance más allá de lo que ya contenían en la portada (ver DC-003), catálogo con filtros, SEO técnico y local, analítica, SEM y migración desde Hibu (SRS §6, §11 a §16).
- Hosting en hosting.com y elección de runtime (PD-10).
- Quitar `noindex, nofollow` o activar indexación.
- Diseño móvil nuevo.
- Agente de IA, comercio electrónico y precios automáticos (excluidos en SRS §5.2).

## 7. Cambios que hay que aprobar en la documentación del repositorio

- [x] **AGENTS.md actualizado** al orden Fase A (diseño directamente sobre el HTML) → Fase B (traspaso 1:1 del diseño congelado).
- [x] **Fuentes de AGENTS.md corregidas.** Manual y SRS con sus rutas reales; el SRS figura como guía aprobada de momento.
- [x] **Conflicto SRS vs. alcance actual resuelto en AGENTS.md.** El SRS describe el producto completo (multipágina, formularios reales, SEO). Este trabajo cubre la página única de escritorio. El resto del SRS orienta las decisiones, pero no se implementa sin aprobación.
- [x] **Diseño congelado para Fase B:** `AGENTS.md` cita el commit y remite a las sumas SHA-256 de las siete páginas.
- [ ] **Cuando lleguen los vectorizados**, actualizar la fila de `docs/referencias/assets/img/originales-oficiales/` de AGENTS.md y el mapa de variantes por fondo.

## 8. Pendientes comerciales y operativos del SRS que afectan al diseño
Los 18 puntos están en SRS §22. Los que más condicionan el diseño y la copia:

| ID | Tema |
|---|---|
| PD-01 | Año de inicio (1975) y experiencia. Necesita respaldo documental. |
| PD-02 / PD-03 | Materiales (¿solo granito?) y técnicas de grabado ofrecidas. |
| PD-04 | Afirmaciones de precio frente a la competencia. |
| PD-05 | Cobertura geográfica (¿Nueva Jersey?). |
| PD-06 | Plazo de 24–48 h: productos elegibles y condiciones. |
| PD-07 | Logo vectorial y fotografías originales con permisos. |
| PD-11 | Teléfono y correos reales y su enrutamiento. |
| PD-12 | Familia sans final: el manual fija Lato. Falta evaluación WCAG. |
| PD-13 | Reglas de cementerio, que varían por caso. |

## 9. Documentos de referencia

| Documento | Para qué |
|---|---|
| [AGENTS.md](AGENTS.md) | Reglas operativas para agentes y colaboradores. |
| [docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md](docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md) | Identidad: logo, color, tipografía, fotografía y tono. |
| [docs/contexto/AFM_SRS_V1_0_Detallado.md](docs/contexto/AFM_SRS_V1_0_Detallado.md) | Requisitos del sitio (borrador). |
| [docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html](docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html) | HTML de trabajo de la Fase A. Se congela al aprobar el diseño. |
| `docs/referencias/assets/img/originales-oficiales/` | Logos oficiales (WebP). |
