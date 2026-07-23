import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listEstablishments } from "../../api/establishments";
import EstablishmentCard from "../../components/EstablishmentCard";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ville = searchParams.get("ville") || "";
  const type = searchParams.get("type") || "";

  useEffect(() => {
    setLoading(true);
    setError(null);
    listEstablishments({ ville: ville || undefined, type: type || undefined })
      .then(setEstablishments)
      .catch(() => setError("Impossible de charger les établissements."))
      .finally(() => setLoading(false));
  }, [ville, type]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-navy-deep">
          {ville ? `Établissements à ${ville}` : "Tous les établissements"}
        </h1>

        <div className="flex gap-3">
          <select
            value={type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="">Tous les types</option>
            <option value="hotel">Hôtel</option>
            <option value="mraqed">Dortoir</option>
          </select>
          <select
            value={ville}
            onChange={(e) => updateFilter("ville", e.target.value)}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="">Toutes les villes</option>
            <option>Alger</option>
            <option>Oran</option>
            <option>Constantine</option>
            <option>Tlemcen</option>
            <option>Annaba</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-slate-400">Chargement des établissements...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && establishments.length === 0 && (
        <p className="text-slate-400">Aucun établissement ne correspond à votre recherche.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {establishments.map((e) => (
          <EstablishmentCard key={e.id} establishment={e} />
        ))}
      </div>
    </div>
  );
}
