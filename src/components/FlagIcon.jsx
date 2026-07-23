// Drapeaux dessinés en SVG (au lieu des emojis, qui ne s'affichent pas sous Windows/Chrome —
// ils tombent en "DZ", "MA", etc. au lieu de l'image du drapeau).
// Formes simplifiées mais fidèles aux couleurs et à la disposition officielles.

function Base({ children, viewBox = "0 0 60 40" }) {
  return (
    <svg viewBox={viewBox} className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  );
}

const FLAGS = {
  DZ: (
    <Base>
      <rect width="30" height="40" fill="#006233" />
      <rect x="30" width="30" height="40" fill="#fff" />
      <circle cx="30" cy="20" r="8" fill="#D21034" />
      <circle cx="32.6" cy="20" r="6.6" fill="#fff" />
      <path d="M30 12l1.8 5.6h5.9l-4.8 3.4 1.8 5.6-4.7-3.4-4.7 3.4 1.8-5.6-4.8-3.4h5.9z" fill="#D21034" />
    </Base>
  ),
  MA: (
    <Base>
      <rect width="60" height="40" fill="#C1272D" />
      <path d="M30 13l2.2 6.8h7.1l-5.8 4.2 2.2 6.8-5.7-4.1-5.7 4.1 2.2-6.8-5.8-4.2h7.1z" fill="none" stroke="#006233" strokeWidth="1.6" />
    </Base>
  ),
  TN: (
    <Base>
      <rect width="60" height="40" fill="#E70013" />
      <circle cx="30" cy="20" r="10" fill="#fff" />
      <circle cx="31.6" cy="20" r="7" fill="#E70013" />
      <circle cx="33.6" cy="20" r="5.6" fill="#fff" />
      <path d="M30 14.5l1.4 4.3h4.6l-3.7 2.7 1.4 4.3-3.7-2.7-3.7 2.7 1.4-4.3-3.7-2.7h4.6z" fill="#E70013" />
    </Base>
  ),
  LY: (
    <Base>
      <rect width="60" height="13.3" fill="#E70013" />
      <rect y="13.3" width="60" height="13.4" fill="#000" />
      <rect y="26.7" width="60" height="13.3" fill="#239E46" />
      <circle cx="30" cy="20" r="5.5" fill="none" stroke="#fff" strokeWidth="1.2" />
      <circle cx="32" cy="20" r="4.6" fill="#000" />
      <path d="M30 16.3l1 3h3.2l-2.6 1.9 1 3-2.6-1.9-2.6 1.9 1-3-2.6-1.9h3.2z" fill="#fff" />
    </Base>
  ),
  EG: (
    <Base>
      <rect width="60" height="13.3" fill="#CE1126" />
      <rect y="13.3" width="60" height="13.4" fill="#fff" />
      <rect y="26.7" width="60" height="13.3" fill="#000" />
      <circle cx="30" cy="20" r="3.2" fill="#C09300" />
    </Base>
  ),
  MR: (
    <Base>
      <rect width="60" height="40" fill="#00A551" />
      <rect width="60" height="4" fill="#FFC400" y="0" opacity="0" />
      <rect width="60" height="3.5" fill="#E11B22" />
      <rect width="60" height="3.5" y="36.5" fill="#E11B22" />
      <path d="M30 13l1.8 5.6h5.9l-4.8 3.4 1.8 5.6-4.7-3.4-4.7 3.4 1.8-5.6-4.8-3.4h5.9z" fill="#FFC400" />
      <circle cx="32" cy="20" r="6" fill="none" stroke="#FFC400" strokeWidth="1.4" />
      <circle cx="30" cy="20" r="6.5" fill="#00A551" />
    </Base>
  ),
  SA: (
    <Base>
      <rect width="60" height="40" fill="#006C35" />
      <rect x="14" y="17" width="32" height="2.6" fill="#fff" />
      <rect x="14" y="21" width="24" height="2.6" fill="#fff" />
    </Base>
  ),
  AE: (
    <Base>
      <rect width="60" height="40" fill="#00732F" />
      <rect y="13.3" width="60" height="13.4" fill="#fff" />
      <rect y="26.7" width="60" height="13.3" fill="#000" />
      <rect width="16" height="40" fill="#FF0000" />
    </Base>
  ),
  QA: (
    <Base>
      <rect width="60" height="40" fill="#8D1B3D" />
      <rect width="20" height="40" fill="#fff" />
      <polygon points="20,0 26,0 20,5 26,5 20,10 26,10 20,15 26,15 20,20 26,20 20,25 26,25 20,30 26,30 20,35 26,35 20,40 20,40" fill="#8D1B3D" />
    </Base>
  ),
  TR: (
    <Base>
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="26" cy="20" r="8" fill="#fff" />
      <circle cx="28.4" cy="20" r="6.5" fill="#E30A17" />
      <path d="M35 15l1.6 4.9h5.2l-4.2 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.2-3h5.2z" fill="#fff" />
    </Base>
  ),
  FR: (
    <Base>
      <rect width="20" height="40" fill="#0055A4" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#EF4135" />
    </Base>
  ),
  BE: (
    <Base>
      <rect width="20" height="40" fill="#000" />
      <rect x="20" width="20" height="40" fill="#FAE042" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </Base>
  ),
  CH: (
    <Base>
      <rect width="60" height="40" fill="#D52B1E" />
      <rect x="25" y="12" width="10" height="16" fill="#fff" />
      <rect x="20" y="17" width="20" height="6" fill="#fff" />
    </Base>
  ),
  DE: (
    <Base>
      <rect width="60" height="13.3" fill="#000" />
      <rect y="13.3" width="60" height="13.4" fill="#DD0000" />
      <rect y="26.7" width="60" height="13.3" fill="#FFCE00" />
    </Base>
  ),
  ES: (
    <Base>
      <rect width="60" height="10" fill="#AA151B" />
      <rect y="10" width="60" height="20" fill="#F1BF00" />
      <rect y="30" width="60" height="10" fill="#AA151B" />
    </Base>
  ),
  IT: (
    <Base>
      <rect width="20" height="40" fill="#009246" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#CE2B37" />
    </Base>
  ),
  NL: (
    <Base>
      <rect width="60" height="13.3" fill="#AE1C28" />
      <rect y="13.3" width="60" height="13.4" fill="#fff" />
      <rect y="26.7" width="60" height="13.3" fill="#21468B" />
    </Base>
  ),
  GB: (
    <Base>
      <rect width="60" height="40" fill="#00247D" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="7" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#CF142B" strokeWidth="2.4" />
      <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="11" />
      <path d="M30 0V40M0 20H60" stroke="#CF142B" strokeWidth="4" />
    </Base>
  ),
  CA: (
    <Base>
      <rect width="15" height="40" fill="#D80621" />
      <rect x="15" width="30" height="40" fill="#fff" />
      <rect x="45" width="15" height="40" fill="#D80621" />
      <path d="M30 12l2 5-4.5-2 1 3-3.5 1 3 2.5-1.5 2.5h6.5l-1.5-2.5 3-2.5-3.5-1 1-3-4.5 2z" fill="#D80621" />
    </Base>
  ),
  US: (
    <Base>
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={(i * 40) / 13} width="60" height={20 / 13} fill={i % 2 === 0 ? "#B22234" : "#fff"} />
      ))}
      <rect width="26" height="21.5" fill="#3C3B6E" />
    </Base>
  ),
};

export default function FlagIcon({ iso, className = "h-3.5 w-5" }) {
  const flag = FLAGS[iso];
  return (
    <span className={`inline-block overflow-hidden rounded-[2px] border border-black/10 align-middle ${className}`}>
      {flag || <span className="block h-full w-full bg-neutral-200" />}
    </span>
  );
}
