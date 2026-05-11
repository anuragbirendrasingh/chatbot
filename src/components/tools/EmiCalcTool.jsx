"use client";
import { useState } from "react";

export default function EmiCalcTool() {
  const [fees, setFees] = useState("");
  const [years, setYears] = useState("4");
  const [rate, setRate] = useState("8.5");
  const [result, setResult] = useState(null);

  const calc = () => {
    const P = parseFloat(fees) * 100000;
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;
    if (!P || !r || !n) return;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;
    setResult({ emi: Math.round(emi), total: Math.round(total), interest: Math.round(interest) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Total College Fees (in Lakhs)</label>
        <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="input" placeholder="e.g. 8 (for ₹8 Lakhs)" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Loan Duration (Years)</label>
          <select className="input" value={years} onChange={(e) => setYears(e.target.value)}>
            {[3,4,5,7,10,15].map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Interest Rate (%)</label>
          <select className="input" value={rate} onChange={(e) => setRate(e.target.value)}>
            {["7.0","7.5","8.0","8.5","9.0","9.5","10.0","11.0"].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <button onClick={calc} className="btn-primary w-full">Calculate EMI →</button>
      {result && (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-3">
          <h4 className="font-semibold text-green-800 text-center">💰 Education Loan Breakdown</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-green-600">₹{result.emi.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-0.5">Monthly EMI</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-blue-600">₹{(result.total/100000).toFixed(1)}L</div>
              <div className="text-xs text-gray-500 mt-0.5">Total Payable</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-red-500">₹{(result.interest/100000).toFixed(1)}L</div>
              <div className="text-xs text-gray-500 mt-0.5">Total Interest</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
