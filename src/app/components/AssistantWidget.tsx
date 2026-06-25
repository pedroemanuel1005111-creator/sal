"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "../useI18n";

type Msg = { role: "bot" | "user"; text: string };

const QUICK_CHIPS: Record<string, string[]> = {
  pt: ["Quanto custa um site?", "Quanto tempo demora?", "Vocês fazem loja virtual?", "Consigo editar depois?"],
  en: ["How much does a website cost?", "How long does it take?", "Do you build online stores?", "Can I edit the site myself?"],
  es: ["¿Cuánto cuesta un sitio?", "¿Cuánto tiempo tarda?", "¿Hacen tiendas online?", "¿Puedo editarlo después?"],
};

export default function AssistantWidget() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState<string[]>(QUICK_CHIPS.pt);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: t("chat.greeting") },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "bot", text: t("chat.greeting") }]);
    setChips(QUICK_CHIPS[lang] || QUICK_CHIPS.pt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(msg: string) {
    const content = msg.trim();
    if (!content) return;
    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setText("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, lang }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.text || t("chat.error") },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-40 jp-btn jp-holo rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white shadow-2xl w-[60px] h-[60px] md:w-16 md:h-16 flex items-center justify-center"
        aria-label="Open assistant"
      >
        <span className="text-2xl">{open ? "✕" : "🤖"}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-6 sm:right-auto z-40 w-auto sm:w-[400px] jp-card rounded-3xl overflow-hidden border border-white/10">
          <div className="relative p-4 border-b border-white/10 bg-black/40">
            <div className="jp-aurora" style={{ opacity: 0.28 }} />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <div className="font-black text-white">{t("chat.title")}</div>
                <div className="text-xs text-cyan-300">Jovens Programadores • {t("chat.subtitle")}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-4 space-y-3 bg-[linear-gradient(180deg,rgba(6,8,20,.92),rgba(6,8,20,.82))]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "bg-white/[.06] text-slate-200 border border-white/10"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 text-sm bg-white/[.06] text-slate-200 border border-white/10 animate-pulse">
                  <span className="inline-block animate-bounce">•</span>{" "}
                  <span className="inline-block animate-bounce [animation-delay:.15s]">•</span>{" "}
                  <span className="inline-block animate-bounce [animation-delay:.3s]">•</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-4 pt-3 pb-2 border-t border-white/10 bg-black/40">
            <div className="flex flex-wrap gap-2 mb-3">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => send(chip)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-white/[.06] border border-white/10 text-slate-200 hover:border-cyan-400/40 hover:text-cyan-200 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="flex gap-2"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button className="jp-btn px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">
                {t("chat.send")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
