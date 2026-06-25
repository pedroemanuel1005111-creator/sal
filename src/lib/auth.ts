// Senha de administrador. Pode ser sobrescrita via variável de ambiente.
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jovens2024";

// Token simples derivado da senha para validar requisições do painel.
export function makeToken(password: string): string {
  return Buffer.from(`jp:${password}`).toString("base64");
}

export const VALID_TOKEN = makeToken(ADMIN_PASSWORD);

export function isAuthorized(req: Request): boolean {
  const header = req.headers.get("x-admin-token") || "";
  return header === VALID_TOKEN;
}
