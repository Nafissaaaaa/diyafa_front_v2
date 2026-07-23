import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { myReservations, cancelReservation } from "../../api/reservations";
import StatusBadge from "../../components/StatusBadge";
import PasswordInput from "../../components/PasswordInput";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";

function ProfileTab() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      const payload = { ...form };
      if (newPassword) payload.motDePasse = newPassword;
      await updateProfile(payload);
      setNewPassword("");
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de mettre à jour le profil.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-navy-deep focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy-deep";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nom</label>
          <input value={form.nom} onChange={(e) => update("nom", e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Prénom</label>
          <input
            value={form.prenom}
            onChange={(e) => update("prenom", e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>E-mail</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Téléphone</label>
        <input
          value={form.telephone}
          onChange={(e) => update("telephone", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Nouveau mot de passe</label>
        <PasswordInput
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={inputClass}
          placeholder="Laisser vide pour ne pas changer"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Profil mis à jour avec succès.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy-deep hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}

function ReservationsTab() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, Dialog } = useConfirmDialog();

  function load() {
    setLoading(true);
    myReservations()
      .then(setReservations)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCancel(id) {
    const ok = await confirm({
      title: "Annuler la réservation",
      message: "Voulez-vous vraiment annuler cette réservation ?",
      confirmText: "Oui, annuler",
      cancelText: "Non",
      danger: true,
    });
    if (!ok) return;
    await cancelReservation(id);
    load();
  }

  return (
    <div>
      {loading && <p className="text-slate-400">Chargement...</p>}
      {!loading && reservations.length === 0 && (
        <p className="text-slate-400">Vous n'avez pas encore de réservation.</p>
      )}

      <div className="space-y-3">
        {reservations.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-navy-deep">{r.establishment?.nom}</p>
              <p className="text-sm text-slate-400">
                {r.dateDebut} → {r.dateFin} · {r.nbPersonnes} pers. · {r.room?.nomType}
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-deep">
                {parseFloat(r.prixTotal).toLocaleString("fr-FR")} DA
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={r.statut} />
              {["pending", "accepted"].includes(r.statut) && (
                <button
                  onClick={() => handleCancel(r.id)}
                  className="text-xs font-semibold text-red-600 underline"
                >
                  Annuler
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profil");

  function handleLogout() {
    logout();
    navigate("/");
  }

  const tabClass = (t) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      tab === t ? "bg-navy-deep text-white" : "text-slate-500 hover:bg-cream"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-deep">Mon compte</h1>
          <p className="mt-1 text-sm text-slate-500">
            {user?.prenom} {user?.nom} · {user?.email || user?.telephone}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="self-start rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-navy-deep hover:border-navy-deep sm:self-auto"
        >
          Déconnexion
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        <button type="button" onClick={() => setTab("profil")} className={tabClass("profil")}>
          Profil
        </button>
        <button type="button" onClick={() => setTab("reservations")} className={tabClass("reservations")}>
          Mes réservations
        </button>
      </div>

      {tab === "profil" ? <ProfileTab /> : <ReservationsTab />}
      <Dialog />
    </div>
  );
}
