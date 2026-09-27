import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";

const TONE = {
  blue: "bg-sky-50 text-sky-700",
  teal: "bg-teal-50 text-teal-700",
  red: "bg-rose-50 text-rose-700",
  amber: "bg-amber-50 text-amber-700",
  green: "bg-emerald-50 text-emerald-700",
};

export default function KpiCard({
  label,
  value,
  icon: Icon,
  tone = "blue",
  hint,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="rounded-2xl border bg-card p-4 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            TONE[tone],
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
        {toFa(value)}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </motion.div>
  );
}
