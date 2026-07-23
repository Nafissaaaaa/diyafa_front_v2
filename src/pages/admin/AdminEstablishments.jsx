import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  listPendingEstablishments,
  validateEstablishment,
  setBestEstablishmentImage,
} from "../../api/establishments";
import { toAssetUrl } from "../../api/client";

function ImagesModal({ establishment, onClose, onSaved }) {
  const images = establishment.images || [];
  const [selected, setSelected] = useState(establishment.imageVedette || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      await setBestEstablishmentImage(establishment.id, selected);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Impossible d'enregistrer la photo principale.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy-deep">
              Photos de {establishment.nom}
            </h2>
            <p className="text-xs text-slate-400">
              Cliquez sur une photo pour la choisir comme photo principale, puis enregistrez.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-neutral-100 hover:text-navy-deep"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {images.length === 0 ? (
          <p className="rounded-lg bg-neutral-50 p-5 text-center text-sm text-slate-400">
            Ce partenaire n'a envoyé aucune photo.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img) => {
              const isSelected = selected === img;
              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelected(img)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    isSelected ? "border-gold ring-2 ring-gold/40" : "border-transparent hover:border-neutral-200"
                  }`}
                >
                  <img src={toAssetUrl(img)} alt="" className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                  {isSelected && (
                    <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep shadow">
                      ★
                    </span>
                  )}
                  {establishment.imageVedette === img && !isSelected && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Actuelle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-bold text-slate-500"
          >
            Fermer
          </button>
          <button
            onClick={handleSave}
            disabled={!selected || saving || images.length === 0}
            className="rounded-lg bg-navy-deep px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
          >
            {saving ? "Enregistrement..." : "Choisir comme meilleure photo"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminEstablishments() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null); // etablissement dont on regarde les photos
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type"); // "hotel" | "mraqed" | null

  function load() {
    setLoading(true);
    listPendingEstablishments().then(setPending).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDecision(id, decision) {
    await validateEstablishment(id, decision);
    load();
  }

  const filtered = typeFilter ? pending.filter((e) => e.type === typeFilter) : pending;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 font-display text-2xl font-semibold text-navy-deep">Établissements en attente</h1>
          <p className="text-sm text-slate-500">Validez les nouveaux partenaires avant leur mise en ligne.</p>
        </div>
        <div className="flex gap-2">
          {[
            { value: null, label: "Tous" },
            { value: "hotel", label: "Hôtels" },
            { value: "mraqed", label: "Dortoirs" },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSearchParams(opt.value ? { type: opt.value } : {})}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                typeFilter === opt.value
                  ? "bg-navy-deep text-white"
                  : "border border-neutral-200 text-slate-500 hover:border-navy-deep hover:text-navy-deep"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white">
        {loading && <p className="p-5 text-slate-400">Chargement...</p>}
        {!loading && filtered.length === 0 && (
          <p className="p-5 text-slate-400">Aucun établissement en attente de validation.</p>
        )}

        {filtered.map((est) => {
          const nbImages = (est.images || []).length;
          const cover = est.imageVedette || (est.images || [])[0];
          return (
            <div key={est.id} className="flex items-center justify-between gap-4 border-b border-neutral-100 p-5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  {cover ? (
                    <img src={toAssetUrl(cover)} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-300">
                      —
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy-deep">{est.nom} <span className="text-xs font-normal text-slate-400">({est.type})</span></p>
                  <p className="text-xs text-slate-400">{est.ville}, {est.wilaya}</p>
                  <p className="text-xs text-slate-400">Propriétaire : {est.owner?.prenom} {est.owner?.nom} — {est.owner?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewing(est)}
                  className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-navy-deep hover:border-gold hover:text-gold"
                >
                  Voir les images ({nbImages})
                </button>
                <button
                  onClick={() => handleDecision(est.id, "refuse")}
                  className="rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-bold text-red-600"
                >
                  Refuser
                </button>
                <button
                  onClick={() => handleDecision(est.id, "valide")}
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white"
                >
                  Valider
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {viewing && (
        <ImagesModal
          establishment={viewing}
          onClose={() => setViewing(null)}
          onSaved={() => {
            setViewing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
