import { create } from "zustand";
import type { ConsultationResult, MedicineCategory } from "@/types";

interface ConsultationStore {
  category: MedicineCategory | null;
  answers: Record<string, string>;
  currentStep: number;
  result: ConsultationResult | null;
  setCategory: (cat: MedicineCategory) => void;
  setAnswer: (questionId: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  setResult: (result: ConsultationResult) => void;
  reset: () => void;
}

export const useConsultationStore = create<ConsultationStore>((set) => ({
  category: null,
  answers: {},
  currentStep: 0,
  result: null,
  setCategory: (category) => set({ category, answers: {}, currentStep: 0, result: null }),
  setAnswer: (questionId, value) =>
    set((s) => ({ answers: { ...s.answers, [questionId]: value } })),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
  setResult: (result) => set({ result }),
  reset: () => set({ category: null, answers: {}, currentStep: 0, result: null }),
}));
