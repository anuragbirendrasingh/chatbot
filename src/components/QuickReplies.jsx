"use client";

export default function QuickReplies({ options, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-1 py-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="text-xs bg-white border border-blue-200 text-blue-600 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
        >
          {option}
        </button>
      ))}
    </div>
  );
}