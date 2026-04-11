"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";

const SliderImage = dynamic(() => import("@/components/SliderImage"), { ssr: false });
const Tour = dynamic(() => import("@/components/Tour"));
const AboutBosna = dynamic(() => import("@/components/AboutBosna"), { ssr: false });
const Unterkunft = dynamic(() => import("@/components/Unterkunft"), { ssr: false });
const Motorcycles = dynamic(() => import("@/components/Motorcycles"));
const Rules = dynamic(() => import("@/components/Rules"));

export default function HomeClient() {
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
