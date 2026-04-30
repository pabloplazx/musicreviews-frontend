const API = import.meta.env.VITE_API_URL;

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

// POST /api/artistas — solo ADMIN. Crea un artista con los datos básicos.
export async function crearArtista(datos, token) {
  const res = await fetch(`${API}/artistas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || `Error al crear artista (HTTP ${res.status})`);
  return data;
}
