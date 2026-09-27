import React from "react";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { fmtDate } from "@/lib/fa";

const TONE = {
  شکایت: "red",
  درخواست: "amber",
  "تماس تلفنی": "blue",
  "مراجعه حضوری": "teal",
};

const columns = [
  {
    key: "type",
    label: "نوع",
    render: (i) => (
      <StatusBadge tone={TONE[i.type] || "gray"}>{i.type}</StatusBadge>
    ),
  },
  { key: "channel", label: "کانال" },
  { key: "date", label: "تاریخ", render: (i) => fmtDate(i.date) },
  {
    key: "note",
    label: "شرح کوتاه",
    render: (i) => (
      <span className="whitespace-normal text-muted-foreground">{i.note}</span>
    ),
  },
];

export default function InteractionsTab({ c }) {
  const rows = [...c.interactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      emptyTitle="تعاملی ثبت نشده است"
      renderCard={(i) => (
        <div>
          <div className="flex items-center justify-between gap-2">
            <StatusBadge tone={TONE[i.type] || "gray"}>{i.type}</StatusBadge>
            <span className="text-xs text-muted-foreground">
              {fmtDate(i.date)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6">{i.note}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            کانال: {i.channel}
          </p>
        </div>
      )}
    />
  );
}
