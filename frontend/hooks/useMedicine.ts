import { useQuery } from "@tanstack/react-query";
import { v1 } from "@/lib/api";
import type { Medicine } from "@/types";

export function useMedicine(slug: string) {
  return useQuery<Medicine>({
    queryKey: ["medicine", slug],
    queryFn: async () => {
      const { data } = await v1.get(`/catalog/medicines/${slug}`);
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
