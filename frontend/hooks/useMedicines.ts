import { useQuery } from "@tanstack/react-query";
import { v1 } from "@/lib/api";
import type { MedicineListResponse } from "@/types";

interface UseMedicinesParams {
  q?: string;
  category?: string;
  sub_category?: string;
  page?: number;
  limit?: number;
}

export function useMedicines(params: UseMedicinesParams = {}) {
  return useQuery<MedicineListResponse>({
    queryKey: ["medicines", params],
    queryFn: async () => {
      const { data } = await v1.get("/catalog/medicines", { params });
      return data;
    },
    staleTime: 60 * 1000,
  });
}
