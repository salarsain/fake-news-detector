// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar       from "./components/Navbar";
import HomePage     from "./components/HomePage";
import ManualCheck  from "./components/ManualCheck";
import HistoryPage  from "./components/HistoryPage";
import StatsPage    from "./components/StatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-slate-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/check"   element={<ManualCheck />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/stats"   element={<StatsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
