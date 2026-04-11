"use client";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const Tour = () => {
  const locale = useLocale();
  const t = useTranslations();

  const tours = [
    {
      id: 1,
      title: "tour1_title",
      image: "/tura1-map.webp",
      prices: {
        ownBike: "tour1_priceOwnBike",
        rentalBike: "tour1_priceRentalBike",
      },
      details: [
        "tour1_detail6",
        "tour1_detail1",
        "tour1_detail2",
        "tour1_detail3",
        "tour1_detail4",
        "tour1_detail5",

        "tour1_dolazak",
        "tour1_odlazak",
        "vinjete",
      ],
    },
    {
      id: 2,
      title: "tour2_title",
      image: "/tura2-map.webp",
      prices: {
        ownBike: "tour2_priceOwnBike",
        rentalBike: "tour2_priceRentalBike",
      },
      details: [
        "tour2_detail6",
        "tour2_detail1",

        "tour2_detail2",
        "tour2_detail3",
        "tour2_detail4",
        "tour2_detail5",
        "tour2_dolazak",
        "tour2_odlazak",
        "vinjete",
      ],
    },
    {
      id: 3,
      title: "tour3_title",
      image: "/tura22-map.webp",
      prices: {
        ownBike: "tour3_priceOwnBike",
        rentalBike: "tour3_priceRentalBike",
      },
      details: [
        "tour3_detail6",
        "tour3_detail1",
        "tour3_detail2",
        "tour3_detail3",
        "tour3_detail4",
        "tour3_detail5",
        "tour3_dolazak",
        "tour3_odlazak",
        "vinjete",
      ],
    },
  ];

  const getDifficultyColor = (difficulty: String) => {
    switch (difficulty) {
      case "Mittel":
        return "bg-yellow-500";
      case "Fortgeschritten":
        return "bg-orange-500";
      case "Experte":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Mittel":
        return "⚡";
      case "Fortgeschritten":
        return "🔥";
      case "Experte":
        return "💀";
      default:
        return "🏍️";
    }
  };

  return (
    <section
      id="tours"
      className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"></div>

      <div className="max-container padding-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-6 py-3 text-red-400 text-sm font-medium backdrop-blur-sm mb-6">
            <span className="text-xl">🏍️</span>
            {t("toure_title")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.rich("tour_title1", {
              highlight: (chunks) => (
                <span className="text-red-500">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t("tour_p")}
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              {/* Popular Badge */}
              {index === 1 && (
                <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  BELIEBT
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t  opacity-60`}
                ></div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <div
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium `}
                    ></div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {t(tour.title)}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6">
                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("tour_mit_eigenem_bike")}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {t(tour.prices.ownBike)}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("tour_mit_unserem_bike")}
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      {t(tour.prices.rentalBike)}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-green-400">✓</span>{" "}
                    {t("tour_Included")}
                  </h4>
                  <ul className="space-y-2">
                    {tour.details.slice(0, 2).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-blue-400">ℹ️</span> {t("tour_extra")}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {tour.details.slice(2, 5).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-400 text-sm"
                      >
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-red-400">✗</span>{" "}
                    {t("tour_nicht_included")}
                  </h4>
                  <ul className="space-y-1">
                    {tour.details.slice(5, 6).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-400 text-sm"
                      >
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        {t(item)}
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      {t("vinjete")}
                    </li>
                  </ul>
                </div>
                <div>
                  {tour.details.slice(6, 8).map((item, id) => (
                    <p key={id} className="text-white">
                      {t(item)}
                    </p>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href={`/${locale}/anmeldung`} className="block">
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      <span className="flex items-center tracking-widest justify-center gap-2">
                        {t("dugme")}
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        {/* Tour Info Cards */}
        <div className="grid md:grid-cols-2 mt-8 gap-6 mb-16">
          <div className="bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-600/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t("enduroOptions.hard.title")}
              </h3>
            </div>
            <p className="text-cyan-200 text-base sm:text-lg md:text-xl">
              {t("enduroOptions.hard.description")}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 border border-yellow-600/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t("enduroOptions.medium.title")}
              </h3>
            </div>
            <p className="text-cyan-200 text-base sm:text-lg md:text-xl">
              {t("enduroOptions.medium.description")}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">{t("tour_nicht_sicher")}</p>
          <Link href={`/${locale}/kontakt`} className="block">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-300">
              {t("tour_btn")}
            </button>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Tour;
