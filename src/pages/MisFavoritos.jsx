import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";

// Mock — vendrá del backend via usuario autenticado
const FAVORITOS = [
  { id: 1, albumId: 1, album: "To Pimp a Butterfly", artista: "K. Lamar", rating: 5.0 },
  { id: 2, albumId: 2, album: "Blonde", artista: "F. Ocean", rating: 4.6 },
  { id: 3, albumId: 3, album: "Random Access Mem.", artista: "Daft Punk", rating: 4.7 },
  { id: 4, albumId: 4, album: "Currents", artista: "T. Impala", rating: 4.5 },
  { id: 5, albumId: 5, album: "DAMN.", artista: "K. Lamar", rating: 4.8 },
  { id: 6, albumId: 6, album: "Chromakopia", artista: "Tyler", rating: 4.3 },
  { id: 7, albumId: 7, album: "GNX", artista: "K. Lamar", rating: 4.5 },
  { id: 8, albumId: 8, album: "Igor", artista: "Tyler", rating: 4.6 },
];

export default function MisFavoritos() {
  const tieneFavoritos = FAVORITOS.length > 0;

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Cabecera */}
        <div className="mb-8">
          <h1 className="text-text font-heading font-bold text-4xl">Mis Favoritos</h1>
          {tieneFavoritos && (
            <p className="text-muted font-body text-sm mt-1">{FAVORITOS.length} álbumes guardados</p>
          )}
        </div>

        {tieneFavoritos ? (
          <div className="grid grid-cols-4 gap-6">
            {FAVORITOS.map((f) => (
              <Link
                key={f.id}
                to={`/album/${f.albumId}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors group"
              >
                <div className="relative">
                  <PortadaPlaceholder className="w-full aspect-square" />
                  <span className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg">
                    ♥
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-text font-heading font-bold text-sm truncate">{f.album}</p>
                  <p className="text-muted font-body text-xs truncate">{f.artista}</p>
                  <p className="text-primary font-body text-xs">★ {f.rating.toFixed(1)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Estado vacío
          <div className="flex flex-col items-center justify-center py-32 gap-4">
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
