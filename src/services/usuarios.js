const API = "http://localhost:8080/api";

// GET /api/usuarios/username/{username} (público).
// 404 si no existe; lanza Error con mensaje del backend.
export async function getUsuarioPorUsername(username) {
  const res = await fetch(`${API}/usuarios/username/${encodeURIComponent(username)}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.mensaje || `Usuario no encontrado (HTTP ${res.status})`);
  }
  return res.json();
}

// PUT /api/usuarios/{id} (requiere token).
// El backend solo acepta cambios en username, fotoPerfil y bio.
export async function actualizarUsuario(id, datos, token) {
  const res = await fetch(`${API}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || `Error al actualizar perfil (HTTP ${res.status})`);
  return data;
}
