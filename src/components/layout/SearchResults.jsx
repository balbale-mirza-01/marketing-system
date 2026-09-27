import React from "react";
import { Building2, Target, User } from "lucide-react";
import { toFa } from "@/lib/fa";
import { LEAD_STATUS } from "@/data/constants";

function Row({ icon: Icon, title, sub, onPick }) {
  return (
    <button
      onMouseDown={onPick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start hover:bg-muted"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
    </button>
  );
}

export default function SearchResults({ results, onPick }) {
  const empty = !results.customers.length && !results.leads.length;
  return (
    <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border bg-popover p-2 shadow-xl">
      {empty && (
        <p className="px-3 py-6 text-center text-sm text-muted-foreground">
          نتیجه‌ای یافت نشد
        </p>
      )}
      {!!results.customers.length && (
        <p className="px-3 pb-1 pt-2 text-[11px] font-medium text-muted-foreground">
          مشتریان
        </p>
      )}
      {results.customers.map((c) => (
        <Row
          key={c.id}
          icon={c.type === "company" ? Building2 : User}
          title={c.name}
          sub={toFa(c.phone)}
          onPick={() => onPick(`/customers/${c.id}`)}
        />
      ))}
      {!!results.leads.length && (
        <p className="px-3 pb-1 pt-2 text-[11px] font-medium text-muted-foreground">
          سرنخ‌ها
        </p>
      )}
      {results.leads.map((l) => (
        <Row
          key={l.id}
          icon={Target}
          title={l.name}
          sub={`${toFa(l.phone)} · ${LEAD_STATUS[l.status].label}`}
          onPick={() => onPick(`/leads/${l.id}`)}
        />
      ))}
    </div>
  );
}
