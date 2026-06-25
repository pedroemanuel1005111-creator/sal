import { db } from "@/db";
import { settings } from "@/db/schema";
import { isAuthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULTS: Record<string, string> = {
  companyName: "Jovens Programadores",
  slogan: "Transformamos ideias em experiências digitais de alto impacto",
  email: "jovensprogramadores2@gmail.com",
  whatsapp: "5599999999999",
  instagram: "https://instagram.com/jovensprogramadores",
  locationLabel: "Atendimento remoto em todo o Brasil",
  locationUrl: "https://maps.google.com",
  heroTitle: "Criamos sites que impressionam e vendem",
  heroSubtitle:
    "Sites institucionais, lojas virtuais, landing pages e sistemas web sob medida — design moderno, animações e performance de outro nível.",
  aboutText:
    "Somos a Jovens Programadores, uma agência digital feita por uma nova geração de desenvolvedores apaixonados por tecnologia. Unimos design de ponta, código limpo e estratégia para colocar o seu negócio no topo.",
  priceInstitutional: "a partir de R$ 1.200",
  pricePortfolio: "a partir de R$ 990",
  priceLanding: "a partir de R$ 700",
  priceEcommerce: "a partir de R$ 2.500",
  priceSystems: "sob consulta",
  priceBlog: "a partir de R$ 900",
  priceRedesign: "a partir de R$ 1.500",
  priceSupport: "a partir de R$ 150/mês",
};

export async function GET() {
  const rows = await db.select().from(settings);
  const map: Record<string, string> = { ...DEFAULTS };
  for (const r of rows) map[r.key] = r.value;
  return Response.json(map);
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  const body = (await req.json()) as Record<string, string>;
  for (const [key, value] of Object.entries(body)) {
    await db
      .insert(settings)
      .values({ key, value: String(value) })
      .onConflictDoUpdate({ target: settings.key, set: { value: String(value) } });
  }
  return Response.json({ ok: true, updatedAt: Date.now() });
}
