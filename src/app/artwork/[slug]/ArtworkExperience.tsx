"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Lightbulb, Info, PanelRightClose, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { Artwork, UserLevel } from "@/types";
import { useRealtime } from "@/hooks/useRealtime";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ArtworkViewer } from "@/components/artwork/ArtworkViewer";
import { ArtworkInfo } from "@/components/artwork/ArtworkInfo";
import { VoiceOrb } from "@/components/voice/VoiceOrb";
import { TranscriptPanel } from "@/components/voice/TranscriptPanel";
import { DiscoverySection } from "@/components/artwork/DiscoverySection";
import { TimelineSection } from "@/components/artwork/TimelineSection";
import { UserLevelSelector } from "@/components/artwork/UserLevelSelector";
import { QuickQuestions } from "@/components/artwork/QuickQuestions";
import { LibrasAvatar } from "@/components/accessibility/LibrasAvatar";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";
import { AchievementToast } from "@/components/gamification/AchievementToast";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

type SidePanel = "info" | "discovery" | "timeline";

const SIDE_PANELS: { id: SidePanel; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "info",      label: "Obra",     Icon: Info      },
  { id: "discovery", label: "Achados",  Icon: Lightbulb },
  { id: "timeline",  label: "Linha",    Icon: Clock     },
];

export function ArtworkExperience({ artwork }: { artwork: Artwork }) {
  const [userLevel, setUserLevel]     = useState<UserLevel>("ADULT");
  const [audioLevel, setAudioLevel]   = useState(0);
  const [sidePanel, setSidePanel]     = useState<SidePanel>("info");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [achievement, setAchievement] = useState<{
    title: string; description: string; icon: string; points: number;
  } | null>(null);
  const [firstMessage, setFirstMessage] = useState(false);

  const { settings, toggleLibras } = useAccessibility();

  const {
    connect, disconnect, sendMessage, interrupt,
    connectionState, messages, currentTranscript,
    isAISpeaking, isUserSpeaking, error,
  } = useRealtime({
    artworkId: artwork.id,
    artworkTitle: artwork.title,
    systemPrompt: artwork.aiSystemPrompt ?? undefined,
    userLevel,
    onAudioLevel: setAudioLevel,
    onTranscript: (_text, role) => {
      if (role === "assistant" && !firstMessage) {
        setFirstMessage(true);
        setAchievement({
          title: "Primeira Visita!",
          description: `Você começou a explorar ${artwork.title}`,
          icon: "🎨",
          points: 10,
        });
      }
    },
  });

  const handleQuestion = useCallback((q: string) => {
    if (connectionState !== "connected") {
      connect().then(() => setTimeout(() => sendMessage(q), 2000));
    } else {
      sendMessage(q);
    }
  }, [connectionState, connect, sendMessage]);

  return (
    <div
      className="min-h-screen stripe-bg"
      style={{ background: "var(--vibe-paper)" }}
    >
      <Navbar />
      <AccessibilityPanel />

      {settings.librasEnabled && (
        <LibrasAvatar
          settings={settings}
          currentText={currentTranscript || messages.at(-1)?.content}
          onClose={toggleLibras}
        />
      )}

      <AchievementToast achievement={achievement} onClose={() => setAchievement(null)} />

      <main
        id="main-content"
        className="flex flex-col lg:flex-row"
        style={{ minHeight: "calc(100vh - 56px)", marginTop: 56 }}
      >
        {/* ── Left column ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 p-4 sm:p-5 pb-8 overflow-y-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest w-fit mt-1 focus:outline-none"
            style={{ color: "rgba(27,24,17,0.35)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--vibe-yellow)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(27,24,17,0.35)")}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Galeria
          </Link>

          {/* Artwork title strip */}
          <div
            className="flex items-baseline gap-3 py-2 px-3"
            style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-surface)" }}
          >
            <span
              className="font-black text-lg uppercase tracking-tight leading-tight truncate"
              style={{ color: "var(--vibe-white)" }}
            >
              {artwork.title}
            </span>
            <span
              className="font-mono text-xs flex-shrink-0"
              style={{ color: "rgba(27,24,17,0.3)" }}
            >
              {artwork.year}
            </span>
            {artwork.movements[0] && (
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0"
                style={{
                  color: "var(--vibe-yellow)",
                  border: "1.5px solid var(--vibe-yellow)",
                  borderRadius: "2px",
                }}
              >
                {artwork.movements[0]}
              </span>
            )}
          </div>

          {/* Artwork viewer */}
          <ArtworkViewer artwork={artwork} className="w-full" />

          {/* Voice panel */}
          <div
            style={{
              border: "var(--border)",
              borderRadius: "2px",
              background: "var(--vibe-surface)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "var(--border)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: connectionState === "connected" ? "var(--vibe-cyan)" : "rgba(27,24,17,0.2)",
                  boxShadow: connectionState === "connected" ? "0 0 6px var(--vibe-cyan)" : "none",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              />
              <span
                className="font-mono text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(27,24,17,0.4)" }}
              >
                Assistente de Voz
              </span>
            </div>

            <div className="p-4 space-y-5">
              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-3 py-2 text-xs"
                    style={{
                      background: "rgba(166,61,43,0.08)",
                      border: "var(--border-pink)",
                      borderRadius: "2px",
                      color: "var(--vibe-pink)",
                    }}
                  >
                    {error}
                    {error.toLowerCase().includes("token") && (
                      <p className="mt-1 opacity-60">Configure OPENAI_API_KEY no arquivo .env.local</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Level + Orb */}
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1 min-w-0">
                  <UserLevelSelector value={userLevel} onChange={setUserLevel} />
                </div>
                <div className="flex justify-center md:justify-end md:pt-2">
                  <VoiceOrb
                    connectionState={connectionState}
                    isAISpeaking={isAISpeaking}
                    isUserSpeaking={isUserSpeaking}
                    audioLevel={audioLevel}
                    onConnect={connect}
                    onDisconnect={disconnect}
                    onInterrupt={interrupt}
                  />
                </div>
              </div>

              {/* Quick questions */}
              <div style={{ borderTop: "1px solid rgba(27,24,17,0.08)", paddingTop: "1.25rem" }}>
                <QuickQuestions
                  artworkTitle={artwork.title}
                  onQuestion={handleQuestion}
                  disabled={connectionState === "connecting"}
                />
              </div>
            </div>
          </div>

          {/* Transcript */}
          <TranscriptPanel
            messages={messages}
            currentTranscript={currentTranscript}
            captionsEnabled={settings.captionsEnabled}
          />

          {/* Mobile sidebar content */}
          <div className="lg:hidden space-y-4 mt-2">
            <MobileTabs active={sidePanel} onChange={setSidePanel} />
            <div
              style={{
                border: "var(--border)",
                borderRadius: "2px",
                background: "var(--vibe-surface)",
                padding: "1.25rem",
              }}
            >
              <PanelContent panel={sidePanel} artwork={artwork} />
            </div>
          </div>
        </div>

        {/* ── Right sidebar (desktop) ── */}
        <aside
          className={cn(
            "hidden lg:flex flex-col flex-shrink-0 overflow-hidden transition-all duration-250",
          )}
          style={{
            width: sidebarOpen ? 380 : 44,
            borderLeft: "var(--border)",
            background: "var(--vibe-surface)",
          }}
          aria-label="Painel informativo"
        >
          {/* Toggle */}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="flex items-center justify-center h-11 flex-shrink-0 focus:outline-none transition-colors"
            style={{
              borderBottom: "var(--border)",
              color: "rgba(27,24,17,0.35)",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--vibe-yellow)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(27,24,17,0.35)")}
            aria-label={sidebarOpen ? "Recolher painel" : "Expandir painel"}
          >
            {sidebarOpen
              ? <PanelRightClose className="w-4 h-4" />
              : <PanelRightOpen  className="w-4 h-4" />
            }
          </button>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="flex flex-col flex-1 min-h-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {/* Tab row */}
                <div
                  role="tablist"
                  aria-label="Seções"
                  className="flex flex-shrink-0"
                  style={{ borderBottom: "var(--border)" }}
                >
                  {SIDE_PANELS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={sidePanel === id}
                      aria-controls={`panel-${id}`}
                      onClick={() => setSidePanel(id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none border-b-2",
                      )}
                      style={{
                        borderBottomColor: sidePanel === id ? "var(--vibe-yellow)" : "transparent",
                        color: sidePanel === id ? "var(--vibe-yellow)" : "rgba(27,24,17,0.35)",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Scrollable panel */}
                <div
                  id={`panel-${sidePanel}`}
                  role="tabpanel"
                  className="flex-1 overflow-y-auto overscroll-contain p-5"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sidePanel}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <PanelContent panel={sidePanel} artwork={artwork} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>
    </div>
  );
}

/* ── helpers ── */

function MobileTabs({ active, onChange }: { active: SidePanel; onChange: (p: SidePanel) => void }) {
  return (
    <div
      role="tablist"
      className="flex"
      style={{ border: "var(--border)", borderRadius: "2px", overflow: "hidden" }}
    >
      {SIDE_PANELS.map(({ id, label, Icon }, i) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none"
          style={{
            background: active === id ? "var(--vibe-yellow)" : "var(--vibe-surface)",
            color: active === id ? "var(--vibe-black)" : "rgba(27,24,17,0.4)",
            borderLeft: i > 0 ? "var(--border)" : "none",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

function PanelContent({ panel, artwork }: { panel: SidePanel; artwork: Artwork }) {
  if (panel === "info")      return <ArtworkInfo artwork={artwork} />;
  if (panel === "discovery") return <DiscoverySection artwork={artwork} />;
  return <TimelineSection artwork={artwork} />;
}
