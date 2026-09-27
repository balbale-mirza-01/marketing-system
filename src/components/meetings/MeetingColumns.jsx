import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Video } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { getCustomer, getMarketer } from "@/services/customerService";
import { MEETING_CHANNELS, MEETING_STATUS } from "@/data/meetings";
import { fmtDate, toFa } from "@/lib/fa";

const ICONS = { inperson: MapPin, call: Phone, video: Video };

export const meetingColumns = [
  {
    key: "title",
    label: "موضوع جلسه",
    sortable: true,
    render: (m) => {
      const Icon = ICONS[m.channel];
      return (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="font-medium">{m.title}</p>
            <p className="text-xs text-muted-foreground">
              {MEETING_CHANNELS[m.channel]}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    key: "date",
    label: "تاریخ و ساعت",
    sortable: true,
    render: (m) => (
      <span>
        {fmtDate(m.date)} · <span className="tabular-nums">{toFa(m.time)}</span>
      </span>
    ),
  },
  {
    key: "customer",
    label: "مشتری",
    render: (m) => {
      const c = getCustomer(m.customerId);
      return c ? (
        <Link
          to={`/customers/${c.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-primary hover:underline"
        >
          {c.name}
        </Link>
      ) : (
        "—"
      );
    },
  },
  {
    key: "owner",
    label: "مسئول",
    sortable: true,
    render: (m) => getMarketer(m.ownerId)?.name,
  },
  {
    key: "status",
    label: "وضعیت",
    sortable: true,
    render: (m) => (
      <StatusBadge tone={MEETING_STATUS[m.status].tone}>
        {MEETING_STATUS[m.status].label}
      </StatusBadge>
    ),
  },
];
