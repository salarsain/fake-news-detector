// src/components/StatsPage.jsx
import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { getStats } from "../api/newsApi";

const COLORS = { TRUE: "#10b981", FAKE: "#ef4444" };

export default function StatsPage() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20 text-cyan-400">
      <div className="w-5 h-5 border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin mr-3" />
      Loading stats…
    </div>
  );

  if (!stats || stats.total === 0) return (
    <div className="text-center py-20 text-gray-600">
      No stats yet. Check some news articles first!
    </div>
  );

  const pieData = [
    { name: "TRUE",  value: stats.true_count },
    { name: "FAKE",  value: stats.fake_count },
  ];

  const dailyData = (stats.daily_counts || []).reverse().map(d => ({
    day: d.day?.slice(5),
    count: d.cnt,
  }));

  const sourceData = (stats.by_source || []).map(s => ({
    name: s.source || "manual",
    count: s.cnt,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
      <p className="text-gray-500 text-sm mb-6">Aggregate prediction statistics</p>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Checked",  value: stats.total,                       color: "text-cyan-400" },
          { label: "Fake Detected",  value: stats.fake_count,                  color: "text-red-400"  },
          { label: "True News",      value: stats.true_count,                  color: "text-emerald-400" },
          { label: "Avg Confidence", value: `${Math.round(stats.avg_confidence * 100)}%`, color: "text-yellow-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Pie chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            True vs Fake Ratio
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e2e8f0" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar – daily activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Daily Activity (last 7 days)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#4b5563" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis stroke="#4b5563" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e2e8f0" }} />
              <Bar dataKey="count" fill="#06b6d4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar – by source */}
      {sourceData.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Checks by Source
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sourceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" stroke="#4b5563" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" stroke="#4b5563" tick={{ fill: "#6b7280", fontSize: 11 }} width={70} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e2e8f0" }} />
              <Bar dataKey="count" fill="#a78bfa" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
