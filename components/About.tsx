import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const About = () => {
  const locale = useLocale();

  const t = useTranslations();

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        {/* Left - Text */}
        <div className="lg:w-1/2 flex flex-col justify-center animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-snug">
            🌍 {t("about_title")}
          </h2>

          {/* 1-liner value bar */}
          <p className="text-sm md:text-base text-gray-600 mb-6">
            {t("about_value_line")}
          </p>

          {/* short intro */}
          <p className="text-lg font-medium text-gray-800 mb-4">
            👋 {t("about_p1")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{t("about_p2")}</p>

          {/* quick facts */}
          <ul className="text-left mx-auto lg:mx-0 max-w-xl space-y-2 text-gray-700 mb-8">
            <li>✅ {t("about_fact_1")}</li>
            <li>✅ {t("about_fact_2")}</li>
            <li>✅ {t("about_fact_3")}</li>
            <li>✅ {t("about_fact_4")}</li>
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#tours" className="btn btn--secondary">
              <button className="rounded-xl uppercase bg-white/90 hover:bg-white text-gray-900 font-semibold px-2 md:px-4 py-1 md:py-2 shadow-md border border-white/60 backdrop-blur-sm">
                {t("about_cta_prices")}
              </button>
            </a>
            <Link href={`/${locale}/anmeldung`}>
              <button className="rounded-xl uppercase bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-2 md:px-4 py-1 md:py-2 shadow-lg tracking-widest">
                {t("about_cta_request")}{" "}
              </button>{" "}
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-[320px] h-[420px] md:w-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-500">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              aria-label={t("about_image_alt")}
              poster="/ckalja-motor.webp"
            >
              <source src="/video/enduro-video.mp4" type="video/mp4" />
              <source src="/video/enduro-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
