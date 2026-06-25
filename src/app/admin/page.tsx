"use client";

import { useCallback, useEffect, useState } from "react";
import Logo from "../Logo";

type Project = {
  id: number;
  title: string;
  segment: string;
  category: string;
  description: string;
  imageUrl: string;
  url: string;
  tech: string;
  results: string;
  testimonial: string;
};

type Media = {
  id: number;
  type: string;
  url: string;
  title: string;
  category: string;
};

type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budget: string;
  deadline: string;
  message: string;
  status: string;
  createdAt: string;
};

const TABS = ["Pedidos", "Projetos", "Mídia", "Configurações"] as const;
type Tab = (typeof TABS)[number];

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Pedidos");

  useEffect(() => {
    const t = localStorage.getItem("jp_admin_token");
    if (t) setToken(t);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem("jp_admin_token", data.token);
      setToken(data.token);
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  const logout = () => {
    localStorage.removeItem("jp_admin_token");
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <form onSubmit={login} className="jp-card rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="flex justify-center mb-4"><Logo size={64} /></div>
          <h1 className="text-2xl font-black jp-gradient-text">Área Administrativa</h1>
          <p className="text-slate-400 text-sm mt-1">Jovens Programadores</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            className="w-full mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          />
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <button className="jp-btn w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">
            Entrar
          </button>
          <a href="/" className="block mt-4 text-xs text-slate-500 hover:text-white">← Voltar ao site</a>
          <p className="mt-4 text-[11px] text-slate-600">Senha padrão: jovens2024</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-black">Painel <span className="jp-gradient-text">Admin</span></span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-slate-300 hover:text-white">Ver site</a>
            <button onClick={logout} className="text-sm px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                tab === t
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Pedidos" && <OrdersTab token={token} />}
        {tab === "Projetos" && <ProjectsTab token={token} />}
        {tab === "Mídia" && <MediaTab token={token} />}
        {tab === "Configurações" && <SettingsTab token={token} />}
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400";

/* -------------------- ORDERS -------------------- */
function OrdersTab({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const load = useCallback(() => {
    fetch("/api/orders", { headers: { "x-admin-token": token }, cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : []));
  }, [token]);
  useEffect(() => {
    load();
    const id = window.setInterval(load, 4000);
    return () => clearInterval(id);
  }, [load]);

  const setStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ status }),
    });
    load();
  };
  const remove = async (id: number) => {
    if (!confirm("Excluir este pedido?")) return;
    await fetch(`/api/orders/${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  const statusColor: Record<string, string> = {
    Novo: "text-cyan-300",
    "Em andamento": "text-yellow-300",
    Concluído: "text-green-400",
    Cancelado: "text-red-400",
  };

  return (
    <div>
      <h2 className="font-black text-xl mb-4">Pedidos recebidos ({orders.length})</h2>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="jp-card rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white">{o.name} <span className={`text-xs ${statusColor[o.status] || "text-slate-400"}`}>● {o.status}</span></h3>
                <p className="text-sm text-slate-400">{o.serviceType} • {o.budget} • {o.deadline}</p>
                <p className="text-xs text-slate-500 mt-1">{o.email} {o.phone && `• ${o.phone}`}</p>
                {o.message && <p className="text-sm text-slate-300 mt-2">{o.message}</p>}
                <p className="text-[11px] text-slate-600 mt-2">{new Date(o.createdAt).toLocaleString("pt-BR")}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                  className={`${inputCls} w-auto`}
                >
                  {["Novo", "Em andamento", "Concluído", "Cancelado"].map((s) => (
                    <option key={s} className="bg-[#0b1030]">{s}</option>
                  ))}
                </select>
                <button onClick={() => remove(o.id)} className="text-xs text-red-400 hover:text-red-300">Excluir</button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-slate-500">Nenhum pedido ainda.</p>}
      </div>
    </div>
  );
}

/* -------------------- PROJECTS -------------------- */
const emptyProject = {
  title: "",
  segment: "",
  category: "Institucional",
  description: "",
  imageUrl: "",
  url: "",
  tech: "",
  results: "",
  testimonial: "",
};

function ProjectsTab({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ ...emptyProject });
  const [editing, setEditing] = useState<number | null>(null);

  const load = useCallback(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []));
  }, []);
  useEffect(() => {
    load();
    const id = window.setInterval(load, 4000);
    return () => clearInterval(id);
  }, [load]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/projects/${editing}` : "/api/projects";
    const method = editing ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify(form),
    });
    setForm({ ...emptyProject });
    setEditing(null);
    load();
  };
  const edit = (p: Project) => {
    setEditing(p.id);
    setForm({ ...p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const remove = async (id: number) => {
    if (!confirm("Excluir este projeto?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={save} className="jp-card rounded-xl p-5 space-y-3 h-fit">
        <h2 className="font-black text-lg">{editing ? "Editar projeto" : "Novo projeto"}</h2>
        <input className={inputCls} placeholder="Título *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className={inputCls} placeholder="Segmento (ex: Arquitetura)" value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} />
        <input className={inputCls} placeholder="Categoria (ex: E-commerce)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className={inputCls} placeholder="URL da imagem" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <input className={inputCls} placeholder="Link do projeto" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input className={inputCls} placeholder="Tecnologias" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
        <textarea className={inputCls} rows={2} placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className={inputCls} placeholder="Resultados (ex: +150% tráfego)" value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} />
        <textarea className={inputCls} rows={2} placeholder="Depoimento do cliente" value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} />
        <div className="flex gap-2">
          <button className="jp-btn flex-1 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">
            {editing ? "Salvar alterações" : "Adicionar projeto"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ ...emptyProject }); }} className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-black text-lg">Projetos ({projects.length})</h2>
        {projects.map((p) => (
          <div key={p.id} className="jp-card rounded-xl p-4 flex gap-3 items-center">
            {p.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{p.title}</h3>
              <p className="text-xs text-slate-400">{p.category} • {p.segment}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => edit(p)} className="text-xs text-cyan-300 hover:text-cyan-200">Editar</button>
              <button onClick={() => remove(p.id)} className="text-xs text-red-400 hover:text-red-300">Excluir</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-slate-500">Nenhum projeto cadastrado.</p>}
      </div>
    </div>
  );
}

/* -------------------- MEDIA -------------------- */
function MediaTab({ token }: { token: string }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [form, setForm] = useState({ type: "image", url: "", title: "", category: "Geral" });

  const load = useCallback(() => {
    fetch("/api/media", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setMedia(Array.isArray(d) ? d : []));
  }, []);
  useEffect(() => {
    load();
    const id = window.setInterval(load, 4000);
    return () => clearInterval(id);
  }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) return;
    await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify(form),
    });
    setForm({ type: "image", url: "", title: "", category: "Geral" });
    load();
  };
  const remove = async (id: number) => {
    if (!confirm("Excluir esta mídia?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    load();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={add} className="jp-card rounded-xl p-5 space-y-3 h-fit">
        <h2 className="font-black text-lg">Adicionar foto ou vídeo</h2>
        <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="image" className="bg-[#0b1030]">Imagem</option>
          <option value="video" className="bg-[#0b1030]">Vídeo</option>
        </select>
        <input className={inputCls} placeholder="URL da mídia (https://...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
        <input className={inputCls} placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className={inputCls} placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <button className="jp-btn w-full py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">Adicionar</button>
        <p className="text-xs text-slate-500">Dica: cole o link de uma imagem/vídeo já hospedado na internet.</p>
      </form>

      <div>
        <h2 className="font-black text-lg mb-3">Galeria ({media.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((m) => (
            <div key={m.id} className="jp-card rounded-xl overflow-hidden relative aspect-square group">
              {m.type === "video" ? (
                <video src={m.url} className="w-full h-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => remove(m.id)}
                className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500/90 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
              {m.title && <span className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[10px] text-white truncate">{m.title}</span>}
            </div>
          ))}
          {media.length === 0 && <p className="text-slate-500 col-span-full">Nenhuma mídia.</p>}
        </div>
      </div>
    </div>
  );
}

/* -------------------- SETTINGS -------------------- */
const SETTING_FIELDS: [string, string, boolean][] = [
  ["companyName", "Nome da empresa", false],
  ["slogan", "Slogan", false],
  ["email", "E-mail de contato", false],
  ["whatsapp", "WhatsApp (somente números, ex: 5599999999999)", false],
  ["instagram", "Instagram (URL completa)", false],
  ["locationLabel", "Localização / área de atendimento", false],
  ["locationUrl", "URL do Google Maps / localização", false],
  ["heroTitle", "Título principal (hero)", false],
  ["heroSubtitle", "Subtítulo (hero)", true],
  ["aboutText", "Texto sobre a empresa", true],
  ["priceInstitutional", "Preço — Sites Institucionais", false],
  ["pricePortfolio", "Preço — Portfólio Profissional", false],
  ["priceLanding", "Preço — Landing Pages", false],
  ["priceEcommerce", "Preço — Lojas Virtuais", false],
  ["priceSystems", "Preço — Sistemas Web", false],
  ["priceBlog", "Preço — Blog Profissional", false],
  ["priceRedesign", "Preço — Redesign de Sites", false],
  ["priceSupport", "Preço — Manutenção & Suporte", false],
];

function SettingsTab({ token }: { token: string }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const load = () => {
      if (dirty) return;
      fetch("/api/settings", { cache: "no-store" }).then((r) => r.json()).then(setData);
    };
    load();
    const id = window.setInterval(load, 4000);
    return () => clearInterval(id);
  }, [dirty]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify(data),
    });
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={save} className="jp-card rounded-xl p-6 max-w-2xl space-y-4">
      <h2 className="font-black text-lg">Configurações do site</h2>
      <p className="text-xs text-slate-500">Altere preços, Instagram, localização, textos e contatos. O site público atualiza automaticamente em poucos segundos.</p>
      {SETTING_FIELDS.map(([key, label, big]) => (
        <div key={key}>
          <label className="text-sm text-slate-400">{label}</label>
          {big ? (
              <textarea
                className={`${inputCls} mt-1`}
                rows={3}
                value={data[key] || ""}
                onChange={(e) => {
                  setDirty(true);
                  setData({ ...data, [key]: e.target.value });
                }}
              />
          ) : (
            <input
              className={`${inputCls} mt-1`}
              value={data[key] || ""}
              onChange={(e) => {
                setDirty(true);
                setData({ ...data, [key]: e.target.value });
              }}
            />
          )}
        </div>
      ))}
      <button className="jp-btn w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">
        Salvar configurações
      </button>
      {saved && <p className="text-green-400 text-sm text-center">✓ Configurações salvas!</p>}
    </form>
  );
}
