import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/common/StatusBadge";
import { SCORES } from "@/data/constants";

const BAR = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-rose-500",
};

export default function AiScoreCard({ score }) {
  const s = SCORES[score];
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50 p-4 ring-1 ring-sky-100 sm:w-56">
      <p className="flex items-center gap-1.5 text-xs font-medium text-sky-800">
        <Sparkles className="h-3.5 w-3.5" />
        امتیاز پیشنهادی هوش مصنوعی
      </p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl font-bold">{s.label}</p>
        <StatusBadge tone={s.tone}>اعتبارسنجی</StatusBadge>
      </div>
      <div className="mt-3 flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              n <= s.level ? BAR[s.tone] : "bg-slate-200",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
        داده نمایشی — در فازهای آینده با موتور هوشمند تکمیل می‌شود.
      </p>
    </div>
  );
}
