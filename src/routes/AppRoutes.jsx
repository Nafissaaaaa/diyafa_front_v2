import { Routes, Route } from "react-router-dom";
import PublicLayout from "../pages/PublicLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/public/Home";
import Search from "../pages/public/Search";
import EstablishmentDetail from "../pages/public/EstablishmentDetail";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import RegisterEstablishment from "../pages/public/RegisterEstablishment";
import Contact from "../pages/public/Contact";

import MyAccount from "../pages/client/MyAccount";

import OwnerLayout from "../pages/owner/OwnerLayout";
import OwnerOverview from "../pages/owner/OwnerOverview";
import OwnerReservations from "../pages/owner/OwnerReservations";
import OwnerEstablishment from "../pages/owner/OwnerEstablishment";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminEstablishments from "../pages/admin/AdminEstablishments";
import AdminValidatedEstablishments from "../pages/admin/AdminValidatedEstablishments";
import AdminReservations from "../pages/admin/AdminReservations";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminStatistics from "../pages/admin/AdminStatistics";
import AdminSettings from "../pages/admin/AdminSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- Site public ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/etablissements/:id" element={<EstablishmentDetail />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/inscription/etablissement" element={<RegisterEstablishment />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- Client ---------- */}
        <Route
          path="/mes-reservations"
          element={
            <ProtectedRoute roles={["client"]}>
              <MyAccount />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ---------- Espace partenaire (hotel / mraqed) ---------- */}
      <Route
        path="/partenaire"
        element={
          <ProtectedRoute roles={["owner", "admin"]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OwnerOverview />} />
        <Route path="reservations" element={<OwnerReservations />} />
        <Route path="etablissement" element={<OwnerEstablishment />} />
      </Route>

      {/* ---------- Espace admin ---------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="etablissements" element={<AdminEstablishments />} />
        <Route path="etablissements/valides" element={<AdminValidatedEstablishments />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="utilisateurs" element={<AdminUsers />} />
        <Route path="statistiques" element={<AdminStatistics />} />
        <Route path="parametres" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
