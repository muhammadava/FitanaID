"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useConsultationQuestions, useSubmitConsultation } from "@/hooks/useConsultation";
import { useConsultationStore } from "@/stores/consultationStore";
import { QuestionStep } from "@/components/consultation/QuestionStep";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { categoryIcon, greetingByTime } from "@/lib/utils";
import type { MedicineCategory } from "@/types";

const CATEGORIES: { value: MedicineCategory; label: string; desc: string }[] = [
  { value: "herbal",   label: "Obat Herbal",    desc: "Tanaman obat, jamu, herbal alami" },
  { value: "kimia",    label: "Obat Kimia",     desc: "Obat farmasi, analgesik, antibiotik" },
  { value: "vitamin",  label: "Vitamin",        desc: "Vitamin, mineral, mikronutrien" },
  { value: "suplemen", label: "Suplemen",       desc: "Protein, suplemen kebugaran & kecantikan" },
];

export default function KonsultasiPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { category, answers, currentStep, setCategory, setAnswer, nextStep, prevStep, setResult, reset } = useConsultationStore();
  const { data: questionsData, isLoading: loadingQ } = useConsultationQuestions(category);
  const submitMutation = useSubmitConsultation();

  const questions = questionsData?.questions ?? [];
  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, value);
  };

  const handleNext = async () => {
    if (isLastStep) {
      try {
        const result = await submitMutation.mutateAsync({
          category: category!,
          answers,
          user_id: (session?.user as any)?.googleId,
        });
        setResult(result);
        router.push("/konsultasi/hasil");
      } catch {
        alert("Gagal mendapatkan rekomendasi. Coba ubah beberapa jawaban.");
      }
    } else {
      nextStep();
    }
  };

  const canProceed = currentQuestion ? !!answers[currentQuestion.id] : false;

  // Category selection screen
  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {greetingByTime()}{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="text-gray-500">Ingin konsultasi mengenai kategori apa hari ini?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all text-left group"
            >
              <span className="text-4xl">{categoryIcon(cat.value)}</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">{cat.label}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Loading questions
  if (loadingQ) return <LoadingSpinner className="min-h-screen" />;
  if (!questions.length) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <p>Pertanyaan tidak tersedia. Pastikan backend berjalan.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          ← Ganti Kategori
        </button>
        <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
          {categoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <QuestionStep
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          step={currentStep + 1}
          total={totalSteps}
        />

        <div className="flex gap-3 mt-8">
          {currentStep > 0 && (
            <button onClick={prevStep} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors">
              ← Kembali
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed || submitMutation.isPending}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-40 hover:bg-emerald-700 transition-colors"
          >
            {submitMutation.isPending
              ? "Memproses..."
              : isLastStep
              ? "Lihat Rekomendasi →"
              : "Lanjut →"}
          </button>
        </div>
      </div>
    </div>
  );
}
