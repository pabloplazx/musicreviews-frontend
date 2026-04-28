import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Estrellas from "../components/ui/Estrellas";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import { useAuth } from "../context/AuthContext";
import { getUsuarioPorUsername } from "../services/usuarios";
import { getResenasPorUsuario } from "../services/resenas";
import { getFavoritosUsuario } from "../services/favoritos";

const TABS = ["Reseñas", "Favoritos"];

function formatearFecha(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

function formatearMes(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

export default function PerfilUsuario() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { usuario: sesion, token } = useAuth();

  const [perfil, setPerfil] = useState(null);
  const [resenas, setResenas] = useState(null);
  const [favoritos, setFavoritos] = useState(null);
  const [tabActiva, setTabActiva] = useState("Reseñas");
  const [error, setError] = useState(null);

  // Cargar datos del usuario y sus reseñas (públicos). Reset cuando cambia username.
  useEffect(() => {
    setPerfil(null);
    setResenas(null);
    setFavoritos(null);
    getUsuarioPorUsername(username)
      .then((u) => {
        setPerfil(u);
        return getResenasPorUsuario(u.id);
      })
      .then(setResenas)
      .catch((err) => setError(err.message));
  }, [username]);

  // Cargar favoritos solo si quien visita está logueado (el endpoint requiere auth).
  // Si falla por permisos o lo que sea, dejamos favoritos a null y la tab muestra mensaje.
  useEffect(() => {
    if (!perfil || !token) return;
    getFavoritosUsuario(perfil.id, token)
      .then(setFavoritos)
      .catch(() => {});
  }, [perfil, token]);

  if (error) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-error font-body">No se pudo cargar el perfil: {error}</p>
        <Link to="/" className="text-primary hover:underline">← Volver al inicio</Link>
      </main>
    );
  }

  if (!perfil) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-muted font-body">Cargando perfil…</p>
      </main>
    );
  }

  const esMiPerfil = sesion?.id === perfil.id;

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Header del perfil */}
        <div className="flex items-start gap-6 mb-8 relative">

          {/* Avatar */}
          {perfil.fotoPerfil
            ? <img src={perfil.fotoPerfil} alt={perfil.username} className="w-24 h-24 rounded-full object-cover shrink-0" />
            : <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-background font-heading font-bold text-4xl uppercase">
                  {perfil.username[0]}
                </span>
              </div>
          }

          {/* Info */}
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-text font-heading font-bold text-3xl">{perfil.username}</h1>
            <p className="text-muted font-body text-sm">
              {perfil.fechaRegistro && `Miembro desde ${formatearMes(perfil.fechaRegistro)}`}
            </p>
            {perfil.bio && (
              <p className="text-text font-body text-sm max-w-lg whitespace-pre-line mt-1">{perfil.bio}</p>
            )}
            <div className="flex gap-6 mt-1">
              <div>
                <span className="text-primary font-heading font-bold text-2xl">
                  {resenas?.length ?? "—"}
                </span>
                <p className="text-muted font-body text-xs">Reseñas</p>
              </div>
              <div>
                <span className="text-primary font-heading font-bold text-2xl">
                  {favoritos?.length ?? (token ? "—" : "?")}
                </span>
                <p className="text-muted font-body text-xs">Favoritos</p>
              </div>
            </div>
          </div>

          {/* Editar perfil — solo si es mi perfil */}
          {esMiPerfil && (
            <Link
              to="/editar-perfil"
              className="absolute top-0 right-0 flex items-center gap-2 border border-border text-text font-body text-sm px-4 py-2 rounded-input hover:border-primary hover:text-primary transition-colors"
            >
              ✏ Editar perfil
            </Link>
          )}

        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setTabActiva(tab)}
              className={`px-6 py-3 font-body text-sm transition-colors relative ${
                tabActiva === tab
                  ? "text-primary"
                  : "text-muted hover:text-text"
              }`}
            >
              {tab}
              {tabActiva === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Reseñas */}
        {tabActiva === "Reseñas" && (
          <>
            {!resenas && <p className="text-muted font-body py-4">Cargando reseñas…</p>}
            {resenas && resenas.length === 0 && (
              <p className="text-muted font-body py-12 text-center">
                {esMiPerfil ? "Aún no has reseñado nada." : `${perfil.username} aún no ha reseñado nada.`}
              </p>
            )}
            {resenas && resenas.length > 0 && (
              <div className="flex flex-col gap-4">
                {resenas.map((r) => (
                  <Link
                    key={r.id}
                    to={`/album/${r.album.id}`}
                    className="bg-card border border-border rounded-xl p-5 flex gap-5 hover:border-primary transition-colors relative"
                  >
                    {r.album.portada
                      ? <img src={r.album.portada} alt={r.album.titulo} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                      : <PortadaPlaceholder className="w-24 h-24 rounded-lg shrink-0" iconSize="text-2xl" />
                    }
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p className="text-text font-heading font-bold text-base">{r.album.titulo}</p>
                      <p className="text-muted font-body text-sm">{r.album.artista?.nombre}</p>
                      <Estrellas cantidad={r.puntuacion} />
                      {r.comentario && (
                        <p className="text-muted font-body text-sm italic mt-1 line-clamp-2">"{r.comentario}"</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-muted font-body text-xs">{formatearFecha(r.fechaCreacion)}</span>
                      {esMiPerfil && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate("/editar-resena", { state: { albumId: r.album.id } });
                          }}
                          className="text-primary font-body text-xs hover:underline"
                        >
                          ✎ Editar
                        </button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Tab Favoritos */}
        {tabActiva === "Favoritos" && (
          <>
            {!token && (
              <p className="text-muted font-body py-12 text-center">
                <Link to="/login" className="text-primary hover:underline">Inicia sesión</Link> para ver los favoritos.
              </p>
            )}
            {token && !favoritos && <p className="text-muted font-body py-4">Cargando favoritos…</p>}
            {token && favoritos && favoritos.length === 0 && (
              <p className="text-muted font-body py-12 text-center">
                {esMiPerfil ? "No tienes álbumes en favoritos todavía." : `${perfil.username} no tiene favoritos.`}
              </p>
            )}
            {token && favoritos && favoritos.length > 0 && (
              <div className="grid grid-cols-6 gap-4">
                {favoritos.map((f) => (
                  <Link
                    key={f.id}
                    to={`/album/${f.album.id}`}
                    className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors"
                  >
                    <div className="relative">
                      {f.album.portada
                        ? <img src={f.album.portada} alt={f.album.titulo} className="w-full aspect-square object-cover" />
                        : <PortadaPlaceholder className="w-full aspect-square" iconSize="text-2xl" />
                      }
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-base">
                        ♥
                      </span>
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                      <p className="text-text font-heading font-bold text-xs truncate">{f.album.titulo}</p>
                      <p className="text-muted font-body text-xs truncate">{f.album.artista?.nombre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
