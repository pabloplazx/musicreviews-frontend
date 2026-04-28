import { useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import GenreChip from "../components/ui/GenreChip";
import CatalogoCard from "../components/ui/CatalogoCard";
import AlbumRow from "../components/ui/AlbumRow";
import SectionTitle from "../components/ui/SectionTitle";
import { getAlbumes } from "../services/albumes";
import { getTopAlbumes, getAlbumesRecientes } from "../services/estadisticas";

// Los chips son decoración por ahora: el backend solo soporta búsqueda por
// título de álbum. Buscar artistas o usuarios requiere endpoints adicionales.
const FILTROS = ["Todo", "Álbumes", "Artistas", "Usuarios"];

export default function Busqueda() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todo");

  // Datos de la pantalla "inicio" (sin búsqueda)
  const [tendencias, setTendencias] = useState(null);
  const [recientes, setRecientes] = useState(null);

  // Datos de los resultados de búsqueda
  const [resultados, setResultados] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar tendencias + recientes una sola vez al montar
  useEffect(() => {
    Promise.all([getTopAlbumes(), getAlbumesRecientes()])
      .then(([t, r]) => {
        setTendencias(t.slice(0, 4));
        setRecientes(r.slice(0, 3));
      })
      .catch((err) => setError(err.message));
  }, []);

  // Cuando el usuario escribe, debounce 300ms y consultar el backend
  useEffect(() => {
    if (!busqueda) {
      setResultados(null);
      return;
    }
    setBuscando(true);
    const timeoutId = setTimeout(() => {
      getAlbumes({ titulo: busqueda, page: 0, size: 12 })
        .then((res) => {
          setResultados(res.content);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setBuscando(false));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [busqueda]);

  const mostrarInicio = filtroActivo === "Todo" && busqueda === "";

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        <h1 className="text-text font-heading font-bold text-4xl mb-6">Buscar</h1>

        <div className="mb-5">
          <SearchBar
            placeholder="Buscar álbumes, artistas, usuarios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Chips de filtro (decoración) */}
        <div className="flex items-center gap-2 mb-10">
          {FILTROS.map((f) => (
            <GenreChip
              key={f}
              label={f}
              active={filtroActivo === f}
              onClick={() => setFiltroActivo(f)}
            />
          ))}
        </div>

        {error && (
          <p className="text-error font-body py-8">No se pudo cargar: {error}</p>
        )}

        {/* Resultados de búsqueda */}
        {!error && busqueda && (
          <div className="mb-10">
            {buscando && !resultados && <p className="text-muted font-body">Buscando…</p>}
            {resultados && resultados.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <span className="text-primary text-6xl">♪</span>
                <p className="text-text font-heading font-bold text-2xl">Sin resultados</p>
                <p className="text-muted font-body text-sm text-center">
                  No encontramos nada para "{busqueda}".<br />Prueba con otro término.
                </p>
              </div>
            )}
            {resultados && resultados.length > 0 && (
              <div className={`grid grid-cols-4 gap-6 transition-opacity ${buscando ? "opacity-50" : ""}`}>
                {resultados.map((a) => (
                  <CatalogoCard
                    key={a.id}
                    id={a.id}
                    album={a.titulo}
                    artista={a.artista?.nombre}
                    genero={a.genero}
                    portada={a.portada}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inicio: Tendencias + Recientes */}
        {!error && mostrarInicio && (
          <>
            <div className="mb-10">
              <SectionTitle>Tendencias</SectionTitle>
              {!tendencias && <p className="text-muted font-body">Cargando…</p>}
              {tendencias && (
                <div className="grid grid-cols-4 gap-6">
                  {tendencias.map((item) => (
                    <CatalogoCard
                      key={item.album.id}
                      id={item.album.id}
                      album={item.album.titulo}
                      artista={item.album.artista?.nombre}
                      rating={item.valor}
                      portada={item.album.portada}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <SectionTitle>Añadidos recientemente</SectionTitle>
              {!recientes && <p className="text-muted font-body">Cargando…</p>}
              {recientes && (
                <div className="flex flex-col gap-3">
                  {recientes.map((a) => (
                    <AlbumRow key={a.id} id={a.id} album={a.titulo} artista={a.artista?.nombre} portada={a.portada} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
