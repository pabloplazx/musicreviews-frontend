import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import { useAuth } from "../context/AuthContext";
import { getResumen, getActividadReciente } from "../services/estadisticas";
import { getUsuarios, cambiarEstadoActivo } from "../services/usuarios";
import { crearArtista } from "../services/artistas";
import { borrarResena } from "../services/resenas";

const ARTISTA_VACIO = { nombre: "", foto: "", biografia: "", genero: "", pais: "" };

export default function PanelAdmin() {
  // La ruta está protegida por <RutaAdmin>; aquí siempre hay sesión y rol ADMIN.
  const { token } = useAuth();

  const [resumen, setResumen] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [actividad, setActividad] = useState(null);
  const [error, setError] = useState(null);

  // Toggle activar/desactivar usuario
  const [cambiandoActivoId, setCambiandoActivoId] = useState(null);

  // Borrar reseña
  const [borrandoResenaId, setBorrandoResenaId] = useState(null);

  // Formulario de nuevo artista
  const [nuevoArtista, setNuevoArtista] = useState(ARTISTA_VACIO);
  const [creandoArtista, setCreandoArtista] = useState(false);
  const [errorArtista, setErrorArtista] = useState("");
  const [okArtista, setOkArtista] = useState("");

  // Carga inicial: 3 fetches en paralelo
  useEffect(() => {
    Promise.all([getResumen(), getUsuarios(token), getActividadReciente()])
      .then(([r, u, a]) => {
        setResumen(r);
        setUsuarios(u);
        setActividad(a);
      })
      .catch((err) => setError(err.message));
  }, [token]);

  const totalInactivos = usuarios ? usuarios.filter((u) => !u.activo).length : null;

  async function handleToggleActivo(usuario) {
    setCambiandoActivoId(usuario.id);
    try {
      const actualizado = await cambiarEstadoActivo(usuario.id, !usuario.activo, token);
      setUsuarios((prev) => prev.map((u) => (u.id === usuario.id ? actualizado : u)));
    } catch (err) {
      setError(err.message);
    } finally {
      setCambiandoActivoId(null);
    }
  }

  async function handleBorrarResena(resena) {
    if (!window.confirm(`¿Borrar la reseña de @${resena.usuario.username} sobre "${resena.album.titulo}"?`)) return;
    setBorrandoResenaId(resena.id);
    try {
      await borrarResena(resena.id, token);
      setActividad((prev) => prev.filter((r) => r.id !== resena.id));
      // Refrescar contador del resumen
      setResumen((prev) => prev && { ...prev, totalResenas: Math.max(0, prev.totalResenas - 1) });
    } catch (err) {
      setError(err.message);
    } finally {
      setBorrandoResenaId(null);
    }
  }

  async function handleCrearArtista(e) {
    e.preventDefault();
    setErrorArtista("");
    setOkArtista("");
    if (!nuevoArtista.nombre.trim()) {
      setErrorArtista("El nombre es obligatorio.");
      return;
    }
    setCreandoArtista(true);
    try {
      const creado = await crearArtista(
        {
          nombre: nuevoArtista.nombre.trim(),
          foto: nuevoArtista.foto || null,
          biografia: nuevoArtista.biografia || null,
          genero: nuevoArtista.genero || null,
          pais: nuevoArtista.pais || null,
        },
        token
      );
      setOkArtista(`Artista "${creado.nombre}" creado con id ${creado.id}.`);
      setNuevoArtista(ARTISTA_VACIO);
      setResumen((prev) => prev && { ...prev, totalArtistas: prev.totalArtistas + 1 });
    } catch (err) {
      setErrorArtista(err.message);
    } finally {
      setCreandoArtista(false);
    }
  }

  if (error && !resumen) {
    return (
      <main className="bg-background min-h-screen py-20 text-center">
        <p className="text-error font-body">No se pudo cargar el panel: {error}</p>
        <Link to="/" className="text-primary hover:underline">← Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen py-8 sm:py-10">
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-12">

        <h1 className="text-text font-heading font-bold text-3xl sm:text-4xl mb-8">Panel de administración</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Álbumes", valor: resumen?.totalAlbumes },
            { label: "Artistas", valor: resumen?.totalArtistas },
            { label: "Reseñas", valor: resumen?.totalResenas },
            { label: "Usuarios", valor: resumen?.totalUsuarios },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl py-5 flex flex-col items-center gap-1">
              <span className="text-primary font-heading font-bold text-3xl">{s.valor ?? "—"}</span>
              <span className="text-muted font-body text-sm">{s.label}</span>
            </div>
          ))}
        </div>
        {/* Card extra: inactivos calculado en cliente filtrando la lista de usuarios */}
        <div className="bg-card border border-border rounded-xl py-3 flex items-center justify-center gap-3 mb-10">
          <span className={`font-heading font-bold text-xl ${totalInactivos > 0 ? "text-error" : "text-muted"}`}>
            {totalInactivos ?? "—"}
          </span>
          <span className="text-muted font-body text-sm">cuentas desactivadas</span>
        </div>

        {error && resumen && (
          <p className="text-error font-body mb-4">Aviso: {error}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10">

          {/* Columna izquierda: gestión de usuarios */}
          <section>
            <SectionTitle>Gestión de usuarios</SectionTitle>
            {!usuarios && <p className="text-muted font-body py-4">Cargando usuarios…</p>}
            {usuarios && usuarios.length === 0 && <p className="text-muted font-body">Sin usuarios.</p>}
            {usuarios && usuarios.length > 0 && (
              <div className="flex flex-col gap-2">
                {usuarios.map((u) => (
                  <div key={u.id} className="bg-card border border-border rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-background font-heading font-bold uppercase">{u.username[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/perfil/${u.username}`} className="text-text font-body text-sm font-medium hover:text-primary transition-colors block truncate">
                        @{u.username}
                      </Link>
                      <p className="text-muted font-body text-xs truncate">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <span className={`font-body text-xs px-2 py-0.5 rounded-full ${
                        u.activo ? "bg-primary/20 text-primary" : "bg-error/20 text-error"
                      }`}>
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                      <span className="font-body text-xs px-2 py-0.5 rounded-full bg-card border border-border text-muted">
                        {u.rol}
                      </span>
                      <button
                        onClick={() => handleToggleActivo(u)}
                        disabled={cambiandoActivoId === u.id}
                        className={`font-body text-xs px-3 py-1.5 rounded-input border transition-colors disabled:opacity-50 ${
                          u.activo
                            ? "border-error text-error hover:bg-error/10"
                            : "border-primary text-primary hover:bg-primary/10"
                        }`}
                      >
                        {cambiandoActivoId === u.id ? "…" : u.activo ? "Desactivar" : "Activar"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Columna derecha: crear artista */}
          <section>
            <SectionTitle>Nuevo artista</SectionTitle>
            <form onSubmit={handleCrearArtista} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">

              {okArtista && (
                <div className="bg-primary/10 border border-primary rounded-input px-3 py-2">
                  <p className="text-primary font-body text-sm">{okArtista}</p>
                </div>
              )}
              {errorArtista && (
                <div className="bg-error/10 border border-error rounded-input px-3 py-2">
                  <p className="text-error font-body text-sm">{errorArtista}</p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="art-nombre" className="text-text font-body text-xs">Nombre *</label>
                <input
                  id="art-nombre"
                  type="text"
                  value={nuevoArtista.nombre}
                  onChange={(e) => setNuevoArtista({ ...nuevoArtista, nombre: e.target.value })}
                  required
                  className="h-10 bg-input border border-border rounded-input px-3 text-text font-body text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="art-foto" className="text-text font-body text-xs">URL de foto</label>
                <input
                  id="art-foto"
                  type="url"
                  value={nuevoArtista.foto}
                  onChange={(e) => setNuevoArtista({ ...nuevoArtista, foto: e.target.value })}
                  placeholder="https://…"
                  className="h-10 bg-input border border-border rounded-input px-3 text-text font-body text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="art-genero" className="text-text font-body text-xs">Género</label>
                  <input
                    id="art-genero"
                    type="text"
                    value={nuevoArtista.genero}
                    onChange={(e) => setNuevoArtista({ ...nuevoArtista, genero: e.target.value })}
                    className="h-10 bg-input border border-border rounded-input px-3 text-text font-body text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="art-pais" className="text-text font-body text-xs">País</label>
                  <input
                    id="art-pais"
                    type="text"
                    value={nuevoArtista.pais}
                    onChange={(e) => setNuevoArtista({ ...nuevoArtista, pais: e.target.value })}
                    className="h-10 bg-input border border-border rounded-input px-3 text-text font-body text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="art-bio" className="text-text font-body text-xs">Biografía</label>
                <textarea
                  id="art-bio"
                  rows={3}
                  value={nuevoArtista.biografia}
                  onChange={(e) => setNuevoArtista({ ...nuevoArtista, biografia: e.target.value })}
                  className="bg-input border border-border rounded-input px-3 py-2 text-text font-body text-sm resize-none focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={creandoArtista}
                className="self-start bg-primary text-background font-body text-sm font-medium px-5 py-2 rounded-input hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {creandoArtista ? "Creando…" : "Crear artista"}
              </button>

              <p className="text-muted font-body text-xs">
                La creación de álbumes requiere seleccionar un artista existente y otros campos —
                queda fuera del alcance del panel. Los álbumes nuevos se cargan vía importación
                desde Spotify (<code className="bg-input px-1 py-0.5 rounded">GET /api/spotify/importar</code>).
              </p>
            </form>
          </section>

        </div>

        {/* Moderación de reseñas */}
        <section>
          <SectionTitle>Moderación de reseñas (últimas 10)</SectionTitle>
          {!actividad && <p className="text-muted font-body py-4">Cargando…</p>}
          {actividad && actividad.length === 0 && <p className="text-muted font-body">Sin reseñas para moderar.</p>}
          {actividad && actividad.length > 0 && (
            <div className="flex flex-col gap-2">
              {actividad.map((r) => (
                <div key={r.id} className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-text font-body text-sm">
                      <Link to={`/perfil/${r.usuario.username}`} className="text-primary hover:underline">
                        @{r.usuario.username}
                      </Link>
                      <span className="text-muted"> reseñó </span>
                      <Link to={`/album/${r.album.id}`} className="text-text hover:text-primary transition-colors">
                        "{r.album.titulo}"
                      </Link>
                      <span className="text-muted"> con {r.puntuacion.toFixed(1)}★</span>
                    </p>
                    {r.comentario && (
                      <p className="text-muted font-body text-xs italic truncate">"{r.comentario}"</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleBorrarResena(r)}
                    disabled={borrandoResenaId === r.id}
                    className="font-body text-xs px-3 py-1.5 rounded-input border border-error text-error hover:bg-error/10 transition-colors disabled:opacity-50 shrink-0 self-start sm:self-auto"
                  >
                    {borrandoResenaId === r.id ? "…" : "Borrar"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
