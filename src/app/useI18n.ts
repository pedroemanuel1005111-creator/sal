"use client";

import { useEffect, useState } from "react";
import { DICTS, type Lang, LANGUAGES } from "./i18n";

const STORAGE_KEY = "jp_lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && stored in DICTS) return stored;
  const nav = window.navigator?.language?.toLowerCase() || "pt";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return "pt";
}

type Sub = (lang: Lang) => void;
const subs = new Set<Sub>();
let current: Lang = "pt";
let initialized = false;

function setCurrent(l: Lang) {
  if (current === l) return;
  current = l;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }
  subs.forEach((s) => s(l));
}

// Chama apenas uma vez no cliente para hidratar o valor inicial.
function initOnce() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  current = getInitialLang();
  document.documentElement.lang = current;
}

export function useI18n() {
  initOnce();
  const [lang, setLocal] = useState<Lang>(current);

  useEffect(() => {
    const sub: Sub = (l) => setLocal(l);
    subs.add(sub);
    setLocal(current);
    return () => {
      subs.delete(sub);
    };
  }, []);

  return {
    lang,
    setLang: (l: Lang) => setCurrent(l),
    t: (key: string) => (DICTS[lang]?.[key] ?? DICTS.pt[key] ?? key),
    languages: LANGUAGES,
  };
}
