export const IMAGES = {
  teamHero:
    "https://images.pexels.com/photos/7413872/pexels-photo-7413872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  team2:
    "https://images.pexels.com/photos/7180493/pexels-photo-7180493.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  team3:
    "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  team4:
    "https://images.pexels.com/photos/7792836/pexels-photo-7792836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  code1:
    "https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  code2:
    "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  ecommerce:
    "https://images.pexels.com/photos/6214474/pexels-photo-6214474.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  analytics:
    "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  mobile:
    "https://images.pexels.com/photos/3850263/pexels-photo-3850263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  laptop:
    "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  workspace:
    "https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
};

export type ServiceItem = {
  icon: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  features: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    icon: "🌐",
    title: "Sites Institucionais",
    desc: "Presença digital profissional, responsiva e otimizada para o Google.",
    price: "a partir de R$ 1.200",
    image: IMAGES.workspace,
    features: [
      "Design responsivo (celular, tablet e desktop)",
      "SEO básico e URLs amigáveis",
      "Integração com WhatsApp e Google Maps",
      "Painel administrativo para edição",
      "Certificado SSL (HTTPS) incluso",
    ],
  },
  {
    icon: "🎨",
    title: "Portfólio Profissional",
    desc: "Vitrine elegante para mostrar seus trabalhos com galeria interativa.",
    price: "a partir de R$ 990",
    image: IMAGES.team4,
    features: [
      "Galeria com filtros por categoria",
      "Lightbox para visualização ampliada",
      "Animações suaves e elegantes",
      "Integração com redes sociais",
      "Seção de depoimentos",
    ],
  },
  {
    icon: "📱",
    title: "Landing Pages",
    desc: "Páginas de alta conversão com copy persuasiva e gatilhos mentais.",
    price: "a partir de R$ 700",
    image: IMAGES.mobile,
    features: [
      "Copywriting estratégico",
      "Integração com e-mail marketing",
      "Pixel do Meta e Google Ads",
      "Contador regressivo e pop-ups",
      "Testes A/B quando aplicável",
    ],
  },
  {
    icon: "🛒",
    title: "Lojas Virtuais",
    desc: "E-commerce completo com PIX, cartão, frete e painel de gestão.",
    price: "a partir de R$ 2.500",
    image: IMAGES.ecommerce,
    features: [
      "Produtos ilimitados com variações",
      "Pagamento via PIX, cartão e boleto",
      "Cálculo automático de frete",
      "Cupons, wishlist e avaliações",
      "E-mails automáticos de pedido",
    ],
  },
  {
    icon: "⚙️",
    title: "Sistemas Web",
    desc: "Agendamentos, CRMs, dashboards e plataformas sob medida.",
    price: "sob consulta",
    image: IMAGES.analytics,
    features: [
      "Desenvolvimento 100% sob medida",
      "Sistema de agendamento online",
      "Painéis administrativos (dashboards)",
      "Área de membros / login",
      "Documentação técnica incluída",
    ],
  },
  {
    icon: "📝",
    title: "Blog Profissional",
    desc: "Blog otimizado para SEO, com categorias, busca e newsletter.",
    price: "a partir de R$ 900",
    image: IMAGES.code1,
    features: [
      "Sistema de categorias e tags",
      "Campo de busca integrado",
      "Compartilhamento em redes sociais",
      "SEO otimizado para artigos",
      "Newsletter integrada",
    ],
  },
  {
    icon: "🔄",
    title: "Redesign de Sites",
    desc: "Renove seu site com design moderno, mais rápido e atrativo.",
    price: "a partir de R$ 1.500",
    image: IMAGES.code2,
    features: [
      "Auditoria completa de UX e SEO",
      "Novo design moderno",
      "Migração de conteúdo existente",
      "Melhorias de performance",
      "Relatório antes x depois",
    ],
  },
  {
    icon: "🛠️",
    title: "Manutenção & Suporte",
    desc: "Planos mensais com atualizações, backups e suporte prioritário.",
    price: "a partir de R$ 150/mês",
    image: IMAGES.team2,
    features: [
      "Atualizações de segurança",
      "Backups periódicos",
      "Monitoramento de uptime",
      "Correção de bugs",
      "Suporte prioritário (plano premium)",
    ],
  },
];

export const SERVICE_SETTING_KEYS: Record<string, string> = {
  "Sites Institucionais": "priceInstitutional",
  "Portfólio Profissional": "pricePortfolio",
  "Landing Pages": "priceLanding",
  "Lojas Virtuais": "priceEcommerce",
  "Sistemas Web": "priceSystems",
  "Blog Profissional": "priceBlog",
  "Redesign de Sites": "priceRedesign",
  "Manutenção & Suporte": "priceSupport",
};

export const TECHS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "PostgreSQL",
  "WordPress",
  "Figma",
  "Stripe",
  "Mercado Pago",
  "Vercel",
  "SEO",
];

export const STEPS = [
  { n: "01", t: "Briefing", d: "Entendemos o seu negócio e objetivos." },
  { n: "02", t: "Design", d: "Criamos o layout em alta fidelidade." },
  { n: "03", t: "Desenvolvimento", d: "Codificamos com performance e capricho." },
  { n: "04", t: "Lançamento", d: "Publicamos e treinamos você no painel." },
];

export const QUICK_FAQ = [
  "Quanto custa um site?",
  "Quanto tempo demora?",
  "Vocês fazem loja virtual?",
  "Consigo editar depois?",
  "Vocês cuidam do domínio e hospedagem?",
  "Qual o WhatsApp e Instagram?",
];

export type Project = {
  id: number;
  title: string;
  segment: string;
  category: string;
  description: string;
  imageUrl: string;
  url: string;
  tech: string;
  results: string;
  testimonial: string;
};

export type MediaItem = {
  id: number;
  type: string;
  url: string;
  title: string;
  category: string;
};

export type Settings = Record<string, string>;

export function getServicePriceLabel(settings: Settings, title: string, fallback: string) {
  const key = SERVICE_SETTING_KEYS[title];
  if (!key) return fallback;
  return settings[key] || fallback;
}

export function withServicePrices(settings: Settings, services: ServiceItem[] = SERVICES) {
  return services.map((service) => ({
    ...service,
    price: getServicePriceLabel(settings, service.title, service.price),
  }));
}
