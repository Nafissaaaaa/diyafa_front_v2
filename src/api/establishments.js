import apiClient from "./client";

// ---------- Public ----------
export async function listEstablishments(params = {}) {
  const res = await apiClient.get("/establishments", { params });
  return res.data;
}

export async function getEstablishment(id) {
  const res = await apiClient.get(`/establishments/${id}`);
  return res.data;
}

// ---------- Owner ----------
export async function myEstablishments() {
  const res = await apiClient.get("/owner/establishments/me");
  return res.data;
}

export async function createEstablishment(data) {
  const res = await apiClient.post("/owner/establishments", data);
  return res.data;
}

export async function updateEstablishment(id, data) {
  const res = await apiClient.put(`/owner/establishments/${id}`, data);
  return res.data;
}

export async function createRoom(establishmentId, data) {
  const res = await apiClient.post(`/owner/establishments/${establishmentId}/rooms`, data);
  return res.data;
}

export async function updateRoom(roomId, data) {
  const res = await apiClient.put(`/owner/rooms/${roomId}`, data);
  return res.data;
}

export async function deleteRoom(roomId) {
  const res = await apiClient.delete(`/owner/rooms/${roomId}`);
  return res.data;
}

// ---------- Admin ----------
export async function listPendingEstablishments() {
  const res = await apiClient.get("/admin/establishments/pending");
  return res.data;
}

export async function validateEstablishment(id, decision) {
  const res = await apiClient.patch(`/admin/establishments/${id}/validate`, { decision });
  return res.data;
}

// L'admin choisit, parmi les photos envoyees par le partenaire, celle qui
// devient la photo de couverture de l'etablissement (affichee une fois valide).
export async function setBestEstablishmentImage(id, image) {
  const res = await apiClient.patch(`/admin/establishments/${id}/best-image`, { image });
  return res.data;
}

export async function listValidatedEstablishments() {
  const res = await apiClient.get("/admin/establishments/valides");
  return res.data;
}

export async function deleteEstablishmentByAdmin(id) {
  const res = await apiClient.delete(`/admin/establishments/${id}`);
  return res.data;
}
