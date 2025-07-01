"use client";
import { motion } from "framer-motion";

export function ModelCard({
  model,
  answer,
}: {
  model: string;
  answer: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/10 p-5 rounded-xl shadow-md backdrop-blur-sm border border-white/10 text-white"
    >
      <h3 className="text-lg font-bold mb-2">🤖 {model}</h3>
      <p className="text-sm whitespace-pre-wrap text-white/90 leading-relaxed">
        {answer}
      </p>
    </motion.div>
  );
}
