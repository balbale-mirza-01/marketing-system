import React from "react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";
import { LEAD_STATUS } from "@/data/constants";

export default function LeadStatusChips({ leads, active, onChange }) {
  const items = [
    ["all", "همه", leads.length],
    ...Object.entries(LEAD_STATUS).map(([k, v]) => [
      k,
      v.label,
      leads.filter((l) => l.status === k).length,
    ]),
  ];
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      {items.map(([k, label, n]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm transition",
            active === k
              ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-card hover:bg-muted",
          )}
        >
          {label}
          <span
            className={cn(
              "text-xs font-bold",
              active === k ? "text-white/80" : "text-muted-foreground",
            )}
          >
            {toFa(n)}
          </span>
        </button>
      ))}
    </div>
  );
}
