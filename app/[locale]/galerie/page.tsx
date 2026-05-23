import type { Metadata } from "next";
import GalerieClient from "./GalerieClient";

type Params = { locale: "de" | "en" };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = (await params) ?? { locale: "de" };

  return {
    title:
      locale === "de"
        ? "Galerie - Enduro Drift Bosnien"
        : "Gallery - Enduro Drift Bosnia",
    description:
      locale === "de"
        ? "Fotos und Eindrücke unserer Enduro Touren in Bosnien."
        : "Photos and impressions from our Enduro tours in Bosnia.",
    alternates: {
      canonical: `/${locale}/galerie`,
      languages: {
        de: "/de/galerie",
        en: "/en/galerie",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/galerie`,
      title:
        locale === "de"
          ? "Galerie - Enduro Drift Bosnien"
          : "Gallery - Enduro Drift Bosnia",
      description:
        locale === "de"
          ? "Fotos und Eindrücke unserer Enduro Touren in Bosnien."
          : "Photos and impressions from our Enduro tours in Bosnia.",
    },
  };
}

export default function GaleriePage() {
  return <GalerieClient />;
}
