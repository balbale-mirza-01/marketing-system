import React from "react";
import {
  ChevronLeft,
  CreditCard,
  Landmark,
  PiggyBank,
  Receipt,
  Wallet,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { ACCOUNT_KINDS, ACCOUNT_STATUS } from "@/data/constants";
import { fmtMoney, toFa } from "@/lib/fa";

const ICONS = {
  deposit: PiggyBank,
  current: Wallet,
  loan: Landmark,
  card: CreditCard,
  service: Receipt,
};

export default function AccountCard({ a, onClick }) {
  const Icon = ICONS[a.kind];
  const st = ACCOUNT_STATUS[a.status];
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border bg-card p-5 text-start transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
      </div>
      <p className="mt-4 font-semibold">{a.name}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {ACCOUNT_KINDS[a.kind]} ·{" "}
        <span dir="ltr" className="tabular-nums">
          {toFa(a.number)}
        </span>
      </p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">
            {a.kind === "loan" ? "مانده بدهی" : "مبلغ / موجودی"}
          </p>
          <p className="text-sm font-bold">{fmtMoney(a.balance)}</p>
        </div>
        <ChevronLeft className="h-4 w-4 text-muted-foreground transition group-hover:-translate-x-1" />
      </div>
    </button>
  );
}
