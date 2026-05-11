import ToolComponent from "./ToolRenderer";

export default function ToolModal({ activeTool, setActiveTool }) {
  if (!activeTool) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
          <div className={`w-12 h-12 ${activeTool.iconBg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
            {activeTool.icon}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{activeTool.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{activeTool.description}</p>
          </div>
          <button onClick={() => setActiveTool(null)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0">
            ✕
          </button>
        </div>

        {/* Tool Content */}
        <div className="p-6">
          <ToolComponent toolId={activeTool.tool} />
        </div>

      </div>
    </div>
  );
}
