import { useEffect, useState } from "react";
import { listUsers, updateUserStatus } from "../../api/admin";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";

export default function AdminUsers() {
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, Dialog } = useConfirmDialog();

  function load() {
    setLoading(true);
    listUsers(role || undefined).then(setUsers).finally(() => setLoading(false));
  }

  useEffect(load, [role]);

  async function toggleStatus(user) {
    const next = user.statut === "actif" ? "bloque" : "actif";
    const ok = await confirm({
      title: next === "bloque" ? "Bloquer" : "Débloquer",
      message: `Voulez-vous vraiment ${next === "bloque" ? "bloquer" : "débloquer"} ${user.prenom} ${user.nom} ?`,
      confirmText: next === "bloque" ? "Bloquer" : "Débloquer",
      cancelText: "Annuler",
      danger: next === "bloque",
    });
    if (!ok) return;
    await updateUserStatus(user.id, next);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-deep">Utilisateurs</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        >
          <option value="">Tous les rôles</option>
          <option value="client">Clients</option>
          <option value="owner">Partenaires</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs font-semibold uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3">Nom</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Téléphone</th>
              <th className="px-5 py-3">Rôle</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="p-5 text-slate-400">Chargement...</td></tr>
            )}
            {!loading && users.length === 0 && (
              <tr><td colSpan={6} className="p-5 text-slate-400">Aucun utilisateur trouvé.</td></tr>
            )}
            {!loading && users.map((u) => (
              <tr key={u.id} className="border-t border-neutral-100">
                <td className="px-5 py-3 font-semibold text-navy-deep">{u.prenom} {u.nom}</td>
                <td className="px-5 py-3 text-slate-500">
                  {u.email || <span className="italic text-slate-300">Non disponible</span>}
                </td>
                <td className="px-5 py-3 text-slate-500">
                  {u.telephone || <span className="italic text-slate-300">Non disponible</span>}
                </td>
                <td className="px-5 py-3 capitalize text-slate-500">{u.role}</td>
                <td className="px-5 py-3">
                  <span className={u.statut === "actif" ? "text-emerald-600" : "text-red-600"}>
                    {u.statut === "actif" ? "Actif" : "Bloqué"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => toggleStatus(u)}
                    className="text-xs font-semibold text-navy underline"
                  >
                    {u.statut === "actif" ? "Bloquer" : "Débloquer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog />
      </div>
    </div>
  );
}
