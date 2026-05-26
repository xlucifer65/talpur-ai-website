import { NextRequest, NextResponse } from "next/server";
import { getAllSettings, updateSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllSettings());
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected object" }, { status: 400 });
  }
  updateSettings(body as Record<string, string>);
  return NextResponse.json(getAllSettings());
}
