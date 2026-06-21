// Centraliza la URL base para evitar repetir localhost en cada pantalla.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function apiUrl(path) {
  return `${API_URL}${path}`;
}
