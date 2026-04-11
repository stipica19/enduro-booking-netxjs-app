"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Comment {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function GaestebuchClient() {
  const t = useTranslations();

  const [visibleCount, setVisibleCount] = useState(5);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  // Dohvati komentare iz baze (API poziv)
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("/api/gastebuch");
        const data = await res.json();
        setComments(data);
      } catch {
        // silent fail - korisnik vidi prazan spisak
      }
    }
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || message.trim() === "")
      return;

    setLoading(true);

    const newComment: Comment = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/gastebuch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        setComments([newComment, ...comments]);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Greška pri slanju poruke.");
      }
    } catch {
      alert("Greška pri slanju poruke.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-red-500 mb-4">{t("gastebuch")}</h1>
      <p className="text-lg text-gray-300 max-w-lg text-center mb-8">
        {t("gastebuch_p")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-lg flex flex-col gap-4 shadow-lg"
      >
        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Dein E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <textarea
          placeholder="Deine Nachricht"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 h-28 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 uppercase rounded-md transition duration-300"
          disabled={loading}
        >
          {loading ? t("gastebuch_b1") : t("gastebuch_b")}
        </button>
      </form>

      <div className="w-full max-w-lg mt-8 space-y-4">
        {comments.slice(0, visibleCount).map((comment) => (
          <div key={`${comment.createdAt}-${comment.email}`} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">
              {comment.name}{" "}
              <span className="text-[12px]">{comment.email}</span>
            </p>
            <p className="text-gray-300">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">{comment.message}</p>
          </div>
        ))}
      </div>

      {comments.length > 5 && (
        <button
          onClick={() =>
            setVisibleCount(visibleCount === 5 ? comments.length : 5)
          }
          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300"
        >
          {visibleCount === 5 ? t("gastebuch_b2") : t("gastebuch_b3")}
        </button>
      )}
    </div>
  );
}
