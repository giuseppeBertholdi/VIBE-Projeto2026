import { NextRequest, NextResponse } from "next/server";
import { setDonationStatus } from "@/lib/donations-store";

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const status = body?.status;
  if (status !== "approved" && status !== "rejected" && status !== "pending") {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const donation = await setDonationStatus(id, status);
  if (!donation) {
    return NextResponse.json({ error: "Doação não encontrada" }, { status: 404 });
  }
  return NextResponse.json({ donation });
}
