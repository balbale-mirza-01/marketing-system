import React from "react";
import { GitBranch } from "lucide-react";
import Section from "@/components/common/Section";
import StatusBadge from "@/components/common/StatusBadge";
import { getMarketer } from "@/services/customerService";
import { LEAD_STATUS } from "@/data/constants";
import { fmtDate } from "@/lib/fa";

export default function StatusHistory({ lead }) {
  const items = [...lead.history].reverse();
  return (
    <Section title="تاریخچه وضعیت" icon={GitBranch}>
      <ol className="relative space-y-4 border-s ps-5 ms-1.5">
        {items.map((h, i) => (
          <li key={i} className="relative">
            <span className="absolute -start-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary ring-1 ring-primary/30" />
            <StatusBadge tone={LEAD_STATUS[h.status].tone}>
              {LEAD_STATUS[h.status].label}
            </StatusBadge>
            {h.note && <p className="mt-1 text-xs">{h.note}</p>}
            <p className="mt-1 text-xs text-muted-foreground">
              {fmtDate(h.date)} · {getMarketer(h.by)?.name || "سیستم"}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
