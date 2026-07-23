import { useEffect, useState } from "react";
import {
  myEstablishments,
  createEstablishment,
  createRoom,
  deleteRoom,
} from "../../api/establishments";
import StatusBadge from "../../components/StatusBadge";

export default function OwnerEstablishment() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nom: "", type: "hotel", wilaya: "", ville: "", adresse: "", description: "",
  });
  const [roomForms, setRoomForms] = useState({});

  function load() {
    setLoading(true);
    myEstablishments().then(setEstablishments).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreateEstablishment(e) {
    e.preventDefault();
    await createEstablishment(form);
    setShowForm(false);
    setForm({ nom: "", type: "hotel", wilaya: "", ville: "", adresse: "", description: "" });
    load();
  }

  async function handleAddRoom(establishmentId) {
    const data = roomForms[establishmentId] || {};
    if (!data.nomType || !data.prixNuit) return;
    await createRoom(establishmentId, {
      nomType: data.nomType,
      prixNuit: data.prixNuit,
      capacite: data.capacite || 1,
      nbDisponible: data.nbDisponible || 1,
    });
    setRoomForms((f) => ({ ...f, [establishmentId]: {} }));
    load();
  }

  async function handleDeleteRoom(roomId) {
    if (!confirm("Supprimer cette chambre/place ?")) return;
    await deleteRoom(roomId);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-deep">Mon établissement</h1>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy-deep"
        >
          + Nouvel établissement
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateEstablishment}
          className="mb-8 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-2"
        >
          <input
            placeholder="Nom de l'établissement"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="hotel">Hôtel</option>
            <option value="mraqed">Dortoir</option>
          </select>
          <input
            placeholder="Wilaya"
            value={form.wilaya}
            onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            required
          />
          <input
            placeholder="Ville"
            value={form.ville}
            onChange={(e) => setForm({ ...form, ville: e.target.value })}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            required
          />
          <input
            placeholder="Adresse"
            value={form.adresse}
            onChange={(e) => setForm({ ...form, adresse: e.target.value })}
            className="col-span-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="col-span-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            rows={3}
          />
          <button className="col-span-2 rounded-lg bg-navy-deep py-2.5 text-sm font-semibold text-white">
            Créer (en attente de validation admin)
          </button>
        </form>
      )}

      {loading && <p className="text-slate-400">Chargement...</p>}

      <div className="space-y-6">
        {establishments.map((est) => (
          <div key={est.id} className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-navy-deep">{est.nom}</h2>
                <p className="text-xs text-slate-400">{est.ville}, {est.wilaya}</p>
              </div>
              <StatusBadge status={est.statutValidation} />
            </div>

            <h3 className="mb-2 text-sm font-semibold text-navy-deep">Chambres / places</h3>
            <div className="mb-3 space-y-2">
              {est.rooms?.map((room) => (
                <div key={room.id} className="flex items-center justify-between rounded-lg bg-cream px-3 py-2 text-sm">
                  <span>{room.nomType} — {parseFloat(room.prixNuit).toLocaleString("fr-FR")} DA/nuit</span>
                  <button onClick={() => handleDeleteRoom(room.id)} className="text-xs font-semibold text-red-600">
                    Supprimer
                  </button>
                </div>
              ))}
              {(!est.rooms || est.rooms.length === 0) && (
                <p className="text-xs text-slate-400">Aucune chambre ajoutée pour le moment.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                placeholder="Type (ex: Chambre double)"
                value={roomForms[est.id]?.nomType || ""}
                onChange={(e) =>
                  setRoomForms((f) => ({ ...f, [est.id]: { ...f[est.id], nomType: e.target.value } }))
                }
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs"
              />
              <input
                placeholder="Prix/nuit"
                type="number"
                value={roomForms[est.id]?.prixNuit || ""}
                onChange={(e) =>
                  setRoomForms((f) => ({ ...f, [est.id]: { ...f[est.id], prixNuit: e.target.value } }))
                }
                className="w-28 rounded-lg border border-neutral-200 px-3 py-2 text-xs"
              />
              <button
                onClick={() => handleAddRoom(est.id)}
                className="rounded-lg bg-navy-deep px-4 py-2 text-xs font-semibold text-white"
              >
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
