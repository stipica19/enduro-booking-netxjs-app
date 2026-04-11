"use client";
import { useEffect, useState } from "react";

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
}

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">📋 Lista Prijava</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[600px] sm:min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm text-left">#</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm text-left">
                    Ime
                  </th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm text-left">
                    Email
                  </th>

                  <th className="p-2 sm:p-3 text-xs sm:text-sm text-left">
                    Datum
                  </th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm text-left">
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
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {anmeldung.tour_number?.tour_number}
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {anmeldung.name}
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {anmeldung.email}
                        </td>

                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {new Date(anmeldung.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm flex gap-2">
                          <button
                            onClick={() => handleShowDetails(anmeldung)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                          >
                            Prikaži
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-3 text-center">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-[500px] max-h-[80vh] overflow-y-auto">
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
              <p className="p-2 sm:p-3 text-xs sm:text-sm">
                {new Date(
                  selectedAnmeldung.tour_number?.checkIn_date,
                ).toLocaleString()}{" "}
                -{" "}
                {new Date(
                  selectedAnmeldung.tour_number?.checkOut_date,
                ).toLocaleString()}
              </p>
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
