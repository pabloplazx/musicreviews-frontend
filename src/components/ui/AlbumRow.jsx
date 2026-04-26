import PortadaPlaceholder from "./PortadaPlaceholder";

export default function AlbumRow({ album, artista, portada }) {
  return (
    <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-4 py-3">
      {portada
        ? <img src={portada} alt={album} className="w-10 h-10 rounded-lg object-cover shrink-0" />
        : <PortadaPlaceholder className="w-10 h-10 rounded-lg shrink-0" />
      }
      <p className="text-text font-body text-sm truncate">
        {album} <span className="text-muted">— {artista}</span>
      </p>
    </div>
  );
}
