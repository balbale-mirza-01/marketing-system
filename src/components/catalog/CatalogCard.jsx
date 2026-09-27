import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronLeft,
  CreditCard,
  Landmark,
  PiggyBank,
  FileText,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { CATEGORIES } from "@/data/catalog";
import { fmtDate } from "@/lib/fa";

const ICONS = { PiggyBank, Landmark, CreditCard, Briefcase };
const TONE = {
  teal: "bg-teal-50 text-teal-700",
  blue: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
  amber: "bg-amber-50 text-amber-700",
};

export default function CatalogCard({ item }) {
  const cat = CATEGORIES[item.category];
  const Icon = ICONS[cat.icon];
  return (
    <Link
      to={`/catalog/${item.id}`}
      className="group flex flex-col rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONE[cat.tone]}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <StatusBadge tone={item.status === "approved" ? "green" : "amber"}>
          {item.status === "approved" ? "تأییدشده" : "پیش‌نویس"}
        </StatusBadge>
      </div>
      <p className="mt-4 font-semibold leading-7">{item.name}</p>
      <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
        {item.summary}
      </p>
      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          {fmtDate(item.updatedAt)}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-primary">
          مشاهده جزئیات
          <ChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
