import Link from "next/link";
import { categoryColor, categoryLabel, categoryIcon } from "@/lib/utils";
import type { RecommendationItem } from "@/types";

interface Props {
  item: RecommendationItem;
  rank: number;
}

export function ResultCard({ item, rank }: Props) {
  const { medicine, match_percent, matched_tags } = item;

  const uses = medicine.uses ?? [];
  const tags = matched_tags ?? [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      {/* Rank badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rank === 1 ? "bg-amber-400 text-white" : rank === 2 ? "bg-gray-300 text-gray-700" : "bg-orange-300 text-white"}`}>
          {rank}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-semibold text-emerald-600">{match_percent}% cocok</div>
            <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${match_percent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Medicine info */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{categoryIcon(medicine.category)}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
          {medicine.brand_name && <p className="text-xs text-gray-400">{medicine.brand_name}</p>}
        </div>
      </div>

      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${categoryColor(medicine.category)}`}>
        {categoryLabel(medicine.category)}
      </span>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{medicine.description}</p>

      {/* Key uses */}
      {uses.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-1.5">Indikasi utama:</p>
          <ul className="space-y-1">
            {uses.slice(0, 3).map((use, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5">✓</span>
                {use}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dosage */}
      {medicine.dosage && (
        <div className="bg-emerald-50 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-emerald-700 mb-0.5">Dosis anjuran:</p>
          <p className="text-xs text-emerald-600">{medicine.dosage}</p>
        </div>
      )}

      {/* Matched tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
              {tag.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/katalog/${medicine.slug}`}
        className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
      >
        Lihat Detail Lengkap →
      </Link>
    </div>
  );
}
