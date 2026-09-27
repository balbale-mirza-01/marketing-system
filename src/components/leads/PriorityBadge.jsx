import React from "react";
import { Crown } from "lucide-react";
import { LEAD_SOURCES } from "@/data/constants";
import { prioritySource } from "@/services/leadService";

export default function PriorityBadge({ lead }) {
  if (lead.sources.length < 2) return null;
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
      <Crown className="h-3 w-3" />
      منبع اولویت‌دار: {LEAD_SOURCES[prioritySource(lead)].short}
    </span>
  );
}
