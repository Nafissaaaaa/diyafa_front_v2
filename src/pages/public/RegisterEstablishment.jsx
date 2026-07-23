import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import { WILAYAS } from "../../constants/wilayas";
import { VILLES_PAR_WILAYA } from "../../constants/villes";
import PasswordInput from "../../components/PasswordInput";
import Recaptcha from "../../components/Recaptcha";

function SectionDivider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-neutral-200" />
      <span className="font-display text-sm italic text-slate-400">{label}</span>
      <span className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

export default function RegisterEstablishment() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    typeEtablissement: "",
    wilaya: "",
    ville: "",
    adresse: "",
    nomEtablissement: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    motDePasse: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_IMAGES = 10;
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 Mo
  const [images, setImages] = useState([]); // File[]

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateWilaya(value) {
    setForm((f) => ({ ...f, wilaya: value, ville: "" }));
  }

  function handleImagesChange(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // permet de reselectionner le meme fichier plus tard

    if (files.length === 0) return;

    const tropVolumineux = files.some((f) => f.size > MAX_IMAGE_SIZE);
    if (tropVolumineux) {
      setError("Chaque photo doit faire moins de 5 Mo.");
      return;
    }

    setImages((prev) => {
      const combined = [...prev, ...files];
      if (combined.length > MAX_IMAGES) {
        setError(`Vous ne pouvez ajouter que ${MAX_IMAGES} photos maximum.`);
        return combined.slice(0, MAX_IMAGES);
      }
      setError(null);
      return combined;
    });
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!captchaToken) {
      setError("Merci de confirmer que vous n'êtes pas un robot.");
      return;
    }
    if (!acceptTerms) {
      setError("Merci d'accepter les conditions du contrat.");
      return;
    }

    setLoading(true);
    try {
      // FormData car on joint des fichiers (photos de l'etablissement, 10 max).
      // "etablissement" est envoye en JSON stringifie, le backend le parse.
      const fd = new FormData();
      fd.append("nom", form.nom);
      fd.append("prenom", form.prenom);
      fd.append("telephone", form.telephone);
      fd.append("email", form.email);
      fd.append("motDePasse", form.motDePasse);
      fd.append("captchaToken", captchaToken);
      fd.append(
        "etablissement",
        JSON.stringify({
          type: form.typeEtablissement,
          wilaya: form.wilaya,
          ville: form.ville,
          adresse: form.adresse,
          nom: form.nomEtablissement,
        })
      );
      images.forEach((file) => fd.append("images", file));

      const user = await register(fd);
      if (user.role === "owner") navigate("/partenaire");
      else navigate("/mes-reservations");
    } catch (err) {
      setError(err.response?.data?.message || "Inscription impossible.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-navy-deep focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy-deep";

  return (
    <div className="mx-auto max-w-xl px-6 py-14">
      <div className="mb-6 flex flex-col items-center text-center">
        <Logo className="h-12 w-12" withText={false} />
        <h1 className="mt-3 font-display text-2xl font-bold text-navy-deep">Diyafa</h1>
        <p className="mt-2 text-sm text-slate-500">
          Créez votre compte partenaire et gérez votre établissement.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit}>
        <SectionDivider label="Informations établissement" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Type d'établissement</label>
            <select
              value={form.typeEtablissement}
              onChange={(e) => update("typeEtablissement", e.target.value)}
              className={inputClass}
              required
            >
              <option value="" disabled>Sélectionnez un type</option>
              <option value="hotel">Hôtel</option>
              <option value="mraqed">Dortoir</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Wilaya</label>
            <select
              value={form.wilaya}
              onChange={(e) => updateWilaya(e.target.value)}
              className={inputClass}
              required
            >
              <option value="" disabled>Sélectionnez une wilaya</option>
              {WILAYAS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Ville</label>
            <select
              value={form.ville}
              onChange={(e) => update("ville", e.target.value)}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-slate-400`}
              disabled={!form.wilaya}
              required
            >
              <option value="" disabled>
                {form.wilaya ? "Sélectionnez une ville" : "Choisissez d'abord une wilaya"}
              </option>
              {(VILLES_PAR_WILAYA[form.wilaya] || []).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Adresse</label>
          <input
            value={form.adresse}
            onChange={(e) => update("adresse", e.target.value)}
            className={inputClass}
            placeholder="Rue, quartier..."
            required
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>Nom d'établissement</label>
          <input
            value={form.nomEtablissement}
            onChange={(e) => update("nomEtablissement", e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div className="mt-4">
          <label className={labelClass}>
            Photos de l'établissement{" "}
            <span className="font-normal text-slate-400">
              ({images.length}/{MAX_IMAGES})
            </span>
          </label>

          <label
            className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-neutral-200 px-4 py-6 text-center transition hover:border-gold hover:bg-amber-50/40 ${
              images.length >= MAX_IMAGES ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleImagesChange}
              disabled={images.length >= MAX_IMAGES}
            />
            <span className="text-sm font-medium text-navy-deep">
              Cliquez pour ajouter des photos
            </span>
            <span className="text-xs text-slate-400">
              10 photos maximum, 5 Mo par photo (JPG, PNG, WEBP)
            </span>
          </label>

          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {images.map((file, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Supprimer cette photo"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="mt-1.5 text-xs text-slate-400">
            Elles seront envoyées à l'administrateur avec votre demande d'inscription.
          </p>
        </div>

        <SectionDivider label="Informations du compte" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nom</label>
            <input
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Prénom</label>
            <input
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Numéro de téléphone</label>
            <input
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Mot de passe</label>
            <PasswordInput
              value={form.motDePasse}
              onChange={(e) => update("motDePasse", e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <Recaptcha onChange={setCaptchaToken} className="mt-6" />

        <label className="mt-3 flex items-start gap-2.5 text-sm text-slate-500">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-neutral-300"
          />
          J'ai lu et j'accepte les{" "}
          <Link to="/contact" className="font-medium text-gold underline">
            conditions du contrat
          </Link>
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-gold py-3 font-semibold text-navy-deep hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Création..." : "CRÉER MON COMPTE"}
        </button>
      </form>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Vous êtes un voyageur ?{" "}
        <Link to="/inscription" className="font-semibold text-navy-deep underline">
          Créez votre compte client
        </Link>
      </p>
    </div>
  );
}
