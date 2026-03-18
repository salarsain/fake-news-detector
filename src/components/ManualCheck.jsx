// src/components/ManualCheck.jsx
import { useState } from "react";
import { checkNews } from "../api/newsApi";

export default function ManualCheck() {
  const [text,    setText]    = useState("");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const { data } = await checkNews(text);
      setResult(data);
    } catch {
      setError("Backend not reachable. Is it running on port 8000?");
    } finally {
      setLoading(false);
    }
  }

  const isFake      = result?.label === "FAKE";
  const confPercent = Math.round((result?.confidence || 0) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-1">Manual Check</h2>
      <p className="text-gray-500 text-sm mb-6">Paste any Urdu or English news article to verify it.</p>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={6}
        dir="auto"
        placeholder="خبر یہاں پیسٹ کریں یا لکھیں…"
        className="w-full bg-gray-900 border border-gray-700 focus:border-cyan-500
                   outline-none rounded-xl p-4 text-white placeholder-gray-600
                   resize-y font-urdu text-lg leading-loose transition-colors mb-3"
      />

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40
                     text-black font-bold rounded-lg transition-colors text-sm uppercase tracking-wide"
        >
          {loading ? "Analyzing…" : "Check News →"}
        </button>
        <button
          onClick={() => { setText(""); setResult(null); }}
          className="px-4 py-3 border border-gray-700 text-gray-400 hover:text-white
                     hover:border-gray-500 rounded-lg transition-colors text-sm"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">{error}</div>
      )}

      {loading && (
        <div className="flex justify-center gap-3 py-12 text-cyan-400">
          <div className="w-5 h-5 border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest">RUNNING ENSEMBLE MODELS…</span>
        </div>
      )}

      {result && !loading && (
        <div className={`rounded-xl border p-6 animate-fade-in ${
          isFake
            ? "bg-red-950/30 border-red-700"
            : "bg-emerald-950/20 border-emerald-700"
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{isFake ? "⚠️" : "✅"}</span>
            <div>
              <h3 className={`text-2xl font-bold ${isFake ? "text-red-400" : "text-emerald-400"}`}>
                {isFake ? "FAKE NEWS — جھوٹی خبر" : "TRUE NEWS — سچی خبر"}
              </h3>
              <p className="text-gray-500 text-sm font-mono mt-0.5">
                Analysed at {new Date(result.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Confidence */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
              <span>CONFIDENCE</span><span>{confPercent}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isFake ? "bg-red-500" : "bg-emerald-500"}`}
                style={{ width: `${confPercent}%`, transition: "width 0.8s ease" }}
              />
            </div>
          </div>

          {/* Model Breakdown */}
          <div>
            <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">Model Breakdown</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "BERT RoBERTa", vote: result.bert_vote },
                { name: "Naive Bayes",  vote: result.nb_vote   },
                { name: "Random Forest",vote: result.rf_vote   },
              ].map(({ name, vote }) => (
                <div key={name} className="bg-gray-900 rounded-lg p-3 text-center border border-gray-800">
                  <p className="text-gray-600 text-xs mb-1">{name}</p>
                  <p className={`font-bold text-sm ${
                    vote === "TRUE" ? "text-emerald-400" :
                    vote === "FAKE" ? "text-red-400"     : "text-gray-600"
                  }`}>{vote || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
