"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function AskCsvPdfPage() {
  // Mode state: 'csv' or 'pdf'
  const [mode, setMode] = useState<"csv" | "pdf">("csv");

  const [csvQuestion, setCsvQuestion] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [pdfQuestion, setPdfQuestion] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleFileAsk = async () => {
    const file = mode === "csv" ? csvFile : pdfFile;
    const question = mode === "csv" ? csvQuestion : pdfQuestion;
    if (!file || !question.trim()) return;

    setLoading(true);
    setAnswer("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

    const endpoint =
      mode === "csv"
        ? "https://promptsphere-backend.onrender.com/api/ask-csv"
        : "https://promptsphere-backend.onrender.com/api/pdf/ask-pdf";

    try {
      const res = await fetch(endpoint, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      setAnswer(data.bestAnswer || data.result || "❌ No answer returned.");
    } catch (error) {
      console.error(`❌ ${mode.toUpperCase()} Ask Error:`, error);
      setAnswer("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0c29]">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold drop-shadow">
              {mode === "csv" ? "📊 CSV Insight" : "📄 PDF Insight"}
            </h1>
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              ← Back
            </Link>
          </div>

          {/* Custom Animated Toggle */}
          <div className="flex justify-center">
            <div className="relative bg-white/10 p-1 rounded-2xl flex items-center w-64 border border-white/10 shadow-inner hover:cursor-pointer">
              {/* Sliding Background */}
              <motion.div
                className="absolute h-[85%] w-[48%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg"
                initial={false}
                animate={{ x: mode === "csv" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => {
                  setMode("csv");
                  setAnswer("");
                }}
                className="relative z-10 flex-1 py-2 text-sm font-bold transition-colors hover:cursor-pointer"
              >
                CSV Mode
              </button>
              <button
                onClick={() => {
                  setMode("pdf");
                  setAnswer("");
                }}
                className="relative z-10 flex-1 py-2 text-sm font-bold transition-colors hover:cursor-pointer"
              >
                PDF Mode
              </button>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "csv" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "csv" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 ml-1">
                    Your Question
                  </label>
                  <textarea
                    value={mode === "csv" ? csvQuestion : pdfQuestion}
                    onChange={(e) =>
                      mode === "csv"
                        ? setCsvQuestion(e.target.value)
                        : setPdfQuestion(e.target.value)
                    }
                    placeholder={
                      mode === "csv"
                        ? "e.g. What is the average of column B?"
                        : "e.g. Summarize the introduction..."
                    }
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                </div>

                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-8 hover:bg-white/5 transition group">
                  <input
                    type="file"
                    id="file-upload"
                    accept={mode === "csv" ? ".csv" : ".pdf"}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (mode === "csv") {
                        setCsvFile(file);
                      } else {
                        setPdfFile(file);
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="mb-2 p-3 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
                      {mode === "csv" ? "📊" : "📄"}
                    </div>
                    <span className="text-sm font-medium">
                      {(mode === "csv" ? csvFile : pdfFile)?.name ||
                        `Click to upload ${mode.toUpperCase()}`}
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleFileAsk}
                  disabled={
                    loading ||
                    (mode === "csv"
                      ? !csvFile || !csvQuestion
                      : !pdfFile || !pdfQuestion)
                  }
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-[0.98] ${
                    mode === "csv"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  {loading ? "Processing..." : `Analyze ${mode.toUpperCase()}`}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Answer Display */}
          {answer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🧠</span> Result
              </h2>
              <p className="text-white/90 leading-relaxed whitespace-pre-line">
                {answer}
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
