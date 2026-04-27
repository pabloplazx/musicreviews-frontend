import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import EstrellasInteractivas from "../components/ui/EstrellasInteractivas";

const MAX_CHARS = 2000;

// Mock del álbum — vendrá del estado de navegación o del backend via useParams
const ALBUM = {
  titulo: "Random Access Memories",
  artista: "Daft Punk",
  anio: 2013,
  genero: "Electronic",
};

export default function CrearResena() {
  const navigate = useNavigate();
  const [puntuacion, setPuntuacion] = useState(0);
  const [texto, setTexto] = useState("");

  return (
    <div className="bg-background min-h-screen flex flex-col">

      {/* Header especial */}
      <header className="bg-card border-b border-border px-12 py-4 flex items-center justify-between">
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

      {/* Contenido */}
      <main className="flex-1 max-w-300 mx-auto px-12 py-12 w-full">
        <div className="flex gap-16 items-start">

          {/* Izquierda — card del álbum */}
          <div className="bg-card border border-border rounded-xl overflow-hidden w-72 shrink-0">
            <PortadaPlaceholder className="w-full aspect-square" iconSize="text-6xl" />
            <div className="p-4 flex flex-col gap-2">
              <p className="text-text font-heading font-bold text-base">{ALBUM.titulo}</p>
              <p className="text-muted font-body text-sm">{ALBUM.artista} · {ALBUM.anio}</p>
              <span className="self-start px-3 py-0.5 border border-primary text-primary font-body text-xs rounded-full">
                {ALBUM.genero}
              </span>
            </div>
          </div>

          {/* Derecha — formulario */}
          <div className="flex flex-col gap-6 flex-1">

            {/* Puntuación */}
            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu puntuación</p>
              <EstrellasInteractivas valor={puntuacion} onChange={setPuntuacion} />
            </div>

            {/* Textarea */}
            <div>
              <p className="text-text font-heading font-bold text-base mb-3">Tu reseña</p>
              <div className="relative">
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="Escribe tu opinión sobre este álbum..."
                  rows={10}
                  className="w-full bg-input border border-border rounded-xl px-5 py-4 text-text font-body text-sm placeholder:text-muted resize-none focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute bottom-3 right-4 text-muted font-body text-xs">
                  {texto.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Botón publicar */}
            <button
              disabled={puntuacion === 0}
              onClick={() => navigate(-1)}
              className="bg-primary text-background font-heading font-medium text-sm px-10 py-3 rounded-input hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-start"
            >
              Publicar reseña
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
