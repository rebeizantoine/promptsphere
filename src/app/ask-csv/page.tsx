"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { div } from "framer-motion/client";

export default function AskCsvPage() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  async function handleCsvAsk() {
    if (!file || !question.trim()) return;
    setLoading(true);
    setAnswer("");

    const formData = new FormData();
    formData.append("question", question);
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://promptsphere-backend.onrender.com/api/ask-csv",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setAnswer(data.bestAnswer || t("askCsv.error"));
    } catch (error) {
      console.error("❌ CSV Ask Error:", error);
      setAnswer(t("askCsv.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-black text-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t("askCsv.title")}</h1>
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white border px-3 py-1 rounded-lg border-white/30 hover:bg-white/10 transition"
          >
            {t("askCsv.back")}
          </Link>
        </div>

        <p className="mb-4 text-white/70">{t("askCsv.uploadPrompt")}</p>

        <div className="flex flex-col gap-4 mb-8">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("askCsv.placeholder")}
            rows={3}
            className="w-full bg-black border border-white/20 p-3 rounded-xl text-white resize-none focus:border-white/50 transition"
            aria-label="CSV question input"
          />

          <label className="bg-black border border-white/30 px-4 py-2 rounded-xl text-white text-sm cursor-pointer hover:border-white/50 transition w-fit">
            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setFile(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
              className="hidden"
            />
            {file ? (
              <span className="truncate max-w-xs inline-block">
                {file.name}
              </span>
            ) : (
              <span>{t("askCsv.noFile")}</span>
            )}
          </label>

          <button
            onClick={handleCsvAsk}
            disabled={loading || !file || !question.trim()}
            className="bg-white text-black px-5 py-2 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Analyze CSV"
          >
            {loading ? t("askCsv.loading") : t("askCsv.button")}
          </button>
        </div>

        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 p-4 rounded-xl text-white whitespace-pre-line"
          >
            <h2 className="text-xl font-bold mb-2">
              🧠 {t("askCsv.resultsTitle")}
            </h2>
            {answer}
          </motion.div>
        )}
      </main>
    </div>
  );
}
