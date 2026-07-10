"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, User } from "lucide-react";
import { ConversationMessage } from "@/types";
import { cn } from "@/lib/utils";

interface TranscriptPanelProps {
  messages: ConversationMessage[];
  currentTranscript?: string;
  captionsEnabled: boolean;
  className?: string;
}

export function TranscriptPanel({
  messages,
  currentTranscript,
  captionsEnabled,
  className,
}: TranscriptPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentTranscript]);

  if (!captionsEnabled) return null;

  return (
    <div
      className={cn("flex flex-col overflow-hidden", className)}
      style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-surface)" }}
      role="log"
      aria-live="polite"
      aria-label="Transcrição da conversa"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ borderBottom: "var(--border)" }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--vibe-cyan)", boxShadow: "0 0 6px var(--vibe-cyan)" }}
        />
        <span
          className="font-mono text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(27,24,17,0.5)" }}
        >
          Transcrição
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
        {messages.length === 0 && !currentTranscript && (
          <p
            className="font-mono text-xs uppercase tracking-widest text-center py-6"
            style={{ color: "rgba(27,24,17,0.2)" }}
          >
            Aguardando conversa...
          </p>
        )}

        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "flex gap-2.5 items-start",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  border: msg.role === "user" ? "1.5px solid var(--vibe-yellow)" : "1.5px solid var(--vibe-cyan)",
                  color: msg.role === "user" ? "var(--vibe-yellow)" : "var(--vibe-cyan)",
                  borderRadius: "2px",
                }}
              >
                {msg.role === "user" ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </div>
              <div
                className="max-w-[85%] px-3 py-2"
                style={{
                  background: msg.role === "user" ? "rgba(227,174,73,0.06)" : "rgba(47,111,98,0.06)",
                  border: msg.role === "user" ? "1.5px solid rgba(227,174,73,0.25)" : "1.5px solid rgba(47,111,98,0.2)",
                  borderRadius: "2px",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: msg.role === "user" ? "rgba(227,174,73,0.9)" : "rgba(27,24,17,0.85)" }}
                >
                  {msg.content}
                </p>
                <p
                  className="font-mono text-[10px] mt-1 uppercase tracking-wider"
                  style={{ color: "rgba(27,24,17,0.25)" }}
                >
                  {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Live transcript */}
        {currentTranscript && (
          <motion.div
            className="flex gap-2.5 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                border: "1.5px solid var(--vibe-cyan)",
                color: "var(--vibe-cyan)",
                borderRadius: "2px",
              }}
            >
              <Volume2 className="w-3 h-3" />
            </div>
            <div
              className="max-w-[85%] px-3 py-2"
              style={{
                background: "rgba(47,111,98,0.04)",
                border: "1.5px solid rgba(47,111,98,0.35)",
                borderRadius: "2px",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(47,111,98,0.9)" }}>
                {currentTranscript}
                <span
                  className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                  style={{ background: "var(--vibe-cyan)" }}
                />
              </p>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
