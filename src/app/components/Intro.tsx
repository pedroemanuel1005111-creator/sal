"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo";

const BGVID =
  "https://videos.pexels.com/video-files/29717537/12777857_3840_2160_30fps.mp4";

export default function Intro() {
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);
  const word = "JOVENS";
  const word2 = "PROGRAMADORES";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("jp_intro_seen");
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setOut(true), 9000);
    const t2 = setTimeout(finish, 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function finish() {
    sessionStorage.setItem("jp_intro_seen", "1");
    document.body.style.overflow = "";
    setShow(false);
  }
  function skip() { setOut(true); setTimeout(finish, 900); }

  if (!show) return null;

  return (
    <div className={`jp-intro ${out ? "jp-intro-out" : ""}`}>
      <video className="jp-intro-bgvid" src={BGVID} autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,20,60,.3),rgba(5,6,15,.96))]" />
      <div className="jp-aurora" style={{ opacity:.6 }} />

      <div className="jp-ring" style={{ width: 560, height: 560 }} />
      <div className="jp-ring" style={{ width: 380, height: 380, animationDirection:"reverse", animationDuration:"10s" }} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="jp-float-slow" style={{ marginBottom: 18 }}>
          <Logo size={96} />
        </div>
        <h1 className="jp-intro-word text-white text-5xl sm:text-7xl md:text-8xl">
          <span>
            {word.split("").map((c, i) => (
              <span key={`a${i}`} className="jp-letter jp-gradient-text jp-glow" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                {c}
              </span>
            ))}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 tracking-[0.25em] text-cyan-200/90">
            {word2.split("").map((c, i) => (
              <span key={`b${i}`} className="jp-letter" style={{ animationDelay: `${1.6 + i * 0.07}s` }}>
                {c}
              </span>
            ))}
          </span>
        </h1>
        <p className="jp-intro-sub mt-6 text-slate-300 text-sm sm:text-base tracking-widest uppercase" style={{ animationDelay: "3.4s" }}>
          Transformamos ideias em experiências digitais
        </p>
        <div className="mt-10 w-64 sm:w-80 bg-white/10 rounded-full overflow-hidden">
          <div className="jp-progress" />
        </div>
        <button onClick={skip} className="mt-6 text-xs text-slate-400 hover:text-white transition tracking-widest uppercase">
          Pular intro ▸
        </button>
      </div>
    </div>
  );
}
