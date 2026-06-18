export default function VisiMisiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Visi & Misi</h1>
        <p className="text-gray-500">Tujuan dan komitmen FitanaID untuk kesehatan Indonesia</p>
      </div>

      <div className="space-y-8">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">🎯 Visi</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Menjadi ekosistem kesehatan personal terintegrasi terdepan di Indonesia yang memberdayakan setiap orang — tanpa memandang latar belakang teknologi — untuk membuat keputusan kesehatan yang lebih baik dan terinformasi.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">🚀 Misi</h2>
          <div className="space-y-4">
            {[
              { icon: "📚", title: "Edukasi", desc: "Menyediakan ensiklopedia terstruktur obat herbal, kimia, vitamin, dan suplemen dalam Bahasa Indonesia yang akurat dan mudah dipahami." },
              { icon: "🤖", title: "Konsultasi Cerdas", desc: "Membantu pengguna menemukan produk kesehatan yang sesuai melalui sistem konsultasi dinamis berbasis logika, tanpa perlu keahlian teknis apapun." },
              { icon: "🔗", title: "Ekosistem Terintegrasi", desc: "Membangun platform yang dapat diperluas ke langganan berbayar, perangkat IoT, kiosk, dan REST API publik." },
              { icon: "🌍", title: "Aksesibilitas", desc: "Memastikan informasi kesehatan berkualitas tinggi dapat diakses oleh seluruh lapisan masyarakat Indonesia." },
            ].map((m) => (
              <div key={m.title} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">💎 Nilai-Nilai</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: "✅", title: "Akurasi", desc: "Data terverifikasi" },
              { icon: "🤝", title: "Kepercayaan", desc: "Transparan & jujur" },
              { icon: "🌿", title: "Holistik", desc: "Herbal & konvensional" },
              { icon: "♿", title: "Inklusif", desc: "Untuk semua kalangan" },
              { icon: "🔒", title: "Privasi", desc: "Data aman" },
              { icon: "🚀", title: "Inovatif", desc: "Selalu berkembang" },
            ].map((v) => (
              <div key={v.title} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="font-semibold text-gray-900 text-sm">{v.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
