"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useConsultationStore } from "@/stores/consultationStore";
import { ResultCard } from "@/components/consultation/ResultCard";
import { categoryIcon } from "@/lib/utils";

export default function HasilKonsultasiPage() {
  const router = useRouter();
  const { result, category, reset } = useConsultationStore();

  useEffect(() => {
    if (!result) router.replace("/konsultasi");
  }, [result, router]);

  if (!result) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          {categoryIcon(category ?? "")} Konsultasi {category}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rekomendasi untuk Anda</h1>
        <p className="text-gray-500">Berdasarkan jawaban Anda, berikut {result.recommendations.length} produk yang paling sesuai.</p>
      </div>

      {/* Cards */}
      <div className="space-y-4 mb-10">
        {result.recommendations.map((rec, i) => (
          <ResultCard key={rec.medicine.id} item={rec} rank={i + 1} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700 mb-8">
        ⚕️ Rekomendasi ini bersifat informatif berdasarkan sistem scoring otomatis. Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi produk apapun.
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => { reset(); router.push("/konsultasi"); }}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
        >
          Konsultasi Ulang
        </button>
        <Link
          href="/katalog"
          className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors text-center"
        >
          Jelajahi Katalog Lengkap →
        </Link>
      </div>
    </div>
  );
}
