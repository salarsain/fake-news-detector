// src/components/HomePage.jsx
import { useState } from "react";
import { searchNews } from "../api/newsApi";
import NewsCard from "./NewsCard";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);
  const [keyword, setKeyword]   = useState("");

  async function handleSearch(kw) {
    if (!kw.trim()) return;
    setKeyword(kw);
    setLoading(true);
    setError(null);
    try {
      const { data } = await searchNews(kw);
      setResults(data.results || []);
    } catch (e) {
      setError("Could not connect to backend. Make sure it's running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">
          Urdu <span className="text-cyan-400">Fake News</span> Detector
        </h1>
        <p className="text-3xl text-yellow-400 font-urdu mb-3" dir="rtl">
          اردو جھوٹی خبر کا پتہ لگانے کا نظام
        </p>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          Real-time AI-powered fact verification for Pakistani social media.
          Searches Geo, ARY, Dawn & BBC Urdu live.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 mt-12 text-cyan-400">
          <div className="w-5 h-5 border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest">SCANNING RSS FEEDS…</span>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6">
          <p className="text-gray-500 text-xs font-mono mb-4 uppercase tracking-widest">
            {results.length} results for "{keyword}"
          </p>
          <div className="space-y-4">
            {results.map((item, i) => <NewsCard key={i} article={item} />)}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && keyword && (
        <p className="text-center text-gray-600 mt-12">No articles found for "{keyword}"</p>
      )}

      {!keyword && !loading && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: "🤖", title: "3-Model Ensemble", desc: "BERT + Naive Bayes + Random Forest vote together" },
            { icon: "📡", title: "Live RSS Feeds", desc: "Geo, ARY, Dawn, BBC Urdu scraped in real-time" },
            { icon: "🇵🇰", title: "Urdu-First AI", desc: "Trained on Pakistani news with Urdu NLP pipeline" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
