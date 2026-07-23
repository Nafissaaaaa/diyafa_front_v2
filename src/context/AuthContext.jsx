import { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app, on verifie s'il y a deja une session valide
  useEffect(() => {
    const stored = localStorage.getItem("diyafa_user");
    const token = localStorage.getItem("diyafa_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(identifiant, motDePasse, captchaToken) {
    const data = await authApi.login(identifiant, motDePasse, captchaToken);
    localStorage.setItem("diyafa_token", data.token);
    localStorage.setItem("diyafa_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  // Route automatiquement vers /register/client ou /register/partner selon le payload,
  // pour que les pages d'inscription n'aient pas a connaitre le detail des endpoints.
  // Le formulaire partenaire envoie un FormData (photos jointes) plutot qu'un objet simple.
  async function register(payload) {
    const isPartnerPayload = payload instanceof FormData ? payload.has("etablissement") : !!payload.etablissement;
    const data = isPartnerPayload
      ? await authApi.registerPartner(payload)
      : await authApi.registerClient(payload);
    localStorage.setItem("diyafa_token", data.token);
    localStorage.setItem("diyafa_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function updateProfile(payload) {
    const data = await authApi.updateProfile(payload);
    const updatedUser = data.user || data;
    localStorage.setItem("diyafa_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  }

  function logout() {
    localStorage.removeItem("diyafa_token");
    localStorage.removeItem("diyafa_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit etre utilise a l'interieur de <AuthProvider>");
  return ctx;
}
