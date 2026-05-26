import { NextRequest, NextResponse } from "next/server";
import { getAllTestimonials, insertTestimonial } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllTestimonials());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const t = insertTestimonial({
    quote: body.quote,
    name: body.name,
    role: body.role,
    initials: body.initials || body.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2),
    sort_order: body.sort_order ?? 99,
  });
  return NextResponse.json(t, { status: 201 });
}
