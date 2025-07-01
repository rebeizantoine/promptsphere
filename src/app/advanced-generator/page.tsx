"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function AdvancedGeneratorPage() {
  const [type, setType] = useState("pdf");
  const [minLength, setMinLength] = useState(5);
  const [maxWords, setMaxWords] = useState(30);
  const [excelSize, setExcelSize] = useState("small");

  const handleGenerate = async () => {
    const params = new URLSearchParams({
      type,
      minLength: String(minLength),
      ...(type === "pdf" && { maxWords: String(maxWords) }),
      ...(type === "excel" && { size: excelSize }),
    });
    const url = `https://promptsphere-backend.onrender.com/api/generator/generate?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Beautiful animated gradient circles in background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-2xl text-white">
          <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow">
            Advanced Document Generator
          </h1>

          <div className="flex flex-col gap-6">
            {/* Document Type Dropdown */}
            <label className="flex flex-col">
              <span className="mb-1 font-semibold text-lg">Document Type</span>
              <div className="relative">
                <select
                  className="appearance-none text-white bg-gray-800 p-3 rounded-lg outline-none w-full pr-10 focus:ring-2 focus:ring-purple-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option
                    className="bg-gray-800 text-white border-2"
                    value="pdf"
                  >
                    PDF
                  </option>
                  <option className="bg-gray-800 text-white" value="excel">
                    Excel
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </label>

            {/* Minimum Word Length Input */}
            <label className="flex flex-col">
              <span className="mb-1 font-semibold text-lg">
                Minimum Word Length
              </span>
              <input
                type="number"
                inputMode="numeric"
                className="bg-gray-800 text-white p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-purple-500"
                value={minLength}
                min={1}
                onChange={(e) => setMinLength(Number(e.target.value))}
              />
            </label>

            {/* Maximum Words Input for PDF */}
            {type === "pdf" && (
              <label className="flex flex-col">
                <span className="mb-1 font-semibold text-lg">
                  Maximum Number of Words (PDF only)
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  className="bg-gray-800 text-white p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-purple-500"
                  value={maxWords}
                  min={1}
                  onChange={(e) => setMaxWords(Number(e.target.value))}
                />
              </label>
            )}

            {/* NEW: Excel File Size Dropdown */}
            {type === "excel" && (
              <label className="flex flex-col">
                <span className="mb-1 font-semibold text-lg">
                  Excel File Size
                </span>
                <div className="relative">
                  <select
                    className="appearance-none text-white bg-gray-800 p-3 rounded-lg outline-none w-full pr-10 focus:ring-2 focus:ring-purple-500"
                    value={excelSize}
                    onChange={(e) => setExcelSize(e.target.value)}
                  >
                    <option className="bg-gray-800 text-white" value="small">
                      Small (10 rows)
                    </option>
                    <option className="bg-gray-800 text-white" value="medium">
                      Medium (1,000 rows)
                    </option>
                    <option className="bg-gray-800 text-white" value="large">
                      Large (10,000 rows)
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-xl py-4 rounded-2xl mt-6 shadow-lg"
            >
              🚀 Generate Document
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
