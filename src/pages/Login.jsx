import { Link } from "react-router-dom";
import FormInput from "../components/ui/FormInput";

// Cambia a true para simular el estado de error del Figma mientras no hay backend
const error = false;

export default function Login() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card rounded-2xl p-7 flex flex-col gap-6">

        {/* Cabecera */}
        <div className="text-center">
          <p className="text-primary font-heading font-bold text-xl mb-1">♪ MusicReviews</p>
          <p className="text-muted font-body text-sm">Tu diario de música y reseñas</p>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-5">
          <h1 className="text-text font-heading font-bold text-2xl">Iniciar sesión</h1>

          {/* Banner de error */}
          {error && (
            <div className="bg-error/10 border border-error rounded-input px-4 py-3">
              <p className="text-error font-body text-sm">Credenciales incorrectas. Inténtalo de nuevo.</p>
            </div>
          )}

          <FormInput id="email" label="Correo electrónico" type="email" placeholder="tu@email.com" error={error} />
          <div className="flex flex-col gap-1">
            <FormInput id="password" label="Contraseña" type="password" placeholder="••••••••" error={error} />
            <Link to="#" className="text-primary font-body text-xs hover:underline self-start">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button className="w-full h-12 bg-primary text-background font-heading font-medium rounded-input hover:bg-secondary transition-colors">
            Iniciar sesión
          </button>
        </div>

        {/* Link a registro */}
        <p className="text-center text-muted font-body text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-primary hover:underline">Regístrate</Link>
        </p>

      </div>
    </main>
  );
}
