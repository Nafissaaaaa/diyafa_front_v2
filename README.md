# Diyafa — Frontend

Application React (Vite + React Router + Tailwind CSS) connectée au backend `diyafa-backend`.

## Installation

```bash
cd diyafa-frontend
npm install
cp .env.example .env
# Verifier que VITE_API_URL pointe vers votre backend (http://localhost:5000/api par defaut)

npm run dev
```

Application disponible sur `http://localhost:3000`. Le backend doit tourner en parallele sur le port 5000.

## Structure du projet

```
src/
  api/                 -> tous les appels HTTP vers le backend (axios)
    client.js           -> instance axios + injection automatique du token JWT
    auth.js              -> login / register / me
    establishments.js    -> public + owner + admin
    reservations.js      -> client + owner + admin
    admin.js              -> utilisateurs + statistiques

  context/
    AuthContext.jsx      -> session utilisateur (role, token) partagee dans toute l'app

  components/
    Navbar.jsx, Footer.jsx
    EstablishmentCard.jsx
    StatusBadge.jsx        -> badge pending/accepted/rejected reutilise partout
    ProtectedRoute.jsx      -> protection des pages par role
    Sidebar.jsx              -> menu lateral (partenaire + admin)

  pages/
    PublicLayout.jsx
    public/     -> Home, Search, EstablishmentDetail, Login, Register
    client/     -> MyReservations
    owner/      -> OwnerLayout, OwnerOverview, OwnerReservations, OwnerEstablishment
    admin/      -> AdminLayout, AdminOverview, AdminEstablishments, AdminReservations, AdminUsers

  routes/
    AppRoutes.jsx    -> toutes les routes de l'application
```

## Plan du site (routes)

| Route | Page | Acces |
|---|---|---|
| `/` | Accueil + recherche | Public |
| `/recherche` | Liste des etablissements (filtres ville/type) | Public |
| `/etablissements/:id` | Detail + formulaire de reservation | Public (reservation reservee aux clients connectes) |
| `/connexion`, `/inscription` | Auth | Public |
| `/mes-reservations` | Historique et statut des reservations | Client |
| `/partenaire` | Vue d'ensemble (stats + demandes a traiter) | Owner |
| `/partenaire/reservations` | Liste complete + accepter/refuser | Owner |
| `/partenaire/etablissement` | Creer/gerer etablissement + chambres | Owner |
| `/admin` | Statistiques globales | Admin |
| `/admin/etablissements` | Validation des partenaires | Admin |
| `/admin/reservations` | Reservations (filtre par defaut: accepted) | Admin |
| `/admin/utilisateurs` | Gestion des comptes | Admin |

## Le flux de reservation cote frontend

1. Le client remplit le formulaire sur `EstablishmentDetail.jsx` -> `POST /reservations` -> statut `pending`
2. Le partenaire voit la demande sur `OwnerOverview.jsx` / `OwnerReservations.jsx`
3. Clic sur "Accepter" -> `PATCH /owner/reservations/:id/accept` -> statut `accepted`
4. La reservation apparait automatiquement dans `AdminReservations.jsx` (filtre par defaut = accepted)

## Authentification

Le token JWT est stocke dans `localStorage` (`diyafa_token`) et injecte automatiquement dans chaque
requete via l'intercepteur axios (`src/api/client.js`). En cas de token expire (401), l'utilisateur est
redirige automatiquement vers `/connexion`.

## Prochaines etapes (V2)

- Upload d'images (etablissements, chambres) via un composant dedie + Cloudinary/S3
- Carte interactive (Leaflet ou Google Maps) sur la page recherche et detail
- Notifications en temps reel (WebSocket) au lieu du rechargement manuel
- Support RTL complet pour l'arabe
- Pagination sur les listes (etablissements, reservations, utilisateurs)
