import { createContext, useContext, useState } from "react";
import { login as loginService, register as registerService } from "../services/auth";

// El contexto expone: usuario, token, login(), register(), logout()
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Inicializa desde localStorage para que la sesión persista al recargar la página
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : null;
  });

  // Llama al backend, guarda el token y los datos del usuario
  async function login(email, password) {
    const data = await loginService(email, password);
    guardarSesion(data);
  }

  async function register(username, email, password) {
    const data = await registerService(username, email, password);
    guardarSesion(data);
  }

  function guardarSesion(data) {
    const { token, ...datosUsuario } = data;
    setToken(token);
    setUsuario(datosUsuario);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  }

  function logout() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  // Actualiza los datos locales del usuario en estado y localStorage tras una
  // edición de perfil. No toca el token (la sesión sigue activa).
  function actualizarUsuarioLocal(datosUsuario) {
    setUsuario(datosUsuario);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, register, logout, actualizarUsuarioLocal }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto desde cualquier componente: const { usuario, login } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
