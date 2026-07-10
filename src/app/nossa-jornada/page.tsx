import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trophy, Globe, Cpu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";

export const metadata: Metadata = {
  title: "Nossa Jornada — V.I.B.E.",
  description: "Conheça a equipe e a trajetória do projeto V.I.B.E., da concepção ao reconhecimento internacional.",
};

const team = [
  { index: "01", name: "Giuseppe Bertholdi",   role: "Desenvolvedor & Engenheiro",   description: "Lidera a arquitetura técnica do V.I.B.E., conectando hardware, software e IA." },
  { index: "02", name: "Guilherme Pedersetti", role: "Escritor & Diretor Criativo",   description: "Responsável pela narrativa do projeto e pela apresentação criativa da solução." },
  { index: "03", name: "Pedro Furlan",          role: "Escritor & Engenheiro",         description: "Atua no desenvolvimento e na estruturação técnica dos protótipos e testes." },
  { index: "04", name: "Junior Pedersetti",     role: "Coach",                         description: "Orienta a equipe na estratégia, preparo para competições e tomada de decisão." },
];

const timeline = [
  { period: "Início 2025", title: "Concepção",              description: "Idealização do V.I.B.E. e primeiros estudos sobre IA aplicada à saúde ocupacional.", accent: false  },
  { period: "Ago 2025",    title: "WRO Brasil — 2º Lugar",  description: "Conquista do 2º lugar na competição nacional WRO Brasil, validando o conceito.", accent: false  },
  { period: "Set 2025",    title: "Evolução do Protótipo",  description: "Testes intensos, melhorias de precisão nos algoritmos e refinamento do hardware.", accent: false  },
  { period: "Out 2025",    title: "WRO Américas — 1º Lugar", description: "Campeões da competição continental. Reconhecimento internacional do V.I.B.E.", accent: true   },
];

const pillars = [
  { num: "01", title: "Visão Computacional", text: "Analisa expressões faciais e postura corporal em tempo real para identificar padrões." },
  { num: "02", title: "Inteligência Artificial", text: "Processa dados comportamentais para identificar sinais precoces de estresse e fadiga." },
  { num: "03", title: "Saúde Ocupacional", text: "Apoia equipes de saúde com insights acionáveis, sem realizar diagnósticos médicos." },
];

export default function NossaJornadaPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--vibe-paper)" }}>
      <Navbar />
      <AccessibilityPanel />

      <main id="main-content" style={{ paddingTop: 56 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* ── Header ── */}
          <div className="py-12" style={{ borderBottom: "var(--border)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-8 focus:outline-none"
              style={{ color: "rgba(27,24,17,0.3)", textDecoration: "none" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Galeria
            </Link>

            <p className="font-mono text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(27,24,17,0.3)" }}>
              V.I.B.E. — Equipe & Projeto
            </p>
            <h1
              className="vibe-serif leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--vibe-ink)" }}
            >
              Nossa <span style={{ fontStyle: "italic", color: "var(--vibe-yellow)" }}>Jornada</span>
            </h1>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "rgba(27,24,17,0.45)" }}>
              Do conceito inicial à conquista continental — a história do robô que analisa bem-estar humano com inteligência artificial.
            </p>
          </div>

          {/* ── 01 Sobre ── */}
          <section className="py-12" style={{ borderBottom: "1px solid rgba(27,24,17,0.08)" }}>
            <p className="vibe-label mb-8">01 / Sobre o Projeto</p>

            <p className="text-sm leading-[1.85] mb-4" style={{ color: "rgba(27,24,17,0.65)" }}>
              O V.I.B.E. nasceu em 2025 como um robô projetado para circular em parques fabris, analisando expressões faciais, postura e ritmo de trabalho para identificar padrões que possam indicar sinais de estresse, fadiga ou outras condições.
            </p>
            <p className="text-sm leading-[1.85] mb-10" style={{ color: "rgba(27,24,17,0.65)" }}>
              O sistema não realiza diagnósticos — ele atua como ferramenta de apoio, enviando insights para equipes de saúde ocupacional.
            </p>

            <div className="flex flex-col gap-6">
              {pillars.map(p => (
                <div key={p.num} className="flex gap-5">
                  <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: "var(--vibe-yellow)" }}>{p.num}</span>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-1" style={{ color: "var(--vibe-white)" }}>{p.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.45)" }}>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 Conquistas ── */}
          <section className="py-12" style={{ borderBottom: "1px solid rgba(27,24,17,0.08)" }}>
            <p className="vibe-label mb-8">02 / Conquistas</p>

            {[
              { rank: "2", sup: "o", label: "WRO Brasil 2025",   sub: "Segundo lugar na competição nacional", color: "var(--vibe-white)"  },
              { rank: "1", sup: "o", label: "WRO Américas 2025", sub: "Campeões da competição continental",   color: "var(--vibe-yellow)" },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-end gap-6 py-8"
                style={{ borderTop: "var(--border)" }}
              >
                <div className="flex items-baseline gap-1 flex-shrink-0">
                  <span className="font-black leading-none" style={{ fontSize: "clamp(3rem,9vw,5rem)", color: a.color }}>{a.rank}</span>
                  <span className="font-bold text-lg align-super mb-1" style={{ color: a.color }}>{a.sup}</span>
                  <Trophy className="w-4 h-4 mb-1 ml-1" style={{ color: a.color }} />
                </div>
                <div className="pb-1">
                  <h3 className="font-black text-sm uppercase tracking-tight" style={{ color: "var(--vibe-white)" }}>{a.label}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest mt-1" style={{ color: "rgba(27,24,17,0.3)" }}>{a.sub}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "var(--border)" }} />
          </section>

          {/* ── 03 Linha do Tempo ── */}
          <section className="py-12" style={{ borderBottom: "1px solid rgba(27,24,17,0.08)" }}>
            <p className="vibe-label mb-8">03 / Linha do Tempo</p>

            <div className="flex flex-col">
              {timeline.map((ev, i) => (
                <div
                  key={i}
                  className="flex gap-6 py-6"
                  style={{ borderTop: "1px solid rgba(27,24,17,0.08)" }}
                >
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider flex-shrink-0 w-24"
                    style={{ color: ev.accent ? "var(--vibe-yellow)" : "rgba(27,24,17,0.3)" }}
                  >
                    {ev.period}
                  </span>
                  <div>
                    <h3
                      className="font-bold text-sm uppercase tracking-tight mb-1.5"
                      style={{ color: ev.accent ? "var(--vibe-yellow)" : "var(--vibe-white)" }}
                    >
                      {ev.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.45)" }}>
                      {ev.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 Equipe ── */}
          <section className="py-12">
            <p className="vibe-label mb-8">04 / Equipe</p>

            <div className="flex flex-col">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className="flex gap-6 py-6"
                  style={{ borderTop: "1px solid rgba(27,24,17,0.08)" }}
                >
                  <span
                    className="font-mono text-xs font-bold flex-shrink-0 w-6 pt-0.5"
                    style={{ color: "rgba(27,24,17,0.2)" }}
                  >
                    {member.index}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-black text-sm uppercase tracking-tight" style={{ color: "var(--vibe-white)" }}>
                        {member.name}
                      </h3>
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                        style={{ color: "rgba(27,24,17,0.4)", border: "1px solid rgba(27,24,17,0.12)", borderRadius: "2px" }}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.45)" }}>
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Footer strip ── */}
        <div
          className="px-4 sm:px-6 py-8 text-center"
          style={{ borderTop: "var(--border)" }}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="font-black text-sm tracking-tight">
              V<span style={{ color: "var(--vibe-yellow)" }}>.</span>I
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>B
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>E
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>
            </span>
            <span style={{ color: "rgba(27,24,17,0.15)" }}>·</span>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: "var(--vibe-cyan)" }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.3)" }}>
                WRO Américas 2025
              </span>
            </div>
            <span style={{ color: "rgba(27,24,17,0.15)" }}>·</span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" style={{ color: "var(--vibe-yellow)" }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.3)" }}>
                Saúde Ocupacional + IA
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
