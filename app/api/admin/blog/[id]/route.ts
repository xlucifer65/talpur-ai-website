import { NextRequest, NextResponse } from "next/server";
import { updatePost, deletePost } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = parseInt(params.id, 10);
  const body = await req.json();
  if (body.featured !== undefined) body.featured = body.featured ? 1 : 0;
  const updated = updatePost(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deletePost(parseInt(params.id, 10));
  return NextResponse.json({ success: true });
}
