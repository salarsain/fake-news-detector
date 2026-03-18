// src/components/HistoryPage.jsx
import { useEffect, useState } from "react";
import { getHistory } from "../api/newsApi";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory(50)
      .then(({ data }) => setHistory(data.history || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20 text-cyan-400">
      <div className="w-5 h-5 border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin mr-3" />
      Loading history…
    </div>
  );

  if (!history.length) return (
    <div className="text-center py-20 text-gray-600">
      No history yet. Check some news first!
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">History</h2>
      <p className="text-gray-500 text-sm mb-6">{history.length} predictions recorded</p>
      <div className="space-y-3">
        {history.map((h) => {
          const isFake = h.label === "FAKE";
          return (
            <div key={h.id}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                isFake
                  ? "bg-red-950/20 border-red-900/50"
                  : "bg-emerald-950/10 border-emerald-900/40"
              }`}>
              <span className="text-2xl flex-shrink-0">{isFake ? "⚠️" : "✅"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate" dir="auto">{h.title}</p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {h.source} · {new Date(h.created_at).toLocaleString()} · {h.model_used}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`font-bold text-sm ${isFake ? "text-red-400" : "text-emerald-400"}`}>
                  {h.label}
                </p>
                <p className="text-gray-600 text-xs">{Math.round(h.confidence * 100)}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
