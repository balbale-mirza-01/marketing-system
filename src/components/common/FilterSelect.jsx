import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function FilterSelect({ value, onChange, options, className }) {
  return (
    <Select dir="rtl" value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-10 min-w-[140px] shrink-0 rounded-xl bg-card",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
