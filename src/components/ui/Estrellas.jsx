function Estrella({ fill }) {
    if (fill === 1) return <span className="text-primary">★</span>;
    if (fill === 0) return <span className="text-muted">★</span>;
    return (
      <span className="relative inline-block">
        <span className="text-muted">★</span>
        <span className="absolute inset-0 overflow-hidden w-1/2 text-primary">★</span>
      </span>
    );
  }

  export default function Estrellas({ cantidad }) {
    const estrellas = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(cantidad)) return 1;
      if (i < cantidad) return 0.5;
      return 0;
    });

    return (
      <span className="text-sm flex">
        {estrellas.map((fill, i) => <Estrella key={i} fill={fill} />)}
      </span>
    );
  }