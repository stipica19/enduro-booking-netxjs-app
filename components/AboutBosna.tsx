"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const locations = [
  {
    id: 1,
    name: "Prokoško See",
    description: "best_p6",
    image: "/prokosko.png",
  },
  {
    id: 2,
    name: "Vranica",
    description: "best_p7",
    image: "/vranica.webp",
  },
  {
    id: 3,
    name: "Rama See",
    description: "ramsko",
    image: "/ramsko.webp",
  },
  {
    id: 4,
    name: "Raduša",
    description: "",
    image: "/radusa.webp",
  },
  {
    id: 5,
    name: "Bosnien Tour",
    description: "",
    image: "/tour.jpg",
  },
];

export default function AboutBosna() {
  const t = useTranslations();

  return (
    <section className="py-2 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-1 lg:px-20 text-center">
        {/* Location Highlight Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="relative z-10 max-container padding-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  {t.rich("locationSection.title", {
                    highlight: (chunks) => (
                      <span className="text-red-500">{chunks}</span>
                    ),
                  })}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-black mb-8">
                  {t("locationSection.description")}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black">
                      {" "}
                      {t("locationSection.points.0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black">
                      {t("locationSection.points.1")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black">
                      {t("locationSection.points.2")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black">
                      {t("locationSection.points.3")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative  lg:w-[80%] md:w-full">
                <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl lg:p-8 sm:p-2 border border-gray-700/50">
                  <Image
                    src="/mapa.webp"
                    alt="Mapa lokacije"
                    width={500}
                    height={400}
                    className="rounded-xl min-w-full  h-auto"
                    loading="lazy"
                  />
                </div>

                {/* Floating info cards */}
                <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-20">
                  📍 Gornji Vakuf - Uskoplje
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold z-20">
                  🏔️ 2100m
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 ">
          <div className="max-container   padding-container">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.rich("whyChooseUs.title", {
                  highlight: (chunks) => (
                    <span className="text-red-500">{chunks}</span>
                  ),
                })}{" "}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("whyChooseUs.subtitle")}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative  rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">🏍️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.0.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.0.description")}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">🏔️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.1.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.1.description")}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.2.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.2.description")}
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.3.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.3.description")}
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.4.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.4.description")}
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("whyChooseUs.features.5.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("whyChooseUs.features.5.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galerija */}
        <div className="mt-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 2 }, // Tableti
              1024: { slidesPerView: 4 }, // Laptopi i veći ekrani
            }}
            navigation
            autoplay={{ delay: 2000 }}
            loop={true}
            className="w-full max-w-full mx-auto"
          >
            {locations.map((src, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="relative w-full h-96">
                  <Image
                    src={src.image}
                    alt={`Hotel image ${index + 1}`}
                    fill
                    // Slider: 1 slide na mobitelu, 2 od 768px, 4 od 1024px
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
