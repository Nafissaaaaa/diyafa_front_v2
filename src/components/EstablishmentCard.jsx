import { Link } from "react-router-dom";
import { toAssetUrl } from "../api/client";

export default function EstablishmentCard({ establishment }) {
  const cheapestRoom =
    establishment.rooms && establishment.rooms.length > 0
      ? establishment.rooms.reduce((min, r) =>
          parseFloat(r.prixNuit) < parseFloat(min.prixNuit) ? r : min
        )
      : null;

  const cover = establishment.imageVedette || (establishment.images || [])[0];

  return (
    <Link
      to={`/etablissements/${establishment.id}`}
      className="block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-deep/10"
    >
      <div className="relative h-44 bg-gradient-to-br from-navy to-navy-deep">
        {cover && (
          <img
            src={toAssetUrl(cover)}
            alt={establishment.nom}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase text-navy-deep">
          {establishment.type === "hotel" ? "Hôtel" : "Dortoir"}
        </span>
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-semibold text-slate-400">📍 {establishment.ville}</p>
        <h3 className="mb-2 font-display text-lg font-semibold text-navy-deep">{establishment.nom}</h3>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          {cheapestRoom ? (
            <p className="font-bold text-navy-deep">
              {parseFloat(cheapestRoom.prixNuit).toLocaleString("fr-FR")} DA
              <span className="ml-1 text-xs font-medium text-slate-400">/ nuit</span>
            </p>
          ) : (
            <p className="text-xs text-slate-400">Prix sur demande</p>
          )}
          <span className="text-xs font-semibold text-gold">Voir détail →</span>
        </div>
      </div>
    </Link>
  );
}
