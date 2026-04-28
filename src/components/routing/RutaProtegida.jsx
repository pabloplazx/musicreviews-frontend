import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Wrapper de rutas que requieren sesión activa.
// Si no hay usuario en el contexto, redirige a /login pasando la ubicación
// actual en location.state.from para que Login pueda volver a ella tras
// autenticar al usuario.
// `replace` evita que /login quede en el historial — al pulsar "atrás" no
// se vuelve a la ruta protegida que ya rebotó.
export default function RutaProtegida() {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
