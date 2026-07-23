import axios from "axios";
import { storageGet } from "../utils/storage";

const API_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || typeof envUrl !== "string" || envUrl.trim() === "") {
    throw new Error("VITE_API_URL environment variable is not set.");
  }
  return envUrl.replace(/\/+$/, "");
})();

// Base pour les fichiers statiques (photos uploadees) : meme host que l'API,
// mais sans le suffixe "/api". Ex: http://localhost:5000
export const STATIC_URL = API_URL.replace(/\/api\/?$/, "");

// Construit une URL absolue a partir d'un chemin relatif renvoye par le backend
// (ex: "/uploads/establishments/xxx.jpg"). Renvoie l'entree telle quelle si
// c'est deja une URL absolue (http/https).
export function toAssetUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${STATIC_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

const apiClient = axios.create({
  baseURL: API_URL,
});

// Injecte automatiquement le token JWT stocke apres connexion
apiClient.interceptors.request.use((config) => {
  const token = storageGet("diyafa_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si le token est expire/invalide -> deconnexion automatique
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      storageRemove("diyafa_token");
      storageRemove("diyafa_user");
      if (window.location.pathname !== "/connexion") {
        window.location.href = "/connexion";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
