"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function ExerciseGeneratorPage() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("js");
  const [difficulty, setDifficulty] = useState("easy");
  const [exercise, setExercise] = useState<null | {
    problem: string;
    solution: string;
    explanation: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [history, setHistory] = useState<
    { problem: string; solution: string; explanation: string }[]
  >([]);

  const handleGenerate = async () => {
    setLoading(true);
    setShowAnswer(false);
    setExercise(null);
    try {
      const res = await fetch(
        `https://promptsphere-backend.onrender.com/api/exercises/generate-exercise?language=${language}&difficulty=${difficulty}`
      );
      if (!res.ok) throw new Error("Failed to fetch exercise");
      const data = await res.json();

      const matchProblem = data.exercise.match(
        /Problem:\s*([\s\S]*?)\nSolution:/
      );
      const matchSolution = data.exercise.match(
        /Solution:\s*([\s\S]*?)\nExplanation:/
      );
      const matchExplanation = data.exercise.match(/Explanation:\s*([\s\S]*)/);

      const newExercise = {
        problem:
          matchProblem?.[1]?.trim() ||
          t("exercise.noProblem", "No problem found."),
        solution:
          matchSolution?.[1]?.trim() ||
          t("exercise.noSolution", "No solution found."),
        explanation:
          matchExplanation?.[1]?.trim() ||
          t("exercise.noExplanation", "No explanation found."),
      };

      setExercise(newExercise);
      setHistory((prev) => [newExercise, ...prev]);
    } catch (err) {
      console.error(err);
      alert(t("exercise.fetchError", "❌ Failed to generate exercise"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-3xl text-white">
          <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow">
            📝 {t("exercise.title", "Daily Coding Exercise")}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
            <label className="flex flex-col w-full md:w-1/2">
              <span className="mb-1 font-semibold">
                {t("exercise.language", "Language")}
              </span>
              <select
                className="bg-gray-800 p-3 rounded-lg outline-none w-full text-white"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="js">
                  {t("exercise.javascript", "JavaScript")}
                </option>
                <option value="python">{t("exercise.python", "Python")}</option>
                <option value="node">{t("exercise.node", "Node.js")}</option>
              </select>
            </label>

            <label className="flex flex-col w-full md:w-1/2">
              <span className="mb-1 font-semibold">
                {t("exercise.difficulty", "Difficulty")}
              </span>
              <select
                className="bg-gray-800 p-3 rounded-lg outline-none w-full text-white"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">{t("exercise.easy", "Easy")}</option>
                <option value="medium">{t("exercise.medium", "Medium")}</option>
                <option value="hard">{t("exercise.hard", "Hard")}</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-xl py-4 rounded-2xl w-full mb-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t("exercise.generating", "Generating...")
              : t("exercise.generateButton", "🚀 Generate Exercise")}
          </button>

          {exercise && (
            <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">
                📝 {t("exercise.problem", "Problem")}
              </h2>
              <pre className="whitespace-pre-wrap break-words mb-6">
                {exercise.problem}
              </pre>

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-white text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-200 transition"
                >
                  {t("exercise.revealAnswer", "Reveal Answer")}
                </button>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    ✅ {t("exercise.solution", "Solution")}
                  </h2>
                  <pre className="whitespace-pre-wrap break-words mb-6 bg-black/20 p-4 rounded-lg">
                    {exercise.solution}
                  </pre>

                  <h2 className="text-2xl font-bold mb-4">
                    💡 {t("exercise.explanation", "Explanation")}
                  </h2>
                  <pre className="whitespace-pre-wrap break-words">
                    {exercise.explanation}
                  </pre>
                </>
              )}
            </div>
          )}

          <div className="bg-gray-900 bg-opacity-60 p-6 rounded-xl mt-8 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {t("exercise.history", "Exercise History")}
            </h2>
            {history.length > 0 ? (
              <ul className="space-y-4">
                {history.map((ex, idx) => (
                  <li key={idx} className="bg-black/20 p-4 rounded-lg">
                    <p className="font-bold mb-2">
                      {t("exercise.problem", "Problem")}
                    </p>
                    <pre className="whitespace-pre-wrap break-words mb-2">
                      {ex.problem}
                    </pre>
                    <p className="font-bold mb-2">
                      {t("exercise.solution", "Solution")}
                    </p>
                    <pre className="whitespace-pre-wrap break-words mb-2">
                      {ex.solution}
                    </pre>
                    <p className="font-bold mb-2">
                      {t("exercise.explanation", "Explanation")}
                    </p>
                    <pre className="whitespace-pre-wrap break-words">
                      {ex.explanation}
                    </pre>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-white/80">
                {t("exercise.noHistory", "No exercises generated yet.")}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
