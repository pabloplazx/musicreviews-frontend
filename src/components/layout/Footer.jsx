import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="max-w-300 mx-auto px-12 flex items-center justify-between">
        <p className="text-muted font-body text-sm">© 2026 MusicReviews — TFG DAM</p>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-muted font-body text-sm hover:text-text transition-colors">Inicio</Link>
          <Link to="/catalogo" className="text-muted font-body text-sm hover:text-text transition-colors">Explorar</Link>
          <Link to="/rankings" className="text-muted font-body text-sm hover:text-text transition-colors">Top Álbumes</Link>
          <Link to="/contacto" className="text-muted font-body text-sm hover:text-text transition-colors">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}
