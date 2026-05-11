export default function ToolsGrid({ filtered, setActiveTool }) {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filtered.map((tool) => (
          <div key={tool.id}
            onClick={() => setActiveTool(tool)}
            className={`bg-white rounded-xl sm:rounded-2xl border-2 ${tool.color} p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95`}>

            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${tool.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0`}>
                {tool.icon}
              </div>
              <span className={`text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${tool.tagColor} whitespace-nowrap`}>
                {tool.tag}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-1.5 leading-tight text-sm sm:text-base">{tool.name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{tool.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap">{tool.category}</span>
              <span className="text-green-600 text-xs sm:text-sm font-semibold">Open →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
