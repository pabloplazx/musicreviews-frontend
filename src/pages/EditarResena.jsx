import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import EstrellasInteractivas from "../components/ui/EstrellasInteractivas";
import { useAuth } from "../context/AuthContext";
import { getResenaUsuarioAlbum, actualizarResena, borrarResena } from "../services/resenas";

const MAX_CHARS = 2000;

function formatearFecha(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

export default function EditarResena() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, token } = useAuth();

  // El albumId llega por location.state (desde el botón "Editar" en PerfilUsuario
  // o desde DetalleAlbum cuando se detecta que el usuario ya tiene reseña).
  const albumId = location.state?.albumId;

  const [resena, setResena] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [borrando, setBorrando] = useState(false);

  // Cargar la reseña existente del usuario para este álbum
  useEffect(() => {
    if (!albumId) return;
    getResenaUsuarioAlbum(usuario.id, albumId)
      .then((r) => {
        if (!r) {
          // No tiene reseña previa: redirigir a CrearResena con el mismo álbum.
          navigate("/crear-resena", { state: { albumId }, replace: true });
          return;
        }
        setResena(r);
        setPuntuacion(r.puntuacion);
        setComentario(r.comentario ?? "");
      })
      .catch((err) => setError(err.message));
  }, [usuario.id, albumId, navigate]);

  async function handleGuardar() {
    setError("");
    setGuardando(true);
    try {
      await actualizarResena(resena.id, { puntuacion, comentario: comentario || null }, token);
      navigate(`/album/${albumId}`, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar() {
    if (!window.confirm("¿Seguro que quieres eliminar esta reseña? Esta acción no se puede deshacer.")) return;
    setError("");
    setBorrando(true);
    try {
      await borrarResena(resena.id, token);
      navigate(`/album/${albumId}`, { replace: true });
    } catch (err) {
      setError(err.message);
      setBorrando(false);
    }
  }

  // Sin albumId: aviso y vuelta al perfil
  if (!albumId) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 text-center gap-4">
        <span className="text-primary text-6xl">♪</span>
        <h1 className="text-text font-heading font-bold text-2xl">¿Qué reseña quieres editar?</h1>
        <p className="text-muted font-body text-sm max-w-md">
          Entra a esta pantalla desde el botón "Editar" de una reseña tuya en tu perfil.
        </p>
        <Link
          to={`/perfil/${usuario.username}`}
          className="bg-primary text-background font-body text-sm font-medium px-6 py-2.5 rounded-input hover:bg-secondary transition-colors"
        >
          Ver mi perfil
        </Link>
      </div>
    );
  }

  if (error && !resena) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 text-center gap-4">
        <p className="text-error font-body">{error}</p>
        <Link to="/" className="text-primary hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  if (!resena) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-muted font-body">Cargando reseña…</p>
      </div>
    );
  }

  const album = resena.album;
  const anio = album?.fechaLanzamiento ? new Date(album.fechaLanzamiento).getFullYear() : null;

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between gap-3 relative">
        <span className="text-primary font-heading font-bold text-lg shrink-0">♪ <span className="hidden sm:inline">MusicReviews</span></span>
        <h1 className="text-text font-heading font-bold text-base sm:text-lg lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          Editar reseña
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-muted font-body text-sm hover:text-primary transition-colors shrink-0"
        >
          Cancelar
        </button>
      </header>

      <main className="flex-1 max-w-300 mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch lg:items-start">

          {/* Izquierda */}
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:w-72 lg:max-w-none lg:mx-0 lg:shrink-0">

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {album?.portada
                ? <img src={album.portada} alt={album.titulo} className="w-full aspect-square object-cover" />
                : <PortadaPlaceholder className="w-full aspect-square" iconSize="text-6xl" />
              }
              <div className="p-4 flex flex-col gap-2">
                <p className="text-text font-heading font-bold text-base">{album?.titulo}</p>
                <p className="text-muted font-body text-sm">
                  {album?.artista?.nombre}{anio && ` · ${anio}`}
                </p>
                <span className="self-start px-3 py-0.5 bg-primary/20 text-primary font-body text-xs rounded-full">
                  Editando
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
              <p className="text-text font-heading font-bold text-sm">Detalles de tu reseña</p>
              <div className="w-full h-px bg-border" />
              <div className="flex justify-between">
                <span className="text-muted font-body text-xs">Publicada</span>
                <span className="text-text font-body text-xs">{formatearFecha(resena.fechaCreacion)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted font-body text-xs">Última edición</span>
                <span className="text-text font-body text-xs">{formatearFecha(resena.fechaEdicion)}</span>
              </div>
            </div>

          </div>

          {/* Derecha — formulario */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">

            {error && (
              <div className="bg-error/10 border border-error rounded-xl px-4 py-3">
                <p className="text-error font-body text-sm">{error}</p>
              </div>
            )}

            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu puntuación</p>
              <EstrellasInteractivas valor={puntuacion} onChange={setPuntuacion} />
            </div>

            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu reseña <span className="text-muted font-normal text-xs">(opcional)</span></p>
              <div className="relative">
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value.slice(0, MAX_CHARS))}
                  rows={10}
                  className="w-full bg-input border border-border rounded-xl px-5 py-4 pb-8 text-text font-body text-sm placeholder:text-muted resize-none focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute bottom-3 right-4 text-muted font-body text-xs">
                  {comentario.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={handleGuardar}
                disabled={puntuacion === 0 || guardando || borrando}
                className="bg-primary text-background font-heading font-medium text-sm w-full sm:w-auto px-8 py-3 rounded-input hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <button
                onClick={handleEliminar}
                disabled={guardando || borrando}
                className="border border-error text-error font-body text-sm w-full sm:w-auto px-8 py-3 rounded-input hover:bg-error/10 transition-colors disabled:opacity-50"
              >
                {borrando ? "Eliminando…" : "Eliminar reseña"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-muted font-body text-sm hover:text-text transition-colors py-2"
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
