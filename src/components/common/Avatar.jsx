import React from "react";
import { cn } from "@/lib/utils";

const COLORS = [
  "bg-sky-100 text-sky-800",
  "bg-teal-100 text-teal-800",
  "bg-indigo-100 text-indigo-800",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-800",
];

export default function Avatar({ name = "", className }) {
  const parts = name.split(" ");
  const initials = (parts[0]?.[0] || "") + "\u200c" + (parts[1]?.[0] || "");
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        COLORS[name.length % COLORS.length],
        className,
      )}
    >
      {initials}
    </span>
  );
}
