import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card rounded-2xl p-7 flex flex-col gap-6">

        {/* Cabecera */}
        <div className="text-center">
          <p className="text-primary font-heading font-bold text-xl mb-1">♪ MusicReviews</p>
          <p className="text-muted font-body text-sm">Tu diario de música y reseñas</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-text font-heading font-bold text-2xl">Crear cuenta</h1>

          {error && (
            <div className="bg-error/10 border border-error rounded-input px-4 py-3">
              <p className="text-error font-body text-sm">{error}</p>
            </div>
          )}

          <FormInput
            id="username"
            label="Nombre de usuario"
            type="text"
            placeholder="tu_usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <FormInput
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormInput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormInput
            id="confirm-password"
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            error={error === "Las contraseñas no coinciden"}
          />

          <button
            type="submit"
            disabled={cargando}
            className="w-full h-12 bg-primary text-background font-heading font-medium rounded-input hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        {/* Link a login */}
        <p className="text-center text-muted font-body text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline">Inicia sesión</Link>
        </p>

      </div>
    </main>
  );
}
