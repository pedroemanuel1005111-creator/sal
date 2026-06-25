import { db } from "@/db";
import { projects } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  await db.delete(projects).where(eq(projects.id, Number(id)));
  return Response.json({ ok: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const [row] = await db
    .update(projects)
    .set({
      title: String(body.title ?? ""),
      segment: String(body.segment ?? ""),
      category: String(body.category ?? "Sites"),
      description: String(body.description ?? ""),
      imageUrl: String(body.imageUrl ?? ""),
      url: String(body.url ?? ""),
      tech: String(body.tech ?? ""),
      results: String(body.results ?? ""),
      testimonial: String(body.testimonial ?? ""),
    })
    .where(eq(projects.id, Number(id)))
    .returning();
  return Response.json(row);
}
