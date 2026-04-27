import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";

const STATS = [
  { valor: "1.248", label: "Álbumes" },
  { valor: "340", label: "Artistas" },
  { valor: "521", label: "Usuarios" },
  { valor: "12", label: "Inactivos", error: true },
];

const ACCIONES_CONTENIDO = [
  { icono: "+", titulo: "Añadir álbum", subtitulo: "Buscar en Spotify e importar" },
  { icono: "+", titulo: "Añadir artista", subtitulo: "Crear ficha de artista" },
  { icono: "✏", titulo: "Editar álbum", subtitulo: "Modificar datos existentes" },
  { icono: "✏", titulo: "Editar artista", subtitulo: "Modificar datos existentes" },
];

const USUARIOS = [
  { username: "pablo_m", email: "pablo@email.com", activo: true },
  { username: "sara_rv", email: "sara@email.com", activo: true },
  { username: "old_user", email: "old@email.com", activo: false },
];

export default function PanelAdmin() {
  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        <h1 className="text-text font-heading font-bold text-4xl mb-8">Panel de administración</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl py-6 flex flex-col items-center gap-1">
              <span className={`font-heading font-bold text-3xl ${s.error ? "text-error" : "text-primary"}`}>
                {s.valor}
              </span>
              <span className="text-muted font-body text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Dos columnas */}
        <div className="grid grid-cols-2 gap-10">

          {/* Gestión de contenido */}
          <div>
            <SectionTitle>Gestión de contenido</SectionTitle>
            <div className="flex flex-col gap-3">
              {ACCIONES_CONTENIDO.map((a) => (
                <button
                  key={a.titulo}
                  className="bg-card border border-border rounded-xl px-4 py-4 flex items-center gap-4 hover:border-primary transition-colors w-full text-left"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">
                    {a.icono}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text font-body text-sm font-medium">{a.titulo}</p>
                    <p className="text-muted font-body text-xs">{a.subtitulo}</p>
                  </div>
                  <span className="text-muted">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Derecha: usuarios + moderación */}
          <div className="flex flex-col gap-8">

            {/* Gestión de usuarios */}
            <div>
              <SectionTitle>Gestión de usuarios</SectionTitle>
              <div className="flex flex-col gap-3">
                {USUARIOS.map((u) => (
                  <div
                    key={u.username}
                    className="bg-card border border-border rounded-xl px-4 py-4 flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-heading font-bold flex items-center justify-center shrink-0 uppercase">
                      {u.username[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text font-body text-sm font-medium">{u.username}</p>
                      <p className="text-muted font-body text-xs">{u.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-body font-medium ${
                      u.activo
                        ? "bg-primary/20 text-primary"
                        : "bg-error/20 text-error"
                    }`}>
                      {u.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderación */}
            <div>
              <SectionTitle>Moderación</SectionTitle>
              <button className="w-full bg-card border border-border rounded-xl px-4 py-4 flex items-center justify-between hover:border-primary transition-colors">
                <span className="text-text font-body text-sm">Revisar reseñas reportadas</span>
                <span className="text-muted">›</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
