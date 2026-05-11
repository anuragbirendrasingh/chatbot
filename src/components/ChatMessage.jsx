"use client";

import { formatDistanceToNow } from "date-fns";

export default function ChatMessage({ message }) {
  const isBot = message.role === "bot";

  return (
    <div className={`flex items-end gap-2 ${isBot ? "justify-start" : "justify-end"}`}>
      {/* Bot avatar */}
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0">
          🎓
        </div>
      )}

      <div className={`max-w-[78%] ${isBot ? "" : "items-end flex flex-col"}`}>
        <div
          className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? "bg-white text-gray-800 shadow-sm rounded-bl-sm"
              : "bg-blue-600 text-white rounded-br-sm"
          }`}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <p className="text-[10px] text-gray-400 mt-1 px-1">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </p>

        {/* Escalation notice */}
        {message.escalated && (
          <p className="text-[11px] text-orange-500 px-1 font-medium">
            🔔 Connecting you to a counsellor...
          </p>
        )}
      </div>

      {/* User avatar */}
      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-sm flex-shrink-0">
          👤
        </div>
      )}
    </div>
  );
}