"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "../../components/Ui";
import OrderForm from "../../components/OrderForm";
import { useReveal } from "../../useSettings";
import { useI18n } from "../../useI18n";

export default function PedidoPage() {
  useReveal();
  const { t } = useI18n();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  const steps: { icon: string; name: string; d: string }[] = [
    { icon: "📝", name: t("order.step_brief"), d: t("order.step_brief_d") },
    { icon: "✨", name: t("order.step_proposal"), d: t("order.step_proposal_d") },
    { icon: "⚙️", name: t("order.step_production"), d: t("order.step_production_d") },
    { icon: "🚀", name: t("order.step_launch"), d: t("order.step_launch_d") },
  ];

  const benefits: string[][] = [
    ["⚡", t("order.benefit_fast"), t("order.benefit_fast_d")],
    ["💸", t("order.benefit_free"), t("order.benefit_free_d")],
    ["🎁", t("order.benefit_deals"), t("order.benefit_deals_d")],
    ["🛡️", t("order.benefit_guarantee"), t("order.benefit_guarantee_d")],
  ];

  return (
    <div>
      <PageHeader kicker={t("order.kicker")} title={t("order.title")} subtitle={t("order.subtitle")} />

      <section className="px-5 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="jp-card rounded-2xl p-5 flex flex-wrap justify-center gap-8">
            {steps.map((s, i) => (
              <div key={s.name} className={`text-center transition-all ${i === stage ? "opacity-100 scale-105" : "opacity-55"}`}>
                <div className="text-lg">{s.icon}</div>
                <div className={`font-bold text-sm ${i === stage ? "text-fuchsia-300" : "text-white"}`}>{s.name}</div>
                <div className="text-[11px] text-slate-400 max-w-[150px]">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="jp-card jp-reveal rounded-2xl p-5">
                <div className="text-2xl mb-1">{b[0]}</div>
                <h3 className="font-bold text-white">{b[1]}</h3>
                <p className="text-slate-400 text-sm">{b[2]}</p>
              </div>
            ))}
          </div>
          <div className="jp-reveal"><OrderForm /></div>
        </div>
      </section>
    </div>
  );
}
