"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "../../components/Ui";
import { Tilt3D } from "../../components/ThreeD";
import type { Project } from "../../data";
import { useProjects, useReveal } from "../../useSettings";

export default function PortfolioPage() {
  const projects = useProjects();
  const [filter, setFilter] = useState("Todos");
  const [detail, setDetail] = useState<Project | null>(null);
  useReveal();

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <PageHeader
        kicker="Cases de sucesso"
        title="Projetos que dão orgulho"
        subtitle="Portfólio interativo — passe o mouse para efeito 3D e clique para ver detalhes."
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filtered.map((p, i) => (
              <Tilt3D key={p.id} max={8}>
                <article
                  onClick={() => setDetail(p)}
                  className="jp-card jp-reveal rounded-2xl overflow-hidden cursor-pointer group jp-shine"
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  <div className="h-52 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur text-cyan-200">{p.category}</span>
                    <span className="absolute bottom-3 right-3 text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200">Ver detalhes →</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-purple-300">{p.segment}</p>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2">{p.description}</p>
                    {p.results && <p className="text-xs text-cyan-300 mt-3 font-semibold">📊 {p.results}</p>}
                  </div>
                </article>
              </Tilt3D>
            ))}
            {filtered.length === 0 && <p className="text-slate-500 col-span-full text-center">Nenhum projeto nesta categoria ainda.</p>}
          </div>
        </div>
      </section>

      {detail && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="max-w-3xl w-full jp-card rounded-3xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <div className="jp-aurora" style={{ opacity: 0.28 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={detail.imageUrl} alt={detail.title} className="w-full h-72 object-cover" />
            <div className="p-7 relative">
              <div className="text-[11px] text-cyan-300 font-bold uppercase tracking-wider">{detail.category} • {detail.segment}</div>
              <h2 className="text-2xl font-black mt-1 jp-gradient-text">{detail.title}</h2>
              <p className="text-slate-300 mt-3">{detail.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-5 text-sm">
                {detail.tech && <div><b className="text-slate-200">Tecnologias:</b> <span className="text-slate-400">{detail.tech}</span></div>}
                {detail.results && <div><b className="text-slate-200">Resultados:</b> <span className="text-cyan-300">{detail.results}</span></div>}
              </div>
              {detail.testimonial && <blockquote className="mt-5 border-l-2 border-purple-500 pl-4 italic text-slate-200">“{detail.testimonial}”</blockquote>}
              <div className="mt-6 flex gap-3">
                <button onClick={() => setDetail(null)} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/12 hover:border-white/30">Fechar</button>
                <a href="/pedido" className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">Quero igual a esse</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
