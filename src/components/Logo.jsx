export default function Logo({ className = "h-9", withText = true, dark = false }) {
  // withText=true  -> full lockup (Arabic wordmark + "Diyafa" + arch icon)
  // withText=false -> arch icon only, useful for compact spots (avatars, badges)
  const src = withText ? "/brand/diyafa-logo-full.png" : "/brand/diyafa-logo-icon.png";
  const alt = "Diyafa";

  if (withText) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} w-auto object-contain ${dark ? "rounded-md bg-white p-1" : ""}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain ${dark ? "rounded-full bg-white p-1" : ""}`}
    />
  );
}
