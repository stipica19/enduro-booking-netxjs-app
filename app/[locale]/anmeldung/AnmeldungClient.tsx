"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import TourTabele from "@/components/TourTabele";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AnmeldungClient() {
  const [selectedTour, setSelectedTour] = useState<object>({
    tour_number: "",
    tour_id: "",
    tour_in: "",
    tour_out: "",
  });

  const [selectedType, setSelectedType] = useState("");
  const [transport, setTransport] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [numPeople, setNumPeople] = useState<number>(1);
  const [address, setAddress] = useState<string>("");
  const [rentaBike, setRent] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const tours = useSelector((state: RootState) => state.tours.tours);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = {
      tour_number: selectedTour,
      tour_type: selectedType,
      email,
      fullName,
      numPeople,
      address,
      phone,
      transport,
      message,
      rentaBike,
    };

    try {
      const res = await fetch("/api/anmeldung", {
        method: "POST",
        headers: {
          // ✅ typo fix
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess("Reservierung erfolgreich!");
      } else {
        setError(`Fehler: ${result.message}`);
      }
    } catch {
      setError("Es gab ein Problem bei der Anmeldung.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20 bg-[url('/bg_termine.webp')] bg-no-repeat bg-center bg-cover bg-fixed">
      {/* Tamni overlay za bolji kontrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative container mx-auto text-center">
        {/* Naslov */}
        <h1 className="text-xl md:text-4xl font-extrabold text-white drop-shadow-lg">
          🏍️ ENDURO TOUR BOSNIEN - {t("dugme")}! 🏁
        </h1>

        {/* Upute */}
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-6 opacity-70">
          <ol className="list-decimal list-inside text-black text-left text-[12px] sm:text-[12px] md:text-[16px] leading-relaxed space-y-3">
            <li>{t("apply_p1")}</li>
            <li>{t("apply_p2")}</li>
            <li>{t("apply_p3")}</li>
            <li>{t("apply_p4")}</li>
            <li>{t("apply_p5")}</li>
          </ol>
          <p className="mt-4 text-gray-900 font-semibold text-center">
            📍 {t("apply_p7")}
          </p>
        </div>

        {/* Tabela */}
        <TourTabele />

        {/* Forma */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto text-[10px] sm:text-[12px] md:text-[16px]">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {t("anmeldung_title")}
          </h2>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            {/* Select za broj ture */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("choose_tour")}
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={JSON.stringify(selectedTour)}
                onChange={(e) => setSelectedTour(JSON.parse(e.target.value))}
                required
              >
                <option value="">{t("choose_tour_placeholder")}</option>

                {tours
                  .filter((tour) => tour.tour_space > 0)
                  .map((tour) => (
                    <option
                      key={tour._id}
                      value={JSON.stringify({
                        _id: tour._id,
                        tour_number: tour.tour_number,
                        tour_in: tour.checkIn_date,
                        tour_out: tour.checkOut_date,
                      })}
                    >
                      Tour &nbsp;&nbsp; {tour.tour_number} &nbsp;- &nbsp;
                      {tour.checkIn_date}
                      &nbsp;&nbsp; bis &nbsp;&nbsp;{tour.checkOut_date}
                    </option>
                  ))}
              </select>
            </div>

            {/* Select za vrstu ture */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("choose_tour_type")}
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
              >
                <option value="">{t("choose_tour_type_placeholder")}</option>
                <option value="Tour 1">Tour 1</option>
                <option value="Tour 2">Tour 2</option>
                <option value="Tour 3">Tour 3</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("email")}
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Ime i Prezime */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("full_name")}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("full_name_placeholder")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Broj ljudi */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("num_people")}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("num_people_placeholder")}
                value={numPeople}
                onChange={(e) => setNumPeople(Number(e.target.value))}
                required
              />
            </div>

            {/* Adresa */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("address")}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("address_placeholder")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("phone_number")}
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("phone_number_placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Transport */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("travel_method")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="avion"
                    checked={transport === "avion"}
                    onChange={() => setTransport("avion")}
                    className="w-5 h-5"
                  />
                  <span>{t("travel_by_plane")}</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="auto"
                    checked={transport === "auto"}
                    onChange={() => setTransport("auto")}
                    className="w-5 h-5"
                  />
                  <span>{t("travel_by_car")}</span>
                </label>
              </div>
            </div>

            {/* Rent a bike */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("rent_bike")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="true"
                    checked={rentaBike === true}
                    onChange={() => setRent(true)}
                    className="w-5 h-5"
                  />
                  <span>{t("rent_bike_yes")}</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="false"
                    checked={rentaBike === false}
                    onChange={() => setRent(false)}
                    className="w-5 h-5"
                  />
                  <span>{t("rent_bike_no")}</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-semibold">
                {t("message")}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={t("message_placeholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              {loading ? t("submit_loading") : t("submit_button")}
            </button>

            {success && (
              <p className="text-green-500">{t("success_message")}</p>
            )}
            {error && <p className="text-red-500">{t("error_message")}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
