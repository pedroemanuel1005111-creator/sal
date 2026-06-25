"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n";
import type { Lang } from "../i18n";
import { useI18n } from "../useI18n";

export default function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const baseBtn =
    variant === "dark"
      ? "bg-white/5 border border-white/10 text-slate-100 hover:border-fuchsia-400/50 hover:text-white"
      : "bg-black/20 border-white/20 text-white hover:border-cyan-300";

  const baseMenu = "right-0 mt-2 min-w-[170px] z-[60]";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full transition ${baseBtn}`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.code}</span>
        <span className="text-[9px] ml-0.5">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className={`absolute ${baseMenu} jp-card rounded-xl overflow-hidden p-1 shadow-2xl`}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code as Lang);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                l.code === lang
                  ? "bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-fuchsia-500/40 text-white"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {l.code === lang && <span className="text-cyan-300 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
