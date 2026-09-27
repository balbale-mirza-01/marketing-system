import React from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NextAction({ text, owner, className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-50 to-sky-50 px-4 py-3 ring-1 ring-teal-100",
        className,
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
        <Zap className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-6">
          <span className="font-semibold text-teal-800">اقدام بعدی: </span>
          {text}
        </p>
        {owner && (
          <p className="mt-0.5 text-xs text-muted-foreground">مسئول: {owner}</p>
        )}
      </div>
    </div>
  );
}
