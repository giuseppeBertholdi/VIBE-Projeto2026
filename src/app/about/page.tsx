import { Metadata } from "next";
import Link from "next/link";
import { Landmark, Mic, Languages, Accessibility, Sparkles, Lock, Zap, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";

export const metadata: Metadata = {
  title: "Sobre — V.I.B.E.",
  description: "Sobre o projeto V.I.B.E.: democratizando o acesso à arte com inteligência artificial.",
};

const FEATURES = [
  {
    icon: Mic,
    title: "Voz em Tempo Real",
    description: "Powered by OpenAI Realtime API com WebRTC. Converse naturalmente com um especialista de IA sobre qualquer obra.",
    detail: "OpenAI gpt-realtime",
  },
  {
    icon: Languages,
    title: "LIBRAS — VLibras",
    description: "Avatar 3D de Língua Brasileira de Sinais integrado via VLibras (gov.br), traduzindo simultaneamente tudo que a IA fala.",
    detail: "Tecnologia governamental brasileira",
  },
  {
    icon: Accessibility,
    title: "WCAG 2.2 AAA",
    description: "Alto contraste, fonte para dislexia (OpenDyslexic), navegação por teclado, leitor de tela, ajuste de fonte e movimento reduzido.",
    detail: "Acessibilidade máxima",
  },
  {
    icon: Sparkles,
    title: "Descobertas Ocultas",
    description: "A IA revela teorias, simbolismos, mensagens ocultas e curiosidades que guias convencionais raramente contam.",
    detail: "Modo Descoberta",
  },
  {
    icon: Zap,
    title: "Experiência Adaptativa",
    description: "Interface que muda tematicamente com cada obra. A Noite Estrelada traz azuis profundos com partículas; Guernica usa escala monocromática.",
    detail: "Design dinâmico",
  },
  {
    icon: Lock,
    title: "Privacidade e Segurança",
    description: "Rate limiting, validação de dados, proteção contra prompt injection, sanitização de entradas e logs de auditoria.",
    detail: "Produção-ready",
  },
];

const STACK: [string, string][] = [
  ["Frontend", "Next.js, React, TypeScript"],
  ["Estilo", "Tailwind CSS, Framer Motion"],
  ["IA", "OpenAI Realtime API (GPT-4o)"],
  ["Voz", "WebRTC, Web Audio API"],
  ["Banco de Dados", "PostgreSQL + Prisma ORM"],
  ["Deploy", "Vercel Edge Network"],
  ["LIBRAS", "VLibras (Governo Federal)"],
  ["Acessibilidade", "WCAG 2.2 AAA, ARIA"],
  ["Segurança", "Rate limiting, Sanitização"],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--vibe-paper)" }}>
      <Navbar />
      <AccessibilityPanel />

      <main id="main-content" style={{ paddingTop: 56 }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* ── Header ── */}
          <div className="py-14 sm:py-16" style={{ borderBottom: "var(--border)" }}>
            <p className="vibe-label mb-3">Sobre o Projeto</p>
            <h1
              className="vibe-serif leading-tight mb-5"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", color: "var(--vibe-ink)" }}
            >
              Arte para <span style={{ color: "var(--vibe-yellow)", fontStyle: "italic" }}>todas as pessoas.</span>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: "rgba(27,24,17,0.55)" }}>
              O V.I.B.E. transforma obras de arte em experiências interativas com inteligência artificial, tornando a cultura acessível independentemente de idade, escolaridade ou deficiência.
            </p>
          </div>

          {/* ── Features ── */}
          <section className="py-12" style={{ borderBottom: "1px solid rgba(27,24,17,0.1)" }}>
            <p className="vibe-label mb-8">01 / Funcionalidades</p>
            <div className="flex flex-col">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex gap-5 py-6"
                    style={{ borderTop: i > 0 ? "1px solid rgba(27,24,17,0.08)" : "none" }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: "var(--vibe-yellow)" }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: "var(--vibe-ink)" }}>
                          {feat.title}
                        </h3>
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                          style={{ color: "rgba(27,24,17,0.45)", border: "1px solid rgba(27,24,17,0.15)", borderRadius: "999px" }}
                        >
                          {feat.detail}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.5)" }}>
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Stack ── */}
          <section className="py-12" style={{ borderBottom: "1px solid rgba(27,24,17,0.1)" }}>
            <p className="vibe-label mb-8">02 / Stack Tecnológico</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
              {STACK.map(([cat, tech]) => (
                <div key={cat}>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(27,24,17,0.4)" }}>
                    {cat}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "var(--vibe-ink)" }}>{tech}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="py-16 text-center">
            <Link
              href="/"
              className="brut-btn brut-btn-yellow inline-flex items-center gap-3 focus:outline-none"
            >
              <Landmark className="w-4 h-4" />
              Explorar a Galeria
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
