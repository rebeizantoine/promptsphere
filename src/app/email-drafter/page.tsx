"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function EmailDrafterPage() {
  const [keyPoints, setKeyPoints] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDraft = async () => {
    setLoading(true);
    setDraft("");

    try {
      const res = await fetch(
        "https://promptsphere-backend.onrender.com/api/email/draft",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyPoints }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to draft email.");
      }

      const data = await res.json();
      setDraft(data.email || "⚠️ No draft generated.");
    } catch (err) {
      console.error(err);
      setDraft("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-full max-w-3xl text-white border border-white/20">
          <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow">
            ✉️ Quick Email Drafter
          </h1>

          <textarea
            className="w-full bg-gray-800 p-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 mb-4 resize-none"
            rows={6}
            placeholder="Paste key points for your email here..."
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
          ></textarea>

          <button
            onClick={handleDraft}
            disabled={loading || keyPoints.trim() === ""}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-lg py-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Drafting..." : "🚀 Draft Email"}
          </button>

          {draft && (
            <div className="mt-8 bg-white text-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto whitespace-pre-wrap leading-relaxed">
              <h2 className="text-2xl font-bold mb-4">📧 Drafted Email</h2>
              <p
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: draft.replace(/\n/g, "<br/>"),
                }}
              ></p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
