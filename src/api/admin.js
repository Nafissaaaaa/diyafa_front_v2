import apiClient from "./client";

export async function listUsers(role) {
  const res = await apiClient.get("/admin/users", {
    params: role ? { role } : {},
  });
  return res.data;
}

export async function updateUserStatus(id, statut) {
  const res = await apiClient.patch(`/admin/users/${id}/status`, { statut });
  return res.data;
}

export async function getStats() {
  const res = await apiClient.get("/admin/stats");
  return res.data;
}

export async function getDashboard() {
  const res = await apiClient.get("/admin/dashboard");
  return res.data;
}
