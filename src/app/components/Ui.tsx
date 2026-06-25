"use client";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="jp-blob" style={{ width: 500, height: 500, background: "#1e3a8a", top: "-5%", left: "-5%" }} />
      <div className="jp-blob" style={{ width: 420, height: 420, background: "#7c3aed", top: "40%", right: "-8%", animationDelay: "3s" }} />
      <div className="jp-blob" style={{ width: 360, height: 360, background: "#0e7490", bottom: "-5%", left: "30%", animationDelay: "5s" }} />
      <div className="absolute inset-0 jp-grid-bg" />
    </div>
  );
}

export function SectionTitle({
  kicker,
  title,
  center = true,
}: {
  kicker: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`jp-reveal ${center ? "text-center" : ""}`}>
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
        {kicker}
      </span>
      <h2 className="text-3xl sm:text-5xl font-black mt-3">
        <span className="jp-gradient-text">{title}</span>
      </h2>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="pt-36 pb-12 px-5 text-center relative">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
        {kicker}
      </span>
      <h1 className="text-4xl sm:text-6xl font-black mt-4">
        <span className="jp-gradient-text">{title}</span>
      </h1>
      {subtitle && (
        <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </header>
  );
}
