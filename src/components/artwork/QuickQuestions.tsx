"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface QuickQuestionsProps {
  artworkTitle: string;
  onQuestion: (question: string) => void;
  disabled?: boolean;
}

const QUESTION_TEMPLATES = [
  "Por que essa obra é tão famosa?",
  "Quais detalhes escondidos existem?",
  "Qual era a situação política da época?",
  "Como essa obra mudou a arte?",
  "O que o artista queria dizer?",
  "Curiosidades que poucos sabem",
];

export function QuickQuestions({ artworkTitle, onQuestion, disabled }: QuickQuestionsProps) {
  const questions = [
    ...QUESTION_TEMPLATES.slice(0, 3),
    `Quem aparece em ${artworkTitle}?`,
    `Por que ${artworkTitle} é uma obra-prima?`,
    "Mostre os detalhes mais surpreendentes",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-3.5 h-3.5" style={{ color: "var(--vibe-yellow)" }} />
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "rgba(27,24,17,0.35)" }}
        >
          Perguntas rápidas
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map(question => (
          <motion.button
            key={question}
            onClick={() => onQuestion(question)}
            disabled={disabled}
            className="text-xs font-bold uppercase tracking-wide focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              padding: "5px 10px",
              background: "transparent",
              color: "rgba(27,24,17,0.55)",
              border: "1.5px solid rgba(27,24,17,0.2)",
              borderRadius: "2px",
              transition: "color 0.15s, border-color 0.15s, box-shadow 0.15s",
            }}
            whileHover={!disabled ? {
              color: "var(--vibe-yellow)",
              borderColor: "var(--vibe-yellow)",
              boxShadow: "3px 3px 0px var(--vibe-yellow)",
              x: -1, y: -1,
            } : {}}
            whileTap={!disabled ? { x: 1, y: 1, boxShadow: "none" } : {}}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
