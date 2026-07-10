import { NextRequest, NextResponse } from "next/server";
import { listDonations } from "@/lib/donations-store";

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const donations = await listDonations();
  donations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ donations }, { headers: { "Cache-Control": "no-store" } });
}
