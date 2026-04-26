import { Link } from "react-router-dom";
import FormInput from "../components/ui/FormInput";

export default function Registro() {
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
          <h1 className="text-text font-heading font-bold text-2xl">Crear cuenta</h1>

          <FormInput id="username" label="Nombre de usuario" type="text" placeholder="tu_usuario" />
          <FormInput id="email" label="Correo electrónico" type="email" placeholder="tu@email.com" />
          <FormInput id="password" label="Contraseña" type="password" placeholder="••••••••" />
          <FormInput id="confirm-password" label="Confirmar contraseña" type="password" placeholder="••••••••" />

          <button className="w-full h-12 bg-primary text-background font-heading font-medium rounded-input hover:bg-secondary transition-colors">
            Crear cuenta
          </button>
        </div>

        {/* Link a login */}
        <p className="text-center text-muted font-body text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline">Inicia sesión</Link>
        </p>

      </div>
    </main>
  );
}
