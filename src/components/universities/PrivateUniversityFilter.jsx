import { allCourseTypes } from "./privateUniversitiesData";

export default function PrivateUniversityFilter({ filter, setFilter, search, setSearch }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              placeholder="Search university..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Course Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible">
            <span className="text-xs text-gray-500 font-medium shrink-0">Course:</span>
            {allCourseTypes.map((f) => (
              <button key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                  ${filter === f
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                  }`}>
                {f}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
