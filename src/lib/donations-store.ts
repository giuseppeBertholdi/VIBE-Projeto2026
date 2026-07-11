import { supabase } from "@/lib/supabase";
import { Donation } from "@/types";

interface DonationRow {
  id: string;
  amount: number;
  name: string | null;
  message: string | null;
  status: Donation["status"];
  created_at: string;
}

function fromRow(row: DonationRow): Donation {
  return {
    id: row.id,
    amount: row.amount,
    name: row.name,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function listDonations(): Promise<Donation[]> {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as DonationRow[]).map(fromRow);
}

export async function createDonation(input: {
  amount: number;
  name: string | null;
  message: string | null;
}): Promise<Donation> {
  const { data, error } = await supabase
    .from("donations")
    .insert({ amount: input.amount, name: input.name, message: input.message, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return fromRow(data as DonationRow);
}

export async function setDonationStatus(
  id: string,
  status: Donation["status"]
): Promise<Donation | null> {
  const { data, error } = await supabase
    .from("donations")
    .update({ status })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as DonationRow) : null;
}

export async function getApprovedSummary(): Promise<{
  total: number;
  donors: { name: string; message: string | null; amount: number; createdAt: string }[];
}> {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const approved = (data as DonationRow[]).map(fromRow);

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
