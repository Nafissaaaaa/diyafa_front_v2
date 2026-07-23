import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const Recaptcha = forwardRef(function Recaptcha({ onChange, className = "" }, ref) {
  return (
    <div className={className}>
      <ReCAPTCHA ref={ref} sitekey={SITE_KEY} onChange={onChange} onExpired={() => onChange(null)} hl="fr" />
    </div>
  );
});

export default Recaptcha;