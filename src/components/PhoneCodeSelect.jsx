import { useState, useRef, useEffect } from "react";
import FlagIcon from "./FlagIcon";
import { COUNTRY_CODES } from "../constants/countryCodes";

export default function PhoneCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-navy-deep focus:outline-none"
      >
        <FlagIcon iso={selected.iso} />
        <span className="font-medium text-navy-deep">{selected.code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
          {COUNTRY_CODES.map((c) => (
            <button
              key={c.iso}
              type="button"
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-cream"
            >
              <FlagIcon iso={c.iso} />
              <span className="text-slate-600">{c.label}</span>
              <span className="ml-auto font-medium text-navy-deep">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
