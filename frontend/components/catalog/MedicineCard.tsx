import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { categoryColor, categoryLabel, categoryIcon, formatPrice } from "@/lib/utils";
import type { Medicine } from "@/types";

interface Props {
  medicine: Medicine;
}

export function MedicineCard({ medicine }: Props) {
  return (
    <Link href={`/katalog/${medicine.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-emerald-200 hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-3xl">{categoryIcon(medicine.category)}</span>
          <div className="flex flex-wrap gap-1 justify-end">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor(medicine.category)}`}>
              {categoryLabel(medicine.category)}
            </span>
            {medicine.is_pro && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">
                PRO
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1">
          {medicine.name}
        </h3>
        {medicine.brand_name && (
          <p className="text-xs text-gray-400 mb-2">{medicine.brand_name}</p>
        )}

        {/* Sub-category */}
        {medicine.sub_category && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">{medicine.sub_category}</p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{medicine.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs font-medium text-emerald-600">
            {formatPrice(medicine.price_min, medicine.price_max)}
          </span>
          {medicine.drug_class && (
            <span className="text-xs text-gray-400">{medicine.drug_class}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
