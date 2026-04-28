import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-300 mx-auto px-12 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-primary font-heading font-bold text-xl">♪</span>
          <span className="text-primary font-heading font-bold text-xl">MusicReviews</span>
        </div>

        {/* LINKS DE NAVEGACIÓN */}
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-text hover:text-primary transition-colors">Inicio</Link>
          <Link to="/catalogo" className="text-text hover:text-primary transition-colors">Explorar</Link>
          <Link to="/rankings" className="text-text hover:text-primary transition-colors">Top Álbumes</Link>
        </nav>

        {/* BOTONES */}
        <div className="flex items-center gap-4">
          <Link to="/favoritos" className="text-muted hover:text-primary transition-colors">
            ♥
          </Link>
          <Link to="/busqueda" className="text-muted hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </Link>
          <Link to="/login" className="px-4 py-2 rounded-input border border-primary text-primary font-heading
          font-medium hover:bg-primary hover:text-background transition-colors">
            Entrar
          </Link>
          <Link to="/registro" className="px-4 py-2 rounded-input bg-primary text-background font-heading font-medium
        hover:bg-secondary transition-colors">
            Registrarse
          </Link>
          {/* Avatar mock — cuando haya auth, se mostrará solo si hay usuario logueado */}
          <Link to="/perfil/pablo_music" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="text-background font-heading font-bold text-sm">P</span>
          </Link>
        </div>

      </div>
    </header>
  )
}