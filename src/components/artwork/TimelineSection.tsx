"use client";

import { motion } from "framer-motion";
import { User, Globe, Paintbrush, Star } from "lucide-react";
import { Artwork } from "@/types";

interface TimelineSectionProps {
  artwork: Artwork;
}

const CATEGORY_CONFIG = {
  ARTIST_LIFE:      { icon: User,       color: "var(--vibe-cyan)",   label: "Artista"   },
  HISTORICAL_EVENT: { icon: Globe,      color: "var(--vibe-pink)",   label: "Histórico" },
  ARTWORK_CREATION: { icon: Paintbrush, color: "var(--vibe-yellow)", label: "Obra"      },
  ARTISTIC_MOVEMENT:{ icon: Star,       color: "var(--vibe-white)",  label: "Movimento" },
  WORLD_EVENT:      { icon: Globe,      color: "rgba(27,24,17,0.5)", label: "Mundo"  },
};

function generateTimeline(artwork: Artwork) {
  const events = [...(artwork.timelineEvents || [])];

  if (events.length === 0) {
    const artist = artwork.artist;
    if (artist.birthYear) {
      events.push({
        id: "birth", artworkId: artwork.id, year: artist.birthYear,
        title: `Nascimento de ${artist.name}`,
        description: `${artist.name} nasce em ${artist.nationality || "lugar desconhecido"}.`,
        category: "ARTIST_LIFE" as const,
      });
    }
    if (artwork.year) {
      events.push({
        id: "creation", artworkId: artwork.id, year: artwork.year,
        title: `Criação de "${artwork.title}"`,
        description: `${artwork.title} é criada por ${artist.name}.`,
        category: "ARTWORK_CREATION" as const,
      });
    }
    if (artist.deathYear) {
      events.push({
        id: "death", artworkId: artwork.id, year: artist.deathYear,
        title: `Morte de ${artist.name}`,
        description: `${artist.name} falece, deixando um legado eterno.`,
        category: "ARTIST_LIFE" as const,
      });
    }
  }

  return events.sort((a, b) => a.year - b.year);
}

export function TimelineSection({ artwork }: TimelineSectionProps) {
  const events = generateTimeline(artwork);

  return (
    <section aria-labelledby="timeline-heading">
      <h2
        id="timeline-heading"
        className="font-black uppercase tracking-tight text-sm mb-5"
        style={{ color: "rgba(27,24,17,0.4)" }}
      >
        Linha do Tempo
      </h2>

      <div className="relative">
        {/* Vertical rule */}
        <div
          className="absolute left-[22px] top-0 bottom-0 w-px"
          style={{ background: "rgba(27,24,17,0.1)" }}
          aria-hidden="true"
        />

        <div className="space-y-0">
          {events.map((event, i) => {
            const config = CATEGORY_CONFIG[event.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={event.id}
                className="flex gap-4 relative pl-14 pb-5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                {/* Icon marker */}
                <div
                  className="absolute left-2.5 flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 24, height: 24,
                    background: "var(--vibe-surface)",
                    border: `1.5px solid ${config.color}`,
                    borderRadius: "2px",
                    color: config.color,
                  }}
                  aria-hidden="true"
                >
                  <Icon className="w-3 h-3" />
                </div>

                {/* Content */}
                <div
                  className="flex-1 min-w-0 p-3"
                  style={{ border: "var(--border)", borderRadius: "2px", background: "rgba(27,24,17,0.02)" }}
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: config.color }}
                    >
                      {event.year}
                    </span>
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5"
                      style={{
                        color: config.color,
                        border: `1px solid ${config.color}`,
                        borderRadius: "2px",
                        opacity: 0.7,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-wide mb-0.5" style={{ color: "var(--vibe-white)" }}>
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.5)" }}>
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
