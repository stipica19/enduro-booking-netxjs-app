"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function ReisefuhrerClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslations();

  const photos = [
    "/ckalja-motor.webp",
    "/001-6.webp",
    "/001-9.webp",
    "/000-01.webp",
  ];
  const dario = ["/dario.webp", "/dario1.webp"];
  const alen = ["/alen.webp", "/alen1.webp"];

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center">
      {/* Hero */}
      <div className="relative w-full mt-10 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-3 max-w-3xl text-center rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            {t("tour_guide")}
          </h1>
          <p className="text-black-700 text-left text-[12px] sm:text-[12px] md:text-[16px] leading-relaxed space-y-4">
            {t("tour_guide1")}
          </p>
        </div>
      </div>

      {/* Galerija */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10 px-1">
        {photos.map((src) => (
          <div
            key={src}
            className="rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform h-[350px]"
          >
            <Image
              src={src}
              alt={src}
              width={250}
              height={350}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      <div className="relative w-full mt-10 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-3 max-w-3xl text-center rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            {t("dario_t")}
          </h1>
          <p className="text-black-700 text-left text-[12px] sm:text-[12px] md:text-[16px] leading-relaxed space-y-4">
            {t("dario_p")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-10 px-1">
        {dario.map((src) => (
          <div
            key={src}
            className="rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform h-[350px]"
          >
            <Image
              src={src}
              alt={src}
              width={250}
              height={350}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      <div className="relative w-full mt-10 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-3 max-w-3xl text-center rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            {t("alen_t")}
          </h1>
          <p className="text-black-700 text-left text-[12px] sm:text-[12px] md:text-[16px] leading-relaxed space-y-4">
            {t("alen_p")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 my-10 px-1">
        {alen.map((src) => (
          <div
            key={src}
            className="rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform h-[350px]"
          >
            <Image
              src={src}
              alt={src}
              width={250}
              height={350}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Uvećana slika"
            width={600}
            height={800}
            className="rounded-lg max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
      )}
    </div>
  );
}
