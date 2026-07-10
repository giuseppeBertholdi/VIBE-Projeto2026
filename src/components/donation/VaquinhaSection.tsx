"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart, Copy, Check, Loader2 } from "lucide-react";

const GOAL = 80000;
const PIX_KEY = "wro.vibe@gmail.com";

interface Donor {
  name: string;
  message: string | null;
  amount: number;
  createdAt: string;
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `${mins}min atrás`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h atrás`;
  return `${Math.floor(hours / 24)}d atrás`;
}

export function VaquinhaSection() {
  const [total, setTotal] = useState<number | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/donations", { cache: "no-store" });
      const data = await res.json();
      setTotal(data.total ?? 0);
      setDonors(data.donors ?? []);
    } catch {
      setTotal(prev => prev ?? 0);
    }
  }, []);

  useEffect(() => { loadSummary(); }, [loadSummary]);

  const percent = Math.min(100, Math.round(((total ?? 0) / GOAL) * 100));

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — user can still select the text manually
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(amount.replace(",", "."));
    if (!parsed || parsed <= 0) {
      setSubmitState("error");
      setSubmitError("Informe um valor válido.");
      return;
    }
    setSubmitting(true);
    setSubmitState("idle");
    setSubmitError(null);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsed,
          anonymous,
          name: anonymous ? null : name,
          message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Falha ao enviar.");
      }
      setSubmitState("success");
      setAmount(""); setName(""); setMessage(""); setAnonymous(false);
    } catch (err) {
      setSubmitState("error");
      setSubmitError(err instanceof Error ? err.message : "Falha ao enviar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="vaquinha"
      className="px-4 sm:px-6 py-14 sm:py-20 max-w-5xl mx-auto"
      aria-labelledby="vaquinha-heading"
      style={{ borderBottom: "var(--border)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-4 h-4" style={{ color: "var(--vibe-pink)" }} />
        <p className="vibe-label" style={{ color: "var(--vibe-pink)" }}>
          Vaquinha V.I.B.E.
        </p>
      </div>

      <h2
        id="vaquinha-heading"
        className="vibe-serif leading-tight mb-4"
        style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", color: "var(--vibe-ink)" }}
      >
        Ajude a levar o<br />
        <span style={{ color: "var(--vibe-pink)", fontStyle: "italic" }}>V.I.B.E.</span> mais longe.
      </h2>

      <p
        className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
        style={{ color: "rgba(27,24,17,0.55)" }}
      >
        Somos uma equipe de estudantes que representou o Brasil na WRO Américas 2025. Sua doação ajuda a custear viagens, materiais e o desenvolvimento do protótipo para as próximas competições internacionais.
      </p>

      {/* ── Progress bar ── */}
      <div className="mb-3" style={{ border: "var(--border)", borderRadius: "2px", height: 20 }}>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent}% da meta arrecadado`}
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "var(--vibe-pink)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-black text-2xl sm:text-3xl tracking-tight" style={{ color: "var(--vibe-ink)" }}>
            {total === null ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /></span>
            ) : formatBRL(total)}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest mt-1" style={{ color: "rgba(27,24,17,0.4)" }}>
            arrecadados de {formatBRL(GOAL)}
          </p>
        </div>
        <span
          className="font-mono text-sm font-bold uppercase tracking-widest px-3 py-1.5"
          style={{ color: "var(--vibe-pink)", border: "1.5px solid var(--vibe-pink)", borderRadius: "2px" }}
        >
          {percent}% da meta
        </span>
      </div>

      {/* ── PIX card ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-3"
        style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-surface)" }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(27,24,17,0.4)" }}>
            Chave PIX (e-mail)
          </p>
          <p className="font-bold text-sm sm:text-base" style={{ color: "var(--vibe-ink)" }}>{PIX_KEY}</p>
        </div>
        <button
          type="button"
          onClick={handleCopyPix}
          className="brut-btn brut-btn-pink inline-flex items-center gap-2 focus:outline-none"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copiado!" : "Copiar chave"}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFormOpen(p => !p)}
        className="font-mono text-xs font-bold uppercase tracking-widest underline focus:outline-none mb-8"
        style={{ color: "var(--vibe-ink)" }}
      >
        {formOpen ? "Fechar formulário" : "Já fiz o PIX — registrar minha doação"}
      </button>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 px-4 py-5 flex flex-col gap-4"
          style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-surface)" }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "rgba(27,24,17,0.55)" }}>
            Conta pra gente quanto você mandou. Sua doação entra na meta assim que a gente confirmar o recebimento do PIX.
          </p>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.5)" }}>Valor (R$)</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="50"
              required
              className="px-3 py-2 text-sm focus:outline-none"
              style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-paper)", color: "var(--vibe-ink)" }}
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm" style={{ color: "var(--vibe-ink)" }}>Prefiro doar anonimamente</span>
          </label>

          {!anonymous && (
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.5)" }}>Seu nome</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Como quer aparecer no mural"
                maxLength={60}
                className="px-3 py-2 text-sm focus:outline-none"
                style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-paper)", color: "var(--vibe-ink)" }}
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(27,24,17,0.5)" }}>Mensagem (opcional)</span>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Deixe uma mensagem para a equipe"
              maxLength={280}
              rows={2}
              className="px-3 py-2 text-sm resize-none focus:outline-none"
              style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-paper)", color: "var(--vibe-ink)" }}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="brut-btn brut-btn-yellow inline-flex items-center gap-2 justify-center focus:outline-none disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Enviar registro
          </button>

          {submitState === "success" && (
            <p className="text-xs font-bold" style={{ color: "var(--vibe-cyan)" }}>
              Recebemos! Assim que confirmarmos o PIX, sua doação entra na meta.
            </p>
          )}
          {submitState === "error" && (
            <p className="text-xs font-bold" style={{ color: "var(--vibe-pink)" }}>
              {submitError}
            </p>
          )}
        </form>
      )}

      {/* ── Donor wall ── */}
      <div>
        <p className="vibe-label mb-4">Quem já apoiou</p>
        {donors.length === 0 ? (
          <p className="text-sm" style={{ color: "rgba(27,24,17,0.4)" }}>
            Seja a primeira pessoa a aparecer aqui.
          </p>
        ) : (
          <div className="flex flex-col">
            {donors.map((d, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 py-3"
                style={{ borderTop: i > 0 ? "1px solid rgba(27,24,17,0.08)" : "none" }}
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm" style={{ color: "var(--vibe-ink)" }}>{d.name}</p>
                  {d.message && (
                    <p className="text-xs mt-0.5" style={{ color: "rgba(27,24,17,0.55)" }}>{d.message}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-sm font-bold" style={{ color: "var(--vibe-pink)" }}>{formatBRL(d.amount)}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(27,24,17,0.35)" }}>{timeAgo(d.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
