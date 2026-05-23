import type { Metadata } from "next";
import ReisefuhrerClient from "./ReisefuhrerClient";

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
        ? "Reiseführer - Enduro Drift Bosnien"
        : "Travel Guide - Enduro Drift Bosnia",
    description:
      locale === "de"
        ? "Nützliche Informationen und Tipps für Ihre Enduro Reise."
        : "Useful information and tips for your Enduro trip.",
    alternates: {
      canonical: `/${locale}/reisefuhrer`,
      languages: {
        de: "/de/reisefuhrer",
        en: "/en/reisefuhrer",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/reisefuhrer`,
      title:
        locale === "de"
          ? "Reiseführer - Enduro Drift Bosnien"
          : "Travel Guide - Enduro Drift Bosnia",
      description:
        locale === "de"
          ? "Nützliche Informationen und Tipps für Ihre Enduro Reise."
          : "Useful information and tips for your Enduro trip.",
    },
  };
}
export default function ReisefuhrerPage() {
  return <ReisefuhrerClient />;
}
