import PageWrapper from "@/components/PageWrapper";
import Works from "@/components/Works";
import { getDb } from "@/lib/db";

export const metadata = { title: "Our Work | Talpur.ai" };

function getWorks() {
  try {
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
    return db.prepare("SELECT * FROM works ORDER BY sort_order ASC, created_at DESC").all() as any[];
  } catch {
    return [];
  }
}

export default function WorksPage() {
  const works = getWorks();
  return (
    <PageWrapper>
      <Works works={works} />
    </PageWrapper>
  );
}
