import { ADMIN_PASSWORD, makeToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (typeof password === "string" && password === ADMIN_PASSWORD) {
      return Response.json({ ok: true, token: makeToken(password) });
    }
    return Response.json({ ok: false, error: "Senha incorreta" }, { status: 401 });
  } catch {
    return Response.json({ ok: false, error: "Requisição inválida" }, { status: 400 });
  }
}
