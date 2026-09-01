"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
    const t = useTranslations();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!show) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label={t("scroll_to_top")}
            title={t("scroll_to_top")}
            className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors z-50"
        >
            <span aria-hidden="true">↑</span>
        </button>
    );
}
