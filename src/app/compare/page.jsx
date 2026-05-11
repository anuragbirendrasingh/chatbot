"use client";
import { useState } from "react";

const colleges = [
  {
    id: 1, name: "VIT Vellore", short: "VIT", color: "#1a6b3c",
    nirf: 11, naac: "A++", location: "Vellore, TN",
    fees: { btech: 1.98, mtech: 1.5, avg: 1.74 },
    placements: { avg: 8.5, highest: 105, rate: 92 },
    courses: ["CSE", "AI & ML", "ECE", "Mechanical", "Civil", "Data Science", "Robotics", "IT"],
    cutoff: "VITEEE Rank < 10,000",
    seats: 6000, established: 1984,
    topRecruiters: ["Microsoft", "Google", "Amazon", "Wipro"],
    highlights: ["Green campus", "Global tie-ups", "6000+ seats", "Research labs"],
  },
  {
    id: 2, name: "BITS Pilani", short: "BITS", color: "#6c1a1a",
    nirf: 16, naac: "A", location: "Pilani, Rajasthan",
    fees: { btech: 20, mtech: 10, avg: 15 },
    placements: { avg: 18, highest: 120, rate: 95 },
    courses: ["CSE", "ECE", "Mechanical", "Chemical", "Civil", "EEE"],
    cutoff: "BITSAT Score > 340",
    seats: 1350, established: 1964,
    topRecruiters: ["Google", "Goldman Sachs", "Qualcomm", "Samsung"],
    highlights: ["No reservation", "Strong alumni", "Startup culture", "WILP programs"],
  },
  {
    id: 3, name: "SRM University", short: "SRM", color: "#003087",
    nirf: 20, naac: "A++", location: "Chennai, TN",
    fees: { btech: 2.5, mtech: 1.5, avg: 2.0 },
    placements: { avg: 7.5, highest: 45, rate: 88 },
    courses: ["CSE", "AI & Data Science", "ECE", "Mechanical", "Civil", "Biotech"],
    cutoff: "SRMJEEE Rank < 15,000",
    seats: 7000, established: 1985,
    topRecruiters: ["TCS", "HCL", "Deloitte", "Wipro"],
    highlights: ["7000+ seats", "Multiple campuses", "Modern infra", "Strong IT"],
  },
  {
    id: 4, name: "Manipal University", short: "MIT", color: "#C8102E",
    nirf: 9, naac: "A++", location: "Manipal, Karnataka",
    fees: { btech: 3.0, mtech: 2.0, avg: 2.5 },
    placements: { avg: 9, highest: 60, rate: 90 },
    courses: ["CSE", "IT", "ECE", "Mechanical", "Aerospace", "Chemical"],
    cutoff: "MET / JEE Main",
    seats: 3000, established: 1957,
    topRecruiters: ["Amazon", "Flipkart", "Honeywell", "L&T"],
    highlights: ["Medical + Engg campus", "Global university", "Island campus", "Research focus"],
  },
  {
    id: 5, name: "Thapar University", short: "TIET", color: "#004B87",
    nirf: 28, naac: "A", location: "Patiala, Punjab",
    fees: { btech: 2.5, mtech: 1.8, avg: 2.1 },
    placements: { avg: 10, highest: 50, rate: 91 },
    courses: ["CSE", "ECE", "Mechanical", "Chemical", "Civil", "Electrical"],
    cutoff: "JEE Main > 85 percentile",
    seats: 1200, established: 1956,
    topRecruiters: ["Microsoft", "Oracle", "Samsung", "DRDO"],
    highlights: ["Research-first", "Strong CSE", "Small batches", "Industry projects"],
  },
  {
    id: 6, name: "Chandigarh University", short: "CU", color: "#F47920",
    nirf: 22, naac: "A+", location: "Mohali, Punjab",
    fees: { btech: 1.8, mtech: 1.5, avg: 1.65 },
    placements: { avg: 8, highest: 54, rate: 87 },
    courses: ["CSE", "IT", "ECE", "Mechanical", "Civil", "AI & ML"],
    cutoff: "CUCET / JEE Main",
    seats: 5000, established: 2012,
    topRecruiters: ["Cognizant", "Capgemini", "Amazon", "Microsoft"],
    highlights: ["Fastest growing", "Affordable fees", "Global tie-ups", "Startup ecosystem"],
  },
  {
    id: 7, name: "Amity University", short: "AU", color: "#7B0D1E",
    nirf: 35, naac: "A+", location: "Noida, UP",
    fees: { btech: 3.13, mtech: 2.0, avg: 2.5 },
    placements: { avg: 6.3, highest: 25, rate: 82 },
    courses: ["CSE", "IT", "ECE", "Mechanical", "Civil", "Bioinformatics"],
    cutoff: "AEEE / JEE Main",
    seats: 4000, established: 2005,
    topRecruiters: ["TCS", "Wipro", "IBM", "EY"],
    highlights: ["300+ courses", "International campus", "Corporate tie-ups", "Alumni network"],
  },
  {
    id: 8, name: "KIIT University", short: "KIIT", color: "#0047AB",
    nirf: 17, naac: "A+", location: "Bhubaneswar, Odisha",
    fees: { btech: 3.5, mtech: 2.0, avg: 2.75 },
    placements: { avg: 7, highest: 42, rate: 85 },
    courses: ["CSE", "IT", "ECE", "Mechanical", "Civil", "Electrical"],
    cutoff: "KIITEE Rank < 20,000",
    seats: 4500, established: 1992,
    topRecruiters: ["TCS", "HCL", "Tech Mahindra", "Wipro"],
    highlights: ["Large campus", "Alumni network", "Eastern India hub", "Balanced curriculum"],
  },
  {
    id: 9, name: "Shiv Nadar Univ", short: "SNU", color: "#003153",
    nirf: 38, naac: "A+", location: "Greater Noida, UP",
    fees: { btech: 3.5, mtech: 2.0, avg: 2.75 },
    placements: { avg: 12, highest: 65, rate: 93 },
    courses: ["CSE", "ECE", "Mechanical", "Civil", "Chemical"],
    cutoff: "SNUSAT / JEE Main / SAT",
    seats: 500, established: 2011,
    topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Deloitte"],
    highlights: ["Interdisciplinary", "Research-first", "Liberal arts + tech", "Small batches"],
  },
  {
    id: 10, name: "Amrita University", short: "AVV", color: "#FF6600",
    nirf: 23, naac: "A++", location: "Coimbatore, TN",
    fees: { btech: 2.0, mtech: 1.5, avg: 1.75 },
    placements: { avg: 7.2, highest: 56, rate: 89 },
    courses: ["CSE", "ECE", "Mechanical", "Chemical", "Civil", "AI & Robotics"],
    cutoff: "AEEE Score > 60%",
    seats: 2500, established: 1994,
    topRecruiters: ["Intel", "Accenture", "Microsoft", "Amazon"],
    highlights: ["Research-oriented", "Global internships", "NAAC A++", "Value-based education"],
  },
];

const params = [
  { key: "nirf", label: "🏆 NIRF Rank", format: (v) => `#${v}`, better: "lower", unit: "" },
  { key: "naac", label: "⭐ NAAC Grade", format: (v) => v, better: "higher", unit: "" },
  { key: "fees.btech", label: "💰 BTech Fees/yr", format: (v) => `₹${v}L`, better: "lower", unit: "L" },
  { key: "fees.mtech", label: "💰 MTech Fees/yr", format: (v) => `₹${v}L`, better: "lower", unit: "L" },
  { key: "placements.avg", label: "📈 Avg Package", format: (v) => `₹${v} LPA`, better: "higher", unit: "" },
  { key: "placements.highest", label: "🚀 Highest Pkg", format: (v) => `₹${v} LPA`, better: "higher", unit: "" },
  { key: "placements.rate", label: "✅ Placement Rate", format: (v) => `${v}%`, better: "higher", unit: "" },
  { key: "seats", label: "🎓 Total Seats", format: (v) => v.toLocaleString(), better: "none", unit: "" },
  { key: "established", label: "📅 Established", format: (v) => v, better: "lower", unit: "" },
  { key: "cutoff", label: "📝 Cutoff", format: (v) => v, better: "none", unit: "" },
];

function getVal(college, key) {
  if (key.includes(".")) {
    const [a, b] = key.split(".");
    return college[a][b];
  }
  return college[key];
}

function getWinner(c1, c2, param) {
  if (param.better === "none") return null;
  const v1 = getVal(c1, param.key);
  const v2 = getVal(c2, param.key);
  if (typeof v1 === "string") return null;
  if (param.better === "lower") return v1 < v2 ? "left" : v1 > v2 ? "right" : "tie";
  if (param.better === "higher") return v1 > v2 ? "left" : v1 < v2 ? "right" : "tie";
  return null;
}

export default function ComparisonPage() {
  const [left, setLeft] = useState(colleges[0]);
  const [right, setRight] = useState(colleges[1]);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // count wins
  const wins = { left: 0, right: 0 };
  params.forEach((p) => {
    const w = getWinner(left, right, p);
    if (w === "left") wins.left++;
    if (w === "right") wins.right++;
  });
  const verdict = wins.left > wins.right ? left.name : wins.right > wins.left ? right.name : "Tie!";

  return (
    <div className="min-h-screen bg-gray-50 pb-8 sm:pb-12">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-6 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
            <a href="/" className="hover:text-brand-500 transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Compare Colleges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">College Comparison</h1>
          <p className="text-sm sm:text-base text-gray-500">Pick 2 colleges and see who wins!</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Left Selector */}
          <div className="flex-1 relative">
            <div 
              className="card p-3 sm:p-4 flex items-center gap-2 sm:gap-3 cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => setLeftOpen(!leftOpen)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">{left.short}</span>
              </div>
              <span className="font-semibold text-gray-900 flex-1 truncate text-sm sm:text-base">{left.name}</span>
              <span className="text-gray-400 text-sm sm:text-base flex-shrink-0">{leftOpen ? "▲" : "▼"}</span>
            </div>
            {leftOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 sm:max-h-64 overflow-y-auto">
                {colleges.filter((c) => c.id !== right.id).map((c) => (
                  <div 
                    key={c.id} 
                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors ${left.id === c.id ? "bg-gray-50" : ""}`}
                    onClick={() => { setLeft(c); setLeftOpen(false); }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{c.short}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-lg sm:text-xl font-bold text-brand-500 my-2 sm:my-0">VS</div>

          {/* Right Selector */}
          <div className="flex-1 relative">
            <div 
              className="card p-3 sm:p-4 flex items-center gap-2 sm:gap-3 cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => setRightOpen(!rightOpen)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">{right.short}</span>
              </div>
              <span className="font-semibold text-gray-900 flex-1 truncate text-sm sm:text-base">{right.name}</span>
              <span className="text-gray-400 text-sm sm:text-base flex-shrink-0">{rightOpen ? "▲" : "▼"}</span>
            </div>
            {rightOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 sm:max-h-64 overflow-y-auto">
                {colleges.filter((c) => c.id !== left.id).map((c) => (
                  <div 
                    key={c.id} 
                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors ${right.id === c.id ? "bg-gray-50" : ""}`}
                    onClick={() => { setRight(c); setRightOpen(false); }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{c.short}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verdict Banner */}
      <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-6">
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm text-brand-700 font-medium whitespace-nowrap">🏆 Winner:</span>
          <span className="text-base sm:text-lg font-bold text-brand-600 truncate">{verdict}</span>
          <span className="text-xs text-brand-500 sm:ml-auto">
            {left.name}: {wins.left} pts | {right.name}: {wins.right} pts
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-6">
        <div className="card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b border-gray-200">
            <div className="p-3 sm:p-4 bg-gray-50" />
            <div className="p-3 sm:p-4 text-center bg-gray-50 border-l border-gray-200">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{left.short}</span>
              </div>
              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{left.name}</div>
              <div className="text-xs text-gray-500 mt-1">📍 {left.location}</div>
            </div>
            <div className="p-3 sm:p-4 text-center bg-gray-50 border-l border-gray-200">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{right.short}</span>
              </div>
              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{right.name}</div>
              <div className="text-xs text-gray-500 mt-1">📍 {right.location}</div>
            </div>
          </div>

          {/* Rows */}
          {params.map((param, i) => {
            const winner = getWinner(left, right, param);
            return (
              <div key={param.key} className={`grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-700 flex items-center">{param.label}</div>
                <div className={`p-3 sm:p-4 text-xs sm:text-sm flex items-center border-l border-gray-100 ${winner === "left" ? "bg-green-50 text-brand-700 font-semibold" : "text-gray-600"}`}>
                  {winner === "left" && <span className="text-brand-500 mr-2 text-xs sm:text-sm">✓</span>}
                  <span className="text-xs sm:text-sm">{param.format(getVal(left, param.key))}</span>
                </div>
                <div className={`p-3 sm:p-4 text-xs sm:text-sm flex items-center border-l border-gray-100 ${winner === "right" ? "bg-green-50 text-brand-700 font-semibold" : "text-gray-600"}`}>
                  {winner === "right" && <span className="text-brand-500 mr-2 text-xs sm:text-sm">✓</span>}
                  <span className="text-xs sm:text-sm">{param.format(getVal(right, param.key))}</span>
                </div>
              </div>
            );
          })}

          {/* Courses Row */}
          <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b border-gray-100 bg-white">
            <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-700 flex items-center">📚 Courses</div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {left.courses.map((c) => <span key={c} className="pill text-xs sm:text-sm">{c}</span>)}
              </div>
            </div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {right.courses.map((c) => <span key={c} className="pill text-xs sm:text-sm">{c}</span>)}
              </div>
            </div>
          </div>

          {/* Top Recruiters Row */}
          <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] border-b border-gray-100 bg-gray-50">
            <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-700 flex items-center">🏢 Top Recruiters</div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {left.topRecruiters.map((r) => <span key={r} className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">{r}</span>)}
              </div>
            </div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {right.topRecruiters.map((r) => <span key={r} className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-2 sm:px-3 py-1 rounded-full">{r}</span>)}
              </div>
            </div>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] bg-white">
            <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-700 flex items-center">⭐ Highlights</div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              {left.highlights.map((h) => <div key={h} className="text-xs sm:text-sm text-gray-600 py-1">▸ {h}</div>)}
            </div>
            <div className="p-3 sm:p-4 border-l border-gray-100">
              {right.highlights.map((h) => <div key={h} className="text-xs sm:text-sm text-gray-600 py-1">▸ {h}</div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Apply CTAs */}
      <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a 
            href={`https://${left.name.toLowerCase().replace(/\s/g, "")}.ac.in/admissions`}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-center text-xs sm:text-sm py-2 sm:py-3 hover:shadow-lg transition-shadow"
          >
            Apply to {left.short} →
          </a>
          <a 
            href={`https://${right.name.toLowerCase().replace(/\s/g, "")}.ac.in/admissions`}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-center text-xs sm:text-sm py-2 sm:py-3 hover:shadow-lg transition-shadow"
          >
            Apply to {right.short} →
          </a>
        </div>
      </div>
    </div>
  );
}