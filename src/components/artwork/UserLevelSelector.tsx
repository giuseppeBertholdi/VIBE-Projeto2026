"use client";

import { motion } from "framer-motion";
import { Baby, GraduationCap, User, BookOpen } from "lucide-react";
import { UserLevel } from "@/types";

interface UserLevelSelectorProps {
  value: UserLevel;
  onChange: (level: UserLevel) => void;
}

const LEVELS: { id: UserLevel; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "CHILD",  label: "Criança",      description: "8–12 anos",   icon: Baby          },
  { id: "TEEN",   label: "Adolescente",  description: "13–17 anos",  icon: GraduationCap },
  { id: "ADULT",  label: "Adulto",       description: "18+ anos",    icon: User          },
  { id: "EXPERT", label: "Especialista", description: "Profissional", icon: BookOpen      },
];

export function UserLevelSelector({ value, onChange }: UserLevelSelectorProps) {
  return (
    <div className="space-y-2.5">
      <label
        className="font-mono text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "rgba(27,24,17,0.3)" }}
      >
        Adaptar para
      </label>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Nível do usuário">
        {LEVELS.map(level => {
          const Icon = level.icon;
          const isSelected = value === level.id;
          return (
            <motion.button
              key={level.id}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(level.id)}
              className="flex items-center gap-2 p-2.5 text-left focus:outline-none"
              style={{
                background: isSelected ? "rgba(227,174,73,0.08)" : "transparent",
                border: isSelected ? "var(--border-yellow)" : "1.5px solid rgba(27,24,17,0.12)",
                borderRadius: "2px",
                boxShadow: isSelected ? "var(--shadow-yellow)" : "none",
                color: isSelected ? "var(--vibe-yellow)" : "rgba(27,24,17,0.45)",
                transition: "background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s",
              }}
              whileHover={!isSelected ? { borderColor: "rgba(27,24,17,0.35)", color: "rgba(27,24,17,0.7)" } : {}}
              whileTap={{ scale: 0.97 }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide">{level.label}</p>
                <p
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: isSelected ? "rgba(227,174,73,0.55)" : "rgba(27,24,17,0.25)" }}
                >
                  {level.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
