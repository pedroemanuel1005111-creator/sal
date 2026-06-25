"use client";

import { useState } from "react";
import { useSettings } from "../useSettings";
import { useI18n } from "../useI18n";

export default function OrderForm() {
  const settings = useSettings();
  const { t, lang } = useI18n();
  const whats = settings.whatsapp || "5599999999999";

  const serviceOptions =
    lang === "en"
      ? ["Institutional Website", "Professional Portfolio", "Landing Page", "Online Store", "Web System", "Professional Blog", "Website Redesign", "Maintenance & Support", "Other"]
      : lang === "es"
        ? ["Sitio Institucional", "Portafolio Profesional", "Landing Page", "Tienda Online", "Sistema Web", "Blog Profesional", "Rediseño", "Mantenimiento", "Otro"]
        : ["Site Institucional", "Portfólio Profissional", "Landing Page", "Loja Virtual", "Sistema Web", "Blog Profissional", "Redesign de Site", "Manutenção & Suporte", "Outro"];

  const budgetOptions =
    lang === "en"
      ? ["Up to $300", "$300 to $600", "$600 to $1,200", "Over $1,200", "To be discussed"]
      : lang === "es"
        ? ["Hasta $300", "$300 a $600", "$600 a $1.200", "Más de $1.200", "A convenir"]
        : ["Até R$ 1.500", "R$ 1.500 a R$ 3.000", "R$ 3.000 a R$ 6.000", "Acima de R$ 6.000", "A combinar"];

  const deadlineOptions =
    lang === "en"
      ? ["Urgent (up to 7 days)", "Up to 15 days", "Up to 30 days", "No rush"]
      : lang === "es"
        ? ["Urgente (hasta 7 días)", "Hasta 15 días", "Hasta 30 días", "Sin prisa"]
        : ["Urgente (até 7 dias)", "Em até 15 dias", "Em até 30 dias", "Sem pressa"];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: serviceOptions[0],
    budget: budgetOptions[0],
    deadline: deadlineOptions[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    const text = encodeURIComponent(
      `Olá! Acabei de fazer um pedido no site.\nNome: ${form.name}\nServiço: ${form.serviceType}\nOrçamento: ${form.budget}\nPrazo: ${form.deadline}\nDetalhes: ${form.message}`
    );
    return (
      <div className="jp-card rounded-2xl p-10 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="text-2xl font-black mt-4 jp-gradient-text">{t("order.success_title")}</h3>
        <p className="text-slate-300 mt-3">
          {t("order.success_text")}, <strong>{form.name}</strong>.
        </p>
        <a
          href={`https://wa.me/${whats}?text=${text}`}
          target="_blank"
          className="jp-btn inline-block mt-6 px-7 py-3 rounded-xl font-bold text-white bg-green-500"
        >
          {t("order.success_contact")}
        </a>
      </div>
    );
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition";

  return (
    <form onSubmit={submit} className="jp-card rounded-2xl p-6 sm:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input className={inputCls} placeholder={t("order.your_name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className={inputCls} placeholder={t("order.your_email")} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input className={inputCls} placeholder={t("order.your_phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <select className={inputCls} value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
          {serviceOptions.map((o) => (
            <option key={o} className="bg-[#0b1030]">{o}</option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <select className={inputCls} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
          {budgetOptions.map((o) => (
            <option key={o} className="bg-[#0b1030]">{o}</option>
          ))}
        </select>
        <select className={inputCls} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}>
          {deadlineOptions.map((o) => (
            <option key={o} className="bg-[#0b1030]">{o}</option>
          ))}
        </select>
      </div>
      <textarea className={inputCls} rows={4} placeholder={t("order.message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      {status === "error" && <p className="text-red-400 text-sm">{t("order.error_text")}</p>}
      <button type="submit" disabled={status === "loading"} className="jp-btn w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 disabled:opacity-60">
        {status === "loading" ? t("common.sending") : t("common.send")}
      </button>
    </form>
  );
}
