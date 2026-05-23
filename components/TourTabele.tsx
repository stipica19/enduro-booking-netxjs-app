"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTours } from "@/store/tourSlice";
import Button from "./Button";
import Loader from "./Loader";

export default function TourTabele() {
  const dispatch = useDispatch<AppDispatch>();
  const tours = useSelector((state: RootState) => state.tours.tours);
  const status = useSelector((state: RootState) => state.tours.status);

  const [showAll2025, setShowAll2025] = useState(false);
  const [showAll2026, setShowAll2026] = useState(false);
  const [showAll2027, setShowAll2027] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTours());
    }
  }, [dispatch, status]);

  // Filtriranje po godini (pretpostavljam da checkIn_date sadrži ISO string)
  const tours2026 = tours.filter((tour) => tour.checkIn_date.slice(-2) == "26");

  const tours2027 = tours.filter((tour) => tour.checkIn_date.slice(-2) == "27");

  interface Tour {
    _id: string;
    tour_number: string | number;
    checkIn_date: string;
    checkOut_date: string;
    tour_space: number;
  }

  type RenderTableProps = {
    toursList: Tour[];
    showAll: boolean;
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
    year: number;
  };

  const renderTable = (
    toursList: Tour[],
    showAll: boolean,
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>,
    year: number
  ) => (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-1 sm:p-1">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
        🔥 {year} - {t("apply_r")}
      </h2>
      {status === "loading" ? (
        <Loader />
      ) : (
        <table className="w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                {t("a_tabele1")}
              </th>
              <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                {t("a_tabele2")}
              </th>
              <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                {t("a_tabele3")}
              </th>
              <th className="p-2 sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] text-center">
                {t("a_tabele4")}
              </th>
            </tr>
          </thead>
          <tbody>
            {toursList
              .slice(0, showAll ? toursList.length : 8)
              .map((tour: Tour) => (
                <tr key={tour._id} className="border-b">
                  <td className="p-2 sm:p-3 text-center text-[10px] sm:text-[12px] md:text-[16px]">
                    {tour.tour_number}
                  </td>
                  <td className="p-2 sm:p-3 text-center text-[10px] sm:text-[12px] md:text-[16px]">
                    {tour.checkIn_date}
                  </td>
                  <td className="p-2 sm:p-3  text-center text-[10px] sm:text-[12px] md:text-[16px]">
                    {tour.checkOut_date}
                  </td>
                  <td className="p-2 text-center text-[10px] sm:text-[12px]  md:text-[16px]">
                    <span
                      className={`px-1 py-1 uppercase text-white sm:p-3 text-[10px] sm:text-[12px] md:text-[16px] ${
                        tour.tour_space === 0 ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {tour.tour_space === 0 ? "Nicht Verfügbar" : "Verfügbar"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Dugme za prikaz više */}
      {toursList.length > 8 && (
        <div
          className="mt-4 flex justify-center"
          onClick={() => setShowAll(!showAll)}
        >
          <Button
            type="button"
            title={
              !showAll ? `📉${t("gastebuch_b2")}` : `📈${t("gastebuch_b3")}`
            }
            variant="bg-red-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-red-700 transition transform hover:scale-105"
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {renderTable(tours2026, showAll2026, setShowAll2026, 2026)}
      {renderTable(tours2027, showAll2027, setShowAll2027, 2027)}
    </>
  );
}
