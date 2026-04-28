const API = "http://localhost:8080/api";

// GET /api/albumes con filtros y paginación.
// Devuelve un Page<Album> de Spring Data: { content: Album[], page: {size, number, totalElements, totalPages} }.
export async function getAlbumes({ page = 0, size = 12, titulo, genero, artistaId } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("size", size);
  if (titulo) params.set("titulo", titulo);
  if (genero) params.set("genero", genero);
  if (artistaId) params.set("artistaId", artistaId);

  const res = await fetch(`${API}/albumes?${params}`);
  if (!res.ok) throw new Error(`Error al cargar álbumes (HTTP ${res.status})`);
  return res.json();
}

// GET /api/albumes/{id} → un álbum con artista anidado.
export async function getAlbum(id) {
  const res = await fetch(`${API}/albumes/${id}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.mensaje || `Álbum no encontrado (HTTP ${res.status})`);
  }
  return res.json();
}
