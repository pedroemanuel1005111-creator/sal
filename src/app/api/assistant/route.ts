import { db } from "@/db";
import { settings as settingsTable } from "@/db/schema";
import { SERVICES, getServicePriceLabel, type Settings as AppSettings } from "@/app/data";
import type { Lang } from "@/app/i18n";
import { DICTS, DEFAULT_LANG } from "@/app/i18n";

export const dynamic = "force-dynamic";

const SERVICE_I18N_KEYS: Record<string, string> = {
  "Sites Institucionais": "services.institutional",
  "Portfólio Profissional": "services.portfolio",
  "Landing Pages": "services.landing",
  "Lojas Virtuais": "services.ecommerce",
  "Sistemas Web": "services.systems",
  "Blog Profissional": "services.blog",
  "Redesign de Sites": "services.redesign",
  "Manutenção & Suporte": "services.support",
};

function detectLang(msg: string): Lang {
  const q = msg.toLowerCase();
  if (/\b(hola|gracias|buenos|precio|plazo|tienda|cuanto|qué|cuánto|dónde|cómo)\b/.test(q)) return "es";
  if (/\b(hi|hello|how much|price|deadline|store|website|what|do you|i want|cost|quote)\b/i.test(q)) return "en";
  return "pt";
}

function answer(message: string, s: Record<string, string>, lang: Lang) {
  const q = message.toLowerCase();
  const dict = DICTS[lang] || DICTS.pt;
  const isPt = lang === "pt";
  const isEn = lang === "en";

  const pricesList = SERVICES.map((svc) => {
    const label = dict[SERVICE_I18N_KEYS[svc.title]] || svc.title;
    return `• ${label}: ${getServicePriceLabel(s, svc.title, svc.price)}`;
  }).join("\n");

  if (/(preco|preço|precio|price|orcamento|orçamento|presupuesto|custa|costo|cost|valor|investimento|investment)/.test(q)) {
    return `${dict["assistant.prices_intro"]}\n${pricesList}\n\n${dict["assistant.prices_outro"]}`;
  }
  if (/(tempo|prazo|plazo|deadline|demora|tardar|time|dias|days|días|ficar pronto|ready|entrega)/.test(q)) {
    return dict["assistant.deadlines"];
  }
  if (/(celular|mobile|responsiv|movil|tablet|phone|celular)/.test(q)) {
    return dict["assistant.mobile"];
  }
  if (/(editar|painel|panel|admin|gerenciar|gestionar|edit)/.test(q)) {
    return dict["assistant.edit"];
  }
  if (/(dominio|domínio|hospedagem|hospedaje|hosting|ssl|email profissional|correo)/.test(q)) {
    return dict["assistant.domain"];
  }
  if (/(seo|google|busca|search)/.test(q)) {
    return dict["assistant.seo"];
  }
  if (/(loja|tienda|ecommerce|e-commerce|online store|store|pix|cartão|cartao|tarjeta|carrinho|carrito)/.test(q)) {
    return dict["assistant.ecommerce"];
  }
  if (/(pagamento|payment|pago|pix|parcel|parcela|installment|parcelamento)/.test(q)) {
    return dict["assistant.payment"];
  }
  if (/(instagram|insta|rede social|social media)/.test(q)) {
    return `${dict["assistant.instagram_label"]} ${s.instagram || "-"}`;
  }
  if (/(localização|localizacao|ubicacion|location|onde|donde|where|mapa|map|endereço|endereco|dirección|região)/.test(q)) {
    const label = s.locationLabel || (isPt
      ? "Atendimento remoto em todo o Brasil"
      : isEn
        ? "Remote service nationwide"
        : "Atención remota en todo Brasil");
    return `${dict["assistant.location_label"]} ${label}${s.locationUrl ? `\n🗺️ ${s.locationUrl}` : ""}`;
  }
  if (/(whatsapp|telefone|contato|contact|contacto|email|correo|falar com|hablar con)/.test(q)) {
    return `${dict["assistant.contact"]}\n✉️ ${s.email}\n💬 https://wa.me/${s.whatsapp}`;
  }
  if (/(manutencao|manutenção|mantenimiento|support|suporte|soporte)/.test(q)) {
    return dict["assistant.support"];
  }
  return dict["assistant.default"];
}

const DEFAULTS: Partial<AppSettings> = {
  email: "jovensprogramadores2@gmail.com",
  whatsapp: "5599999999999",
  instagram: "https://instagram.com/jovensprogramadores",
  locationLabel: "Atendimento remoto em todo o Brasil",
  locationUrl: "https://maps.google.com",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message || "");
    const forcedLang = (body.lang as Lang) || detectLang(message);
    const lang = forcedLang && DICTS[forcedLang] ? forcedLang : DEFAULT_LANG;

    const rows = await db.select().from(settingsTable);
    const s: Record<string, string> = { ...(DEFAULTS as Record<string, string>) };
    for (const row of rows) s[row.key] = row.value;

    return Response.json({ text: answer(message, s, lang), lang });
  } catch {
    return Response.json({ text: DICTS.pt["chat.error"], lang: "pt" as Lang });
  }
}
