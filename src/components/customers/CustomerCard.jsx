import React from "react";
import { ChevronLeft, Landmark, Phone } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import CustomerAvatar from "./CustomerAvatar";
import { CUSTOMER_STATUS } from "@/data/constants";
import { toFa } from "@/lib/fa";

export default function CustomerCard({ c }) {
  const st = CUSTOMER_STATUS[c.status];
  return (
    <div className="flex items-start gap-3">
      <CustomerAvatar c={c} className="h-11 w-11" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold">{c.name}</p>
          <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {c.type === "company" ? "حقوقی" : "حقیقی"} · {c.segment}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            {toFa(c.phone)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Landmark className="h-3.5 w-3.5" />
            {c.branch}
          </span>
        </div>
      </div>
      <ChevronLeft className="mt-3 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
