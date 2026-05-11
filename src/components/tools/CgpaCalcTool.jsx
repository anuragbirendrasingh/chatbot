"use client";
import { useState } from "react";

export default function CgpaCalcTool() {
  const [cgpa, setCgpa] = useState("");
  const [system, setSystem] = useState("CBSE");
  const [result, setResult] = useState(null);

  const calc = () => {
    const c = parseFloat(cgpa);
    if (isNaN(c)) return;
    let percent;
    if (system === "CBSE") percent = (c - 0.75) * 10;
    else if (system === "VTU") percent = c * 10;
    else if (system === "Mumbai") percent = (c * 7.25) + 11;
    else percent = c * 9.5;
    setResult({ percent: percent.toFixed(2), cgpa: c, system });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">University / Board</label>
        <select className="input" value={system} onChange={(e) => setSystem(e.target.value)}>
          {["CBSE", "VTU", "Mumbai University", "Anna University", "General (×9.5)"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your CGPA</label>
        <input type="number" step="0.01" min="0" max="10" value={cgpa}
          onChange={(e) => setCgpa(e.target.value)} className="input" placeholder="e.g. 8.4" />
      </div>
      <button onClick={calc} className="btn-primary w-full">Convert →</button>
      {result && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">{result.system} Formula</p>
          <div className="text-4xl font-bold text-blue-600">{result.percent}%</div>
          <p className="text-sm text-gray-500 mt-1">= CGPA {result.cgpa} converted to percentage</p>
        </div>
      )}
    </div>
  );
}
