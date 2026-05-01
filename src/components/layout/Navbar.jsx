import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  // Estado del drawer móvil. Se cierra al pulsar cualquier link o al hacer logout.
  const [menuAbierto, setMenuAbierto] = useState(false);

  function handleLogout() {
    setMenuAbierto(false);
    logout();
    navigate("/");
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" onClick={cerrarMenu} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <span className="text-primary font-heading font-bold text-xl">♪</span>
          <span className="text-primary font-heading font-bold text-xl">MusicReviews</span>
        </Link>

        {/* LINKS DE NAVEGACIÓN — solo desktop (≥lg) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-text hover:text-primary transition-colors">Inicio</Link>
          <Link to="/catalogo" className="text-text hover:text-primary transition-colors">Explorar</Link>
          <Link to="/rankings" className="text-text hover:text-primary transition-colors">Top Álbumes</Link>
          {usuario?.rol === "ADMIN" && (
            <Link to="/admin" className="text-text hover:text-primary transition-colors">Admin</Link>
          )}
        </nav>

        {/* BOTONES — versión desktop completa */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Buscador */}
          <Link to="/busqueda" className="text-muted hover:text-primary transition-colors" aria-label="Buscar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </Link>

          {usuario ? (
            <>
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

        {/* ACCIONES MÓVILES (<lg): buscador + avatar/login compacto + hamburguesa */}
        <div className="flex lg:hidden items-center gap-3">
          <Link to="/busqueda" onClick={cerrarMenu} className="text-muted hover:text-primary transition-colors" aria-label="Buscar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </Link>

          {usuario && (
            <Link
              to={`/perfil/${usuario.username}`}
              onClick={cerrarMenu}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label={`Perfil de ${usuario.username}`}
            >
              <span className="text-background font-heading font-bold text-sm">
                {usuario.username.charAt(0).toUpperCase()}
              </span>
            </Link>
          )}

          <button
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            className="text-text hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuAbierto
                ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              }
            </svg>
          </button>
        </div>

      </div>

      {/* DRAWER MÓVIL — visible solo cuando menuAbierto y por debajo de lg */}
      {menuAbierto && (
        <nav className="lg:hidden border-t border-border bg-card">
          <div className="max-w-300 mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            <Link to="/" onClick={cerrarMenu} className="text-text hover:text-primary transition-colors py-2">Inicio</Link>
            <Link to="/catalogo" onClick={cerrarMenu} className="text-text hover:text-primary transition-colors py-2">Explorar</Link>
            <Link to="/rankings" onClick={cerrarMenu} className="text-text hover:text-primary transition-colors py-2">Top Álbumes</Link>
            {usuario?.rol === "ADMIN" && (
              <Link to="/admin" onClick={cerrarMenu} className="text-text hover:text-primary transition-colors py-2">Admin</Link>
            )}

            <div className="border-t border-border my-2"></div>

            {usuario ? (
              <>
                <Link to="/favoritos" onClick={cerrarMenu} className="text-text hover:text-primary transition-colors py-2">
                  ♥ Mis favoritos
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-muted hover:text-primary transition-colors font-body py-2"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={cerrarMenu}
                  className="px-4 py-2 rounded-input border border-primary text-primary font-heading font-medium hover:bg-primary hover:text-background transition-colors text-center"
                >
                  Entrar
                </Link>
                <Link
                  to="/registro"
                  onClick={cerrarMenu}
                  className="px-4 py-2 rounded-input bg-primary text-background font-heading font-medium hover:bg-secondary transition-colors text-center"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
