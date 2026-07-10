import { NextRequest, NextResponse } from "next/server";
import { createDonation, getApprovedSummary } from "@/lib/donations-store";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(key);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT_MAP.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

const GOAL = 80000;

export async function GET() {
  const { total, donors } = await getApprovedSummary();
  return NextResponse.json(
    { total, goal: GOAL, percent: Math.min(100, Math.round((total / GOAL) * 100)), donors },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas requisições. Aguarde 1 minuto." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.amount !== "number" || !isFinite(body.amount)) {
    return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
  }
  const amount = Math.round(body.amount * 100) / 100;
  if (amount <= 0 || amount > 1_000_000) {
    return NextResponse.json({ error: "Valor fora do intervalo permitido." }, { status: 400 });
  }

  const anonymous = Boolean(body.anonymous);
  const name = !anonymous && typeof body.name === "string" ? body.name.trim().slice(0, 60) : null;
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 280) || null : null;

  const donation = await createDonation({ amount, name, message });

  return NextResponse.json(
    { id: donation.id, status: donation.status },
    { headers: { "Cache-Control": "no-store" } }
  );
}
