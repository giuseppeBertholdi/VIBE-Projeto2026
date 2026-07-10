"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, X, Hand, Loader2, AlertCircle } from "lucide-react";
import { AccessibilitySettings } from "@/types";
import { cn } from "@/lib/utils";

interface LibrasAvatarProps {
  settings: AccessibilitySettings;
  currentText?: string;
  onClose: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VLibras?: { Widget: new (url: string) => any };
    _vlibrasInitialized?: boolean;
  }
}

// Singleton: VLibras DOM structure must live for the full page lifecycle.
// We create it once and toggle visibility, never removeChild.
const VLIBRAS_ROOT_ID = "vlibras-root";

function ensureVLibrasRoot(): HTMLElement {
  let root = document.getElementById(VLIBRAS_ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = VLIBRAS_ROOT_ID;
    // VLibras creates its own CSS & positioning — don't override
    document.body.appendChild(root);

    // Required child structure for VLibras SDK
    const accessBtn = document.createElement("div");
    accessBtn.setAttribute("vw-access-button", "");
    accessBtn.className = "active";

    const wrapper = document.createElement("div");
    wrapper.setAttribute("vw-plugin-wrapper", "");
    const inner = document.createElement("div");
    inner.className = "vw-plugin-top-wrapper";
    wrapper.appendChild(inner);

    root.appendChild(accessBtn);
    root.appendChild(wrapper);

    // The `vw` attribute (no value) activates the plugin
    root.setAttribute("vw", "");
    root.setAttribute("class", "enabled");
  }
  return root;
}

export function LibrasAvatar({ settings, currentText, onClose }: LibrasAvatarProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    // Ensure the VLibras DOM root exists (idempotent)
    ensureVLibrasRoot();

    // If already initialized globally, we're done
    if (window._vlibrasInitialized) {
      setStatus("ready");
      return;
    }

    // Check if script already loaded
    if (window.VLibras?.Widget) {
      initWidget();
      return;
    }

    // Load the VLibras script once
    if (!document.getElementById("vlibras-script")) {
      const script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = () => initWidget();
      script.onerror = () => setStatus("error");
      document.head.appendChild(script);
    } else {
      // Script tag exists but VLibras not yet on window — wait a bit
      const t = setTimeout(() => {
        if (window.VLibras?.Widget) initWidget();
        else setStatus("error");
      }, 3000);
      return () => clearTimeout(t);
    }
  // We intentionally run this only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initWidget() {
    try {
      if (!window.VLibras?.Widget) { setStatus("error"); return; }
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      window._vlibrasInitialized = true;
      setStatus("ready");
    } catch (e) {
      console.error("VLibras init error:", e);
      setStatus("error");
    }
  }

  const badgePos = {
    "bottom-right": "bottom-40 right-4",
    "bottom-left":  "bottom-40 left-4",
    "top-right":    "top-20 right-4",
    "top-left":     "top-20 left-4",
  }[settings.librasPosition];

  return (
    <AnimatePresence>
      <motion.div
        className={cn("fixed z-[8990] flex flex-col gap-2 items-end", badgePos)}
        initial={{ opacity: 0, scale: 0.88, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {/* Live caption */}
        <AnimatePresence>
          {status === "ready" && currentText && (
            <motion.div
              key={currentText.slice(0, 30)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-[220px] px-3 py-2 rounded-xl bg-gray-900/95 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Languages className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Traduzindo</span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{currentText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status badge */}
        <div className={cn(
          "flex items-center gap-2 pl-3 pr-2 py-2 rounded-2xl border shadow-xl backdrop-blur-md",
          status === "ready"
            ? "bg-emerald-950/90 border-emerald-500/25 text-emerald-300"
            : status === "error"
            ? "bg-red-950/90 border-red-500/25 text-red-300"
            : "bg-gray-900/90 border-white/15 text-white/60"
        )}>
          {status === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />}
          {status === "ready"   && <Hand className="w-3.5 h-3.5 flex-shrink-0" />}
          {status === "error"   && <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}

          <div className="text-xs leading-tight">
            {status === "loading" && <p className="font-medium">Carregando LIBRAS…</p>}
            {status === "ready"   && (
              <>
                <p className="font-semibold">LIBRAS ativo</p>
                <p className="text-[10px] text-emerald-400/60">VLibras · gov.br</p>
              </>
            )}
            {status === "error" && (
              <>
                <p className="font-semibold">Indisponível</p>
                <p className="text-[10px] text-red-400/60">Verifique a conexão</p>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="ml-1 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Desativar LIBRAS"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
