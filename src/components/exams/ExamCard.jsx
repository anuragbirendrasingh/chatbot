export default function ExamCard({ exam, setSelected }) {
  return (
    <div
      className="card p-0 overflow-hidden cursor-pointer hover:-translate-y-0.5 active:scale-95 transition-all"
      onClick={() => setSelected(exam)}
    >
      {/* Color top bar */}
      <div className="h-1.5 bg-brand-500 w-full" />

      {/* Card header */}
      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 pb-2 sm:pb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
          <span className="text-brand-700 font-bold text-xs sm:text-sm">{exam.badge}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap">
            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{exam.name}</h3>
            <span className="badge bg-blue-50 text-blue-700 text-xs whitespace-nowrap">{exam.level}</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-1">{exam.fullName}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            🏛 <span className="truncate">{exam.conductedBy}</span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-50 mx-4 sm:mx-5" />

      {/* Stats row */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 px-2 sm:px-2 py-2 sm:py-3">
        <div className="text-center px-2 sm:px-3">
          <div className="text-sm font-semibold text-gray-900 text-xs sm:text-sm">{exam.category}</div>
          <div className="text-xs text-gray-400 mt-0.5">Category</div>
        </div>
        <div className="text-center px-2 sm:px-3">
          <div className="text-sm font-semibold text-gray-900 text-xs sm:text-sm">{exam.difficulty}</div>
          <div className="text-xs text-gray-400 mt-0.5">Difficulty</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500 truncate">📅 {exam.examDate}</span>
        <button className="text-brand-600 text-xs sm:text-sm font-semibold hover:text-brand-700 transition-colors">
          Explore →
        </button>
      </div>
    </div>
  );
}
