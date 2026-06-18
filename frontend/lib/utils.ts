import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min?: number, max?: number): string {
  if (!min && !max) return "Hubungi apotek";
  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `mulai ${fmt(min)}`;
  return fmt(max!);
}

export function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    herbal: "Obat Herbal",
    kimia: "Obat Kimia",
    vitamin: "Vitamin",
    suplemen: "Suplemen",
  };
  return map[cat] ?? cat;
}

export function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    herbal: "bg-emerald-100 text-emerald-700",
    kimia: "bg-blue-100 text-blue-700",
    vitamin: "bg-violet-100 text-violet-700",
    suplemen: "bg-amber-100 text-amber-700",
  };
  return map[cat] ?? "bg-gray-100 text-gray-700";
}

export function categoryIcon(cat: string): string {
  const map: Record<string, string> = { herbal: "🌿", kimia: "💊", vitamin: "🫐", suplemen: "⚡" };
  return map[cat] ?? "💡";
}

export function greetingByTime(): string {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}
