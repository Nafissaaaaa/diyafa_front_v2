import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function OwnerLayout() {
  const { user } = useAuth();

  const links = [
    { to: "/partenaire", label: "Vue d'ensemble", end: true },
    { to: "/partenaire/reservations", label: "Réservations" },
    { to: "/partenaire/etablissement", label: "Mon établissement" },
  ];

  return (
    <div className="flex">
      <Sidebar title={`${user?.prenom} ${user?.nom}`} subtitle="Compte partenaire" links={links} />
      <main className="min-h-screen flex-1 bg-cream p-8">
        <Outlet />
      </main>
    </div>
  );
}
