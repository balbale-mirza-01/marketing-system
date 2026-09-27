import React from "react";
import SearchInput from "@/components/common/SearchInput";
import { CATEGORIES } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";

const ICONS = {
  PiggyBank: "🏦",
  Landmark: "🏛️",
  CreditCard: "💳",
  Briefcase: "💼",
};

export default function CatalogFilters({ value, onChange, counts }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  const cats = [
    ["all", "همه محصولات", counts.all],
    ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.label, counts[k] || 0]),
  ];
  return (
    <div className="space-y-4">
      <div className="lg:max-w-md">
        <SearchInput
          value={value.q}
          onChange={set("q")}
          placeholder="جستجوی محصول…"
        />
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {cats.map(([k, label, n]) => (
          <button
            key={k}
            onClick={() => set("category")(k)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm transition",
              value.category === k
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted",
            )}
          >
            {k !== "all" && <span>{ICONS[CATEGORIES[k].icon]}</span>}
            {label}
            <span
              className={cn(
                "text-xs font-bold",
                value.category === k
                  ? "text-white/80"
                  : "text-muted-foreground",
              )}
            >
              {toFa(n)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
