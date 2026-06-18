"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",            label: "Beranda" },
  { href: "/katalog",     label: "Katalog" },
  { href: "/konsultasi",  label: "Konsultasi" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600">
          <span>🌿</span>
          <span>FitanaID</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Tentang Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              Tentang Kami
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <Link href="/tentang/visi-misi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                  Visi & Misi
                </Link>
                <Link href="/tentang/tim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                  Tim Kami
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {session.user.image && (
                  <Image src={session.user.image} alt="avatar" width={28} height={28} className="rounded-full" />
                )}
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {session.user.name?.split(" ")[0]}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                    Dashboard
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Masuk
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/tentang/visi-misi" className="block px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
            Tentang Kami
          </Link>
          <div className="pt-2 border-t border-gray-100">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                  Keluar
                </button>
              </>
            ) : (
              <button onClick={() => signIn("google")} className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">
                Masuk dengan Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
