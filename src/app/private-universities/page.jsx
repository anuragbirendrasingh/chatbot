"use client";
import { useState } from "react";
import { privateUniversities, allCourseTypes } from "@/components/universities/privateUniversitiesData";
import PrivateUniversityFilter from "@/components/universities/PrivateUniversityFilter";
import PrivateUniversityCard from "@/components/universities/PrivateUniversityCard";
import PrivateUniversityModal from "@/components/universities/PrivateUniversityModal";

export default function PrivateUniversitiesPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = privateUniversities.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === "All") return true;
    if (filter === "BTech") return u.courses.btech.length > 0;
    if (filter === "MTech") return u.courses.mtech.length > 0;
    if (filter === "BA") return u.courses.ba.length > 0;
    if (filter === "MA") return u.courses.ma.length > 0;
    if (filter === "PG") return u.courses.pg.length > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-brand-500">Home</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Private Universities</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Private Universities</h1>
          <p className="text-gray-500">Explore India's best private universities — courses, fees, admission & more</p>
        </div>
      </div>

      <PrivateUniversityFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((uni) => (
            <PrivateUniversityCard key={uni.id} uni={uni} setSelected={setSelected} />
          ))}
        </div>
      </div>

      <PrivateUniversityModal selected={selected} setSelected={setSelected} />
    </div>
  );
}
