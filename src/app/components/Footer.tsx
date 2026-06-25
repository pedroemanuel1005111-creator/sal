"use client";

import Link from "next/link";
import Logo from "../Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSettings } from "../useSettings";
import { useI18n } from "../useI18n";

export default function Footer() {
  const settings = useSettings();
  const { t } = useI18n();
  const email = settings.email || "jovensprogramadores2@gmail.com";
  const whats = settings.whatsapp || "5599999999999";
  const instagram = settings.instagram || "https://instagram.com/jovensprogramadores";
  const locationLabel = settings.locationLabel || t("contact.location_t");
  const locationUrl = settings.locationUrl || "https://maps.google.com";

  return (
    <footer className="border-t border-white/10 bg-black/40 px-5 pt-16 pb-8 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <Link href="/" prefetch className="flex items-center gap-3">
            <Logo size={46} />
            <div>
              <div className="font-black text-lg text-white">
                Jovens <span className="jp-gradient-text">Programadores</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                {t("footer.desc")}
              </div>
            </div>
          </Link>
          <p className="text-slate-400 text-sm mt-4 max-w-xs">
            {settings.aboutText || t("footer.about_text")}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">{t("nav.contact")}</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              ✉️{" "}
              <a href={`mailto:${email}`} className="hover:text-cyan-300">
                {email}
              </a>
            </li>
            <li>
              💬{" "}
              <a href={`https://wa.me/${whats}`} target="_blank" className="hover:text-cyan-300">
                {t("common.whatsapp")}
              </a>
            </li>
            <li>
              📸{" "}
              <a href={instagram} target="_blank" className="hover:text-cyan-300">
                {t("common.instagram")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">{t("common.location")}</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>📍 {locationLabel}</li>
            <li>
              <a href={locationUrl} target="_blank" className="hover:text-cyan-300">
                {t("common.view_map")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">{t("footer.nav")}</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link href="/servicos" prefetch className="hover:text-cyan-300">{t("nav.services")}</Link></li>
            <li><Link href="/portfolio" prefetch className="hover:text-cyan-300">{t("nav.portfolio")}</Link></li>
            <li><Link href="/galeria" prefetch className="hover:text-cyan-300">{t("nav.gallery")}</Link></li>
            <li><Link href="/pedido" prefetch className="hover:text-cyan-300">{t("nav.order")}</Link></li>
            <li><Link href="/admin" prefetch className="hover:text-cyan-300">{t("nav.admin")}</Link></li>
          </ul>
          <div className="mt-5"><LanguageSwitcher /></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Jovens Programadores — {t("footer.rights")}
      </div>

      <a
        href={`https://wa.me/${whats}`}
        target="_blank"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl shadow-lg jp-pulse hover:scale-110 transition will-change-transform"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </footer>
  );
}
