import { NextRequest, NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt(params.id, 10);
  const body = await req.json();
  const updated = updateTestimonial(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deleteTestimonial(parseInt(params.id, 10));
  return NextResponse.json({ success: true });
}
