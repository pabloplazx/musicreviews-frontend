const API = "http://localhost:8080/api";

// GET /api/resenas?albumId=... → todas las reseñas de un álbum (público).
export async function getResenasPorAlbum(albumId) {
  const res = await fetch(`${API}/resenas?albumId=${albumId}`);
  if (!res.ok) throw new Error(`Error al cargar reseñas (HTTP ${res.status})`);
  return res.json();
}

// GET /api/resenas?usuarioId=... → todas las reseñas de un usuario (público).
export async function getResenasPorUsuario(usuarioId) {
  const res = await fetch(`${API}/resenas?usuarioId=${usuarioId}`);
  if (!res.ok) throw new Error(`Error al cargar reseñas (HTTP ${res.status})`);
  return res.json();
}

// GET /api/resenas/usuario/{usuarioId}/album/{albumId} → la reseña concreta
// que un usuario ha hecho a un álbum (404 si no existe).
export async function getResenaUsuarioAlbum(usuarioId, albumId) {
  const res = await fetch(`${API}/resenas/usuario/${usuarioId}/album/${albumId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error al cargar reseña (HTTP ${res.status})`);
  return res.json();
}
