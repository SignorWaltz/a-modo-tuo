export type GalleryItem = {
  src: string;
  full: string;
  alt: string;
};

const photos = "/images/client/photos";

const toItems = (pairs: [thumb: string, full: string][], alt: string): GalleryItem[] =>
  pairs.map(([thumb, full], i) => ({
    src: `${photos}/${thumb}`,
    full: `${photos}/${full}`,
    alt: `${alt} ${i + 1}`,
  }));

export const donnaGallery = toItems(
  [
    ["2200654512.jpeg", "IMG_1803.jpeg"],
    ["3499679977.jpg", "01112023-DSC03823.jpg"],
    ["854264006.jpeg", "IMG_1302.jpeg"],
    ["3366642238.jpeg", "IMG_1781.jpeg"],
    ["235853146.jpeg", "IMG_1780.jpeg"],
    ["671459245.jpeg", "IMG_1775.jpeg"],
    ["2755057030.jpeg", "IMG_1771.jpeg"],
    ["3923493832.jpg", "01112023-DSC03672.jpg"],
  ],
  "Look donna",
);

export const outfitGallery = toItems(
  [
    ["1729906822.jpeg", "IMG_1744-Copia.jpeg"],
    ["3137665694.jpeg", "IMG_1448.jpeg"],
    ["2881902983.jpeg", "FullSizeRender-2024-03-09T173605.836.jpeg"],
    ["2711954916.jpeg", "IMG_1169.jpeg"],
    ["1873871869.jpeg", "IMG_0950.jpeg"],
  ],
  "Outfit",
);

export const donnaPage = {
  title: "Donna",
  description:
    "Il nostro negozio di abbigliamento donna offre una vasta selezione di capi realizzati con passione e dedizione, tutto rigorosamente Made in Italy.",
  intro: {
    label: "A MODO TUO",
    title: "DONNA",
    textHtml:
      "Il nostro negozio di abbigliamento donna offre una vasta selezione di capi realizzati con passione e dedizione, con l’obiettivo di far risplendere la bellezza di ogni donna, tutto rigorosamente <strong>Made in Italy</strong>.",
  },
};

export const outfitPage = {
  title: "Outfit",
  description: "Tantissimi abbinamenti scelti con cura per rendere lo shopping un’esperienza piacevole e senza stress.",
  intro: {
    label: "A MODO TUO",
    title: "OUTFIT",
    textHtml:
      "Tantissimi abbinamenti scelti con cura per rendere lo shopping un’esperienza piacevole e senza stress.<br />Che tu stia cercando l’abito perfetto per un’occasione speciale, un completo elegante per il lavoro o un look rilassato per il tempo libero, siamo qui per aiutarti a trovare ciò che meglio si adatta al tuo stile e alle tue esigenze.",
  },
};

export const contactsPage = {
  title: "Contatti",
  description: "Vieni a trovarci in negozio: Via XIII Martiri 107, San Donà di Piave (VE).",
};

export const fidelityPage = {
  label: "A modo tuo",
  title: "Fidelity Card",
  intro:
    "Richiedi la tua Fidelity Card e resta aggiornata su novità e vantaggi riservati.",
  formTitle: "Richiedi la tua Fidelity Card",
  image: `${photos}/01112023-DSC03671.jpg`,
};
