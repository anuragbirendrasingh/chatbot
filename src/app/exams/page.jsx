"use client";
import { useState } from "react";
import { exams, categories, difficulties } from "@/components/exams/examsData";
import ExamFilter from "@/components/exams/ExamFilter";
import ExamCard from "@/components/exams/ExamCard";
import ExamModal from "@/components/exams/ExamModal";

export default function ExamsPage() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = exams.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || e.category === category;
    const matchDiff = difficulty === "All" || e.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
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
            <span className="text-gray-700 font-medium">Entrance Exams</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrance Exams After 12th</h1>
          <p className="text-gray-500">Engineering · Medical · Law · Management · Design · Defence</p>
        </div>
      </div>

      <ExamFilter 
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        search={search}
        setSearch={setSearch}
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exam) => (
            <ExamCard key={exam.id} exam={exam} setSelected={setSelected} />
          ))}
        </div>
      </div>

      <ExamModal selected={selected} setSelected={setSelected} />
    </div>
  );
}