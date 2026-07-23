import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import PhoneCodeSelect from "../../components/PhoneCodeSelect";
import PasswordInput from "../../components/PasswordInput";
import Recaptcha from "../../components/Recaptcha";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [indicatif, setIndicatif] = useState("+213");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!captchaToken) {
      setError("Merci de confirmer que vous n'êtes pas un robot.");
      return;
    }

    if (!email && !telephone) {
      setError("Merci de renseigner votre email ou votre numéro de téléphone.");
      return;
    }

    // On envoie l'email s'il est rempli, sinon le numero (avec indicatif) ;
    // le backend detecte automatiquement lequel des deux a ete fourni.
    const identifiant = email.trim() ? email.trim() : `${indicatif}${telephone}`;

    setLoading(true);
    try {
      const user = await login(identifiant, motDePasse, captchaToken);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/partenaire");
      else navigate("/mes-reservations");
    } catch (err) {
      setError(err.response?.data?.message || "Connexion impossible.");
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
        <h1 className="mt-3 font-display text-2xl font-semibold text-navy-deep">Se connecter</h1>
        <p className="mt-2 text-sm text-slate-500">Accédez à votre espace Diyafa.</p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="font-display text-sm italic text-slate-400">Ou</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-3">
            <div>
              <label className={labelClass}>Indicatif</label>
              <PhoneCodeSelect value={indicatif} onChange={setIndicatif} />
            </div>
            <div>
              <label className={labelClass}>Numéro de téléphone</label>
              <input
                value={telephone}
                onChange={(e) => setTelephone(e.target.value.replace(/\D/g, ""))}
                placeholder="555 12 34 56"
                inputMode="numeric"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Mot de passe</label>
            <PasswordInput
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <Recaptcha onChange={setCaptchaToken} />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-navy-deep py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <Link to="/inscription" className="font-semibold text-navy-deep underline">
          S'inscrire
        </Link>
      </p>
    </div>
  );
}
