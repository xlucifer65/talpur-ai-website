import { NextRequest, NextResponse } from "next/server";
import { updateService, deleteService } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt(params.id, 10);
  const body = await req.json();
  if (body.items && typeof body.items !== "string") body.items = JSON.stringify(body.items);
  const updated = updateService(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deleteService(parseInt(params.id, 10));
  return NextResponse.json({ success: true });
}
