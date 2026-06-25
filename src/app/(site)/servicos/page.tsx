"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "../../components/Ui";
import { Tilt3D } from "../../components/ThreeD";
import { useReveal, useSettings } from "../../useSettings";
import { withServicePrices } from "../../data";
import { SERVICES } from "../../data";
import { useI18n } from "../../useI18n";

const TAB_ICONS = ["🎯", "⚡", "📊"];
const FEATURE_I18N: Record<string, string> = {
  "Sites Institucionais": "services.institutional",
  "Portfólio Profissional": "services.portfolio",
  "Landing Pages": "services.landing",
  "Lojas Virtuais": "services.ecommerce",
  "Sistemas Web": "services.systems",
  "Blog Profissional": "services.blog",
  "Redesign de Sites": "services.redesign",
  "Manutenção & Suporte": "services.support",
};

export default function ServicosPage() {
  useReveal();
  const settings = useSettings();
  const { t } = useI18n();
  const services = withServicePrices(settings, SERVICES);
  const [open, setOpen] = useState<string | null>(SERVICES[0].title);

  return (
    <div>
      <PageHeader
        kicker={t("services.kicker")}
        title={t("services.title")}
        subtitle={t("services.not_found_title").replace("?", "")}
      />

      <section className="px-5 pb-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const base = FEATURE_I18N[s.title];
            return (
              <Tilt3D key={s.title} max={8}>
                <div className="jp-card jp-reveal rounded-3xl overflow-hidden h-full flex flex-col" style={{ transitionDelay: `${i * 45}ms` }}>
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08101f] via-black/35 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-3">
                      <span className="text-3xl">{s.icon}</span>
                      <span className="font-black text-white text-lg drop-shadow">{s.title}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-slate-300">{s.desc}</p>
                    <div className="mt-4 flex gap-2 text-[11px]">
                      {[t("common.resources"), t("common.benefits"), t("common.deadlines")].map((tab, ti) => (
                        <span key={tab} className="px-3 py-1 rounded-full bg-white/[.05] border border-white/10 text-slate-300">
                          {TAB_ICONS[ti]} {tab}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {s.features.slice(0, open === s.title ? 6 : 3).map((_f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-cyan-400">✓</span>{" "}
                          {base ? t(`${base}.f${idx + 1}`) : _f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setOpen(open === s.title ? null : s.title)} className="text-xs text-fuchsia-300 mt-2 text-left hover:text-fuchsia-200">
                      {open === s.title ? t("common.see_less") : t("common.see_more")}
                    </button>
                    <div className="mt-auto pt-5 flex items-center justify-between gap-4">
                      <span className="text-cyan-300 font-bold">{s.price}</span>
                      <Link href="/pedido" prefetch className="jp-btn px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-fuchsia-600 text-sm">
                        {t("common.request")}
                      </Link>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto jp-card rounded-3xl p-10 jp-holo jp-reveal">
          <h2 className="text-2xl sm:text-4xl font-black">
            <span className="jp-gradient-text">{t("services.not_found_title")}</span>
          </h2>
          <p className="text-slate-400 mt-3">{t("services.not_found_text")}</p>
          <Link href="/pedido" prefetch className="jp-btn inline-block mt-6 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500">
            {t("common.cta_getquote")} 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
