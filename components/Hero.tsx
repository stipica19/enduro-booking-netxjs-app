import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <section className="relative w-screen h-[98vh] overflow-hidden">
      {/* Background Image - full viewport width */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bild.webp"
          alt="Enduro Drift Bosnien - Enduro Touren in Bosnien"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </div>
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent -z-10" />

      {/* Content container */}
      <div className="relative z-20 mx-auto h-full max-w-7xl px-6 flex items-center">
        <div className="flex flex-1 flex-col xl:w-1/2 text-white">
          {/* Promo oznaka – namjerno nije heading, da ne razbija redoslijed h1/h2 */}
          <div className="bg-red-600 text-white font-bold text-center py-2 px-4 rounded-md text-sm md:text-base animate-bounce w-fit mb-1">
            <p>{t("akcija")}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {t("hero_title")}
          </h1>
          <p className="mt-2 text-lg md:text-lg uppercase tracking-widest text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            Enduro <span style={{ color: "red" }}>Drift</span> Bosnien
          </p>
          <p className="mt-4 text-base md:text-xl text-white/90 max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {t("hero_subtitle")}
          </p>

          <ul className="mt-2 md:mt-6 space-y-1 md:space-y-3 text-white/95 text-base md:text-lg">
            {[
              t("hero_points.0"),
              t("hero_points.1"),
              t("hero_points.2"),
              t("hero_points.3"),
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 md:gap-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
              >
                <span className="text-green-400 font-bold text-xl">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Rating: 5 stars and review count */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    fill="yellow"
                    d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                  />
                </svg>
              ))}
            </div>
            <p className="font-bold text-white/95">
              300+{" "}
              <span className="font-medium text-white/80 ml-1">
                {t("star")}
              </span>
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col sm:flex-row gap-4">
            {/* Linkovi stilizirani kao gumbi – <button> unutar <a> je nevaljan HTML */}
            <Link
              href={`/${locale}/anmeldung`}
              className="rounded-xl uppercase text-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 md:px-8 py-4 md:py-5 shadow-lg tracking-widest"
            >
              {t("hero_btn_primary")}
            </Link>
            <Link
              href={`/${locale}#tours`}
              className="rounded-xl uppercase text-center bg-white/90 hover:bg-white text-gray-900 font-semibold px-6 md:px-8 py-4 md:py-5 shadow-md border border-white/60 backdrop-blur-sm"
            >
              {t("hero_btn_secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
