import { Link } from "react-router-dom";
import Logo from "./Logo";

const DESTINATIONS_POPULAIRES = ["Alger", "Oran", "Annaba", "Constantine"];

function IconPhone({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.6 20.9 3.1 13.4 4.5 5.2A2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 20c.6-3.3 3-5 5.5-5s4.9 1.7 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="8.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 12c2 .1 3.9 1.6 4.4 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconHeadset({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19 19v1a3 3 0 0 1-3 3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconFile({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6.5 3.5h8l4 4v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14.2 3.5V8h4.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 13h8M8 16.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9.2 12 1.9 1.9 3.7-3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconBuilding({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="3" width="11" height="18" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9.5h5v11.5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.2 7h1.2M7.2 10.5h1.2M7.2 14h1.2M11 7h1.2M11 10.5h1.2M11 14h1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 21v-3.5h1.9V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconFacebook({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v3.5H8V21h3.5v-7.5h3l.5-3.5h-3.5V8a1 1 0 0 1 1-1H15V3Z" />
    </svg>
  );
}

function IconInstagram({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconYoutube({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.4Z"
        fill="currentColor"
      />
      <path d="M10 9.3v5.4l4.6-2.7L10 9.3Z" fill="#0B1023" />
    </svg>
  );
}

const A_PROPOS_LINKS = [
  { label: "Qui sommes-nous ?", to: "/contact", icon: IconUsers },
  { label: "Contactez-nous", to: "/contact", icon: IconHeadset },
  { label: "Conditions d'utilisation", href: "#", icon: IconFile },
  { label: "Politique de confidentialité", href: "#", icon: IconShield },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep pb-8 pt-14 text-sm text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---------- Besoin d'aide ---------- */}
          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">Besoin d'aide ?</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <IconPhone className="h-4 w-4 text-gold" /> +213 XX XX XX XX
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="h-4 w-4 text-gold" /> contact@diyafa.dz
              </li>
            </ul>
          </div>

          {/* ---------- A propos ---------- */}
          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">À propos</h3>
            <ul className="space-y-2.5">
              {A_PROPOS_LINKS.map(({ label, to, href, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold" />
                  {to ? (
                    <Link to={to} className="hover:text-white">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="hover:text-white">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Destinations populaires ---------- */}
          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">Destinations populaires</h3>
            <ul className="space-y-2.5">
              {DESTINATIONS_POPULAIRES.map((ville) => (
                <li key={ville} className="flex items-center gap-2">
                  <IconPin className="h-4 w-4 text-gold" />
                  <Link to={`/recherche?ville=${encodeURIComponent(ville)}`} className="hover:text-white">
                    Hébergements à {ville}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Devenir partenaire ---------- */}
          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-white">Devenir partenaire ?</h3>
            <Link
              to="/inscription/etablissement"
              className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-navy-deep hover:opacity-90"
            >
              <IconBuilding className="h-4 w-4" />
              Ajoutez votre établissement
            </Link>
            <Link to="/connexion" className="block hover:text-white">
              Connectez-vous à votre établissement
            </Link>

            <div className="mt-5 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
              >
                <IconFacebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
              >
                <IconInstagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
              >
                <IconYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8">
          <Logo className="h-8" withText dark />
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} Diyafa — Plateforme de réservation d'hôtels et de dortoirs en Algérie.
          </p>
        </div>
      </div>
    </footer>
  );
}
