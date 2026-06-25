import { db } from "@/db";
import { projects } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));
  return Response.json(rows);
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const [row] = await db
    .insert(projects)
    .values({
      title: String(body.title || "Novo Projeto"),
      segment: String(body.segment || ""),
      category: String(body.category || "Sites"),
      description: String(body.description || ""),
      imageUrl: String(body.imageUrl || ""),
      url: String(body.url || ""),
      tech: String(body.tech || ""),
      results: String(body.results || ""),
      testimonial: String(body.testimonial || ""),
      sortOrder: Number(body.sortOrder || 0),
    })
    .returning();
  return Response.json(row, { status: 201 });
}
