import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";
import SectionTitle from "../components/ui/SectionTitle";

const STATS = [
  { valor: "1.2k", label: "Álbumes" },
  { valor: "340", label: "Artistas" },
  { valor: "8.4k", label: "Reseñas" },
  { valor: "521", label: "Usuarios" },
];

const TOP_ALBUMS = [
  { posicion: 1, album: "To Pimp a Butterfly", artista: "Kendrick Lamar", rating: 5.0 },
  { posicion: 2, album: "DAMN.", artista: "Kendrick Lamar", rating: 4.8 },
  { posicion: 3, album: "Random Access Memories", artista: "Daft Punk", rating: 4.7 },
  { posicion: 4, album: "Blonde", artista: "Frank Ocean", rating: 4.6 },
  { posicion: 5, album: "Currents", artista: "Tame Impala", rating: 4.5 },
];

const GENEROS = [
  { nombre: "Hip-Hop", cantidad: 312 },
  { nombre: "Rock", cantidad: 241 },
  { nombre: "Electronic", cantidad: 193 },
  { nombre: "R&B / Soul", cantidad: 148 },
  { nombre: "Pop", cantidad: 106 },
];

const TOP_ARTISTAS = [
  { posicion: 1, nombre: "Kendrick Lamar", genero: "Hip-Hop", rating: 4.7 },
  { posicion: 2, nombre: "Frank Ocean", genero: "R&B", rating: 4.6 },
  { posicion: 3, nombre: "Tame Impala", genero: "Psychedelic", rating: 4.4 },
];

const ACTIVIDAD = [
  { usuario: "@pablo_m", resena: "GNX", rating: 4.5 },
  { usuario: "@sara_rv", resena: "Chromakopia", rating: 4.0 },
];

function RankingRow({ posicion, nombre, subtitulo, rating }) {
  return (
    <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-4">
      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-heading font-bold text-xs flex items-center justify-center shrink-0">
        {posicion}
      </span>
      <PortadaPlaceholder className="w-8 h-8 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-text font-body text-sm font-medium truncate">{nombre}</p>
        <p className="text-muted font-body text-xs">{subtitulo}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-primary text-xs">★</span>
        <span className="text-text font-body text-sm">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function Rankings() {
  const maxGenero = GENEROS[0].cantidad;

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Cabecera */}
        <h1 className="text-text font-heading font-bold text-4xl mb-8">Rankings</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl py-5 flex flex-col items-center gap-1">
              <span className="text-primary font-heading font-bold text-3xl">{s.valor}</span>
              <span className="text-muted font-body text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Dos columnas: Top Álbumes + Por género */}
        <div className="grid grid-cols-2 gap-10 mb-10">

          {/* Top Álbumes */}
          <div>
            <SectionTitle>Top Álbumes</SectionTitle>
            <div className="flex flex-col gap-3">
              {TOP_ALBUMS.map((a) => (
                <RankingRow
                  key={a.posicion}
                  posicion={a.posicion}
                  nombre={a.album}
                  subtitulo={a.artista}
                  rating={a.rating}
                />
              ))}
            </div>
          </div>

          {/* Por género */}
          <div>
            <SectionTitle>Por género</SectionTitle>
            <div className="flex flex-col gap-5">
              {GENEROS.map((g) => (
                <div key={g.nombre}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text font-body text-sm">{g.nombre}</span>
                    <span className="text-muted font-body text-xs">{g.cantidad}</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(g.cantidad / maxGenero) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dos columnas: Top Artistas + Actividad reciente */}
        <div className="grid grid-cols-2 gap-10">

          {/* Top Artistas */}
          <div>
            <SectionTitle>Top Artistas</SectionTitle>
            <div className="flex flex-col gap-3">
              {TOP_ARTISTAS.map((a) => (
                <Link key={a.posicion} to={`/artista/${a.posicion}`} className="hover:opacity-80 transition-opacity">
                  <RankingRow
                    posicion={a.posicion}
                    nombre={a.nombre}
                    subtitulo={a.genero}
                    rating={a.rating}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Actividad reciente */}
          <div>
            <SectionTitle>Actividad reciente</SectionTitle>
            <div className="flex flex-col gap-3">
              {ACTIVIDAD.map((a) => (
                <Link key={a.usuario} to={`/perfil/${a.usuario.replace("@", "")}`} className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 hover:border-primary transition-colors">
                  <div>
                    <p className="text-text font-body text-sm font-medium">{a.usuario}</p>
                    <p className="text-muted font-body text-xs">reseñó "{a.resena}"</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-primary text-xs">★</span>
                    <span className="text-text font-body text-sm">{a.rating.toFixed(1)}</span>
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
