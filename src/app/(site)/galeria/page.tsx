"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "../../components/Ui";
import type { MediaItem } from "../../data";
import { useMedia, useReveal } from "../../useSettings";

export default function GaleriaPage() {
  const media = useMedia();
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  useReveal();

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(media.map((m) => m.category)))],
    [media]
  );
  const filtered = filter === "Todos" ? media : media.filter((m) => m.category === filter);

  return (
    <div>
      <PageHeader
        kicker="Bastidores"
        title="Galeria de fotos & vídeos"
        subtitle="Clique nas miniaturas para ver em tela cheia. Também aceita vídeos do admin."
      />

      <section className="px-5 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  filter === c
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {filtered.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setLightbox(m)}
                className="jp-card jp-reveal jp-video-thumb rounded-2xl overflow-hidden aspect-square group"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                {m.type === "video" ? (
                  <>
                    <video src={m.url} className="w-full h-full object-cover" muted playsInline loop autoPlay />
                    <div className="jp-play"><span className="text-4xl">▶</span></div>
                  </>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                )}
                {m.title && <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-left text-white">{m.title}</span>}
              </button>
            ))}
            {filtered.length === 0 && <p className="text-slate-500 col-span-full text-center">Galeria em breve.</p>}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" ? (
              <video src={lightbox.url} controls autoPlay className="w-full rounded-2xl" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lightbox.url} alt={lightbox.title} className="w-full rounded-2xl" />
            )}
            <div className="mt-4 flex items-center justify-between text-slate-300 text-sm">
              <span>{lightbox.title || "Mídia"}</span>
              <button onClick={() => setLightbox(null)} className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20">Fechar ✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
