"use client";
import { useState } from "react";

export default function CutoffCheckerTool() {
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("General");
  const [result, setResult] = useState(null);

  const cutoffData = {
    "VIT Vellore": { "CSE": { General: "Top 5,000 VITEEE", OBC: "Top 8,000", SC: "Top 15,000" }, "ECE": { General: "Top 8,000 VITEEE", OBC: "Top 12,000", SC: "Top 20,000" } },
    "BITS Pilani": { "CSE": { General: "BITSAT > 360", OBC: "BITSAT > 340", SC: "BITSAT > 300" }, "ECE": { General: "BITSAT > 340", OBC: "BITSAT > 320", SC: "BITSAT > 285" } },
    "NIT Trichy": { "CSE": { General: "JEE Rank < 2,500", OBC: "JEE Rank < 5,000", SC: "JEE Rank < 12,000" }, "ECE": { General: "JEE Rank < 5,000", OBC: "JEE Rank < 10,000", SC: "JEE Rank < 18,000" } },
    "SRM University": { "CSE": { General: "Top 10,000 SRMJEEE", OBC: "Top 15,000", SC: "Top 25,000" }, "ECE": { General: "Top 15,000 SRMJEEE", OBC: "Top 20,000", SC: "Top 30,000" } },
    "Delhi University": { "BA Economics": { General: "CUET > 95%ile", OBC: "CUET > 88%ile", SC: "CUET > 78%ile" }, "BCom (Hons)": { General: "CUET > 93%ile", OBC: "CUET > 85%ile", SC: "CUET > 75%ile" } },
  };

  const check = () => {
    if (!college || !branch || !category) return;
    const data = cutoffData[college]?.[branch]?.[category];
    setResult(data || "Data not available for this combination. Please check official website.");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Select College</label>
        <select className="input" value={college} onChange={(e) => { setCollege(e.target.value); setBranch(""); setResult(null); }}>
          <option value="">-- Select College --</option>
          {Object.keys(cutoffData).map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {college && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Branch / Course</label>
          <select className="input" value={branch} onChange={(e) => { setBranch(e.target.value); setResult(null); }}>
            <option value="">-- Select Branch --</option>
            {Object.keys(cutoffData[college] || {}).map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option><option>OBC</option><option>SC</option>
        </select>
      </div>
      <button onClick={check} className="btn-primary w-full">Check Cutoff →</button>
      {result && (
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
          <h4 className="font-semibold text-purple-800 mb-2">🎯 Last Year Cutoff</h4>
          <p className="text-2xl font-bold text-purple-600">{result}</p>
          <p className="text-xs text-gray-400 mt-2">Based on 2024 admission data. Actual cutoffs may vary.</p>
        </div>
      )}
    </div>
  );
}
