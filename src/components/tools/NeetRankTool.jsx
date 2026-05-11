"use client";
import { useState } from "react";

export default function NeetRankTool() {
  const [score, setScore] = useState("");
  const [result, setResult] = useState(null);

  const predict = () => {
    const s = parseInt(score);
    if (isNaN(s) || s < 0 || s > 720) return;
    let rank, colleges;
    if (s >= 680) { rank = "< 1,000"; colleges = ["AIIMS Delhi", "AIIMS Mumbai", "Maulana Azad"]; }
    else if (s >= 650) { rank = "1,000 – 5,000"; colleges = ["AIIMS (other)", "Top Govt MBBS", "BHU IMS"]; }
    else if (s >= 600) { rank = "5,000 – 20,000"; colleges = ["Govt Medical Colleges", "State quota MBBS"]; }
    else if (s >= 550) { rank = "20,000 – 60,000"; colleges = ["State Govt Colleges", "Some Private MBBS"]; }
    else if (s >= 500) { rank = "60,000 – 1,50,000"; colleges = ["Private MBBS Colleges", "Deemed Universities"]; }
    else if (s >= 400) { rank = "1,50,000 – 4,00,000"; colleges = ["Private Colleges", "BDS / BAMS options"]; }
    else { rank = "> 4,00,000"; colleges = ["BDS", "BAMS", "BHMS", "BSc Nursing"]; }
    setResult({ rank, colleges, score: s });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your NEET Score (out of 720)</label>
        <input type="number" min="0" max="720" value={score}
          onChange={(e) => setScore(e.target.value)}
          className="input" placeholder="e.g. 620" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select className="input">
          <option>General (UR)</option><option>OBC</option><option>SC</option><option>ST</option>
        </select>
      </div>
      <button onClick={predict} className="btn-primary w-full">Predict My Rank →</button>
      {result && (
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 rounded-2xl p-5 space-y-4">
          <h4 className="font-semibold text-gray-800 text-center">🏥 Your NEET Prediction</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-red-600">{result.rank}</div>
              <div className="text-xs text-gray-500 mt-0.5">Expected AIR</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-pink-600">{result.score}</div>
              <div className="text-xs text-gray-500 mt-0.5">Your Score</div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">🎓 Colleges You Can Target:</p>
            <div className="flex flex-wrap gap-2">
              {result.colleges.map((c) => (
                <span key={c} className="bg-white border border-red-100 text-red-700 text-xs px-3 py-1 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
