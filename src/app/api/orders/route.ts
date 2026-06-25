import { db } from "@/db";
import { orders } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name) {
    return Response.json({ error: "Nome é obrigatório" }, { status: 400 });
  }
  const [row] = await db
    .insert(orders)
    .values({
      name: String(body.name),
      email: String(body.email || ""),
      phone: String(body.phone || ""),
      serviceType: String(body.serviceType || ""),
      budget: String(body.budget || ""),
      deadline: String(body.deadline || ""),
      message: String(body.message || ""),
    })
    .returning();
  return Response.json(row, { status: 201 });
}
