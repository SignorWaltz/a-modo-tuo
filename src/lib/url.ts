/** Prefix a site path with Astro `base` (e.g. `/a-modo-tuo/` on GitHub Pages). */
export function url(path = "/"): string {
  const base = import.meta.env.BASE_URL || "/";
  if (!path || path === "/") return base;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
