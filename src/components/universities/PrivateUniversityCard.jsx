export default function PrivateUniversityCard({ uni, setSelected }) {
  return (
    <div
      className="card p-0 overflow-hidden cursor-pointer hover:-translate-y-0.5"
      onClick={() => setSelected(uni)}
    >
      {/* Color top bar */}
      <div className="h-1.5 bg-brand-500 w-full" />

      {/* Card header */}
      <div className="flex items-start gap-4 p-5 pb-3">
        <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
          <span className="text-brand-700 font-bold text-sm">{uni.logo}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 truncate">{uni.name}</h3>
            <span className="badge bg-green-50 text-green-700">NIRF #{uni.nirf}</span>
          </div>
          <p className="text-xs text-gray-500">{uni.fullName}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            {uni.location}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-50 mx-5" />

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 px-2 py-3">
        <div className="text-center px-3">
          <div className="text-sm font-semibold text-gray-900">{uni.fees.btech.split(' ')[0] + 'L'}</div>
          <div className="text-xs text-gray-400 mt-0.5">BTech/yr</div>
        </div>
        <div className="text-center px-3">
          <div className="text-sm font-semibold text-gray-900">{uni.avgPackage}</div>
          <div className="text-xs text-gray-400 mt-0.5">Avg Package</div>
        </div>
        <div className="text-center px-3">
          <div className="text-sm font-semibold text-gray-900">{uni.naac}</div>
          <div className="text-xs text-gray-400 mt-0.5">NAAC</div>
        </div>
      </div>

      {/* Courses */}
      <div className="px-5 pb-3 flex gap-1.5 flex-wrap">
        {uni.courses.btech.slice(0, 4).map((c) => (
          <span key={c} className="pill">{c}</span>
        ))}
        {uni.courses.btech.length > 4 && (
          <span className="pill">+{uni.courses.btech.length - 4} more</span>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">📝 {uni.entranceExam}</span>
        <button className="text-brand-600 text-sm font-semibold hover:text-brand-700">
          View Details →
        </button>
      </div>
    </div>
  );
}
