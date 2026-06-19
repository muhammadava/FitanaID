export const metadata = {
  title: "Visi & Misi",
};

export default function VisiMisiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Visi & Misi</h1>
        <p className="text-gray-500">Tujuan dan komitmen FitanaID untuk kesehatan Indonesia</p>
      </div>

      <div className="space-y-8">
        {/* Visi */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            🎯 Visi
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Menjadi web app kesehatan yang mudah digunakan oleh orang awam, serta berinovasi pada teknologi kesehatan masa depan.
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🚀 Misi
          </h2>
          <div className="space-y-4">
            {[
              {
                no: "01",
                icon: "💊",
                title: "Informasi Berbasis Pilihan",
                desc: "Memberikan informasi vitamin dan obat melalui antarmuka berbasis pilihan yang mudah dipahami semua kalangan.",
              },
              {
                no: "02",
                icon: "🛡️",
                title: "Safety-First",
                desc: "Menjaga keselamatan pengguna sebagai prioritas utama dalam setiap fitur dan informasi yang kami sajikan.",
              },
              {
                no: "03",
                icon: "📋",
                title: "Manajemen Kesehatan Personal",
                desc: "Menyediakan fitur manajemen kesehatan personal, mulai dari pengingat konsumsi, rekam riwayat, hingga pemantauan kombinasi obat.",
              },
              {
                no: "04",
                icon: "✅",
                title: "Akurasi & Keandalan",
                desc: "Memastikan seluruh informasi yang tersedia akurat, aman, dan dapat diandalkan oleh pengguna.",
              },
              {
                no: "05",
                icon: "🔗",
                title: "Ekosistem Kesehatan Digital",
                desc: "Mendorong keberlanjutan ekosistem kesehatan digital melalui inovasi alat bantu fisik yang terintegrasi dengan API kami, demi meningkatkan kualitas hidup.",
              },
            ].map((m) => (
              <div key={m.no} className="flex gap-4 p-5 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors">
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs font-bold text-emerald-600">{m.no}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nilai-Nilai */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            💎 Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: "🛡️", title: "Safety-First",  desc: "Keselamatan di atas segalanya" },
              { icon: "✅", title: "Akurasi",        desc: "Data terverifikasi & terpercaya" },
              { icon: "🤝", title: "Mudah Diakses",  desc: "Untuk semua kalangan" },
              { icon: "🌿", title: "Holistik",       desc: "Herbal & konvensional" },
              { icon: "🔒", title: "Privasi",        desc: "Data pengguna aman" },
              { icon: "🚀", title: "Inovatif",       desc: "Teknologi kesehatan masa depan" },
            ].map((v) => (
              <div key={v.title} className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all">
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
