import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Wrapper de rutas que requieren rol ADMIN.
// - Sin sesión → /login con la URL guardada para volver tras autenticar.
// - Con sesión pero sin rol ADMIN → /. NO se manda a /login porque ya está
//   autenticado (no podría arreglar el rol re-autenticándose) ni se guarda la
//   URL — tras login volvería a /admin y rebotaría otra vez = bucle.
export default function RutaAdmin() {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (usuario.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
