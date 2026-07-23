import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getDashboard } from "../../api/admin";
import { validateEstablishment } from "../../api/establishments";
import { IconTrendingUp, IconKey, IconCoin, IconUsers, IconBell, IconStar, IconInbox } from "../../components/Icons";

const STATUT_LABELS = {
  pending: { label: "En attente", className: "bg-amber-50 text-amber-600" },
  accepted: { label: "Validé", className: "bg-emerald-50 text-emerald-600" },
  rejected: { label: "Refusé", className: "bg-red-50 text-red-600" },
  cancelled: { label: "Annulé", className: "bg-neutral-100 text-neutral-500" },
  completed: { label: "Terminé", className: "bg-sky-50 text-sky-600" },
};

function StatCard({ icon, label, value, tone }) {
  const tones = {
    gold: "bg-gold text-navy-deep",
    navy: "bg-navy-deep text-white",
    goldSoft: "bg-gold-soft text-navy-deep",
    navySoft: "bg-navy text-white",
  };
  return (
    <div className={`flex items-center gap-4 rounded-2xl p-5 ${tones[tone]}`}>
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium opacity-80">{label}</p>
        <p className="font-display text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR");
}

export default function AdminOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDecision(id, decision) {
    await validateEstablishment(id, decision);
    load();
  }

  if (loading || !data) {
    return <p className="text-slate-400">Chargement du tableau de bord...</p>;
  }

  const { cards, tendances, repartitionParType, reservationsRecentes, demandesInscription, avisRecents } = data;

  const repartitionData = [
    { name: "Hôtels", value: repartitionParType.hotel, color: "#CB9A56" },
    { name: "Dortoirs", value: repartitionParType.mraqed, color: "#0E1E3D" },
  ];
  const totalEtabValides = repartitionParType.hotel + repartitionParType.mraqed;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-navy-deep">Tableau de Bord (Admin)</h1>

      {/* ---------- Cartes chiffrees ---------- */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<IconTrendingUp className="h-5 w-5" />} label="Réservations Actives" value={cards.reservationsActives} tone="gold" />
        <StatCard icon={<IconKey className="h-5 w-5" />} label="Établissements Total" value={cards.etablissementsTotal} tone="navy" />
        <StatCard icon={<IconCoin className="h-5 w-5" />} label="Revenus ce Mois" value={`${cards.revenuMois.toLocaleString("fr-FR")} DA`} tone="goldSoft" />
        <StatCard icon={<IconUsers className="h-5 w-5" />} label="Nouveaux Inscrits" value={cards.nouveauxInscrits} tone="navySoft" />
      </div>

      {/* ---------- Graphiques ---------- */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-deep">
            Tendances de Réservation ({new Date().getFullYear()})
          </h2>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={tendances}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#0E1E3D" strokeWidth={2.5} dot={{ r: 3 }} name="Réservations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-deep">Répartition par Type</h2>
          {totalEtabValides === 0 ? (
            <p className="py-16 text-center text-sm text-slate-400">Pas encore d'établissement validé.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={repartitionData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                    {repartitionData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 flex justify-center gap-5 text-xs">
                {repartitionData.map((d) => (
                  <span key={d.name} className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* ---------- Reservations recentes ---------- */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-navy-deep">Réservations Récentes</h2>
            <Link to="/admin/reservations" className="text-xs font-bold text-gold hover:underline">
              Voir tout
            </Link>
          </div>
          {reservationsRecentes.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Aucune réservation pour le moment.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase text-slate-400">
                  <th className="pb-2 font-medium">Établissement</th>
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Arrivée</th>
                  <th className="pb-2 font-medium">Départ</th>
                  <th className="pb-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {reservationsRecentes.map((r) => {
                  const statut = STATUT_LABELS[r.statut] || STATUT_LABELS.pending;
                  return (
                    <tr key={r.id} className="border-t border-neutral-100">
                      <td className="py-2.5 font-medium text-navy-deep">{r.etablissement}</td>
                      <td className="py-2.5 text-slate-500">{r.client}</td>
                      <td className="py-2.5 text-slate-500">{formatDate(r.dateDebut)}</td>
                      <td className="py-2.5 text-slate-500">{formatDate(r.dateFin)}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statut.className}`}>
                          {statut.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ---------- Notifications + demandes ---------- */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <IconBell className="h-4 w-4 text-gold" />
              <h2 className="font-display text-base font-semibold text-navy-deep">Notifications et Alertes</h2>
            </div>
            {demandesInscription.length === 0 ? (
              <p className="text-sm text-slate-400">Rien de nouveau.</p>
            ) : (
              <p className="text-sm text-slate-500">
                {demandesInscription.length} demande{demandesInscription.length > 1 ? "s" : ""} d'inscription en attente.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconInbox className="h-4 w-4 text-gold" />
                <h2 className="font-display text-base font-semibold text-navy-deep">Demandes d'inscription</h2>
              </div>
              <Link to="/admin/etablissements" className="text-xs font-bold text-gold hover:underline">
                Tout voir
              </Link>
            </div>
            {demandesInscription.length === 0 ? (
              <p className="text-sm text-slate-400">Aucune demande en attente.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {demandesInscription.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy-deep">{d.nom}</p>
                      <p className="truncate text-xs text-slate-400">
                        {d.type === "hotel" ? "Hôtel" : "Dortoir"} · {d.ville}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 gap-1.5">
                      <button
                        onClick={() => handleDecision(d.id, "valide")}
                        className="rounded-md bg-emerald-700 px-2.5 py-1 text-xs font-bold text-white"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleDecision(d.id, "refuse")}
                        className="rounded-md border border-red-100 px-2.5 py-1 text-xs font-bold text-red-600"
                      >
                        Rejeter
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Derniers avis clients ---------- */}
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="mb-3 font-display text-base font-semibold text-navy-deep">Derniers Avis Clients</h2>
        {avisRecents.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">Aucun avis pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {avisRecents.map((a) => (
              <div key={a.id} className="rounded-xl border border-neutral-100 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy-deep">{a.client}</p>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-gold">
                    <IconStar className="h-3.5 w-3.5" /> {a.note}
                  </span>
                </div>
                <p className="mb-1.5 text-xs text-slate-400">{a.etablissement}</p>
                <p className="line-clamp-2 text-sm text-slate-600">{a.commentaire || "—"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
