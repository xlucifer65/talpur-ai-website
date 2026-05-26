import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, insertPost } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllPosts());
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const post = insertPost({
    title: body.title,
    category: body.category,
    date: body.date,
    read_time: body.read_time,
    excerpt: body.excerpt,
    tag: body.tag ?? "",
    featured: body.featured ? 1 : 0,
    slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  });
  return NextResponse.json(post, { status: 201 });
}
