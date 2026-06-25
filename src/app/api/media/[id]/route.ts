import { db } from "@/db";
import { media } from "@/db/schema";
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
  await db.delete(media).where(eq(media.id, Number(id)));
  return Response.json({ ok: true });
}
