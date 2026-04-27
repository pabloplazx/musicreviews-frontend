import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import EstrellasInteractivas from "../components/ui/EstrellasInteractivas";

const MAX_CHARS = 2000;

// Mock — al conectar backend vendrá de la reseña existente via useParams
const RESENA_EXISTENTE = {
  album: "Random Access Memories",
  artista: "Daft Punk",
  anio: 2013,
  puntuacion: 4.0,
  texto: "Daft Punk consiguió algo imposible: un álbum de 74 minutos que no cansa en ningún momento. Cada pista es una obra en sí misma...",
  publicada: "12 mar 2026",
  ultimaEdicion: "18 abr 2026",
};

export default function EditarResena() {
  const navigate = useNavigate();
  const [puntuacion, setPuntuacion] = useState(RESENA_EXISTENTE.puntuacion);
  const [texto, setTexto] = useState(RESENA_EXISTENTE.texto);

  return (
    <div className="bg-background min-h-screen flex flex-col">

      {/* Header especial */}
      <header className="bg-card border-b border-border px-12 py-4 flex items-center justify-between">
        <span className="text-primary font-heading font-bold text-lg">♪ MusicReviews</span>
        <h1 className="text-text font-heading font-bold text-lg absolute left-1/2 -translate-x-1/2">
          Editar reseña
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-background font-body text-sm font-medium px-5 py-2 rounded-input hover:bg-secondary transition-colors"
        >
          Guardar
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-300 mx-auto px-12 py-12 w-full">
        <div className="flex gap-16 items-start">

          {/* Izquierda */}
          <div className="flex flex-col gap-4 w-72 shrink-0">

            {/* Card del álbum */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <PortadaPlaceholder className="w-full aspect-square" iconSize="text-6xl" />
              <div className="p-4 flex flex-col gap-2">
                <p className="text-text font-heading font-bold text-base">{RESENA_EXISTENTE.album}</p>
                <p className="text-muted font-body text-sm">{RESENA_EXISTENTE.artista} · {RESENA_EXISTENTE.anio}</p>
                <span className="self-start px-3 py-0.5 bg-primary/20 text-primary font-body text-xs rounded-full">
                  Editando
                </span>
              </div>
            </div>

            {/* Detalles de la reseña */}
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
              <p className="text-text font-heading font-bold text-sm">Detalles de tu reseña</p>
              <div className="w-full h-px bg-border" />
              <div className="flex justify-between">
                <span className="text-muted font-body text-xs">Publicada</span>
                <span className="text-text font-body text-xs">{RESENA_EXISTENTE.publicada}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted font-body text-xs">Última edición</span>
                <span className="text-text font-body text-xs">{RESENA_EXISTENTE.ultimaEdicion}</span>
              </div>
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
                  rows={10}
                  className="w-full bg-input border border-border rounded-xl px-5 py-4 text-text font-body text-sm placeholder:text-muted resize-none focus:outline-none focus:border-primary transition-colors"
                />
                <span className="absolute bottom-3 right-4 text-muted font-body text-xs">
                  {texto.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-primary text-background font-heading font-medium text-sm px-8 py-3 rounded-input hover:bg-secondary transition-colors"
              >
                Guardar cambios
              </button>
              <button className="border border-error text-error font-body text-sm px-8 py-3 rounded-input hover:bg-error/10 transition-colors">
                Eliminar reseña
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-muted font-body text-sm hover:text-text transition-colors"
              >
                Cancelar
              </button>
            </div>

            <p className="text-muted font-body text-xs">
              Última edición: {RESENA_EXISTENTE.ultimaEdicion}
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}
