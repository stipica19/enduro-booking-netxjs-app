"use client";

import Loader from "@/components/Loader";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type ApiItem = { public_id: string; width?: number; height?: number };

function chunk<T>(arr: T[], n: number) {
  return Array.from({ length: n }, () => [] as T[]).map((_, i) =>
    arr.filter((_, idx) => idx % n === i),
  );
}

export default function GalerieClient() {
  const t = useTranslations();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // broj kolona po breakpointu (Tailwind)
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setCols(w >= 768 ? 3 : w >= 640 ? 2 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/gallery");
        const data: ApiItem[] = await res.json();
        setPhotos(data.map((item) => item.public_id));
      } catch {
        // greška se prikazuje kroz prazan state
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const columns = useMemo(() => chunk(photos, cols), [photos, cols]);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        📸 {t("gallery_title")}
      </h1>
      <p className="text-gray-700 max-w-2xl mx-auto mb-8">{t("gallery_p")}</p>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((id, index) => (
                <button
                  key={`${id}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(id)}
                  className="rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-black/40"
                >
                  <CldImage
                    src={id}
                    alt={`Enduro gallery image ${index + 1}`}
                    width={900}
                    height={1200}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="w-full h-auto object-cover"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
          onClick={() => setSelectedImage(null)}
          role="button"
          aria-label="Close image"
        >
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <CldImage
              src={selectedImage}
              width={1600}
              height={1200}
              sizes="100vw"
              alt="Enduro gallery image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
