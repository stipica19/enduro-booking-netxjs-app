"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";

export default function Rules() {
  const t = useTranslations();

  const rules = t.raw("rules"); //  `t.raw()` jer `rules` sadrži niz (array)

  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Naslov */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          📜 {t("rule_title")}
        </h2>

        {/* Lista pravila */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-10">
          <ul className="text-left space-y-4">
            {rules
              .slice(0, showAll ? rules.length : 5)
              .map((rule: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start text-gray-800 text-sm"
                >
                  <FaCheckCircle
                    size={18}
                    className="text-green-600 mr-3 flex-none"
                  />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
          </ul>

          {/* Dugme za prikazivanje više pravila */}

          <div
            className="mt-4 flex justify-center"
            onClick={() => setShowAll(!showAll)}
          >
            <Button
              type="button"
              title={
                showAll ? `📉${t("gastebuch_b2")}` : `📈${t("gastebuch_b3")}`
              }
              variant="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-red-700 transition transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
