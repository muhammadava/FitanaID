import { useQuery, useMutation } from "@tanstack/react-query";
import { v1 } from "@/lib/api";
import type { ConsultationQuestion, ConsultationResult } from "@/types";

export function useConsultationQuestions(category: string | null) {
  return useQuery<{ category: string; questions: ConsultationQuestion[] }>({
    queryKey: ["consultation-questions", category],
    queryFn: async () => {
      const { data } = await v1.get(`/consultation/questions/${category}`);
      return data;
    },
    enabled: !!category,
    staleTime: Infinity,
  });
}

export function useSubmitConsultation() {
  return useMutation<
    ConsultationResult,
    Error,
    { category: string; answers: Record<string, string>; user_id?: string }
  >({
    mutationFn: async (payload) => {
      const { data } = await v1.post("/consultation/submit", payload);
      return data;
    },
  });
}
