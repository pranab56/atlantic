"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaGlobe, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null); // Add ref for the menu button
  const router = useRouter();
  const [locale, setLocale] = useState("");
  const t = useTranslations("header", { timeZone: "UTC" });

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.category"), path: "/category" },
    { name: t("nav.brands"), path: "/brands" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const languages = [
    { code: "EN", value: "en", flag: "/icons/usa.png" },
    { code: "FR", value: "fr", flag: "/icons/france.png" },
    { code: "SPA", value: "spa", flag: "/icons/spa.png" },
  ];

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment (client-side)
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("selectedLanguage");
      if (savedLang) {
        const isValidLang = languages.some(lang => lang.value === savedLang);
        if (isValidLang) {
          setSelectedLang(savedLang);
        } else {
          setSelectedLang("en");
        }
      } else {
        setSelectedLang("en");
      }
    }
  }, []);

  useEffect(() => {
    if (selectedLang && typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", selectedLang);
    }
  }, [selectedLang]);

  // Find the selected language object
  const selectedLanguage = languages.find((lang) => lang.value === selectedLang);

  useEffect(() => {
    const localCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (localCookie) {
      setLocale(localCookie);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the menu and the menu button
      const isOutsideMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(event.target);
      const isOutsideButton = menuButtonRef.current && !menuButtonRef.current.contains(event.target);

      // Close language dropdown when clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }

      // Close mobile menu when clicking outside both menu and button
      if (isOutsideMenu && isOutsideButton && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Close mobile menu on window resize to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  // Handle language change
  const handleLanguageChange = (lang) => {
    console.log(lang);
    setSelectedLang(lang);
    setLangOpen(false); // Close dropdown after selection

    setLocale(lang);
    document.cookie = `MYNEXTAPP_LOCALE=${lang}`;
    router.refresh();
  };

  // Toggle mobile menu with proper state management
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="py-3 text-white bg-[#292929] relative z-50">
      <div className="container flex items-center justify-between px-4 sm:px-6 mx-auto">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-primary">
            {t("title.firstName")} <br />
            <span className="text-xs text-gray-300"> {t("title.lastName")}</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-4 lg:space-x-8 text-sm font-medium">
          {navLinks.map(({ name, path }) => (
            <li key={name} className="relative">
              <button
                onClick={() => handleNavClick(path)}
                className={`hover:text-[#DA9E1F] transition cursor-pointer ${pathname === path ? "text-[#DA9E1F]" : "text-white"
                  }`}
                aria-label={`Navigate to ${name}`}
              >
                {name}
              </button>
              {pathname === path && (
                <span className="absolute left-0 bottom-[-6px] w-full h-1 bg-[#DA9E1F]"></span>
              )}
            </li>
          ))}
        </ul>

        {/* Right side controls: Language selector + Mobile menu button */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1 cursor-pointer"
              aria-label="Select language"
            >
              {selectedLanguage ? (
                <img
                  src={selectedLanguage.flag}
                  alt={selectedLanguage.code}
                  className="w-5 h-5 rounded"
                />
              ) : (
                <FaGlobe className="text-[#DA9E1F] text-lg" />
              )}
              <IoMdArrowDropdown className="text-yellow-500" />
            </button>

            {/* Language Dropdown Menu */}
            {langOpen && (
              <div className="absolute right-0 w-24 z-50 mt-2 bg-black border border-gray-700 rounded-lg shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang.value)}
                    className="flex items-center w-full px-2 py-2 space-x-2 hover:bg-gray-800 cursor-pointer"
                  >
                    <img
                      src={lang.flag}
                      alt={lang.code}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-white">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Added ref and simplified toggle logic */}
          <button
            ref={menuButtonRef}
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved conditional rendering */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-black bg-opacity-90 md:hidden flex flex-col pt-20"
        >
          <div className="container mx-auto px-6">
            {/* Close button inside mobile menu for better visibility */}
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes className="text-2xl" />
            </button>

            <ul className="flex flex-col space-y-6 text-center">
              {navLinks.map(({ name, path }) => (
                <li key={name}>
                  <button
                    onClick={() => handleNavClick(path)}
                    className={`text-lg font-medium transition-colors duration-300 ${pathname === path ? "text-[#DA9E1F]" : "text-white"
                      }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile language selector */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-4">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang.value)}
                    className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${selectedLang === lang.value ? "bg-gray-800" : ""
                      }`}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.code}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;