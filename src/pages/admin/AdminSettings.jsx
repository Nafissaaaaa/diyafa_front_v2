import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/PasswordInput";

export default function AdminSettings() {
  const { user, updateProfile } = useAuth();

  const [email, setEmail] = useState(() => user?.email || "");
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pwdStatus, setPwdStatus] = useState(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    if (user?.email && user.email !== email) {
      setEmail(user.email);
    }
  }, [user?.email]);

  const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-navy-deep focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy-deep";

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setEmailStatus(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailStatus({ type: "error", message: "Email requis." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailStatus({ type: "error", message: "Format d'email invalide." });
      return;
    }
    if (trimmed === user?.email) {
      setEmailStatus({ type: "error", message: "Cet email est déjà le vôtre." });
      return;
    }
    setEmailLoading(true);
    try {
      await updateProfile({ email: trimmed });
      setEmailStatus({ type: "success", message: "Email mis à jour." });
    } catch (err) {
      setEmailStatus({ type: "error", message: err.response?.data?.message || "Impossible de mettre à jour l'email." });
    } finally {
      setEmailLoading(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPwdStatus(null);
    if (motDePasse !== confirmation) {
      setPwdStatus({ type: "error", message: "Les deux mots de passe ne correspondent pas." });
      return;
    }
    if (motDePasse.length < 8) {
      setPwdStatus({ type: "error", message: "Le mot de passe doit contenir au moins 8 caractères." });
      return;
    }
    setPwdLoading(true);
    try {
      await updateProfile({ motDePasse });
      setPwdStatus({ type: "success", message: "Mot de passe mis à jour." });
      setMotDePasse("");
      setConfirmation("");
    } catch (err) {
      setPwdStatus({ type: "error", message: err.response?.data?.message || "Impossible de mettre à jour le mot de passe." });
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-navy-deep">Paramètres</h1>
      <p className="mb-8 text-sm text-slate-500">Gère les informations de connexion de ton compte administrateur.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ---------- Email ---------- */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-deep">Adresse email</h2>
          <form onSubmit={handleEmailSubmit}>
            <label className={labelClass}>Email actuel</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
            {emailStatus && (
              <p className={`mt-2 text-sm ${emailStatus.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {emailStatus.message}
              </p>
            )}
            <button
              type="submit"
              disabled={emailLoading}
              className="mt-4 rounded-lg bg-navy-deep px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
            >
              {emailLoading ? "Mise à jour..." : "Mettre à jour l'email"}
            </button>
          </form>
        </div>

        {/* ---------- Mot de passe ---------- */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-navy-deep">Mot de passe</h2>
          <form onSubmit={handlePasswordSubmit}>
            <label className={labelClass}>Nouveau mot de passe</label>
            <PasswordInput
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className={inputClass}
              required
            />
            <p className="mt-1 text-xs text-slate-400">Au moins 8 caractères, avec une lettre et un chiffre.</p>

            <label className={`${labelClass} mt-4`}>Confirmer le nouveau mot de passe</label>
            <PasswordInput
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className={inputClass}
              required
            />

            {pwdStatus && (
              <p className={`mt-2 text-sm ${pwdStatus.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {pwdStatus.message}
              </p>
            )}
            <button
              type="submit"
              disabled={pwdLoading}
              className="mt-4 rounded-lg bg-navy-deep px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
            >
              {pwdLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
