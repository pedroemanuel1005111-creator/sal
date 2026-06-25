"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { MediaItem, Project, Settings } from "./data";
import { mediaCache, projectsCache, settingsCache } from "./cache";

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function useSettings(intervalMs = 4000) {
  const subscribe = (cb: () => void) => {
    const unsub = settingsCache.subscribe(() => cb());
    // Primeira carga (idempotente)
    settingsCache.load(() => fetchJson<Settings>("/api/settings"));
    const id = window.setInterval(() => {
      settingsCache.load(() => fetchJson<Settings>("/api/settings"));
    }, intervalMs);
    return () => {
      unsub();
      clearInterval(id);
    };
  };
  const snap = () => settingsCache.get() || {};
  return useSyncExternalStore(subscribe, snap, snap);
}

export function useProjects(intervalMs = 5000) {
  const subscribe = (cb: () => void) => {
    const unsub = projectsCache.subscribe(() => cb());
    projectsCache.load(() =>
      fetchJson<Project[]>("/api/projects").then((d) => (Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null))
    );
    const id = window.setInterval(() => {
      projectsCache.load(() =>
        fetchJson<Project[]>("/api/projects").then((d) =>
          Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null
        )
      );
    }, intervalMs);
    return () => {
      unsub();
      clearInterval(id);
    };
  };
  const snap = () => (projectsCache.get() as unknown as Project[] | null) || [];
  return useSyncExternalStore(subscribe, snap, snap);
}

export function useMedia(intervalMs = 5000) {
  const subscribe = (cb: () => void) => {
    const unsub = mediaCache.subscribe(() => cb());
    mediaCache.load(() =>
      fetchJson<MediaItem[]>("/api/media").then((d) =>
        Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null
      )
    );
    const id = window.setInterval(() => {
      mediaCache.load(() =>
        fetchJson<MediaItem[]>("/api/media").then((d) =>
          Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null
        )
      );
    }, intervalMs);
    return () => {
      unsub();
      clearInterval(id);
    };
  };
  const snap = () => (mediaCache.get() as unknown as MediaItem[] | null) || [];
  return useSyncExternalStore(subscribe, snap, snap);
}

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jp-reveal:not(.jp-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("jp-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export function prewarmAllData() {
  settingsCache.load(() => fetchJson<Settings>("/api/settings"));
  projectsCache.load(() =>
    fetchJson<Project[]>("/api/projects").then((d) =>
      Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null
    )
  );
  mediaCache.load(() =>
    fetchJson<MediaItem[]>("/api/media").then((d) =>
      Array.isArray(d) ? (d as unknown as Record<string, unknown>[]) : null
    )
  );
}
