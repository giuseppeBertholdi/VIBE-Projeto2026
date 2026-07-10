"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Lightbulb, Search, BookOpen } from "lucide-react";
import { Artwork } from "@/types";
import { cn } from "@/lib/utils";

interface DiscoverySectionProps {
  artwork: Artwork;
}

type DiscoveryTab = "hidden" | "symbolism" | "theories" | "context";

const TABS: { id: DiscoveryTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "hidden",    label: "Ocultos",   icon: Eye      },
  { id: "symbolism", label: "Símbolos",  icon: Search   },
  { id: "theories",  label: "Teorias",   icon: Lightbulb },
  { id: "context",   label: "Contexto",  icon: BookOpen  },
];

const CREDIBILITY_CONFIG = {
  ACCEPTED:    { label: "Aceita",       color: "var(--vibe-cyan)"  },
  DEBATED:     { label: "Em debate",    color: "var(--vibe-yellow)" },
  SPECULATIVE: { label: "Especulativa", color: "var(--vibe-pink)"  },
};

export function DiscoverySection({ artwork }: DiscoverySectionProps) {
  const [activeTab, setActiveTab] = useState<DiscoveryTab>("hidden");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <section aria-labelledby="discovery-heading">
      <h2
        id="discovery-heading"
        className="font-black uppercase tracking-tight text-sm mb-4"
        style={{ color: "rgba(27,24,17,0.4)" }}
      >
        O que os guias não contam
      </h2>

      {/* Tabs */}
      <div
        className="flex mb-4"
        role="tablist"
        aria-label="Seções de descoberta"
        style={{ border: "var(--border)", borderRadius: "2px", overflow: "hidden" }}
      >
        {TABS.map(({ id, label, icon: TabIcon }, i) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`disc-panel-${id}`}
            onClick={() => setActiveTab(id)}
            className="flex-1 flex items-center justify-center gap-1 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none"
            style={{
              background: activeTab === id ? "var(--vibe-yellow)" : "transparent",
              color: activeTab === id ? "var(--vibe-black)" : "rgba(27,24,17,0.35)",
              borderLeft: i > 0 ? "var(--border)" : "none",
            }}
          >
            <TabIcon className="w-3 h-3" />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`disc-panel-${activeTab}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Hidden details — accordion */}
          {activeTab === "hidden" && (
            <div className="space-y-2">
              {artwork.hiddenDetails?.map(detail => (
                <div
                  key={detail.id}
                  style={{ border: "var(--border)", borderRadius: "2px", overflow: "hidden" }}
                >
                  <button
                    onClick={() => setExpandedItem(expandedItem === detail.id ? null : detail.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left focus:outline-none transition-colors"
                    style={{
                      background: expandedItem === detail.id ? "rgba(227,174,73,0.05)" : "transparent",
                    }}
                    aria-expanded={expandedItem === detail.id}
                  >
                    <Eye className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--vibe-yellow)" }} />
                    <span className="flex-1 font-bold text-xs uppercase tracking-wide" style={{ color: "var(--vibe-white)" }}>
                      {detail.title}
                    </span>
                    <ChevronDown
                      className={cn("w-3.5 h-3.5 transition-transform", expandedItem === detail.id && "rotate-180")}
                      style={{ color: "rgba(27,24,17,0.3)" }}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedItem === detail.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="px-3 pb-3 pt-2 text-xs leading-relaxed"
                          style={{
                            color: "rgba(27,24,17,0.6)",
                            borderTop: "1px solid rgba(27,24,17,0.08)",
                          }}
                        >
                          {detail.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Symbolism */}
          {activeTab === "symbolism" && (
            <div className="space-y-2">
              {artwork.symbolism?.map((sym, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3"
                  style={{ border: "var(--border)", borderRadius: "2px" }}
                >
                  <div
                    className="w-1 flex-shrink-0 self-stretch"
                    style={{ background: "var(--vibe-cyan)", borderRadius: "1px" }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-xs uppercase tracking-wide" style={{ color: "var(--vibe-white)" }}>
                        {sym.symbol}
                      </span>
                      {sym.location && (
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5"
                          style={{
                            color: "var(--vibe-cyan)",
                            border: "1px solid var(--vibe-cyan)",
                            borderRadius: "2px",
                          }}
                        >
                          {sym.location}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.6)" }}>
                      {sym.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Theories */}
          {activeTab === "theories" && (
            <div className="space-y-2">
              {artwork.theories?.map((theory, i) => {
                const { label, color } = CREDIBILITY_CONFIG[theory.credibility];
                return (
                  <div key={i} className="p-3" style={{ border: "var(--border)", borderRadius: "2px" }}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-black text-xs uppercase tracking-tight" style={{ color: "var(--vibe-white)" }}>
                        {theory.title}
                      </h4>
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0"
                        style={{ color, border: `1px solid ${color}`, borderRadius: "2px" }}
                      >
                        {label}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.6)" }}>
                      {theory.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Context */}
          {activeTab === "context" && (
            <div className="space-y-2">
              {[
                { title: "Histórico",  content: artwork.historicalCtx },
                { title: "Político",   content: artwork.politicalCtx },
                { title: "Artístico",  content: artwork.artisticCtx },
              ].filter(item => item.content).map((item, i) => (
                <div key={i} className="p-3" style={{ border: "var(--border)", borderRadius: "2px" }}>
                  <h4
                    className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--vibe-yellow)" }}
                  >
                    Contexto {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.65)" }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
