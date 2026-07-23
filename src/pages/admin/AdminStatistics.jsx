export default function AdminStatistics() {
  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-navy-deep">Statistiques</h1>
      <p className="mb-8 text-sm text-slate-500">
        Analyses détaillées de la plateforme (réservations, revenus, établissements...).
      </p>

      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-200 bg-white p-16 text-center">
        <span className="text-3xl">📊</span>
        <p className="font-semibold text-navy-deep">Bientôt disponible</p>
        <p className="max-w-sm text-sm text-slate-400">
          Cette page accueillera prochainement des statistiques détaillées et des exports.
          Les chiffres essentiels sont déjà visibles sur le tableau de bord.
        </p>
      </div>
    </div>
  );
}
