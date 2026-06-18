"use client";

import { useState, useCallback } from "react";
import { useMedicines } from "@/hooks/useMedicines";
import { MedicineCard } from "@/components/catalog/MedicineCard";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { SearchBar } from "@/components/catalog/SearchBar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function KatalogPage() {
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useMedicines({ q, category, page, limit: 12 });

  const handleSearch = useCallback((val: string) => {
    setQ(val);
    setPage(1);
  }, []);

  const handleCategory = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h1>
        <p className="text-gray-500">Jelajahi {data?.total ?? "..."} produk kesehatan terverifikasi</p>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter selected={category} onChange={handleCategory} />
      </div>

      {/* Results */}
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⚠️</p>
          <p>Gagal memuat data. Pastikan backend berjalan.</p>
        </div>
      ) : !data?.items.length ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p>Produk tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.items.map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>

          {/* Pagination */}
          {data.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={!data.has_prev}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 disabled:opacity-40 hover:border-emerald-300 transition-colors"
              >
                ← Sebelumnya
              </button>
              <span className="text-sm text-gray-500">
                Halaman {data.page} dari {data.pages}
              </span>
              <button
                disabled={!data.has_next}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 disabled:opacity-40 hover:border-emerald-300 transition-colors"
              >
                Berikutnya →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
