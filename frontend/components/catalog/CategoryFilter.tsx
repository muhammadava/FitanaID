"use client";

import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "", label: "Semua", icon: "💡" },
  { value: "herbal", label: "Herbal", icon: "🌿" },
  { value: "kimia", label: "Kimia", icon: "💊" },
  { value: "vitamin", label: "Vitamin", icon: "🫐" },
  { value: "suplemen", label: "Suplemen", icon: "⚡" },
];

interface Props {
  selected: string;
  onChange: (val: string) => void;
}

export function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
            selected === cat.value
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
          )}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
