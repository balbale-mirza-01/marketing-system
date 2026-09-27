import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import CustomerAvatar from "@/components/customers/CustomerAvatar";
import { getCustomers } from "@/services/customerService";
import { toEn, toFa } from "@/lib/fa";

export default function CustomerPicker({ value, onChange }) {
  const [q, setQ] = useState("");
  const customers = useMemo(() => {
    const s = toEn(q.trim());
    return s
      ? getCustomers().filter((c) => c.name.includes(s) || c.phone.includes(s))
      : getCustomers();
  }, [q]);
  return (
    <div>
      <div className="relative mb-2">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجوی مشتری…"
          className="h-11 w-full rounded-xl border bg-card pe-3 ps-10 text-sm outline-none focus:ring-2 focus:ring-ring/20"
        />
      </div>
      <div className="max-h-56 space-y-1 overflow-y-auto rounded-2xl border p-1.5">
        {customers.slice(0, 30).map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-start transition ${value === c.id ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-muted"}`}
          >
            <CustomerAvatar c={c} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{c.name}</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {toFa(c.phone)}
              </p>
            </div>
          </button>
        ))}
        {!customers.length && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            مشتری یافت نشد
          </p>
        )}
      </div>
    </div>
  );
}
