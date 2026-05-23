"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const slides = [
  { id: 1, src: "/bg_termine.webp", alt: "Enduro Tour 1" },
  { id: 2, src: "/prokosko.png", alt: "Enduro Tour 2" },
  { id: 9, src: "/enduro15.avif", alt: "Enduro Tour 3" },
  { id: 3, src: "/enduro-nebo.webp", alt: "Enduro Tour 2" },
  { id: 4, src: "/slider4.webp", alt: "Enduro Tour 2" },
  { id: 5, src: "/rostilj.webp", alt: "Enduro Tour 2" },
  { id: 6, src: "/enduro-mini6.webp", alt: "Enduro Tour 3" },
  { id: 7, src: "/enduro-klopa.webp", alt: "Enduro Tour 3" },
  { id: 8, src: "/hero-bild.webp", alt: "Enduro Tour 3" },
  
];

export default function SliderImage() {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 relative inline-block">
          <span className="absolute bottom-0 left-0 w-96 h-1 bg-red-600"></span>
        </h2>

        {/* Slider */}
        <div className="mt-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 2 }, // Tableti
              1024: { slidesPerView: 4 }, // Laptopi i veći ekrani
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full mx-auto"
          >
            {slides.map((src) => (
              <SwiperSlide key={src.id} className="flex justify-center">
                <div className="relative w-full h-96">
                  <Image
                    src={src.src}
                    alt={src.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="shadow-lg"
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
