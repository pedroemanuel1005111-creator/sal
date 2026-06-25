"use client";

import { useEffect, useRef } from "react";

export function Tilt3D({ children, className = "", max = 14 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const innerEl = inner.current; if (!innerEl) return;

    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      innerEl.style.transform = `rotateY(${px * max}deg) rotateX(${ -py * max}deg)`;
    };
    const reset = () => { innerEl.style.transform = "rotateY(0deg) rotateX(0deg)"; };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", handle); el.removeEventListener("mouseleave", reset); };
  }, [max]);

  return (
    <div ref={ref} className={`jp-tilt ${className}`}>
      <div ref={inner} className="jp-tilt-inner">
        {children}
      </div>
    </div>
  );
}

export function useMouseParallax(intensity = 18) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${(-y/intensity)*4}deg) rotateY(${(x/intensity)*6}deg)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [intensity]);
  return ref;
}

export function useScrollParallax() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const onScroll = () => {
      const y = window.scrollY;
      els.forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.2);
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let start = 0;
    const end = value;
    const dur = 1600;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      start = Math.round(end * eased);
      el.textContent = start.toString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) requestAnimationFrame(step);
    }, { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return <span ref={ref} className="jp-counter">0{suffix}</span>;
}
