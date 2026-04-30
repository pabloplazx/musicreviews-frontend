const API = import.meta.env.VITE_API_URL;

// Llama al endpoint de login y devuelve los datos del usuario + token
export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // El backend devuelve { mensaje: "..." } en los errores
    throw new Error(data.mensaje || "Error al iniciar sesión");
  }

  return data; // { token, id, username, email, rol }
}

// Llama al endpoint de registro y devuelve los datos del usuario + token
export async function register(username, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || "Error al registrarse");
  }

  return data; // { token, id, username, email, rol }
}
