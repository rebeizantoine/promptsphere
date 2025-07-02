"use client";
import { useState } from "react";
import { AskForm } from "../components/AskForm";
import { ModelCard } from "../components/ModelCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function AskPage() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleAsk(prompt: string, lang: string) {
    setLoading(true);
    setResponses({});
    const res = await fetch("https://promptsphere-backend.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, lang }),
    });
    const data = await res.json();
    setResponses(data);
    setLoading(false);
  }
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold drop-shadow">
              🧠 Ask the LLMs
            </h1>
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition"
            >
              ← Back
            </Link>
          </div>

          <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl">
            <AskForm onAsk={handleAsk} loading={loading} />
          </div>

          {Object.keys(responses).length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {Object.entries(responses).map(([model, answer]) => (
                <ModelCard
                  key={model}
                  model={model}
                  answer={answer as string}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
