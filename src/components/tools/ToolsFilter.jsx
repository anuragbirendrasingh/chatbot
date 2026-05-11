import { categories } from "./toolsData";

export default function ToolsFilter({ activeCategory, setActiveCategory }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === c ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
