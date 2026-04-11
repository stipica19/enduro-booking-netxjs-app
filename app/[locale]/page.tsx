import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";

const SliderImage = dynamic(() => import("@/components/SliderImage"), { ssr: false });
const Tour = dynamic(() => import("@/components/Tour"));
const AboutBosna = dynamic(() => import("@/components/AboutBosna"), { ssr: false });
const Unterkunft = dynamic(() => import("@/components/Unterkunft"), { ssr: false });
const Motorcycles = dynamic(() => import("@/components/Motorcycles"));
const Rules = dynamic(() => import("@/components/Rules"));
import { useTranslations } from "next-intl";

import type { Metadata } from "next";

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
  const t = useTranslations();

  return (
    <>
      <Hero />
      <About />
      <SliderImage />
      <Tour />
      <AboutBosna />
      <Unterkunft />
      <Motorcycles />
      <Rules />
    </>
  );
}
