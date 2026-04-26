// max-w-300 ancho máximo que puede tener
// mx-auto centra el contenedor
// px-12 padding
// flex poner los hijos en fila
// items-center centrar
// justify-between
// gap-12
//
// DISEÑOS H1
/*
  - text-text → color del texto (el blanco/crema #ebf0ed de tu design system)
  - font-heading → fuente Space Grotesk (la que tienes definida en index.css)
  - font-bold → negrita
  - text-6xl → tamaño grande (60px)
  - leading-tight → reduce el espacio entre líneas, para que "Descubre. Escucha. Opina." quede compacto
  - mb-4 → margen abajo de 16px, para separarlo del subtítulo que vendrá después
*/
// SUBTITULO DEL HERO
/*
  - text-muted → color gris apagado (el #78908a de tu design system)
  - font-body → fuente Outfit (la fuente de texto normal)
  - text-base → tamaño normal (16px)
  - mb-8 → margen abajo de 32px, para separarlo del botón que viene después
*/
// BOTÓN
/*
  - inline-flex items-center gap-2 → hace que el texto y la flecha queden en línea y centrados
  - bg-primary → fondo verde (#48a377)
  - text-background → texto oscuro (#060907) para contrastar con el verde
  - font-heading font-medium → Space Grotesk en peso medio
  - px-6 py-3 → padding horizontal y vertical del botón
  - rounded-[10px] → bordes redondeados (igual que los botones del Navbar)
  - hover:bg-secondary → al pasar el ratón, verde más oscuro
  - transition-colors → el cambio de color es suave
*/

import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import PortadaPlaceholder from "../components/ui/PortadaPlaceholder";
import Estrellas from "../components/ui/Estrellas";
import ResenaCard from "../components/ui/ResenaCard";
import AlbumCard from "../components/ui/AlbumCard";

export default function Inicio() {
  return (
    <main>
      <section className="py-20 bg-card">
        <div className="max-w-300 mx-auto px-12 flex items-center justify-between gap-12">
          {/* Columna izquierda */}
          <div>
            <h1 className="text-text font-heading font-bold text-6xl leading-tight mb-4">Desubre. <br />Esucha. <br />Opina.</h1>
            <p className="text-muted font-body text-base mb-8">
              Reseña álbumes, descubre música nueva <br />
              y comparte tu opinion con la comunidad
            </p>
            <Link to="/catalogo" className="inline-flex items-center gap-2 bg-primary text-background font-heading font-medium px-6 py-3 rounded-input hover:bg-secondary transition-colors">
              Explorar álbumes →
            </Link>
          </div>
          {/* Columna derecha */}
          <div className="bg-input border border-primary/40 rounded-xl p-4 w-55 shrink-0">
            {/* Portada placeholder */}
            <PortadaPlaceholder className="w-full h-47.5 mb-3" />
            {/* Info del album */}
            <p className="text-text font-heading font-medium text-sm">DAMN.</p>
            <p className="text-muted font-body text-xs mb-2">Kendrick Lamar · 2017</p>
            <Estrellas cantidad={5} />
            <p className="text-muted font-body text-xs mt-2 italic">
              "Líricamente impecable. Un álbum que define una generación."
            </p>
          </div>
        </div>
      </section>

      {/* RESEÑAS RECIENTES */}
      <section className="py-12 bg-background">
        <div className="max-w-300 mx-auto px-12">
          <SectionTitle>Reseñas recientes</SectionTitle>
          <div className="grid grid-cols-4 gap-6">
            <ResenaCard album="Blonde" artista="Frank Ocean" puntuacion={5} texto="Experimental y hermoso. Frank Ocean en su mejor momento creativo." />
            <ResenaCard album="El Mal Querer" artista="ROSALÍA" puntuacion={5} texto="Una revolución del flamenco. Precioso de principio a fin." />
            <ResenaCard album="Random Access Memories" artista="Daft Punk" puntuacion={4.5} texto="Un viaje nostálgico a la disco de los 70. Producción increíble." />
            <ResenaCard album="4:44" artista="JAY-Z" puntuacion={5} texto="JAY-Z más maduro y honesto que nunca. Un testamento artístico." />
          </div>
        </div>
      </section>

      {/* TOP ÁLBUMES */}
      <section className="py-12 bg-card">
        <div className="max-w-300 mx-auto px-12">
          <SectionTitle>Top Álbumes</SectionTitle>
          <div className="grid grid-cols-5 gap-6">
            <AlbumCard posicion={1} album="Kid A Mnesia" artista="Radiohead" rating={5.0} />
            <AlbumCard posicion={2} album="Meat is Murder" artista="The Smiths" rating={5.0} />
            <AlbumCard posicion={3} album="OK Computer" artista="Radiohead" rating={5.0} />
            <AlbumCard posicion={4} album="Nevermind" artista="Nirvana" rating={4.9} />
            <AlbumCard posicion={5} album="Definitely Maybe" artista="Oasis" rating={4.8} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-300 mx-auto px-12">
          <h2 className="text-text font-heading font-bold text-5xl leading-tight mb-8">
            ¿Listo para compartir<br />tu opinión musical?
          </h2>
          <div className="flex items-center gap-6">
            <Link to="/registro" className="inline-flex items-center gap-2 bg-primary text-background font-heading font-medium px-6 py-3 rounded-input hover:bg-secondary transition-colors">
              Crear cuenta gratis →
            </Link>
            <Link to="/login" className="text-primary font-body text-sm hover:underline">
              ¿Ya tienes cuenta? Entra aquí
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
