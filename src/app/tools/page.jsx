"use client";
import { useState } from "react";
import { tools, categories } from "@/components/tools/toolsData";
import ToolsPageHeader from "@/components/tools/ToolsPageHeader";
import ToolsFilter from "@/components/tools/ToolsFilter";
import ToolsGrid from "@/components/tools/ToolsGrid";
import ToolModal from "@/components/tools/ToolModal";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTool, setActiveTool] = useState(null);

  const filtered = tools.filter((t) => activeCategory === "All" || t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolsPageHeader />
      <ToolsFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <ToolsGrid filtered={filtered} setActiveTool={setActiveTool} />
      <ToolModal activeTool={activeTool} setActiveTool={setActiveTool} />
    </div>
  );
}