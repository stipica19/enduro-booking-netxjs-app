// app/[locale]/kontakt/page.tsx
import type { Metadata } from "next";
import KontaktClient from "./KontaktClient";

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
        ? "Kontakt - Enduro Drift Bosnien"
        : "Contact - Enduro Drift Bosnia",
    description:
      locale === "de"
        ? "Kontaktieren Sie uns für Fragen zu Enduro Touren."
        : "Contact us for questions about Enduro tours.",
    alternates: {
      canonical: `/${locale}/kontakt`,
      languages: {
        de: "/de/kontakt",
        en: "/en/kontakt",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/kontakt`,
      title:
        locale === "de"
          ? "Kontakt - Enduro Drift Bosnien"
          : "Contact - Enduro Drift Bosnia",
      description:
        locale === "de"
          ? "Kontaktieren Sie uns für Fragen zu Enduro Touren."
          : "Contact us for questions about Enduro tours.",
    },
  };
}
export default function KontaktPage() {
  return <KontaktClient />;
}
