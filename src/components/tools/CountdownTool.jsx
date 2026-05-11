export default function CountdownTool() {
  const exams = [
    { name: "JEE Main 2026", date: "2026-01-22", color: "blue", icon: "⚙️" },
    { name: "NEET 2026", date: "2026-05-03", color: "red", icon: "🏥" },
    { name: "CUET 2026", date: "2026-05-15", color: "green", icon: "🎓" },
    { name: "CLAT 2026", date: "2025-12-01", color: "purple", icon: "⚖️" },
    { name: "BITSAT 2026", date: "2026-05-20", color: "orange", icon: "🔬" },
    { name: "VITEEE 2026", date: "2026-04-10", color: "teal", icon: "🌱" },
  ];

  const getDays = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const colorMap = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    red: "bg-red-50 border-red-100 text-red-700",
    green: "bg-green-50 border-green-100 text-green-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    orange: "bg-orange-50 border-orange-100 text-orange-700",
    teal: "bg-teal-50 border-teal-100 text-teal-700",
  };

  return (
    <div className="space-y-3">
      {exams.map((exam) => {
        const days = getDays(exam.date);
        return (
          <div key={exam.name} className={`flex items-center justify-between p-3.5 rounded-xl border ${colorMap[exam.color]}`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{exam.icon}</span>
              <div>
                <div className="font-semibold text-sm text-gray-800">{exam.name}</div>
                <div className="text-xs text-gray-400">{new Date(exam.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{days}</div>
              <div className="text-xs text-gray-400">days left</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
