# Especificación de Requisitos de Software — All Faiths Monuments, Inc.

> **Conversión a Markdown del PDF oficial `AFM-SRS-001`, versión 1.0, fechado el 27 de octubre de 2026.** Se conservaron la numeración, identificadores, prioridades, estados, criterios de aceptación, tablas y pendientes. Las tablas partidas entre páginas se reunieron cuando fue posible. Los comentarios `<!-- -->` indican localización de origen; no alteran los requisitos.

> **Jerarquía documental:** este SRS describe los requisitos del sitio. El Manual de Identidad Corporativa desarrolla las reglas visuales oficiales. Si la aplicación de un elemento gráfico entra en conflicto con el manual, debe aplicarse la identidad aprobada sin alterar los requisitos funcionales.

> **Nota de actualización facilitada por el proyecto:** el año correcto de inicio formal es **1975**. El PDF original conserva en `PD-01` la necesidad de respaldo documental antes de publicar afirmaciones históricas; esta conversión no cambia retrospectivamente el estado de aprobación del SRS.

## Convenciones de lectura

- **AC:** acordado/comunicado para V1; **PR:** propuesto y pendiente de ratificación; **VA:** pendiente de verificación; **FU:** fuera de V1.
- **P0:** esencial para lanzamiento; **P1:** exigible en V1 salvo cambio aprobado; **P2:** posterior o sujeto a decisión.
- La descripción de un requisito en estado **PR** o **VA** no lo convierte en una decisión aprobada.

<!-- Inicio de contenido procedente de la página 1 del PDF original -->
**Sitio web corporativo bilingüe de All Faiths Monuments, Inc.**

| Campo | Valor |
|---|---|
| Código documental | `AFM-SRS-001` |
| Versión | **1.0** |
| Fecha | 27 de octubre de 2026 |
| Estado | **Borrador oficial para revisión y aprobación** |
| Organización beneficiaria | All Faiths Monuments, Inc. |
| Producto | Primera versión del nuevo sitio web corporativo |
| Idioma del documento | Español |
| Clasificación | Documento de trabajo del proyecto. No constituye una autorización de despliegue, contrato ni certificación de conformidad. |

## Control del documento

<!-- Tabla reconstruida de la(s) página(s) 1 del PDF. -->
| Campo | Valor |
| --- | --- |
| Documento de origen | Contexto Maestro All Faiths Monuments, versión 2.0, del 23 de octubre de 2026 |
| Información nueva | Desglose comercial y operativo proporcionado el 27 de octubre de 2026 |
| Versión base de requisitos | Primer borrador oficial, versión 1.0 |
| Responsable de aprobación | Propietarios de All Faiths Monuments, Inc. y responsable del proyecto, por designar formalmente |
| Criterio de versión | Los cambios posteriores deberán registrar fecha, motivo, alcance y aprobación |

## 1. Propósito, método y nivel de certeza

El presente documento define las necesidades del negocio, el alcance inicial, las restricciones, los requisitos funcionales y no funcionales y las condiciones de verificación del nuevo sitio web de All Faiths Monuments, Inc. Su finalidad es servir como base común para validar el alcance, diseñar la experiencia, estimar el esfuerzo, construir el producto y comprobar el cumplimiento antes de ponerlo en producción.

Su estructura se inspira en los principios de especificación, trazabilidad, verificabilidad y gestión de requisitos de ISO/IEC/IEEE 29148:2018. Este documento no afirma que el proyecto esté certificado bajo dicha norma. Como referencias técnicas utiliza las recomendaciones públicas de Google Search Central, la norma WCAG 2.2 del W3C, OWASP ASVS 5.0.0, las guías OWASP pertinentes y las métricas Core Web Vitals. Su adopción formal, aplicabilidad contractual y pruebas de conformidad deberán ser acordadas durante la ejecución.

Se utilizan cuatro marcas de estado:

<!-- Tabla reconstruida de la(s) página(s) 1 del PDF. -->
| Estado | Significado |
| --- | --- |
| AC | Acordado o comunicado expresamente por el equipo; se especifica para V1. |
| PR | Requisito propuesto por análisis técnico, normativo o de experiencia; requiere ratificación. |
| VA | Su necesidad es plausible, pero depende de información o una decisión aún no verificada. |
| FU | Fuera de la primera entrega; conservado como antecedente para una posible fase posterior. |

Las prioridades son P0, imprescindible antes del lanzamiento; P1, exigible para la V1 salvo modificación aprobada; P2, optimización posterior o función sujeta a decisión. No se usarán estimaciones de duración, inversión ni resultados comerciales sin datos de soporte.

Cada requisito se redacta como una condición observable del producto o de su preparación para producción. Los criterios de aceptación propuestos son verificables por pruebas, revisión documental, inspección del código o comprobación de infraestructura. Cuando un umbral dependa de una línea base aún inexistente, se indica expresamente.

## 2. Antecedentes del negocio y visión de producto

All Faiths Monuments, Inc. es una empresa familiar de Glendale, Queens, Nueva York, dedicada al diseño, elaboración, grabado, personalización e instalación de monumentos conmemorativos. Su trayectoria de más de 40 años está documentada en el brief de identidad. La actualización comercial afirma que opera formalmente desde 1975, dato que debe validarse documentalmente antes de utilizar la fecha exacta en material publicado. El público incluye familias de distintas creencias religiosas y personas sin afiliación religiosa. El servicio se comunica en inglés y español.

El establecimiento está ubicado, según la documentación interna, en 73-01 Edsall Ave., Glendale, NY 11385, junto a la entrada posterior de All Faiths Cemetery. Las zonas mencionadas en los antecedentes son Queens, Brooklyn, Staten Island, Manhattan, Bronx y Long Island, incluidos Nassau y Suffolk. Una actualización también menciona Nueva Jersey. La cobertura comercial real, en especial la instalación en cementerios concretos, tendrá que confirmarse antes de publicarse de forma exhaustiva.

El sitio debe proyectar luz y vida, de acuerdo con la dirección expresada por los propietarios, junto con serenidad, respeto, calidez, cercanía humana, inclusividad, oficio artesanal y permanencia. La interfaz no debe utilizar la estética convencional de una funeraria sombría ni recursos comerciales agresivos. La empresa ya dispone de logo definitivo y fotografías profesionales recientes, que serán los insumos visuales prioritarios.

La propuesta de valor se centra en atención humana personalizada, traducción de las ideas familiares en memoriales duraderos, conocimiento de trámites con cementerios y capacidad de ejecutar algunos trabajos en 24 a 48 horas, exclusivamente cuando la naturaleza del pedido y sus condiciones lo permitan. El dato del plazo no equivale a una garantía de instalación o finalización universal.

El nuevo sitio no venderá en línea. Su objetivo es informar, generar confianza, orientar y facilitar llamadas o consultas que serán atendidas por personas. No habrá carrito, pasarela de pagos, precios automáticos ni agente conversacional con IA en la versión 1.0. El asistente para atención y ventas es una iniciativa futura, sin selección de tecnología ni compromiso de desarrollo en esta fase.

### 2.1. Ecosistema digital existente

El sitio actual es https://allfaithsmonumentsny.com/ y es administrado mediante Hibu. El equipo dispone de acceso a la plataforma e informa que Hibu administra actualmente Google Business Profile. El contrato heredado continúa, según lo comunicado, hasta marzo de 2027. El equipo indica que desde Hibu pueden modificarse configuraciones del dominio o establecer redirecciones, pero todavía no se conoce el nivel exacto de control sobre DNS, redirecciones por URL o permanencia del servicio.

Aunque el equipo considera visualmente deficiente el sitio actual, reporta que recibe consultas comerciales de calidad. La causa no ha sido aislada: podría relacionarse con posicionamiento orgánico, visibilidad en Maps, búsquedas de marca, publicidad, recomendaciones, cercanía física u otros factores. El reemplazo no puede ejecutarse sin una auditoría de ese ecosistema y una estrategia de continuidad.

Dominio objetivo: https://allfaithsmonumentsinc.com/. Alojamiento previsto: hosting compartido Linux en hosting.com, cuyo plan y capacidades de ejecución deben comprobarse. Prototipo de referencia: https://all-faith-monuments.vercel.app/. La referencia visual no constituye por sí misma especificación técnica aprobada.

## 3. Objetivos y criterios de éxito del negocio

<!-- Tabla reconstruida de la(s) página(s) 2, 3 del PDF. -->
| ID | Objetivo | Indicador que deberá medirse | Estado |
| --- | --- | --- | --- |
| OB-01 | Presentar la identidad renovada con luz, vida y respeto. | Aprobación de diseño, contenido y uso del logo por responsables de marca. | AC |
| OB-02 | Facilitar contacto y consultas cualificadas sin automatizar precios. | Formularios válidos recibidos, clics de llamada, consultas atendidas, calidad de lead. | AC |
| OB-03 | Ofrecer una experiencia completa en inglés y español. | Cobertura de traducción y pruebas de navegación por idioma. | AC |
| OB-04 | Mantener o mejorar progresivamente la captación útil durante la migración. | Línea base y comparación de leads, llamadas y rendimiento orgánico por fuente. | AC |
| OB-05 | Hacer accesible la información sobre productos, materiales, grabados, cementerios y proceso. | Cobertura del contenido aprobado y pruebas con recorridos de usuario. | AC |
| OB-06 | Gestionar de forma segura las consultas y los contenidos multimedia. | Pruebas de seguridad, política de datos, inventario editorial y verificaciones de rendimiento. | PR |
| OB-07 | Facilitar el crecimiento posterior del contenido sin rehacer la plataforma. | Posibilidad demostrada de añadir catálogo y actualizar contenidos con procedimiento documentado. | PR |

<!-- Inicio de contenido procedente de la página 3 del PDF original -->
No se establecen en esta versión metas porcentuales de crecimiento de tráfico, tasa de conversión, costo por adquisición o ingresos. Los propietarios deberán acordarlas después de obtener la línea base del sitio Hibu y de los canales actuales.

## 4. Interesados, usuarios y responsabilidades

Interesados principales: propietarios, coordinación del proyecto, responsables de atención comercial, personal con conocimiento de los procesos de taller y cementerios, equipo de diseño y desarrollo, y quienes administran Hibu, dominio, Google Business Profile y correo. Los nombres individuales y las aprobaciones por rol quedan pendientes.

Personas usuarias: familiares que necesitan un memorial, personas que solicitan una inscripción adicional, visitantes que buscan una pieza personalizada, usuarios que prefieren español, personas que necesitan conocer ubicación u orientación, y futuros clientes que comparan servicios mediante búsquedas locales. La navegación no podrá obligar a declarar creencias religiosas o una situación de duelo.

Matriz preliminar de responsabilidades: los propietarios aprueban promesas comerciales y contenido; el responsable editorial valida fotografías, traducciones y fichas; el equipo técnico implementa y prueba; el responsable de operaciones confirma cobertura, plazos y procesos; el responsable de activos digitales autoriza cambios de dominio, Hibu y GBP. Esta distribución debe formalizarse antes del lanzamiento.

## 5. Alcance de la primera versión

### 5.1. Incluido

Sitio corporativo responsive e indexable, con páginas completas en inglés y español.

Inicio, presentación de empresa, tipos de monumentos, monumentos por tradición o necesidad, grabados, galería, colores de granito, orientación, contacto, información de ubicación, privacidad y páginas de error.

Catálogo visual consultivo con filtros y vínculo contextual hacia contacto, sin precios ni comercio electrónico.

Dos recorridos de consulta, uno simple y uno detallado, siempre sujetos a validación técnica de envío y recepción.

Gestión editorial ligera basada en archivos o mecanismo igualmente austero, con despliegue controlado.

Integración del logo aprobado y las fotografías profesionales autorizadas.

Infraestructura de publicación segura, monitoreo esencial, analítica proporcional y procedimientos de mantenimiento.

SEO técnico, local e internacional; preparación para campañas SEM; contenido útil para respuestas de buscadores y sistemas generativos.

Auditoría previa del entorno Hibu, mapa de redirecciones y migración controlada del dominio.

### 5.2. Expresamente excluido

Compras, pagos, reservas con cobro, precios publicados por producto o cotización automática.

Integración de chatbot, LLM, agente orquestador de IA, CRM automatizado o motor de recomendaciones personalizado.

Área privada para clientes, seguimiento de pedidos en tiempo real y autenticación de usuarios finales.

Aplicación móvil nativa o sistema completo de inventario, fabricación y logística.

Panel administrativo complejo y carga pública de archivos por visitantes, salvo aprobación posterior.

<!-- Inicio de contenido procedente de la página 4 del PDF original -->
Gestión automática de permisos de cementerios, presentación electrónica de documentación oficial o garantía automatizada de elegibilidad.

Campañas pagadas activas y su presupuesto, hasta que el negocio autorice expresamente la inversión, cuentas y condiciones de medición.

### 5.3. Dependencias de salida

El proyecto no podrá considerarse listo para producción sin comprobar el control del dominio y los correos, la capacidad efectiva del hosting, el mapa y prueba de redirecciones, la integridad de los canales de contacto, los permisos sobre el material audiovisual y la continuidad operativa del ecosistema Hibu y GBP.

## 6. Modelo de experiencia y arquitectura de información

La navegación de referencia contempla Inicio, Monumentos por fe, Grabados, Galería, Colores de granito, Orientación y Contacto. Durante el diseño se evaluará incorporar una sección sobre la empresa como página independiente o como apartado accesible desde el menú y el pie de página. La navegación por fe es una opción de exploración voluntaria; deberá existir también acceso por tipo de monumento y necesidad, sin atribuir reglas generales a una religión ni sustituir las normas reales del cementerio.

Se propone una arquitectura de rutas independiente por idioma, por ejemplo /en/ y /es/. Los nombres exactos de las rutas, las páginas locales y las combinaciones indexables quedarán sujetos a la auditoría SEO y a la aprobación de la arquitectura final. El cambio de idioma debe enlazar con la página equivalente cuando exista, sin enviar sistemáticamente a inicio.

Los contenidos sobre servicios locales, permisos, lugares atendidos y materiales deben responder a necesidades reales. No se crearán páginas masivas de ciudades, barrios o cementerios con contenidos duplicados o afirmaciones de atención no verificadas.

## 7. Requisitos funcionales

### 7.1. Navegación y localización idiomática

#### RF-001 — Navegación principal
**Clasificación original:** `P1, AC`.

**Requisito:** El sistema deberá ofrecer navegación persistente hacia las secciones aprobadas, tanto en escritorio como en móvil.

**Criterio de aceptación:** todos los enlaces llegan a una página válida; el menú compacto es utilizable con teclado y pantalla táctil; no se produce desbordamiento horizontal a 320, 768, 1024 y 1440 píxeles.

#### RF-002 — Cambio de idioma
**Clasificación original:** `P0, AC`.

**Requisito:** La persona usuaria deberá poder alternar entre inglés y español desde una opción visible y comprensible.

**Criterio de aceptación:** al seleccionar el idioma se accede a una URL propia con contenido coherente y atributos lang correctos; la ruta equivalente conserva el contexto cuando existe.

#### RF-003 — Cobertura bilingüe completa
**Clasificación original:** `P0, AC`.

**Requisito:** Los menús, fichas, contenidos informativos, formularios, mensajes de error, confirmaciones y documentos públicos vinculados al sitio deberán tener versiones aprobadas en ambos idiomas.

**Criterio de aceptación:** la revisión editorial no encuentra textos de interfaz mezclados ni traducciones automáticas visibles sin validar.

#### RF-004 — Navegación comprensible
**Clasificación original:** `P1, PR`.

**Requisito:** Deberá existir una estructura de enlaces y orientación contextual que permita volver a categorías superiores y comprender la ubicación del visitante.

**Criterio de aceptación:** los recorridos definidos pueden completarse sin depender del botón Atrás del navegador.

#### RF-005 — Enlaces y acciones de contacto
**Clasificación original:** `P0, AC`.

**Requisito:** Los canales telefónico y de correo aprobados deberán ser visibles y accionables desde móvil, con CTA persistente cuando no afecte la accesibilidad.

**Criterio de aceptación:** tel: y, donde proceda, mailto: muestran datos vigentes y funcionan en dispositivos compatibles; siempre hay acceso al formulario sin cliente de correo externo.

### 7.2. Contenido institucional y oferta

#### RF-006 — Página de inicio
**Clasificación original:** `P1, AC`.

**Requisito:** La portada deberá comunicar identidad, tipos de servicio, ubicación, trayectoria aprobada y opciones de contacto, usando el logo final y fotografías reales autorizadas.

**Criterio de aceptación:** propietarios validan el contenido EN/ES y los CTA no presentan precios, garantías de plazo ni promociones agresivas.

#### RF-007 — Presentación de empresa
**Clasificación original:** `P1, AC`.

**Requisito:** Deberá existir contenido identificable sobre el carácter familiar, el oficio, el acompañamiento y la trayectoria del negocio.

**Criterio de aceptación:** no se atribuyen al nuevo propietario años de experiencia de la empresa ni se menciona al antiguo propietario sin motivo y autorización editorial.

#### RF-008 — Catálogo de monumentos
**Clasificación original:** `P1, AC`.

**Requisito:** Deberán mostrarse fichas con imagen, nombre o referencia interna publicable, tipología, características aprobadas y CTA de consulta.

**Criterio de aceptación:** se muestran exclusivamente piezas autorizadas; no hay carrito, precio, disponibilidad automática ni pago.

#### RF-009 — Filtros del catálogo
**Clasificación original:** `P1, AC`.

**Requisito:** El catálogo permitirá filtrar por tipo de monumento y, si existe clasificación editorial validada, por tradición o rito.

**Criterio de aceptación:** la combinación de filtros se aplica sin perder información, admite limpiar filtros y muestra un estado vacío comprensible con alternativa de contacto.

#### RF-010 — Consulta contextual de ficha
**Clasificación original:** `P1, AC`.

**Requisito:** Desde una ficha o servicio deberá poder iniciarse una consulta conservando su identificador o descripción.

**Criterio de aceptación:** el formulario muestra o recibe de manera segura el contexto de la selección sin depender de una cadena manipulable como dato de confianza.

#### RF-011 — Galería de trabajos
**Clasificación original:** `P1, AC`.

**Requisito:** El sitio presentará trabajos reales clasificados con criterio editorial y permiso suficiente.

**Criterio de aceptación:** cada imagen accesible dispone de contexto, alternativa textual apropiada y mecanismo de ampliación que pueda cerrarse por teclado y móvil.

#### RF-012 — Colores y acabados de granito
**Clasificación original:** `P1, AC`.

**Requisito:** Deberá ofrecerse una sección explicativa y visual de colores y terminaciones disponibles o consultables.

**Criterio de aceptación:** las muestras tienen nombres aprobados y se advierte que la apariencia en pantalla puede diferir del material real.

#### RF-013 — Grabados e inscripciones
**Clasificación original:** `P1, AC`.

**Requisito:** Deberá existir una sección para lettering, grabados y personalización, incluyendo la posibilidad de añadir inscripciones in situ cuando esté confirmada por operaciones.

**Criterio de aceptación:** cada técnica mencionada está disponible y validada; se explica cuándo una evaluación del monumento es necesaria.

#### RF-014 — Servicios especializados
**Clasificación original:** `P1, VA`.

**Requisito:** El sitio podrá presentar grabados realizados a mano, retratos, fotografías en porcelana, láser o chorro de arena únicamente según la oferta comprobada.

**Criterio de aceptación:** operaciones aprueba una matriz de técnica, material, aplicación y disponibilidad antes de publicar afirmaciones específicas.

#### RF-015 — Orientación al cliente
**Clasificación original:** `P1, AC`.

**Requisito:** Deberá existir una sección de ayuda que explique de forma accesible las etapas de diseño, revisión, permisos, producción e instalación según el proceso real.

**Criterio de aceptación:** el contenido distingue orientaciones generales de reglas particulares de cementerios y se revisa con personal competente.

#### RF-016 — Preguntas frecuentes
**Clasificación original:** `P1, PR`.

**Requisito:** El sitio deberá responder preguntas frecuentes reales sobre tipos de piezas, inscripciones adicionales, material, requisitos, plazos y contacto.

**Criterio de aceptación:** las respuestas constan en texto HTML visible, tienen versión en los dos idiomas y se sustentan en información validada.

#### RF-017 — Información sobre cobertura
**Clasificación original:** `P1, AC`.

**Requisito:** La web deberá comunicar las zonas y servicios efectivamente atendidos.

**Criterio de aceptación:** cada zona o cementerio publicado figura en una lista aprobada; no se infiere cobertura integral a partir de una mención genérica al área triestatal.

#### RF-018 — Plazos condicionados
**Clasificación original:** `P1, AC`.

**Requisito:** Cuando se comunique rapidez de atención o entrega de 24 a 48 horas, el sitio deberá explicar que aplica solo a trabajos elegibles previa confirmación.

**Criterio de aceptación:** el equipo aprueba redacción bilingüe, condiciones y significado de entrega; ninguna interfaz lo anuncia como garantía general.

#### RF-019 — Prueba social
**Clasificación original:** `P2, VA`.

**Requisito:** Se podrán incorporar reseñas, testimonios o enlaces a perfiles verificados con consentimiento y atribución correcta.

**Criterio de aceptación:** ningún testimonio es ficticio, ninguna puntuación es inventada y el mecanismo respeta las condiciones de la plataforma de origen.

### 7.3. Contacto y captación

#### RF-020 — Formulario completo
**Clasificación original:** `P0, AC`.

**Requisito:** La vista de contacto deberá incluir nombre, correo electrónico, teléfono, cementerio si se conoce, interés o servicios, tradición opcional y mensaje.

**Criterio de aceptación:** correo, nombre y mensaje son obligatorios salvo decisión posterior; teléfono, cementerio y tradición pueden omitirse; los errores se muestran junto al campo correspondiente.

#### RF-021 — Selección múltiple de servicios
**Clasificación original:** `P1, AC`.

**Requisito:** El formulario avanzado permitirá seleccionar más de una clase de producto o servicio de interés.

**Criterio de aceptación:** la información llega con etiquetas legibles, conservando las selecciones después de un error corregible.

#### RF-022 — Formulario breve
**Clasificación original:** `P1, AC`.

**Requisito:** Se ofrecerá un recorrido corto para consultas generales, con correo y mensaje, sin exigir conocimiento técnico ni información religiosa.

**Criterio de aceptación:** el formulario puede completarse de manera independiente y sus respuestas llegan identificadas como consultas del sitio.

#### RF-023 — Procesamiento seguro de consultas
**Clasificación original:** `P0, AC`.

**Requisito:** El servidor procesará formularios validados y enviará una notificación a los destinatarios aprobados sin calcular precios.

**Criterio de aceptación:** se prueba envío exitoso, entrada inválida, servicio de correo no disponible y respuesta al usuario; un error de entrega no se presenta falsamente como éxito.

#### RF-024 — Destinatarios de correo
**Clasificación original:** `P0, VA`.

**Requisito:** Se propone usar contact@allfaithsmonumentsinc.com como destinatario principal y afmonuments1@gmail.com como respaldo, condicionados a la aprobación y verificación de las cuentas.

**Criterio de aceptación:** se realizan pruebas reales autorizadas de recepción, filtros de spam, remitente autenticado y tratamiento de datos.

#### RF-025 — Confirmación y errores
**Clasificación original:** `P0, AC`.

**Requisito:** Después de una solicitud válida el sistema deberá ofrecer una confirmación serena y comprensible, sin comprometer respuesta inmediata ni precio.

**Criterio de aceptación:** la persona usuaria puede distinguir inequívocamente éxito, error de validación y error temporal del servicio.

#### RF-026 — Contacto telefónico
**Clasificación original:** `P0, AC`.

**Requisito:** El sitio deberá presentar el número confirmado por el negocio, de forma coherente en cabecera, contenido y pie de página.

**Criterio de aceptación:** llamada manual de prueba y comparación de NAP con la ficha local; se determina si existe un número de seguimiento de Hibu antes de modificarlo.

#### RF-027 — Ubicación e indicaciones
**Clasificación original:** `P1, AC`.

**Requisito:** Deberá mostrarse la dirección aprobada, la referencia de la entrada posterior y un enlace de indicaciones.

**Criterio de aceptación:** los propietarios confirman el pin y el recorrido de llegada; el mapa interactivo, si se aprueba, no impide leer ni utilizar la página cuando falla o no se carga.

#### RF-028 — Tratamiento respetuoso
**Clasificación original:** `P1, AC`.

**Requisito:** Los formularios no solicitarán datos sobre fallecidos, documentos, fechas sensibles o religión salvo que sean estrictamente necesarios para una consulta concreta y aprobados.

**Criterio de aceptación:** revisión de minimización de datos y una política de privacidad visible antes del lanzamiento.

### 7.4. Edición y administración del contenido

#### RF-029 — Catálogo administrable sin rediseño
**Clasificación original:** `P1, AC`.

**Requisito:** Los datos de fichas y categorías deberán mantenerse en un repositorio editorial separado de componentes de presentación.

**Criterio de aceptación:** una persona autorizada puede incorporar o modificar una ficha siguiendo un procedimiento documentado y desplegarla sin reescribir la interfaz.

#### RF-030 — Traducciones estructuradas
**Clasificación original:** `P1, AC`.

**Requisito:** Las cadenas y contenidos bilingües se organizarán de forma que sea posible identificar equivalencias, faltantes y cambios.

**Criterio de aceptación:** una revisión o herramienta detecta claves sin traducir y no se publica una versión parcial por error.

#### RF-031 — Publicación controlada
**Clasificación original:** `P0, PR`.

**Requisito:** La modificación del contenido deberá pasar por revisión editorial, prueba y despliegue autorizado.

**Criterio de aceptación:** existe historial de versiones y procedimiento de reversión; no se editan directamente archivos de producción sin trazabilidad.

#### RF-032 — Información legal y de privacidad
**Clasificación original:** `P0, PR`.

**Requisito:** La web deberá ofrecer información visible sobre el tratamiento de consultas, responsable del sitio y canales de contacto, con redacción revisada según la normativa aplicable.

**Criterio de aceptación:** la política publicada describe el funcionamiento real de los formularios, correo, analítica y proveedores.

#### RF-033 — Página no encontrada
**Clasificación original:** `P1, PR`.

**Requisito:** Los enlaces inexistentes deberán devolver estado HTTP 404 y una página útil que permita recuperar la navegación.

**Criterio de aceptación:** el servidor no responde 200 a una ruta inexistente y no expone detalles internos.

<!-- Inicio de contenido procedente de la página 7 del PDF original -->

## 8. Requisitos de arquitectura, infraestructura y calidad

#### ARQ-001 — Arquitectura compatible con alojamiento
**Clasificación original:** `P0, PR`.

**Requisito:** La solución deberá ejecutarse de manera estable dentro de los recursos y funciones contratados. Se preferirá entregar HTML prerenderizado o estático para páginas públicas y utilizar procesamiento del lado del servidor solo cuando sea necesario.

**Criterio de aceptación:** inventario escrito del plan real, límites de procesos, CPU, memoria, correo y publicación; prueba de despliegue representativa.

#### ARQ-002 — Elección del frontend
**Clasificación original:** `P0, VA`.

**Requisito:** React es una alternativa previamente propuesta, no una obligación contractual. Si se utiliza, cada página pública destinada a buscadores deberá contar con HTML inicial suficiente y rutas indexables independientes; Next.js estático u otro generador son opciones por evaluar.

**Criterio de aceptación:** comparación documentada de soluciones según SEO, costos, operación y soporte real del hosting.

#### ARQ-003 — Servicio de formularios
**Clasificación original:** `P0, PR`.

**Requisito:** El procesamiento de correos deberá ubicarse en un componente de servidor soportado y protegido. La opción Node.js ligero solo se aprobará tras comprobar la ejecución en el plan; podrán evaluarse alternativas compatibles si no existe tal soporte.

**Criterio de aceptación:** prueba integral en un entorno equivalente a producción y registro de dependencia del servicio de correo.

#### ARQ-004 — Datos editoriales
**Clasificación original:** `P1, AC`.

**Requisito:** La V1 no dependerá de una base de datos relacional para servir un catálogo que pueda gestionarse adecuadamente con archivos estructurados.

**Criterio de aceptación:** se valida esquema de datos, controles de cambios y capacidad de incorporación de productos sin migración de base de datos.

#### ARQ-005 — Separación de ambientes
**Clasificación original:** `P0, PR`.

**Requisito:** Deberán existir ambientes o procesos diferenciados para preparar, validar y publicar cambios.

**Criterio de aceptación:** los enlaces de prueba no aparecen indexados ni reciben leads reales por equivocación; hay ruta de rollback y responsable designado.

#### ARQ-006 — Registro de configuración
**Clasificación original:** `P0, PR`.

**Requisito:** Dominios, DNS, certificados, parámetros de correo, rutas, versiones de software y proveedores deberán estar documentados sin exponer credenciales.

**Criterio de aceptación:** el personal autorizado dispone de una ficha técnica de operación actualizada y verificable.

#### ARQ-007 — Compatibilidad
**Clasificación original:** `P1, PR`.

**Requisito:** El sitio deberá operar en versiones recientes y soportadas de Chrome, Edge, Firefox y Safari, en escritorio y móvil.

**Criterio de aceptación:** pruebas documentadas en una matriz de navegadores y resoluciones acordada para el lanzamiento.

#### ARQ-008 — Control de dependencias
**Clasificación original:** `P0, PR`.

**Requisito:** Se minimizarán dependencias externas y se mantendrá un inventario de librerías, versiones y licencias.

**Criterio de aceptación:** análisis de vulnerabilidades conocido, licencias revisadas y procedimientos de actualización definidos.

#### ARQ-009 — Disponibilidad operativa
**Clasificación original:** `P1, VA`.

**Requisito:** El sitio deberá contar con monitoreo de disponibilidad y alertas hacia un responsable.

**Criterio de aceptación:** se realizan pruebas de detección de caída y recuperación; el objetivo porcentual de disponibilidad se acordará con base en la capacidad y SLA del proveedor contratado, sin inventar un nivel garantizado.

#### ARQ-010 — Copias de seguridad y recuperación
**Clasificación original:** `P0, PR`.

**Requisito:** Deberá existir respaldo de archivos, configuraciones, contenido y procedimientos de recuperación, con protección de acceso.

**Criterio de aceptación:** prueba documentada de restauración; frecuencia, retención, RPO y RTO se definen tras evaluar el volumen y criticidad de los datos.

## 9. Requisitos de contenido y gestión multimedia

### 9.1. Decisión técnica preliminar sobre almacenamiento

Para la V1 se propone almacenar las fotografías originales en un repositorio privado con respaldo, fuera del directorio público; generar versiones optimizadas y autorizadas para publicación y servirlas como archivos estáticos o mediante una CDN aprobada, según los recursos disponibles. Un archivo JSON o equivalente podrá relacionar cada recurso con ficha, idioma, derechos, textos alternativos, tamaños y versiones. No se justifica guardar las imágenes binarias en una base de datos solo para mostrarlas en un sitio corporativo relativamente pequeño.

Esta recomendación se apoya en la separación entre datos editoriales y archivos multimedia, en la reducción de consultas innecesarias y en los controles de publicación. No supone que exista una CDN contratada ni que el plan ofrezca almacenamiento o transferencia suficientes. Para video, dada la posible limitación de ancho de banda del hosting compartido, deberá evaluarse un servicio especializado de distribución o reproductor aprobado; no es obligatorio integrarlo en la V1 si no existe material validado.

El sitio no permitirá subidas de archivos por visitantes en V1. La publicación de fotografías o videos será una operación editorial autorizada. Si en el futuro se incorpora carga desde navegador, será un nuevo alcance sometido a controles de validación de tipo real de archivo, tamaños, permisos, procesamiento aislado y almacenamiento seguro.

### 9.2. Requisitos verificables

#### MED-001 — Inventario de activos
**Clasificación original:** `P0, AC`.

**Requisito:** Antes de maquetar fichas deberán inventariarse las fotografías profesionales existentes, identificando origen, dimensiones, productos, titularidad, restricciones y aprobación de publicación.

**Criterio de aceptación:** existe un listado revisado que identifica qué archivo puede utilizarse y dónde.

#### MED-002 — Derechos y sensibilidad
**Clasificación original:** `P0, PR`.

**Requisito:** Solo se publicarán recursos con autorización suficiente; se revisarán nombres, fechas, rostros, matrículas y otra información identificable visible en piezas o imágenes.

**Criterio de aceptación:** cada recurso tiene estado editorial y cualquier anonimización o autorización está documentada.

#### MED-003 — Originales separados
**Clasificación original:** `P0, PR`.

**Requisito:** Los archivos maestros y sus copias de seguridad no deberán estar expuestos en el sitio público ni ser descargables por rutas previsibles.

**Criterio de aceptación:** una prueba HTTP sin autenticación no permite acceder a originales privados.

#### MED-004 — Derivados web
**Clasificación original:** `P1, PR`.

**Requisito:** Se generarán tamaños y formatos adecuados, priorizando WebP o AVIF y añadiendo formatos alternativos cuando la compatibilidad lo justifique.

**Criterio de aceptación:** cada imagen principal dispone de variante apropiada por pantalla y su tamaño real se revisa en pruebas de red móvil.

#### MED-005 — Carga adaptativa
**Clasificación original:** `P1, PR`.

**Requisito:** Las imágenes incorporarán dimensiones o proporción reservada, selección responsiva y carga diferida en contenido fuera de la primera vista. La imagen principal que determine el LCP no deberá cargarse de forma diferida.

**Criterio de aceptación:** no existen saltos de diseño relevantes durante la carga y la imagen principal aparece sin retrasos artificiales.

#### MED-006 — Metadatos públicos
**Clasificación original:** `P0, PR`.

**Requisito:** Los recursos destinados a web deberán eliminar metadatos que no sean necesarios, especialmente geolocalización EXIF y otros datos internos.

**Criterio de aceptación:** se inspecciona una muestra representativa de archivos servidos públicamente.

#### MED-007 — Fidelidad visual
**Clasificación original:** `P1, AC`.

**Requisito:** El tratamiento de imagen deberá preservar de manera razonable las características de color, textura y acabado del granito, sin representar un color diferente como si fuese el material real.

**Criterio de aceptación:** el equipo valida visualmente las imágenes de producto y la advertencia sobre variaciones de pantalla.

#### MED-008 — Nombres, textos y accesibilidad
**Clasificación original:** `P1, PR`.

**Requisito:** Cada imagen de contenido contará con nombre de archivo estable y descripción alternativa que responda a su función, ajustada al idioma de la página.

**Criterio de aceptación:** auditoría de alt, imágenes decorativas y enlaces que contienen imágenes; no se emplean nombres de personas sin autorización en URLs.

#### MED-009 — Gestión editorial de versiones
**Clasificación original:** `P1, PR`.

**Requisito:** El inventario multimedia deberá permitir reemplazar una imagen, retirarla y rastrear su relación con páginas y productos.

**Criterio de aceptación:** la retirada o sustitución de una imagen no deja referencias rotas y puede desplegarse mediante el proceso de publicación.

#### MED-010 — Video condicionado a material disponible
**Clasificación original:** `P2, VA`.

**Requisito:** Si existe o se aprueba contenido audiovisual, se publicará en una modalidad que no sature el hosting ni bloquee la carga de la página.

**Criterio de aceptación:** se selecciona técnicamente entre alojamiento especializado o archivo web optimizado tras revisar duración, peso, derechos y proveedor.

#### MED-011 — Reproducción respetuosa
**Clasificación original:** `P1 si hay video, PR`.

**Requisito:** Los videos publicados deberán tener imagen de portada, controles accesibles, subtítulos para contenido hablado y no reproducir audio automáticamente.

**Criterio de aceptación:** el video puede iniciarse, pausarse y detenerse mediante teclado; un fallo de reproducción no bloquea el contenido de la página.

#### MED-012 — Privacidad de reproductores
**Clasificación original:** `P1 si hay video externo, PR`.

**Requisito:** La incorporación de reproductores de terceros deberá evaluar cookies, transferencias de datos y posibilidad de carga bajo interacción o consentimiento según corresponda.

**Criterio de aceptación:** el aviso de privacidad refleja los proveedores reales y se verifica el comportamiento en navegador.

#### MED-013 — Preparación para SEO audiovisual
**Clasificación original:** `P2, PR`.

**Requisito:** Los videos con contenido sustantivo y página propia podrán utilizar transcripciones, datos estructurados válidos y miniaturas estables.

**Criterio de aceptación:** se verifica su descubrimiento técnico y coherencia del marcado sin prometer resultados enriquecidos.

## 10. Requisitos de rendimiento y accesibilidad

#### RNF-001 — Core Web Vitals
**Clasificación original:** `P1, PR`.

**Requisito:** El equipo optimizará las plantillas clave para lograr, en datos reales y en el percentil 75 cuando exista muestra suficiente, LCP de hasta 2,5 segundos, INP de hasta 200 ms y CLS de hasta 0,1.

**Criterio de aceptación:** informe por tipo de página y dispositivo; antes de disponer de datos de campo se utilizarán pruebas de laboratorio, cuyos resultados se distinguirán expresamente.

#### RNF-002 — Presupuesto de transferencia
**Clasificación original:** `P1, PR`.

**Requisito:** Deberá establecerse un presupuesto de recursos por plantilla, incluyendo CSS, JavaScript, imágenes y fuentes. Se adopta de manera provisional la referencia histórica de 2,5 MB para la portada como objetivo de diseño sujeto a prueba y ratificación, no como límite normativo universal.

**Criterio de aceptación:** reporte de transferencia con justificación de excepciones.

#### RNF-003 — Diseño adaptable
**Clasificación original:** `P1, AC`.

**Requisito:** El sitio deberá funcionar desde 320 píxeles de ancho y en puntos de comprobación de 768, 1024 y 1440 píxeles, sin desbordamiento horizontal ni pérdida de contenido.

**Criterio de aceptación:** registro de pruebas de diseño en páginas y formularios representativos.

#### RNF-004 — WCAG 2.2 AA
**Clasificación original:** `P0, PR`.

**Requisito:** Se utilizará WCAG 2.2 nivel AA como objetivo técnico de accesibilidad para plantillas e interacciones de la primera entrega.

**Criterio de aceptación:** revisión automatizada y manual de los criterios aplicables, con registro de incidencias y correcciones; no se declarará conformidad integral sin evaluación suficiente.

#### RNF-005 — Teclado y foco
**Clasificación original:** `P0, PR`.

**Requisito:** Navegación, filtros, menús, formularios, diálogos y galerías deberán poder manejarse mediante teclado, con foco visible y orden lógico.

**Criterio de aceptación:** recorridos principales completos sin ratón y sin trampas de foco.

#### RNF-006 — Contraste y tipografía
**Clasificación original:** `P0, PR`.

**Requisito:** El uso de los colores aprobados deberá satisfacer el contraste aplicable de WCAG 2.2 AA; se respetará el redimensionamiento del texto sin pérdida de función.

**Criterio de aceptación:** comprobación de pares de color y zoom, incluidos mensajes de error, textos secundarios y botones.

#### RNF-007 — Idioma, formularios y mensajes
**Clasificación original:** `P0, PR`.

**Requisito:** Las páginas tendrán idioma declarativo correcto; campos con etiquetas, instrucciones y errores comprensibles, sin comunicar el error exclusivamente por color.

**Criterio de aceptación:** evaluación con tecnologías de asistencia y teclado de los formularios en ambos idiomas.

#### RNF-008 — Movimiento y lectura
**Clasificación original:** `P1, PR`.

**Requisito:** Las animaciones serán discretas, no esenciales y compatibles con preferencias de movimiento reducido; el texto mantendrá una jerarquía clara.

**Criterio de aceptación:** navegación legible con prefers-reduced-motion y sin interacciones que dependan solo de animación.

#### RNF-009 — Rendimiento de fuentes
**Clasificación original:** `P1, PR`.

**Requisito:** La tipografía elegida se entregará con subconjuntos adecuados, licencia compatible, precarga selectiva y estrategia de visualización que evite bloqueos.

**Criterio de aceptación:** auditoría de fuentes y verificación de caracteres EN/ES, incluyendo Cormorant Garamond en titulares si continúa aprobada.

## 11. Requisitos SEO técnico e internacional

#### SEO-001 — HTML indexable
**Clasificación original:** `P0, PR`.

**Requisito:** Cada página pública relevante deberá entregar un documento HTML con título, encabezado y texto principal accesibles para motores de búsqueda, sin requerir que el rastreador ejecute toda la aplicación para conocer su contenido.

**Criterio de aceptación:** inspección de respuesta inicial, render de Google Search Console y recorrido de enlaces.

#### SEO-002 — URLs por idioma
**Clasificación original:** `P0, PR`.

**Requisito:** Inglés y español deberán tener direcciones estables diferentes; no se utilizarán solo cookies, estado de React o geolocalización por IP para servir el idioma a los buscadores.

**Criterio de aceptación:** ambas versiones pueden abrirse directamente, enlazarse y rastrearse.

<!-- Inicio de contenido procedente de la página 10 del PDF original -->

#### SEO-003 — Metadatos por página
**Clasificación original:** `P0, PR`.

**Requisito:** Cada URL indexable contará con title, descripción, H1 principal y metadatos sociales contextualizados en su idioma.

**Criterio de aceptación:** matriz de URLs con metadatos únicos o conscientemente reutilizados donde proceda; revisión sin prometer posiciones.

#### SEO-004 — Canonical y hreflang
**Clasificación original:** `P0, PR`.

**Requisito:** Las páginas tendrán canonical adecuado y relaciones recíprocas hreflang entre las versiones equivalentes; se considerará x-default cuando exista una página de selección neutra o corresponda.

**Criterio de aceptación:** auditoría de URLs y anotaciones sin referencias a páginas inexistentes.

#### SEO-005 — Descubrimiento
**Clasificación original:** `P0, PR`.

**Requisito:** El sitio publicará robots.txt, sitemap XML con URLs canónicas indexables y enlaces internos HTML.

**Criterio de aceptación:** todos los destinos declarados devuelven estado esperado; no se bloquean por error recursos necesarios para el rastreo.

#### SEO-006 — Estructura semántica
**Clasificación original:** `P1, PR`.

**Requisito:** Se utilizarán encabezados jerárquicos, enlaces descriptivos, navegación semántica, textos relevantes e información alternativa de medios.

**Criterio de aceptación:** revisión de plantillas y contenido en ambos idiomas.

#### SEO-007 — Datos estructurados
**Clasificación original:** `P1, PR`.

**Requisito:** Se incluirá JSON-LD apropiado, comenzando por LocalBusiness o tipo específico sustentado, Organization y, según la página, BreadcrumbList u otros tipos válidos.

**Criterio de aceptación:** los datos coinciden con el contenido público y pasan validación técnica; no se agregan reseñas, ratings, ofertas ni direcciones ficticias.

#### SEO-008 — Control de indexación
**Clasificación original:** `P0, PR`.

**Requisito:** Las vistas internas, pruebas, recursos privados, respuestas de formularios y páginas sin valor indexable tendrán controles correctos de acceso o indexación.

**Criterio de aceptación:** inspección de encabezados y metadatos, distinguiendo noindex de controles reales de privacidad.

#### SEO-009 — Contenido útil
**Clasificación original:** `P1, AC`.

**Requisito:** Los textos describirán capacidades reales de taller, tipos de monumentos, proceso, materiales y decisiones frecuentes con lenguaje sencillo, sin páginas creadas exclusivamente para repetir palabras clave.

**Criterio de aceptación:** revisión editorial de exactitud, utilidad y originalidad.

#### SEO-010 — Search Console
**Clasificación original:** `P0, PR`.

**Requisito:** Deberá verificarse la propiedad del dominio nuevo y comprobarse la capacidad de consultar la antigua, si está disponible.

**Criterio de aceptación:** acceso autorizado, envío de sitemap, revisión de cobertura, consultas y errores tras el lanzamiento.

#### SEO-011 — Integridad de enlaces y errores HTTP
**Clasificación original:** `P0, PR`.

**Requisito:** Enlaces permanentes y recursos deberán usar estados HTTP correctos; no se tratarán errores como respuestas 200.

**Criterio de aceptación:** rastreo automatizado de páginas y enlaces esenciales antes de la publicación.

## 12. Requisitos de SEO local y Google Business Profile

A efectos de este SRS se usa GEO local para referirse a optimización geográfica y búsquedas locales. No debe confundirse con GEO generativo, que se aborda junto a AEO en el capítulo siguiente.

#### LOC-001 — Identidad comercial consistente
**Clasificación original:** `P0, AC`.

**Requisito:** Nombre, dirección y teléfono (NAP) del sitio deberán coincidir con datos oficialmente aprobados y con la ficha de Google Business Profile, considerando el tratamiento de números de seguimiento existentes.

**Criterio de aceptación:** hoja maestra NAP y comparación de todas las ubicaciones visibles.

#### LOC-002 — Cercanía real
**Clasificación original:** `P1, AC`.

**Requisito:** El sitio deberá explicar su ubicación en Glendale y el acceso próximo a All Faiths Cemetery sin afirmar que la empresa es administradora del cementerio.

**Criterio de aceptación:** revisión editorial y comprobación de indicaciones por responsables locales.

#### LOC-003 — Cobertura comprobada
**Clasificación original:** `P1, AC`.

**Requisito:** Las páginas o referencias a Queens, Brooklyn, Bronx, Staten Island, Manhattan, Long Island y Nueva Jersey estarán sustentadas por prestación de servicio real.

**Criterio de aceptación:** matriz de localidades, cementerios, servicios y limitaciones validada por operaciones.

#### LOC-004 — Páginas locales con valor propio
**Clasificación original:** `P2, PR`.

**Requisito:** Se podrán crear páginas sobre cementerios o ubicaciones si existe información específica y útil, verificada, con mantenimiento y diferenciación editorial.

**Criterio de aceptación:** no se publican páginas repetidas que solo sustituyen el nombre de una ciudad.

#### LOC-005 — Coordinación con Hibu y GBP
**Clasificación original:** `P0, AC`.

**Requisito:** Cualquier cambio de URL en Google Business Profile deberá coordinarse con los responsables que lo administran a través de Hibu, respetando el contrato vigente hasta marzo de 2027.

**Criterio de aceptación:** constancia de permisos, fecha de cambio, valor anterior, valor nuevo y comprobación de ficha activa.

#### LOC-006 — Reputación verificable
**Clasificación original:** `P2, VA`.

**Requisito:** Si se publican reseñas o referencias externas, deberá mantenerse su autenticidad y representación correcta.

**Criterio de aceptación:** verificación de fuente, consentimiento o autorización y cumplimiento de política de publicación del proveedor.

## 13. Requisitos para respuestas de buscadores y búsqueda generativa: AEO y GEO generativo

En este documento AEO significa Answer Engine Optimization y GEO generativo significa Generative Engine Optimization. Son enfoques de organización del contenido orientados a que sistemas de búsqueda y respuesta puedan entender información útil. Ninguno garantiza presencia, cita o posición en respuestas de IA. Para Google, las guías actuales sitúan las prácticas SEO fundamentales, el contenido original, la indexabilidad y la coherencia editorial como base; no exigen archivos especiales ni marcado específico para aparecer en funciones generativas.

#### AEO-001 — Respuestas directas
**Clasificación original:** `P1, PR`.

**Requisito:** El contenido educativo deberá responder preguntas reales con explicaciones claras, autosuficientes y enlazadas a secciones más amplias cuando corresponda.

**Criterio de aceptación:** revisión de preguntas frecuentes aprobadas y su cobertura bilingüe.

#### AEO-002 — Precisión y autoría comercial
**Clasificación original:** `P1, PR`.

**Requisito:** Las descripciones de servicios, técnicas, materiales y reglas de cementerios deberán estar aprobadas por personas competentes y señalar límites aplicables.

**Criterio de aceptación:** historial editorial de aprobación y revisión de afirmaciones críticas.

#### AEO-003 — Información accesible como texto
**Clasificación original:** `P1, PR`.

**Requisito:** Los datos importantes de producto, cobertura, procesos y condiciones no existirán únicamente dentro de imágenes, PDF o video.

**Criterio de aceptación:** se recupera la información esencial a partir del contenido HTML visible.

#### AEO-004 — Coherencia estructurada
**Clasificación original:** `P1, PR`.

**Requisito:** El marcado semántico y JSON-LD deberán coincidir con la información visible, sin inventar contenido para sistemas de búsqueda.

**Criterio de aceptación:** muestreo automatizado y revisión editorial.

#### AEO-005 — Medición prudente
**Clasificación original:** `P2, PR`.

**Requisito:** Cuando las herramientas disponibles lo permitan, podrán registrarse impresiones, clics y referencias procedentes de nuevas experiencias de búsqueda, sin atribuciones que los datos no sostengan.

**Criterio de aceptación:** el reporte distingue observaciones de estimaciones o inferencias.

## 14. Requisitos de SEM y analítica comercial

SEM se incluye como preparación técnica y metodológica de la V1. No implica contratar Google Ads, comprometer inversión ni activar campañas al publicar la web.

#### SEM-001 — Páginas de destino preparadas
**Clasificación original:** `P1, PR`.

**Requisito:** Los servicios prioritarios podrán utilizar URLs estables con propuesta de valor, contenido apropiado, contacto visible y coherencia con anuncios futuros.

**Criterio de aceptación:** se verifica destino móvil, velocidad, accesibilidad y correspondencia entre texto de anuncio hipotético y página.

#### SEM-002 — Parámetros de campaña
**Clasificación original:** `P1, PR`.

**Requisito:** La web deberá preservar parámetros UTM u otros parámetros autorizados sin introducirlos en HTML indexable, exponerlos como datos personales o quebrar canonical.

**Criterio de aceptación:** pruebas de navegación y atribución, sin registrar datos sensibles en URLs.

#### SEM-003 — Conversiones definidas
**Clasificación original:** `P0, PR`.

**Requisito:** Se deberá acordar una taxonomía mínima de eventos: envío exitoso de formulario, clic de teléfono, clic de correo y solicitud de indicaciones, distinguiéndolos de un cliente confirmado.

**Criterio de aceptación:** diccionario de eventos y pruebas de registro sin duplicación evidente.

#### SEM-004 — Privacidad de medición
**Clasificación original:** `P0, PR`.

**Requisito:** Los servicios de analítica o publicidad deberán configurarse según el régimen legal aplicable, mecanismos de aviso o consentimiento necesarios y minimización de datos.

**Criterio de aceptación:** inventario de etiquetas y proveedores; las herramientas no envían contenido del mensaje, nombres o correos del formulario como parámetros de marketing sin base y autorización específica.

#### SEM-005 — Línea base y atribución
**Clasificación original:** `P0, AC`.

**Requisito:** Antes de apagar la web anterior deberán inventariarse las fuentes de consultas y medición de Hibu, GBP, Search Console, anuncios y call tracking disponibles.

**Criterio de aceptación:** se entrega reporte de situación actual, limitaciones y propiedad de cuentas.

<!-- Inicio de contenido procedente de la página 12 del PDF original -->

#### SEM-006 — Campañas futuras
**Clasificación original:** `P2, VA`.

**Requisito:** La configuración de campañas, presupuesto, segmentación, palabras clave negativas y optimización de costo por lead requerirá autorización separada.

**Criterio de aceptación:** ninguna campaña se activa por el mero hecho de publicar el sitio; existe un plan comercial aprobado si se decide proceder.

## 15. Requisitos de seguridad, protección de datos y continuidad

### 15.1. Marco de verificación

La implementación deberá adoptar el principio de seguridad desde el diseño y seleccionar controles pertinentes de OWASP Application Security Verification Standard (ASVS) 5.0.0, tomando como referencia un perfil de aplicación pública sin autenticación de clientes y con un punto de recepción de consultas. No se afirma conformidad total con ASVS ni se seleccionan identificadores detallados sin efectuar un mapeo de controles aplicables. Los componentes futuros que introduzcan administración web, autenticación, carga de archivos, comercio electrónico o IA deberán someterse a un nuevo análisis de riesgos.

La evaluación de privacidad y obligaciones legales dependerá de la localización del negocio, los proveedores, los datos tratados y las prácticas reales de analítica. El documento no presume que una ley concreta se aplica ni sustituye asesoría jurídica en Nueva York o Nueva Jersey.

### 15.2. Requisitos verificables

#### SEG-001 — HTTPS y TLS
**Clasificación original:** `P0, PR`.

**Requisito:** Todas las páginas y APIs de producción deberán servirse mediante HTTPS con certificados válidos y configuración segura de TLS.

**Criterio de aceptación:** HTTP redirige a HTTPS, se verifica cadena y vigencia del certificado, y no se detecta contenido mixto.

#### SEG-002 — Encabezados de protección
**Clasificación original:** `P0, PR`.

**Requisito:** La aplicación deberá definir encabezados de seguridad apropiados a su arquitectura, incluidos HSTS tras comprobar HTTPS estable, política de contenido CSP evaluada, protección de tipo MIME, política de referencia y limitaciones de encuadre.

**Criterio de aceptación:** revisión automatizada y prueba funcional de recursos, formularios, videos y mapas bajo la política real.

#### SEG-003 — Validación del servidor
**Clasificación original:** `P0, PR`.

**Requisito:** Toda entrada de formularios deberá validarse del lado del servidor por longitud, formato, contenido esperado y límites de petición.

**Criterio de aceptación:** entradas inválidas se rechazan sin ejecutar código ni enviar correos; validación de frontend no es el único control.

#### SEG-004 — Prevención de XSS e inyección
**Clasificación original:** `P0, PR`.

**Requisito:** Los datos enviados no deberán incorporarse a HTML, correos o registros sin codificación contextual o manejo seguro; no se ejecutará contenido HTML proporcionado por el visitante.

**Criterio de aceptación:** conjunto de pruebas de inyección, caracteres especiales y escapes; revisión de plantillas y bibliotecas empleadas.

#### SEG-005 — Protección del correo
**Clasificación original:** `P0, PR`.

**Requisito:** Se evitarán inyecciones de cabeceras de correo, remitentes falsificados y envío como relay abierto; las credenciales SMTP o API deberán permanecer fuera del código y del cliente.

**Criterio de aceptación:** pruebas de cabeceras inválidas, autenticación de servicio y ausencia de secretos en archivos públicos.

#### SEG-006 — Antiabuso por capas
**Clasificación original:** `P0, PR`.

**Requisito:** Los endpoints públicos deberán incorporar limitación de frecuencia y tamaño, validación, técnica de campo trampa cuando proceda y controles escalables contra envío automatizado.

**Criterio de aceptación:** pruebas de ráfaga, repetición y envío masivo no provocan envío irrestricto de correo; un honeypot por sí solo no se considera suficiente.

#### SEG-007 — Acceso administrativo
**Clasificación original:** `P0, PR`.

**Requisito:** Cuentas de repositorio, hosting, DNS, Hibu, GBP, correo y analítica deberán tener permisos mínimos, protección multifactor cuando el servicio lo permita y responsables identificados.

**Criterio de aceptación:** inventario de accesos, comprobación de permisos y procedimiento de revocación.

#### SEG-008 — Secretos y configuración
**Clasificación original:** `P0, PR`.

**Requisito:** Claves de correo, API y despliegue deberán almacenarse en mecanismos privados del entorno, no en repositorios, JavaScript cliente, archivos servidos ni documentación compartida.

**Criterio de aceptación:** escaneo de secretos y revisión de directorios públicos.

#### SEG-009 — Dependencias y actualización
**Clasificación original:** `P0, PR`.

**Requisito:** Se utilizarán dependencias mantenidas, versiones fijadas y evaluación de vulnerabilidades conocidas.

**Criterio de aceptación:** inventario de paquetes, revisión de alertas críticas antes del lanzamiento y procedimiento de parches.

<!-- Inicio de contenido procedente de la página 13 del PDF original -->

#### SEG-010 — Seguridad de archivos
**Clasificación original:** `P0, PR`.

**Requisito:** Los recursos multimedia públicos deberán proceder de un proceso editorial seguro; originales y archivos internos no serán ejecutables ni quedarán expuestos.

**Criterio de aceptación:** prueba de rutas, permisos y tipos MIME; no existe endpoint de subida pública en V1.

#### SEG-011 — Política de registros
**Clasificación original:** `P0, PR`.

**Requisito:** Los logs operativos deberán evitar registrar mensajes completos, direcciones de correo y datos sensibles de visitantes salvo necesidad justificada y aprobada.

**Criterio de aceptación:** inspección de registros ante éxito, error y ataque simulado; se documenta plazo de retención, acceso y eliminación.

#### SEG-012 — Minimización y retención
**Clasificación original:** `P0, PR`.

**Requisito:** La información de contacto se recogerá para gestionar la solicitud; deberá definirse su retención y tratamiento en el sistema de correo receptor.

**Criterio de aceptación:** mapa de flujo de datos desde navegador hasta correo y eventuales respaldos; no se promete destrucción inmediata de memoria ni inexistencia absoluta de copias cuando el transporte, logs o proveedores puedan mantenerlas.

#### SEG-013 — Privacidad y terceros
**Clasificación original:** `P0, PR`.

**Requisito:** La integración de mapas, analítica, captcha o reproductores deberá documentar proveedores y datos compartidos, incorporando consentimiento cuando corresponda.

**Criterio de aceptación:** matriz de terceros y comprobación de su ejecución real en navegador.

#### SEG-014 — Integridad de despliegue
**Clasificación original:** `P0, PR`.

**Requisito:** El proceso de publicación deberá evitar modificaciones no autorizadas, establecer revisión previa y permitir recuperar una versión estable.

**Criterio de aceptación:** se simula un despliegue fallido y se restaura la versión anterior sin perder canales de contacto.

#### SEG-015 — Seguridad de dominio y DNS
**Clasificación original:** `P0, PR`.

**Requisito:** Se verificarán titularidad y roles sobre los dominios, registrar, DNS, protección de cambios y renovación; se evaluarán los registros SPF, DKIM y DMARC del dominio remitente.

**Criterio de aceptación:** informe técnico de configuración y pruebas de correo, sin afectar el servicio existente.

#### SEG-016 — Resiliencia y monitoreo
**Clasificación original:** `P0, PR`.

**Requisito:** Se configurará observabilidad suficiente para detectar caídas, errores de formularios y problemas de certificados, sin exponer datos personales.

**Criterio de aceptación:** una prueba de error genera evento consultable y responsable de atención designado.

#### SEG-017 — Pruebas de seguridad
**Clasificación original:** `P0, PR`.

**Requisito:** Antes del lanzamiento se efectuarán pruebas manuales y automatizadas proporcionales al riesgo: validación, seguridad de formularios, headers, TLS, dependencias, permisos, secretos, accesos y configuraciones.

**Criterio de aceptación:** informe de pruebas, evidencia de corrección de hallazgos críticos o altos y aceptación expresa de riesgos residuales.

#### SEG-018 — Procedimiento de incidentes
**Clasificación original:** `P1, PR`.

**Requisito:** El proyecto deberá documentar a quién notificar, cómo preservar evidencia, contener un problema, restaurar la web y evaluar obligaciones de notificación de incidentes.

**Criterio de aceptación:** existe documento operativo y responsables designados.

#### SEG-019 — Defensa contra CSRF y abuso de origen
**Clasificación original:** `P0, PR`.

**Requisito:** Si se utilizan sesiones o cookies de autenticación deberán aplicarse controles anti-CSRF adecuados; cualquier API pública deberá evitar confiar únicamente en Origin o CORS como protección de abuso.

**Criterio de aceptación:** revisión de modelo de sesión, CORS, cookies y pruebas negativas ajustadas a la arquitectura final.

#### SEG-020 — Reducción de superficie expuesta
**Clasificación original:** `P0, PR`.

**Requisito:** No deberán publicarse endpoints de depuración, archivos de configuración, mapas de código con información sensible, respaldos ni paneles administrativos innecesarios.

**Criterio de aceptación:** inspección de archivos desplegados y rutas potencialmente accesibles.

## 16. Migración desde Hibu y preservación de visibilidad y captación

La migración de allfaithsmonumentsny.com a allfaithsmonumentsinc.com es una actividad crítica para el negocio. Una página antigua poco atractiva visualmente puede seguir siendo valiosa por sus señales de ubicación, vínculos, datos históricos o rutas de consulta. El trabajo de migración deberá conservar lo comprobablemente útil, no limitarse a sustituir la portada.

#### MIG-001 — Acceso y propiedad
**Clasificación original:** `P0, AC`.

**Requisito:** Antes de publicar se deberá identificar quién controla los dos dominios, registradores, DNS, alojamiento Hibu, perfiles, cuentas y números telefónicos, incluyendo instrumentos de recuperación de acceso.

**Criterio de aceptación:** inventario firmado o validado por responsables con permisos efectivos.

<!-- Inicio de contenido procedente de la página 14 del PDF original -->

#### MIG-002 — Auditoría de sitio anterior
**Clasificación original:** `P0, AC`.

**Requisito:** Se deberá levantar un inventario de URLs, títulos, encabezados, contenido, servicios, imágenes, enlaces internos, páginas indexadas y elementos de contacto de Hibu.

**Criterio de aceptación:** informe de rastreo, evidencias, riesgos y limitaciones de acceso.

#### MIG-003 — Línea base de resultados
**Clasificación original:** `P0, AC`.

**Requisito:** Se revisarán datos accesibles de tráfico, consultas, Search Console, Google Business Profile, llamadas, formularios, campañas y atribución.

**Criterio de aceptación:** informe que distinga datos medidos, periodos, fuentes y faltantes; no se supone que todos los buenos leads provienen del SEO.

#### MIG-004 — Mapa de URLs
**Clasificación original:** `P0, PR`.

**Requisito:** Cada URL antigua indexable o con tráfico/enlaces relevantes deberá disponer de destino equivalente o tratamiento específico.

**Criterio de aceptación:** tabla de URL origen, destino, contenido equivalente y tipo de respuesta; no se redirigen todas indiscriminadamente a inicio.

#### MIG-005 — Redirecciones permanentes
**Clasificación original:** `P0, PR`.

**Requisito:** Siempre que el control técnico del dominio lo permita, las rutas migradas deberán responder con 301 o 308 hacia la URL final pertinente, evitando cadenas.

**Criterio de aceptación:** pruebas HTTP para rutas principales, URL internas, www y sin www, HTTP y HTTPS; resultado documentado por ruta.

#### MIG-006 — Permanencia después de Hibu
**Clasificación original:** `P0, AC`.

**Requisito:** Deberá existir un plan de operación de las redirecciones que continúe después del contrato de Hibu de marzo de 2027.

**Criterio de aceptación:** constan proveedor, acceso, responsable y costos autorizados; las redirecciones no dependen exclusivamente de una característica que desaparezca sin alternativa.

#### MIG-007 — No interferencia con Google Business Profile
**Clasificación original:** `P0, AC`.

**Requisito:** El cambio de URL y cualquier ajuste del perfil deberá coordinarse con el administrador actual del servicio Hibu, sin duplicar fichas ni cambiar nombre o categoría para añadir palabras clave.

**Criterio de aceptación:** la ficha oficial sigue accesible y presenta el nuevo sitio en el momento acordado; se conserva historial disponible y la trazabilidad de cambios.

#### MIG-008 — Continuidad de contacto
**Clasificación original:** `P0, AC`.

**Requisito:** El lanzamiento no deberá interrumpir correo corporativo, teléfono, consultas ni números de seguimiento existentes sin un plan de transición.

**Criterio de aceptación:** llamadas y formularios de prueba desde sitio y canales locales funcionan antes y después del cambio.

#### MIG-009 — Preparación de indexación
**Clasificación original:** `P0, PR`.

**Requisito:** Antes de activar redirecciones se comprobarán nuevas páginas, canonical, hreflang, sitemap, robots, estados HTTP, recursos multimedia y enlaces internos.

**Criterio de aceptación:** lista de comprobación aprobada y rastreo de la nueva web.

#### MIG-010 — Ventana de verificación
**Clasificación original:** `P1, PR`.

**Requisito:** Tras migrar, se deberán revisar errores, búsquedas, páginas indexadas y captación en periodos acordados, considerando que las posiciones pueden fluctuar temporalmente.

**Criterio de aceptación:** reportes de seguimiento en hitos propuestos de 7, 30, 60 y 90 días, sujetos a datos disponibles.

#### MIG-011 — Plan de contingencia
**Clasificación original:** `P0, PR`.

**Requisito:** Se deberá documentar la respuesta ante caída del dominio, redirección incorrecta, correo no operativo o pérdida de visibilidad crítica.

**Criterio de aceptación:** plan ensayado para restaurar el servicio dentro de capacidades reales de los proveedores, con responsables claros.

#### MIG-012 — Activos con licencia
**Clasificación original:** `P0, PR`.

**Requisito:** Los contenidos y recursos trasladados desde Hibu deberán someterse a revisión de propiedad intelectual y permisos.

**Criterio de aceptación:** no se reutilizan plantillas, imágenes o código de terceros sin derecho suficiente.

## 17. Restricciones visuales y criterios de identidad

#### DIS-001 — Aplicación de marca
**Clasificación original:** `P1, AC`.

**Requisito:** El sitio utilizará el logo definitivo aportado por el negocio y sus variantes autorizadas.

**Criterio de aceptación:** responsables aprueban las aplicaciones en cabecera, pie de página, favicon y fondos claros u oscuros.

#### DIS-002 — Dirección emocional
**Clasificación original:** `P1, AC`.

**Requisito:** Diseño, fotografías y lenguaje deberán transmitir prioritariamente luz y vida, sin perder serenidad, dignidad, respeto y permanencia.

**Criterio de aceptación:** revisión de concepto visual y contenido por propietarios antes de cerrar la maquetación.

#### DIS-003 — Paleta
**Clasificación original:** `P1, AC`.

**Requisito:** La interfaz partirá de Hueso #FAF6ED, Arena #EFE7D4, Lino #CCC5B5, Piedra #6B6155, Tinta #282520, Granito negro #15161A y, de manera moderada si se autoriza, Bronce envejecido #9A7B4F.

**Criterio de aceptación:** revisión del sistema de diseño y contrastes accesibles.

<!-- Inicio de contenido procedente de la página 15 del PDF original -->

#### DIS-004 — Tipografía
**Clasificación original:** `P1, AC`.

**Requisito:** Los encabezados utilizarán Cormorant Garamond salvo actualización del manual del logo; la tipografía de cuerpo será sans-serif humanista seleccionada y aprobada.

**Criterio de aceptación:** muestra tipográfica documentada, legibilidad móvil y uso con licencia compatible.

#### DIS-005 — Inclusión simbólica
**Clasificación original:** `P1, AC`.

**Requisito:** No se utilizarán cruces, estrellas de David, menorás u otros símbolos de una sola tradición como emblemas generales de la marca.

**Criterio de aceptación:** revisión de elementos globales de UI; las fichas de trabajos reales podrán mostrar iconografía solicitada por clientes cuando sea apropiada y esté autorizada.

#### DIS-006 — Estética
**Clasificación original:** `P1, AC`.

**Requisito:** Se evitarán clipart, vitrales decorativos, gradientes llamativos, colores saturados, animaciones invasivas y un tono lúgubre o de venta por urgencia.

**Criterio de aceptación:** validación editorial y visual de componentes y fotografías finales.

## 18. Reglas de negocio y afirmaciones sujetas a revisión

#### NEG-001 — Venta asistida
**Clasificación original:** `P0, AC`.

**Requisito:** Las consultas se atenderán por personas; ninguna interfaz realizará cotización contractual automática.

**Criterio de aceptación:** no existen cálculos de precio ni compromisos comerciales generados por el sitio.

#### NEG-002 — Elegibilidad de entrega rápida
**Clasificación original:** `P0, AC`.

**Requisito:** La mención a 24 a 48 horas depende de una matriz aprobada de productos, condiciones, inicio del plazo, disponibilidad y significado de entrega.

**Criterio de aceptación:** matriz operativa y texto bilingüe aprobados antes de publicar la promesa.

#### NEG-003 — Reglas de cementerio
**Clasificación original:** `P1, AC`.

**Requisito:** El sitio no autorizará unilateralmente dimensiones, formas o instalaciones que requieren aceptación del cementerio.

**Criterio de aceptación:** contenido aclara el procedimiento de comprobación humana donde corresponda.

#### NEG-004 — Precios y calidad
**Clasificación original:** `P1, VA`.

**Requisito:** Se podrá comunicar atención a presupuestos distintos sin afirmar superioridad de precio o duración absoluta, hasta contar con fundamento suficiente.

**Criterio de aceptación:** propietarias o propietarios validan cualquier comparación y documentación de soporte.

#### NEG-005 — Historia y materiales
**Clasificación original:** `P1, VA`.

**Requisito:** Se publicará la trayectoria y especificación material en la forma que quede confirmada.

**Criterio de aceptación:** existe aprobación sobre año de fundación y sobre si todos los monumentos son de granito o existen otros materiales ofertados.

## 19. Estrategia de pruebas, verificación y aceptación

### 19.1. Modalidades de verificación

Inspección: revisión de contenido, identidad, rutas, enlaces, políticas, dominios, repositorio y configuraciones.

Demostración: recorridos EN/ES, catálogo y filtros, contacto, navegación accesible, galería, mapas y comunicación de plazos.

Prueba: automatizada y manual de formularios, seguridad, rendimiento, responsividad, estados HTTP y redirecciones.

Análisis: auditoría SEO, línea base Hibu, accesos GBP, revisión de arquitectura y licencias.

### 19.2. Escenarios de aceptación integral

<!-- Tabla reconstruida de la(s) página(s) 15, 16 del PDF. -->
| Caso | Recorrido o condición | Evidencia mínima |
| --- | --- | --- |
| AT-01 | Familia consulta en español y cambia a inglés conservando el servicio. | URLs propias, contenido completo, hreflang y navegación funcional. |
| AT-02 | Persona explora monumentos y filtra por tipo y preferencia opcional. | Resultados coherentes, estado vacío útil y enlace contextual. |
| AT-03 | Consulta breve y detallada desde móvil. | Validación, protección contra abuso, envío y recepción comprobados. |
| AT-04 | El servicio de correo falla. | Error legible, sin confirmación de éxito engañosa y registro técnico sin datos sensibles. |
| AT-05 | Página de entrada desde búsqueda local. | Información NAP aprobada, servicio correcto y CTA usable. |
| AT-06 | Apertura del sitio en pantalla de 320 píxeles. | No hay desbordamiento y los controles conservan accesibilidad. |
| AT-07 | Evaluación de imágenes y video aprobado. | Formatos adaptativos, permisos, carga correcta, accesibilidad y transferencia medida. |
| AT-08 | Rastreador visita rutas EN/ES y sitemap. | Estados HTTP, títulos, HTML indexable, canonicals y enlaces válidos. |
| AT-09 | Se accede a URL antigua importante. | Redirección permanente correcta al contenido equivalente. |
| AT-10 | Se actualiza un producto desde el repositorio editorial. | Revisión, versión nueva, despliegue y reversión demostrados. |
| AT-11 | Se simula abuso de formulario o payload de inyección. | Validación y controles de protección efectivos; no envío irrestricto de mensajes. |
| AT-12 | Se interrumpe un proveedor o un despliegue. | Procedimiento de recuperación y persona responsable identificados. |
| AT-13 | Comunicación sobre entrega rápida. | Redacción condicionada, no absoluta, validada en dos idiomas. |
| AT-14 | Revisión final de marca. | Logo aprobado, fotografía autorizada y validación de luz y vida por propietarios. |

<!-- Inicio de contenido procedente de la página 16 del PDF original -->

### 19.3. Condiciones de salida para publicar

Para autorizar producción deberán estar cerrados todos los hallazgos críticos y altos de seguridad relevantes para la V1, probados los canales de consulta y restablecimiento, aprobados identidad y contenido, verificada la accesibilidad de los recorridos principales, finalizadas las comprobaciones SEO y confirmada la migración de las URLs prioritarias. Los requisitos P0 no podrán diferirse sin registro explícito de cambio de alcance, evaluación de riesgo y aprobación escrita. Los P1 podrán pasar a fases posteriores solo mediante decisión documentada que no comprometa integridad, accesibilidad esencial, captación ni obligaciones aplicables.

Los reportes de rendimiento deberán separar medición de laboratorio y datos reales. La aparición en Google Search, Maps, anuncios o respuestas generativas no constituye condición de aceptación garantizable por el desarrollo, pues depende de sistemas y factores externos.

## 20. Priorización y dependencias de ejecución

<!-- Tabla reconstruida de la(s) página(s) 16 del PDF. -->
| Bloque | Prioridad | Dependencia principal | Resultado verificable |
| --- | --- | --- | --- |
| Investigación y accesos Hibu, GBP, dominios | P0 | Accesos efectivos, contrato y responsables | Inventario y riesgos de migración |
| Validación de hechos comerciales | P0 | Propietarios, taller y operación | Matriz de servicios, plazos, materiales y cobertura |
| Identidad y material visual | P0 | Logo y banco de fotos originales, permisos | Inventario y selección editorial aprobada |
| Arquitectura y hosting | P0 | Plan exacto y servicio de correo | Solución técnica viable y probada |
| Navegación, páginas e internacionalización | P0/P1 | Arquitectura de contenidos aprobada | Rutas completas EN/ES |
| Catálogo y galería | P1 | Fotos y fichas revisadas | Filtros, fichas y consultas contextuales |
| Formularios, seguridad y privacidad | P0 | Proveedor de correo y decisiones sobre datos | Leads recibidos con controles verificables |
| SEO técnico y local | P0/P1 | Auditoría anterior y NAP aprobado | Páginas rastreables, mapa de URLs y marcado válido |
| SEM y analítica mínima | P0/P1 | Consentimiento aplicable, acceso a cuentas | Taxonomía y eventos básicos sin datos sensibles |
| Migración y monitoreo | P0 | Redirecciones reales y coordinación Hibu | Sitio público con continuidad de canales |
| Contenido local ampliado y campañas | P2 | Línea base, capacidad editorial e inversión | Plan aprobado separado |
| Agente de IA | FU | Proyecto independiente posterior | Sin entregables obligatorios en V1 |

## 21. Matriz resumida de trazabilidad

<!-- Tabla reconstruida de la(s) página(s) 16, 17 del PDF. -->
| Objetivo de negocio | Requisitos principales | Pruebas de aceptación |
| --- | --- | --- |
| OB-01 Identidad | RF-006, RF-007, DIS-001 a DIS-006, MED-001 a MED-008 | AT-07, AT-14 |
| OB-02 Contacto humano | RF-010, RF-020 a RF-028, SEG-003 a SEG-006 | AT-03, AT-04, AT-11 |
| OB-03 Bilingüismo | RF-002, RF-003, RF-030, SEO-002 a SEO-004 | AT-01, AT-08 |
| OB-04 Continuidad de captación | MIG-001 a MIG-012, SEO-010, LOC-005, SEM-005 | AT-05, AT-09, AT-12 |
| OB-05 Información útil | RF-008 a RF-019, AEO-001 a AEO-004, LOC-003 | AT-02, AT-05, AT-13 |
| OB-06 Operación segura y ágil | ARQ-001 a ARQ-010, RNF-001 a RNF-009, SEG-001 a SEG-020 | AT-04, AT-06, AT-11, AT-12 |
| OB-07 Evolución editorial | RF-029 a RF-031, MED-009, ARQ-004 | AT-10 |

<!-- Inicio de contenido procedente de la página 17 del PDF original -->

## 22. Registro de cuestiones por confirmar antes de aprobación

<!-- Tabla reconstruida de la(s) página(s) 17, 18 del PDF. -->
| ID | Cuestión y discrepancia detectada | Decisión o evidencia requerida | Impacto |
| --- | --- | --- | --- |
| PD-01 | Los briefs hablan de más de 40 años; el aporte nuevo afirma operación desde 1975 y casi 50 años de experiencia de una persona. | Confirmar fecha de inicio documentada y experiencia de la persona que efectivamente atiende. | Historia, confianza, SEO y publicidad. |
| PD-02 | Una descripción nueva afirma oferta exclusivamente 100 % granito y otra menciona granito y otros materiales. | Catálogo vigente de materiales y servicios realmente ofrecidos. | Servicios, fichas, mensajes y SEO. |
| PD-03 | Se enumeran grabado láser, sandblasting, retratos a mano, aguafuerte y grabado en madera. | Confirmar qué técnicas y soportes opera el taller; aclarar terminología de aguafuerte frente a grabado artesanal. | Páginas comerciales y exactitud técnica. |
| PD-04 | El negocio se describe como más económico que competidores y cementerios. | Evidencia comparativa vigente o lenguaje alternativo aprobado. | Publicidad responsable y riesgos reputacionales. |
| PD-05 | La cobertura histórica incluye cinco condados y Long Island; material nuevo incluye Nueva Jersey y menciona NY/NJ. | Matriz de zonas, cementerios y servicios realmente atendidos. | Local SEO, licencias y expectativas. |
| PD-06 | Capacidad de entrega de 24 a 48 horas en ciertos casos. | Productos elegibles, condiciones, días, punto de inicio y significado de entrega o instalación. | Promesa comercial y aceptación. |
| PD-07 | Logo definitivo y fotografías profesionales existen, pero no se han revisado sus archivos originales. | Vector final, manual, licencias, inventario, autorizaciones y criterios de uso. | Diseño y medios. |
| PD-08 | Hibu administra GBP y el contrato sigue hasta marzo de 2027. | Permisos exactos, contrato, propiedad primaria, soporte de redirección y plan posterior al contrato. | Migración y continuidad SEO local. |
| PD-09 | El sitio actual produce buenos leads, pero se desconoce por qué. | Datos por fuente, llamada, formulario, GBP, campañas y consultas de búsqueda. | Arquitectura y criterios de éxito. |
| PD-10 | El hosting compartido de hosting.com fue propuesto y Node.js aparece en borradores previos. | Plan real, runtime soportado, límites, SSL, correo, respaldos, certificados y posibilidad de staging. | Arquitectura y seguridad. |
| PD-11 | El número de teléfono y los correos figuran en documentos previos. | Confirmación operativa, propietarios de cuentas y reglas de enrutamiento. | Captación y privacidad. |
| PD-12 | No está cerrada la familia tipográfica sans ni el formato definitivo de todos los componentes. | Manual final de marca, diseños aprobados y evaluación WCAG. | UI y accesibilidad. |
| PD-13 | El contenido sobre reglas y permisos puede variar por cementerio y jurisdicción. | Responsable experto de revisión, lista de casos y fecha de actualización. | Riesgo comercial y precisión. |
| PD-14 | No hay definición de almacenamiento ni plazo de conservación de mensajes y métricas. | Revisión de privacidad, contrato con correo/analítica y política aplicable. | Seguridad, política de privacidad y logs. |
| PD-15 | No se ha confirmado si existen videos autorizados ni qué contenido contienen. | Inventario, derechos, subtítulos, necesidad real y presupuesto de distribución. | Alcance multimedia. |
| PD-16 | No hay presupuesto SEM aprobado ni cuentas Ads confirmadas. | Autorización comercial y responsables, si se activa en fase posterior. | Publicidad pagada. |
| PD-17 | El SRS 2.0 recibido previamente estaba truncado después del inicio de RNF-04. | Compartir la parte restante si existe y validar cualquier diferencia con la versión oficial. | Trazabilidad y control de cambios. |
| PD-18 | No se han aprobado niveles concretos de disponibilidad, recuperación y retención de respaldos. | Evaluación del SLA del hosting y criticidad del negocio. | Operación, soporte y continuidad. |

<!-- Inicio de contenido procedente de la página 18 del PDF original -->
Estas cuestiones no deben resolverse mediante suposiciones de diseño o redacción comercial. La aprobación del borrador puede ser parcial, pero los puntos que afectan declaraciones públicas, seguridad y migración deberán cerrarse antes de la publicación.

## 23. Plan de validación y gobierno de cambios

La revisión del SRS se realizará por ámbitos: negocio y operaciones; marca y contenido; SEO, GBP y migración; infraestructura y seguridad; experiencia bilingüe y accesibilidad; contacto y medición. Cada observación deberá registrar el ID de requisito afectado, decisión, persona que aprueba y versión en la que se aplica. Una función nueva no se entenderá aprobada por estar en una investigación competitiva o en un prototipo no firmado.

Después de aprobar los hechos comerciales y la arquitectura, la especificación podrá evolucionar a versión 1.1 con ajustes editoriales y técnicos o a una nueva línea base cuando exista cambio material de alcance. Se recomienda mantener el estado de cada requisito, evidencia de prueba y relación con entregables en una matriz de seguimiento operativa.

## 24. Fuentes y estándares consultados

### 24.1. Documentos internos de contexto

Contexto_Maestro_All_Faiths_Monuments_Consolidado_v2_0.md, 23 de octubre de 2026. Principal fuente interna de acuerdos, brief, infraestructura y conclusiones de investigación.

Brief_Identidad_Visual_All_Faiths_Monuments.pdf, identidad, negocio, público, tono, paleta, restricciones visuales y dirección de diseño.

Convocatoria_Logo_All_Faiths_Monuments.pdf, antecedentes de logo y criterios de reproducción.

Informe_Competitivo_Web_SEO_SEM_Monumentos_EEUU_2026.pdf, investigación exploratoria sobre Sprung, Arcadia, Shastone, West Memorials y Martus Stone.

Informe_Integrado_Competencia_y_SRS_All_Faiths_2026_v2_1.pdf, análisis complementario y antecedentes técnicos.

SRS preliminares 1.0 y 2.0 compartidos en conversación, con alcance parcial de la versión 2.0.

Actualización de negocio comunicada el 27 de octubre de 2026 sobre origen empresarial, servicio familiar, materiales, precios, técnicas de grabado, trámites y cobertura. Sus afirmaciones en conflicto con documentos anteriores figuran en el registro de pendientes.

### 24.2. Referencias técnicas públicas

ISO/IEC/IEEE 29148:2018. Ingeniería de requisitos. https://www.iso.org/standard/72089.html

OWASP ASVS, versión estable 5.0.0. https://asvs.owasp.org/

OWASP, guía de carga segura de archivos. https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

W3C, WCAG 2.2. https://www.w3.org/TR/WCAG22/

Google Search Central, Core Web Vitals. https://developers.google.com/search/docs/appearance/core-web-vitals

Google Search Central, sitios multilingües. https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites

<!-- Inicio de contenido procedente de la página 19 del PDF original -->
Google Search Central, migraciones de sitio. https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

Google Search Central, datos estructurados LocalBusiness. https://developers.google.com/search/docs/appearance/structured-data/local-business

Google Search Central, funciones y optimización para búsqueda generativa. https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Google Search Central, buenas prácticas de video. https://developers.google.com/search/docs/appearance/video

Google Business Profile, representación adecuada del negocio. https://support.google.com/business/answer/3038177

Las fuentes públicas orientan el diseño técnico; no constituyen certificación ni prueba de que el nuevo sitio ya cumple. La investigación de competidores es de carácter exploratorio y no aporta acceso a sus analíticas, gasto publicitario, posicionamiento completo ni tasas de conversión.

## 25. Constancia de aprobación

Estado vigente: pendiente de revisión y aprobación. Propietarios o representantes de la empresa: por completar. Responsable de dirección de proyecto: por completar. Responsable técnico: por completar. Observaciones y cambios de alcance: se registrarán en el control de versiones. Fecha efectiva de línea base: por establecer después de resolver puntos críticos.

La versión 1.0 constituye un borrador suficientemente estructurado para validación y estimación preliminar. No autoriza reemplazar el sitio actual, modificar Google Business Profile ni iniciar campañas de pago sin las aprobaciones correspondientes.

---

## Anexo editorial — Inventario de activos pendientes (actualización del usuario, no texto del SRS original)

Este anexo **no modifica** los estados AC/PR/VA/FU ni las prioridades del SRS. Registra la disponibilidad de insumos para el diseño actual y evita que una documentación textual se interprete como evidencia de recursos ya recibidos.

| Insumo | Disponibilidad para este trabajo | Consecuencia práctica |
|---|---|---|
| Logo principal y variantes oficiales | El usuario está incorporando las imágenes oficiales por separado. | Integrar los archivos originales y aplicar el manual; no redibujar. |
| Fotografías profesionales reales de monumentos | No entregadas todavía al proyecto. | Mantener marcadores de posición en wireframes; no publicar material sintético como trabajo real. |
| Fotografías del taller, establecimiento y personal | No entregadas todavía al proyecto. | Preparar estructura y descripciones de uso, sin simular instalaciones de la empresa. |
| Muestras de granito, nombres, tonalidades y acabados | Todavía no entregados. | No poblar el catálogo de granitos con nombres, colores o disponibilidades inventados. |
| Matriz técnica de servicios y materiales | Sujeta a confirmación por operaciones conforme a PD-02 y PD-03. | No publicar técnicas, materiales o atributos específicos no aprobados. |
| Permisos y derechos de cada recurso multimedia | Por comprobar cuando lleguen los originales. | Catalogar titularidad, consentimiento, metadatos y uso permitido, en línea con MED-001 a MED-009. |

**Principio de publicación:** las páginas pueden planificarse y maquetarse sin los archivos definitivos; **no** se consideran completas para lanzamiento cuando el SRS exige fotografías autorizadas, muestras verificadas o aprobación editorial. En los entregables internos usar un marcador inequívoco como `[PENDIENTE: fotografía real autorizada]` o `[PENDIENTE: muestra de granito verificada]`, sin presentarlo como un contenido final.

**La historia empresarial:** el año de inicio formal comunicado para el proyecto es **1975**; el registro PD-01 del documento de origen continúa indicando que las afirmaciones publicables requieren respaldo y aprobación documental. No utilizar 1985, ni confundir años de operación de la empresa con años de experiencia personal de un propietario.
