import apiClient from "./client";

// ---------- Client ----------
export async function createReservation(data) {
  const res = await apiClient.post("/reservations", data);
  return res.data;
}

export async function myReservations() {
  const res = await apiClient.get("/reservations/me");
  return res.data;
}

export async function cancelReservation(id) {
  const res = await apiClient.patch(`/reservations/${id}/cancel`);
  return res.data;
}

// ---------- Owner ----------
export async function ownerReservations(statut) {
  const res = await apiClient.get("/owner/reservations", {
    params: statut ? { statut } : {},
  });
  return res.data;
}

export async function acceptReservation(id) {
  const res = await apiClient.patch(`/owner/reservations/${id}/accept`);
  return res.data;
}

export async function rejectReservation(id, motif) {
  const res = await apiClient.patch(`/owner/reservations/${id}/reject`, { motif });
  return res.data;
}

// ---------- Admin ----------
export async function adminReservations(statut) {
  const res = await apiClient.get("/admin/reservations", {
    params: statut ? { statut } : {},
  });
  return res.data;
}
