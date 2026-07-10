"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";

interface AchievementToastProps {
  achievement: { title: string; description: string; icon: string; points: number } | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-20 right-4 z-50 max-w-xs"
          initial={{ opacity: 0, x: 60, y: -4 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          <div
            style={{
              background: "var(--vibe-surface)",
              border: "var(--border-yellow)",
              boxShadow: "var(--shadow-yellow)",
              borderRadius: "2px",
              padding: "12px 14px",
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center text-xl"
                style={{
                  width: 44, height: 44,
                  border: "var(--border-yellow)",
                  borderRadius: "2px",
                  background: "rgba(227,174,73,0.06)",
                }}
              >
                {achievement.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Trophy className="w-3 h-3" style={{ color: "var(--vibe-yellow)" }} />
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--vibe-yellow)" }}
                  >
                    Conquista
                  </span>
                </div>
                <p className="font-black text-sm uppercase tracking-tight" style={{ color: "var(--vibe-white)" }}>
                  {achievement.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(27,24,17,0.5)" }}>
                  {achievement.description}
                </p>
                <p
                  className="font-mono text-xs font-bold mt-1 uppercase tracking-wider"
                  style={{ color: "var(--vibe-yellow)" }}
                >
                  +{achievement.points} pts
                </p>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="flex-shrink-0 focus:outline-none"
                style={{ color: "rgba(27,24,17,0.3)", marginTop: "2px" }}
                aria-label="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
