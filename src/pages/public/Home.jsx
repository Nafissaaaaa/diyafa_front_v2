import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WILAYAS } from "../../constants/wilayas";
import { IconPin, IconCalendar, IconHome, IconSearch } from "../../components/Icons";
import DatePicker from "../../components/DatePicker";
import CustomSelect from "../../components/CustomSelect";

// Photos de lieux emblematiques d'Algerie (Wikimedia Commons)
const HERO_IMAGES = [
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Casbah_of_Algiers,_the_heart_of_the_city.jpg?width=1600",
    label: "La Casbah d'Alger",
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Plage_La_pointe_pescade,_Alger,_Alg%C3%A9rie.jpg?width=1600",
    label: "La côte méditerranéenne d'Alger",
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pont_El_Kantara_(Constantine).jpg?width=1600",
    label: "Les ponts de Constantine",
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Les_montagnes_de_kabylie.jpg?width=1600",
    label: "Les montagnes de Kabylie",
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Timgad_(ruines).jpg?width=1600",
    label: "Les ruines romaines de Timgad",
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tassili_Desert_Algeria.jpg?width=1600",
    label: "Le désert du Tassili n'Ajjer",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [type, setType] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);

  // Change de photo de fond toutes les 6 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("ville", destination);
    if (dateDebut) params.set("dateDebut", dateDebut);
    if (dateFin) params.set("dateFin", dateFin);
    if (type) params.set("type", type);
    navigate(`/recherche?${params.toString()}`);
  }

  return (
    <div>
      {/* ---------- Hero avec photos de fond qui alternent ---------- */}
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-24">
        {/* Pile de photos en fondu-enchaine */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.url}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(14,30,61,0.55) 0%, rgba(14,30,61,0.75) 100%), url('${img.url}')`,
              opacity: i === heroIndex ? 1 : 0,
            }}
          />
        ))}

        <div className="relative w-full max-w-4xl text-center">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-gold-soft">
            Hôtels &amp; Dortoirs en Algérie
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
            Trouvez votre hébergement idéal en Algérie
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Hôtels et dortoirs sélectionnés pour vous, réservés en toute confiance.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 flex flex-col gap-4 rounded-2xl bg-white p-5 text-left shadow-2xl sm:p-6 md:flex-row md:items-center md:gap-5"
          >
            <div className="flex-1">
              <label className="mb-1.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-slate-500">
                <IconPin className="h-4 w-4 text-navy-deep" /> Où allez-vous ?
              </label>
              <CustomSelect
                value={destination}
                onChange={setDestination}
                placeholder="Toutes les wilayas"
                options={WILAYAS.map((w) => ({ value: w, label: w }))}
              />
            </div>

            <div className="h-px w-full bg-neutral-100 md:h-10 md:w-px" />

            <div className="flex-1">
              <label className="mb-1.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-slate-500">
                <IconCalendar className="h-4 w-4 text-navy-deep" /> Arrivée
              </label>
              <DatePicker
                value={dateDebut}
                onChange={setDateDebut}
                minDate={new Date().toISOString().slice(0, 10)}
              />
            </div>

            <div className="h-px w-full bg-neutral-100 md:h-10 md:w-px" />

            <div className="flex-1">
              <label className="mb-1.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-slate-500">
                <IconCalendar className="h-4 w-4 text-navy-deep" /> Départ
              </label>
              <DatePicker
                value={dateFin}
                onChange={setDateFin}
                minDate={dateDebut || new Date().toISOString().slice(0, 10)}
              />
            </div>

            <div className="h-px w-full bg-neutral-100 md:h-10 md:w-px" />

            <div className="flex-1">
              <label className="mb-1.5 flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-slate-500">
                <IconHome className="h-4 w-4 text-navy-deep" /> Type d'établissement
              </label>
              <CustomSelect
                value={type}
                onChange={setType}
                placeholder="Tous les types"
                options={[
                  { value: "hotel", label: "Hôtel" },
                  { value: "mraqed", label: "Dortoir" },
                ]}
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gold px-9 py-4 text-base font-semibold text-navy-deep transition hover:opacity-90"
            >
              <IconSearch className="h-4 w-4" /> Rechercher
            </button>
          </form>

          {/* Nom du lieu affiche + petits points de navigation */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs font-medium text-white/70">{HERO_IMAGES[heroIndex].label}</span>
            <div className="flex gap-1.5">
              {HERO_IMAGES.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setHeroIndex(i)}
                  aria-label={`Voir ${img.label}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === heroIndex ? "w-6 bg-gold" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Comment ca marche ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-display text-2xl font-semibold text-navy-deep">Comment ça marche</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["1", "Vous choisissez", "Sélectionnez vos dates et envoyez votre demande."],
            ["2", "L'établissement est notifié", "L'hôtel ou le dortoir reçoit la demande instantanément."],
            ["3", "En attente", "Le statut reste \"en attente\" jusqu'à la réponse."],
            ["4", "Confirmée", "Vous recevez une confirmation, votre séjour est garanti."],
          ].map(([n, title, desc]) => (
            <div key={n}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep font-display text-lg font-semibold text-white">
                {n}
              </div>
              <h3 className="mb-2 font-semibold text-navy-deep">{title}</h3>
              <p className="text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
