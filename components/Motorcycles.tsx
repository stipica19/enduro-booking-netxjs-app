import { useTranslations } from "next-intl";
import Image from "next/image";

const motorcycles = [
  {
    id: 3,
    name: "BETA XPRO 2026",
    image: "/beta-300-rr-2026.webp",
  },
  {
    id: 4,
    name: "BETA XPRO 2026",
    image: "/beta-300-xtrainer-2026.webp",
  },
  {
    id: 1,
    name: "BETA 300 RR 2023",
    image: "/beta-300-rr.webp",
  },
  {
    id: 2,
    name: "BETA 300 XTRAINER 2023",
    image: "/beta-300-xtrainer.webp",
  },
];

export default function Motorcycles() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-10 text-center">
        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">MOTORCYCLES</h2>
        <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto leading-relaxed md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          {t("moto_p1")}
        </p>

        {/* Opis */}
        <p className="regular-16 font-roboto mt-6 text-gray-30 "></p>

        <div className="text-left mx-auto mt-6 text-gray-700 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("moto_p2")}
          </p>
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("moto_p3")}
          </p>
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("moto_p4")} 👇
          </p>
          <ul className="mt-2 font-semibold mx-auto">
            <li className="mx-auto">🏍️ BETA 300 XPRO 2026</li>
            <li className="mx-auto ">🏍️ BETA 300 RR 2023</li>
            <li className="mx-auto">🏍️ BETA 300 XTRAINER 2023</li>
            <li className="mx-auto">🏍️ KTM 350 EXC</li>
            <li className="mx-auto">🏍️ KTM 300 EXC</li>
          </ul>
        </div>

        {/* Slike motora */}

        <div className="container px-0 lg:px-10 mt-6 grid md:grid-cols-4 gap-2">
          {motorcycles.map((bike) => (
            <div key={bike.id} className="">
              <div className="relative w-full h-64">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  quality={70}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Oprema */}
        <div className="mt-8 p-2 text-left mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h3 className="text-2xl m-6 text-center font-bold text-gray-900">
            🏍️ {t("gang_title")}
          </h3>
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("gang")}
          </p>
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("gang1")}
          </p>
          <ul className="space-y-2 font-semibold text-left mx-auto mt-6 text-gray-700">
            <li>🪖 {t("gang2")}</li>
            <li>🥾 {t("gang3")}</li>
            <li>🧤 {t("gang4")}</li>
            <li>🛡️ {t("gang5")}</li>
          </ul>
          <p className="text-sm sm:text-lg mt-2 text-gray-700 text-left mx-auto  leading-relaxed">
            {t("gang6")}
          </p>
        </div>
      </div>
    </section>
  );
}
