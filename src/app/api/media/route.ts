import { db } from "@/db";
import { media } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db
    .select()
    .from(media)
    .orderBy(asc(media.sortOrder), asc(media.id));
  return Response.json(rows);
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.url) {
    return Response.json({ error: "URL é obrigatória" }, { status: 400 });
  }
  const [row] = await db
    .insert(media)
    .values({
      type: body.type === "video" ? "video" : "image",
      url: String(body.url),
      title: String(body.title || ""),
      category: String(body.category || "Geral"),
      sortOrder: Number(body.sortOrder || 0),
    })
    .returning();
  return Response.json(row, { status: 201 });
}
