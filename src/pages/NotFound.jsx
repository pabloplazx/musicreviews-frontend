import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="bg-background min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-primary font-heading font-bold text-7xl sm:text-9xl lg:text-[10rem] leading-none">
        404
      </span>
      <h1 className="text-text font-heading font-bold text-2xl sm:text-3xl">Página no encontrada</h1>
      <p className="text-muted font-body text-sm">La página que buscas no existe o ha sido movida.</p>
      <Link
        to="/"
        className="mt-4 bg-primary text-background font-body text-sm font-medium px-10 py-3 rounded-input hover:bg-secondary transition-colors"
      >
        Ir al inicio
      </Link>
    </main>
  );
}
