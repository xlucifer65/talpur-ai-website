import { NextRequest, NextResponse } from "next/server";
import { getAllServices, insertService } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllServices());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const s = insertService({
    number: body.number,
    title: body.title,
    items: typeof body.items === "string" ? body.items : JSON.stringify(body.items ?? []),
    insight: body.insight,
    sort_order: body.sort_order ?? 99,
  });
  return NextResponse.json(s, { status: 201 });
}
