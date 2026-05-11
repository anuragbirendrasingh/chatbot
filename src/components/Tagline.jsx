export default function Tagline() {
  return (
    <div className="flex items-center justify-center gap-8 py-6 px-10 bg-[#0f172a] rounded-2xl border border-[#334155]">

      <div className="text-center">
        <p className="text-[#38bdf8] text-3xl font-bold font-mono tracking-widest">LEARN</p>
        <p className="text-[#64748b] text-xs font-mono tracking-widest mt-1">knowledge first</p>
      </div>

      <span className="text-[#8b5cf6] text-2xl">·</span>

      <div className="text-center">
        <p className="text-[#6366f1] text-3xl font-bold font-mono tracking-widest">GROW</p>
        <p className="text-[#64748b] text-xs font-mono tracking-widest mt-1">skills every day</p>
      </div>

      <span className="text-[#8b5cf6] text-2xl">·</span>

      <div className="text-center">
        <p className="text-[#a855f7] text-3xl font-bold font-mono tracking-widest">ACHIEVE</p>
        <p className="text-[#64748b] text-xs font-mono tracking-widest mt-1">your true potential</p>
      </div>

    </div>
  )
}