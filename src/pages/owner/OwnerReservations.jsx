import { useEffect, useState } from "react";
import { ownerReservations, acceptReservation, rejectReservation } from "../../api/reservations";
import StatusBadge from "../../components/StatusBadge";

const FILTERS = [
  { value: "", label: "Toutes" },
  { value: "pending", label: "En attente" },
  { value: "accepted", label: "Confirmées" },
  { value: "rejected", label: "Refusées" },
];

export default function OwnerReservations() {
  const [filter, setFilter] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    ownerReservations(filter || undefined)
      .then(setReservations)
      .finally(() => setLoading(false));
  }

  useEffect(load, [filter]);

  async function handleAccept(id) {
    await acceptReservation(id);
    load();
  }

  async function handleReject(id) {
    const motif = prompt("Motif du refus (optionnel) :") || undefined;
    await rejectReservation(id, motif);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-deep">Réservations</h1>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                filter === f.value ? "bg-navy-deep text-white" : "bg-white text-slate-500 border border-neutral-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white">
        {loading && <p className="p-5 text-slate-400">Chargement...</p>}
        {!loading && reservations.length === 0 && <p className="p-5 text-slate-400">Aucune réservation.</p>}

        {reservations.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 p-5 last:border-0"
          >
            <div>
              <p className="font-semibold text-navy-deep">{r.client?.prenom} {r.client?.nom}</p>
              <p className="text-xs text-slate-400">
                {r.dateDebut} → {r.dateFin} · {r.nbPersonnes} pers. · {r.room?.nomType}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-navy-deep">
                {parseFloat(r.prixTotal).toLocaleString("fr-FR")} DA
              </p>
              {r.statut === "pending" ? (
                <>
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
                </>
              ) : (
                <StatusBadge status={r.statut} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
