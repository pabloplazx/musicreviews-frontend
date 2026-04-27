import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock — vendrá del usuario autenticado via contexto/token
const USUARIO_INICIAL = {
  username: "pablo_musiclover",
  email: "pablo@email.com",
  bio: "Amante de la música desde siempre. Hip-hop, jazz y todo lo que suene bien.",
};

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(USUARIO_INICIAL.username);
  const [email, setEmail] = useState(USUARIO_INICIAL.email);
  const [bio, setBio] = useState(USUARIO_INICIAL.bio);

  return (
    <div className="bg-background min-h-screen flex flex-col">

      {/* Header especial */}
      <header className="bg-card border-b border-border px-12 py-4 flex items-center justify-between">
        <span className="text-primary font-heading font-bold text-lg">♪ MusicReviews</span>
        <h1 className="text-text font-heading font-bold text-lg absolute left-1/2 -translate-x-1/2">
          Editar perfil
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-background font-body text-sm font-medium px-5 py-2 rounded-input hover:bg-secondary transition-colors"
        >
          Guardar
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 py-10">
        <div className="w-full max-w-xl mx-auto px-6 flex flex-col gap-6">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center bg-card">
              <span className="text-primary text-3xl">♪</span>
            </div>
            <button className="text-primary font-body text-sm hover:underline transition-colors">
              Cambiar foto de perfil
            </button>
          </div>

          {/* Nombre de usuario */}
          <div className="flex flex-col gap-2">
            <label className="text-text font-body text-sm">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 bg-input border border-border rounded-xl px-4 text-text font-body text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Correo electrónico */}
          <div className="flex flex-col gap-2">
            <label className="text-text font-body text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-input border border-border rounded-xl px-4 text-text font-body text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Biografía */}
          <div className="flex flex-col gap-2">
            <label className="text-text font-body text-sm">Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-text font-body text-sm resize-none focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Seguridad */}
          <div className="flex flex-col gap-3">
            <h2 className="text-text font-heading font-bold text-lg">Seguridad</h2>
            <button className="w-full h-12 bg-input border border-border rounded-xl px-4 flex items-center justify-between text-text font-body text-sm hover:border-primary transition-colors">
              <span>Cambiar contraseña</span>
              <span className="text-muted">›</span>
            </button>
          </div>

          {/* Guardar cambios */}
          <button
            onClick={() => navigate(-1)}
            className="w-full h-12 bg-primary text-background font-heading font-medium text-sm rounded-input hover:bg-secondary transition-colors"
          >
            Guardar cambios
          </button>

          {/* Zona de peligro */}
          <div className="flex flex-col gap-3">
            <h2 className="text-error font-heading font-bold text-lg">Zona de peligro</h2>
            <button className="w-full h-12 border border-error text-error font-body text-sm rounded-input hover:bg-error/10 transition-colors">
              Desactivar cuenta
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
