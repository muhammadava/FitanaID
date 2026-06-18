"use client";

import { cn } from "@/lib/utils";
import type { ConsultationQuestion } from "@/types";

interface Props {
  question: ConsultationQuestion;
  currentAnswer?: string;
  onAnswer: (value: string) => void;
  step: number;
  total: number;
}

export function QuestionStep({ question, currentAnswer, onAnswer, step, total }: Props) {
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Pertanyaan {step} dari {total}</span>
          <span>{Math.round((step / total) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
        <p className="text-sm text-gray-400 mt-2">Pilih satu jawaban yang paling sesuai dengan kondisi Anda</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={cn(
              "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150",
              currentAnswer === option.value
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
            )}
          >
            <span className="flex items-center gap-2">
              <span className={cn(
                "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors",
                currentAnswer === option.value ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
              )} />
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
