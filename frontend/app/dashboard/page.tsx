"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSavedMedicines, useConsultationHistory, useHealthNote, useSaveHealthNote } from "@/hooks/useUser";
import { MedicineCard } from "@/components/catalog/MedicineCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { categoryIcon } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [noteContent, setNoteContent] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const googleId = (session?.user as any)?.googleId ?? null;

  const { data: savedMeds, isLoading: loadingSaved } = useSavedMedicines(googleId);
  const { data: history, isLoading: loadingHistory } = useConsultationHistory(googleId);
  const { data: note } = useHealthNote(googleId);
  const saveNote = useSaveHealthNote();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  useEffect(() => {
    if (note?.content) setNoteContent(note.content);
  }, [note]);

  const handleSaveNote = async () => {
    if (!googleId) return;
    await saveNote.mutateAsync({ content: noteContent, user_id: googleId });
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  if (status === "loading") return <LoadingSpinner className="min-h-screen" />;
  if (!session) return null;

  const user = session.user;
  const joinDate = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {user?.image && (
            <Image src={user.image} alt="avatar" width={72} height={72} className="rounded-2xl ring-2 ring-emerald-100" />
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Bergabung: {joinDate}</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600">
              Akun Gratis
            </span>
            <button onClick={() => signOut()} className="text-xs text-red-400 hover:text-red-600 px-3 py-1 rounded-full border border-red-100 hover:bg-red-50 transition-colors">
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Konsultasi", value: history?.length ?? 0, icon: "💬" },
          { label: "Produk Disimpan", value: savedMeds?.length ?? 0, icon: "🔖" },
          { label: "Catatan Aktif", value: noteContent ? 1 : 0, icon: "📝" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Consultation History */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          💬 Riwayat Konsultasi
        </h2>
        {loadingHistory ? (
          <LoadingSpinner />
        ) : !history?.length ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">💬</p>
            <p className="text-sm">Belum ada konsultasi.</p>
            <Link href="/konsultasi" className="mt-3 inline-block text-sm text-emerald-600 font-medium hover:underline">
              Mulai konsultasi sekarang →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                <span className="text-2xl">{categoryIcon(h.category)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 capitalize">{h.category}</p>
                  {h.top_medicine_name && <p className="text-xs text-gray-500 truncate">Teratas: {h.top_medicine_name}</p>}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{new Date(h.created_at).toLocaleDateString("id-ID")}</p>
                  <p className="text-xs text-emerald-600">{h.result_count} produk</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Saved Medicines */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🔖 Produk Tersimpan
        </h2>
        {loadingSaved ? (
          <LoadingSpinner />
        ) : !savedMeds?.length ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">🔖</p>
            <p className="text-sm">Belum ada produk tersimpan.</p>
            <Link href="/katalog" className="mt-3 inline-block text-sm text-emerald-600 font-medium hover:underline">
              Jelajahi katalog →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedMeds.map((med) => <MedicineCard key={med.id} medicine={med} />)}
          </div>
        )}
      </section>

      {/* Health Note */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📝 Catatan Kesehatan
        </h2>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Catat kondisi kesehatan, obat yang sedang dikonsumsi, atau jadwal kontrol..."
          rows={4}
          className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{noteContent.length}/2000 karakter</span>
          <button
            onClick={handleSaveNote}
            disabled={saveNote.isPending || !googleId}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 disabled:opacity-40 transition-colors"
          >
            {noteSaved ? "✓ Tersimpan" : saveNote.isPending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </section>

      {/* Pro Teaser */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span>⚡</span>
              <span className="font-bold">FitanaID Pro</span>
            </div>
            <p className="text-sm text-amber-100">Pengingat konsumsi obat, pemantauan interaksi antar obat, konsultasi tak terbatas, & akses konten eksklusif.</p>
          </div>
          <button className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-white text-amber-600 font-semibold text-sm hover:bg-amber-50 transition-colors">
            Segera Hadir
          </button>
        </div>
      </section>
    </div>
  );
}
