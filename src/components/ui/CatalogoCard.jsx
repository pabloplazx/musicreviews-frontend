import PortadaPlaceholder from "./PortadaPlaceholder";

export default function CatalogoCard({ album, artista, rating, genero, portada }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="relative">
        {portada
          ? <img src={portada} alt={album} className="w-full aspect-square object-cover" />
          : <PortadaPlaceholder className="w-full aspect-square" />
        }
        {genero && (
          <span className="absolute top-2 right-2 bg-card border border-primary text-primary font-body text-xs px-2 py-0.5 rounded-full">
            {genero}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-text font-heading font-bold text-sm truncate">{album}</p>
        <p className="text-muted font-body text-xs truncate">{artista}</p>
        <p className="text-primary font-body text-xs">★ {rating.toFixed(1)}</p>
      </div>
    </div>
  );
}
