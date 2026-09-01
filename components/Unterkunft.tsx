"use client"; //

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

const images = [
  "/hotel/hotel0.webp",
  "/hotel/hotel00.webp",
  "/hotel/hotel1.webp",
  "/hotel/hotel4.webp",
  "/hotel/hotel5.webp",
];

export default function Unterkunft() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 relative inline-block">
          {t("hotel_title")}
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-600"></span>
        </h2>
        <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto leading-relaxed md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          {t("hotel")}
        </p>

        {/* Slider */}
        <div className="mt-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 3 }, // Tableti
              1024: { slidesPerView: 4 }, // Laptopi i veći ekrani
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop={true}
            className="w-full max-w-full mx-auto"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="relative w-full h-96">
                  <Image
                    src={src}
                    alt={`Hotel image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg shadow-lg"
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    quality={70}
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
