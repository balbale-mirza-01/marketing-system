import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  JMONTHS,
  WEEKDAYS,
  fromJ,
  monthLength,
  toJ,
  weekdayIndex,
} from "@/lib/jalali";
import { fmtDate, toFa } from "@/lib/fa";

export default function JalaliDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
}) {
  const [open, setOpen] = useState(false);
  const init = toJ(value ? new Date(value) : new Date());
  const [[y, m], setView] = useState([init[0], init[1]]);
  const offset = weekdayIndex(fromJ(y, m, 1));
  const len = monthLength(y, m);
  const sel = value ? toJ(new Date(value)).join("-") : null;
  const today = toJ(new Date()).join("-");
  const shift = (d) => {
    let nm = m + d,
      ny = y;
    if (nm < 1) {
      nm = 12;
      ny--;
    }
    if (nm > 12) {
      nm = 1;
      ny++;
    }
    setView([ny, nm]);
  };
  const pick = (d) => {
    onChange(fromJ(y, m, d).toISOString());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center gap-2 rounded-xl border bg-card px-3 text-sm"
        >
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className={value ? "" : "text-muted-foreground"}>
            {value ? fmtDate(value) : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="start" dir="rtl">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => shift(-1)}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold">
            {JMONTHS[m - 1]} {toFa(y)}
          </p>
          <button
            type="button"
            onClick={() => shift(1)}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {WEEKDAYS.map((w, i) => (
            <span
              key={w}
              className={cn(
                "py-1 text-muted-foreground",
                i === 6 && "text-rose-500",
              )}
            >
              {w}
            </span>
          ))}
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`e${i}`} />
          ))}
          {Array.from({ length: len }, (_, i) => i + 1).map((d) => {
            const key = `${y}-${m}-${d}`;
            return (
              <button
                type="button"
                key={d}
                onClick={() => pick(d)}
                className={cn(
                  "h-8 rounded-lg text-sm transition hover:bg-muted",
                  key === today && "font-bold text-primary",
                  key === sel &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )}
              >
                {toFa(d)}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
