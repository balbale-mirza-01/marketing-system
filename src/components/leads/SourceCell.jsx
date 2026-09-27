import React from "react";
import { LEAD_SOURCES } from "@/data/constants";
import { prioritySource } from "@/services/leadService";
import { toFa } from "@/lib/fa";
import PriorityBadge from "./PriorityBadge";

export default function SourceCell({ lead }) {
  const main = prioritySource(lead);
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-sm">
        {LEAD_SOURCES[main].label}
        {lead.sources.length > 1 && (
          <span className="ms-1 text-xs text-muted-foreground">
            (+{toFa(lead.sources.length - 1)} منبع)
          </span>
        )}
      </span>
      <PriorityBadge lead={lead} />
    </div>
  );
}
