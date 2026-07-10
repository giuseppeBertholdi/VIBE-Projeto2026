import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 10;
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

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas requisições. Aguarde 1 minuto." }, { status: 429 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return NextResponse.json(
      { error: "OPENAI_API_KEY não configurada no arquivo .env.local" },
      { status: 500 }
    );
  }

  // Validate body
  let artworkId = "";
  try {
    const body = await req.json();
    artworkId = typeof body.artworkId === "string" ? body.artworkId.slice(0, 64) : "";
  } catch { /* optional */ }

  const res = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: {
        type: "realtime",
        model: "gpt-realtime",
        audio: { output: { voice: "alloy" } },
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("[realtime/token] client_secrets error:", res.status, errBody);
    return NextResponse.json(
      { error: (errBody as { error?: { message?: string } }).error?.message || "Falha ao criar sessão Realtime" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
