// Cache global em memória compartilhado entre páginas do cliente
// para navegação instantânea — sem esperar fetch na troca de rota.

type Listener<T> = (v: T) => void;

class Shared<T extends object> {
  private value: T | null = null;
  private listeners = new Set<Listener<T>>();
  private pending: Promise<T | null> | null = null;

  get(): T | null {
    return this.value;
  }

  set(v: T) {
    this.value = v;
    this.listeners.forEach((l) => l(v));
  }

  subscribe(fn: Listener<T>) {
    this.listeners.add(fn);
    if (this.value) fn(this.value);
    return () => this.listeners.delete(fn);
  }

  async load(fetcher: () => Promise<T | null>): Promise<T | null> {
    if (this.value) return this.value;
    if (this.pending) return this.pending;
    this.pending = (async () => {
      const data = await fetcher();
      if (data) this.set(data);
      this.pending = null;
      return data;
    })();
    return this.pending;
  }

  invalidate() {
    this.value = null;
    this.pending = null;
  }
}

export const settingsCache = new Shared<Record<string, string>>();
export const projectsCache = new Shared<Array<Record<string, unknown>>>();
export const mediaCache = new Shared<Array<Record<string, unknown>>>();
