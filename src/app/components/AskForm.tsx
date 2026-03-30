"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// 1. Add 'mode' to the TypeScript interface
interface AskFormProps {
  onAsk: (q: string, lang: string) => void;
  loading: boolean;
  mode: "basic" | "pro"; // 👈 Add this
}

export function AskForm({ onAsk, loading, mode }: AskFormProps) {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");

  const handleLangChange = (lang: string) => i18n.changeLanguage(lang);

  return (
    <motion.div className="flex flex-col gap-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("ask.placeholder")}
        rows={4}
        className="w-full bg-black/60 border border-white/20 p-4 rounded-xl text-white"
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={i18n.language}
          onChange={(e) => handleLangChange(e.target.value)}
          className="bg-black/50 border border-white/30 px-4 py-2 rounded-lg text-white"
        >
          <option value="en">🇺🇸 English</option>
          <option value="fr">🇫🇷 French</option>
        </select>

        <motion.button
          onClick={() => onAsk(input, i18n.language)}
          disabled={loading || !input.trim()}
          className="bg-white text-black px-6 py-2 rounded-xl font-bold"
        >
          {
            loading
              ? t("ask.loading")
              : mode === "pro"
                ? t("ask.button") // Shows "Ask All Models" or "Demander à tous les modèles"
                : t("ask.buttonBasic") // Shows "Ask AI" or "Demandez à l'IA"
          }
        </motion.button>
      </div>
    </motion.div>
  );
}
