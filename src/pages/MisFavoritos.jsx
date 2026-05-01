import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import { useAuth } from "../context/AuthContext";
import { getFavoritosUsuario, quitarFavorito } from "../services/favoritos";

export default function MisFavoritos() {
  // La ruta está protegida por <RutaProtegida>, aquí siempre hay sesión.
  const { usuario, token } = useAuth();
  const [favoritos, setFavoritos] = useState(null);
  const [error, setError] = useState(null);
  const [borrandoId, setBorrandoId] = useState(null);

  useEffect(() => {
    getFavoritosUsuario(usuario.id, token)
      .then(setFavoritos)
      .catch((err) => setError(err.message));
  }, [usuario.id, token]);

  async function handleQuitar(albumId, e) {
    e.preventDefault(); // evitar que el Link al detalle del álbum se dispare
    e.stopPropagation();
    setBorrandoId(albumId);
    try {
      await quitarFavorito(usuario.id, albumId, token);
      setFavoritos((prev) => prev.filter((f) => f.album.id !== albumId));
    } catch (err) {
      setError(err.message);
    } finally {
      setBorrandoId(null);
    }
  }

  if (error) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-error font-body">No se pudieron cargar los favoritos: {error}</p>
        <Link to="/" className="text-primary hover:underline">← Volver al inicio</Link>
      </main>
    );
  }

  if (!favoritos) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-muted font-body">Cargando favoritos…</p>
      </main>
    );
  }

  const tieneFavoritos = favoritos.length > 0;

  return (
    <main className="bg-background min-h-screen py-8 sm:py-10">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12">

        <div className="mb-8">
          <h1 className="text-text font-heading font-bold text-3xl sm:text-4xl">Mis Favoritos</h1>
          {tieneFavoritos && (
            <p className="text-muted font-body text-sm mt-1">
              {favoritos.length} {favoritos.length === 1 ? "álbum guardado" : "álbumes guardados"}
            </p>
          )}
        </div>

        {tieneFavoritos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoritos.map((f) => (
              <Link
                key={f.id}
                to={`/album/${f.album.id}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors group"
              >
                <div className="relative">
                  {f.album.portada
                    ? <img src={f.album.portada} alt={f.album.titulo} className="w-full aspect-square object-cover" />
                    : <PortadaPlaceholder className="w-full aspect-square" />
                  }
                  {/* Botón quitar en hover */}
                  <button
                    onClick={(e) => handleQuitar(f.album.id, e)}
                    disabled={borrandoId === f.album.id}
                    title="Quitar de favoritos"
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg hover:bg-error transition-colors disabled:opacity-50"
                  >
                    {borrandoId === f.album.id ? "…" : "♥"}
                  </button>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-text font-heading font-bold text-sm truncate">{f.album.titulo}</p>
                  <p className="text-muted font-body text-xs truncate">{f.album.artista?.nombre}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 gap-4">
            <span className="text-border text-6xl">♡</span>
            <p className="text-text font-heading font-bold text-2xl">Aún no tienes favoritos</p>
            <p className="text-muted font-body text-sm text-center">
              Explora el catálogo y añade álbumes<br />a tu lista de favoritos.
            </p>
            <Link
              to="/catalogo"
              className="bg-primary text-background font-body text-sm font-medium px-6 py-2.5 rounded-input hover:bg-secondary transition-colors mt-2"
            >
              Explorar catálogo
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
