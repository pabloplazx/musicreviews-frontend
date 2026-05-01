import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { actualizarUsuario } from "../services/usuarios";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const { usuario, token, actualizarUsuarioLocal } = useAuth();

  // El usuario logueado siempre está aquí porque la ruta está protegida.
  const [username, setUsername] = useState(usuario?.username ?? "");
  const [fotoPerfil, setFotoPerfil] = useState(usuario?.fotoPerfil ?? "");
  const [bio, setBio] = useState(usuario?.bio ?? "");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function handleGuardar() {
    setError("");
    setExito(false);
    setGuardando(true);
    try {
      const actualizado = await actualizarUsuario(
        usuario.id,
        { username, fotoPerfil: fotoPerfil || null, bio: bio || null },
        token
      );
      // El backend devuelve el usuario completo (sin password). Actualizamos
      // el contexto y localStorage para que el navbar refleje los cambios.
      // Mantenemos los campos que ya teníamos (rol, etc.) y sobrescribimos
      // los que vienen del backend.
      actualizarUsuarioLocal({ ...usuario, ...actualizado });
      setExito(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between gap-3 relative">
        <span className="text-primary font-heading font-bold text-lg shrink-0">♪ <span className="hidden sm:inline">MusicReviews</span></span>
        <h1 className="text-text font-heading font-bold text-base sm:text-lg lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          Editar perfil
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-muted font-body text-sm hover:text-primary transition-colors shrink-0"
        >
          Cancelar
        </button>
      </header>

      <main className="flex-1 py-8 sm:py-10">
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6 flex flex-col gap-6">

          {/* Avatar (preview) */}
          <div className="flex flex-col items-center gap-2 mb-2">
            {fotoPerfil
              ? <img src={fotoPerfil} alt="Vista previa" className="w-24 h-24 rounded-full object-cover border-2 border-primary" />
              : <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center bg-card">
                  <span className="text-primary text-3xl uppercase font-heading font-bold">
                    {username[0] ?? "?"}
                  </span>
                </div>
            }
          </div>

          {/* Mensaje de éxito o error */}
          {exito && (
            <div className="bg-primary/10 border border-primary rounded-xl px-4 py-3">
              <p className="text-primary font-body text-sm">Perfil actualizado correctamente.</p>
            </div>
          )}
          {error && (
            <div className="bg-error/10 border border-error rounded-xl px-4 py-3">
              <p className="text-error font-body text-sm">{error}</p>
            </div>
          )}

          {/* URL de foto de perfil */}
          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="text-text font-body text-sm">URL de foto de perfil</label>
            <input
              id="foto"
              type="url"
              value={fotoPerfil}
              onChange={(e) => setFotoPerfil(e.target.value)}
              placeholder="https://…"
              className="w-full h-12 bg-input border border-border rounded-xl px-4 text-text font-body text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-muted font-body text-xs">
              Pega la URL de una imagen pública. La subida desde el ordenador no está disponible todavía.
            </p>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-text font-body text-sm">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 bg-input border border-border rounded-xl px-4 text-text font-body text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Email — solo lectura */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-text font-body text-sm">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={usuario?.email ?? ""}
              disabled
              className="w-full h-12 bg-input border border-border rounded-xl px-4 text-muted font-body text-sm opacity-60 cursor-not-allowed"
            />
            <p className="text-muted font-body text-xs">El email no se puede modificar.</p>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-text font-body text-sm">Biografía</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-text font-body text-sm resize-none focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="w-full h-12 bg-primary text-background font-heading font-medium text-sm rounded-input hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {guardando ? "Guardando…" : "Guardar cambios"}
          </button>

        </div>
      </main>
    </div>
  );
}
