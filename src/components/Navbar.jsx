// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/",        label: "🔍 Search" },
  { to: "/check",   label: "✏️ Manual Check" },
  { to: "/history", label: "📋 History" },
  { to: "/stats",   label: "📊 Stats" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="font-bold text-cyan-400 tracking-tight text-lg">
            اردو FakeNews Detector
          </span>
          <span className="ml-2 text-xs text-gray-500 font-mono">FYP 2025-26</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
