import { useEffect, useState } from "react";
import { myReservations, cancelReservation } from "../../api/reservations";
import StatusBadge from "../../components/StatusBadge";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    myReservations()
      .then(setReservations)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCancel(id) {
    if (!confirm("Annuler cette réservation ?")) return;
    await cancelReservation(id);
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 font-display text-2xl font-semibold text-navy-deep">Mes réservations</h1>

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
