import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = getAllLeads();
  return NextResponse.json(leads);
}
