"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function AdvancedGeneratorPage() {
  const [type, setType] = useState<"pdf" | "excel">("pdf");
  const [minLength, setMinLength] = useState(5);
  const [maxWords, setMaxWords] = useState(30);
  const [excelSize, setExcelSize] = useState("small");

  const [backendReady, setBackendReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // ────────────────────────────────────────────────────────────
  // Ping Render backend once on mount and retry until it wakes up
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    let retryId: NodeJS.Timeout;

    async function ping() {
      try {
        // 🔸 Replace "/api/health" with the lightest endpoint you have
        const res = await fetch(
          "https://promptsphere-backend.onrender.com/api/health",
          { cache: "no-store" }
        );
        if (res.ok) {
          setBackendReady(true);
          return; // stop retrying
        }
      } catch (_) {
        /* ignore – likely still booting */
      }
      retryId = setTimeout(ping, 5000); // retry every 5 s
    }

    ping();
    return () => clearTimeout(retryId);
  }, []);

  // ────────────────────────────────────────────────────────────
  // Generate document
  // ────────────────────────────────────────────────────────────
  const handleGenerate = () => {
    setIsGenerating(true);

    const params = new URLSearchParams({
      type,
      minLength: String(minLength),
      ...(type === "pdf" && { maxWords: String(maxWords) }),
      ...(type === "excel" && { size: excelSize }),
    });

    const url = `https://promptsphere-backend.onrender.com/api/generator/generate?${params.toString()}`;
    window.open(url, "_blank");

    // Small delay so the user sees the spinner flash, then re‑enable
    setTimeout(() => setIsGenerating(false), 800);
  };

  const buttonDisabled = !backendReady || isGenerating;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Animated gradient circles */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-2xl text-white">
          <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow">
            Advanced Document Generator
          </h1>

          <div className="flex flex-col gap-6">
            {/* ── Document Type ─────────────────────────────────── */}
            <label className="flex flex-col">
              <span className="mb-1 font-semibold text-lg">Document Type</span>
              <select
                className="appearance-none text-white bg-gray-800 p-3 rounded-lg outline-none w-full pr-10 focus:ring-2 focus:ring-purple-500"
                value={type}
                onChange={(e) => setType(e.target.value as "pdf" | "excel")}
              >
                <option className="bg-gray-800" value="pdf">
                  PDF
                </option>
                <option className="bg-gray-800" value="excel">
                  Excel
                </option>
              </select>
            </label>

            {/* ── Minimum Word Length ────────────────────────────── */}
            <label className="flex flex-col">
              <span className="mb-1 font-semibold text-lg">
                Minimum Word Length
              </span>
              <input
                type="number"
                className="bg-gray-800 text-white p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-purple-500"
                min={1}
                value={minLength}
                onChange={(e) => setMinLength(Number(e.target.value))}
              />
            </label>

            {/* ── Max Words (PDF) ────────────────────────────────── */}
            {type === "pdf" && (
              <label className="flex flex-col">
                <span className="mb-1 font-semibold text-lg">
                  Maximum Number of Words
                </span>
                <input
                  type="number"
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-purple-500"
                  min={1}
                  value={maxWords}
                  onChange={(e) => setMaxWords(Number(e.target.value))}
                />
              </label>
            )}

            {/* ── Excel size ─────────────────────────────────────── */}
            {type === "excel" && (
              <label className="flex flex-col">
                <span className="mb-1 font-semibold text-lg">
                  Excel File Size
                </span>
                <select
                  className="appearance-none text-white bg-gray-800 p-3 rounded-lg outline-none w-full pr-10 focus:ring-2 focus:ring-purple-500"
                  value={excelSize}
                  onChange={(e) => setExcelSize(e.target.value)}
                >
                  <option className="bg-gray-800" value="small">
                    Small (10 rows)
                  </option>
                  <option className="bg-gray-800" value="medium">
                    Medium (1,000 rows)
                  </option>
                  <option className="bg-gray-800" value="large">
                    Large (10,000 rows)
                  </option>
                </select>
              </label>
            )}

            {/* ── Generate Button ───────────────────────────────── */}
            <button
              onClick={handleGenerate}
              disabled={buttonDisabled}
              className={`bg-gradient-to-r from-purple-500 to-pink-500 font-bold cursor-pointer text-xl py-4 rounded-2xl mt-6 shadow-lg transition-all ${
                buttonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-pink-600"
              }`}
            >
              {!backendReady
                ? "Waking up server…"
                : isGenerating
                ? "Generating…"
                : "🚀 Generate Document"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
