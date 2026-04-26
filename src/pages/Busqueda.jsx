import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import GenreChip from "../components/ui/GenreChip";
import CatalogoCard from "../components/ui/CatalogoCard";
import AlbumRow from "../components/ui/AlbumRow";
import SectionTitle from "../components/ui/SectionTitle";

const FILTROS = ["Todo", "Álbumes", "Artistas", "Usuarios"];

const TENDENCIAS = [
  { id: 1, album: "Random Access Memories", artista: "Daft Punk", rating: 9.2 },
  { id: 2, album: "To Pimp a Butterfly", artista: "Kendrick Lamar", rating: 9.5 },
  { id: 3, album: "Currents", artista: "Tame Impala", rating: 8.8 },
  { id: 4, album: "Blonde", artista: "Frank Ocean", rating: 9.1 },
];

const RECIENTES = [
  { id: 1, album: "GNX", artista: "Kendrick Lamar" },
  { id: 2, album: "Chromakopia", artista: "Tyler, the Creator" },
  { id: 3, album: "Hit Me Hard and Soft", artista: "Billie Eilish" },
];

export default function Busqueda() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todo");

  const mostrarInicio = filtroActivo === "Todo" && busqueda === "";
  const mostrarSinResultados = busqueda !== "";

  return (
    <main className="bg-background min-h-screen py-10">
      <div className="max-w-300 mx-auto px-12">

        {/* Título */}
        <h1 className="text-text font-heading font-bold text-4xl mb-6">Buscar</h1>

        {/* Barra de búsqueda */}
        <div className="mb-5">
          <SearchBar
            placeholder="Buscar álbumes, artistas, usuarios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Chips de filtro */}
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

        {/* Sin resultados */}
        {mostrarSinResultados && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-primary text-6xl">♪</span>
            <p className="text-text font-heading font-bold text-2xl">Sin resultados</p>
            <p className="text-muted font-body text-sm text-center">
              No encontramos nada para "{busqueda}".<br />Prueba con otro término.
            </p>
          </div>
        )}

        {/* Contenido por defecto: solo cuando filtro = Todo y búsqueda vacía */}
        {mostrarInicio && (
          <>
            <div className="mb-10">
              <SectionTitle>Tendencias</SectionTitle>
              <div className="grid grid-cols-4 gap-6">
                {TENDENCIAS.map((a) => (
                  <CatalogoCard
                    key={a.id}
                    album={a.album}
                    artista={a.artista}
                    rating={a.rating}
                  />
                ))}
              </div>
            </div>

            <div>
              <SectionTitle>Añadidos recientemente</SectionTitle>
              <div className="flex flex-col gap-3">
                {RECIENTES.map((a) => (
                  <AlbumRow key={a.id} album={a.album} artista={a.artista} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
