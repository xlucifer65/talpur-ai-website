import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const body = await req.json();
  const { title, category, description, outcome, tags, image_url, url = "", featured, sort_order } = body;
  db.prepare(
    "UPDATE works SET title=?, category=?, description=?, outcome=?, tags=?, image_url=?, url=?, featured=?, sort_order=? WHERE id=?"
  ).run(title, category, description, outcome, JSON.stringify(tags), image_url, url, featured ? 1 : 0, sort_order, params.id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  db.prepare("DELETE FROM works WHERE id=?").run(params.id);
  return NextResponse.json({ ok: true });
}
