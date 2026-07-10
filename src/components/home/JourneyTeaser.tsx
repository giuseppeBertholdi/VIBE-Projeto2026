import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

export function JourneyTeaser() {
  return (
    <section
      className="px-4 sm:px-6 py-14 max-w-5xl mx-auto"
      aria-labelledby="journey-teaser-heading"
      style={{ borderBottom: "var(--border)" }}
    >
      <p className="vibe-label mb-3">Nossa Jornada</p>

      <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
        <h2
          id="journey-teaser-heading"
          className="vibe-serif leading-tight"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", color: "var(--vibe-ink)" }}
        >
          Do protótipo ao<br />
          <span style={{ color: "var(--vibe-yellow)", fontStyle: "italic" }}>1º lugar</span> nas Américas.
        </h2>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Trophy className="w-4 h-4" style={{ color: "var(--vibe-yellow)" }} />
          <span
            className="font-mono text-xs font-bold uppercase tracking-widest px-2 py-1"
            style={{ color: "var(--vibe-yellow)", border: "1.5px solid var(--vibe-yellow)", borderRadius: "2px" }}
          >
            WRO Américas 2025
          </span>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed mb-8 max-w-lg"
        style={{ color: "rgba(27,24,17,0.5)" }}
      >
        Conheça a equipe por trás do V.I.B.E. e a trajetória que nos levou da concepção do projeto ao título continental da WRO.
      </p>

      <Link
        href="/nossa-jornada"
        className="brut-btn brut-btn-ghost inline-flex items-center gap-3 focus:outline-none"
        style={{ border: "var(--border)" }}
      >
        Conheça nossa jornada
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
