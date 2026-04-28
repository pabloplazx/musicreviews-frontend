import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-300 mx-auto px-12 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-primary font-heading font-bold text-xl">♪</span>
          <span className="text-primary font-heading font-bold text-xl">MusicReviews</span>
        </Link>

        {/* LINKS DE NAVEGACIÓN */}
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-text hover:text-primary transition-colors">Inicio</Link>
          <Link to="/catalogo" className="text-text hover:text-primary transition-colors">Explorar</Link>
          <Link to="/rankings" className="text-text hover:text-primary transition-colors">Top Álbumes</Link>
          {usuario?.rol === "ADMIN" && (
            <Link to="/admin" className="text-text hover:text-primary transition-colors">Admin</Link>
          )}
        </nav>

        {/* BOTONES */}
        <div className="flex items-center gap-4">

          {/* Buscador: visible para todos */}
          <Link to="/busqueda" className="text-muted hover:text-primary transition-colors" aria-label="Buscar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </Link>

          {usuario ? (
            <>
              {/* Sesión activa: favoritos, avatar con inicial real, salir */}
              <Link to="/favoritos" className="text-muted hover:text-primary transition-colors" aria-label="Mis favoritos">
                ♥
              </Link>
              <Link
                to={`/perfil/${usuario.username}`}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label={`Perfil de ${usuario.username}`}
              >
                <span className="text-background font-heading font-bold text-sm">
                  {usuario.username.charAt(0).toUpperCase()}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-muted hover:text-primary transition-colors font-body text-sm"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              {/* Sin sesión: entrar / registrarse */}
              <Link
                to="/login"
                className="px-4 py-2 rounded-input border border-primary text-primary font-heading font-medium hover:bg-primary hover:text-background transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 rounded-input bg-primary text-background font-heading font-medium hover:bg-secondary transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}
