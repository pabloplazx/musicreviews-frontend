const API = "http://localhost:8080/api";

// GET /api/favoritos/existe?usuarioId=&albumId= (requiere token).
// Devuelve true/false. Si no hay sesión devolvemos false sin llamar al backend.
export async function esFavorito(usuarioId, albumId, token) {
  if (!token) return false;
  const res = await fetch(
    `${API}/favoritos/existe?usuarioId=${usuarioId}&albumId=${albumId}`,
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Error al consultar favorito (HTTP ${res.status})`);
  return res.json();
}

// GET /api/favoritos?usuarioId= (requiere token).
export async function getFavoritosUsuario(usuarioId, token) {
  const res = await fetch(`${API}/favoritos?usuarioId=${usuarioId}`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Error al cargar favoritos (HTTP ${res.status})`);
  return res.json();
}

// POST /api/favoritos (requiere token). Devuelve el favorito creado.
export async function agregarFavorito(usuarioId, albumId, token) {
  const res = await fetch(`${API}/favoritos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ usuario: { id: usuarioId }, album: { id: albumId } }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || `Error al añadir a favoritos (HTTP ${res.status})`);
  return data;
}

// DELETE /api/favoritos?usuarioId=&albumId= (requiere token). 204 sin body.
export async function quitarFavorito(usuarioId, albumId, token) {
  const res = await fetch(
    `${API}/favoritos?usuarioId=${usuarioId}&albumId=${albumId}`,
    { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } }
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.mensaje || `Error al quitar de favoritos (HTTP ${res.status})`);
  }
}
