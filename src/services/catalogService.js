import { catalog } from "@/data/catalog";
import { toEn } from "@/lib/fa";

export const getCatalog = () => catalog;
export const getCatalogItem = (id) => catalog.find((p) => p.id === id);

export function filterCatalog(list, f) {
  const q = toEn(f.q.trim());
  return list.filter(
    (p) =>
      (!q || p.name.includes(q) || p.summary.includes(q)) &&
      (f.category === "all" || p.category === f.category),
  );
}
