export function saveResultsToLocal(
  results: Record<string, string>,
  prompt: string
) {
  const blob = new Blob(
    [
      JSON.stringify(
        { prompt, results, createdAt: new Date().toISOString() },
        null,
        2
      ),
    ],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt_results.json";
  a.click();
  URL.revokeObjectURL(url);
}
