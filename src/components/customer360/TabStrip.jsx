import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";

export default function TabStrip({ tabs, active, onChange }) {
  return (
    <div className="sticky top-16 z-20 -mx-4 border-b bg-background/90 backdrop-blur-xl sm:mx-0">
      <div className="no-scrollbar flex snap-x gap-1 overflow-x-auto px-4 sm:px-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative snap-start whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors",
              active === t.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {t.count != null && (
              <span className="ms-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px]">
                {toFa(t.count)}
              </span>
            )}
            {active === t.id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
