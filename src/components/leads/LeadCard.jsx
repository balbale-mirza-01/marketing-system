import React from "react";
import { CalendarClock, User } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import Avatar from "@/components/common/Avatar";
import SlaBadge from "./SlaBadge";
import PriorityBadge from "./PriorityBadge";
import { getMarketer } from "@/services/customerService";
import { LEAD_SOURCES, LEAD_STATUS } from "@/data/constants";
import { relDay } from "@/lib/fa";

export default function LeadCard({ lead }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar name={lead.name} className="h-11 w-11" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold">{lead.name}</p>
          <StatusBadge tone={LEAD_STATUS[lead.status].tone}>
            {LEAD_STATUS[lead.status].label}
          </StatusBadge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {lead.interest} ·{" "}
          {lead.sources.map((s) => LEAD_SOURCES[s].short).join("، ")}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {getMarketer(lead.ownerId)?.name || "بدون مالک"}
          </span>
          {lead.nextFollowUp && (
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" />
              {relDay(lead.nextFollowUp)}
            </span>
          )}
          <SlaBadge lead={lead} />
          <PriorityBadge lead={lead} />
        </div>
      </div>
    </div>
  );
}
