"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { AccessibilitySettings } from "@/types";

const DEFAULT_SETTINGS: AccessibilitySettings = {
  librasEnabled: false,
  librasSize: "medium",
  librasPosition: "bottom-right",
  librasPinned: false,
  highContrast: false,
  dyslexiaFont: false,
  fontSize: "md",
  reducedMotion: false,
  screenReader: false,
  captionsEnabled: true,
};

const STORAGE_KEY = "museum-ai-accessibility";

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  update: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  toggleLibras: () => void;
  toggleHighContrast: () => void;
  toggleDyslexiaFont: () => void;
  toggleCaptions: () => void;
  mounted: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function useAccessibilityState(): AccessibilityContextValue {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      } catch {
        // use defaults
      }
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches;
    if (prefersReducedMotion || prefersHighContrast) {
      setSettings(prev => ({
        ...prev,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      }));
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    const root = document.documentElement;
    root.setAttribute("data-high-contrast", settings.highContrast ? "true" : "false");
    root.setAttribute("data-dyslexia", settings.dyslexiaFont ? "true" : "false");
    root.setAttribute("data-font-size", settings.fontSize);
    root.setAttribute("data-reduced-motion", settings.reducedMotion ? "true" : "false");
  }, [settings, mounted]);

  const update = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleLibras = useCallback(() => {
    setSettings(prev => ({ ...prev, librasEnabled: !prev.librasEnabled }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    setSettings(prev => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  }, []);

  const toggleCaptions = useCallback(() => {
    setSettings(prev => ({ ...prev, captionsEnabled: !prev.captionsEnabled }));
  }, []);

  return { settings, update, toggleLibras, toggleHighContrast, toggleDyslexiaFont, toggleCaptions, mounted };
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const value = useAccessibilityState();
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return ctx;
}
