import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v1 } from "@/lib/api";
import type { Medicine, ConsultationHistory } from "@/types";

export function useSavedMedicines(googleId: string | null) {
  return useQuery<Medicine[]>({
    queryKey: ["saved-medicines", googleId],
    queryFn: async () => {
      const { data } = await v1.get("/user/saved-medicines", { params: { google_id: googleId } });
      return data;
    },
    enabled: !!googleId,
  });
}

export function useSaveMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ medicine_id, user_id }: { medicine_id: string; user_id: string }) => {
      const { data } = await v1.post("/user/saved-medicines", { medicine_id, user_id });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved-medicines"] }),
  });
}

export function useUnsaveMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ medicine_id, google_id }: { medicine_id: string; google_id: string }) => {
      const { data } = await v1.delete(`/user/saved-medicines/${medicine_id}`, { params: { google_id } });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved-medicines"] }),
  });
}

export function useConsultationHistory(googleId: string | null) {
  return useQuery<ConsultationHistory[]>({
    queryKey: ["consultation-history", googleId],
    queryFn: async () => {
      const { data } = await v1.get("/user/consultations", { params: { google_id: googleId } });
      return data;
    },
    enabled: !!googleId,
  });
}

export function useHealthNote(googleId: string | null) {
  return useQuery<{ content: string }>({
    queryKey: ["health-note", googleId],
    queryFn: async () => {
      const { data } = await v1.get("/user/health-note", { params: { google_id: googleId } });
      return data;
    },
    enabled: !!googleId,
  });
}

export function useSaveHealthNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ content, user_id }: { content: string; user_id: string }) => {
      const { data } = await v1.post("/user/health-note", { content, user_id });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["health-note"] }),
  });
}
