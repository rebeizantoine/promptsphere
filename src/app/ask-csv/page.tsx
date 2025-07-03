"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

export default function AskCsvPage() {
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
        { method: "POST", body: formData }
      );
      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      setAnswer(data.bestAnswer || "❌ No answer returned.");
    } catch (error) {
      console.error("❌ CSV Ask Error:", error);
      setAnswer("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold drop-shadow">
              📊 Ask Your CSV
            </h1>
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              ← Back
            </Link>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your CSV..."
              rows={3}
              className="w-full bg-transparent border border-white/20 p-4 rounded-xl text-white resize-none focus:border-white/50 transition"
              aria-label="CSV question input"
            />

            <label className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white text-sm cursor-pointer hover:border-white/50 transition w-fit">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              {file ? (
                <span className="truncate max-w-xs inline-block">
                  {file.name}
                </span>
              ) : (
                <span>Upload your CSV file</span>
              )}
            </label>

            <button
              onClick={handleCsvAsk}
              disabled={loading || !file || !question.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-xl py-4 rounded-2xl w-full mb-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
              aria-label="Analyze CSV"
            >
              {loading ? "Analyzing..." : "Ask CSV"}
            </button>
          </div>

          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl whitespace-pre-line mt-6"
            >
              <h2 className="text-xl font-bold mb-4">🧠 Answer:</h2>
              {answer}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
