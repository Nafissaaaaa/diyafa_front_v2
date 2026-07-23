import { useEffect, useState } from "react";
import { adminReservations } from "../../api/reservations";
import StatusBadge from "../../components/StatusBadge";

const FILTERS = [
  { value: "accepted", label: "Confirmées" },
  { value: "pending", label: "En attente" },
  { value: "rejected", label: "Refusées" },
  { value: "", label: "Toutes" },
];

export default function AdminReservations() {
  const [filter, setFilter] = useState("accepted");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminReservations(filter || undefined).then(setReservations).finally(() => setLoading(false));
  }, [filter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-deep">Réservations</h1>
          <p className="text-sm text-slate-500">
            Par défaut, seules les réservations <strong>confirmées</strong> par les établissements sont affichées.
          </p>
        </div>
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
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 p-5 last:border-0">
            <div>
              <p className="font-semibold text-navy-deep">{r.establishment?.nom}</p>
              <p className="text-xs text-slate-400">
                Client : {r.client?.prenom} {r.client?.nom} · {r.dateDebut} → {r.dateFin} · {r.room?.nomType}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-navy-deep">
                {parseFloat(r.prixTotal).toLocaleString("fr-FR")} DA
              </p>
              <StatusBadge status={r.statut} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
