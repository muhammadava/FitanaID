"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

interface HealthData {
  status: string;
  service: string;
  version: string;
  database: string;
  redis: string;
}

export function ApiStatus() {
  const { data, isLoading, isError } = useQuery<HealthData>({
    queryKey: ["api-health"],
    queryFn: async () => {
      const { data } = await apiClient.get<HealthData>("/api/health");
      return data;
    },
    refetchInterval: 10000, // auto-refresh setiap 10 detik
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="text-xs text-gray-400 animate-pulse">
        Memeriksa koneksi backend...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-xs text-red-500">
        ✗ Backend tidak terhubung (pastikan FastAPI berjalan di port 8000)
      </div>
    );
  }

  return (
    <div className="text-xs space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
        <span className="text-gray-600">API: {data?.service} v{data?.version}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full inline-block ${data?.database === "connected" ? "bg-emerald-500" : "bg-red-500"}`}></span>
        <span className="text-gray-600">DB: {data?.database}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full inline-block ${data?.redis === "connected" ? "bg-emerald-500" : "bg-red-500"}`}></span>
        <span className="text-gray-600">Redis: {data?.redis}</span>
      </div>
    </div>
  );
}
