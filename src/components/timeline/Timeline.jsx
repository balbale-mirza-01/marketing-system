import React, { useState } from "react";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/common/EmptyState";
import TimelineItem from "./TimelineItem";
import { TIMELINE_TYPES } from "./timelineTypes";

export default function Timeline({ items, filterable = false }) {
  const [type, setType] = useState("all");
  const shown = type === "all" ? items : items.filter((i) => i.type === type);
  const present = [...new Set(items.map((i) => i.type))];

  return (
    <div>
      {filterable && (
        <div className="no-scrollbar -mx-1 mb-5 flex gap-2 overflow-x-auto px-1">
          {["all", ...present].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition",
                type === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card hover:bg-muted",
              )}
            >
              {t === "all" ? "همه رویدادها" : TIMELINE_TYPES[t].label}
            </button>
          ))}
        </div>
      )}
      {shown.length ? (
        <ol>
          {shown.map((it, i) => (
            <TimelineItem key={it.id} item={it} last={i === shown.length - 1} />
          ))}
        </ol>
      ) : (
        <EmptyState icon={History} title="رویدادی ثبت نشده است" />
      )}
    </div>
  );
}
