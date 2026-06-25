"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import AssistantWidget from "../components/AssistantWidget";
import InstantNav from "../components/InstantNav";
import ParticleField from "../components/ParticleField";
import CursorGlow from "../components/CursorGlow";
import { AmbientBackground } from "../components/Ui";
import { useScrollParallax } from "../components/ThreeD";

export default function SiteLayout({ children }: { children: ReactNode }) {
  useScrollParallax();

  useEffect(() => {
    fetch("/api/seed", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <>
      <Intro />
      <AmbientBackground />
      <ParticleField density={70} />
      <CursorGlow />
      <InstantNav />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <AssistantWidget />
    </>
  );
}
