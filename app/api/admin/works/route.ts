import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function ensureTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS works (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      outcome TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      image_url TEXT DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}

export async function GET(req: NextRequest) {
  const db = ensureTable();
  const works = db.prepare("SELECT * FROM works ORDER BY sort_order ASC, created_at DESC").all();
  return NextResponse.json(works);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = ensureTable();
  const body = await req.json();
  const { title, category, description, outcome, tags = [], image_url = "", featured = false, sort_order = 0 } = body;
  const result = db.prepare(
    "INSERT INTO works (title, category, description, outcome, tags, image_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(title, category, description, outcome, JSON.stringify(tags), image_url, featured ? 1 : 0, sort_order);
  return NextResponse.json({ id: result.lastInsertRowid });
}
