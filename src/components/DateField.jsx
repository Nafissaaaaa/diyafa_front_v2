import { useState, useEffect } from "react";

function formatDigits(digits) {
  let out = digits.slice(0, 2);
  if (digits.length >= 3) out += "/" + digits.slice(2, 4);
  if (digits.length >= 5) out += "/" + digits.slice(4, 8);
  return out;
}

function digitsToISO(digits) {
  if (digits.length !== 8) return "";
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return `${year}-${month}-${day}`;
}

function isoToDigits(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}${m}${y}`;
}

// Champ de saisie de date au format jj/mm/aaaa.
// La valeur transmise/recue par le parent reste au format ISO (aaaa-mm-jj),
// pratique pour l'envoyer telle quelle a l'API.
export default function DateField({ value, onChange, className = "", placeholder = "jj/mm/aaaa" }) {
  const [digits, setDigits] = useState(isoToDigits(value));

  useEffect(() => {
    setDigits(isoToDigits(value));
  }, [value]);

  function handleChange(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    setDigits(raw);
    onChange(digitsToISO(raw));
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={formatDigits(digits)}
      onChange={handleChange}
      maxLength={10}
      className={className}
    />
  );
}
