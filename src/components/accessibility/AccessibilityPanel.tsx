"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility, X, Sun, Type, Eye, Captions,
  Languages, ZoomIn, ZoomOut, Hand
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { cn } from "@/lib/utils";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings, update,
    toggleLibras, toggleHighContrast, toggleDyslexiaFont, toggleCaptions,
  } = useAccessibility();

  const fontSizes = ["sm", "md", "lg", "xl"] as const;
  const fontSizeIdx = fontSizes.indexOf(settings.fontSize);

  return (
    <>
      {/* FAB trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-13 h-13 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-2xl hover:bg-amber-400 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
        style={{ width: 52, height: 52 }}
        aria-label="Acessibilidade"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Configurações de Acessibilidade"
              className="fixed left-4 bottom-[88px] z-[46] w-[320px] rounded-3xl bg-gray-900/95 border border-white/12 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                    <Accessibility className="w-4 h-4 text-amber-400" />
                  </div>
                  <h2 className="text-white font-semibold text-sm">Acessibilidade</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg text-white/50 hover:text-white hover:bg-white/8 flex items-center justify-center transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4 max-h-[72vh] overflow-y-auto overscroll-contain">
                {/* ── LIBRAS ── */}
                <Section label="Língua de Sinais" icon={<Hand className="w-3.5 h-3.5" />}>
                  <Toggle
                    icon={<Languages className="w-4 h-4" />}
                    label="LIBRAS via VLibras"
                    sub="Avatar oficial do Governo Federal"
                    checked={settings.librasEnabled}
                    onToggle={toggleLibras}
                  />
                  {settings.librasEnabled && (
                    <div className="mt-2 ml-11">
                      <p className="text-[11px] text-white/40 mb-1.5">Posição do widget VLibras</p>
                      <div className="grid grid-cols-2 gap-1">
                        {([
                          ["bottom-right", "↙ Baixo-direita"],
                          ["bottom-left", "↘ Baixo-esquerda"],
                          ["top-right", "↖ Cima-direita"],
                          ["top-left", "↗ Cima-esquerda"],
                        ] as const).map(([val, lbl]) => (
                          <button
                            key={val}
                            onClick={() => update("librasPosition", val)}
                            className={cn(
                              "py-1.5 px-2 rounded-lg text-[11px] font-medium transition-colors text-left",
                              settings.librasPosition === val
                                ? "bg-amber-500 text-black"
                                : "bg-white/8 text-white/50 hover:bg-white/12"
                            )}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>

                {/* ── Visual ── */}
                <Section label="Visual" icon={<Eye className="w-3.5 h-3.5" />}>
                  <Toggle
                    icon={<Sun className="w-4 h-4" />}
                    label="Alto contraste"
                    sub="Aumenta visibilidade para baixa visão"
                    checked={settings.highContrast}
                    onToggle={toggleHighContrast}
                  />
                  <Toggle
                    icon={<Type className="w-4 h-4" />}
                    label="Fonte dislexia"
                    sub="OpenDyslexic para leitura facilitada"
                    checked={settings.dyslexiaFont}
                    onToggle={toggleDyslexiaFont}
                  />

                  {/* Font size stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => fontSizeIdx > 0 && update("fontSize", fontSizes[fontSizeIdx - 1])}
                      disabled={fontSizeIdx === 0}
                      className="w-8 h-8 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-white/14 disabled:opacity-30 transition-colors"
                      aria-label="Diminuir fonte"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <div className="flex-1 grid grid-cols-4 gap-1">
                      {fontSizes.map((s, i) => (
                        <button
                          key={s}
                          onClick={() => update("fontSize", s)}
                          className={cn(
                            "py-1.5 rounded-lg text-[11px] font-bold transition-colors",
                            settings.fontSize === s
                              ? "bg-amber-500 text-black"
                              : "bg-white/8 text-white/50 hover:bg-white/14"
                          )}
                          style={{ fontSize: 10 + i * 1.5 }}
                        >
                          A
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => fontSizeIdx < 3 && update("fontSize", fontSizes[fontSizeIdx + 1])}
                      disabled={fontSizeIdx === 3}
                      className="w-8 h-8 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-white/14 disabled:opacity-30 transition-colors"
                      aria-label="Aumentar fonte"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </Section>

                {/* ── Áudio ── */}
                <Section label="Áudio e Legendas" icon={<Captions className="w-3.5 h-3.5" />}>
                  <Toggle
                    icon={<Captions className="w-4 h-4" />}
                    label="Legendas em tempo real"
                    sub="Transcrição simultânea da IA"
                    checked={settings.captionsEnabled}
                    onToggle={toggleCaptions}
                  />
                  <Toggle
                    icon={<Eye className="w-4 h-4" />}
                    label="Reduzir animações"
                    sub="Para sensibilidade a movimento"
                    checked={settings.reducedMotion}
                    onToggle={() => update("reducedMotion", !settings.reducedMotion)}
                  />
                </Section>

                <p className="text-center text-[11px] text-white/30 pt-1">
                  WCAG 2.2 AAA · LIBRAS · Screen Reader
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Sub-components ─── */

function Section({
  label, icon, children,
}: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-white/30">{icon}</span>
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">{label}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Toggle({
  icon, label, sub, checked, onToggle,
}: { icon: React.ReactNode; label: string; sub?: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
    >
      <span className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
        checked ? "bg-amber-500/18 text-amber-400" : "bg-white/5 text-white/35 group-hover:text-white/55"
      )}>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className={cn("text-[13px] font-medium leading-tight", checked ? "text-white" : "text-white/65")}>{label}</p>
        {sub && <p className="text-[11px] text-white/35 mt-0.5">{sub}</p>}
      </div>
      {/* Toggle pill */}
      <div
        className={cn(
          "flex-shrink-0 rounded-full transition-all duration-200 relative border",
          checked ? "bg-amber-500 border-amber-500" : "bg-white/10 border-white/20"
        )}
        style={{ width: 38, height: 22 }}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          )}
        />
      </div>
    </button>
  );
}
