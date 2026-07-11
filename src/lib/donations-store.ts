import { promises as fs } from "fs";
import path from "path";
import { getStore } from "@netlify/blobs";
import { Donation } from "@/types";

// Netlify Functions run on a read-only filesystem, so local JSON-file
// storage only works for `npm run dev`. In production (Netlify sets the
// NETLIFY env var), persist to Netlify Blobs instead — durable across
// deploys and cold starts, no database required.
const isNetlify = Boolean(process.env.NETLIFY);

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "donations.json");
const BLOB_KEY = "donations.json";

async function readAll(): Promise<Donation[]> {
  if (isNetlify) {
    const raw = await getStore("donations").get(BLOB_KEY, { type: "text" });
    return raw ? (JSON.parse(raw) as Donation[]) : [];
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Donation[];
  } catch {
    return [];
  }
}

async function writeAll(donations: Donation[]): Promise<void> {
  if (isNetlify) {
    await getStore("donations").set(BLOB_KEY, JSON.stringify(donations));
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(donations, null, 2), "utf-8");
}

export async function listDonations(): Promise<Donation[]> {
  return readAll();
}

export async function createDonation(input: {
  amount: number;
  name: string | null;
  message: string | null;
}): Promise<Donation> {
  const donations = await readAll();
  const donation: Donation = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    amount: input.amount,
    name: input.name,
    message: input.message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  donations.push(donation);
  await writeAll(donations);
  return donation;
}

export async function setDonationStatus(
  id: string,
  status: Donation["status"]
): Promise<Donation | null> {
  const donations = await readAll();
  const donation = donations.find(d => d.id === id);
  if (!donation) return null;
  donation.status = status;
  await writeAll(donations);
  return donation;
}

export async function getApprovedSummary(): Promise<{
  total: number;
  donors: { name: string; message: string | null; amount: number; createdAt: string }[];
}> {
  const donations = await readAll();
  const approved = donations
    .filter(d => d.status === "approved")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    total: approved.reduce((sum, d) => sum + d.amount, 0),
    donors: approved.map(d => ({
      name: d.name || "Anônimo",
      message: d.message,
      amount: d.amount,
      createdAt: d.createdAt,
    })),
  };
}
