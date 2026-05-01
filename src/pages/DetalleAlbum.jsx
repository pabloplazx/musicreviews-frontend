import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";
import SectionTitle from "../components/ui/SectionTitle";
import { useAuth } from "../context/AuthContext";
import { getAlbum, getAlbumes } from "../services/albumes";
import { getResenasPorAlbum, getResenaUsuarioAlbum } from "../services/resenas";
import { esFavorito, agregarFavorito, quitarFavorito } from "../services/favoritos";

function Avatar({ nombre }) {
  return (
    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
      <span className="text-background font-heading font-bold text-sm uppercase">
        {nombre?.[0] ?? "?"}
      </span>
    </div>
  );
}

function formatearFecha(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

export default function DetalleAlbum() {
  const { id } = useParams();
  const { usuario, token } = useAuth();

  const [album, setAlbum] = useState(null);
  const [resenas, setResenas] = useState(null);
  const [masDelArtista, setMasDelArtista] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [miResena, setMiResena] = useState(null); // null = no tiene; objeto = ya hay reseña
  const [error, setError] = useState(null);
  const [favoritoOcupado, setFavoritoOcupado] = useState(false); // evitar doble click

  // Cargar álbum + reseñas + estado de favorito al montar / cambiar id
  useEffect(() => {
    Promise.all([getAlbum(id), getResenasPorAlbum(id)])
      .then(([a, r]) => {
        setAlbum(a);
        setResenas(r);
        // Una vez tenemos el álbum, pedimos los demás del artista
        return getAlbumes({ artistaId: a.artista.id, size: 5 });
      })
      .then((paginaAlbumes) => {
        // Filtrar el álbum actual
        setMasDelArtista(paginaAlbumes.content.filter((al) => al.id !== Number(id)).slice(0, 4));
      })
      .catch((err) => setError(err.message));
  }, [id]);

  // Si hay sesión, comprobar si el álbum ya está en favoritos del usuario
  useEffect(() => {
    if (!usuario || !token) return;
    esFavorito(usuario.id, Number(id), token)
      .then(setFavorito)
      .catch(() => {}); // silencioso, no bloquea la pantalla
  }, [usuario, token, id]);

  // Si hay sesión, comprobar si el usuario ya tiene reseña para este álbum
  // (para cambiar el botón "Escribir reseña" por "Editar mi reseña").
  useEffect(() => {
    if (!usuario) {
      setMiResena(null);
      return;
    }
    getResenaUsuarioAlbum(usuario.id, Number(id))
      .then(setMiResena)
      .catch(() => setMiResena(null));
  }, [usuario, id]);

  // Calcular puntuación media de las reseñas reales
  const puntuacionMedia = resenas && resenas.length > 0
    ? resenas.reduce((acc, r) => acc + r.puntuacion, 0) / resenas.length
    : null;

  async function handleToggleFavorito() {
    if (!usuario || !token) {
      // Sin sesión: redirigir a login (podríamos usar navigate con from, pero
      // mantengo simple — el navbar ya muestra los botones de auth).
      return;
    }
    setFavoritoOcupado(true);
    try {
      if (favorito) {
        await quitarFavorito(usuario.id, Number(id), token);
        setFavorito(false);
      } else {
        await agregarFavorito(usuario.id, Number(id), token);
        setFavorito(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFavoritoOcupado(false);
    }
  }

  if (error) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-error font-body">No se pudo cargar el álbum: {error}</p>
        <Link to="/catalogo" className="text-primary hover:underline">← Volver al catálogo</Link>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-muted font-body">Cargando álbum…</p>
      </main>
    );
  }

  const tieneResenas = resenas && resenas.length > 0;
  const anio = album.fechaLanzamiento ? new Date(album.fechaLanzamiento).getFullYear() : null;

  return (
    <main className="bg-background min-h-screen">

      {/* Header del álbum */}
      <section className="bg-card border-b border-border py-8 lg:py-10">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start text-center sm:text-left">

          {/* Portada */}
          {album.portada
            ? <img src={album.portada} alt={album.titulo} className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-cover shrink-0" />
            : <PortadaPlaceholder className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl shrink-0" />
          }

          {/* Info */}
          <div className="flex flex-col justify-center gap-3 items-center sm:items-start w-full">
            {album.genero && (
              <span className="px-3 py-1 bg-primary/20 text-primary font-body text-xs rounded-full capitalize">
                {album.genero}
              </span>
            )}
            <h1 className="text-text font-heading font-bold text-2xl sm:text-3xl lg:text-4xl">{album.titulo}</h1>
            <p className="text-muted font-body text-sm">
              <Link to={`/artista/${album.artista.id}`} className="hover:text-primary transition-colors">
                {album.artista.nombre}
              </Link>
              {anio && ` · ${anio}`}
            </p>
            {puntuacionMedia != null && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Estrellas cantidad={puntuacionMedia} />
                <span className="text-primary font-heading font-bold text-sm">{puntuacionMedia.toFixed(1)}</span>
                <span className="text-muted font-body text-xs">
                  ({resenas.length} {resenas.length === 1 ? "reseña" : "reseñas"})
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {miResena ? (
                <Link
                  to="/editar-resena"
                  state={{ albumId: album.id }}
                  className="flex items-center justify-center gap-2 bg-primary text-background font-body text-sm font-medium px-5 py-2.5 rounded-input hover:bg-secondary transition-colors"
                >
                  ✎ Editar mi reseña
                </Link>
              ) : (
                <Link
                  to="/crear-resena"
                  state={{ albumId: album.id }}
                  className="flex items-center justify-center gap-2 bg-primary text-background font-body text-sm font-medium px-5 py-2.5 rounded-input hover:bg-secondary transition-colors"
                >
                  ✎ Escribir reseña
                </Link>
              )}
              {usuario ? (
                <button
                  onClick={handleToggleFavorito}
                  disabled={favoritoOcupado}
                  className={`flex items-center justify-center gap-2 border font-body text-sm px-5 py-2.5 rounded-input transition-colors disabled:opacity-50 ${
                    favorito
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-text hover:border-primary hover:text-primary"
                  }`}
                >
                  {favorito ? "♥ En favoritos" : "♡ Añadir a favoritos"}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 border border-border text-muted font-body text-sm px-5 py-2.5 rounded-input hover:border-primary hover:text-primary transition-colors"
                >
                  ♡ Inicia sesión para guardar
                </Link>
              )}
            </div>
            {album.descripcion && (
              <p className="text-muted font-body text-sm max-w-lg">{album.descripcion}</p>
            )}
          </div>

        </div>
      </section>

      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">

        {/* Reseñas */}
        <SectionTitle>Reseñas</SectionTitle>

        {!resenas && <p className="text-muted font-body py-4">Cargando reseñas…</p>}

        {tieneResenas && (
          <div className="flex flex-col gap-4 mb-12">
            {resenas.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl px-4 sm:px-6 py-5 flex gap-4">
                <Avatar nombre={r.usuario?.username} />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <Link
                      to={`/perfil/${r.usuario?.username}`}
                      className="text-text font-body text-sm font-medium hover:text-primary transition-colors"
                    >
                      {r.usuario?.username}
                    </Link>
                    <span className="text-muted font-body text-xs">
                      {formatearFecha(r.fechaCreacion)}
                      {r.fechaEdicion && " · editada"}
                    </span>
                  </div>
                  <Estrellas cantidad={r.puntuacion} />
                  {r.comentario && (
                    <p className="text-muted font-body text-sm mt-1 break-words">"{r.comentario}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {resenas && !tieneResenas && (
          <div className="flex flex-col items-center gap-4 py-20 mb-12">
            <span className="text-primary text-5xl">♪</span>
            <p className="text-text font-heading font-bold text-xl">Sé el primero en reseñar</p>
            <p className="text-muted font-body text-sm text-center">
              Nadie ha dejado una reseña todavía.<br />¡Tu opinión puede ser la primera!
            </p>
            <Link
              to="/crear-resena"
              state={{ albumId: album.id }}
              className="bg-primary text-background font-body text-sm font-medium px-6 py-2.5 rounded-input hover:bg-secondary transition-colors"
            >
              Escribir reseña
            </Link>
          </div>
        )}

        {/* Más del artista */}
        {masDelArtista && masDelArtista.length > 0 && (
          <div>
            <SectionTitle>Más de {album.artista.nombre}</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {masDelArtista.map((a) => (
                <Link key={a.id} to={`/album/${a.id}`} className="flex flex-col gap-2 group">
                  {a.portada
                    ? <img src={a.portada} alt={a.titulo} className="w-full aspect-square rounded-xl object-cover group-hover:opacity-80 transition-opacity" />
                    : <PortadaPlaceholder className="w-full aspect-square rounded-xl group-hover:opacity-80 transition-opacity" />
                  }
                  <p className="text-text font-body text-sm truncate">{a.titulo}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
