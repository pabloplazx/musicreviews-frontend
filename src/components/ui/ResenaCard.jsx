import { Link } from "react-router-dom";
import PortadaPlaceholder from "./PortadaPlaceholder";
import Estrellas from "./Estrellas";

export default function ResenaCard({ id = 1, album, artista, puntuacion, texto, portada }) {
  return (
    <Link
      to={`/album/${id}`}
      className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors"
    >
      {/* Portada */}
      {portada
        ? <img src={portada} alt={album} className="w-full aspect-square object-cover" />
        : <PortadaPlaceholder className="w-full aspect-square" />
      }

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-text font-heading font-bold text-sm">{album}</p>
        <p className="text-muted font-body text-xs">{artista}</p>
        <Estrellas cantidad={puntuacion} />
        <p className="text-muted font-body text-xs italic mt-1 line-clamp-3">"{texto}"</p>
      </div>
    </Link>
  );
}
