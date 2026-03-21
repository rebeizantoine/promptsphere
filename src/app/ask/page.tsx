"use client";

import { useState } from "react";
import axios from "axios";
import { AskForm } from "../components/AskForm";
import { ModelCard } from "../components/ModelCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AskPage() {
  const [mode, setMode] = useState<"basic" | "pro">("basic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [compareResults, setCompareResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Handle mode switch
  const handleModeChange = (newMode: "basic" | "pro") => {
    setMode(newMode);

    // 🔥 Clear everything when switching modes
    setResult(null);
    setCompareResults(null);
    setError(null);
  };

  // 🚀 Handle ask
  const handleAsk = async (prompt: string, lang: string) => {
    setLoading(true);

    // 🔥 Clear previous results
    setResult(null);
    setCompareResults(null);
    setError(null);

    const endpoint =
      mode === "pro" ? `${API_URL}/api/compare-llms-smart` : `${API_URL}/ask`;

    try {
      const response = await axios.post(
        endpoint,
        mode === "pro" ? { question: prompt } : { prompt, lang },
      );

      const data = response.data;

      if (mode === "pro") {
        setCompareResults(data);
      } else {
        setResult(data.result);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">🧠 Ask the LLMs</h1>

            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              ← Back
            </Link>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => handleModeChange("basic")}
              className={`px-4 py-2 rounded-xl border ${
                mode === "basic"
                  ? "bg-white text-black"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              ⚡ Basic
            </button>

            <button
              onClick={() => handleModeChange("pro")}
              className={`px-4 py-2 rounded-xl border ${
                mode === "pro"
                  ? "bg-purple-500 text-white"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              🚀 Pro (Compare)
            </button>
          </div>

          {/* Ask Form */}
          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
            <AskForm onAsk={handleAsk} loading={loading} />
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-white/60 animate-pulse text-center">
              🤖 Thinking...
            </p>
          )}

          {/* Error */}
          {error && <div className="text-red-400 text-center">❌ {error}</div>}

          {/* BASIC RESULT */}
          {result && !loading && mode === "basic" && (
            <div className="mt-10">
              <ModelCard model="OpenAI" answer={result} />
            </div>
          )}

          {/* PRO RESULT */}
          {compareResults && !loading && mode === "pro" && (
            <div className="mt-10 space-y-4">
              {/* Best Answer */}
              <ModelCard
                model="🏆 Best Answer"
                answer={compareResults.bestAnswer}
              />

              {/* All Models */}
              <ModelCard
                model="OpenAI"
                answer={compareResults.results.openai?.answer || "No response"}
              />

              <ModelCard
                model="Claude"
                answer={compareResults.results.claude?.answer || "No response"}
              />

              <ModelCard
                model="OpenRouter"
                answer={
                  compareResults.results.openrouter?.answer || "No response"
                }
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
