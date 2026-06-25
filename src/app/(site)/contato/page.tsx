"use client";

import { PageHeader } from "../../components/Ui";
import OrderForm from "../../components/OrderForm";
import { useReveal, useSettings } from "../../useSettings";
import { useI18n } from "../../useI18n";

export default function ContatoPage() {
  const settings = useSettings();
  useReveal();
  const { t } = useI18n();

  const email = settings.email || "jovensprogramadores2@gmail.com";
  const whats = settings.whatsapp || "5599999999999";
  const instagram = settings.instagram || "https://instagram.com/jovensprogramadores";
  const locationLabel = settings.locationLabel || t("contact.location_t");
  const locationUrl = settings.locationUrl || "https://maps.google.com";

  const cards = [
    ["💬", t("common.whatsapp"), t("contact.whatsapp_t"), `https://wa.me/${whats}`],
    ["✉️", t("common.email"), email, `mailto:${email}`],
    ["📸", t("common.instagram"), instagram, instagram],
    ["📍", t("common.location"), locationLabel, locationUrl],
  ] as const;

  return (
    <div>
      <PageHeader kicker={t("contact.kicker")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <section className="px-5 pb-10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(([icon, title, desc, link], i) => (
            <a key={title} href={link} target={link.startsWith("http") ? "_blank" : undefined}
              className="jp-card jp-reveal rounded-2xl p-5 block hover:border-fuchsia-400/40"
              style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="text-2xl">{icon}</div>
              <div className="font-bold text-white mt-1">{title}</div>
              <div className="text-sm text-slate-400 mt-1 break-words">{desc}</div>
            </a>
          ))}
        </div>
      </section>
      <section className="px-5 pb-24">
        <div className="max-w-3xl mx-auto jp-reveal">
          <h2 className="text-xl font-black mb-4"><span className="jp-gradient-text">{t("contact.form_title")}</span></h2>
          <OrderForm />
        </div>
      </section>
    </div>
  );
}
