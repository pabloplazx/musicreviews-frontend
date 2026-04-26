import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import GenreChip from "../components/ui/GenreChip";
import SelectOrden from "../components/ui/SelectOrden";
import CatalogoCard from "../components/ui/CatalogoCard";
import Paginacion from "../components/ui/Paginacion";

const GENEROS = ["Todos", "Hip-Hop", "Rock", "Electronic", "R&B", "Pop", "Jazz", "Clásica"];

const OPCIONES_ORDEN = [
  { value: "mejor-valorados", label: "Mejor valorados" },
  { value: "recientes", label: "Más recientes" },
  { value: "az", label: "A → Z" },
];

const ALBUMS = [
  { id: 1, album: "To Pimp a Butterfly", artista: "K. Lamar", rating: 5.0, genero: "Hip-Hop" },
  { id: 2, album: "DAMN.", artista: "K. Lamar", rating: 4.8, genero: "Hip-Hop" },
  { id: 3, album: "Random Access Memories", artista: "Daft Punk", rating: 4.7, genero: "Electronic" },
  { id: 4, album: "Blonde", artista: "F. Ocean", rating: 4.6, genero: "R&B" },
  { id: 5, album: "Currents", artista: "T. Impala", rating: 4.5, genero: "Rock" },
  { id: 6, album: "GNX", artista: "K. Lamar", rating: 4.5, genero: "Hip-Hop" },
  { id: 7, album: "Chromakopia", artista: "Tyler", rating: 4.3, genero: "Hip-Hop" },
  { id: 8, album: "Igor", artista: "Tyler", rating: 4.4, genero: "Hip-Hop" },
  { id: 9, album: "Channel Orange", artista: "F. Ocean", rating: 4.7, genero: "R&B" },
  { id: 10, album: "Kid A", artista: "Radiohead", rating: 4.9, genero: "Rock" },
];

const POR_PAGINA = 10;

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [generoActivo, setGeneroActivo] = useState("Todos");
  const [orden, setOrden] = useState("mejor-valorados");
  const [pagina, setPagina] = useState(1);

  const albumsFiltrados = ALBUMS.filter((a) =>
    (generoActivo === "Todos" || a.genero === generoActivo) &&
    (a.album.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.artista.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const albumsOrdenados = [...albumsFiltrados].sort((a, b) => {
    if (orden === "mejor-valorados") return b.rating - a.rating;
    if (orden === "az") return a.album.localeCompare(b.album);
    return 0; // "recientes" lo ordenará el backend por fecha
  });

  const totalPaginas = Math.max(1, Math.ceil(albumsOrdenados.length / POR_PAGINA));
  const albumsPagina = albumsOrdenados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  function handleGenero(genero) {
    setGeneroActivo(genero);
    setPagina(1);
  }

  function handleBusqueda(e) {
    setBusqueda(e.target.value);
    setPagina(1);
  }

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Cabecera */}
        <div className="mb-6">
          <h1 className="text-text font-heading font-bold text-4xl">Catálogo</h1>
          <p className="text-muted font-body text-sm mt-1">1.248 álbumes</p>
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
            {GENEROS.map((g) => (
              <GenreChip
                key={g}
                label={g}
                active={generoActivo === g}
                onClick={() => handleGenero(g)}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-muted font-body text-sm">Ordenar por:</span>
            <SelectOrden
              opciones={OPCIONES_ORDEN}
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de álbumes / estado vacío */}
        {albumsPagina.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-primary text-6xl">♪</span>
            <p className="text-text font-heading font-bold text-2xl">Sin resultados</p>
            <p className="text-muted font-body text-sm text-center">
              No encontramos álbumes con ese criterio.<br />Prueba con otro género o término.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-6 mb-10">
            {albumsPagina.map((a) => (
              <CatalogoCard
                key={a.id}
                album={a.album}
                artista={a.artista}
                rating={a.rating}
                genero={a.genero}
              />
            ))}
          </div>
        )}

        {/* Paginación */}
        <div className="flex justify-center">
          <Paginacion
            paginaActual={pagina}
            totalPaginas={totalPaginas}
            onPageChange={setPagina}
          />
        </div>

      </div>
    </main>
  );
}
