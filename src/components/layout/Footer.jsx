import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <p className="text-muted font-body text-sm">© 2026 MusicReviews — TFG DAM</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/" className="text-muted font-body text-sm hover:text-text transition-colors">Inicio</Link>
          <Link to="/catalogo" className="text-muted font-body text-sm hover:text-text transition-colors">Explorar</Link>
          <Link to="/rankings" className="text-muted font-body text-sm hover:text-text transition-colors">Top Álbumes</Link>
          <Link to="/contacto" className="text-muted font-body text-sm hover:text-text transition-colors">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}
