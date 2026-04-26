import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Inicio from "./pages/Inicio.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Rankings from "./pages/Rankings.jsx";
import Busqueda from "./pages/Busqueda.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen text-text font-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/busqueda" element={<Busqueda />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}