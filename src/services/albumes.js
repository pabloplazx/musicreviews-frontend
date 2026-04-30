const API = import.meta.env.VITE_API_URL;

// GET /api/albumes con filtros y paginación.
// Devuelve un Page<Album> de Spring Data: { content: Album[], page: {size, number, totalElements, totalPages} }.
// El parámetro `q` es la búsqueda unificada (título O nombre de artista). El parámetro
// `titulo` queda como búsqueda solo por título por compatibilidad con código previo.
// `sort` acepta: "az" (default), "za", "recientes", "antiguos".
export async function getAlbumes({ page = 0, size = 12, q, titulo, genero, artistaId, sort } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("size", size);
  if (q) params.set("q", q);
  if (titulo) params.set("titulo", titulo);
  if (genero) params.set("genero", genero);
  if (artistaId) params.set("artistaId", artistaId);
  if (sort) params.set("sort", sort);

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
