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
│   │       ├── SectionTitle.jsx          # Título de sección con línea verde
│   │       ├── PortadaPlaceholder.jsx    # Placeholder ♪ para portadas sin imagen
│   │       ├── Estrellas.jsx             # Valoración 1-5 con medias estrellas (display)
│   │       ├── EstrellasInteractivas.jsx # Selector de puntuación interactivo con medias estrellas
│   │       ├── ResenaCard.jsx            # Tarjeta de reseña (portada + info + cita)
│   │       ├── AlbumCard.jsx             # Tarjeta de álbum con badge de posición (rankings)
│   │       ├── CatalogoCard.jsx          # Tarjeta de álbum con badge de género opcional
│   │       ├── AlbumRow.jsx              # Fila compacta de álbum (búsqueda recientes)
│   │       ├── FormInput.jsx             # Input de formulario con label y estado de error
│   │       ├── GenreChip.jsx             # Chip de género/filtro activo e inactivo
│   │       ├── SearchBar.jsx             # Barra de búsqueda con icono SVG
│   │       ├── SelectOrden.jsx           # Selector desplegable estilizado
│   │       └── Paginacion.jsx            # Paginación con flechas y puntos suspensivos
│   ├── context/
│   │   └── AuthContext.jsx  # Estado de sesión (usuario + token) con persistencia en localStorage
│   ├── pages/               # Una página por ruta de la aplicación
│   │   ├── Inicio.jsx       # Página principal: Hero, Reseñas, Top Álbumes, CTA
│   │   ├── Login.jsx        # Formulario de inicio de sesión con estado de error
│   │   ├── Registro.jsx     # Formulario de registro (4 campos)
│   │   ├── Catalogo.jsx     # Catálogo con filtros, búsqueda, orden y paginación
│   │   ├── Busqueda.jsx     # Búsqueda global con tendencias y estado sin resultados
│   │   ├── Rankings.jsx     # Rankings globales: top álbumes, artistas, géneros y actividad
│   │   ├── DetalleAlbum.jsx # Detalle de álbum: info, favorito toggle, reseñas, más del artista
│   │   ├── DetalleArtista.jsx # Detalle de artista: bio, stats, discografía, reseñas recientes
│   │   ├── CrearResena.jsx  # Formulario de nueva reseña (pantalla completa sin Navbar)
│   │   ├── EditarResena.jsx # Formulario de edición de reseña con datos pre-rellenados
│   │   ├── PerfilUsuario.jsx # Perfil público: avatar, stats, tabs Reseñas/Favoritos
│   │   ├── EditarPerfil.jsx # Edición de perfil propio (pantalla completa sin Navbar)
│   │   ├── MisFavoritos.jsx # Lista de álbumes favoritos del usuario con estado vacío
│   │   ├── PanelAdmin.jsx   # Panel de administración: stats, contenido, usuarios, moderación
│   │   └── NotFound.jsx     # Página 404 para rutas desconocidas
│   ├── services/
│   │   └── auth.js          # Capa de red — POST /api/auth/login y /register
│   ├── App.jsx              # Configuración de rutas, layout global y patrón SIN_NAVBAR
│   ├── index.css            # Design system: tokens de color y tipografía (Tailwind v4)
│   └── main.jsx             # Punto de entrada de la aplicación
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
| `surface` | `#16261E` | Secciones CTA y bloques destacados |
| `primary` | `#48a377` | Botones, links activos, acentos |
| `secondary` | `#226846` | Hover de botones principales |
| `text` | `#ebf0ed` | Texto principal |
| `muted` | `#ebf0ed` al 50% | Texto secundario y metadatos |
| `border` | `#223228` | Bordes de tarjetas e inputs |
| `input` | `#0a0f0c` | Fondo de campos de formulario |
| `error` | `#cc3333` | Estados de error, zona de peligro |

### Tipografía

| Clase | Fuente | Uso |
|---|---|---|
| `font-heading` | Space Grotesk | Títulos, logo, botones |
| `font-body` | Outfit | Cuerpo de texto, subtítulos |

---

## Rutas

| Ruta | Página | Navbar |
|---|---|---|
| `/` | Inicio | Sí |
| `/login` | Login | Sí |
| `/registro` | Registro | Sí |
| `/catalogo` | Catálogo | Sí |
| `/busqueda` | Búsqueda | Sí |
| `/rankings` | Rankings | Sí |
| `/album/:id` | Detalle de álbum | Sí |
| `/artista/:id` | Detalle de artista | Sí |
| `/crear-resena` | Crear reseña | No (pantalla completa) |
| `/editar-resena` | Editar reseña | No (pantalla completa) |
| `/perfil/:username` | Perfil de usuario | Sí |
| `/editar-perfil` | Editar perfil | No (pantalla completa) |
| `/favoritos` | Mis favoritos | Sí |
| `/admin` | Panel de administración | Sí |
| `*` | 404 Not Found | Sí |

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

El prototipo visual está en Figma (archivo `Prototipo`, 15 pantallas diseñadas) e incluye todas las páginas de la aplicación. El desarrollo se realizó conectando directamente con el plugin **Figma Desktop Bridge MCP** para garantizar fidelidad con los diseños.

---

## Estado del proyecto

**15 pantallas terminadas** + **integración 100% completa** con el backend (Spring Boot + MySQL en Aiven).

**Fase 4 — Integración frontend ↔ backend (cerrada):**

- ✅ **Paso 1 — AuthContext:** estado React de `usuario` y `token`, persistido en localStorage. Hook `useAuth()`.
- ✅ **Paso 2 — Login + Registro:** formularios reales contra `POST /api/auth/login` y `/register`.
- ✅ **Paso 3 — Navbar dinámico:** renderizado condicional según sesión y rol; logout, avatar real con inicial del usuario, link "Admin" solo si `rol === "ADMIN"`.
- ✅ **Paso 4 — Rutas protegidas:** wrappers `<RutaProtegida>` y `<RutaAdmin>` con redirección a `/login` recordando la URL original.
- ✅ **Paso 5 — Páginas públicas:** Inicio, Catálogo, Búsqueda, Rankings con datos reales (732 álbumes, 99 artistas, ~38 reseñas, 9 usuarios).
- ✅ **Paso 6 — Detalle de álbum y artista:** datos reales + toggle de favoritos funcional con auth.
- ✅ **Paso 7 — Páginas de usuario:** perfil público (reseñas + favoritos), editar perfil con sincronización del contexto, mis favoritos con quitar inline.
- ✅ **Paso 8 — CRUD de reseñas:** crear, editar, borrar desde la UI con todas las navegaciones cruzadas y detección "ya tengo reseña → editar".
- ✅ **Paso 9 — Panel admin funcional:** stats reales, gestión de usuarios (activar/desactivar), formulario de nuevo artista, moderación de reseñas. Búsqueda unificada (`?q=`) que matchea título o artista. Orden parametrizable en catálogo (4 opciones).

**Servicios** (separados por dominio del backend, igual patrón en todos):
`auth.js`, `albumes.js`, `artistas.js`, `usuarios.js`, `resenas.js`, `favoritos.js`, `estadisticas.js`.

**Limitaciones conocidas y documentadas:** sin verificación de email, sin cambio de contraseña, sin subida real de archivos (URL como workaround), sin orden "Mejor valorados" en catálogo (requiere agregado de reseñas), `DELETE /api/resenas/{id}` no verifica owner en backend (protección solo a nivel de UI). Lista completa con causas y mejoras futuras en [`musicreviews/docs/integracion.md § 13`](https://github.com/pabloplazx/musicreviews/blob/master/docs/integracion.md).

**Documentación completa** de la fase 4 (todas las decisiones, bugs encontrados al integrar — incluyendo 6 bugs B1-B6 documentados, pruebas Postman, decisiones técnicas): [`integracion.md`](https://github.com/pabloplazx/musicreviews/blob/master/docs/integracion.md) en el repo del TFG.
