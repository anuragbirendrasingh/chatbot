export default function ToolsPageHeader() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <a href="/" className="hover:text-green-500">Home</a>
          <span>/</span>
          <span className="text-gray-700 font-medium">Tools</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🛠️ Student Tools</h1>
        <p className="text-gray-500">Free tools to help you predict, plan & prepare for college admissions</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6">
          {[
            { n: "12+", l: "Free Tools" },
            { n: "100%", l: "Free Forever" },
            { n: "4", l: "Categories" },
            { n: "AI", l: "Powered" },
          ].map((st) => (
            <div key={st.l} className="text-center">
              <div className="text-xl font-bold text-green-600">{st.n}</div>
              <div className="text-xs text-gray-400">{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
