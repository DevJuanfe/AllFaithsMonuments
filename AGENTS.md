# AGENTS.md — All Faiths Monuments, Inc.

> **Contrato operativo para agentes de IA y colaboradores del repositorio.**
> **Objetivo inmediato, en este orden:**
> 1. **Fase A — Diseño:** precisar y corregir el diseño directamente en el HTML autocontenido de `docs/referencias/`, con cambios pequeños, justificados y aprobados por el propietario.
> 2. **Fase B — Traspaso 1:1 a React:** una vez aprobado y congelado el diseño, migrarlo a React **sin rediseñarlo**, conservando composición, identidad, contenidos e interacciones.
>
> Este documento es normativo para cualquier agente que lea, escriba, refactorice, pruebe o revise código de este proyecto. **No interpreta una solicitud de “migrar a React”, “limpiar código” o “mejorar UX” como permiso para cambiar el diseño.** El plan de tareas vive en [`TODOS.md`](TODOS.md).

**Actualización aprobada el 5 de noviembre de 2026:** el propietario tomó las siete páginas vigentes de `docs/referencias/` como referencia y solicitó el traspaso 1:1 a React, además de adaptadores de galería y contacto para un backend futuro. La Fase B parte del commit congelado `0e2d1c552c99d3bfedf55a2e1f3ce4ad66eb910f`; las sumas SHA-256 y la comparación constan en [`docs/decisiones/traspaso-react.md`](docs/decisiones/traspaso-react.md). Esta instrucción amplía el alcance del traspaso a las siete rutas sin autorizar cambios de diseño. La mejora posterior de la guía de scroll fue solicitada y registrada por separado como DC-040; ambas versiones la incorporan.

**Evolución autorizada DC-041 (5 de noviembre de 2026):** el propietario solicita lectura guiada sin flecha y aclara que no hace falta ceñirse al HTML para este ajuste. Esta interacción evoluciona directamente en React; no es obligatorio replicarla en la referencia HTML.

**Ajuste posterior DC-042:** por solicitud del propietario, en escritorio la introducción de `guidance/` permanece fija desde el inicio hasta recorrer la última etapa; la separación entre etapas es menor y después se puede llegar al pie. En ventanas demasiado bajas se conserva la lectura completa mediante desplazamiento normal.

**Evolución autorizada DC-043:** el propietario solicitó revisar y adaptar las siete rutas de React a pantallas de celular. Los ajustes móviles y de tableta se registran por separado, conservan la identidad y el contenido aprobados y no requieren replicarse en el HTML de referencia.

## 1. Estructura, fuentes verificadas y lectura eficiente del contexto

**Ubicación obligatoria:** `AGENTS.md` en la **raíz del repositorio**. Las rutas son relativas a esa raíz. Trabajar con Markdown para la consulta habitual de manual y SRS; el HTML de `docs/referencias/` es el archivo de trabajo del diseño y se edita directamente en la Fase A (ver §2). Su versión original se conserva en el historial de Git (commit `a65e09d`).

```text
/
├── AGENTS.md
├── README.md                     # Guía de ubicación de archivos
├── TODOS.md                      # Plan de trabajo por fases
├── docs/
│   ├── contexto/
│   │   ├── AFM_Manual_Identidad_Corporativa_Detallado.md
│   │   └── AFM_SRS_V1_0_Detallado.md
│   ├── decisiones/
│   │   └── registro-de-cambios-diseno.md                 # Un registro por cada cambio de diseño
│   ├── licencias/fuentes/                               # Licencias de las fuentes
│   └── referencias/                                      # Prototipo HTML de trabajo de la Fase A
│       ├── All_Faiths_Monuments_Editorial_Desktop.html   # Página de inicio (con el video embebido)
│       ├── engraving/index.html                          # Rutas del menú «Explore» (DC-003)
│       ├── gallery/index.html
│       ├── granite-colors/index.html
│       ├── guidance/index.html
│       ├── contact/index.html                            # Ruta «Contact us» (DC-016)
│       ├── about/index.html                              # Ruta «Our story» (DC-017)
│       └── assets/                                       # CSS, JS y logos compartidos por todas las páginas
│           ├── site.css
│           ├── site.js
│           └── img/                                      # Imágenes utilizadas por el prototipo
│               └── originales-oficiales/                # Logos oficiales sin modificar; vectores pendientes
├── src/                          # Fase B: solo si el repositorio ya emplea esta carpeta
└── package.json                  # Fase B: según el stack que se decida
```

**Fuentes del proyecto (todas presentes en el repositorio):**

| Archivo del repositorio | Propósito | Autoridad |
|---|---|---|
| [`docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md`](docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md) | Conversión Markdown del Manual de Identidad Corporativa (octubre de 2026, 28 páginas, original en PDF). | **Normativo** para marca, logotipo, colores, tipografía, fotografía y tono. El propio archivo aclara que no sustituye los vectores oficiales. |
| [`docs/contexto/AFM_SRS_V1_0_Detallado.md`](docs/contexto/AFM_SRS_V1_0_Detallado.md) | Conversión Markdown del SRS `AFM-SRS-001` v1.0 (27 de octubre de 2026). | **Guía aprobada de momento** para requisitos, alcance del producto y reglas de negocio, por decisión del propietario. Conserva sus estados AC/PR/VA/FU, prioridades y el registro de pendientes PD-01 a PD-18 (§22); una cuestión pendiente sigue pendiente. |
| [`docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html`](docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html) | Página de inicio. El prototipo comparte CSS, JS e imágenes WebP con las seis páginas de ruta; la portada conserva embebidos el video y su póster. | **Archivos de trabajo de la Fase A**: se editan aquí, con cambios registrados. Cuando el propietario apruebe y congele el diseño, esa versión pasa a ser la referencia de la Fase B. La versión original sigue en Git (`a65e09d`; SHA-256 `f1033508aaebed48…`). |
| [`docs/decisiones/registro-de-cambios-diseno.md`](docs/decisiones/registro-de-cambios-diseno.md) | Registro de cada cambio de diseño (qué, por qué, aprobación). | Trazabilidad de la Fase A. |
| [`docs/referencias/assets/img/originales-oficiales/`](docs/referencias/assets/img/originales-oficiales/) | Cinco archivos WebP oficiales: `A01_Completo_Tinta`, `A02_Completo_Granito_negro`, `A03_Completo_Hueso` (3000 × 2100) y `A04_Paloma_Piedra`, `A05_Paloma_Bronce_envejecido` (1024 × 1024). | Archivos oficiales vigentes hasta que el propietario entregue los vectorizados, que entonces prevalecen. |
| [`docs/licencias/fuentes/`](docs/licencias/fuentes/) | `cormorant_licence.txt` y `lato_licence.txt` (SIL Open Font License 1.1). | Respaldo de licencia de las dos familias tipográficas. |
| [`TODOS.md`](TODOS.md) | Plan de tareas por fases. | Orienta el trabajo; no sustituye al manual ni al SRS. |
| [`AGENTS.md`](AGENTS.md) | Reglas operativas derivadas de las fuentes anteriores. | Orienta el trabajo; no sustituye al manual ni al SRS. |

**Los PDF originales del manual y del SRS no están en el repositorio.** Trabajar con las conversiones Markdown. No suponer otros documentos (por ejemplo el «Contexto Maestro» o los briefs que cita el SRS en §24.1) ni citar rutas que no existen. Si el propietario aporta nuevas fuentes, incorporarlas a esta tabla solo después de comprobar su existencia y versión.

**Política de carga progresiva (ahorro de contexto/tokens):**

1. Leer `AGENTS.md` y localizar el componente o apartado afectado; evitar cargar todo el repositorio o documentos extensos por defecto. El manual pesa ~60 KB y el SRS ~90 KB: consultar solo las secciones pertinentes.
2. Para trabajos de identidad (logo, colores, tipografía, composición, imágenes y tono), usar las secciones pertinentes del manual (consulta rápida al inicio, páginas 7–16 para logotipo, 18–21 para color y tipografía, 23–24 para composición y fotografía, Anexo A para frontend).
3. Para requisitos, contenido y reglas de negocio, usar el SRS por identificador (`RF-`, `DIS-`, `NEG-`, `PD-`…). Las secciones 17 («Restricciones visuales»), 18 («Reglas de negocio») y 22 («Pendientes») son las más relevantes para diseño.
4. Consultar el HTML por secciones de DOM, CSS y JS. Evitar expandir innecesariamente las enormes cadenas `data:` de imágenes y video embebidos (el archivo pesa ~7 MB con solo 382 líneas).
5. Mantener enlaces y nombres de archivo consistentes con lo que realmente existe. Si una referencia falta, indicarlo explícitamente; jamás generar contenido documental ficticio para disimularlo.
6. No introducir otros `AGENTS.md` en subcarpetas a menos que surja una necesidad documentada de instrucciones locales distintas, sin relajar las reglas globales.

**Precedencia por dominio:**

- **Identidad y uso de marca:** Manual de Identidad Corporativa > SRS (§17) > HTML > preferencias del agente. Lo dice el propio SRS: ante un conflicto gráfico, aplicar el manual sin alterar los requisitos funcionales.
- **Requisitos, alcance de producto y reglas de negocio:** SRS. Los puntos en estado PR o VA, o listados en §22, **no son decisiones cerradas**.
- **Diseño e interacciones:** en la Fase A, el HTML de `docs/referencias/` con los cambios aprobados y registrados. En la Fase B, el diseño congelado de la Fase A. Documentar cualquier conflicto con el manual y solicitar decisión en lugar de rediseñar silenciosamente.
- **Contenido o funcionalidades no definidos en estas fuentes:** tratar como **pendientes de confirmación**. No deducir requisitos de supuestos archivos externos.
- **Cambios posteriores:** solo lo autorizado expresamente por el propietario y compatible con la identidad aprobada.

**Alcance de este trabajo frente al SRS.** El SRS describe el producto completo: sitio multipágina bilingüe con rutas `/en/` y `/es/`, catálogo con filtros, formularios reales, SEO, analítica, hosting y migración desde Hibu. **El trabajo cubierto por este documento es la página de inicio de escritorio**, primero como diseño y después como migración a React. **Decisión del propietario (2 de noviembre de 2026, DC-002):** el producto se organiza por **rutas** y no como una sola página con scroll. Engraving, Gallery, Granite colors y Guidance son páginas aparte; por DC-034, Granite colors se conserva pero queda temporalmente fuera de la navegación y los pies hasta que el propietario la reactive. Engraving, Gallery y Guidance siguen bajo «Explore»/«Explorar». **Decisión del propietario (2 de noviembre de 2026, DC-016):** «Contact us» también es una ruta propia (`contact/`) y deja de ser el final de la portada. Esas páginas **aún no están diseñadas**; el diseño de cada una requiere instrucciones del propietario. Nombres definitivos de rutas, rutas por idioma (`/en/`, `/es/`), catálogo, formularios reales, SEO, analítica, hosting y migración desde Hibu no se implementan aquí sin aprobación explícita; el SRS orienta las decisiones de diseño y contenido.

**Año de inicio de la empresa:** el SRS recoge, en su nota de actualización, que el año correcto de inicio formal es **1975** (no 1985), y mantiene en `PD-01` la necesidad de respaldo documental antes de publicar afirmaciones históricas. Mantener 1975 mientras no exista una nueva instrucción explícita del propietario, y no confundir los años de operación de la empresa con los años de experiencia de una persona.

## 2. Modo de trabajo obligatorio: primero diseño, luego traspaso 1:1

### Fase A — Diseño sobre el HTML autocontenido

El diseño se precisa **en HTML**, no en React: cambiar un archivo único es mucho más barato que cambiar componentes. **No se inicia la Fase B mientras el diseño siga cambiando.**

**Archivo de trabajo y trazabilidad:**

- Los cambios se hacen **directamente** en `docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html`. No se crean copias paralelas del HTML.
- La versión original queda en el historial de Git (commit `a65e09d`), de donde se puede recuperar para comparar.
- Cada cambio se registra en `docs/decisiones/registro-de-cambios-diseno.md`: qué cambia, por qué, descripción en texto del antes/después, sección afectada, y quién lo aprobó y cuándo.
- **No se generan ni se guardan imágenes** (capturas, diffs) en el repositorio durante la Fase A. La verificación se describe en el registro.

**Cada cambio de diseño debe:**

1. Tener un problema identificado, una razón centrada en el usuario y alcance definido.
2. Mantener la identidad y el lenguaje editorial aprobado (§3 y §4).
3. No alterar funcionalidades ni hechos comerciales sin instrucción expresa.
4. Verificarse en **1280, 1440 y 1920 px** (sin desbordamiento horizontal), con revisión de contraste WCAG 2.2 AA de lo tocado. La comprobación se hace revisando el código y el comportamiento en el navegador, sin guardar imágenes.
5. Contar con aprobación del propietario (§10). El agente puede **proponer**, pero no aplica por iniciativa propia cambios que alteren la apariencia o el contenido.

**Criterio de salida:** el propietario aprueba **por escrito** el diseño final; se congela la versión (commit o etiqueta de Git y SHA-256) y quedan registrados todos los cambios. Los pendientes comerciales (SRS §22) se resuelven o el propietario acepta expresamente mantener los placeholders.

### Fase B — Traspaso 1:1 a React

Parte **del diseño congelado de la Fase A** (el HTML de `docs/referencias/` en el commit o la etiqueta indicados al congelarlo), no de la versión original.

**Se permite** reorganizar implementación interna, extraer componentes, mover los recursos embebidos a archivos locales **sin alterar sus bytes**, sustituir listeners imperativos por hooks de React, tipar código cuando el proyecto ya lo utilice, y agregar pruebas.

**No se permite** cambiar el aspecto, jerarquía, espaciados, grids, tipografía, colores, orden o tamaño de bloques, ilustraciones, textos visibles, comportamiento, navegación, transiciones, breakpoints, CTA ni activos de marca. No aprovechar la migración para “modernizar”, simplificar, optimizar por gusto o cambiar el diseño. Si aparece una mejora de diseño, se anota para una iteración posterior; no se mezcla con el traspaso.

**Criterio de salida:** la versión React se comporta y se ve como el diseño congelado en escritorio, y no pierde las interacciones existentes. El agente debe aportar evidencia de comparación y registrar cualquier diferencia pendiente.

### Evolución posterior

Cualquier mejora posterior a la paridad exige el mismo tratamiento que la Fase A (problema, razón, antes/después, efectos colaterales, aprobación) y llega en un cambio o PR **separado** del traspaso 1:1.

**Ante incertidumbre:** conservar el estado aprobado; explicar el supuesto y solicitar una decisión sobre cambios visuales irreversibles. No interpretar silencio como autorización.

## 3. ADN visual: estudio editorial, no plantilla genérica

La dirección aprobada es la de un **estudio de diseño editorial con criterio propio**: sobriedad, sensibilidad, ritmo compositivo y oficio artesanal. La marca debe comunicar **paz, esperanza, continuidad, respeto y permanencia**.

- Preferir **grandes espacios de respiración**, retículas disciplinadas, contraste tipográfico, líneas finas, bloques asimétricos y jerarquía serena.
- Conservar composiciones amplias y desequilibrio intencional: columnas de distinta anchura, secciones con ritmos variados y elementos editoriales que cruzan o tensionan la retícula cuando ya existen.
- Usar el espacio negativo como parte del diseño, no como área que se deba llenar.
- Evitar una secuencia repetitiva de **tres tarjetas iguales**, rejillas genéricas, componentes “SaaS”, gradientes de moda, fondos tecnológicos, efectos futuristas, glassmorphism, sombras espectaculares y decoraciones sin propósito.
- No convertir la experiencia en un e-commerce agresivo: nada de urgencia, contadores, pop-ups insistentes o llamados de venta por presión.
- Mantener una experiencia de **acompañamiento humano**, respetuosa de cualquier religión o de la ausencia de creencias.
- **Diseño móvil:** DC-043 autoriza adaptar las siete rutas React a teléfonos y tabletas. Conservar la identidad, los contenidos y las interacciones aprobados; registrar y verificar los cambios de distribución, navegación y legibilidad. El diseño de escritorio no cambia por esta autorización.
- No usar cruces, estrellas de David, menorás ni símbolos de una sola tradición como emblemas generales de la marca (SRS `DIS-005`). Evitar también clipart, vitrales decorativos y colores saturados (`DIS-006`).

## 4. Identidad corporativa: restricciones no negociables

### 4.1 Logotipo e isotipo oficiales

El logotipo oficial integra tres partes **inseparables dentro de la versión principal**: la paloma con rama de olivo y curvas envolventes, el nombre **ALL FAITHS** y el descriptor **MONUMENTS**. Usar siempre las **versiones y archivos oficiales**.

**Prohibiciones absolutas:**

- Redibujar, reinterpretar, simplificar, calcar, generar con IA o reemplazar la paloma, alas, rama, arcos, letras o descriptor.
- Deformar, estirar, rotar, inclinar, reordenar, recortar trazos, añadir contornos, biseles, degradados, texturas, sombras o filtros al logotipo.
- Reconstruir el texto del logotipo con una fuente CSS; cambiar su familia tipográfica, espaciado, proporción o alineación.
- Cambiar arbitrariamente el color o aplicar versiones sin contraste adecuado.
- Usar símbolos parecidos procedentes de una biblioteca de iconos.

**Isotipo independiente:** únicamente puede provenir de la **extracción exacta del símbolo del archivo oficial**. No dibujar otro. La relación visible ancho/alto del símbolo en el manual es aproximadamente **0,972:1** (582,5 × 599 unidades); estas medidas son de referencia y deben verificarse frente al vector final.

**Archivos oficiales disponibles:** los de [`docs/referencias/assets/img/originales-oficiales/`](docs/referencias/assets/img/originales-oficiales/) (WebP, lienzo transparente de 3000 × 2100 px los completos y 1024 × 1024 px las palomas). El propietario entregará después los **vectorizados**, que sustituirán a los WebP como fuente oficial. Mientras tanto no vectorizar, calcar ni regenerar nada. Los nombres de archivo indican el color del arte (Tinta, Granito negro, Hueso, Piedra, Bronce envejecido); **confirmar con el propietario qué variante va sobre cada fondo** antes de aplicarla, y registrarlo.

**Logos incrustados en el HTML original:** son PNG (isotipo 245 × 250 en el header; logo negativo 460 × 315 en historia y footer) y **no coinciden** en dimensiones con los oficiales de `docs/referencias/assets/img/originales-oficiales/`. En la Fase A se sustituyen por los archivos oficiales, como cambio registrado y verificando tamaños visibles y área de protección. No “arreglar” un logo editándolo. **Excepción de prueba (DC-009):** el header de escritorio usa el logo completo oficial `A03_Completo_Hueso`, variante clara sobre el header en Granito negro (copia sin modificar en `assets/img/afm-logo-completo-hueso.webp`) con 96 px de alto, es decir, unos 116 px de ancho visible. Eso queda por debajo del mínimo de 320 px del manual y el descriptor «MONUMENTS» no se lee a ese tamaño. Es un experimento autorizado por el propietario y no un uso definitivo; hay que decidir si se mantiene, se agranda el header o se pide una variante oficial horizontal.

**Criterios del manual** (apartados «Logotipo», «Área de protección», «Versiones» y «Usos y fondos» de `docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md`):

- Composición vertical completa como uso principal cuando haya espacio; positivo sobre fondos claros y negativo/blanco sobre oscuros uniformes.
- Área de protección en torno al **10 % de la altura visible** de la firma. Medir desde la obra visible, **no** desde el borde transparente del PNG/SVG.
- Logotipo completo en pantalla: **al menos 320 px de ancho visible**. Isotipo en pantalla: **32 px o más, preferido**. Si el espacio no admite el logo completo legible, usar una variante oficial apropiada en lugar de comprimirlo.
- Favicon preferido: isotipo de **32 px**; 24 px solo condicionado y 16 px **no autorizado como tamaño mínimo**.
- Usos aprobados mostrados: positivo en **Hueso** o **Arena**, negativo en **Granito negro** o **Tinta**; blanco también admite positivo. No colocar, por ejemplo, logo negro en Granito o blanco sobre Lino si se pierde contraste.
- Nunca forzar logos sobre fotografía compleja sin un soporte/fondo que garantice que **todos los trazos y el descriptor** se distinguen.

**Al migrar activos (Fase B):** extraer el mismo archivo autorizado; conservar proporciones y contenido binario, documentar SHA-256 origen/destino si se separan los `data:` URI del HTML. No “mejorar calidad” por regeneración o trazado. No alterar la composición del logo incluso si un archivo se ve imperfecto: informar y solicitar el vector oficial.

### 4.2 Paleta institucional cerrada

Definir como tokens CSS; **no introducir nuevos colores de marca**.

| Token sugerido | Nombre de manual | HEX | Papel |
|---|---|---|---|
| `--bone` | Hueso | `#FAF6ED` | Fondo principal |
| `--sand` | Arena | `#EFE7D4` | Superficies |
| `--linen` | Lino | `#CCC5B5` | Apoyo |
| `--stone` | Piedra | `#6B6155` | Elementos secundarios |
| `--ink` | Tinta | `#282520` | Texto y estructura |
| `--granite` | Granito negro | `#15161A` | Fondos oscuros |
| `--bronze` | Bronce envejecido | `#9A7B4F` | Acento opcional y discreto |

Los `rgba()` derivados para divisores, estados y transparencias del HTML original son admisibles si mantienen la identidad; no sustituirlos por una paleta estética ajena. El bronce **no** es un segundo color dominante.

El manual sugiere **78 % claros / 18 % oscuros / 4 % detalles**, como **orientación y no cuota obligatoria** (apartado «Proporciones y contraste» del manual). Favorecer Hueso y Arena, reservar Granito para secciones de alto contraste y usar los acentos con moderación. **Verificar contrastes WCAG 2.2 AA**; no asumir accesibilidad por pertenecer a la paleta.

### 4.3 Tipografía y jerarquía

Solo dos familias de identidad:

- **Cormorant Garamond**: titulares, citas editoriales y elementos expresivos.
- **Lato**: párrafos, enlaces, menú, formularios, etiquetas e interfaz.

Cargar pesos adecuados (Regular/Medium/Semibold para Cormorant; Regular/Medium/Semibold/Bold para Lato). El HTML original los carga hoy desde Google Fonts (Cormorant 400/500/600; Lato 400/500/600/700). Las licencias SIL OFL 1.1 de ambas familias están en [`docs/licencias/fuentes/`](docs/licencias/fuentes/). Si se decide autoalojar las fuentes, es un cambio registrado que no altera pesos ni métricas. En la Fase B conservar los **pesos, interlineados, letter spacing y tamaños del diseño congelado**. No reemplazar fuentes por Inter, Montserrat, Poppins u otras, ni aplicar escalas de un design system externo.

El SRS (`DIS-004`) pide Cormorant Garamond para encabezados y “sans-serif humanista” para el cuerpo, y `PD-12` deja abierta su familia; el manual fija **Lato**. Prevalece el manual.

La sección «Jerarquía tipográfica» del manual muestra ejemplos de H1 **78**, H2 **50**, subtítulo **29**, cuerpo **23** y etiqueta **16**. **Son referencias de jerarquía de marca, no una orden para cambiar los `font-size` actuales de la página web.** Ajustarlos es una decisión de diseño de la Fase A, con aprobación y registro.

### 4.4 Composición, texturas y fotografía

- Respetar alineaciones, retícula, zonas de respiro y protagonismo de los contenidos. El logotipo acompaña, **no compite** con titulares o información crítica (apartado «Composición» del manual).
- Preferir **fotografías reales de trabajos propios**, autorizadas, con luz natural suave y equilibrada, fidelidad en el color/textura del granito y sin dramatismo (apartado «Texturas y fotografía» del manual).
- Revisar nombres, fechas, monumentos y permisos de publicación; no inventar memoriales, epitafios reales, testimonios ni fotos de clientes.
- Mientras no existan fotografías autorizadas, **conservar los placeholders editoriales aprobados**. No sustituirlos por imágenes de stock, material generativo o fotografías presentadas como obras de la compañía.
- Texturas simuladas del CSS y el simulador de grabado son **ilustrativas**, no evidencia de un producto/material real. No convertir nombres de swatches de demostración en catálogo comercial confirmado.

## 5. Baseline visual del HTML

El objetivo no es copiar una plantilla editorial abstracta; es trabajar sobre **la página específica** del archivo. En la Fase A es el punto de partida y puede cambiar con aprobación registrada. En la Fase B es el **diseño congelado** que hay que reproducir. Para cada componente, consultar su DOM y CSS antes de intervenirlo.

**Parámetros clave presentes en el HTML original** (no reinterpretarlos por cuenta propia; en la Fase A solo cambian por decisión registrada):

- DC-034 service links: monument and engraving calls to action open `gallery/`; the third card invites visitors to `contact/`. Keep the materials route hidden from navigation until reactivated by the owner.
- Lienzo de referencia **1440 px**; comprobar **1280, 1440 y 1920 px** sin desbordamiento horizontal. `.wrap` tiene `width: min(calc(100% - 112px), 1440px)` en escritorio.
- Barra superior de utilidad con información de ubicación, header **sticky**, navegación compacta y marca aislada.
- Hero de dos columnas asimétricas (`1.12fr / .88fr`), titular serif grande, zona de fotografía/placeholder alta y anotaciones laterales discretas.
- Franja del **cielo en movimiento** en Granito negro, con video panorámico y panel tipográfico, no una imagen estática nueva.
- Valores en **dos columnas intro + lista**, **no** tres tarjetas idénticas.
- Servicios como catálogo asimétrico: tarjeta dominante y dos secundarias; conservar su orden, tamaños y posiciones.
- Historia del taller en la **ruta `about/`** (DC-017): fondo oscuro con el **monograma oficial en Bronce envejecido** (A05, sin el logo con texto), principios y franja clara «Since 1975» antes del pie. *(Ya no está en la portada.)*
- Proceso con columna editorial fija/sticky y **una sola línea vertical numerada** que progresa al hacer scroll. *(Desde DC-003 vive en la ruta `guidance/`, no en la portada.)*
- Galería de mosaico editorial irregular con **placeholders** de imágenes autorizadas pendientes. *(Ruta `gallery/`.)*
- Estudio visual de granito/grabado con placa ilustrativa, controles de inscripción y muestras en paleta autorizada. *(Ruta `granite-colors/`, temporalmente oculta de la navegación por DC-034.)*
- Contacto en dos columnas con datos de referencia y formulario orientado a las familias, ahora en la ruta `contact/` (DC-016) y no al final de la portada; pie sobrio y llamado móvil heredado.

**En la Fase B no alterar** las clases CSS y selectores durante la primera extracción de componentes salvo necesidad técnica demostrada. Evitar reinicios globales de CSS, frameworks que sobreescriban estilos, cambios en `box-sizing`, contenedores extra con comportamiento de layout distinto y reordenaciones del DOM que afecten los selectores `:first-child` / `:nth-child`.

## 6. Comportamientos existentes que React debe conservar

La Fase A no elimina estas interacciones salvo decisión registrada. La migración (Fase B) es incompleta si únicamente reproduce una captura visual. Migrar también:

| Comportamiento | Contrato |
|---|---|
| Idioma EN/ES | Inglés inicial; cambio completo de copias, rótulos, placeholders, CTA y estados; `document.documentElement.lang` y controles accesibles coherentes. Mantener la traducción aprobada. La preferencia EN/ES se recuerda entre rutas con `localStorage` (clave `afm-lang`; solo el idioma, sin datos personales) y el inglés sigue siendo el inicial. |
| Menú móvil heredado | Botón con `aria-controls`, `aria-expanded`; abrir/cerrar menú, cerrar tras navegación; preservar markup y media queries originales sin rediseñar. |
| Navegación | Menú principal: «Monuments» (`#monuments`), el grupo desplegable «Explore»/«Explorar» (Engraving, Gallery y Guidance enlazan a rutas propias; Granite colors queda temporalmente oculta, DC-034), «Our story» (ruta `about/`, DC-017; ya no es un ancla de la portada), centrados en el header. «Contact us» enlaza a la **ruta `contact/`** (DC-016; ya no es un ancla de la portada) y es un **botón flotante abajo a la derecha** en escritorio (DC-006) y el selector EN/ES (dos botones con `aria-pressed`) está a la derecha del header (DC-005, DC-012); en ≤ 950 px siguen el botón de contacto dentro del menú heredado, el llamado móvil heredado y el selector del header. En la propia ruta `contact/` no hay botón flotante ni llamado móvil, porque ya se está en esa página. En escritorio el header va en **Granito negro** (DC-013) y lleva el **logo completo oficial** como prueba (DC-009; el isotipo sigue en ≤ 950 px); en escritorio no hay barra superior y solo el header queda fijo al hacer scroll (DC-012); el botón flotante se oculta cuando el pie llega a su zona (DC-010). Conservar anclas de página `#top` y `#monuments` y el desplazamiento compensado por el header fijo (125 px). Desplegable: abre con clic o teclado, cierra con Esc, clic fuera o al salir el foco, con `aria-expanded` y `aria-controls`. En el menú móvil heredado (≤ 950 px) esos tres enlaces siguen como lista plana. |
| Cielo | Reutilizar **el mismo video de ~10 s** y su póster embebido, sin reemplazo ni transcodificación visual; `muted`, `loop` (desde DC-020 el bucle se hace con un fundido cruzado entre dos capas del mismo video, con el `loop` nativo como respaldo sin JS), `playsInline` y `preload="metadata"`. No mostrar leyenda identificativa ni control manual de reproducción/pausa (DC-032). Respetar `prefers-reduced-motion`. |
| Revelado al scroll | Mantener animación suave solo cuando `IntersectionObserver` y preferencias de movimiento lo permitan; nunca dejar contenido invisible si JS/observer falla. |
| Línea del proceso | Preservar activación de pasos y progreso vertical basado en scroll; gestionar listeners y `requestAnimationFrame` correctamente. |
| Simulador de inscripción | Entradas de nombre y fechas, vista previa inmediata, longitudes máximas y tres muestras `granite` / `stone` / `linen` con selección `aria-pressed`. Es una **demostración**, no un pedido. |
| Formulario de contacto | En la Fase A, mostrar el flujo de producto previsto: campos y confirmación accesible en inglés y español al enviar, sin textos de prueba o advertencias técnicas en la interfaz. La confirmación representa el diseño aprobado; la conexión real y el almacenamiento requieren implementación antes de producción. |
| Accesibilidad base | Mantener semántica, labels, estados `aria`, foco visible, controles por teclado y comportamiento con reducción de movimiento. |

**Importante:** el envío, tratamiento de datos, privacidad, correo corporativo y flujos completos de contacto requieren implementación y requisitos validados antes de producción. La apariencia y los estados del flujo se diseñan como experiencia final; no se debe afirmar que existe una integración real hasta implementarla.

## 7. Contenido, promesas y tono de comunicación

La marca habla con voz **cercana, serena, confiable, inclusiva y sin presión** (apartados «La marca» y «Valores y personalidad» del manual). Preferir lenguaje sencillo: “Estamos aquí para orientarte”. Evitar marketing invasivo, sentimentalismo exagerado, generalizaciones religiosas y falsas garantías.

- Todas las páginas y mensajes futuros deben ser consistentes en **inglés y español**, incluidos errores, estados vacíos y confirmaciones. No fabricar traducciones automáticas sin revisar cuando cambie texto con implicaciones legales, funerarias o comerciales.
- **No inventar** precios, servicios, disponibilidad, certificaciones, tiempos de entrega, políticas de cementerio, reseñas, galerías, horarios, cobertura territorial o hechos históricos.
- En el HTML aparecen datos operativos (dirección, teléfono, email y horarios) **con distintos niveles de verificación**. La nota sobre horarios indica expresamente que **requieren confirmación antes de publicar**, y el SRS lo recoge en `PD-11`. Contrastarlos con información confirmada por el propietario; no convertirlos en promesas publicadas solo por existir en el prototipo.
- La promesa de **24 a 48 horas** depende de una matriz aprobada de productos y condiciones (`NEG-002`, `PD-06`); no publicarla de forma absoluta. El sitio no cotiza ni muestra precios (`NEG-001`) y no autoriza medidas o instalaciones que dependan del cementerio (`NEG-003`).
- Materiales, técnicas de grabado y cobertura geográfica están sin confirmar (`PD-02`, `PD-03`, `PD-05`). No afirmar “100 % granito”, técnicas concretas ni zonas (por ejemplo Nueva Jersey) como hechos.
- La confirmación del formulario en el prototipo representa el flujo final solicitado por el propietario (DC-031); no demuestra que exista persistencia o envío. La conexión real debe estar lista y verificarse antes de producción.
- Las restricciones y la información real del cementerio dependen del caso; no generalizar plazos, permisos ni resultados.
- Si más adelante se solicitan páginas adicionales, catálogos, fichas, filtros o flujos, implementarlos **solo cuando su alcance esté aprobado**. No confundir la página única de referencia con el producto completo.
- Antes de publicar, validar el aviso `noindex, nofollow` del HTML de demostración, política de privacidad y avisos de contenido pendiente. **No activar indexación por cuenta propia durante ninguna de las dos fases.**

## 8. Arquitectura técnica React recomendada, sin imponer stack (Fase B)

Esta sección solo aplica cuando el propietario haya aprobado y congelado el diseño. No se crea el proyecto React antes.

**Primero inspeccionar el repositorio** (`package.json`, scripts, router, convenciones, dependencias, estructura, test runner, gestor de paquetes y Git). No imponer Vite, Next.js, React Router, Tailwind, CSS-in-JS, un sistema de UI ni TypeScript si contradicen decisiones vigentes. Elegir la solución **menos invasiva** que admita una migración fiel.

Componentización sugerida por límites reales del HTML (adaptar nombres a la convención local):

```text
App / HomePage
├── UtilityBar
├── SiteHeader
├── Hero
├── SkyFilm
├── BrandValues
├── ServicesCatalog
├── AtelierStory
├── GuidanceTimeline
├── EditorialGallery
├── EngravingStudio
├── ContactSection
├── SiteFooter
└── MobileStickyCTA  [heredado; sin rediseño]
```

Buenas prácticas exigidas:

- La **semántica y el árbol visual** importan más que la granularidad del componente. No crear abstracciones que cambien layout o comportamiento.
- Separar lógica de estado y UI: `useState` para idioma, menú, swatch, inscripción y estado de formulario; `useRef` para video y timeline; `useEffect` con **cleanup** para listeners/observers de scroll, resize, media queries y video.
- Conservar contenido bilingüe en recursos locales consistentes; **no** utilizar `dangerouslySetInnerHTML` para traducciones si pueden representarse como JSX seguro. Respetar etiquetas `<em>` y énfasis del titular original.
- Mantener los activos locales íntegros. Si se extraen del autocontenido, documentar origen, integridad y uso. No cargar un video diferente por CDN ni insertar un GIF alternativo.
- Reutilizar primero el CSS original y sus variables. Evitar Tailwind/UI kits/preflight o tokens de un tercero durante la Fase B. Si se divide el CSS, garantizar mismo orden de cascada, especificidad, media queries y pseudoelementos.
- Mantener el mismo marcado para `:nth-child`, grids, figuras, botones y etiquetas cuando determine presentación. En React usar `className`, `htmlFor`, atributos válidos y `key` estable.
- No añadir dependencias por conveniencia cuando APIs nativas/React basten. No eliminar comentarios importantes sobre placeholders, seguridad o contenido de demostración.
- No dejar warnings de React, errores de consola, escuchas duplicadas, fugas por efectos o renderizados que alteren el DOM manualmente fuera de React.
- Si hace falta evolución a rutas múltiples, definirla posteriormente a partir de requisitos expresamente entregados y aprobados, sin inventar un mapa web durante la migración.

## 9. Validación obligatoria antes de declarar una tarea terminada

### 9.1 Comparación visual reproducible

**Fase A:** no se guardan imágenes en el repositorio. Cada cambio de diseño se revisa en el código y en el navegador en los tres viewports de abajo (zonas afectadas) y su resultado se describe en el registro de cambios.

**Fase B:** la comparación es React contra el **diseño congelado**. Las capturas son herramienta de trabajo y no se versionan salvo que el propietario lo pida.

1. Tomar como referencia el **diseño congelado** (no editarlo durante la Fase B) y obtener capturas de referencia y de la versión a validar **en el mismo navegador, sistema, zoom, fuentes y viewport**.
2. Comparar al menos **1280 × 900**, **1440 × 900** y **1920 × 1080**; recorrer la página completa y fotografiar zonas clave: cabecera/hero, cielo, valores, servicios, historia, timeline, galería, simulador, contacto y footer.
3. Para evitar falsos diffs por movimiento: pausar video o congelarlo en el mismo fotograma, esperar fuentes cargadas y establecer el mismo scroll/estado de animaciones en ambas versiones.
4. Revisar manualmente alineación, tipografía, saltos de línea, márgenes, alturas, espacios negativos, pesos, contraste, bordes, sombras, tamaños de logotipo y separación entre secciones. El diff de píxeles ayuda, **no reemplaza** el examen visual.
5. No aceptar desbordamiento horizontal, contenidos superpuestos, recorte accidental de texto, logos desfigurados ni cambios no solicitados. Documentar cualquier diferencia conocida antes de marcar completado.

### 9.2 Pruebas funcionales y accesibilidad

- Navegación por anclas, retorno al inicio, menú heredado y enlaces `tel:`/`mailto:`.
- EN ⇄ ES, incluidas entradas, textos en HTML con énfasis y estados de interacción.
- Reproducción silenciosa en bucle del video, funcionamiento con reproducción bloqueada y `prefers-reduced-motion`; verificar que no aparezcan controles o leyendas de video (DC-032).
- Efectos reveal y progreso del timeline al navegar/scroll; ausencia de contenido oculto permanentemente.
- Simulador: tecleo, limpieza, longitudes máximas, selección de material, contraste legible y navegación de teclado.
- Formulario: validación, anuncio accesible de confirmación según DC-031 y envío real conectado antes de producción.
- Focus visible, labels, `aria-expanded`, `aria-pressed`, lectura ordenada, HTML semántico y contraste **WCAG 2.2 AA**. Las correcciones visuales que cambien la referencia deben registrarse y aprobarse.
- Ejecución de los scripts del repositorio: build, lint y tests si existen; no inventar comandos que no estén definidos.

### 9.3 Evidencia mínima en cada PR/respuesta del agente

Incluir:

- **Qué cambió** y por qué; distinguir refactor técnico de cambio visible.
- **Qué se preservó** del diseño aprobado (o, en la Fase A, qué se cambió, con su entrada en el registro de cambios) y qué activos se reutilizaron.
- **Pruebas ejecutadas y resultado** y viewports revisados (en la Fase B, capturas/diffs cuando proceda).
- **Diferencias visuales, riesgos y pendientes**, indicando los que requieren confirmación del propietario.

**Nunca afirmar “pixel perfect”, “100 % idéntico”, “accesible” o “listo para producción” sin haberlo verificado.**

## 10. Límites de autonomía del agente

**Autorizado sin pedir aprobación adicional:**
- Fase A: auditar el HTML contra el manual y el SRS y **proponer** cambios; mantener el registro de cambios; medir contrastes y tamaños; documentar dudas; corregir errores técnicos que no cambien el aspecto.
- Fase B: preparar componentes React equivalentes; extraer estilos/assets sin modificarlos; corregir errores que impidan igualar el diseño congelado; agregar pruebas; mejorar seguridad interna sin impacto visible.

**Requiere aprobación explícita** (instrucción del propietario en la conversación, el PR o el registro de cambios; el agente la deja anotada): modificar cualquier color, tipografía, logotipo, fotografía, composición, textos comerciales, altura/espaciado, animación apreciable, breakpoint, orden de secciones, nuevas páginas, routing, catálogo real, formularios funcionales, SEO de publicación o funcionalidades nuevas. En la Fase A, **aplicar** cualquiera de estos cambios en el HTML de trabajo entra en esta categoría.

**Nunca autorizado por inferencia:** inventar imágenes de trabajos reales, redibujar o generar el logo, presentar datos ficticios como reales, declarar que un mensaje fue enviado si no lo fue, añadir rastreadores o proveedores de datos sin evaluación, ni alterar el año oficial **1975**.

### Regla final para cualquier agente

> **Primero comprender. Después medir. Luego proponer y diseñar con aprobación. Solo con el diseño congelado, traspasar 1:1.**
> El mejor refactor es el que mejora el código sin que el usuario note un cambio visual no solicitado. La identidad corporativa prevalece sobre preferencias estéticas del agente. Un requisito en estado PR o VA del SRS no está cerrado, y ningún requisito externo a las fuentes de §1 se presume existente ni aprobado.

---

**Fuentes del repositorio:** [`AFM_Manual_Identidad_Corporativa_Detallado.md`](docs/contexto/AFM_Manual_Identidad_Corporativa_Detallado.md), [`AFM_SRS_V1_0_Detallado.md`](docs/contexto/AFM_SRS_V1_0_Detallado.md), el HTML original en [`docs/referencias/`](docs/referencias/All_Faiths_Monuments_Editorial_Desktop.html), los logos de [`docs/referencias/assets/img/originales-oficiales/`](docs/referencias/assets/img/originales-oficiales/) y las licencias de [`docs/licencias/fuentes/`](docs/licencias/fuentes/). Vectorizados de logos: pendientes de entrega por el propietario. No se presupone documentación adicional.
