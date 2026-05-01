import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import { getArtista } from "../services/artistas";
import { getAlbumes } from "../services/albumes";

export default function DetalleArtista() {
  const { id } = useParams();
  const [artista, setArtista] = useState(null);
  const [discografia, setDiscografia] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getArtista(id),
      getAlbumes({ artistaId: id, size: 100 }),
    ])
      .then(([a, paginaAlbumes]) => {
        setArtista(a);
        // Ordenar discografía por fecha de lanzamiento descendente (más recientes primero)
        const ordenados = [...paginaAlbumes.content].sort((a, b) => {
          if (!a.fechaLanzamiento) return 1;
          if (!b.fechaLanzamiento) return -1;
          return b.fechaLanzamiento.localeCompare(a.fechaLanzamiento);
        });
        setDiscografia(ordenados);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-error font-body">No se pudo cargar el artista: {error}</p>
        <Link to="/catalogo" className="text-primary hover:underline">← Volver al catálogo</Link>
      </main>
    );
  }

  if (!artista) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-muted font-body">Cargando artista…</p>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen py-8 sm:py-10">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header del artista */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left mb-12">

          {/* Avatar */}
          {artista.foto
            ? <img src={artista.foto} alt={artista.nombre} className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-primary shrink-0" />
            : <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-primary flex items-center justify-center shrink-0 bg-card">
                <span className="text-primary text-4xl">♪</span>
              </div>
          }

          {/* Info */}
          <div className="flex flex-col gap-3 pt-2 items-center sm:items-start">
            <h1 className="text-text font-heading font-bold text-3xl sm:text-4xl">{artista.nombre}</h1>
            <p className="text-muted font-body text-sm">
              {[artista.pais, artista.genero].filter(Boolean).join(" · ") || "—"}
            </p>

            {/* Stats — solo álbumes (el backend no expone media ni total reseñas por artista) */}
            <div className="flex border border-border rounded-xl overflow-hidden mt-1">
              <div className="flex flex-col items-center px-8 py-4">
                <span className="text-primary font-heading font-bold text-xl">
                  {discografia?.length ?? "—"}
                </span>
                <span className="text-muted font-body text-xs">Álbumes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biografía */}
        {artista.biografia && (
          <div className="mb-12">
            <h2 className="text-text font-heading font-bold text-2xl mb-3">Biografía</h2>
            <p className="text-muted font-body text-sm leading-relaxed max-w-4xl whitespace-pre-line">
              {artista.biografia}
            </p>
          </div>
        )}

        {/* Discografía */}
        <div className="mb-12">
          <h2 className="text-text font-heading font-bold text-2xl mb-6">Discografía</h2>
          {!discografia && <p className="text-muted font-body">Cargando discografía…</p>}
          {discografia && discografia.length === 0 && (
            <p className="text-muted font-body">Este artista aún no tiene álbumes en la BD.</p>
          )}
          {discografia && discografia.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {discografia.map((a) => {
                const anio = a.fechaLanzamiento ? new Date(a.fechaLanzamiento).getFullYear() : null;
                return (
                  <Link
                    key={a.id}
                    to={`/album/${a.id}`}
                    className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors"
                  >
                    {a.portada
                      ? <img src={a.portada} alt={a.titulo} className="w-full aspect-square object-cover" />
                      : <PortadaPlaceholder className="w-full aspect-square" />
                    }
                    <div className="p-3 flex flex-col gap-1">
                      <p className="text-text font-heading font-bold text-sm truncate">{a.titulo}</p>
                      {anio && <p className="text-muted font-body text-xs">{anio}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
