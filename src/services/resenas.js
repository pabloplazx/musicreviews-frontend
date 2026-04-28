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
// que un usuario ha hecho a un álbum (404 si no existe → devuelve null).
export async function getResenaUsuarioAlbum(usuarioId, albumId) {
  const res = await fetch(`${API}/resenas/usuario/${usuarioId}/album/${albumId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error al cargar reseña (HTTP ${res.status})`);
  return res.json();
}

// POST /api/resenas (requiere token).
export async function crearResena({ usuarioId, albumId, puntuacion, comentario }, token) {
  const res = await fetch(`${API}/resenas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      usuario: { id: usuarioId },
      album: { id: albumId },
      puntuacion,
      comentario,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || `Error al crear reseña (HTTP ${res.status})`);
  return data;
}

// PUT /api/resenas/{id} (requiere token). Solo se actualiza puntuación y comentario.
export async function actualizarResena(id, { puntuacion, comentario }, token) {
  const res = await fetch(`${API}/resenas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ puntuacion, comentario }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || `Error al actualizar reseña (HTTP ${res.status})`);
  return data;
}

// DELETE /api/resenas/{id} (requiere token). 204 sin body.
export async function borrarResena(id, token) {
  const res = await fetch(`${API}/resenas/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.mensaje || `Error al borrar reseña (HTTP ${res.status})`);
  }
}
