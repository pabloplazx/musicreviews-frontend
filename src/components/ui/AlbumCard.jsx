import { Link } from "react-router-dom";
import PortadaPlaceholder from "./PortadaPlaceholder";
import Estrellas from "./Estrellas";

export default function AlbumCard({ id = 1, posicion, album, artista, rating, portada }) {
  return (
    <Link to={`/album/${id}`} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors">
      <div className="relative">
        {portada
          ? <img src={portada} alt={album} className="w-full aspect-square object-cover" />
          : <PortadaPlaceholder className="w-full aspect-square" />
        }
        <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-background font-heading font-bold text-xs flex items-center justify-center">
          {posicion}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-text font-heading font-bold text-sm">{album}</p>
        <p className="text-muted font-body text-xs">{artista}</p>
        <Estrellas cantidad={rating} />
      </div>
    </Link>
  );
}
