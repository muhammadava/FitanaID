"use client";

import { use } from "react";
import Link from "next/link";
import { useMedicine } from "@/hooks/useMedicine";
import { useSession } from "next-auth/react";
import { useSaveMedicine } from "@/hooks/useUser";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { categoryColor, categoryLabel, categoryIcon, formatPrice } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }> }

export default function MedicineDetailPage({ params }: Props) {
  const { slug } = use(params);
  const { data: medicine, isLoading, isError } = useMedicine(slug);
  const { data: session } = useSession();
  const saveMutation = useSaveMedicine();

  if (isLoading) return <LoadingSpinner className="min-h-screen" />;
  if (isError || !medicine) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <div className="text-center">
        <p className="text-5xl mb-4">😔</p>
        <p>Produk tidak ditemukan.</p>
        <Link href="/katalog" className="mt-4 inline-block text-emerald-600 font-medium hover:underline">← Kembali ke Katalog</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
        <span>/</span>
        <Link href="/katalog" className="hover:text-emerald-600">Katalog</Link>
        <span>/</span>
        <Link href={`/katalog?category=${medicine.category}`} className="hover:text-emerald-600">{categoryLabel(medicine.category)}</Link>
        <span>/</span>
        <span className="text-gray-700">{medicine.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <span className="text-5xl">{categoryIcon(medicine.category)}</span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor(medicine.category)}`}>
                {categoryLabel(medicine.category)}
              </span>
              {medicine.drug_class && (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600">
                  {medicine.drug_class}
                </span>
              )}
              {medicine.is_pro && (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">PRO</span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{medicine.name}</h1>
            {medicine.brand_name && <p className="text-sm text-gray-500 mt-0.5">{medicine.brand_name}</p>}
            {medicine.generic_name && <p className="text-xs text-gray-400 mt-0.5">Generik: {medicine.generic_name}</p>}
          </div>

          {session?.user && (
            <button
              onClick={() => saveMutation.mutate({ medicine_id: medicine.id, user_id: (session.user as any).googleId ?? "" })}
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition-colors"
            >
              🔖 Simpan
            </button>
          )}
        </div>

        {/* Price */}
        <div className="bg-emerald-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-emerald-600 font-medium">Kisaran Harga</p>
          <p className="text-xl font-bold text-emerald-700">{formatPrice(medicine.price_min, medicine.price_max)}</p>
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Deskripsi</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{medicine.description}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Uses */}
          {medicine.uses.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">Indikasi</h2>
              <ul className="space-y-1.5">
                {medicine.uses.map((u, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{u}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Side effects */}
          {medicine.side_effects.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-900 mb-2">Efek Samping</h2>
              <ul className="space-y-1.5">
                {medicine.side_effects.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>{s}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Dosage */}
        {medicine.dosage && (
          <section className="bg-blue-50 rounded-xl p-4 mb-6">
            <h2 className="text-sm font-semibold text-blue-800 mb-1">Dosis & Aturan Pakai</h2>
            <p className="text-sm text-blue-700">{medicine.dosage}</p>
          </section>
        )}

        {/* Contraindications */}
        {medicine.contraindications.length > 0 && (
          <section className="bg-red-50 rounded-xl p-4 mb-6">
            <h2 className="text-sm font-semibold text-red-800 mb-2">⚠️ Kontraindikasi</h2>
            <ul className="space-y-1">
              {medicine.contraindications.map((c, i) => (
                <li key={i} className="text-sm text-red-700">• {c.replace(/_/g, " ")}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Drug interactions */}
        {medicine.drug_interactions.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">Interaksi Obat</h2>
            <ul className="space-y-1">
              {medicine.drug_interactions.map((d, i) => (
                <li key={i} className="text-sm text-gray-600">• {d}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-400 leading-relaxed">
          ⚕️ Informasi ini bersifat edukatif dan bukan pengganti saran medis profesional. Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi produk kesehatan apapun.
        </div>
      </div>

      <div className="mt-6">
        <Link href="/katalog" className="text-sm text-emerald-600 font-medium hover:underline">← Kembali ke Katalog</Link>
      </div>
    </div>
  );
}
