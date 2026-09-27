import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LEAD_SOURCES } from "@/data/constants";

export default function SourceCheckboxes({ value, onChange }) {
  const toggle = (s) =>
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {Object.entries(LEAD_SOURCES).map(([k, v]) => (
        <label
          key={k}
          className={cn(
            "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition",
            value.includes(k)
              ? "border-primary bg-primary/5"
              : "hover:bg-muted",
          )}
        >
          <Checkbox
            checked={value.includes(k)}
            onCheckedChange={() => toggle(k)}
          />
          {v.label}
        </label>
      ))}
    </div>
  );
}
