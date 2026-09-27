import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEAD_SOURCES } from "@/data/constants";
import { toFa } from "@/lib/fa";

export default function PriorityBanner({ lead, className }) {
  const sorted = [...lead.sources].sort(
    (a, b) => LEAD_SOURCES[b].rank - LEAD_SOURCES[a].rank,
  );
  return (
    <div
      className={cn(
        "rounded-2xl bg-amber-50/70 p-4 ring-1 ring-amber-200",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
        <Crown className="h-4 w-4" />
        ارجاع هم‌زمان از {toFa(lead.sources.length)} منبع
      </p>
      <p className="mt-1 text-xs leading-6 text-amber-800/80">
        طبق قاعده اولویت تخصیص، این سرنخ بر اساس منبع «
        {LEAD_SOURCES[sorted[0]].label}» مدیریت می‌شود.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sorted.map((s, i) => (
          <span
            key={s}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              i === 0
                ? "bg-amber-500 text-white"
                : "bg-white text-amber-800 ring-1 ring-amber-200",
            )}
          >
            {toFa(i + 1)}. {LEAD_SOURCES[s].label}
          </span>
        ))}
      </div>
    </div>
  );
}
