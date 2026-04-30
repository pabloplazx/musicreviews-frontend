const API = import.meta.env.VITE_API_URL;

async function get(path) {
  const res = await fetch(`${API}/estadisticas${path}`);
  if (!res.ok) throw new Error(`Error al cargar estadísticas (HTTP ${res.status})`);
  return res.json();
}

// { totalAlbumes, totalArtistas, totalResenas, totalUsuarios }
export const getResumen = () => get("/resumen");

// [{ album: {...}, valor: puntuacionMedia }] ordenado descendente.
export const getTopAlbumes = () => get("/top-albumes");

// [{ album, valor: numeroResenas }] ordenado descendente.
export const getMasResenados = () => get("/mas-resenados");

// [{ artista: {...}, puntuacionMedia }]
export const getTopArtistas = () => get("/top-artistas");

// [{ genero: "hip-hop", total: N }]
export const getGeneros = () => get("/generos");

// Últimas 10 reseñas con usuario y album poblados (LAZY relations resueltas).
export const getActividadReciente = () => get("/actividad-reciente");

// Últimos 10 álbumes añadidos a la BD.
export const getAlbumesRecientes = () => get("/albumes-recientes");

// Top por género: ?genero=rock
export const getTopPorGenero = (genero) => get(`/top-por-genero?genero=${encodeURIComponent(genero)}`);
