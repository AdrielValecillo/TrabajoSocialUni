# 🎓 GradosUni — Sistema de Orientación para Graduación

Plataforma web de orientación automatizada para el proceso de graduación del programa de **Ingeniería de Sistemas** de la **Universidad de Pamplona**. Centraliza requisitos, trámites, preguntas frecuentes y recursos de contacto en un solo lugar, con información oficial y actualizada.

---

## 📑 Tabla de contenidos

- [Características principales](#-características-principales)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características principales

- 📋 **Proceso de graduación** — Guía paso a paso organizada por pestañas (especialización, prácticas empresariales, trabajo de grado, trámites finales).
- ❓ **Preguntas frecuentes** — Secciones por categoría con preguntas y respuestas desplegables, contenido renderizado desde Markdown.
- 📞 **Contacto y recursos** — Directorio de canales de contacto, documentos descargables, normatividad y calendarios.
- 📱 **Diseño responsivo** — Adaptado para desktop, tablet y móvil (breakpoints en 768px, 480px, 360px y 320px).
- 🔄 **Transiciones de página** — Navegación fluida con View Transitions de Astro.
- 📝 **Contenido gestionable** — Toda la información se almacena en colecciones de Markdown con esquemas Zod, sin tocar el código de componentes.

---

## 📋 Requisitos previos

| Requisito | Versión mínima |
|---|---|
| [Node.js](https://nodejs.org/) | 18.x |
| [pnpm](https://pnpm.io/) | 8.x |

> Se requiere **pnpm** como gestor de paquetes. El proyecto incluye `pnpm-lock.yaml`.

---

## 🛠 Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd gradosUni
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`.

---

## 🚀 Uso

### Comandos disponibles

| Comando | Acción |
|---|---|
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Build de producción en `./dist/` |
| `pnpm preview` | Previsualizar build de producción localmente |
| `pnpm astro check` | Verificación de tipos y diagnóstico |
| `pnpm astro` | Acceso directo al CLI de Astro |

### Modificar contenido

El contenido se gestiona desde archivos Markdown en `src/content/`:

```
src/content/
├── proceso-graduacion/    # Pestañas del proceso de graduación
│   ├── especializacion/index.md
│   ├── practicas-empresariales/index.md
│   ├── trabajo-grado/index.md
│   └── tramites-finales/index.md
├── preguntas-frecuentes/  # Categorías de FAQ
│   ├── especializacion.md
│   ├── practicas-empresariales.md
│   ├── trabajo-grado.md
│   └── tramites-finales.md
└── contacto-recursos/     # Secciones de contacto y recursos
    ├── canales-contacto.md
    ├── normatividad.md
    ├── calendarios.md
    ├── documentos.md
    └── comites.md
```

Cada archivo Markdown usa frontmatter con campos `title` y `order` (y otros según la colección). Ejemplo:

```yaml
---
title: Trámites Finales
imageSrc: /proceso/3.png
imageAlt: Trámites de graduación
order: 4
---
```

Los elementos se renderizan ordenados por `order`. Para añadir una nueva sección, crea un archivo `.md` con el frontmatter requerido y un `order` apropiado.

---

## 📁 Estructura del proyecto

```
gradosUni/
├── public/                     # Assets estáticos (imágenes, favicons, archivos descargables)
│   ├── proceso/                # Imágenes del proceso de graduación
│   ├── files/                  # Documentos descargables
│   ├── favicon.png
│   └── fondopagina.avif
├── src/
│   ├── assets/                 # Assets procesados por Astro
│   ├── components/             # Componentes reutilizables (.astro)
│   │   ├── FaqCategory.astro
│   │   ├── FaqItem.astro
│   │   ├── Footer.astro
│   │   ├── GraduationTabContent.astro
│   │   ├── Navbar.astro
│   │   ├── PageHero.astro
│   │   └── ResourceRow.astro
│   ├── content/                # Colecciones de contenido en Markdown
│   │   ├── contacto-recursos/
│   │   ├── preguntas-frecuentes/
│   │   └── proceso-graduacion/
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal (Navbar + Footer + ClientRouter)
│   ├── pages/                  # Rutas del sitio (.astro)
│   │   ├── index.astro
│   │   ├── proceso-graduacion.astro
│   │   ├── preguntas-frecuentes.astro
│   │   └── contacto.astro
│   ├── styles/
│   │   └── global.css           # Tailwind + fuentes + resets
│   └── content.config.ts       # Definición de colecciones y esquemas Zod
├── astro.config.mjs            # Configuración de Astro (React, Tailwind)
├── tsconfig.json               # TypeScript strict + JSX React
└── package.json
```

---

## 🧩 Tecnologías

| Tecnología | Rol |
|---|---|
| [Astro 6](https://astro.build) | Framework web principal — SSG con islas interactivas |
| [React 19](https://react.dev) | Componentes interactivos (hidratación con `client:load`) |
| [Tailwind CSS v4](https://tailwindcss.com) | Utilidades CSS |
| [TypeScript (strict)](https://www.typescriptlang.org/) | Tipado estático |
| [marked](https://marked.js.org) | Renderizado de Markdown a HTML en FAQ |
| [Zod](https://zod.dev) | Validación de esquemas para colecciones de contenido |

---

## 🤝 Contribución

1. Haz fork del repositorio.
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nombre-funcionalidad`.
3. Realiza tus cambios con commits descriptivos.
4. Asegúrate de que el build pase: `pnpm astro check && pnpm build`.
5. Abre un Pull Request describiendo los cambios y su motivación.

> Todo el contenido de la interfaz está en **español**. Mantén ese idioma en cambios de UI.

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados — Universidad de Pamplona.