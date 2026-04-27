import { useState } from "react";

export default function EstrellasInteractivas({ valor, onChange }) {
  const [hover, setHover] = useState(null);

  function getValor(i, mitad) {
    return mitad ? i + 0.5 : i + 1;
  }

  function handleMouseMove(e, i) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mitad = e.clientX - rect.left < rect.width / 2;
    setHover(getValor(i, mitad));
  }

  function handleClick(e, i) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mitad = e.clientX - rect.left < rect.width / 2;
    onChange(getValor(i, mitad));
  }

  const activo = hover ?? valor;

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
      {Array.from({ length: 5 }, (_, i) => {
        const llena = activo >= i + 1;
        const media = !llena && activo >= i + 0.5;
        return (
          <span
            key={i}
            className="relative text-4xl cursor-pointer select-none"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onClick={(e) => handleClick(e, i)}
          >
            {media ? (
              <>
                <span className="text-muted">★</span>
                <span className="absolute inset-0 overflow-hidden w-1/2 text-primary">★</span>
              </>
            ) : (
              <span className={llena ? "text-primary" : "text-muted"}>★</span>
            )}
          </span>
        );
      })}
      <span className="text-text font-heading font-bold text-lg ml-2">
        {valor > 0 ? `${valor} / 5` : "— / 5"}
      </span>
    </div>
  );
}
