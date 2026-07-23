import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: brancher sur un endpoint backend (ex: POST /api/contact) une fois disponible.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-gold">
          Une question ?
        </span>
        <h1 className="font-display text-3xl font-semibold text-navy-deep">Contactez-nous</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Une question, un problème avec une réservation, ou besoin d'aide ? Écrivez-nous, notre équipe vous répond rapidement.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        {/* ---------- Formulaire ---------- */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm md:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Nom</label>
              <input
                type="text"
                placeholder="Votre nom"
                value={form.nom}
                onChange={(e) => update("nom", e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-deep">E-mail</label>
              <input
                type="email"
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Sujet</label>
            <input
              type="text"
              placeholder="Sujet de votre message"
              value={form.sujet}
              onChange={(e) => update("sujet", e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Message</label>
            <textarea
              placeholder="Écrivez votre message"
              rows={6}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              required
            />
          </div>

          {sent && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Votre message a été envoyé. Nous vous répondrons rapidement.
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-navy-deep px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Envoyer
          </button>
        </form>

        {/* ---------- Coordonnées ---------- */}
        <div className="space-y-4 md:col-span-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
            <p className="font-semibold text-navy-deep">contact@diyafa.dz</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Téléphone</p>
            <p className="font-semibold text-navy-deep">+213 XX XX XX XX</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Adresse</p>
            <p className="font-semibold text-navy-deep">Alger, Algérie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
