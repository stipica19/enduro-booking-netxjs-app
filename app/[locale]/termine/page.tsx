import TourTabele from "@/components/TourTabele";
import { useTranslations } from "next-intl";
import React from "react";

import type { Metadata } from "next";

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
        ? "Termine - Enduro Drift Bosnien"
        : "Dates - Enduro Drift Bosnia",
    description:
      locale === "de"
        ? "Aktuelle Termine und Verfügbarkeiten für Enduro Touren."
        : "Current dates and availability for Enduro tours.",
    alternates: {
      canonical: `/${locale}/termine`,
      languages: {
        de: "/de/termine",
        en: "/en/termine",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}/termine`,
      title:
        locale === "de"
          ? "Termine - Enduro Drift Bosnien"
          : "Dates - Enduro Drift Bosnia",
      description:
        locale === "de"
          ? "Aktuelle Termine und Verfügbarkeiten für Enduro Touren."
          : "Current dates and availability for Enduro tours.",
    },
  };
}
export default function TerminePage() {
  const t = useTranslations();
  return (
    <section className="relative min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          🏍️ {t("termine_t")}
        </h1>
        <p className="text-lg text-gray-700 font-bold mt-4">
          {t("termine_t1")}
        </p>
        <p className="text-lg text-gray-700 mt-4">{t("termine_p")}</p>
        <p className="text-lg font-bold mt-4 text-gray-900">
          {" "}
          {t("termine_p2")}
        </p>
      </div>

      {/* Tabela sa terminima */}
      <TourTabele />
    </section>
  );
}
