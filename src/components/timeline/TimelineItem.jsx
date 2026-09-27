import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fmtDate, relDay } from "@/lib/fa";
import { TIMELINE_TYPES } from "./timelineTypes";

export default function TimelineItem({ item, last }) {
  const t = TIMELINE_TYPES[item.type];
  const Icon = t.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex gap-4 pb-6"
    >
      {!last && (
        <span className="absolute bottom-0 start-[19px] top-11 w-px bg-border" />
      )}
      <span
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
          t.cls,
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-sm font-semibold">{item.title}</p>
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
              t.chip,
            )}
          >
            {t.label}
          </span>
        </div>
        {item.note && (
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {item.note}
          </p>
        )}
        <p className="mt-1.5 text-xs text-muted-foreground/80">
          {fmtDate(item.date)} · {relDay(item.date)}
          {item.by && ` · ${item.by}`}
        </p>
      </div>
    </motion.li>
  );
}
