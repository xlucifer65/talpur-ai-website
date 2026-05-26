import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import type { Lead } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { status, notes } = await req.json();
  const updated = updateLeadStatus(id, status as Lead["status"], notes);

  if (!updated) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
