import type { Metadata } from "next";
import GaestebuchClient from "./GaestebuchClient";

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
        ? "Gästebuch - Enduro Drift Bosnien"
        : "Guestbook - Enduro Drift Bosnia",
    description:
      locale === "de"
        ? "Lesen und schreiben Sie Einträge in unserem Gästebuch."
        : "Read and write entries in our guestbook.",
    alternates: {
      canonical: `/${locale}/gastebuch`,
      languages: {
        de: "/de/gastebuch",
        en: "/en/gastebuch",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/gastebuch`,
      title:
        locale === "de"
          ? "Gästebuch - Enduro Drift Bosnien"
          : "Guestbook - Enduro Drift Bosnia",
      description:
        locale === "de"
          ? "Lesen und schreiben Sie Einträge in unserem Gästebuch."
          : "Read and write entries in our guestbook.",
    },
  };
}
export default function GaestebuchPage() {
  return <GaestebuchClient />;
}
