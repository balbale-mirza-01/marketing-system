import React from "react";
import StatusBadge from "@/components/common/StatusBadge";
import Avatar from "@/components/common/Avatar";
import SourceCell from "./SourceCell";
import SlaBadge from "./SlaBadge";
import { getMarketer } from "@/services/customerService";
import { isOverdue } from "@/services/leadService";
import { LEAD_STATUS } from "@/data/constants";
import { fmtShort, relDay } from "@/lib/fa";

export const leadColumns = [
  {
    key: "name",
    label: "نام مشتری / مشتری بالقوه",
    sortable: true,
    render: (l) => (
      <div className="flex items-center gap-3">
        <Avatar name={l.name} />
        <div>
          <p className="font-medium">{l.name}</p>
          <p className="text-xs text-muted-foreground">{l.interest}</p>
        </div>
      </div>
    ),
  },
  { key: "source", label: "منبع", render: (l) => <SourceCell lead={l} /> },
  {
    key: "status",
    label: "وضعیت",
    sortable: true,
    render: (l) => (
      <StatusBadge tone={LEAD_STATUS[l.status].tone}>
        {LEAD_STATUS[l.status].label}
      </StatusBadge>
    ),
  },
  {
    key: "owner",
    label: "مالک",
    sortable: true,
    render: (l) =>
      getMarketer(l.ownerId)?.name || (
        <span className="text-amber-700">بدون مالک</span>
      ),
  },
  {
    key: "createdAt",
    label: "تاریخ ایجاد",
    sortable: true,
    render: (l) => (
      <span className="tabular-nums">{fmtShort(l.createdAt)}</span>
    ),
  },
  {
    key: "nextFollowUp",
    label: "پیگیری بعدی",
    sortable: true,
    render: (l) =>
      l.nextFollowUp ? (
        <span className={isOverdue(l) ? "font-medium text-rose-600" : ""}>
          {relDay(l.nextFollowUp)}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "sla",
    label: "وضعیت SLA",
    sortable: true,
    render: (l) => <SlaBadge lead={l} />,
  },
];
