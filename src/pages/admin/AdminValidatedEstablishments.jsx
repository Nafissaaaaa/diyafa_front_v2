import { useEffect, useState } from "react";
import { listValidatedEstablishments, deleteEstablishmentByAdmin } from "../../api/establishments";
import { toAssetUrl } from "../../api/client";

export default function AdminValidatedEstablishments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null); // etablissement en attente de confirmation
  const [deletingId, setDeletingId] = useState(null);

  function load() {
    setLoading(true);
    listValidatedEstablishments()
      .then(setList)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteEstablishmentByAdmin(id);
      setConfirming(null);
      load();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 font-display text-2xl font-semibold text-navy-deep">Établissements validés</h1>
        <p className="text-sm text-slate-500">Tous les établissements actuellement en ligne sur Diyafa.</p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white">
        {loading && <p className="p-5 text-slate-400">Chargement...</p>}
        {!loading && list.length === 0 && (
          <p className="p-5 text-slate-400">Aucun établissement validé pour le moment.</p>
        )}

        {list.map((est) => {
          const cover = est.imageVedette || (est.images || [])[0];
          return (
            <div key={est.id} className="flex items-center justify-between gap-4 border-b border-neutral-100 p-5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  {cover ? (
                    <img src={toAssetUrl(cover)} alt="" className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-300">—</div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy-deep">
                    {est.nom} <span className="text-xs font-normal text-slate-400">({est.type === "hotel" ? "Hôtel" : "Dortoir"})</span>
                  </p>
                  <p className="text-xs text-slate-400">{est.ville}, {est.wilaya}</p>
                  <p className="text-xs text-slate-400">
                    Propriétaire : {est.owner?.prenom} {est.owner?.nom} — {est.owner?.email}
                  </p>
                </div>
              </div>

              {confirming === est.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Supprimer définitivement ?</span>
                  <button
                    onClick={() => handleDelete(est.id)}
                    disabled={deletingId === est.id}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                  >
                    {deletingId === est.id ? "Suppression..." : "Confirmer"}
                  </button>
                  <button
                    onClick={() => setConfirming(null)}
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-bold text-slate-500"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirming(est.id)}
                  className="rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  Supprimer
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
