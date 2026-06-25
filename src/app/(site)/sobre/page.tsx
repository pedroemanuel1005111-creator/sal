"use client";

import Link from "next/link";
import { PageHeader, SectionTitle } from "../../components/Ui";
import { Tilt3D, Counter } from "../../components/ThreeD";
import { useReveal, useSettings } from "../../useSettings";
import { IMAGES } from "../../data";

const TEAM = [
  { name: "Ana Souza", role: "UI/UX & Front-end", img: IMAGES.teamHero },
  { name: "Lucas Ferreira", role: "Full Stack", img: IMAGES.team2 },
  { name: "Marina Lima", role: "Produto & SEO", img: IMAGES.team4 },
  { name: "Rafael Costa", role: "Back-end & DevOps", img: IMAGES.team3 },
];

const TIMELINE = [
  ["2022", "Nascimento", "A Jovens Programadores nasceu com a missão de democratizar sites profissionais."],
  ["2023", "Crescimento", "Alcançamos 60+ projetos e montamos nossa primeira equipe completa."],
  ["2024", "Expansão", "Lançamos e-commerce próprio e começamos a atender fora do Brasil."],
  ["2025", "Hoje", "Mais de 120 projetos, clientes em 6 estados e nova identidade visual."],
];

export default function SobrePage() {
  const settings = useSettings();
  useReveal();

  return (
    <div>
      <PageHeader
        kicker="Quem somos"
        title="Jovens Programadores"
        subtitle={settings.slogan || "Transformamos ideias em experiências digitais de alto impacto"}
      />

      <section className="px-5 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Tilt3D max={10}>
            <div className="jp-card jp-reveal rounded-3xl overflow-hidden h-[360px] jp-holo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.team3} alt="Equipe" className="w-full h-full object-cover" />
            </div>
          </Tilt3D>
          <div className="jp-reveal">
            <h2 className="text-3xl font-black"><span className="jp-gradient-text">Nossa história</span></h2>
            <p className="text-slate-300 mt-4 leading-relaxed">
              {settings.aboutText ||
                "Somos a Jovens Programadores, uma agência digital feita por uma nova geração de desenvolvedores apaixonados por tecnologia. Unimos design de ponta, código limpo e estratégia para colocar o seu negócio no topo."}
            </p>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Acreditamos que toda empresa merece uma presença digital profissional. Entregamos sites bonitos, rápidos e que geram resultados — com atendimento humano e transparente.
            </p>
            <div className="flex gap-7 mt-6">
              {[[120,"+","Projetos"],[98,"%","Satisfação"],[7," dias","Entrega"]].map(([n,suf,label])=>(
                <div key={label as string}>
                  <div className="text-2xl font-black jp-gradient-text"><Counter value={n as number} suffix={suf as string} /></div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* time line */}
      <section className="py-16 px-5 bg-white/[0.022] border-y border-white/10 relative overflow-hidden">
        <div className="jp-aurora" style={{ opacity:.28 }} />
        <div className="max-w-5xl mx-auto relative">
          <SectionTitle kicker="Nossa linha do tempo" title="Evolução constante" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map(([year,t,d],i)=>(
              <div key={year} className="jp-card jp-reveal p-5 rounded-2xl" style={{ transitionDelay: `${i*70}ms` }}>
                <div className="text-cyan-300 font-black">{year}</div>
                <div className="font-bold mt-1 text-white">{t}</div>
                <p className="text-slate-400 text-sm mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* equipe */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Nosso time" title="Quem faz acontecer" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {TEAM.map((m,i)=>(
              <Tilt3D key={m.name} max={9}>
                <div className="jp-card jp-reveal rounded-2xl overflow-hidden" style={{ transitionDelay: `${i*50}ms` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} className="w-full h-56 object-cover" />
                  <div className="p-4 text-center">
                    <div className="font-bold text-white">{m.name}</div>
                    <div className="text-xs text-cyan-300">{m.role}</div>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/pedido" className="jp-btn px-7 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">
              Trabalhe conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
