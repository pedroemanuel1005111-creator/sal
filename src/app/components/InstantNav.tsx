"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { prewarmAllData } from "../useSettings";

const ROUTES = ["/", "/servicos", "/portfolio", "/galeria", "/sobre", "/contato", "/pedido"];

// Transições entre páginas usando View Transitions API (suportada em Chrome/Edge).
function startPageTransition() {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void;
  };
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(() => {});
  }
}

export default function InstantNav() {
  const router = useRouter();

  useEffect(() => {
    // Pré-carrega os dados compartilhados de todas as páginas na primeira carga.
    prewarmAllData();

    // Pré-aquece todas as rotas assim que o navegador estiver ocioso.
    const prefetchAll = () => ROUTES.forEach((r) => router.prefetch(r));
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(prefetchAll, { timeout: 1200 });
    } else {
      setTimeout(prefetchAll, 300);
    }

    // Prefetch no hover/touchstart: antes mesmo do clique, a rota já está no cache.
    const onHover = (e: MouseEvent | TouchEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("/api") && !href.startsWith("/admin")) {
        router.prefetch(href);
        startPageTransition();
      }
    };
    document.addEventListener("mouseover", onHover, { passive: true });
    document.addEventListener("touchstart", onHover, { passive: true });

    // Transição suave ao navegar pelo histórico.
    (window as Window & { navigation?: any }).navigation?.addEventListener?.("navigate", () => {
      startPageTransition();
    });

    // Scroll instantâneo ao topo em navegações via Link (App Router).
    const resetTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };

    // Observa mudanças de rota via popstate.
    window.addEventListener("popstate", resetTop);

    return () => {
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("touchstart", onHover);
      window.removeEventListener("popstate", resetTop);
    };
  }, [router]);

  return null;
}
