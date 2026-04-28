import { useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import GenreChip from "../components/ui/GenreChip";
import SelectOrden from "../components/ui/SelectOrden";
import CatalogoCard from "../components/ui/CatalogoCard";
import Paginacion from "../components/ui/Paginacion";
import { getAlbumes } from "../services/albumes";
import { getGeneros } from "../services/estadisticas";

// El backend acepta sort=az|za|recientes|antiguos en /api/albumes.
// "Mejor valorados" requeriría agregar reseñas — fuera de alcance.
const OPCIONES_ORDEN = [
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "recientes", label: "Más recientes" },
  { value: "antiguos", label: "Más antiguos" },
];

const POR_PAGINA = 10;

export default function Catalogo() {
  // Inputs del usuario
  const [busqueda, setBusqueda] = useState("");
  const [generoActivo, setGeneroActivo] = useState("Todos");
  const [orden, setOrden] = useState("az");
  const [pagina, setPagina] = useState(1); // 1-based en la UI, se convierte a 0-based en el fetch

  // Datos del backend
  const [generos, setGeneros] = useState(null);
  const [datos, setDatos] = useState(null); // { content, page: { totalPages, ... } }
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Cargar géneros una sola vez al montar. Los 8 con más álbumes + "Todos".
  useEffect(() => {
    getGeneros()
      .then((arr) => {
        const top = arr
          .filter((g) => g.genero) // descartar género null
          .slice(0, 8)
          .map((g) => g.genero);
        setGeneros(["Todos", ...top]);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Cargar álbumes cuando cambien los filtros / página. Con debounce de 300ms
  // para no spamear peticiones al backend mientras el usuario escribe.
  useEffect(() => {
    setCargando(true);
    const timeoutId = setTimeout(() => {
      getAlbumes({
        page: pagina - 1,
        size: POR_PAGINA,
        // q busca tanto en título de álbum como en nombre de artista — más útil para el usuario.
        q: busqueda || undefined,
        genero: generoActivo !== "Todos" ? generoActivo : undefined,
        sort: orden,
      })
        .then((res) => {
          setDatos(res);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setCargando(false));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [busqueda, generoActivo, orden, pagina]);

  function handleGenero(genero) {
    setGeneroActivo(genero);
    setPagina(1);
  }

  function handleBusqueda(e) {
    setBusqueda(e.target.value);
    setPagina(1);
  }

  const albumes = datos?.content ?? [];
  const totalPaginas = datos?.page?.totalPages ?? 1;
  const totalElementos = datos?.page?.totalElements ?? 0;

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Cabecera */}
        <div className="mb-6">
          <h1 className="text-text font-heading font-bold text-4xl">Catálogo</h1>
          <p className="text-muted font-body text-sm mt-1">
            {totalElementos > 0 ? `${totalElementos} álbumes` : "—"}
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-5">
          <SearchBar
            placeholder="Buscar álbumes, artistas..."
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>

        {/* Chips de género + selector orden */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {generos
              ? generos.map((g) => (
                  <GenreChip
                    key={g}
                    label={g}
                    active={generoActivo === g}
                    onClick={() => handleGenero(g)}
                  />
                ))
              : <span className="text-muted font-body text-sm">Cargando géneros…</span>}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-muted font-body text-sm">Ordenar por:</span>
            <SelectOrden
              opciones={OPCIONES_ORDEN}
              value={orden}
              onChange={(e) => { setOrden(e.target.value); setPagina(1); }}
            />
          </div>
        </div>

        {/* Estado de error */}
        {error && (
          <p className="text-error font-body py-8">No se pudieron cargar los álbumes: {error}</p>
        )}

        {/* Grid de álbumes / cargando / vacío */}
        {!error && cargando && !datos && (
          <p className="text-muted font-body py-8">Cargando álbumes…</p>
        )}
        {!error && datos && albumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-primary text-6xl">♪</span>
            <p className="text-text font-heading font-bold text-2xl">Sin resultados</p>
            <p className="text-muted font-body text-sm text-center">
              No encontramos álbumes con ese criterio.<br />Prueba con otro género o término.
            </p>
          </div>
        )}
        {!error && albumes.length > 0 && (
          <div className={`grid grid-cols-5 gap-6 mb-10 transition-opacity ${cargando ? "opacity-50" : ""}`}>
            {albumes.map((a) => (
              <CatalogoCard
                key={a.id}
                id={a.id}
                album={a.titulo}
                artista={a.artista?.nombre}
                rating={null}
                genero={a.genero}
                portada={a.portada}
              />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex justify-center">
            <Paginacion
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onPageChange={setPagina}
            />
          </div>
        )}

      </div>
    </main>
  );
}
