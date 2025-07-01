"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function AskForm({
  onAsk,
  loading,
}: {
  onAsk: (q: string, lang: string) => void;
  loading: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");

  const handleLangChange = (lang: string) => i18n.changeLanguage(lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("ask.placeholder")}
        rows={4}
        className="w-full bg-black/60 border border-white/20 p-4 rounded-xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40 transition"
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={i18n.language}
          onChange={(e) => handleLangChange(e.target.value)}
          className="bg-black/50 border border-white/30 px-4 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-white/50 transition w-full sm:w-auto"
        >
          <option value="en">🇺🇸 English</option>
          <option value="fr">🇫🇷 French</option>
          <option value="es">🇪🇸 Spanish</option>
          <option value="de">🇩🇪 German</option>
          <option value="ar">🇸🇦 Arabic</option>
        </select>

        <motion.button
          onClick={() => onAsk(input, i18n.language)}
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-2 rounded-xl font-bold shadow-md transition w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? t("ask.loading") : t("ask.button")}
        </motion.button>
      </div>
    </motion.div>
  );
}
