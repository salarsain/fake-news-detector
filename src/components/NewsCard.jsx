// src/components/NewsCard.jsx
export default function NewsCard({ article }) {
  const isFake       = article.label === "FAKE";
  const confPercent  = Math.round((article.confidence || 0) * 100);

  return (
    <div className={`rounded-xl border p-5 transition-all ${
      isFake
        ? "bg-red-950/30 border-red-800/50 hover:border-red-600"
        : "bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-600"
    }`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Title */}
        <div className="flex-1">
          <p className="text-white font-medium leading-snug" dir="auto">
            {article.title}
          </p>
          {article.summary && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2" dir="auto">
              {article.summary}
            </p>
          )}
        </div>

        {/* Verdict badge */}
        <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
          isFake
            ? "bg-red-500/20 text-red-400 border border-red-700"
            : "bg-emerald-500/20 text-emerald-400 border border-emerald-700"
        }`}>
          {isFake ? "⚠️ FAKE" : "✅ TRUE"}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 flex-wrap text-xs text-gray-600">
        {article.source && <span className="bg-gray-800 px-2 py-0.5 rounded">{article.source}</span>}
        {article.published && <span>{new Date(article.published).toLocaleDateString()}</span>}
        {article.url && (
          <a href={article.url} target="_blank" rel="noreferrer"
            className="text-cyan-600 hover:text-cyan-400 underline underline-offset-2">
            Read full article →
          </a>
        )}
      </div>

      {/* Confidence bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className="font-mono">CONFIDENCE</span>
          <span className="font-mono">{confPercent}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isFake ? "bg-red-500" : "bg-emerald-500"}`}
            style={{ width: `${confPercent}%` }}
          />
        </div>
      </div>

      {/* Model votes */}
      {(article.bert_vote || article.nb_vote || article.rf_vote) && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {[
            { name: "BERT",   vote: article.bert_vote },
            { name: "NB",     vote: article.nb_vote   },
            { name: "RF",     vote: article.rf_vote   },
          ].map(({ name, vote }) => vote && vote !== "N/A" && (
            <span key={name} className={`text-xs px-2 py-0.5 rounded font-mono border ${
              vote === "TRUE"
                ? "border-emerald-800 text-emerald-500 bg-emerald-950/30"
                : "border-red-800 text-red-400 bg-red-950/30"
            }`}>
              {name}: {vote}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
