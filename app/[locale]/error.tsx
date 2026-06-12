"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isStale = error.message?.includes("Server Action");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        {isStale ? "Seite veraltet" : "Etwas ist schiefgelaufen"}
      </h2>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        {isStale
          ? "Die Seite wurde in der Zwischenzeit aktualisiert. Bitte laden Sie die Seite neu."
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          Seite neu laden
        </button>
        {!isStale && (
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Nochmal versuchen
          </button>
        )}
      </div>
    </div>
  );
}
