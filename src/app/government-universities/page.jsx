"use client";
import { useState } from "react";
import { governmentUniversities, types, courseFilters } from "@/components/universities/governmentUniversitiesData";
import GovernmentUniversityFilter from "@/components/universities/GovernmentUniversityFilter";
import GovernmentUniversityCard from "@/components/universities/GovernmentUniversityCard";
import GovernmentUniversityModal from "@/components/universities/GovernmentUniversityModal";

export default function GovernmentUniversitiesPage() {
  const [selected, setSelected] = useState(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = governmentUniversities.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase()) ||
      u.knownFor.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || u.type === typeFilter;
    const matchCourse =
      courseFilter === "All" ||
      (courseFilter === "BTech" && u.courses.btech) ||
      (courseFilter === "BA/BSc/BCom" && (u.courses.ba || u.courses.bsc || u.courses.bcom)) ||
      (courseFilter === "MBBS" && u.courses.mbbs) ||
      (courseFilter === "MA/MSc" && (u.courses.ma || u.courses.msc)) ||
      (courseFilter === "PhD" && u.courses.phd);
    return matchSearch && matchType && matchCourse;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-brand-500">Home</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Government Universities</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Government Universities</h1>
          <p className="text-gray-500">BHU · DU · JNU · JMI · AMU · HCU & more</p>
          <div className="mt-4">
            <span className="inline-block bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 text-xs font-medium text-brand-700">
              💡 Low fees · High prestige · CUET is the gateway for most admissions
            </span>
          </div>
        </div>
      </div>

      {/* Why Govt Uni strip */}
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          {[
            { icon: "💰", text: "Fees as low as ₹400/yr" },
            { icon: "🏆", text: "Top NIRF rankings" },
            { icon: "🎓", text: "CUET is main entrance" },
            { icon: "🔬", text: "Best research culture" },
          ].map((w) => (
            <div key={w.text} className="flex items-center gap-2">
              <span className="text-xl">{w.icon}</span>
              <span className="text-sm text-gray-600">{w.text}</span>
            </div>
          ))}
        </div>
      </div>

      <GovernmentUniversityFilter 
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((uni) => (
            <GovernmentUniversityCard key={uni.id} uni={uni} setSelected={setSelected} />
          ))}
        </div>
      </div>

      <GovernmentUniversityModal selected={selected} setSelected={setSelected} />
    </div>
  );
}
