"use client";
import { useRouter } from "next/navigation";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <nav className="w-full flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 px-6 py-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <h1
        className="text-xl font-bold tracking-wide cursor-pointer"
        onClick={() => router.push("/")}
      >
        {t("navbar.brand")}
      </h1>

      <motion.div
        className="flex flex-wrap gap-4 items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => router.push("/ask")}
          className="text-sm text-white hover:underline transition cursor-pointer"
        >
          {t("navbar.ask")}
        </button>

        <button
          onClick={() => router.push("/ask-csv")}
          className="text-sm text-white hover:underline transition cursor-pointer"
        >
          {t("navbar.simpleGenerator", "CSV Reader")}
        </button>

        <button
          onClick={() => router.push("/advanced-generator")}
          className="text-sm text-white hover:underline transition cursor-pointer"
        >
          {t("navbar.advancedGenerator", "Advanced Generator")}
        </button>

        <button
          onClick={() => router.push("/email-drafter")}
          className="text-sm text-white hover:underline transition cursor-pointer"
        >
          {t("navbar.emailDrafter", "Draft Email")}
        </button>

        <button
          onClick={() => router.push("/exercise-generator")}
          className="text-sm text-white hover:underline transition cursor-pointer"
        >
          {t("navbar.dailyExercise", "Daily Exercise")}
        </button>
      </motion.div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
      </div>
    </nav>
  );
}
