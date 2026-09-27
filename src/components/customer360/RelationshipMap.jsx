import React from "react";
import { Building2 } from "lucide-react";
import Avatar from "@/components/common/Avatar";

export default function RelationshipMap({ c }) {
  const n = c.persons.length;
  const nodes = c.persons.map((p, k) => {
    const a = (2 * Math.PI * k) / n - Math.PI / 2;
    return { p, x: 50 + 36 * Math.cos(a), y: 50 + 36 * Math.sin(a) };
  });
  return (
    <div className="relative h-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/60 ring-1 ring-slate-100 sm:h-[360px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {nodes.map(({ p, x, y }) => (
          <line
            key={p.id}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="#94a3b8"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
          <Building2 className="h-7 w-7" />
        </span>
        <span className="mt-2 max-w-[140px] text-center text-xs font-semibold">
          {c.name}
        </span>
      </div>
      {nodes.map(({ p, x, y }) => (
        <div
          key={p.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <Avatar name={p.name} className="h-11 w-11 ring-4 ring-white" />
          <span className="mt-1 whitespace-nowrap text-[11px] font-semibold">
            {p.name}
          </span>
          <span className="text-[10px] text-muted-foreground">{p.role}</span>
        </div>
      ))}
    </div>
  );
}
