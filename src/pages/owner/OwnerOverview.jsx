import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ownerReservations, acceptReservation, rejectReservation } from "../../api/reservations";
import StatusBadge from "../../components/StatusBadge";
import { usePromptDialog } from "../../hooks/useConfirmDialog";

export default function OwnerOverview() {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { prompt, Dialog } = usePromptDialog();

  function load() {
    setLoading(true);
    Promise.all([ownerReservations("pending"), ownerReservations()])
      .then(([p, a]) => {
        setPending(p);
        setAll(a);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleAccept(id) {
    setError(null);
    try {
      await acceptReservation(id);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Impossible d'accepter la réservation.");
    }
  }

  async function handleReject(id) {
    setError(null);
    const motif = await prompt({
      title: "Refuser la réservation",
      message: "Motif du refus (optionnel) :",
      placeholder: "Ex: Dates non disponibles",
    });
    if (motif === undefined) return;
    try {
      await rejectReservation(id, motif || undefined);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de refuser la réservation.");
    }
  }

  const stats = {
    pending: all.filter((r) => r.statut === "pending").length,
    accepted: all.filter((r) => r.statut === "accepted").length,
    rejected: all.filter((r) => r.statut === "rejected").length,
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-navy-deep">Vue d'ensemble</h1>
      <p className="mb-8 text-sm text-slate-500">Gérez les demandes de réservation reçues sur votre établissement.</p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-display text-2xl font-semibold text-amber-600">{stats.pending}</p>
          <p className="text-xs font-semibold text-slate-400">En attente</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-display text-2xl font-semibold text-emerald-600">{stats.accepted}</p>
          <p className="text-xs font-semibold text-slate-400">Confirmées</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="font-display text-2xl font-semibold text-red-600">{stats.rejected}</p>
          <p className="text-xs font-semibold text-slate-400">Refusées</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-100 p-5">
          <h2 className="font-semibold text-navy-deep">Demandes à traiter</h2>
          <Link to="/partenaire/reservations" className="text-sm font-semibold text-navy underline">
            Voir tout
          </Link>
        </div>

        {loading && <p className="p-5 text-slate-400">Chargement...</p>}
        {!loading && pending.length === 0 && <p className="p-5 text-slate-400">Aucune demande en attente.</p>}

        {pending.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 border-b border-neutral-100 p-5 last:border-0">
            <div>
              <p className="font-semibold text-navy-deep">{r.client?.prenom} {r.client?.nom}</p>
              <p className="text-xs text-slate-400">
                {r.dateDebut} → {r.dateFin} · {r.nbPersonnes} pers. · {r.room?.nomType}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="mr-2 text-sm font-bold text-navy-deep">
                {parseFloat(r.prixTotal).toLocaleString("fr-FR")} DA
              </p>
              <button
                onClick={() => handleReject(r.id)}
                className="rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-bold text-red-600"
              >
                Refuser
              </button>
              <button
                onClick={() => handleAccept(r.id)}
                className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white"
              >
                ✓ Accepter
              </button>
            </div>
          </div>
        ))}
        <Dialog />
      </div>
    </div>
  );
}
