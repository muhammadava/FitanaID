import { auth } from "@/auth";
import { signIn } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>🌿</span>
            Platform Informasi Kesehatan Terpercaya Indonesia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Temukan Obat & Suplemen<br />
            <span className="text-emerald-600">yang Tepat untuk Anda</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Informasi lengkap obat herbal, kimia, vitamin & suplemen. Konsultasi cerdas tanpa perlu keahlian teknis — cukup pilih kondisi Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/konsultasi"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100"
            >
              Mulai Konsultasi →
            </Link>
            <Link
              href="/katalog"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              Jelajahi Katalog
            </Link>
          </div>

          {!session && (
            <p className="mt-6 text-sm text-gray-400">
              Sudah punya akun?{" "}
              <form action={async () => { "use server"; await signIn("google"); }} className="inline">
                <button type="submit" className="text-emerald-600 font-medium hover:underline">
                  Masuk dengan Google
                </button>
              </form>
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Semua yang Anda Butuhkan</h2>
            <p className="text-gray-500">Satu platform untuk semua kebutuhan informasi kesehatan Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌿", title: "Obat Herbal", desc: "Informasi lengkap tanaman obat & produk herbal terverifikasi", href: "/katalog?category=herbal" },
              { icon: "💊", title: "Obat Kimia", desc: "Data farmasi akurat: dosis, efek samping, kontraindikasi", href: "/katalog?category=kimia" },
              { icon: "🫐", title: "Vitamin", desc: "Panduan vitamin & mineral untuk kebutuhan spesifik Anda", href: "/katalog?category=vitamin" },
              { icon: "⚡", title: "Suplemen", desc: "Pilihan suplemen untuk kebugaran, kecantikan & performa", href: "/katalog?category=suplemen" },
            ].map((f) => (
              <Link key={f.title} href={f.href} className="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Tidak Tahu Harus Pilih Apa?</h2>
          <p className="text-emerald-100 mb-8">
            Sistem konsultasi kami membantu Anda menemukan produk yang paling tepat — cukup jawab 5 pertanyaan singkat.
          </p>
          <Link
            href="/konsultasi"
            className="inline-block px-8 py-3.5 rounded-xl bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
          >
            Mulai Konsultasi Gratis →
          </Link>
        </div>
      </section>
    </main>
  );
}
