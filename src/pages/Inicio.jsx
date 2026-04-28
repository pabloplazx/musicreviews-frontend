import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";
import ResenaCard from "../components/ui/ResenaCard";
import AlbumCard from "../components/ui/AlbumCard";
import { getActividadReciente, getTopAlbumes } from "../services/estadisticas";

export default function Inicio() {
  const [resenas, setResenas] = useState(null);
  const [topAlbumes, setTopAlbumes] = useState(null);
  const [error, setError] = useState(null);

  // Promise.all dispara las dos peticiones en paralelo. Si una falla, ambos
  // estados se quedan a null y se muestra el mensaje de error.
  useEffect(() => {
    Promise.all([getActividadReciente(), getTopAlbumes()])
      .then(([r, t]) => {
        setResenas(r);
        setTopAlbumes(t);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Reseña destacada del Hero: la mejor valorada entre las recientes que
  // tengan comentario. Sin comentario el Hero queda visualmente pobre (solo
  // estrellas), así que filtramos primero. Si ninguna reciente tiene texto,
  // caemos a la mejor sin filtrar para no dejar la card vacía.
  const resenaDestacada = (() => {
    if (!resenas || resenas.length === 0) return null;
    const conTexto = resenas.filter((r) => r.comentario && r.comentario.trim());
    const candidatas = conTexto.length > 0 ? conTexto : resenas;
    return [...candidatas].sort((a, b) => b.puntuacion - a.puntuacion)[0];
  })();

  return (
    <main>
      <section className="py-20 bg-card">
        <div className="max-w-300 mx-auto px-12 flex items-center justify-between gap-12">
          {/* Columna izquierda */}
          <div>
            <h1 className="text-text font-heading font-bold text-6xl leading-tight mb-4">Descubre. <br />Escucha. <br />Opina.</h1>
            <p className="text-muted font-body text-base mb-8">
              Reseña álbumes, descubre música nueva <br />
              y comparte tu opinion con la comunidad
            </p>
            <Link to="/catalogo" className="inline-flex items-center gap-2 bg-primary text-background font-heading font-medium px-6 py-3 rounded-input hover:bg-secondary transition-colors">
              Explorar álbumes →
            </Link>
          </div>
          {/* Columna derecha — reseña destacada (la mejor valorada entre las recientes).
              Si hay reseña, toda la card es Link al detalle del álbum.
              Si todavía no ha cargado, un div estático con el placeholder. */}
          {resenaDestacada ? (
            <Link
              to={`/album/${resenaDestacada.album.id}`}
              className="bg-input border border-primary/40 rounded-xl p-5 w-80 shrink-0 hover:border-primary transition-colors"
            >
              {resenaDestacada.album.portada
                ? <img
                    src={resenaDestacada.album.portada}
                    alt={resenaDestacada.album.titulo}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                : <PortadaPlaceholder className="w-full aspect-square mb-4" iconSize="text-6xl" />
              }
              <p className="text-text font-heading font-bold text-xl truncate">
                {resenaDestacada.album.titulo}
              </p>
              <p className="text-muted font-body text-sm mb-3 truncate">
                {resenaDestacada.album.artista?.nombre}
                {resenaDestacada.album.fechaLanzamiento &&
                  ` · ${new Date(resenaDestacada.album.fechaLanzamiento).getFullYear()}`}
              </p>
              <Estrellas cantidad={resenaDestacada.puntuacion} />
              {resenaDestacada.comentario && (
                <p className="text-muted font-body text-sm mt-3 italic line-clamp-3">
                  "{resenaDestacada.comentario}"
                </p>
              )}
            </Link>
          ) : (
            <div className="bg-input border border-primary/40 rounded-xl p-5 w-80 shrink-0">
              <PortadaPlaceholder className="w-full aspect-square mb-4" iconSize="text-6xl" />
              <p className="text-text font-heading font-medium text-base">Cargando…</p>
            </div>
          )}
        </div>
      </section>

      {/* RESEÑAS RECIENTES */}
      <section className="py-12 bg-background">
        <div className="max-w-300 mx-auto px-12">
          <SectionTitle>Reseñas recientes</SectionTitle>
          {error && <p className="text-error font-body">No se pudieron cargar las reseñas: {error}</p>}
          {!error && !resenas && <p className="text-muted font-body">Cargando reseñas…</p>}
          {resenas && resenas.length === 0 && <p className="text-muted font-body">Aún no hay reseñas.</p>}
          {resenas && resenas.length > 0 && (
            <div className="grid grid-cols-4 gap-6">
              {resenas.slice(0, 4).map((r) => (
                <ResenaCard
                  key={r.id}
                  id={r.album.id}
                  album={r.album.titulo}
                  artista={r.album.artista.nombre}
                  puntuacion={r.puntuacion}
                  texto={r.comentario}
                  portada={r.album.portada}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TOP ÁLBUMES */}
      <section className="py-12 bg-card">
        <div className="max-w-300 mx-auto px-12">
          <SectionTitle>Top Álbumes</SectionTitle>
          {!error && !topAlbumes && <p className="text-muted font-body">Cargando top álbumes…</p>}
          {topAlbumes && topAlbumes.length === 0 && <p className="text-muted font-body">No hay álbumes con reseñas suficientes.</p>}
          {topAlbumes && topAlbumes.length > 0 && (
            <div className="grid grid-cols-5 gap-6">
              {topAlbumes.slice(0, 5).map((item, i) => (
                <AlbumCard
                  key={item.album.id}
                  id={item.album.id}
                  posicion={i + 1}
                  album={item.album.titulo}
                  artista={item.album.artista.nombre}
                  rating={item.valor}
                  portada={item.album.portada}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface">
        <div className="max-w-300 mx-auto px-12">
          <h2 className="text-text font-heading font-bold text-5xl leading-tight mb-8">
            ¿Listo para compartir<br />tu opinión musical?
          </h2>
          <div className="flex items-center gap-6">
            <Link to="/registro" className="inline-flex items-center gap-2 bg-primary text-background font-heading font-medium px-6 py-3 rounded-input hover:bg-secondary transition-colors">
              Crear cuenta gratis →
            </Link>
            <Link to="/login" className="text-primary font-body text-sm hover:underline">
              ¿Ya tienes cuenta? Entra aquí
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
