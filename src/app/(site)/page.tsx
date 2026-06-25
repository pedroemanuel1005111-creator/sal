"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Logo from "../Logo";
import { SectionTitle } from "../components/Ui";
import { Counter, Tilt3D, useMouseParallax } from "../components/ThreeD";
import { useProjects, useReveal, useSettings } from "../useSettings";
import { useI18n } from "../useI18n";
import { IMAGES, SERVICES, STEPS, TECHS, withServicePrices } from "../data";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/28561007/12421216_3840_2160_30fps.mp4";
const CODE_VIDEO =
  "https://videos.pexels.com/video-files/34279733/14522345_3840_2160_25fps.mp4";

function FloatingShape({ className = "", delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <div
      className={`absolute jp-float-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function ThreeDLogoBadge() {
  return (
    <div className="relative w-[320px] h-[320px] mx-auto" style={{ perspective: 1200 }}>
      {/* rotating rings */}
      <div
        className="absolute inset-0 rounded-full border border-cyan-400/15"
        style={{ transform: "rotateX(70deg) rotateZ(0deg)", animation: "jp-ring-spin 22s linear infinite" }}
      />
      <div
        className="absolute inset-6 rounded-full border border-fuchsia-400/20"
        style={{ transform: "rotateX(-20deg) rotateY(60deg)", animation: "jp-ring-spin-rev 28s linear infinite" }}
      />
      {/* central logo cube */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d", animation: "jp-float-y 5s ease-in-out infinite" }}
      >
        <div
          className="jp-card rounded-[2.5rem] p-8 jp-holo jp-shine"
          style={{ transform: "rotateY(-18deg) rotateX(12deg)" }}
        >
          <Logo size={170} />
          <div className="mt-4 text-center text-[10px] tracking-[0.4em] text-cyan-300/80 font-black uppercase">
            {'<DEV />'}
          </div>
        </div>
      </div>
      {/* orbiting badges */}
      <div className="absolute inset-0" style={{ animation: "jp-ring-spin 16s linear infinite" }}>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 jp-orb" style={{ width: 70, height: 70 }}>
          <span>⚡</span>
          <span className="text-[10px]">99/100</span>
        </div>
      </div>
      <div className="absolute inset-0" style={{ animation: "jp-ring-spin-rev 20s linear infinite" }}>
        <div className="absolute bottom-4 -left-4 jp-orb" style={{ width: 80, height: 80 }}>
          <span>🎨</span>
          <span className="text-[10px]">UI/UX</span>
        </div>
      </div>
      <div className="absolute inset-0" style={{ animation: "jp-ring-spin 26s linear infinite" }}>
        <div className="absolute top-1/3 -right-4 jp-card jp-orb" style={{ width: "auto", height: "auto", padding: "10px 14px", borderRadius: 14, fontSize: 12 }}>
          🔒 SSL
        </div>
      </div>
    </div>
  );
}

function SplitTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`} style={{ perspective: 800 }}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em] align-top" style={{ transformStyle: "preserve-3d" }}>
          {word.split("").map((ch, i) => (
            <span
              key={i}
              className="inline-block jp-letter-3d"
              style={{
                animationDelay: `${0.06 * (wi * 4 + i) + 0.2}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const settings = useSettings();
  const { t, lang } = useI18n();
  const projects = useProjects();
  const [activeSlide, setActiveSlide] = useState(0);
  useReveal();
  const parallaxRef = useMouseParallax(24);
  const services = withServicePrices(settings, SERVICES);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((s) => (s + 1) % 3), 4500);
    return () => clearInterval(timer);
  }, []);

  const topProjects = useMemo(() => projects.slice(0, 3), [projects]);
  const testimonials = useMemo(
    () =>
      projects
        .filter((p) => p.testimonial)
        .slice(0, 3)
        .map((p) => ({ text: p.testimonial, who: p.title })),
    [projects]
  );

  const stats: [number, string, string][] =
    lang === "en"
      ? [[120, "+", "stat.projects"], [98, "%", "stat.satisfaction"], [7, " days", "stat.delivery"]]
      : lang === "es"
        ? [[120, "+", "stat.projects"], [98, "%", "stat.satisfaction"], [7, " días", "stat.delivery"]]
        : [[120, "+", "stat.projects"], [98, "%", "stat.satisfaction"], [7, " dias", "stat.delivery"]];

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative min-h-[98vh] flex items-center pt-28 pb-20 px-5 overflow-hidden">
        <video className="jp-hero-vid" src={HERO_VIDEO} autoPlay loop muted playsInline />
        <div className="jp-hero-overlay" />
        <div className="jp-aurora" />

        {/* parallax decorative floating shapes */}
        <FloatingShape className="top-24 left-4 hidden md:block" delay={0}>
          <div className="w-20 h-20 rounded-2xl jp-card p-3 flex items-center justify-center text-2xl">💎</div>
        </FloatingShape>
        <FloatingShape className="top-40 right-10 hidden md:block" delay={2}>
          <div className="w-16 h-16 rounded-full jp-card flex items-center justify-center text-xl" style={{ transform: "rotate(12deg)" }}>🚀</div>
        </FloatingShape>
        <FloatingShape className="bottom-32 left-20 hidden md:block" delay={4}>
          <div className="w-14 h-14 rounded-xl jp-card flex items-center justify-center text-xl" style={{ transform: "rotate(-10deg)" }}>✨</div>
        </FloatingShape>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
          <div>
            <span className="jp-tag jp-pulse">🚀 {t("hero.tag")}</span>
            <h1 className="mt-6 text-5xl sm:text-6xl xl:text-[4.8rem] font-black leading-[0.95] jp-glow">
              <span className="jp-gradient-text" data-parallax="-0.04">
                <SplitTitle text={settings.heroTitle || t("hero.title")} />
              </span>
            </h1>
            <p className="mt-6 text-slate-300 text-lg max-w-xl" data-parallax="0.02">
              {settings.heroSubtitle || t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4" data-parallax="0.03">
              <Link href="/pedido" prefetch className="jp-btn px-7 py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 jp-holo">
                {t("common.cta_getquote")}
              </Link>
              <Link href="/portfolio" prefetch className="jp-btn px-7 py-3.5 rounded-xl font-bold text-white bg-white/[.06] border border-white/15">
                {t("common.cta_viewportfolio")}
              </Link>
            </div>

            <div className="mt-10 flex gap-10 flex-wrap" data-parallax="0.04">
              {stats.map(([num, suf, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black jp-gradient-text">
                    <Counter value={num} suffix={suf} />
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{t(label)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[560px] hidden md:block" ref={parallaxRef as React.RefObject<HTMLDivElement>}>
            <ThreeDLogoBadge />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 text-[10px] tracking-[0.3em] uppercase">
          <span className="mb-2">scroll</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-cyan-400 to-transparent jp-pulse-y" />
        </div>
      </header>

      {/* MARQUEE */}
      <div className="py-5 border-y border-white/10 bg-white/[0.024] overflow-hidden">
        <div className="jp-marquee">
          {[...TECHS, ...TECHS].map((tec, i) => (
            <span key={i} className="text-slate-400 font-semibold text-lg flex items-center gap-3">
              <span className="text-fuchsia-400">◆</span> {tec}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker={t("services.kicker")} title={t("services.title")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {services.slice(0, 4).map((s, i) => (
              <Tilt3D key={s.title} max={14}>
                <div className="jp-card jp-reveal rounded-2xl p-6 h-full jp-holo jp-shine group" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition">{s.icon}</div>
                  <h3 className="font-bold text-lg text-white">{s.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{s.desc}</p>
                  <p className="mt-4 text-cyan-300 font-semibold text-sm">{s.price}</p>
                </div>
              </Tilt3D>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/servicos" prefetch className="jp-btn inline-block px-7 py-3 rounded-xl font-bold text-white bg-white/5 border border-white/15">
              {t("common.view_all_services")}
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS with video */}
      <section className="py-20 px-5 bg-white/[0.02] border-y border-white/10 relative overflow-hidden">
        <div className="jp-aurora" style={{ opacity: 0.4 }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle kicker={t("process.kicker")} title={t("process.title")} center={false} />
            <div className="mt-10 relative pl-8">
              <div className="jp-timeline-line" />
              {STEPS.map((s, i) => (
                <div key={s.n} className="jp-reveal relative mb-8" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(217,70,239,.8)]" />
                  <div className="text-4xl font-black jp-gradient-text jp-tilt-n">{s.n}</div>
                  <h3 className="font-bold text-lg mt-1 text-white">{t(`process.s${i + 1}.t`)}</h3>
                  <p className="text-slate-400 text-sm">{t(`process.s${i + 1}.d`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="jp-reveal" data-parallax="-0.05">
            <Tilt3D max={10}>
              <div className="jp-video-thumb jp-holo rounded-3xl overflow-hidden jp-shine">
                <video src={CODE_VIDEO} autoPlay loop muted playsInline />
                <div className="jp-play"><span className="text-5xl">▶</span></div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker={t("portfolio.kicker")} title={t("portfolio.title")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {topProjects.map((p, i) => (
              <Tilt3D key={p.id} max={12}>
                <article className="jp-card jp-reveal rounded-2xl overflow-hidden jp-shine group" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="h-56 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur text-cyan-200">{p.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-fuchsia-300">{p.segment}</p>
                    <p className="text-slate-400 text-sm mt-2">{p.description}</p>
                  </div>
                </article>
              </Tilt3D>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" prefetch className="jp-btn inline-block px-7 py-3 rounded-xl font-bold text-white bg-white/5 border border-white/15">
              {t("common.cta_viewportfolio")} →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-5 bg-white/[.02] border-y border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle kicker={t("testimonials.kicker")} title={t("testimonials.title")} />
          <div className="mt-12 min-h-[160px]">
            {testimonials.length > 0 ? (
              <div key={activeSlide} className="jp-reveal jp-visible">
                <p className="text-xl sm:text-2xl text-slate-200 italic jp-glow">“{testimonials[activeSlide % testimonials.length]?.text}”</p>
                <p className="text-fuchsia-300 mt-4 font-semibold text-sm">— {testimonials[activeSlide % testimonials.length]?.who}</p>
              </div>
            ) : (
              <p className="text-slate-400">Clientes satisfeitos.</p>
            )}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((d) => (
              <button key={d} className={`jp-dot ${activeSlide % 3 === d ? "jp-dot-active" : ""}`} onClick={() => setActiveSlide(d)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto jp-card jp-holo rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden jp-reveal border border-fuchsia-500/10">
          <div className="jp-aurora" style={{ opacity: 0.6 }} />
          <h2 className="text-3xl sm:text-5xl font-black relative jp-glow">
            <span className="jp-gradient-text">{t("cta_banner.title")}</span>
          </h2>
          <p className="text-slate-300 mt-4 relative max-w-xl mx-auto">{t("cta_banner.text")}</p>
          <Link href="/pedido" prefetch className="jp-btn relative inline-block mt-8 px-8 py-4 rounded-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-500 jp-pulse">
            {t("cta_banner.cta")}
          </Link>
        </div>
      </section>

      {/* keyframe pulse-y for scroll indicator */}
      <style jsx global>{`
        @keyframes jp-pulse-y {
          0%,100% { transform: scaleY(1); opacity: .5; }
          50% { transform: scaleY(1.6); opacity: 1; }
        }
        .jp-pulse-y { transform-origin: top; animation: jp-pulse-y 1.8s ease-in-out infinite; }
        @keyframes jp-ring-spin-rev { to { transform: rotate(-360deg); } }
        .jp-tilt-n { display: inline-block; transform: rotate(-6deg); }
        .jp-letter-3d {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px) rotateX(-80deg);
          animation: jp-letter-in 0.7s cubic-bezier(.2,.8,.2,1) forwards;
          text-shadow:
            0 1px 0 #5b21b6,
            0 2px 0 #4c1d95,
            0 4px 0 #312e81,
            0 8px 30px rgba(124,58,237,.55),
            0 14px 30px rgba(34,211,238,.25);
        }
        @keyframes jp-letter-in {
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
      `}</style>
    </div>
  );
}
