export default function Paginacion({ paginaActual, totalPaginas, onPageChange }) {
  const btnBase = "w-9 h-9 flex items-center justify-center rounded-lg font-body text-sm transition-colors";
  const btnActivo = "bg-primary text-background";
  const btnInactivo = "bg-card border border-border text-text hover:border-primary hover:text-primary";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        className={`${btnBase} ${btnInactivo} disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ←
      </button>

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => {
        const cercana = pagina === 1 || pagina === totalPaginas || Math.abs(pagina - paginaActual) <= 1;
        if (!cercana) {
          if (pagina === 2 || pagina === totalPaginas - 1) {
            return <span key={pagina} className="text-muted font-body text-sm">...</span>;
          }
          return null;
        }
        return (
          <button
            key={pagina}
            onClick={() => onPageChange(pagina)}
            className={`${btnBase} ${pagina === paginaActual ? btnActivo : btnInactivo}`}
          >
            {pagina}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className={`${btnBase} ${btnInactivo} disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        →
      </button>
    </div>
  );
}
