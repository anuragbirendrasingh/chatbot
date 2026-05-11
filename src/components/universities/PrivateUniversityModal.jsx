export default function PrivateUniversityModal({ selected, setSelected }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

        {/* Modal Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{selected.logo}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{selected.fullName}</h2>
            <p className="text-sm text-gray-500">{selected.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge bg-green-50 text-green-700">NIRF #{selected.nirf}</span>
              <span className="badge bg-blue-50 text-blue-700">{selected.naac} NAAC</span>
              <span className="badge bg-gray-100 text-gray-600">Est. {selected.established}</span>
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
              { l: "BTech Fees", v: selected.fees.btech },
              { l: "Avg Package", v: selected.avgPackage },
              { l: "Highest Pkg", v: selected.highestPackage },
              { l: "NAAC Grade", v: selected.naac },
            ].map((st) => (
              <div key={st.l} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="font-semibold text-gray-900 text-sm">{st.v}</div>
                <div className="text-xs text-gray-400 mt-0.5">{st.l}</div>
              </div>
            ))}
          </div>

          {/* Section: Courses */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">📚 Courses</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selected.courses).map(([type, list]) =>
                list.length > 0 ? (
                  <div key={type} className="mb-2">
                    <span className="text-xs text-gray-500 font-medium mr-2">{type.toUpperCase()}</span>
                    <div className="flex flex-wrap gap-2">
                      {list.map((c) => <span key={c} className="pill-green">{c}</span>)}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Section: Admission */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">🎯 How to Apply</h4>
            <div className="space-y-2">
              {selected.admission.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Top Recruiters */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">🏢 Top Recruiters</h4>
            <div className="flex flex-wrap gap-2">
              {selected.topRecruiters.map((r) => (
                <span key={r} className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{r}</span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <a href={selected.website} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 text-center text-sm">🌐 Official Website</a>
            <a href={selected.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center text-sm">Apply Now →</a>
          </div>

        </div>
      </div>
    </div>
  );
}
