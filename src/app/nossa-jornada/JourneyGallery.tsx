"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = [
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.15 (1).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.15.jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.16.jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.17 (1).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.17 (2).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.17.jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.18 (1).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.18 (2).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.18 (3).jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.18.jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.19.jpeg",
  "/team-images/WhatsApp Image 2026-02-28 at 08.43.20 (1).jpeg",
];

export function JourneyGallery() {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive(i => i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const next = () => setActive(i => i === null ? null : (i + 1) % GALLERY_IMAGES.length);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GALLERY_IMAGES.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="relative overflow-hidden group focus:outline-none"
            style={{
              aspectRatio: "4/3",
              border: "var(--border)",
              borderRadius: "2px",
              background: "var(--vibe-surface)",
              transition: "box-shadow 0.12s, transform 0.12s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)";
              (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
              (e.currentTarget as HTMLElement).style.transform = "";
            }}
            aria-label={`Ver foto ${i + 1}`}
          >
            <Image
              src={encodeURI(src)}
              alt={`Foto da equipe V.I.B.E. ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-2"
              style={{ background: "rgba(10,10,10,0.35)" }}
            >
              <span
                className="font-mono text-[10px] font-bold"
                style={{ color: "var(--vibe-yellow)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(6px)" }}
          onClick={() => setActive(null)}
        >
          {/* Close */}
          <button
            type="button"
            className="absolute top-4 right-4 focus:outline-none font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
            style={{ color: "rgba(27,24,17,0.5)" }}
            onClick={() => setActive(null)}
          >
            <X className="w-4 h-4" />
            Fechar
          </button>

          {/* Counter */}
          <div
            className="absolute top-4 left-4 font-mono text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(27,24,17,0.35)" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(GALLERY_IMAGES.length).padStart(2, "0")}
          </div>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl"
            style={{ maxHeight: "80vh", aspectRatio: "16/10" }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                border: "var(--border)",
                boxShadow: "var(--shadow-yellow)",
                borderRadius: "2px",
                overflow: "hidden",
                background: "var(--vibe-surface)",
              }}
            >
              <Image
                src={encodeURI(GALLERY_IMAGES[active])}
                alt={`Foto ampliada ${active + 1}`}
                fill
                className="object-contain p-2"
                sizes="90vw"
              />
            </div>
          </div>

          {/* Prev */}
          <button
            type="button"
            className="absolute left-2 sm:left-6 focus:outline-none"
            style={{
              color: "rgba(27,24,17,0.5)",
              border: "1.5px solid rgba(27,24,17,0.2)",
              borderRadius: "2px",
              padding: "8px",
              background: "rgba(10,10,10,0.6)",
            }}
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            type="button"
            className="absolute right-2 sm:right-6 focus:outline-none"
            style={{
              color: "rgba(27,24,17,0.5)",
              border: "1.5px solid rgba(27,24,17,0.2)",
              borderRadius: "2px",
              padding: "8px",
              background: "rgba(10,10,10,0.6)",
            }}
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Próxima"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
