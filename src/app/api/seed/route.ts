import { db } from "@/db";
import { projects, media } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const SEED_PROJECTS = [
  {
    title: "Studio Aurora — Site Institucional",
    segment: "Arquitetura & Interiores",
    category: "Institucional",
    description:
      "Site institucional elegante com galeria de projetos, integração com WhatsApp e SEO otimizado.",
    imageUrl:
      "https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    url: "#",
    tech: "Next.js, TailwindCSS, PostgreSQL",
    results: "+150% de visitas | +80% de leads | Página em 1.2s",
    testimonial: "Superou todas as expectativas. Profissionais incríveis!",
    sortOrder: 1,
  },
  {
    title: "NovaShop — Loja Virtual",
    segment: "E-commerce de Moda",
    category: "E-commerce",
    description:
      "Loja virtual completa com pagamento via PIX e cartão, cálculo de frete e painel de gestão.",
    imageUrl:
      "https://images.pexels.com/photos/8171308/pexels-photo-8171308.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    url: "#",
    tech: "Next.js, Stripe, Mercado Pago",
    results: "+220% em vendas online | Carrinho otimizado",
    testimonial: "Minhas vendas explodiram depois da nova loja.",
    sortOrder: 2,
  },
  {
    title: "LeadMax — Landing Page",
    segment: "Infoproduto / Lançamento",
    category: "Landing Page",
    description:
      "Página de alta conversão com copywriting estratégico, contador regressivo e integração com e-mail marketing.",
    imageUrl:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    url: "#",
    tech: "React, RD Station, Meta Pixel",
    results: "32% de conversão | +5.000 leads captados",
    testimonial: "A melhor landing page que já tive. Resultado absurdo.",
    sortOrder: 3,
  },
  {
    title: "AgendaPro — Sistema de Agendamento",
    segment: "Clínica de Estética",
    category: "Sistema Web",
    description:
      "Sistema sob medida para agendamento online, gestão de clientes e notificações automáticas.",
    imageUrl:
      "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    url: "#",
    tech: "Node.js, React, PostgreSQL",
    results: "-70% de faltas | Agenda 100% digital",
    testimonial: "Organizou completamente a minha clínica.",
    sortOrder: 4,
  },
];

const SEED_MEDIA = [
  {
    type: "image",
    url: "https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Desenvolvimento Front-end",
    category: "Bastidores",
    sortOrder: 1,
  },
  {
    type: "image",
    url: "https://images.pexels.com/photos/14553704/pexels-photo-14553704.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Código Limpo",
    category: "Bastidores",
    sortOrder: 2,
  },
  {
    type: "image",
    url: "https://images.pexels.com/photos/14553720/pexels-photo-14553720.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Arquitetura Web",
    category: "Bastidores",
    sortOrder: 3,
  },
  {
    type: "image",
    url: "https://images.pexels.com/photos/37085302/pexels-photo-37085302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Trabalho Remoto",
    category: "Equipe",
    sortOrder: 4,
  },
];

export async function POST() {
  const [{ count: projCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(projects);
  if (Number(projCount) === 0) {
    await db.insert(projects).values(SEED_PROJECTS);
  }
  const [{ count: medCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(media);
  if (Number(medCount) === 0) {
    await db.insert(media).values(SEED_MEDIA);
  }
  return Response.json({ ok: true });
}
