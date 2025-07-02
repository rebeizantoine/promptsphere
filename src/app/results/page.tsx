"use client";

import React from "react";
import { saveResultsToLocal } from "../lib/saveResults"; // Import only, no export here!

export default function ResultsPage() {
  // Your page logic here

  function handleSave(results: Record<string, string>, prompt: string) {
    saveResultsToLocal(results, prompt);
  }

  return (
    <div>
      {/* Your UI */}
      <button onClick={() => handleSave({ model1: "Answer" }, "Prompt here")}>
        Save Results
      </button>
    </div>
  );
}

// DO NOT export saveResultsToLocal here!
