import { useState } from "react";

function IconUser({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c1.5-4 4.3-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M11.5 3.5H5.5A2 2 0 0 0 3.5 5.5v6c0 .53.21 1.04.59 1.41l8.5 8.5a2 2 0 0 0 2.82 0l6-6a2 2 0 0 0 0-2.82l-8.5-8.5a2 2 0 0 0-1.41-.59Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="8.2" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconPencil({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="m15.5 4.5 4 4L8 20H4v-4L15.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m13.5 6.5 4 4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconSend({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M21 3 10.5 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

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
        <h1 className="font-display text-3xl font-semibold text-navy-deep">Contactez-nous</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Une question, un problème avec une réservation, ou besoin d'aide ? Écrivez-nous, notre équipe vous répond rapidement.
        </p>
      </div>

      <div>
        {/* ---------- Formulaire ---------- */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Nom</label>
              <div className="relative">
                <IconUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.nom}
                  onChange={(e) => update("nom", e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Email</label>
              <div className="relative">
                <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Sujet de votre message</label>
            <div className="relative">
              <IconTag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Sujet de votre message"
                value={form.sujet}
                onChange={(e) => update("sujet", e.target.value)}
                className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-deep">Écrivez votre message</label>
            <div className="relative">
              <IconPencil className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <textarea
                placeholder="Écrivez votre message"
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full resize-y rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-sm text-navy-deep placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
            </div>
          </div>

          {sent && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Votre message a été envoyé. Nous vous répondrons rapidement.
            </p>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-navy-deep px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <IconSend className="h-4 w-4" />
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
