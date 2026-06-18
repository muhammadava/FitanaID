import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <span>🌿</span>
              <span>FitanaID</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Platform informasi obat herbal, kimia, vitamin & suplemen terpercaya. Temukan produk kesehatan yang tepat untuk Anda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link></li>
              <li><Link href="/katalog" className="hover:text-emerald-400 transition-colors">Katalog</Link></li>
              <li><Link href="/konsultasi" className="hover:text-emerald-400 transition-colors">Konsultasi</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Tentang</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tentang/visi-misi" className="hover:text-emerald-400 transition-colors">Visi & Misi</Link></li>
              <li><Link href="/tentang/tim" className="hover:text-emerald-400 transition-colors">Tim Kami</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FitanaID. Hak cipta dilindungi.</p>
          <p>Informasi di platform ini bersifat edukatif. Selalu konsultasikan dengan tenaga kesehatan.</p>
        </div>
      </div>
    </footer>
  );
}
