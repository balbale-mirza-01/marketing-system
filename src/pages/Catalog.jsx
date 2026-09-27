import React, { useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import CatalogCard from "@/components/catalog/CatalogCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import { filterCatalog, getCatalog } from "@/services/catalogService";
import { CATEGORIES } from "@/data/catalog";
import { toFa } from "@/lib/fa";

const INIT = { q: "", category: "all" };

export default function Catalog() {
  const [filters, setFilters] = useState(INIT);
  const all = useMemo(() => getCatalog(), []);
  const rows = useMemo(() => filterCatalog(all, filters), [all, filters]);
  const counts = useMemo(
    () => ({
      all: all.length,
      ...Object.fromEntries(
        Object.keys(CATEGORIES).map((k) => [
          k,
          all.filter((p) => p.category === k).length,
        ]),
      ),
    }),
    [all],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="کاتالوگ محصولات و خدمات"
        subtitle={`${toFa(all.length)} محصول در چهار دسته — سپرده، تسهیلات، کارت و خدمات SME`}
      />
      <CatalogFilters value={filters} onChange={setFilters} counts={counts} />
      {rows.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((p) => (
            <CatalogCard key={p.id} item={p} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="محصولی یافت نشد"
          text="عبارت جستجو یا فیلتر دسته را تغییر دهید."
        />
      )}
    </div>
  );
}
