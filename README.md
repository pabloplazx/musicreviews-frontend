# MusicReviews — Frontend

Aplicación web para descubrir música, reseñar álbumes y compartir opiniones con la comunidad. Desarrollada como Trabajo de Fin de Grado (TFG) del Ciclo Superior de Desarrollo de Aplicaciones Multiplataforma (DAM).

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | UI declarativa basada en componentes |
| [Vite](https://vitejs.dev/) | 6 | Bundler y servidor de desarrollo |
| [React Router](https://reactrouter.com/) | 7 | Navegación entre páginas |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios con design system propio |

---

## Estructura del proyecto

```
musicreviews-frontend/
├── public/                  # Recursos estáticos (favicon, iconos SVG)
├── src/
│   ├── assets/              # Imágenes y recursos importados en el código
│   ├── components/
│   │   ├── layout/          # Componentes que envuelven todas las páginas
│   │   │   ├── Navbar.jsx   # Barra de navegación superior (sticky)
│   │   │   └── Footer.jsx   # Pie de página con links y copyright
│   │   └── ui/              # Componentes reutilizables de interfaz
│   │       ├── SectionTitle.jsx       # Título de sección con línea verde
│   │       ├── PortadaPlaceholder.jsx # Placeholder ♪ para portadas sin imagen
│   │       ├── Estrellas.jsx          # Valoración 1-5 con soporte de medias estrellas
│   │       ├── ResenaCard.jsx         # Tarjeta de reseña (portada + info + cita)
│   │       ├── AlbumCard.jsx          # Tarjeta de álbum con badge de posición (rankings)
│   │       ├── CatalogoCard.jsx       # Tarjeta de álbum con badge de género opcional
│   │       ├── AlbumRow.jsx           # Fila compacta de álbum (búsqueda recientes)
│   │       ├── FormInput.jsx          # Input de formulario con label y estado de error
│   │       ├── GenreChip.jsx          # Chip de género/filtro activo e inactivo
│   │       ├── SearchBar.jsx          # Barra de búsqueda con icono SVG
│   │       ├── SelectOrden.jsx        # Selector desplegable estilizado
│   │       └── Paginacion.jsx         # Paginación con flechas y puntos suspensivos
│   ├── context/             # Contextos de React (autenticación, etc.) — pendiente
│   ├── hooks/               # Custom hooks reutilizables — pendiente
│   ├── pages/               # Una página por ruta de la aplicación
│   │   ├── Inicio.jsx       # Página principal: Hero, Reseñas, Top Álbumes, CTA
│   │   ├── Login.jsx        # Formulario de inicio de sesión con estado de error
│   │   ├── Registro.jsx     # Formulario de registro (4 campos)
│   │   ├── Catalogo.jsx     # Catálogo con filtros, búsqueda, orden y paginación
│   │   ├── Busqueda.jsx     # Búsqueda global con tendencias y estado sin resultados
│   │   └── Rankings.jsx     # Rankings y estadísticas globales — pendiente
│   ├── services/            # Llamadas a la API REST del backend — pendiente
│   ├── App.jsx              # Configuración de rutas y layout global
│   ├── index.css            # Design system: tokens de color y tipografía (Tailwind v4)
│   └── main.jsx             # Punto de entrada de la aplicación
├── docs/
│   └── tailwind-guide.md    # Referencia de todas las clases Tailwind usadas
├── index.html               # HTML raíz (punto de montaje de React)
├── vite.config.js           # Configuración de Vite
└── package.json
```

---

## Design System

El design system está definido en `src/index.css` mediante directivas `@theme` de Tailwind v4.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `background` | `#060907` | Fondo principal |
| `card` | `#0e1310` | Fondo de tarjetas, navbar, footer |
| `primary` | `#48a377` | Botones, links activos, acentos |
| `secondary` | `#226846` | Hover de botones principales |
| `text` | `#ebf0ed` | Texto principal |
| `muted` | `#ebf0ed` al 50% | Texto secundario y metadatos |
| `border` | `#223228` | Bordes de tarjetas e inputs |
| `input` | `#0a0f0c` | Fondo de campos de formulario |
| `error` | `#cc3333` | Estados de error |

### Tipografía

| Clase | Fuente | Uso |
|---|---|---|
| `font-heading` | Space Grotesk | Títulos, logo, botones |
| `font-body` | Outfit | Cuerpo de texto, subtítulos |

---

## Rutas

| Ruta | Página | Estado |
|---|---|---|
| `/` | Inicio | Implementada |
| `/login` | Login | Implementada |
| `/registro` | Registro | Implementada |
| `/catalogo` | Catálogo | Implementada |
| `/busqueda` | Búsqueda | Implementada |
| `/rankings` | Rankings | Pendiente |

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build
```

---

## Diseño de referencia

El prototipo visual está en Figma (archivo `Prototipo`, 15 pantallas diseñadas) e incluye todas las páginas de la aplicación: inicio, catálogo, detalle de álbum, perfil de usuario, búsqueda, crear/editar reseña, estadísticas, panel de administración y más.
