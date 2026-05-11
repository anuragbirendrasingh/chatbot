"use client";
import { useState } from "react";

export default function JeePercentileTool() {
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState(null);

  const predict = () => {
    const m = parseInt(marks);
    if (isNaN(m) || m < 0 || m > 300) return;
    let percentile, rank, category;
    if (m >= 280) { percentile = 99.98; rank = "< 500"; category = "IIT Zone"; }
    else if (m >= 250) { percentile = 99.8; rank = "500 – 2,000"; category = "Top IIT / NIT"; }
    else if (m >= 220) { percentile = 99.5; rank = "2,000 – 8,000"; category = "Good NIT"; }
    else if (m >= 180) { percentile = 98.5; rank = "8,000 – 25,000"; category = "NIT / IIIT"; }
    else if (m >= 150) { percentile = 96.0; rank = "25,000 – 60,000"; category = "Good Private"; }
    else if (m >= 120) { percentile = 91.0; rank = "60,000 – 1,20,000"; category = "Private Colleges"; }
    else if (m >= 90) { percentile = 80.0; rank = "1,20,000 – 2,50,000"; category = "State Colleges"; }
    else { percentile = 60.0; rank = "> 2,50,000"; category = "Consider Reappear"; }
    setResult({ percentile, rank, category, marks: m });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your JEE Main Marks (out of 300)</label>
        <input type="number" min="0" max="300" value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="input" placeholder="e.g. 180" />
        <p className="text-xs text-gray-400 mt-1">Based on previous year trends (2022–2025)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select className="input">
          <option>General (UR)</option>
          <option>OBC-NCL</option>
          <option>SC</option>
          <option>ST</option>
          <option>EWS</option>
        </select>
      </div>

      <button onClick={predict} className="btn-primary w-full">Predict My Percentile →</button>

      {result && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 space-y-4">
          <h4 className="font-semibold text-gray-800 text-center">📊 Your Estimated Result</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{result.percentile}%</div>
              <div className="text-xs text-gray-500 mt-0.5">Percentile</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-lg font-bold text-indigo-600">{result.rank}</div>
              <div className="text-xs text-gray-500 mt-0.5">Expected Rank</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-sm font-bold text-green-600">{result.category}</div>
              <div className="text-xs text-gray-500 mt-0.5">College Zone</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">⚠️ Estimate only. Actual results may vary by session difficulty.</p>
        </div>
      )}
    </div>
  );
}
