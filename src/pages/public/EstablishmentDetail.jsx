import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEstablishment } from "../../api/establishments";
import { createReservation } from "../../api/reservations";
import { useAuth } from "../../context/AuthContext";
import { toAssetUrl } from "../../api/client";

export default function EstablishmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [establishment, setEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    getEstablishment(id)
      .then((data) => {
        setEstablishment(data);
        if (data.rooms?.length) setSelectedRoom(data.rooms[0].id);
        setActiveImage(data.imageVedette || (data.images || [])[0] || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleReserve(e) {
    e.preventDefault();
    setFeedback(null);

    if (!user) {
      navigate("/connexion");
      return;
    }
    if (user.role !== "client") {
      setFeedback({ type: "error", text: "Seul un compte client peut réserver." });
      return;
    }
    if (!selectedRoom || !dateDebut || !dateFin) {
      setFeedback({ type: "error", text: "Merci de remplir toutes les informations." });
      return;
    }

    if (dateDebut >= dateFin) {
      setFeedback({ type: "error", text: "La date de départ doit être après la date d'arrivée." });
      return;
    }

    if (nbPersonnes < 1) {
      setFeedback({ type: "error", text: "Le nombre de voyageurs doit être d'au moins 1." });
      return;
    }

    try {
      setSubmitting(true);
      await createReservation({
        establishmentId: id,
        roomId: selectedRoom,
        dateDebut,
        dateFin,
        nbPersonnes,
      });
      setFeedback({
        type: "success",
        text: "Demande envoyée. Vous serez notifié dès que l'établissement répondra.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Une erreur est survenue.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="mx-auto max-w-4xl px-6 py-16 text-slate-400">Chargement...</p>;
  if (!establishment) return <p className="mx-auto max-w-4xl px-6 py-16 text-slate-400">Établissement introuvable.</p>;

  const images = establishment.images || [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-3 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-deep">
        {activeImage && (
          <img src={toAssetUrl(activeImage)} alt={establishment.nom} className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
        )}
      </div>

      {images.length > 1 && (
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {images.map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(img)}
              className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                activeImage === img ? "border-gold" : "border-transparent"
              }`}
            >
              <img src={toAssetUrl(img)} alt="" className="h-full w-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <span className="text-xs font-bold uppercase text-gold">
            {establishment.type === "hotel" ? "Hôtel" : "Dortoir"}
          </span>
          <h1 className="mt-1 font-display text-3xl font-semibold text-navy-deep">{establishment.nom}</h1>
          <p className="mt-1 text-slate-500">📍 {establishment.adresse}, {establishment.ville}</p>
          <p className="mt-6 leading-relaxed text-slate-600">{establishment.description}</p>

          <h2 className="mt-10 mb-4 font-display text-xl font-semibold text-navy-deep">Chambres / places</h2>
          <div className="space-y-3">
            {establishment.rooms?.map((room) => (
              <label
                key={room.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                  selectedRoom === room.id ? "border-gold bg-gold/5" : "border-neutral-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="room"
                    checked={selectedRoom === room.id}
                    onChange={() => setSelectedRoom(room.id)}
                  />
                  <div>
                    <p className="font-semibold text-navy-deep">{room.nomType}</p>
                    <p className="text-xs text-slate-400">Capacité : {room.capacite} pers.</p>
                  </div>
                </div>
                <p className="font-bold text-navy-deep">
                  {parseFloat(room.prixNuit).toLocaleString("fr-FR")} DA
                  <span className="ml-1 text-xs font-normal text-slate-400">/ nuit</span>
                </p>
              </label>
            ))}
          </div>
        </div>

        <div>
          <form
            onSubmit={handleReserve}
            className="sticky top-24 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold text-navy-deep">Réserver</h3>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Arrivée</label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Départ</label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Voyageurs</label>
              <input
                type="number"
                min="1"
                value={nbPersonnes}
                onChange={(e) => setNbPersonnes(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>

            {feedback && (
              <p className={`text-sm ${feedback.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {feedback.text}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-navy-deep py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Envoi..." : "Envoyer la demande"}
            </button>
            <p className="text-center text-xs text-slate-400">
              Votre demande sera en statut « en attente » jusqu'à confirmation de l'établissement.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
