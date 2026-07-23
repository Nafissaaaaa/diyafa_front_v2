const METHODS = [
  { label: "CIB", sub: "Carte interbancaire", bg: "bg-white", text: "text-navy-deep" },
  { label: "Edahabia", sub: "Algérie Poste", bg: "bg-white", text: "text-navy-deep" },
  { label: "VISA", sub: "", bg: "bg-white", text: "text-[#1a1f71]" },
  { label: "Mastercard", sub: "", bg: "bg-white", text: "text-navy-deep" },
];

export default function PaymentBadges({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {METHODS.map((m) => (
        <div
          key={m.label}
          className={`flex h-9 min-w-[68px] items-center justify-center rounded-md border border-white/10 ${m.bg} px-3 shadow-sm`}
        >
          <span className={`text-[11px] font-bold tracking-wide ${m.text}`}>{m.label}</span>
        </div>
      ))}
    </div>
  );
}
