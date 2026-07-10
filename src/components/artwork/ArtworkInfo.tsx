"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Layers, Palette, Ruler } from "lucide-react";
import { Artwork } from "@/types";

interface ArtworkInfoProps {
  artwork: Artwork;
}

export function ArtworkInfo({ artwork }: ArtworkInfoProps) {
  const infoItems = [
    { icon: Calendar, label: "Ano",        value: artwork.year?.toString() },
    { icon: Palette,  label: "Técnica",    value: artwork.medium },
    { icon: Ruler,    label: "Dimensões",  value: artwork.dimensions },
    { icon: MapPin,   label: "Localização", value: artwork.location },
    { icon: Layers,   label: "Movimentos", value: artwork.movements.join(", ") },
  ].filter(item => item.value);

  return (
    <section aria-labelledby="artwork-info-heading">
      <h2 id="artwork-info-heading" className="sr-only">Informações da Obra</h2>

      {/* Title block */}
      <motion.div
        className="mb-5 pb-5"
        style={{ borderBottom: "var(--border)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="font-black uppercase tracking-tight leading-tight mb-1"
          style={{ fontSize: "1.4rem", color: "var(--vibe-white)" }}
        >
          {artwork.title}
        </h1>
        <p className="text-sm font-bold" style={{ color: "rgba(27,24,17,0.5)" }}>
          {artwork.artist.name}
        </p>
        {artwork.year && (
          <p className="font-mono text-xs mt-0.5 uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.3)" }}>
            {artwork.year}
          </p>
        )}
      </motion.div>

      {/* Description */}
      {artwork.description && (
        <motion.p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "rgba(27,24,17,0.65)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
        >
          {artwork.description}
        </motion.p>
      )}

      {/* Info grid */}
      <motion.div
        className="mb-5 space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        {infoItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 py-2.5"
              style={{ borderBottom: i < infoItems.length - 1 ? "1px solid rgba(27,24,17,0.08)" : "none" }}
            >
              <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--vibe-yellow)" }} />
              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest block mb-0.5"
                  style={{ color: "rgba(27,24,17,0.3)" }}
                >
                  {item.label}
                </span>
                <p className="text-sm" style={{ color: "rgba(27,24,17,0.75)" }}>{item.value}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Tags */}
      {artwork.tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
        >
          {artwork.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
              style={{
                color: "rgba(27,24,17,0.45)",
                border: "1.5px solid rgba(27,24,17,0.15)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}
    </section>
  );
}
