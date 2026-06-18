import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

interface HealthData {
  status: string;
  service: string;
  version: string;
  database: string;
  redis: string;
}

export function useHealth() {
  return useQuery<HealthData>({
    queryKey: ["health"],
    queryFn: async () => {
      // /health dipanggil langsung ke backend via rewrite
      const { data } = await apiClient.get<HealthData>("/../../health");
      return data;
    },
    staleTime: 30 * 1000,
    retry: false,
  });
}
