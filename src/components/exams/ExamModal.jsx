export default function ExamModal({ selected, setSelected }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{selected.badge}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
            <p className="text-sm text-gray-500">{selected.fullName}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge bg-blue-50 text-blue-700">{selected.level}</span>
              <span className="badge bg-orange-50 text-orange-700">{selected.difficulty}</span>
              <span className="badge bg-gray-100 text-gray-600">{selected.stream}</span>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0 transition-colors" onClick={() => setSelected(null)}>
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { l: "Category", v: selected.category },
              { l: "Level", v: selected.level },
              { l: "Difficulty", v: selected.difficulty },
              { l: "Stream", v: selected.stream },
            ].map((st) => (
              <div key={st.l} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-semibold text-gray-900 text-sm">{st.v}</div>
                <div className="text-xs text-gray-400 mt-0.5">{st.l}</div>
              </div>
            ))}
          </div>

          {/* Section: Admits To */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">🏛️ Admits To</h4>
            <div className="flex flex-wrap gap-2">
              {selected.admitsTo.map((a) => <span key={a} className="pill-green">{a}</span>)}
            </div>
          </div>

          {/* Section: Courses */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">📚 Courses Offered</h4>
            <div className="flex flex-wrap gap-2">
              {selected.courses.map((c) => <span key={c} className="pill-green">{c}</span>)}
            </div>
          </div>

          {/* Section: Eligibility */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">✅ Eligibility</h4>
            <ul className="space-y-2">
              {selected.eligibility.map((e, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-brand-500">▸</span> {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Exam Pattern */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">📋 Exam Pattern</h4>
            <ul className="space-y-2">
              {selected.pattern.map((p, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-brand-500">▸</span> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Important Dates */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">📅 Important Dates</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-semibold text-gray-900 text-sm">{selected.importantDates.notification}</div>
                <div className="text-xs text-gray-400 mt-0.5">Notification</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-semibold text-gray-900 text-sm">{selected.importantDates.exam}</div>
                <div className="text-xs text-gray-400 mt-0.5">Exam Date</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-semibold text-gray-900 text-sm">{selected.importantDates.result}</div>
                <div className="text-xs text-gray-400 mt-0.5">Result</div>
              </div>
            </div>
          </div>

          {/* Section: Fee */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">💰 Application Fee</h4>
            <p className="text-sm text-gray-600">{selected.fee}</p>
          </div>

          {/* Section: Tips */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">🎯 Preparation Tips</h4>
            <div className="space-y-2">
              {selected.tips.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-600">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Career Scope */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">🚀 Career Scope</h4>
            <div className="flex flex-wrap gap-2">
              {selected.careerScope.map((c) => <span key={c} className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{c}</span>)}
            </div>
          </div>

          {/* Section: Competition */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">👥 Competition</h4>
            <p className="text-sm text-gray-600">{selected.avgAttempts}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <a href={selected.website} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 text-center text-sm">🌐 Official Site</a>
            <a href={selected.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center text-sm">Apply Now →</a>
          </div>

        </div>
      </div>
    </div>
  );
}
