"use client";
import { useState } from "react";

export default function CareerFinderTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { q: "Which subject do you enjoy most?", opts: ["Mathematics & Physics", "Biology & Chemistry", "History & Literature", "Economics & Business", "Computers & Technology"] },
    { q: "What kind of work excites you?", opts: ["Building & Creating things", "Helping & Treating people", "Researching & Discovering", "Managing & Leading", "Designing & Expressing"] },
    { q: "What's your JEE/Board expected score?", opts: ["Very High (95%+)", "Good (80–95%)", "Average (60–80%)", "Below 60%"] },
    { q: "Preferred college type?", opts: ["IIT / NIT (Govt)", "Top Private (VIT/BITS)", "Any good college", "Central University (DU/JNU)"] },
    { q: "Your goal in life?", opts: ["High salary package", "Make a social impact", "Become an entrepreneur", "Pursue research/academia", "Govt job / stability"] },
  ];

  const careers = {
    "Mathematics & Physics-Building & Creating things": { career: "Engineering (CSE / ECE / Mechanical)", colleges: ["IIT Bombay", "NIT Trichy", "BITS Pilani", "VIT Vellore"], exam: "JEE Main + Advanced" },
    "Biology & Chemistry-Helping & Treating people": { career: "Medicine (MBBS / BDS / BAMS)", colleges: ["AIIMS Delhi", "JIPMER", "BHU IMS", "CMC Vellore"], exam: "NEET UG" },
    "Economics & Business-Managing & Leading": { career: "BBA / IPM MBA / Economics (Hons)", colleges: ["SRCC Delhi", "IIM Indore (IPM)", "Shri Ram College", "Christ University"], exam: "CUET / IPMAT" },
    "Computers & Technology-Building & Creating things": { career: "B.Tech CSE / BCA / Data Science", colleges: ["IIT Delhi", "BITS Pilani", "VIT Vellore", "Manipal"], exam: "JEE Main" },
    "History & Literature-Researching & Discovering": { career: "BA Honours / Research / Civil Services", colleges: ["JNU Delhi", "Delhi University", "BHU", "Jadavpur"], exam: "CUET UG" },
  };

  const getResult = (ans) => {
    const key = `${ans[0]}-${ans[1]}`;
    return careers[key] || {
      career: "Ask our AI Counsellor for personalised advice!",
      colleges: ["Based on your profile, please chat with our AI"],
      exam: "Multiple options available",
    };
  };

  const answer = (opt) => {
    const newAns = { ...answers, [step]: opt };
    setAnswers(newAns);
    if (step < questions.length - 1) { setStep(step + 1); }
    else { setResult(getResult(Object.values(newAns))); }
  };

  if (result) return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-2xl p-5">
        <div className="text-center mb-4">
          <span className="text-3xl">🎯</span>
          <h4 className="font-bold text-gray-900 mt-2">Your Best Career Path</h4>
        </div>
        <div className="bg-white rounded-xl p-3 mb-3 text-center">
          <p className="font-semibold text-green-700">{result.career}</p>
        </div>
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Recommended Colleges</p>
          <div className="flex flex-wrap gap-2">
            {result.colleges.map((c) => (
              <span key={c} className="bg-white border border-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500">Entrance Exam</p>
          <p className="font-semibold text-blue-600">{result.exam}</p>
        </div>
      </div>
      <button onClick={() => { setStep(0); setAnswers({}); setResult(null); }} className="btn-secondary w-full text-sm">
        ↩ Retake Quiz
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step) / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs text-gray-400">{step + 1}/{questions.length}</span>
      </div>

      <h4 className="font-semibold text-gray-800">{questions[step].q}</h4>

      <div className="space-y-2">
        {questions[step].opts.map((opt) => (
          <button key={opt} onClick={() => answer(opt)}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-all">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
