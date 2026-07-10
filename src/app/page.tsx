import { Metadata } from "next";
import Link from "next/link";
import { Mic, Languages, Accessibility, ArrowRight } from "lucide-react";
import { ARTWORKS } from "@/lib/artworks-data";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";
import { VaquinhaSection } from "@/components/donation/VaquinhaSection";
import { JourneyTeaser } from "@/components/home/JourneyTeaser";

export const metadata: Metadata = {
  title: "V.I.B.E. — Arte que fala com você",
  description: "Converse por voz com obras-primas. IA em tempo real, LIBRAS, acessibilidade plena.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--vibe-paper)" }}>
      <Navbar />
      <AccessibilityPanel />

      <main id="main-content" style={{ paddingTop: 56 }}>

        <VaquinhaSection />

        <JourneyTeaser />

        {/* ── Hero ── */}
        <section
          className="px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto"
          aria-labelledby="hero-heading"
          style={{ borderBottom: "var(--border)" }}
        >
          <p
            className="font-mono text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "var(--vibe-yellow)" }}
          >
            Voice · Intelligence · Beauty · Experience
          </p>

          <h1
            id="hero-heading"
            className="vibe-serif leading-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "var(--vibe-ink)" }}
          >
            Arte que<br />fala com<br />
            <span style={{ color: "var(--vibe-yellow)", fontStyle: "italic" }}>você.</span>
          </h1>

          <p
            className="text-base leading-relaxed mb-10 max-w-md"
            style={{ color: "rgba(27,24,17,0.5)" }}
          >
            Converse por voz com um especialista de IA. Descubra histórias ocultas e contexto histórico de cada obra.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { Icon: Mic,           label: "Voz Realtime",  color: "var(--vibe-cyan)"   },
              { Icon: Languages,     label: "LIBRAS",         color: "var(--vibe-yellow)" },
              { Icon: Accessibility, label: "WCAG 2.2 AAA",  color: "var(--vibe-pink)"   },
            ].map(({ Icon, label, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5"
                style={{ color, border: `1.5px solid ${color}`, borderRadius: "2px" }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            ))}
          </div>

          <Link
            href="#gallery"
            className="brut-btn brut-btn-yellow inline-flex items-center gap-3 focus:outline-none"
          >
            Explorar Obras
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ── Gallery ── */}
        <section id="gallery" className="px-4 sm:px-6 py-14 max-w-5xl mx-auto" aria-labelledby="gallery-heading">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="vibe-label mb-2">Coleção</p>
              <h2
                id="gallery-heading"
                className="vibe-serif"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--vibe-ink)" }}
              >
                Galeria
              </h2>
            </div>
            <span
              className="font-mono text-xs font-bold uppercase tracking-widest px-2 py-1"
              style={{ color: "var(--vibe-yellow)", border: "1.5px solid var(--vibe-yellow)", borderRadius: "2px" }}
            >
              {ARTWORKS.length} obras
            </span>
          </div>

          <div className="flex flex-col" style={{ border: "var(--border)", borderRadius: "2px" }}>
            {ARTWORKS.map((artwork, i) => (
              <Link
                key={artwork.id}
                href={`/artwork/${artwork.slug}`}
                className="group flex items-center justify-between gap-4 px-4 py-4 focus:outline-none transition-colors"
                style={{
                  borderBottom: i < ARTWORKS.length - 1 ? "1px solid rgba(27,24,17,0.08)" : "none",
                  textDecoration: "none",
                }}
                aria-label={`Explorar ${artwork.title}`}
              >
                {/* Index */}
                <span
                  className="font-mono text-xs font-bold flex-shrink-0 w-6"
                  style={{ color: "rgba(27,24,17,0.2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + artist */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-black text-sm uppercase tracking-tight truncate transition-colors"
                    style={{ color: "var(--vibe-white)" }}
                  >
                    {artwork.title}
                  </p>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: "rgba(27,24,17,0.4)" }}
                  >
                    {artwork.artist.name}
                  </p>
                </div>

                {/* Year */}
                <span
                  className="font-mono text-xs flex-shrink-0 hidden sm:block"
                  style={{ color: "rgba(27,24,17,0.25)" }}
                >
                  {artwork.year}
                </span>

                {/* Movement */}
                {artwork.movements[0] && (
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 flex-shrink-0 hidden md:block"
                    style={{
                      color: "rgba(27,24,17,0.4)",
                      border: "1px solid rgba(27,24,17,0.12)",
                      borderRadius: "2px",
                    }}
                  >
                    {artwork.movements[0]}
                  </span>
                )}

                {/* Arrow */}
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: "rgba(27,24,17,0.2)" }}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="px-4 sm:px-6 py-8 text-center"
          style={{ borderTop: "var(--border)" }}
          role="contentinfo"
        >
          <p
            className="font-black text-sm tracking-tight mb-1"
          >
            V<span style={{ color: "var(--vibe-yellow)" }}>.</span>I
            <span style={{ color: "var(--vibe-yellow)" }}>.</span>B
            <span style={{ color: "var(--vibe-yellow)" }}>.</span>E
            <span style={{ color: "var(--vibe-yellow)" }}>.</span>
          </p>
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "rgba(27,24,17,0.2)" }}
          >
            WCAG 2.2 AAA · VLibras · OpenAI Realtime
          </p>
        </footer>
      </main>
    </div>
  );
}
