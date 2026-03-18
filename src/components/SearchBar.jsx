// src/components/SearchBar.jsx
import { useState } from "react";

const SUGGESTIONS = ["Pakistan", "عمران خان", "CPEC", "انتخابات", "کرکٹ", "Dawn"];

export default function SearchBar({ onSearch, loading }) {
  const [val, setVal] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(val.trim());
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="flex-1 relative">
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Search news keyword (e.g. Pakistan, عمران خان) …"
          className="w-full bg-gray-900 border border-gray-700 focus:border-cyan-500 
                     outline-none rounded-lg px-4 py-3 text-white placeholder-gray-600
                     transition-colors text-sm"
          dir="auto"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !val.trim()}
        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40
                   text-black font-bold rounded-lg transition-colors text-sm uppercase tracking-wide"
      >
        {loading ? "…" : "Search"}
      </button>

      {/* Quick suggestion pills */}
      <div className="hidden sm:flex items-center gap-1 ml-1">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => { setVal(s); onSearch(s); }}
            className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-400
                       hover:text-white rounded border border-gray-700 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}
