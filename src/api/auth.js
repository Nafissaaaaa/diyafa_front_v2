import apiClient from "./client";

export async function registerClient(data) {
  const res = await apiClient.post("/auth/register/client", data);
  return res.data;
}

export async function registerPartner(data) {
  // "data" peut etre un FormData (photos jointes) : axios detecte le FormData
  // tout seul et pose le bon Content-Type multipart/form-data avec sa boundary.
  const res = await apiClient.post("/auth/register/partner", data);
  return res.data;
}

export async function login(identifiant, motDePasse, captchaToken) {
  const res = await apiClient.post("/auth/login", { identifiant, motDePasse, captchaToken });
  return res.data;
}

export async function getMe() {
  const res = await apiClient.get("/auth/me");
  return res.data;
}

export async function updateProfile(data) {
  const res = await apiClient.put("/auth/me", data);
  return res.data;
}