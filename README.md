# Portfolio — Mateo Andrés Avila

Portfolio personal hecho con **React + Vite** (JavaScript), **React Router**, **Tailwind CSS v4** y un blog en **Markdown**. No tiene backend ni base de datos: es un sitio estático listo para Vercel.

## Cómo correrlo

Necesitás Node.js 20 o superior.

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # genera la versión final en la carpeta dist/
npm run preview  # sirve dist/ para probar el build
```

## Cómo desplegar en Vercel

1. Subí el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el repositorio.
3. Vercel detecta Vite solo. Si pregunta: build command `npm run build`, output directory `dist`.
4. Deploy. Cada `git push` a la rama principal vuelve a publicar el sitio.

El archivo `vercel.json` redirige todas las rutas a `index.html`, así `/blog/algun-articulo` funciona aunque recargues la página.

Cuando tengas la URL final, reemplazá `https://mateo-avila.vercel.app` en: `src/data/site.js`, `index.html`, `public/robots.txt` y `public/sitemap.xml`.

## Dónde editar cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Nombre, email, links de GitHub/LinkedIn, URL del sitio | `src/data/site.js` |
| Proyectos (textos, tags, links, capturas) | `src/data/projects.js` |
| Servicios y proceso de trabajo | `src/data/services.js` |
| Bio, formación, idiomas y stack | `src/data/about.js` |
| Colores y tipografías | variables al inicio de `src/index.css` |
| Título y descripción para Google de la home | `src/pages/HomePage.jsx` e `index.html` |
| Imagen al compartir el link | `public/og-image.png` (1200×630) |

### Agregar capturas de proyectos

Guardá la imagen en `public/projects/` (por ejemplo `padel-saas.webp`) y en `src/data/projects.js` poné `image: '/projects/padel-saas.webp'`. Más detalles en `public/projects/LEEME.md`.

### Escribir un artículo nuevo

1. Creá un archivo en `src/content/blog/`, por ejemplo `mi-articulo.md`. El nombre del archivo es la URL: `/blog/mi-articulo`.
2. Empezalo con este bloque:

   ```md
   ---
   title: Título del artículo
   date: 2026-12-01
   category: Backend
   summary: Una o dos líneas que resumen el artículo.
   ---

   Acá empieza el texto en Markdown...
   ```

3. Agregá la URL nueva en `public/sitemap.xml`.

Los artículos se ordenan solos por fecha (el más nuevo primero) y los 3 últimos aparecen en la home.

## Estructura

```
public/              archivos que se sirven tal cual (favicon, robots, sitemap, imágenes)
src/
  components/        piezas reutilizables (Header, Footer, ProjectCard, Seo...)
  sections/          cada sección de la home (Hero, Projects, Services...)
  pages/             páginas de cada ruta (/, /blog, /blog/:slug, 404)
  data/              contenido editable (proyectos, servicios, sobre mí, datos del sitio)
  content/blog/      artículos en Markdown
  lib/posts.js       lee y ordena los artículos
  index.css          colores, tipografías y estilos globales
```

## Detalles técnicos

- Modo claro/oscuro automático según el sistema (`prefers-color-scheme`).
- Las animaciones se desactivan si el sistema pide menos movimiento (`prefers-reduced-motion`).
- Las tipografías (Bricolage Grotesque, Instrument Sans y JetBrains Mono) se sirven desde el propio sitio con Fontsource.
- El componente `Seo` actualiza título, descripción, Open Graph y URL canónica en cada página.
