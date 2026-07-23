const STYLES = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", label: "En attente" },
  accepted: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Confirmée" },
  rejected: { bg: "bg-red-50", text: "text-red-700", label: "Refusée" },
  cancelled: { bg: "bg-slate-100", text: "text-slate-500", label: "Annulée" },
  completed: { bg: "bg-navy/10", text: "text-navy", label: "Terminée" },
  valide: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Validé" },
  en_attente: { bg: "bg-amber-50", text: "text-amber-700", label: "En attente" },
  refuse: { bg: "bg-red-50", text: "text-red-700", label: "Refusé" },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {style.label}
    </span>
  );
}
