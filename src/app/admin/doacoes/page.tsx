"use client";

import { useState, useCallback } from "react";
import { Check, X, Loader2, Lock } from "lucide-react";
import { Donation } from "@/types";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AdminDoacoesPage() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (s: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/donations/admin", {
        headers: { "x-admin-secret": s },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Segredo inválido.");
      const data = await res.json();
      setDonations(data.donations);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  const moderate = async (id: string, status: "approved" | "rejected") => {
    await fetch(`/api/donations/${id}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ status }),
    });
    load(secret);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--vibe-paper)" }}>
        <form
          onSubmit={e => { e.preventDefault(); load(secret); }}
          className="w-full max-w-sm px-6 py-8 flex flex-col gap-4"
          style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-surface)" }}
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: "var(--vibe-ink)" }} />
            <p className="font-bold text-sm" style={{ color: "var(--vibe-ink)" }}>Painel de doações</p>
          </div>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="ADMIN_SECRET"
            className="px-3 py-2 text-sm focus:outline-none"
            style={{ border: "var(--border)", borderRadius: "2px", background: "var(--vibe-paper)", color: "var(--vibe-ink)" }}
          />
          <button type="submit" disabled={loading} className="brut-btn brut-btn-yellow justify-center inline-flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Entrar
          </button>
          {error && <p className="text-xs font-bold" style={{ color: "var(--vibe-pink)" }}>{error}</p>}
        </form>
      </div>
    );
  }

  const pending = donations.filter(d => d.status === "pending");
  const reviewed = donations.filter(d => d.status !== "pending");

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 max-w-3xl mx-auto" style={{ background: "var(--vibe-paper)" }}>
      <h1 className="vibe-serif text-2xl mb-8" style={{ color: "var(--vibe-ink)" }}>Doações — {pending.length} pendentes</h1>

      <section className="mb-12">
        <p className="vibe-label mb-4">Pendentes</p>
        {pending.length === 0 && <p className="text-sm" style={{ color: "rgba(27,24,17,0.4)" }}>Nada por aqui.</p>}
        <div className="flex flex-col gap-3">
          {pending.map(d => (
            <div key={d.id} className="flex items-center justify-between gap-4 px-4 py-3" style={{ border: "var(--border)", borderRadius: "2px" }}>
              <div className="min-w-0">
                <p className="font-bold text-sm" style={{ color: "var(--vibe-ink)" }}>
                  {formatBRL(d.amount)} — {d.name || "Anônimo"}
                </p>
                {d.message && <p className="text-xs mt-0.5" style={{ color: "rgba(27,24,17,0.55)" }}>{d.message}</p>}
                <p className="font-mono text-[10px] mt-1" style={{ color: "rgba(27,24,17,0.35)" }}>{new Date(d.createdAt).toLocaleString("pt-BR")}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => moderate(d.id, "approved")} aria-label="Aprovar" className="w-9 h-9 flex items-center justify-center" style={{ border: "1.5px solid var(--vibe-cyan)", color: "var(--vibe-cyan)", borderRadius: "2px" }}>
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => moderate(d.id, "rejected")} aria-label="Rejeitar" className="w-9 h-9 flex items-center justify-center" style={{ border: "1.5px solid var(--vibe-pink)", color: "var(--vibe-pink)", borderRadius: "2px" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="vibe-label mb-4">Histórico</p>
        <div className="flex flex-col">
          {reviewed.map((d, i) => (
            <div key={d.id} className="flex items-center justify-between gap-4 py-2.5" style={{ borderTop: i > 0 ? "1px solid rgba(27,24,17,0.08)" : "none" }}>
              <p className="text-sm" style={{ color: "var(--vibe-ink)" }}>{formatBRL(d.amount)} — {d.name || "Anônimo"}</p>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: d.status === "approved" ? "var(--vibe-cyan)" : "rgba(27,24,17,0.35)" }}>
                {d.status === "approved" ? "aprovado" : "rejeitado"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
