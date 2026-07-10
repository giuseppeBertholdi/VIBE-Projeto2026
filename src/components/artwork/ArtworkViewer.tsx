"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, Eye, X } from "lucide-react";
import { Artwork, HiddenDetail } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ArtworkViewerProps {
  artwork: Artwork;
  activeDetail?: HiddenDetail | null;
  className?: string;
}

export function ArtworkViewer({ artwork, activeDetail, className }: ArtworkViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HiddenDetail | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleZoomIn  = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev / 1.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleReset = () => { setZoom(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: dragStartRef.current.posX + (e.clientX - dragStartRef.current.x),
      y: dragStartRef.current.posY + (e.clientY - dragStartRef.current.y),
    });
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ border: "var(--border)", borderRadius: "2px", boxShadow: "var(--shadow)", background: "#000" }}
    >
      {/* Image container */}
      <div
        className={cn(
          "relative overflow-hidden",
          isDragging ? "cursor-grabbing" : zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
        )}
        style={{ aspectRatio: "4/3" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: zoom, x: position.x, y: position.y }}
          transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
        >
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-contain select-none"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            draggable={false}
          />

          {/* Hotspot markers */}
          <AnimatePresence>
            {showHotspots && artwork.hiddenDetails?.map(detail => (
              detail.coordinates && (
                <motion.button
                  key={detail.id}
                  className="absolute flex items-center justify-center font-bold text-xs focus:outline-none"
                  style={{
                    width: 28, height: 28,
                    left: `${detail.coordinates.x}%`,
                    top: `${detail.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: "var(--vibe-yellow)",
                    color: "var(--vibe-black)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-yellow)",
                    borderRadius: "2px",
                    zIndex: 10,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.15, x: -1, y: -1 }}
                  onClick={() => setSelectedHotspot(detail)}
                  aria-label={detail.title}
                >
                  <Eye className="w-3 h-3" />
                </motion.button>
              )
            ))}
          </AnimatePresence>

          {/* Active detail highlight */}
          {activeDetail?.coordinates && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className="absolute"
                style={{
                  left: `${activeDetail.coordinates.x - 2}%`,
                  top: `${activeDetail.coordinates.y - 2}%`,
                  width: `${(activeDetail.coordinates.width || 20) + 4}%`,
                  height: `${(activeDetail.coordinates.height || 20) + 4}%`,
                  border: "2px solid var(--vibe-yellow)",
                  boxShadow: "0 0 12px rgba(227,174,73,0.4)",
                }}
              >
                <div
                  className="absolute -top-5 left-0 font-bold text-[10px] uppercase tracking-wider px-1.5 py-0.5 whitespace-nowrap"
                  style={{
                    background: "var(--vibe-yellow)",
                    color: "var(--vibe-black)",
                    borderRadius: "2px",
                  }}
                >
                  {activeDetail.title}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {[
          { label: "Mostrar pontos de interesse", icon: <Eye className="w-3.5 h-3.5" />, onClick: () => setShowHotspots(p => !p), active: showHotspots },
          { label: "Diminuir zoom", icon: <ZoomOut className="w-3.5 h-3.5" />, onClick: handleZoomOut, disabled: zoom <= 1 },
          { label: "Aumentar zoom", icon: <ZoomIn className="w-3.5 h-3.5" />, onClick: handleZoomIn,  disabled: zoom >= 4 },
        ].map(({ label, icon, onClick, active, disabled }) => (
          <button
            key={label}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            aria-pressed={active}
            className="flex items-center justify-center focus:outline-none disabled:opacity-30"
            style={{
              width: 32, height: 32,
              background: active ? "var(--vibe-yellow)" : "rgba(10,10,10,0.85)",
              color: active ? "var(--vibe-black)" : "var(--vibe-white)",
              border: `1.5px solid ${active ? "var(--vibe-yellow)" : "rgba(27,24,17,0.3)"}`,
              borderRadius: "2px",
              backdropFilter: "blur(4px)",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {icon}
          </button>
        ))}
        {zoom > 1 && (
          <button
            onClick={handleReset}
            aria-label="Resetar zoom"
            className="flex items-center justify-center focus:outline-none"
            style={{
              width: 32, height: 32,
              background: "rgba(10,10,10,0.85)",
              color: "var(--vibe-white)",
              border: "1.5px solid rgba(27,24,17,0.3)",
              borderRadius: "2px",
              backdropFilter: "blur(4px)",
            }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Zoom indicator */}
      {zoom > 1 && (
        <div
          className="absolute top-3 left-3 font-mono text-xs font-bold px-2 py-1"
          style={{
            background: "rgba(10,10,10,0.85)",
            color: "var(--vibe-yellow)",
            border: "1.5px solid var(--vibe-yellow)",
            borderRadius: "2px",
            backdropFilter: "blur(4px)",
          }}
        >
          {zoom.toFixed(1)}×
        </div>
      )}

      {/* Hotspot popover */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            className="absolute inset-x-3 bottom-14"
            style={{
              background: "var(--vibe-surface)",
              border: "var(--border)",
              boxShadow: "var(--shadow-yellow)",
              borderRadius: "2px",
              padding: "12px 14px",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4
                  className="font-black text-sm uppercase tracking-tight mb-1"
                  style={{ color: "var(--vibe-yellow)" }}
                >
                  {selectedHotspot.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.65)" }}>
                  {selectedHotspot.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="flex-shrink-0 focus:outline-none"
                style={{ color: "rgba(27,24,17,0.4)", marginTop: "2px" }}
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
