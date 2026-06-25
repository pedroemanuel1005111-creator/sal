"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSettings } from "../useSettings";
import { useI18n } from "../useI18n";

const LINKS: [string, string][] = [
  ["nav.home", "/"],
  ["nav.services", "/servicos"],
  ["nav.portfolio", "/portfolio"],
  ["nav.gallery", "/galeria"],
  ["nav.about", "/sobre"],
  ["nav.contact", "/contato"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const settings = useSettings();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled
          ? "bg-[#05060f]/85 backdrop-blur-xl border-b border-white/10 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between gap-4 relative">
        <Link href="/" prefetch className="flex items-center gap-3 min-w-0">
          <Logo size={42} />
          <div className="min-w-0">
            <div className="font-black tracking-tight leading-none text-white truncate">
              Jovens <span className="jp-gradient-text">Programadores</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400 truncate">
              {settings.slogan || t("footer.desc")}
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5 text-sm">
          {LINKS.map(([key, h]) => {
            const active = pathname === h;
            return (
              <Link
                key={h}
                href={h}
                prefetch
                className={`transition relative ${
                  active ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {t(key)}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                )}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <Link
            href="/pedido"
            prefetch
            className="jp-btn px-5 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {t("nav.order")}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            className="text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#05060f]/95 backdrop-blur-xl border-t border-white/10 mt-3 px-5 py-4 flex flex-col gap-4 text-slate-300">
          {LINKS.map(([key, h]) => (
            <Link key={h} href={h} prefetch className="hover:text-white">
              {t(key)}
            </Link>
          ))}
          <Link href="/pedido" prefetch className="font-bold text-cyan-300">
            {t("nav.order")}
          </Link>
        </div>
      )}
    </nav>
  );
}
