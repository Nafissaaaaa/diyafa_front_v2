import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import GoogleIcon from "../../components/GoogleIcon";
import PhoneCodeSelect from "../../components/PhoneCodeSelect";
import PasswordInput from "../../components/PasswordInput";
import Recaptcha from "../../components/Recaptcha";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    indicatif: "+213",
    telephone: "",
    motDePasse: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!captchaToken) {
      setError("Merci de confirmer que vous n'êtes pas un robot.");
      return;
    }

    if (!form.telephone.trim()) {
      setError("Merci de renseigner votre numéro de téléphone.");
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        role: "client",
        nom: form.nom,
        prenom: form.prenom,
        telephone: `${form.indicatif}${form.telephone}`,
        motDePasse: form.motDePasse,
        captchaToken,
      });
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
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="mb-6 flex flex-col items-center text-center">
        <Logo className="h-11" />
        <h1 className="mt-3 font-display text-2xl font-semibold text-navy-deep">Créer un compte</h1>
        <p className="mt-2 text-sm text-slate-500">Rejoignez Diyafa en tant que voyageur.</p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#DB4437] py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <GoogleIcon className="h-4 w-4" />
          </span>
          Se connecter avec Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="font-display text-sm italic text-slate-400">Ou</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-3">
            <div>
              <label className={labelClass}>Indicatif</label>
              <PhoneCodeSelect value={form.indicatif} onChange={(code) => update("indicatif", code)} />
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

          <Recaptcha onChange={setCaptchaToken} />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold py-3 font-semibold text-navy-deep hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Création..." : "S'INSCRIRE"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link to="/inscription/etablissement" className="font-semibold text-gold underline">
          Créez votre compte partenaire
        </Link>
      </p>

      <p className="mt-3 text-center text-sm text-slate-500">
        Déjà un compte ?{" "}
        <Link to="/connexion" className="font-semibold text-navy-deep underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}