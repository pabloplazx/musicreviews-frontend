import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Inicio from "./pages/Inicio.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Rankings from "./pages/Rankings.jsx";
import Busqueda from "./pages/Busqueda.jsx";
import DetalleAlbum from "./pages/DetalleAlbum.jsx";
import DetalleArtista from "./pages/DetalleArtista.jsx";
import CrearResena from "./pages/CrearResena.jsx";
import EditarResena from "./pages/EditarResena.jsx";
import PerfilUsuario from "./pages/PerfilUsuario.jsx";
import EditarPerfil from "./pages/EditarPerfil.jsx";
import MisFavoritos from "./pages/MisFavoritos.jsx";
import PanelAdmin from "./pages/PanelAdmin.jsx";
import NotFound from "./pages/NotFound.jsx";

const SIN_NAVBAR = ["/crear-resena", "/editar-resena", "/editar-perfil"];

function Layout() {
  const { pathname } = useLocation();
  const sinNavbar = SIN_NAVBAR.includes(pathname);

  return (
    <div className="bg-background min-h-screen text-text font-body">
      {!sinNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/album/:id" element={<DetalleAlbum />} />
        <Route path="/artista/:id" element={<DetalleArtista />} />
        <Route path="/crear-resena" element={<CrearResena />} />
        <Route path="/editar-resena" element={<EditarResena />} />
        <Route path="/perfil/:username" element={<PerfilUsuario />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/favoritos" element={<MisFavoritos />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!sinNavbar && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
