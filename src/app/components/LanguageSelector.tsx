"use client";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  // Optional: Set HTML dir attribute for RTL languages
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }
  }, [i18n.language]);

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language}
      className="bg-black border border-white/30 px-3 py-1 rounded-lg text-white text-sm hover:bg-white hover:text-black transition cursor-pointer"
    >
      <option value="en">🇺🇸 English</option>
      <option value="fr">🇫🇷 French</option>
      <option value="es">🇪🇸 Spanish</option>
      <option value="de">🇩🇪 German</option>
      <option value="ar">🇸🇦 Arabic</option>
    </select>
  );
}
