import { url } from "../lib/url";

export const site = {
  name: "A Modo Tuo",
  legalName: "A Modo Tuo di Sabrina Ferrand",
  tagline: "Multi-brand clothing",
  subtitle: "Abbigliamento",
  description:
    "A Modo Tuo Abbigliamento, punto di riferimento per l'abbigliamento donna a San Donà di Piave. Capi di qualità e Made in Italy.",
  phone: "+39 393 4053279",
  phoneDisplay: "393 405 3279",
  email: "amodotuo.store@gmail.com",
  address: "Via XIII Martiri 107 San Donà di Piave (VE)",
  addressShort: "Via XIII Martiri 107",
  city: "San Donà di Piave (VE)",
  vat: "P.IVA 04472690272",
  year: 2023,
  logo: url("/images/client/logo/Logo-A-Modo-Tuo-1.png"),
  logoFull: url("/images/client/logo/Logo-A-Modo-Tuo.png"),
  logoMark: url("/images/client/logo/Logo-A-Modo-Tuo-tagliato.png"),
  favicon: url("/images/client/logo/cropped-Logo-A-Modo-Tuo-tagliato.png"),
  social: {
    facebook: "https://www.facebook.com/amodotuostore/",
    instagram: "https://www.instagram.com/amodotuostore/?hl=it",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Via%20XIII%20Martiri%20107%20San%20Don%C3%A0%20di%20Piave%20%28VE%29&t=m&z=13&output=embed&iwloc=near",
  hours: [
    { day: "Lunedì", time: "9.30 – 12.30 / 16.00 – 19.30" },
    { day: "Martedì", time: "16.00 – 19.30" },
    { day: "Mercoledì", time: "9.30 – 12.30 / 16.00 – 19.30" },
    { day: "Giovedì", time: "9.30 – 12.30 / 16.00 – 19.30" },
    { day: "Venerdì", time: "9.30 – 12.30 / 16.00 – 19.30" },
    { day: "Sabato", time: "9.30 – 12.30 / 16.00 – 19.30" },
  ],
  utilityBar: [
    "Spedizione gratuita sopra gli 89€",
    "Spedizioni in tutta Italia",
    "Made In Italy",
  ],
  nav: [
    { label: "Home", href: url("/") },
    { label: "Donna", href: url("/donna/") },
    { label: "Outfit", href: url("/outfit/") },
    { label: "Contatti", href: url("/contatti/") },
  ],
  credit: {
    label: "Orezero Web Agency",
    href: "https://orezero.it/",
  },
  footerLinks: [
    { label: "Privacy Policy", href: url("/privacy-policy/") },
    { label: "Cookies Policy", href: url("/cookie-policy-ue/") },
    { label: "Termini e Condizioni", href: url("/termini-e-condizioni/") },
    { label: "Regolamento Fidelity Card", href: url("/regolamento-fidelity-card/") },
  ],
};
