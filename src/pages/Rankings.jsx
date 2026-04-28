import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import SectionTitle from "../components/ui/SectionTitle";
import {
  getResumen,
  getTopAlbumes,
  getTopArtistas,
  getGeneros,
  getActividadReciente,
} from "../services/estadisticas";

function RankingRow({ posicion, nombre, subtitulo, rating, portada }) {
  return (
    <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-4">
      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-heading font-bold text-xs flex items-center justify-center shrink-0">
        {posicion}
      </span>
      {portada
        ? <img src={portada} alt={nombre} className="w-8 h-8 rounded-lg object-cover shrink-0" />
        : <PortadaPlaceholder className="w-8 h-8 rounded-lg shrink-0" />
      }
      <div className="flex-1 min-w-0">
        <p className="text-text font-body text-sm font-medium truncate">{nombre}</p>
        <p className="text-muted font-body text-xs truncate">{subtitulo}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-primary text-xs">★</span>
        <span className="text-text font-body text-sm">{rating?.toFixed(1) ?? "—"}</span>
      </div>
    </div>
  );
}

export default function Rankings() {
  const [resumen, setResumen] = useState(null);
  const [topAlbumes, setTopAlbumes] = useState(null);
  const [topArtistas, setTopArtistas] = useState(null);
  const [generos, setGeneros] = useState(null);
  const [actividad, setActividad] = useState(null);
  const [error, setError] = useState(null);

  // 5 peticiones en paralelo. Si una falla, las demás aún cargan; el error
  // global se muestra y las secciones que sí cargaron se renderizan igual.
  useEffect(() => {
    Promise.all([
      getResumen(),
      getTopAlbumes(),
      getTopArtistas(),
      getGeneros(),
      getActividadReciente(),
    ])
      .then(([res, tAl, tAr, gen, act]) => {
        setResumen(res);
        setTopAlbumes(tAl.slice(0, 5));
        setTopArtistas(tAr.slice(0, 3));
        setGeneros(gen.filter((g) => g.genero).slice(0, 5));
        setActividad(act.slice(0, 2));
      })
      .catch((err) => setError(err.message));
  }, []);

  // Para las barras de progreso por género
  const maxGenero = generos && generos.length > 0 ? generos[0].total : 1;

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        <h1 className="text-text font-heading font-bold text-4xl mb-8">Rankings</h1>

        {error && (
          <p className="text-error font-body py-8">No se pudieron cargar los rankings: {error}</p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Álbumes", valor: resumen?.totalAlbumes },
            { label: "Artistas", valor: resumen?.totalArtistas },
            { label: "Reseñas", valor: resumen?.totalResenas },
            { label: "Usuarios", valor: resumen?.totalUsuarios },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl py-5 flex flex-col items-center gap-1">
              <span className="text-primary font-heading font-bold text-3xl">
                {s.valor ?? "—"}
              </span>
              <span className="text-muted font-body text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Top Álbumes + Por género */}
        <div className="grid grid-cols-2 gap-10 mb-10">

          <div>
            <SectionTitle>Top Álbumes</SectionTitle>
            <div className="flex flex-col gap-3">
              {!topAlbumes && <p className="text-muted font-body">Cargando…</p>}
              {topAlbumes && topAlbumes.length === 0 && <p className="text-muted font-body">Sin reseñas suficientes.</p>}
              {topAlbumes && topAlbumes.map((item, i) => (
                <Link key={item.album.id} to={`/album/${item.album.id}`} className="hover:opacity-80 transition-opacity">
                  <RankingRow
                    posicion={i + 1}
                    nombre={item.album.titulo}
                    subtitulo={item.album.artista?.nombre}
                    rating={item.valor}
                    portada={item.album.portada}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Por género</SectionTitle>
            <div className="flex flex-col gap-5">
              {!generos && <p className="text-muted font-body">Cargando…</p>}
              {generos && generos.map((g) => (
                <div key={g.genero}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text font-body text-sm capitalize">{g.genero}</span>
                    <span className="text-muted font-body text-xs">{g.total}</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(g.total / maxGenero) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Top Artistas + Actividad reciente */}
        <div className="grid grid-cols-2 gap-10">

          <div>
            <SectionTitle>Top Artistas</SectionTitle>
            <div className="flex flex-col gap-3">
              {!topArtistas && <p className="text-muted font-body">Cargando…</p>}
              {topArtistas && topArtistas.length === 0 && <p className="text-muted font-body">Sin reseñas suficientes.</p>}
              {topArtistas && topArtistas.map((item, i) => (
                <Link key={item.artista.id} to={`/artista/${item.artista.id}`} className="hover:opacity-80 transition-opacity">
                  <RankingRow
                    posicion={i + 1}
                    nombre={item.artista.nombre}
                    subtitulo={item.artista.genero}
                    rating={item.puntuacionMedia}
                    portada={item.artista.foto}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Actividad reciente</SectionTitle>
            <div className="flex flex-col gap-3">
              {!actividad && <p className="text-muted font-body">Cargando…</p>}
              {actividad && actividad.length === 0 && <p className="text-muted font-body">Aún no hay actividad.</p>}
              {actividad && actividad.map((r) => (
                <Link
                  key={r.id}
                  to={`/perfil/${r.usuario.username}`}
                  className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 hover:border-primary transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-text font-body text-sm font-medium">@{r.usuario.username}</p>
                    <p className="text-muted font-body text-xs truncate">reseñó "{r.album.titulo}"</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-primary text-xs">★</span>
                    <span className="text-text font-body text-sm">{r.puntuacion.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
