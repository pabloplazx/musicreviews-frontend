const API = "http://localhost:8080/api";

// GET /api/artistas?nombre=... opcional. Devuelve array.
export async function getArtistas({ nombre } = {}) {
  const params = new URLSearchParams();
  if (nombre) params.set("nombre", nombre);
  const url = params.toString() ? `${API}/artistas?${params}` : `${API}/artistas`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error al cargar artistas (HTTP ${res.status})`);
  return res.json();
}

// GET /api/artistas/{id}
export async function getArtista(id) {
  const res = await fetch(`${API}/artistas/${id}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.mensaje || `Artista no encontrado (HTTP ${res.status})`);
  }
  return res.json();
}
