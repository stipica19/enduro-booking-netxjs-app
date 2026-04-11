import type { Metadata } from "next";
import HomeClient from "./HomeClient";

type Params = { locale: "de" | "en" };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = (await params) ?? { locale: "de" };

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      url: `https://endurodriftbosnien.com/${locale}`,
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
