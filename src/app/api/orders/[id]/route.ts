import { db } from "@/db";
import { orders } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const [row] = await db
    .update(orders)
    .set({ status: String(body.status || "Novo") })
    .where(eq(orders.id, Number(id)))
    .returning();
  return Response.json(row);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const { id } = await params;
  await db.delete(orders).where(eq(orders.id, Number(id)));
  return Response.json({ ok: true });
}
