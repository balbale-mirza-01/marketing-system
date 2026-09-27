import React from "react";
import { MapPin, Phone, Video } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { getCustomer, getMarketer } from "@/services/customerService";
import { MEETING_CHANNELS, MEETING_STATUS } from "@/data/meetings";
import { fmtDate, toFa } from "@/lib/fa";

const ICONS = { inperson: MapPin, call: Phone, video: Video };

export default function MeetingCard({ meeting }) {
  const c = getCustomer(meeting.customerId);
  const Icon = ICONS[meeting.channel];
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-semibold">{meeting.title}</p>
        <StatusBadge tone={MEETING_STATUS[meeting.status].tone}>
          {MEETING_STATUS[meeting.status].label}
        </StatusBadge>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {MEETING_CHANNELS[meeting.channel]} · {c?.name}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Icon className="h-3.5 w-3.5" />
          {fmtDate(meeting.date)}
        </span>
        <span className="tabular-nums">{toFa(meeting.time)}</span>
        <span>{getMarketer(meeting.ownerId)?.name}</span>
      </div>
    </div>
  );
}
