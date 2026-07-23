import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  IconGrid,
  IconHome,
  IconCalendar,
  IconInbox,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconBell,
} from "../../components/Icons";

function AvatarMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-deep"
      >
        {(user?.prenom?.[0] || "A").toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-20 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1.5 shadow-lg">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-navy-deep">
              {user?.prenom} {user?.nom}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <Link
            to="/admin/parametres"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-neutral-50 hover:text-navy-deep"
          >
            Modifier l'email
          </Link>
          <Link
            to="/admin/parametres"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-neutral-50 hover:text-navy-deep"
          >
            Modifier le mot de passe
          </Link>
          <button
            onClick={onLogout}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const links = [
    { to: "/admin", label: "Tableau de bord", end: true, icon: <IconGrid /> },
    {
      to: "/admin/etablissements",
      label: "Établissements",
      icon: <IconHome />,
      children: [
        { to: "/admin/etablissements", label: "Demandes en attente", end: true },
        { to: "/admin/etablissements/valides", label: "Établissements validés" },
      ],
    },
    { to: "/admin/reservations", label: "Réservations", icon: <IconCalendar /> },
    { to: "/admin/etablissements", label: "Demandes d'inscription", icon: <IconInbox /> },
    { to: "/admin/utilisateurs", label: "Utilisateurs", icon: <IconUsers /> },
    { to: "/admin/statistiques", label: "Statistiques", icon: <IconChartBar /> },
    { to: "/admin/parametres", label: "Paramètres", icon: <IconSettings /> },
  ];

  return (
    <div className="flex">
      <Sidebar title={`${user?.prenom} ${user?.nom}`} subtitle="Administrateur" links={links} />
      <div className="flex min-h-screen flex-1 flex-col bg-cream">
        <header className="flex items-center justify-end gap-4 border-b border-neutral-200 bg-white px-8 py-3.5">
          <span className="text-sm text-slate-500">
            Bienvenue, <span className="font-semibold text-navy-deep">{user?.prenom || "Admin"}</span> !
          </span>
          <button className="relative rounded-full p-2 text-slate-400 hover:bg-neutral-100 hover:text-navy-deep">
            <IconBell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <AvatarMenu user={user} onLogout={handleLogout} />
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
