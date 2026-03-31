"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AskForm } from "../components/AskForm";
import { ModelCard } from "../components/ModelCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";
import { AdminLoginModal } from "../components/AdminLoginModal";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AskPage() {
  type CompareResults = {
    bestAnswer?: string;
    results: {
      openai?: { answer?: string };
      claude?: { answer?: string };
      openrouter?: { answer?: string };
    };
  };

  const [mode, setMode] = useState<"basic" | "pro">("basic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [compareResults, setCompareResults] = useState<CompareResults | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { t } = useTranslation(); // Removed i18n here as it wasn't being used locally

  const handleModeChange = (newMode: "basic" | "pro") => {
    if (newMode === "pro") {
      if (mode === "pro") return;
      setShowLoginModal(true);
      return;
    }

    setMode("basic");
    setResult(null);
    setCompareResults(null);
    setError(null);
  };

  const handleAsk = async (prompt: string, lang: string) => {
    setLoading(true);
    setResult(null);
    setCompareResults(null);
    setError(null);

    const endpoint =
      mode === "pro"
        ? `${API_URL}/api/compare/compare-llms-smart`
        : `${API_URL}/ask`;

    try {
      const response = await axios.post(
        endpoint,
        mode === "pro" ? { question: prompt } : { prompt, lang },
        { withCredentials: true },
      );
      const data = response.data;

      if (mode === "pro") {
        setCompareResults(data);
      } else {
        setResult(data.result);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { error?: string })?.error ||
            err.message ||
            "Something went wrong",
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleLoginSuccess = () => {
    setMode("pro");
    setResult(null);
    setCompareResults(null);
    setError(null);
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin/me`, { withCredentials: true })
      .then(() => setMode("pro"))
      .catch(() => {});
  }, []);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">🧠 {t("ask.button")}</h1>
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              ← {t("common.back", "Back")}
            </Link>
          </div>

          {/* Mode Toggle with Translations */}
          <div className="flex gap-3">
            <button
              onClick={() => handleModeChange("basic")}
              className={`px-4 py-2 rounded-xl border ${
                mode === "basic"
                  ? "bg-white text-black"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              {t("ask.modeBasic")}
            </button>

            <button
              onClick={() => handleModeChange("pro")}
              className={`px-4 py-2 rounded-xl border ${
                mode === "pro"
                  ? "bg-purple-500 text-white"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              {t("ask.modePro")}
            </button>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
            <AskForm onAsk={handleAsk} loading={loading} mode={mode} />
          </div>

          {/* Fixed the curly braces here */}
          {loading && (
            <p className="text-white/60 animate-pulse text-center">
              {t("ask.loading")}
            </p>
          )}

          {error && <div className="text-red-400 text-center">❌ {error}</div>}

          {result && !loading && mode === "basic" && (
            <div className="mt-10">
              <ModelCard model="OpenAI" answer={result} />
            </div>
          )}

          {compareResults && !loading && mode === "pro" && (
            <div className="mt-10 space-y-4">
              <ModelCard
                model={t("ask.bestAnswer")}
                answer={compareResults.bestAnswer || t("ask.noResponse")}
              />
              <ModelCard
                model="OpenAI"
                answer={
                  compareResults.results.openai?.answer || t("ask.noResponse")
                }
              />
              <ModelCard
                model="Claude"
                answer={
                  compareResults.results.claude?.answer || t("ask.noResponse")
                }
              />
              <ModelCard
                model="OpenRouter"
                answer={
                  compareResults.results.openrouter?.answer ||
                  t("ask.noResponse")
                }
              />
            </div>
          )}
          {showLoginModal && (
            <AdminLoginModal
              onClose={() => setShowLoginModal(false)}
              onSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
