"use client";
import { useEffect, useState } from "react";

import { FaEye } from "react-icons/fa";

import Loader from "@/components/Loader";
import Button from "@/components/Button";

interface AnmeldungType {
  _id: string;
  tour_number: any;
  tour_type: string;
  name: string;
  email: string;
  number_person: number;
  address?: string;
  phone?: string;
  transport: string;
  rentaBike: string;
  message?: string;
  createdAt: string;
  nights?: number;
  checkIn_date?: string;
  checkOut_date?: string;
}

// Datumi se spremaju kao UTC ponoc, pa ih i prikazujemo u UTC-u da ne "pobjegnu" dan unazad
const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      })
    : "-";

const formatDateLong = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      })
    : "-";

// Starije prijave nemaju vlastiti termin, pa pada natrag na datume ture
const getCheckIn = (anmeldung: AnmeldungType) =>
  anmeldung.checkIn_date ?? anmeldung.tour_number?.checkIn_date;

const getCheckOut = (anmeldung: AnmeldungType) =>
  anmeldung.checkOut_date ?? anmeldung.tour_number?.checkOut_date;

export default function AdminListClient() {
  const [anmeldungen, setAnmeldungen] = useState<AnmeldungType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnmeldung, setSelectedAnmeldung] =
    useState<AnmeldungType | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchAnmeldungen() {
      try {
        const res = await fetch("/api/anmeldung");
        const data = await res.json();
        setAnmeldungen(data);
      } catch {
        // greška se prikazuje kroz prazan state
      } finally {
        setLoading(false);
      }
    }
    fetchAnmeldungen();
  }, []);

  const handleShowDetails = (anmeldung: AnmeldungType) => {
    setSelectedAnmeldung(anmeldung);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white p-3 sm:p-2 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">📋 Lista Prijava</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    #
                  </th>
                  <th className="p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    Ime
                  </th>
                  {/* Na mobitelu skriveno – vidi se u detaljima prijave */}
                  <th className="hidden md:table-cell p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    Email
                  </th>

                  <th className="p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    Dolazak
                  </th>
                  <th className="hidden sm:table-cell p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    Odlazak
                  </th>
                  <th className="hidden lg:table-cell p-1 sm:p-3 text-[11px] sm:text-sm text-left">
                    Datum
                  </th>
                  <th className="p-1 sm:p-2 text-[11px] sm:text-sm text-center w-10 sm:w-14">
                    Prikazi
                  </th>
                </tr>
              </thead>
              <tbody>
                {anmeldungen.length > 0 ? (
                  anmeldungen
                    .slice(0, showAll ? anmeldungen.length : 10)
                    .map((anmeldung) => (
                      <tr
                        key={anmeldung._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-1 sm:p-3 text-[11px] sm:text-sm">
                          {anmeldung.tour_number?.tour_number}
                        </td>
                        <td className="p-1 sm:p-3 text-[11px] sm:text-sm">
                          {anmeldung.name}
                          {/* Email na mobitelu ide ispod imena umjesto u svoju kolonu */}
                          <span className="block md:hidden text-[10px] text-gray-500 break-all">
                            {anmeldung.email}
                          </span>
                        </td>
                        <td className="hidden md:table-cell p-1 sm:p-3 text-[11px] sm:text-sm">
                          {anmeldung.email}
                        </td>

                        <td className="p-1 sm:p-3 text-[11px] sm:text-sm whitespace-nowrap">
                          {formatDate(getCheckIn(anmeldung))}
                          {/* Odlazak na mobitelu ide ispod dolaska */}
                          <span className="block sm:hidden text-[10px] text-gray-500">
                            → {formatDate(getCheckOut(anmeldung))}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell p-1 sm:p-3 text-[11px] sm:text-sm whitespace-nowrap">
                          {formatDate(getCheckOut(anmeldung))}
                        </td>
                        <td className="hidden lg:table-cell p-1 sm:p-3 text-[11px] sm:text-sm whitespace-nowrap">
                          {new Date(anmeldung.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-1 sm:p-2 text-[11px] sm:text-sm text-center w-10 sm:w-14">
                          <button
                            onClick={() => handleShowDetails(anmeldung)}
                            title="Prikaži detalje"
                            aria-label="Prikaži detalje"
                            className="mx-auto flex items-center justify-center text-gray-500 hover:text-gray-800 transition p-1"
                          >
                            <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-3 text-center">
                      Nema prijava
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div
              className="mt-4 flex justify-center"
              onClick={() => setShowAll(!showAll)}
            >
              <Button
                type="button"
                title={
                  showAll ? "📉 Weniger anzeigen" : "📈 Mehr Touren anzeigen"
                }
                variant="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base"
              />
            </div>
          </div>
        )}
      </div>

      {selectedAnmeldung && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-1">
          <div className="bg-white p-3 rounded-lg shadow-lg w-11/12 sm:w-[500px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              📄 Detalji Prijave
            </h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <strong>Ime:</strong> {selectedAnmeldung.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedAnmeldung.email}
              </p>
              <p>
                <strong>Tour:</strong>{" "}
                {selectedAnmeldung.tour_number?.tour_number} -{" "}
                {selectedAnmeldung.tour_type}
              </p>
              <p>
                <strong>Dolazak (1. noćenje):</strong>{" "}
                {formatDateLong(getCheckIn(selectedAnmeldung))}
              </p>
              <p>
                <strong>Odlazak:</strong>{" "}
                {formatDateLong(getCheckOut(selectedAnmeldung))}
              </p>
              {selectedAnmeldung.nights && (
                <p>
                  <strong>Broj noćenja:</strong> {selectedAnmeldung.nights}
                </p>
              )}
              <p>
                <strong>Osobe:</strong> {selectedAnmeldung.number_person}
              </p>
              {selectedAnmeldung.address && (
                <p>
                  <strong>Adresa:</strong> {selectedAnmeldung.address}
                </p>
              )}
              {selectedAnmeldung.phone && (
                <p>
                  <strong>Telefon:</strong> {selectedAnmeldung.phone}
                </p>
              )}
              <p>
                <strong>Transport:</strong> {selectedAnmeldung.transport}
              </p>
              <p>
                <strong>Rent:</strong>{" "}
                {selectedAnmeldung.rentaBike ? "yes" : "no"}
              </p>
              {selectedAnmeldung.message && (
                <p>
                  <strong>Poruka:</strong> {selectedAnmeldung.message}
                </p>
              )}
              <p>
                <strong>Datum prijave:</strong>{" "}
                {new Date(selectedAnmeldung.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedAnmeldung(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
