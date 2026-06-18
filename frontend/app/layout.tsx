import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "FitanaID — Informasi Obat & Konsultasi Kesehatan", template: "%s | FitanaID" },
  description: "Platform informasi obat herbal, kimia, vitamin & suplemen terpercaya di Indonesia.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
