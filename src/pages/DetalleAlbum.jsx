import { useState } from "react";
import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";
import SectionTitle from "../components/ui/SectionTitle";

// Datos mock — se reemplazarán con fetch al backend usando el id de la URL
const ALBUM = {
  titulo: "DAMN.",
  artista: "Kendrick Lamar",
  anio: 2017,
  genero: "Hip-Hop",
  rating: 4.8,
  totalResenas: 1204,
  descripcion:
    "Cuarto álbum de Kendrick Lamar. Premio Pulitzer 2018. El primero fuera de la música clásica y el jazz.",
};

const RESENAS = [
  {
    id: 1,
    usuario: "maria_music",
    fecha: "15 abr 2026",
    rating: 5,
    texto:
      '"Perfecto. Kendrick en su estado más vulnerable y poderoso a la vez. Una obra que trasciende el género."',
  },
  {
    id: 2,
    usuario: "rockfan92",
    fecha: "1 mar 2026",
    rating: 3.5,
    texto:
      '"DNA y HUMBLE son himnos. Algún track del medio flojea pero sigue siendo una obra maestra del rap moderno."',
  },
  {
    id: 3,
    usuario: "musiclover_es",
    fecha: "20 ene 2026",
    rating: 5,
    texto:
      '"El mejor álbum de rap de la década. Cada escucha revela algo nuevo. Absolutamente brillante."',
  },
];

const MAS_ALBUMS = [
  { id: 1, titulo: "good kid, m.A.A.d city" },
  { id: 2, titulo: "To Pimp a Butterfly" },
  { id: 3, titulo: "Mr. Morale" },
  { id: 4, titulo: "Section.80" },
];

function Avatar({ usuario }) {
  return (
    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
      <span className="text-background font-heading font-bold text-sm uppercase">
        {usuario[0]}
      </span>
    </div>
  );
}

export default function DetalleAlbum() {
  const [favorito, setFavorito] = useState(false);
  const tieneResenas = RESENAS.length > 0;

  return (
    <main className="bg-background min-h-screen">

      {/* Header del álbum */}
      <section className="bg-card border-b border-border py-10">
        <div className="max-w-300 mx-auto px-12 flex gap-10">

          {/* Portada */}
          <PortadaPlaceholder className="w-48 h-48 rounded-xl shrink-0" />

          {/* Info */}
          <div className="flex flex-col justify-center gap-3">
            <span className="self-start px-3 py-1 bg-primary/20 text-primary font-body text-xs rounded-full">
              {ALBUM.genero}
            </span>
            <h1 className="text-text font-heading font-bold text-4xl">{ALBUM.titulo}</h1>
            <p className="text-muted font-body text-sm">
              <Link to="/artista/1" className="hover:text-primary transition-colors">{ALBUM.artista}</Link>
              {" "}· {ALBUM.anio}
            </p>
            <div className="flex items-center gap-2">
              <Estrellas cantidad={ALBUM.rating} />
              <span className="text-primary font-heading font-bold text-sm">{ALBUM.rating}</span>
              <span className="text-muted font-body text-xs">
                ({ALBUM.totalResenas.toLocaleString("es-ES")} reseñas)
              </span>
            </div>
            <div className="flex gap-3">
              <Link
                to="/crear-resena"
                className="flex items-center gap-2 bg-primary text-background font-body text-sm font-medium px-5 py-2.5 rounded-input hover:bg-secondary transition-colors"
              >
                ✎ Escribir reseña
              </Link>
              <button
                onClick={() => setFavorito(!favorito)}
                className={`flex items-center gap-2 border font-body text-sm px-5 py-2.5 rounded-input transition-colors ${
                  favorito
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text hover:border-primary hover:text-primary"
                }`}
              >
                {favorito ? "♥ En favoritos" : "♡ Añadir a favoritos"}
              </button>
            </div>
            <p className="text-muted font-body text-sm max-w-lg">{ALBUM.descripcion}</p>
          </div>

        </div>
      </section>

      <div className="max-w-300 mx-auto px-12 py-10">

        {/* Reseñas */}
        <SectionTitle>Reseñas</SectionTitle>

        {tieneResenas ? (
          <div className="flex flex-col gap-4 mb-12">
            {RESENAS.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl px-6 py-5 flex gap-4">
                <Avatar usuario={r.usuario} />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-text font-body text-sm font-medium">{r.usuario}</span>
                    <span className="text-muted font-body text-xs">{r.fecha}</span>
                  </div>
                  <Estrellas cantidad={r.rating} />
                  <p className="text-muted font-body text-sm mt-1">{r.texto}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Estado vacío — se mostrará cuando no haya reseñas del backend
          <div className="flex flex-col items-center gap-4 py-20 mb-12">
            <span className="text-primary text-5xl">♪</span>
            <p className="text-text font-heading font-bold text-xl">Sé el primero en reseñar</p>
            <p className="text-muted font-body text-sm text-center">
              Nadie ha dejado una reseña todavía.<br />¡Tu opinión puede ser la primera!
            </p>
            <Link
              to="/crear-resena"
              className="bg-primary text-background font-body text-sm font-medium px-6 py-2.5 rounded-input hover:bg-secondary transition-colors"
            >
              Escribir reseña
            </Link>
          </div>
        )}

        {/* Más de [Artista] */}
        <div>
          <SectionTitle>Más de {ALBUM.artista}</SectionTitle>
          <div className="grid grid-cols-4 gap-6">
            {MAS_ALBUMS.map((a) => (
              <Link key={a.id} to={`/album/${a.id}`} className="flex flex-col gap-2 group">
                <PortadaPlaceholder className="w-full aspect-square rounded-xl group-hover:opacity-80 transition-opacity" />
                <p className="text-text font-body text-sm truncate">{a.titulo}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
