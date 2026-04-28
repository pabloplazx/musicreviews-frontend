import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import EstrellasInteractivas from "../components/ui/EstrellasInteractivas";
import { useAuth } from "../context/AuthContext";
import { getAlbum } from "../services/albumes";
import { crearResena } from "../services/resenas";

const MAX_CHARS = 2000;

export default function CrearResena() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, token } = useAuth();

  // El albumId llega por location.state desde DetalleAlbum (paso 6).
  // Si se entra directamente a /crear-resena sin contexto, no hay álbum y se muestra
  // un mensaje invitando a elegir desde el catálogo.
  const albumId = location.state?.albumId;

  const [album, setAlbum] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!albumId) return;
    getAlbum(albumId)
      .then(setAlbum)
      .catch((err) => setError(err.message));
  }, [albumId]);

  async function handlePublicar() {
    setError("");
    setEnviando(true);
    try {
      await crearResena(
        { usuarioId: usuario.id, albumId, puntuacion, comentario: comentario || null },
        token
      );
      // Tras crear, volver al detalle del álbum donde se verá la reseña nueva.
      navigate(`/album/${albumId}`, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  // Sin albumId: pantalla de aviso para que el usuario llegue desde un álbum.
  if (!albumId) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center px-12 text-center gap-4">
        <span className="text-primary text-6xl">♪</span>
        <h1 className="text-text font-heading font-bold text-2xl">¿Qué álbum quieres reseñar?</h1>
        <p className="text-muted font-body text-sm max-w-md">
          Para escribir una reseña, ve al detalle del álbum desde el catálogo y pulsa "Escribir reseña".
        </p>
        <Link
          to="/catalogo"
          className="bg-primary text-background font-body text-sm font-medium px-6 py-2.5 rounded-input hover:bg-secondary transition-colors"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <header className="bg-card border-b border-border px-12 py-4 flex items-center justify-between relative">
        <span className="text-primary font-heading font-bold text-lg">♪ MusicReviews</span>
        <h1 className="text-text font-heading font-bold text-lg absolute left-1/2 -translate-x-1/2">
          Nueva reseña
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="border border-border text-text font-body text-sm px-4 py-2 rounded-input hover:border-primary hover:text-primary transition-colors"
        >
          Cancelar
        </button>
      </header>

      <main className="flex-1 max-w-300 mx-auto px-12 py-12 w-full">
        <div className="flex gap-16 items-start">

          {/* Izquierda — card del álbum */}
          <div className="bg-card border border-border rounded-xl overflow-hidden w-72 shrink-0">
            {album?.portada
              ? <img src={album.portada} alt={album.titulo} className="w-full aspect-square object-cover" />
              : <PortadaPlaceholder className="w-full aspect-square" iconSize="text-6xl" />
            }
            <div className="p-4 flex flex-col gap-2">
              {!album && <p className="text-muted font-body text-sm">Cargando álbum…</p>}
              {album && (
                <>
                  <p className="text-text font-heading font-bold text-base">{album.titulo}</p>
                  <p className="text-muted font-body text-sm">
                    {album.artista?.nombre}
                    {album.fechaLanzamiento && ` · ${new Date(album.fechaLanzamiento).getFullYear()}`}
                  </p>
                  {album.genero && (
                    <span className="self-start px-3 py-0.5 border border-primary text-primary font-body text-xs rounded-full capitalize">
                      {album.genero}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Derecha — formulario */}
          <div className="flex flex-col gap-6 flex-1">

            {error && (
              <div className="bg-error/10 border border-error rounded-xl px-4 py-3">
                <p className="text-error font-body text-sm">{error}</p>
              </div>
            )}

            {/* Puntuación */}
            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu puntuación</p>
              <EstrellasInteractivas valor={puntuacion} onChange={setPuntuacion} />
            </div>

            {/* Comentario */}
            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu reseña <span className="text-muted font-normal text-xs">(opcional)</span></p>
              <div className="relative">
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="Escribe tu opinión sobre este álbum…"
                  rows={10}
                  className="w-full bg-input border border-border rounded-xl px-5 py-4 text-text font-body text-sm placeholder:text-muted resize-none focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute bottom-3 right-4 text-muted font-body text-xs">
                  {comentario.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            <button
              disabled={puntuacion === 0 || enviando}
              onClick={handlePublicar}
              className="bg-primary text-background font-heading font-medium text-sm px-10 py-3 rounded-input hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-start"
            >
              {enviando ? "Publicando…" : "Publicar reseña"}
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
