import React from "react";
import StatusBadge from "@/components/common/StatusBadge";
import CustomerAvatar from "./CustomerAvatar";
import { getMarketer } from "@/services/customerService";
import { CUSTOMER_STATUS } from "@/data/constants";
import { toFa } from "@/lib/fa";

export const customerColumns = [
  {
    key: "name",
    label: "نام مشتری",
    sortable: true,
    render: (c) => (
      <div className="flex items-center gap-3">
        <CustomerAvatar c={c} />
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {toFa(c.nationalId)}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "type",
    label: "نوع",
    sortable: true,
    render: (c) => (c.type === "company" ? "حقوقی" : "حقیقی"),
  },
  { key: "segment", label: "بخش مشتری", sortable: true },
  { key: "branch", label: "شعبه", sortable: true },
  {
    key: "marketer",
    label: "مسئول ارتباط",
    sortable: true,
    render: (c) => getMarketer(c.marketerId)?.name,
  },
  {
    key: "phone",
    label: "موبایل",
    render: (c) => <span className="tabular-nums">{toFa(c.phone)}</span>,
  },
  {
    key: "status",
    label: "وضعیت",
    sortable: true,
    render: (c) => (
      <StatusBadge tone={CUSTOMER_STATUS[c.status].tone}>
        {CUSTOMER_STATUS[c.status].label}
      </StatusBadge>
    ),
  },
];
