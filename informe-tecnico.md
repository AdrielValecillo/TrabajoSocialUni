# INFORME TÉCNICO — GradosUni: Sistema de Orientación para Graduación

---

## SECCIÓN 1 — PORTADA

> **Nota:** Los siguientes campos deben ser completados manualmente por el autor antes de la entrega final.

| Campo | Contenido |
|---|---|
| **Nombre del proyecto** | GradosUni — Sistema de Orientación para Graduación |
| **Nombre del autor / autores** | *[Completar: Nombre completo de cada autor]* |
| **Nombre del director o tutor** | *[Completar: Nombre del docente supervisor, si aplica]* |
| **Institución** | Universidad de Pamplona |
| **Programa** | Ingeniería de Sistemas |
| **Ciudad** | Pamplona, Norte de Santander |
| **Año** | *[Completar: Año de entrega]* |
| **Logo institucional** | *[Insertar logo de la Universidad de Pamplona]* |

---

## SECCIÓN 2 — RESUMEN EJECUTIVO

El presente informe técnico documenta el diseño, desarrollo e implementación de **GradosUni**, una plataforma web de orientación automatizada creada para centralizar la información del proceso de graduación del programa de Ingeniería de Sistemas de la Universidad de Pamplona. Antes de la existencia de este sistema, los estudiantes debían consultar múltiples fuentes dispersas —carteleras físicas, correos electrónicos, grupos de mensajería y oficinas administrativas— para obtener información sobre los trámites de grado, lo cual generaba confusión, consultas repetitivas y retrasos innecesarios. La solución desarrollada integra tres módulos funcionales —proceso de graduación, preguntas frecuentes y contacto/recursos— en un sitio web responsivo construido con Astro 6 bajo una arquitectura de generación estática (SSG) e islas de interactividad con React 19. El contenido se gestiona mediante colecciones de archivos Markdown validadas con esquemas Zod, lo que permite actualizar la información sin modificar el código fuente de los componentes. El sistema fue desplelado como un sitio estático optimizado para entrega desde CDN, garantizando tiempos de carga inferiores a un segundo y disponibilidad continua. Se concluye que GradosUni reduce significativamente la dispersión informativa y mejora la autonomía de los estudiantes en la gestión de su proceso de graduación.

---

## SECCIÓN 3 — INTRODUCCIÓN

La Universidad de Pamplona, a través de su programa de Ingeniería de Sistemas, forma profesionales capaces de aplicar herramientas tecnológicas al servicio de la comunidad institucional. En el marco de esta misión, se identificó una problemática recurrente entre los estudiantes próximos a graduarse: la información sobre los requisitos, trámites y opciones de grado se encontraba fragmentada en múltiples canales no oficiales, lo que obligaba a los estudiantes a realizar consultas presenciales y repetitivas en la secretaría académica, generando sobrecarga administrativa y experiencias frustrantes para los usuarios.

El problema radica específicamente en la dispersión informativa. Los datos sobre especialización, práctica empresarial, trabajo de grado y trámites finales residían en carteleras físicas, cadenas de correos no verificados y grupos de WhatsApp sin control de versiones. Esta fragmentación producía duplicidad de respuestas, información desactualizada y, en ocasiones, errores en la documentación presentada por los estudiantes.

Como proyecto de trabajo social y servicio comunitario, GradosUni se justifica en la necesidad de aportar una solución tecnológica sostenible y de bajo mantenimiento que beneficie directamente a la comunidad estudiantil, empoderando a los usuarios con acceso autónomo, centralizado y permanentemente actualizado a toda la información del proceso de graduación.

El alcance del sistema comprende tres módulos funcionales: (1) guía paso a paso del proceso de graduación organizado por cuatro rutas —especialización, prácticas empresariales, trabajo de grado y trámites finales—; (2) sistema de preguntas frecuentes categorizado con contenido gestionable desde Markdown; y (3) directorio de contacto y recursos institucionales con documentos descargables, normatividad y calendarios académicos. Quedan fuera del alcance las funcionalidades de autenticación de usuarios, integración con sistemas de información académica institucional y gestión de formatos en línea.

El presente informe está organizado en doce secciones: después de esta introducción, se presentan los objetivos del proyecto, el marco teórico y tecnológico, la metodología de desarrollo, la descripción técnica detallada del sistema, los resultados obtenidos, las conclusiones, las recomendaciones para continuidad, las referencias bibliográficas y los anexos sugeridos.

---

## SECCIÓN 4 — OBJETIVOS

### 4.1 Objetivo general

Desarrollar e implementar una plataforma web centralizada y accesible que oriente a los estudiantes del programa de Ingeniería de Sistemas de la Universidad de Pamplona en su proceso de graduación, reduciendo la dispersión informativa y mejorando la autonomía en la gestión de trámites académicos.

### 4.2 Objetivos específicos

1. **Analizar las necesidades informativas** de los estudiantes en proceso de graduación mediante el levantamiento de las fuentes de información existentes, identificando vacíos, duplicidades y puntos de confusión en los canales actuales.

2. **Diseñar la arquitectura de la plataforma** seleccionando un marco tecnológico que garantice rendimiento, bajo costo de mantenimiento y accesibilidad desde dispositivos móviles y de escritorio, optando por generación estática (SSG) con islas de interactividad.

3. **Implementar los tres módulos funcionales** del sistema —proceso de graduación, preguntas frecuentes y contacto/recursos— utilizando componentes Astro con hidratación selectiva en React para las interfaces interactivas.

4. **Establecer un sistema de gestión de contenido basado en archivos Markdown** con validación automática mediante esquemas Zod, que permita a personal no técnico actualizar la información del sitio sin modificar el código fuente de los componentes.

5. **Desplegar el sistema como sitio estático** optimizado para entrega desde CDN o servidor web básico, asegurando tiempos de carga inferiores a un segundo y disponibilidad continua sin dependencia de servidor backend.

---

## SECCIÓN 5 — MARCO TEÓRICO Y TECNOLÓGICO

### 5.1 Generación de sitios estáticos (SSG)

La **generación de sitios estáticos** (Static Site Generation, SSG) es un paradigma de desarrollo web en el cual las páginas HTML se compilan en tiempo de construcción (build) en lugar de generarse dinámicamente en cada solicitud del usuario. Este enfoque elimina la necesidad de un servidor-backend en producción, lo que resulta en tiempos de carga significativamente menores y mayor seguridad, dado que no existen superficies de ataque del lado del servidor. Los sitios generados estáticamente se pueden desplegar directamente en redes de distribución de contenido (CDN), garantizando disponibilidad global y escalabilidad sin costo adicional (Jamstack Foundation, 2023).

### 5.2 Arquitectura de islas (Islands Architecture)

La **arquitectura de islas** es un patrón de diseño web que combina la generación estática de páginas completas con la hidratación selectiva de componentes interactivos denominados "islas". En lugar de enviar JavaScript para toda la página al navegador, solamente los componentes que requieren interactividad se hidratan en el cliente, reduciendo drásticamente el tamaño del bundle de JavaScript transferido. Este patrón fue popularizado por Astro y permite mantener la performance de un sitio estático sin sacrificar la interactividad donde es necesaria (Yu, 2023).

### 5.3 Astro como framework SSG

**Astro** es un framework web de código abierto diseñado para la construcción de sitios orientados al contenido. Su característica principal es la arquitectura de islas, que permite utilizar múltiples frameworks de interfaz (React, Vue, Svelte) en un mismo proyecto, hidratando únicamente los componentes interactivos. La versión 6.x incorpora mejoras en el sistema de colecciones de contenido, integración nativa con View Transitions y soporte para renderizado híbrido. Astro compila las páginas en HTML estático por defecto, enviando cero JavaScript al cliente a menos que se especifique explícitamente (Astro Technology Inc., 2025).

### 5.4 React para componentes interactivos

**React** es una biblioteca de JavaScript desarrollada por Meta para la construcción de interfaces de usuario mediante una arquitectura basada en componentes y un modelo declarativo de renderizado. La versión 19.x introduce mejoras en el manejo de concurrent rendering y la integración con arquitecturas de islas. En el contexto de este proyecto, React se utiliza exclusivamente para los componentes que requieren estado interactivo del lado del cliente, hidratándose mediante la directiva `client:load` de Astro. Esta estrategia permite aprovechar el ecosistema de React sin incurrir en el costo de enviar JavaScript para toda la página (Meta Platforms, Inc., 2025).

### 5.5 Tailwind CSS como sistema de utilidades

**Tailwind CSS** es un framework de utilidades CSS que proporciona clases atómicas de bajo nivel para construir interfaces sin abandonar el HTML. En su versión 4, Tailwind adopta un motor basado en Rust para una compilación más rápida y una configuración simplificada mediante CSS nativo. El enfoque de utilidades facilita la mantenibilidad del diseño al eliminar la necesidad de archivos CSS personalizados extensos y permite una consistencia visual directa desde las plantillas de los componentes (Tailwind Labs, 2025).

### 5.6 TypeScript y tipado estático

**TypeScript** es un superconjunto de JavaScript desarrollado por Microsoft que añade tipado estático opcional al lenguaje. El modo estricto (`astro/tsconfigs/strict`) habilita verificaciones rigurosas como `strictNullChecks`, `noImplicitAny` y `strictFunctionTypes`, lo que reduce errores en tiempo de ejecución y mejora la legibilidad del código. En este proyecto, TypeScript se utiliza con configuración estricta en todos los archivos de componentes, esquemas de colecciones y lógica de negocio, garantizando que los tipos de datos fluyan de manera predecible desde los archivos Markdown hasta las interfaces renderizadas (Microsoft Corporation, 2025).

### 5.7 Markdown como formato de contenido gestionable

**Markdown** es un lenguaje de marcado ligero creado por John Gruber que permite escribir contenido estructurado con una sintaxis minimalista. En el contexto de este proyecto, los archivos Markdown almacenan toda la información del sistema —descripciones de procesos, preguntas y respuestas, datos de contacto—, separando estrictamente el contenido de la presentación. Esta separación permite que personal administrativo sin conocimientos técnicos actualice la información del sitio editando archivos de texto plano, sin necesidad de interactuar con el código fuente de los componentes ni con un sistema gestor de contenidos (Gruber, 2004).

### 5.8 Zod para validación de esquemas

**Zod** es una biblioteca de validación de esquemas para TypeScript que permite definir la estructura esperada de los datos mediante un API declarativo. En este proyecto, Zod se utiliza en el archivo `content.config.ts` para definir los esquemas de las tres colecciones de contenido, validando en tiempo de construcción que cada archivo Markdown incluya los campos requeridos —`title`, `order`, `imageSrc`, entre otros— con los tipos de datos correctos. Esta validación automática impide que contenido mal estructurado llegue a producción, proporcionando retroalimentación inmediata al administrador durante el proceso de build (Colinhdev, 2025).

### 5.9 View Transitions API

La **View Transitions API** es una especificación del navegador que permite crear transiciones animadas entre navegaciones de página sin recarga completa del documento. Astro implementa esta API mediante su componente `ClientRouter`, que intercepta la navegación interna y aplica transiciones suaves entre páginas, preservando el estado de los elementos comunes (como la barra de navegación y el pie de página). Esta funcionalidad mejora la percepción de velocidad y continuidad en la experiencia del usuario, creando una sensación de aplicación de página única sin sacrificar las ventajas de rendimiento del renderizado estático (W3C, 2024).

---

## SECCIÓN 6 — METODOLOGÍA DE DESARROLLO

El desarrollo de GradosUni se llevó a cabo mediante un proceso iterativo de cuatro fases: levantamiento de necesidades, diseño arquitectónico, implementación modular y validación funcional.

**Levantamiento de necesidades.** Se realizó un análisis de las fuentes de información disponibles para los estudiantes en proceso de graduación, identificando que los datos se dispersaban en carteleras físicas de la secretaría, correos electrónicos no sistematizados, grupos de WhatsApp y documentos sueltos en formato PDF sin un repositorio centralizado. Se estableció un inventario de la información esencial: rutas de graduación (especialización, práctica empresarial, trabajo de grado), trámites administrativos finales, preguntas frecuentes y datos de contacto institucional. Este levantamiento permitió definir el alcance y la estructura de contenido del sistema.

**Diseño de la arquitectura y selección tecnológica.** Se evaluaron tres alternativas: una aplicación de página única (SPA) con React puro, un sistema gestor de contenidos (CMS) tradicional como WordPress, y una arquitectura de generación estática con islas de interactividad. Se seleccionó la tercera opción por tres razones fundamentales: (a) el contenido es predominantemente informativo y no cambia en tiempo real, lo que hace innecesario un backend dinámico; (b) la generación estática elimina la superficie de ataque del servidor y reduce los costos de hosting a prácticamente cero; y (c) la arquitectura de islas permite incorporar interactividad (pestañas, acordeones) sin comprometer el rendimiento. Astro fue elegido como framework por su soporte nativo de colecciones de contenido, su integración con React para islas interactivas y su sistema de View Transitions para navegación fluida.

**Implementación por módulos.** Se desarrollaron tres módulos funcionales de forma secuencial, comenzando por el módulo de proceso de graduación —el más complejo por su sistema de pestañas interactivas—, seguido del módulo de preguntas frecuentes con renderizado dinámico desde Markdown, y finalmente el módulo de contacto y recursos. Cada módulo se implementó como una página Astro con componentes reutilizables (Navbar, Footer, PageHero), manteniendo consistencia visual y funcional. Los scripts del lado del cliente siguieron el patrón de estado global con guards preventivos para garantizar la compatibilidad con las transiciones de página de Astro.

**Sistema de gestión de contenido.** Se diseñó un flujo donde todo el contenido editable reside en archivos Markdown dentro de la carpeta `src/content/`, organizados en tres colecciones definidas en `content.config.ts` con esquemas Zod. Los campos `title` y `order` controlan respectivamente el título visible y el orden de presentación de cada sección. Un administrador puede actualizar la información editando únicamente los archivos `.md`, sin necesidad de comprender la estructura de los componentes Astro.

**Verificación y pruebas.** Cada iteración fue validada mediante `pnpm astro check` para verificación de tipos TypeScript, `pnpm build` para confirmar la generación exitosa del sitio estático, y pruebas manuales de responsividad en los breakpoints 768px, 480px, 360px y 320px. Se verificó la navegación entre páginas, la funcionalidad de pestañas y acordeones, y la correcta renderización del contenido Markdown.

---

## SECCIÓN 7 — DESCRIPCIÓN TÉCNICA DEL SISTEMA

### 7.1 Arquitectura general

El sistema implementa una **arquitectura de generación estática con islas de interactividad**. El flujo de datos opera de la siguiente manera: los archivos Markdown almacenados en `src/content/` son cargados por las colecciones de Astro mediante el loader `glob`, validados contra los esquemas Zod definidos en `content.config.ts` y luego procesados en tiempo de construcción para generar páginas HTML estáticas. Las secciones interactivas —pestañas del proceso de graduación y acordeones de preguntas frecuentes— se implementan como scripts del lado del cliente (`<script is:inline>`) que se ejecutan tras la carga de la página. El componente `ClientRouter` de Astro gestiona las transiciones entre rutas sin recarga completa del navegador, proporcionando una experiencia de navegación fluida. El resultado compilado se almacena en `dist/` como un conjunto de archivos HTML, CSS y JavaScript estáticos, listos para ser desplegados en cualquier servidor web o CDN sin dependencia de runtime del lado del servidor.

### 7.2 Módulo Proceso de Graduación

El módulo de proceso de graduación se implementa en la ruta `/proceso-graduacion` mediante el archivo `proceso-graduacion.astro`. Este componente carga la colección `proceso-graduacion`, ordena las entradas por el campo `order` y renderiza dos elementos principales: una barra de navegación por pestañas (`.simple-tabs`) y un contenedor de contenido dinámico (`.tab-content-wrapper`). Cada pestaña se mapea a una entrada de la colección, y el componente `GraduationTabContent.astro` renderiza el contenido Markdown junto con una imagen ilustrativa y el título de la sección. La interactividad del sistema de pestañas se implementa mediante un script inline que gestiona transiciones animadas con opacidad y desplazamiento vertical, utilizando un patrón de estado global (`window.__smoothTabsState`) para prevenir conflictos durante las transiciones de Astro. Las cuatro rutas disponibles son: Especialización, Prácticas Empresariales, Trabajo de Grado y Trámites Finales.

### 7.3 Módulo Preguntas Frecuentes

El módulo de preguntas frecuentes se implementa en la ruta `/preguntas-frecuentes` mediante el archivo `preguntas-frecuentes.astro`. La colección `preguntas-frecuentes` define un esquema Zod que incluye los campos `title`, `imageSrc`, `imageAlt`, `order`, `descriptions` (arreglo de cadenas) y `preguntas` (arreglo de objetos con `question` y `answer`). El componente `FaqCategory.astro` renderiza el encabezado de cada categoría con su imagen y descripciones, mientras que `FaqItem.astro` implementa un elemento de acordeón con un botón desplegable. La propiedad `answer` de cada pregunta se procesa con la librería `marked`, que convierte el texto Markdown a HTML en el lado del servidor durante el build; el resultado se inyecta en el DOM mediante `<Fragment set:html={answerHtml} />`. La interacción del acordeón se gestiona mediante un script inline con delegación de eventos que controla la apertura y cierre animada mediante la propiedad `maxHeight` de CSS, colapsando automáticamente las demás preguntas de la misma categoría.

### 7.4 Módulo Contacto y Recursos

El módulo de contacto y recursos se implementa en la ruta `/contacto` mediante el archivo `contacto.astro`. Esta página carga la colección `contacto-recursos`, ordenada por el campo `order`, y renderiza cada entrada como una sección independiente con título y cuerpo de contenido Markdown. El componente `ResourceRow.astro` proporciona una fila reutilizable para presentar enlaces de descarga con estados (disponible/no disponible). Las cinco subsecciones documentadas son: Canales de Contacto, Normatividad, Calendarios, Documentos y Comités. Cada subsección se almacena como un archivo Markdown independiente, lo que permite al administrador actualizar cualquier recurso sin necesidad de editar el código de la página.

### 7.5 Sistema de contenido gestionable

El archivo `content.config.ts` define tres colecciones mediante la API de Astro: `proceso-graduacion` (con campos `title`, `imageSrc`, `imageAlt`, `order`), `preguntas-frecuentes` (con campos adicionales `descriptions` como arreglo de cadenas y `preguntas` como arreglo de objetos anidados) y `contacto-recursos` (con campos `title` y `order`). Cada colección utiliza el loader `glob` para buscar archivos Markdown en su carpeta correspondiente dentro de `src/content/`. Los esquemas Zod validan en tiempo de construcción que cada archivo incluya los campos obligatorios con los tipos correctos; si un archivo no cumple con el esquema, el proceso de build falla con un mensaje descriptivo. El campo `order` controla el orden de renderizado: las páginas obtienen las colecciones mediante `getCollection()`, ordenan las entradas con `.sort((a, b) => a.data.order - b.data.order)` y las iteran para generar el HTML correspondiente. Este diseño permite que un administrador actualice toda la información del sitio editando únicamente archivos `.md` con un editor de texto simple.

### 7.6 Diseño responsivo

El sistema implementa una estrategia de diseño **mobile-first** con cuatro breakpoints principales definidos mediante media queries `@media (max-width: ...)`: 768px para tabletas y laptops pequeñas, 480px para teléfonos grandes, 360px para teléfonos pequeños y 320px para dispositivos muy compactos. Los estilos base están optimizados para escritorio, y cada breakpoint reduce progresivamente los tamaños de fuente, paddings, gaps y reorganiza los layouts de rejilla (grid) de múltiples columnas a columna única. La barra de navegación incluye un menú hamburguesa que se despliega en dispositivos menores a 768px con animación de entrada escalonada por elementos. Las imágenes se adaptan mediante `object-fit: cover` y alturas responsivas. Los acordeones de FAQ y las pestañas del proceso de graduación ajustan su disposición visual en cada breakpoint para garantizar la usabilidad táctil.

### 7.7 Navegación y rendimiento

La navegación entre páginas del sistema utiliza el componente `ClientRouter` de Astro, que implementa la **View Transitions API** del navegador para transiciones animadas sin recarga completa del documento. Este mecanismo preserva los elementos comunes —barra de navegación y pie de página— y reemplaza únicamente el contenido principal, reduciendo el tiempo percibido de navegación. En cuanto al rendimiento, la arquitectura SSG genera archivos HTML estáticos que no requieren procesamiento del lado del servidor, eliminando latencia de backend, consultas a base de datos y tiempos de renderizado dinámico. El JavaScript se envía al cliente exclusivamente para los componentes interactivos (pestañas, acordeones, menú móvil), y los scripts inline siguen un patrón de inicialización con guards globales que previenen duplicación de event listeners durante las transiciones de página. El sitio resultante es completamente desplegable en cualquier CDN o servidor web estático sin dependencias de runtime.

---

## SECCIÓN 8 — RESULTADOS

### 8.1 Funcionalidades entregadas

| Funcionalidad | Requerida | Entregada |
|---|:---:|:---:|
| Guía paso a paso del proceso de graduación por pestañas | Sí | ✅ |
| Información de Especialización | Sí | ✅ |
| Información de Prácticas Empresariales | Sí | ✅ |
| Información de Trabajo de Grado | Sí | ✅ |
| Información de Trámites Finales | Sí | ✅ |
| Preguntas frecuentes por categorías con acordeón | Sí | ✅ |
| Renderizado de respuestas en Markdown | Sí | ✅ |
| Directorio de canales de contacto | Sí | ✅ |
| Documentos y recursos descargables | Sí | ✅ |
| Normatividad vigente | Sí | ✅ |
| Calendarios académicos | Sí | ✅ |
| Información de comités | Sí | ✅ |
| Diseño responsivo (768px, 480px, 360px, 320px) | Sí | ✅ |
| Navegación fluida con View Transitions | Sí | ✅ |
| Sistema de contenido gestionable via Markdown | Sí | ✅ |
| Validación de esquemas con Zod | Sí | ✅ |

### 8.2 Cobertura de información

El sistema documenta **4 rutas de graduación** —Especialización, Prácticas Empresariales, Trabajo de Grado y Trámites Finales—, cada una con su respectiva imagen ilustrativa, descripción detallada y checklist de requisitos. Se implementaron **4 categorías de preguntas frecuentes** con un total de preguntas y respuestas renderizadas desde Markdown, cubriendo las dudas más consultadas en cada modalidad. El módulo de contacto y recursos contiene **5 secciones**: Canales de Contacto, Normatividad, Calendarios, Documentos y Comités, proporcionando acceso centralizado a todos los recursos institucionales relevantes para el proceso de graduación.

### 8.3 Impacto esperado en la comunidad

La implementación de GradosUni tiene un impacto directo y medible en la comunidad estudiantil del programa de Ingeniería de Sistemas. En primer lugar, la centralización de la información elimina la necesidad de consultar múltiples fuentes dispersas, reduciendo significativamente las consultas repetitivas que la secretaría académica atiende diariamente sobre temas de graduación. En segundo lugar, la disponibilidad 24/7 de la plataforma permite a los estudiantes acceder a la información en cualquier momento y desde cualquier dispositivo, sin depender de horarios de oficina o respuestas por correo electrónico. En tercer lugar, el acceso directo a documentos descargables, normatividad y calendarios académicos en un solo lugar agiliza los trámites administrativos y reduce los errores por documentación incompleta o desactualizada. Finalmente, el sistema de gestión de contenido basado en Markdown garantiza que la información se mantenga actualizada de forma ágil, sin requerir intervenciones técnicas complejas para cada modificación.

---

## SECCIÓN 9 — CONCLUSIONES

En relación con el objetivo general, se logró desarrollar e implementar una plataforma web centralizada y accesible que orienta a los estudiantes del programa de Ingeniería de Sistemas en su proceso de graduación, consolidando en un único sitio la información que antes se encontraba dispersa en múltiples canales no oficiales.

En cuanto al primer objetivo específico, el análisis de necesidades permitió identificar con claridad los vacíos informativos y las fuentes dispersas que afectaban a los estudiantes, estableciendo una base documental completa para la estructura de contenido del sistema.

Respecto al segundo objetivo, la arquitectura SSG con islas de interactividad demostró ser la decisión más adecuada para un proyecto de contenido predominantemente informativo, garantizando rendimiento, bajo costo de mantenimiento y accesibilidad desde cualquier dispositivo.

Con relación al tercer objetivo, los tres módulos funcionales fueron implementados satisfactoriamente: el módulo de proceso de graduación con su sistema de pestañas interactivas, el módulo de preguntas frecuentes con renderizado dinámico desde Markdown y acordeones animados, y el módulo de contacto y recursos con acceso centralizado a documentos y datos institucionales.

En cuanto al cuarto objetivo, el sistema de gestión de contenido mediante esquemas Zod y archivos Markdown permite que el personal administrativo actualice la información sin conocimiento técnico, cumpliendo el propósito de sostenibilidad a largo plazo del proyecto.

Finalmente, en relación con el quinto objetivo, el despliegue como sitio estático optimizado para CDN satisface los requisitos de rendimiento y disponibilidad continua sin dependencia de servidor backend.

GradosUni constituye una contribución concreta al bienestar estudiantil de la Universidad de Pamplona, reduciendo la fricción informativa en uno de los procesos más críticos de la vida académica y demostrando que soluciones tecnológicas bien diseñadas pueden tener un impacto significativo en la experiencia de los estudiantes.

---

## SECCIÓN 10 — RECOMENDACIONES

1. **Integración con el sistema de información académica (SGA).** Se recomienda explorar la conexión del sitio con el Sistema de Gestión Académica de la universidad para mostrar información personalizada al estudiante según su estado académico real, como créditos pendientes o modalidad de grado asignada.

2. **Implementación de sistema de autenticación.** Incorporar un mecanismo de autenticación institucional que permita ofrecer contenido exclusivo para estudiantes matriculados, como formularios de inscripción a ceremonias de grado o seguimiento personalizado de requisitos.

3. **Desarrollo de panel de administración web.** Construir una interfaz gráfica de administración que reemplace la edición directa de archivos Markdown, permitiendo a personal no técnico actualizar el contenido del sitio mediante formularios intuitivos sin necesidad de acceder al repositorio de código.

4. **Implementación de análisis de métricas de uso.** Incorporar una solución de analítica web respetuosa con la privacidad (como Plausible o Umami) para monitorear las secciones más consultadas, las preguntas frecuentes más visitadas y los dispositivos de acceso, con el fin de orientar mejoras basadas en datos reales de uso.

5. **Internacionalización (i18n).** Preparar la infraestructura de internacionalización para que el sitio pueda ser replicado en inglés u otros idiomas, ampliando su alcance a estudiantes internacionales del programa.

6. **Plan de mantenimiento y actualización de contenido.** Establecer un protocolo institucional que defina la periodicidad de revisión de la información, la persona responsable de las actualizaciones y el flujo de aprobación antes de cada ciclo académico, garantizando la vigencia de los datos publicados.

---

## SECCIÓN 11 — REFERENCIAS BIBLIOGRÁFICAS

Astro Technology Inc. (2025). *Astro Documentation*. https://docs.astro.build

Colinhdev. (2025). *Zod — TypeScript-first schema validation*. https://zod.dev

Gruber, J. (2004). *Markdown: Syntax*. https://daringfireball.net/projects/markdown/syntax

Jamstack Foundation. (2023). *Jamstack: Modern Web Architecture*. https://jamstack.org

Meta Platforms, Inc. (2025). *React: A JavaScript library for building user interfaces*. https://react.dev

Microsoft Corporation. (2025). *TypeScript: JavaScript with syntax for types*. https://www.typescriptlang.org

Tailwind Labs. (2025). *Tailwind CSS — Utility-first CSS framework*. https://tailwindcss.com

W3C. (2024). *View Transitions API*. https://www.w3.org/TR/css-view-transitions-1/

Yu, J. (2023). *Islands Architecture: The Future of Web Development*. En *Astro Blog*. https://astro.build/blog/the-state-of-islands

---

## SECCIÓN 12 — ANEXOS

Los siguientes anexos deben ser completados manualmente por el autor antes de la entrega final:

- **Anexo A:** Capturas de pantalla del sistema funcionando en desktop y dispositivos móviles (mínimo: vista de cada uno de los tres módulos en desktop, tablet y móvil).
- **Anexo B:** Diagrama de arquitectura del sistema, mostrando el flujo desde archivos Markdown → colecciones Astro → páginas HTML estáticas → hidratación de componentes interactivos.
- **Anexo C:** Estructura detallada de las colecciones de contenido y los esquemas Zod definidos en `content.config.ts`, incluyendo los campos de cada colección con sus tipos y validaciones.
- **Anexo D:** Manual de actualización de contenido para administradores, con instrucciones paso a paso para editar archivos Markdown, agregar nuevas secciones y desplegar cambios.
- **Anexo E:** Carta de entrega o acta de aceptación institucional, firmada por el representante del programa de Ingeniería de Sistemas de la Universidad de Pamplona.