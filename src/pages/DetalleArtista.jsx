import { useState } from "react";
import { Link } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";

// Datos mock — se reemplazarán con fetch al backend usando el id de la URL
const ARTISTA = {
  nombre: "Kendrick Lamar",
  pais: "Estados Unidos",
  genero: "Hip-Hop / Rap",
  media: 4.1,
  totalAlbumes: 6,
  totalResenas: 248,
  biografia:
    "Kendrick Lamar Duckworth es un rapero, compositor y productor estadounidense de Compton, California. Considerado uno de los mejores raperos de su generación, sus álbumes exploran temas de identidad, raza y sociedad con una profundidad lírica excepcional.",
};

const DISCOGRAFIA = [
  { id: 1, titulo: "GNX", anio: 2024, rating: 4.5 },
  { id: 2, titulo: "Mr. Morale", anio: 2022, rating: 4.2 },
  { id: 3, titulo: "DAMN.", anio: 2017, rating: 4.8 },
  { id: 4, titulo: "To Pimp a Butterfly", anio: 2015, rating: 5.0 },
  { id: 5, titulo: "good kid, m.A.A.d city", anio: 2012, rating: 4.9 },
];

const RESENAS = [
  {
    id: 1,
    usuario: "carlos_music",
    rating: 5,
    titulo: '"El mejor álbum de la última década"',
    texto: "Cada track es una obra de arte. La narrativa, la producción y la visión artística son simplemente perfectas.",
    fecha: "Hace 2 días",
  },
  {
    id: 2,
    usuario: "laura_beats",
    rating: 4,
    titulo: '"Un viaje lírico sin igual"',
    texto: "La forma en que Kendrick construye el relato a lo largo del disco no tiene comparación en el rap moderno.",
    fecha: "Hace 1 semana",
  },
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

export default function DetalleArtista() {
  const [siguiendo, setSiguiendo] = useState(false);

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Header del artista */}
        <div className="flex gap-8 items-start mb-12">

          {/* Avatar circular */}
          <div className="w-36 h-36 rounded-full border-2 border-primary flex items-center justify-center shrink-0 bg-card">
            <span className="text-primary text-4xl">♪</span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-4">
              <h1 className="text-text font-heading font-bold text-4xl">{ARTISTA.nombre}</h1>
              <button
                onClick={() => setSiguiendo(!siguiendo)}
                className={`font-body text-sm px-4 py-1.5 rounded-full transition-colors ${
                  siguiendo
                    ? "bg-primary text-background"
                    : "border border-primary text-primary hover:bg-primary hover:text-background"
                }`}
              >
                {siguiendo ? "✓ Siguiendo" : "+ Seguir artista"}
              </button>
            </div>
            <p className="text-muted font-body text-sm">
              {ARTISTA.pais} · {ARTISTA.genero}
            </p>

            {/* Stats */}
            <div className="flex border border-border rounded-xl overflow-hidden mt-1">
              <div className="flex flex-col items-center px-8 py-4 border-r border-border">
                <span className="text-primary font-heading font-bold text-xl">{ARTISTA.media}★</span>
                <span className="text-muted font-body text-xs">Media</span>
              </div>
              <div className="flex flex-col items-center px-8 py-4 border-r border-border">
                <span className="text-primary font-heading font-bold text-xl">{ARTISTA.totalAlbumes}</span>
                <span className="text-muted font-body text-xs">Álbumes</span>
              </div>
              <div className="flex flex-col items-center px-8 py-4">
                <span className="text-primary font-heading font-bold text-xl">{ARTISTA.totalResenas}</span>
                <span className="text-muted font-body text-xs">Reseñas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biografía */}
        <div className="mb-12">
          <h2 className="text-text font-heading font-bold text-2xl mb-3">Biografía</h2>
          <p className="text-muted font-body text-sm leading-relaxed max-w-4xl">{ARTISTA.biografia}</p>
        </div>

        {/* Discografía */}
        <div className="mb-12">
          <h2 className="text-text font-heading font-bold text-2xl mb-6">Discografía</h2>
          <div className="grid grid-cols-5 gap-6">
            {DISCOGRAFIA.map((a) => (
              <Link key={a.id} to={`/album/${a.id}`} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors">
                <PortadaPlaceholder className="w-full aspect-square" />
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-text font-heading font-bold text-sm truncate">{a.titulo}</p>
                  <p className="text-muted font-body text-xs">{a.anio}</p>
                  <p className="text-primary font-body text-xs">★ {a.rating.toFixed(1)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reseñas recientes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-text font-heading font-bold text-2xl">Reseñas recientes</h2>
            <Link to="/busqueda" className="text-primary font-body text-sm hover:underline">
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {RESENAS.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl px-6 py-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar usuario={r.usuario} />
                  <div>
                    <p className="text-text font-body text-sm font-medium">{r.usuario}</p>
                    <Estrellas cantidad={r.rating} />
                  </div>
                </div>
                <p className="text-text font-heading font-bold text-sm">{r.titulo}</p>
                <p className="text-muted font-body text-sm">{r.texto}</p>
                <p className="text-muted font-body text-xs">{r.fecha}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
