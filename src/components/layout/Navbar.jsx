// ─────────────────────────────────────────────────────────────
// NAVBAR — barra de navegación superior
// ─────────────────────────────────────────────────────────────
//
// ¿QUÉ ES UN COMPONENTE DE LAYOUT?
//   Un componente de layout define la estructura visual de la página,
//   no el contenido. El Navbar aparece en todas las pantallas y siempre
//   ocupa la misma posición: arriba del todo, fijo al hacer scroll.
//
// ESTRUCTURA DE ELEMENTOS:
//   <header>              → contenedor full-width (ocupa toda la pantalla)
//     <div>               → contenedor interior centrado (máx. 1200px)
//       <div>             → bloque LOGO (izquierda)
//       <nav>             → bloque LINKS (centro)
//       <div>             → bloque BOTONES (derecha)
//
//   justify-between en el div interior separa automáticamente
//   estos tres bloques: logo a la izquierda, botones a la derecha.
//
// TOKENS DEL DESIGN SYSTEM USADOS:
//   bg-card        → #0e1310  fondo de la navbar
//   border-border  → #223228  línea inferior sutil
//   text-primary   → #48a377  logo y hover de links
//   text-text      → #ebf0ed  color de links en reposo
//   bg-primary     → #48a377  fondo del botón "Registrarse"
//   bg-secondary   → #226846  hover del botón "Registrarse"
//   text-background→ #060907  texto oscuro sobre fondo verde
//   font-heading   → Space Grotesk (logo y botones)
//   rounded-input  → 10px de border-radius (botones)
//
// COMPORTAMIENTO HOVER:
//   Links          → text-text → text-primary (verde al pasar el ratón)
//   Botón Entrar   → sin relleno → relleno verde (bg-primary)
//   Botón Registro → verde → verde oscuro (bg-secondary)
//   transition-colors hace que todos estos cambios sean suaves
// ─────────────────────────────────────────────────────────────

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
        </div>

      </div>
    </header>
  )
}