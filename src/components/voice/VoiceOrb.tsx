"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Loader2, PhoneOff, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type ConnectionState = "idle" | "connecting" | "connected" | "error" | "disconnected";

interface VoiceOrbProps {
  connectionState: ConnectionState;
  isAISpeaking: boolean;
  isUserSpeaking: boolean;
  audioLevel?: number;
  onConnect: () => void;
  onDisconnect: () => void;
  onInterrupt: () => void;
}

export function VoiceOrb({
  connectionState,
  isAISpeaking,
  isUserSpeaking,
  audioLevel = 0,
  onConnect,
  onDisconnect,
  onInterrupt,
}: VoiceOrbProps) {
  const isConnected  = connectionState === "connected";
  const isConnecting = connectionState === "connecting";
  const isActive     = isAISpeaking || isUserSpeaking;

  const accentColor = isUserSpeaking
    ? "var(--vibe-yellow)"
    : isAISpeaking
    ? "var(--vibe-cyan)"
    : isConnected
    ? "var(--vibe-white)"
    : "rgba(27,24,17,0.3)";

  const statusText =
    isConnecting                           ? "Conectando..." :
    isConnected && isAISpeaking            ? "V.I.B.E. está falando" :
    isConnected && isUserSpeaking          ? "Ouvindo você" :
    isConnected                            ? "Fale livremente" :
    connectionState === "disconnected"     ? "Sessão encerrada" :
    connectionState === "error"            ? "Erro de conexão" :
                                             "Iniciar conversa";

  return (
    <div className="flex flex-col items-center gap-5">

      {/* ── Orb ── */}
      <div className="relative flex items-center justify-center" style={{ width: 104, height: 104 }}>

        {/* Expanding ring pulses when active */}
        <AnimatePresence>
          {isActive && [1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.6 + i * 0.35, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
              style={{ border: `2px solid ${accentColor}` }}
            />
          ))}
        </AnimatePresence>

        {/* Core button */}
        <motion.button
          className={cn("relative rounded-full flex items-center justify-center focus:outline-none")}
          style={{
            width: 88,
            height: 88,
            background: isConnected ? accentColor : "transparent",
            border: `2px solid ${accentColor}`,
            boxShadow: isConnected
              ? `4px 4px 0px ${isAISpeaking ? "var(--vibe-cyan)" : isUserSpeaking ? "var(--vibe-yellow)" : "var(--vibe-white)"}`
              : "4px 4px 0px rgba(27,24,17,0.2)",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
          }}
          animate={{
            scale: isActive ? 1 + audioLevel * 0.12 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={isConnected ? onInterrupt : onConnect}
          disabled={isConnecting}
          aria-label={
            isConnecting ? "Conectando..." :
            isConnected  ? "Interromper" :
            "Iniciar conversa por voz"
          }
          whileHover={!isConnecting ? {
            scale: 1.05,
            boxShadow: `6px 6px 0px ${accentColor}`,
            x: -2, y: -2,
          } : {}}
          whileTap={!isConnecting ? { scale: 0.96, x: 2, y: 2, boxShadow: "none" } : {}}
        >
          {isConnecting ? (
            <Loader2
              className="w-7 h-7 animate-spin"
              style={{ color: "var(--vibe-white)" }}
            />
          ) : isConnected ? (
            isAISpeaking ? (
              <Volume2 className="w-7 h-7" style={{ color: "var(--vibe-black)" }} />
            ) : isUserSpeaking ? (
              <Mic className="w-7 h-7" style={{ color: "var(--vibe-black)" }} />
            ) : (
              <Square className="w-5 h-5" style={{ color: "var(--vibe-black)" }} />
            )
          ) : (
            <Mic className="w-7 h-7" style={{ color: accentColor }} />
          )}
        </motion.button>
      </div>

      {/* Status */}
      <motion.p
        key={statusText}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="font-mono text-xs font-bold uppercase tracking-widest text-center"
        style={{ color: accentColor }}
      >
        {statusText}
      </motion.p>

      {/* Disconnect */}
      <AnimatePresence>
        {isConnected && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            onClick={onDisconnect}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest focus:outline-none"
            style={{
              color: "var(--vibe-pink)",
              border: "var(--border-pink)",
              boxShadow: "var(--shadow-pink)",
              padding: "6px 14px",
              borderRadius: "2px",
              background: "transparent",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px var(--vibe-pink)" }}
            whileTap={{ x: 2, y: 2, boxShadow: "none" }}
            aria-label="Encerrar conversa"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            Encerrar
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
