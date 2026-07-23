import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
];

function LanguageSwitcher() {
  // Purement visuel pour l'instant — le vrai systeme de traduction (FR/AR/EN + RTL) sera branche ensuite.
  const [lang, setLang] = useState("fr");
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === lang);
  const others = LANGUAGES.filter((l) => l.code !== lang);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-semibold text-gold"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
        <span>{current.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          {others.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-cream"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RegisterDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy-deep hover:opacity-90"
      >
        Inscription
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          <Link
            to="/inscription"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-cream hover:text-navy-deep"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 20c1.5-4 4.3-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Client
          </Link>
          <Link
            to="/inscription/etablissement"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-cream hover:text-navy-deep"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="4" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Établissement
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function dashboardLink() {
    if (!user) return null;
    if (user.role === "admin") return "/admin";
    if (user.role === "owner") return "/partenaire";
    return "/mes-reservations";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 lg:flex">
          <Link to="/recherche?type=hotel" className="hover:text-navy">Hôtels</Link>
          <Link to="/recherche?type=mraqed" className="hover:text-navy">Dortoirs</Link>
          <span className="h-4 w-px bg-neutral-200" />
          <Link to="/contact" className="hover:text-navy">Contact</Link>
          <Link to="/partenaire/etablissement" className="hover:text-navy">Ajoutez votre établissement</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {user ? (
            <>
              <Link
                to={dashboardLink()}
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-navy-deep hover:border-navy-deep"
              >
                {user.role === "admin" ? "Admin" : user.role === "owner" ? "Mon espace" : "Mon compte"}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-navy-deep px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/connexion"
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-navy-deep hover:border-navy-deep"
              >
                Se connecter
              </Link>
              <RegisterDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
