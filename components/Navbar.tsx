"use client"; // Obavezno za Next.js App Router

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getNavLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Adjusted the import path to use an absolute path based on Next.js alias
import { loadUser, logout } from "@/store/userSlice";
import { Menu } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; //  Uzimamo locale iz URL-a
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user); // Uzimamo korisnika iz Redux store-a

  const navLinks = getNavLinks(locale, user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("de");

  const languages = [
    { code: "en", label: "English", icon: "/gb.png" },
    { code: "de", label: "Deutsch", icon: "/de.png" },
  ];

  // Funkcija koja menja jezik klikom na zastavu
  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return; // Ako je isti jezik, ne radi ništa

    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`); // Menjamo `locale` u URL-u
    router.push(newPathname); // Navigiramo na novi jezik
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    dispatch(logout());
    router.push(`/${locale}`);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <nav className="flex justify-between items-center max-container padding-container relative z-30 py-3">
      {/* Logo - Navbar */}
      <Link href={`/${locale}`}>
        <Image
          src="/logo.png"
          alt="Enduro Drift Bosnien Logo"
          width={74}
          height={29}
          priority
        />
      </Link>

      {/* Desktop Navigacija */}
      <ul className="hidden lg:flex items-center gap-12">
        {navLinks?.map((link) =>
          link.subLinks ? (
            <li key={link.key} className="relative group">
              <span className="text-gray-800 hover:text-black font-roboto  font-medium cursor-pointer">
                {link.label}
              </span>
              <ul className="absolute hidden group-hover:block bg-white shadow-md rounded mt-0 py-1 w-40 z-50">
                {link.subLinks.map((subLink) =>
                  subLink.label === "Logout" ? (
                    <li key="logout">
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 uppercase text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li key={subLink.href}>
                      <Link
                        href={subLink.href || "#"}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100"
                      >
                        {subLink.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </li>
          ) : (
            <li key={link.key}>
              <Link
                href={link.href || "#"}
                className="text-gray-800 hover:text-black uppercase font-roboto font-medium transition-all"
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
      </ul>

      {/* Jezički izbor */}
      <div className=" flex-row hidden lg:flex">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex mr-2 items-center gap-1 px-3 py-2 rounded-md ${
              language === lang.code ? "bg-gray-200" : "bg-gray-100"
            }`}
            aria-label={lang.label}
          >
            <Image src={lang?.icon} alt="" width={24} height={24} />
          </button>
        ))}
      </div>

      {/* Social icons (desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        <a
          href="https://www.facebook.com/profile.php?id=100054829614691"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition"
          aria-label="Facebook"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.instagram.com/enduro_drift_bosnien/?locale=en-TH&hl=ar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-600 transition"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@endurodriftbosnien"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition"
          aria-label="TikTok"
        >
          <FaTiktok size={24} />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden"
        aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={menuOpen}
      >
        <Menu width={32} height={32} className="cursor-pointer" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <ul className="flex flex-col items-start mt-16 px-6 space-y-4">
          {navLinks?.map((link) =>
            link.subLinks ? (
              <div key={link.key} className="w-full">
                <button
                  onClick={() =>
                    setOpenDropdownKey((prevKey) =>
                      prevKey === link.key ? null : link.key,
                    )
                  }
                  className="text-gray-700 text-lg font-medium block py-2"
                >
                  {link.label} {openDropdownKey === link.key ? "▲" : "▼"}
                </button>
                {openDropdownKey === link.key &&
                  link.subLinks.map((subLink) =>
                    subLink.label === "Logout" ? (
                      <li key="logout" className="ml-4">
                        <button
                          onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                          }}
                          className="text-gray-800 text-sm uppercase block py-2 hover:text-black w-full text-left"
                        >
                          Logout
                        </button>
                      </li>
                    ) : (
                      <li key={subLink.href} className="ml-4">
                        <Link
                          href={subLink.href || "#"}
                          onClick={() => setMenuOpen(false)}
                          className="text-gray-800 text-sm uppercase block py-2 hover:text-black"
                        >
                          {subLink.label}
                        </Link>
                      </li>
                    ),
                  )}
              </div>
            ) : (
              <li key={link.key}>
                <Link
                  href={link.href || "#"}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-800 text-lg font-medium block py-2"
                >
                  {link.label.toUpperCase()}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Jezički izbor u mobilnom meniju */}
        <div className="mt-8 px-6">
          <p className="text-gray-700 font-medium">Language:</p>
          <div className="flex space-x-4 mt-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex flex-col items-center gap-3 px-3 py-2 rounded-md ${
                  language === lang.code ? "bg-gray-200" : "bg-gray-100"
                }`}
                aria-label={lang.label}
              >
                <Image src={lang?.icon} alt="" width={24} height={24} />
              </button>
            ))}
          </div>
        </div>

        {/* Social icons (mobile) */}
        <div className="mt-6 px-6">
          <p className="text-gray-700 font-medium">Social:</p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.facebook.com/profile.php?id=100054829614691"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/enduro_drift_bosnien/?locale=en-TH&hl=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@endurodriftbosnien"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition"
              aria-label="TikTok"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Overlay kada je meni otvoren */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
