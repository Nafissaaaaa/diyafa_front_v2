import Logo from "./Logo";
import PaymentBadges from "./PaymentBadges";

export default function Footer() {
  return (
    <footer className="bg-navy-deep pb-8 pt-10 text-center text-sm text-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
        <Logo className="h-8" withText dark />

        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-white/40">Paiement sécurisé</p>
          <PaymentBadges />
        </div>

        <p>© {new Date().getFullYear()} Diyafa — Plateforme de réservation d'hôtels et de dortoirs en Algérie.</p>
      </div>
    </footer>
  );
}
