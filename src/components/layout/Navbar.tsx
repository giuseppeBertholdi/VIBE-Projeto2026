"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/",               label: "Galeria" },
  { href: "/nossa-jornada",  label: "Nossa Jornada" },
  { href: "/about",          label: "Sobre" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      {/* Masthead rule */}
      <div style={{ height: 3, background: "linear-gradient(90deg, var(--vibe-yellow), var(--vibe-pink) 55%, var(--vibe-cyan))" }} />

      <div
        style={{
          background: "rgba(243,238,225,0.94)",
          backdropFilter: "blur(8px)",
          borderBottom: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[52px]">
          {/* Wordmark */}
          <Link
            href="/"
            className="focus:outline-none flex-shrink-0"
            aria-label="V.I.B.E. — Página inicial"
            style={{ textDecoration: "none" }}
          >
            <span className="vibe-serif text-lg sm:text-xl tracking-tight" style={{ color: "var(--vibe-ink)" }}>
              V<span style={{ color: "var(--vibe-yellow)" }}>.</span>I
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>B
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>E
              <span style={{ color: "var(--vibe-yellow)" }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-1">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="group relative px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors"
                  style={{
                    color: active ? "var(--vibe-ink)" : "rgba(27,24,17,0.55)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                  <span
                    className={cn(
                      "pointer-events-none absolute left-3 right-3 -bottom-[1px] h-[2px] transition-transform origin-left",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    style={{ background: "var(--vibe-yellow)" }}
                  />
                </Link>
              );
            })}
            <Link
              href="/#vaquinha"
              className="flex items-center gap-1.5 ml-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5"
              style={{
                color: "var(--vibe-paper)",
                background: "var(--vibe-pink)",
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Doar</span>
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2 flex-shrink-0">
            <Link
              href="/#vaquinha"
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest"
              style={{
                color: "var(--vibe-paper)",
                background: "var(--vibe-pink)",
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Doar</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(p => !p)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="flex items-center justify-center w-8 h-8 flex-shrink-0 focus:outline-none"
              style={{ color: "var(--vibe-ink)" }}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <nav
            aria-label="Navegação principal (mobile)"
            className="md:hidden flex flex-col px-4 sm:px-6 pb-3"
          >
            {LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-bold uppercase tracking-widest"
                  style={{
                    color: active ? "var(--vibe-ink)" : "rgba(27,24,17,0.55)",
                    borderTop: "1px solid rgba(27,24,17,0.1)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
