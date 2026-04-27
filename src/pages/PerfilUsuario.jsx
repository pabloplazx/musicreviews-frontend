import { useState } from "react";
import { Link } from "react-router-dom";
import Estrellas from "../components/ui/Estrellas";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";

// Mock — vendrá del backend via useParams (username) + token del usuario logueado
const USUARIO = {
  username: "pablo_music",
  miembroDesde: "enero 2025",
  totalResenas: 47,
  totalFavoritos: 23,
};

const RESENAS = [
  { id: 1, albumId: 1, album: "Blonde", artista: "Frank Ocean", rating: 5, texto: '"Experimental y hermoso. Frank Ocean en su mejor momento creativo."', fecha: "12 abr 2026" },
  { id: 2, albumId: 2, album: "El Mal Querer", artista: "ROSALÍA", rating: 5, texto: '"Una revolución del flamenco contemporáneo. Precioso de principio a fin."', fecha: "3 mar 2026" },
  { id: 3, albumId: 3, album: "Random Access Memories", artista: "Daft Punk", rating: 4.5, texto: '"Producción impecable. Un viaje nostálgico con electrónica moderna."', fecha: "18 ene 2026" },
  { id: 4, albumId: 4, album: "4:44", artista: "JAY-Z", rating: 5, texto: '"Jay-Z más maduro y honesto que nunca. Líricamente su mejor trabajo."', fecha: "5 dic 2025" },
];

const FAVORITOS = [
  { id: 1, albumId: 1, album: "Blonde", artista: "Frank Ocean", rating: 5 },
  { id: 2, albumId: 2, album: "DAMN.", artista: "Kendrick Lamar", rating: 4.8 },
  { id: 3, albumId: 3, album: "Kid A", artista: "Radiohead", rating: 4.9 },
  { id: 4, albumId: 4, album: "El Mal Querer", artista: "ROSALÍA", rating: 5 },
  { id: 5, albumId: 5, album: "Igor", artista: "Tyler, the Creator", rating: 4.4 },
  { id: 6, albumId: 6, album: "Currents", artista: "Tame Impala", rating: 4.5 },
];

const TABS = ["Reseñas", "Favoritos"];

export default function PerfilUsuario() {
  const [tabActiva, setTabActiva] = useState("Reseñas");

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Header del perfil */}
        <div className="flex items-start gap-6 mb-8 relative">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-background font-heading font-bold text-4xl uppercase">
              {USUARIO.username[0]}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-text font-heading font-bold text-3xl">{USUARIO.username}</h1>
            <p className="text-muted font-body text-sm">Miembro desde {USUARIO.miembroDesde}</p>
            <div className="flex gap-6 mt-1">
              <div>
                <span className="text-primary font-heading font-bold text-2xl">{USUARIO.totalResenas}</span>
                <p className="text-muted font-body text-xs">Reseñas</p>
              </div>
              <div>
                <span className="text-primary font-heading font-bold text-2xl">{USUARIO.totalFavoritos}</span>
                <p className="text-muted font-body text-xs">Favoritos</p>
              </div>
            </div>
          </div>

          {/* Botón editar perfil */}
          <Link
            to="/editar-perfil"
            className="absolute top-0 right-0 flex items-center gap-2 border border-border text-text font-body text-sm px-4 py-2 rounded-input hover:border-primary hover:text-primary transition-colors"
          >
            ✏ Editar perfil
          </Link>

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

        {/* Contenido tab Reseñas */}
        {tabActiva === "Reseñas" && (
          <div className="flex flex-col gap-4">
            {RESENAS.map((r) => (
              <Link
                key={r.id}
                to={`/album/${r.albumId}`}
                className="bg-card border border-border rounded-xl p-5 flex gap-5 hover:border-primary transition-colors"
              >
                <PortadaPlaceholder className="w-24 h-24 rounded-lg shrink-0" iconSize="text-2xl" />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="text-text font-heading font-bold text-base">{r.album}</p>
                  <p className="text-muted font-body text-sm">{r.artista}</p>
                  <Estrellas cantidad={r.rating} />
                  <p className="text-muted font-body text-sm italic mt-1">{r.texto}</p>
                </div>
                <span className="text-muted font-body text-xs shrink-0 pt-1">{r.fecha}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Contenido tab Favoritos */}
        {tabActiva === "Favoritos" && (
          <div className="grid grid-cols-6 gap-4">
            {FAVORITOS.map((f) => (
              <Link
                key={f.id}
                to={`/album/${f.albumId}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors"
              >
                <div className="relative">
                  <PortadaPlaceholder className="w-full aspect-square" iconSize="text-2xl" />
                  <span className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-base">
                    ♥
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-text font-heading font-bold text-xs truncate">{f.album}</p>
                  <p className="text-muted font-body text-xs truncate">{f.artista}</p>
                  <p className="text-primary font-body text-xs">★ {f.rating.toFixed(1)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
