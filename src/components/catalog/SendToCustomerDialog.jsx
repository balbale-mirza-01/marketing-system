import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FilterSelect from "@/components/common/FilterSelect";
import CustomerAvatar from "@/components/customers/CustomerAvatar";
import { getCustomers } from "@/services/customerService";
import { actions, useCurrentUser } from "@/services/store";
import { toEn, toFa } from "@/lib/fa";

const CHANNELS = [
  { value: "پیامک", label: "پیامک" },
  { value: "ایمیل", label: "ایمیل" },
  { value: "حضوری", label: "حضوری" },
];

export default function SendToCustomerDialog({ item, open, onOpenChange }) {
  const [q, setQ] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [channel, setChannel] = useState("پیامک");
  const user = useCurrentUser();
  const customers = useMemo(() => getCustomers(), []);
  const filtered = useMemo(() => {
    const s = toEn(q.trim());
    return s
      ? customers.filter((c) => c.name.includes(s) || c.phone.includes(s))
      : customers;
  }, [q, customers]);

  const send = () => {
    const c = customers.find((x) => x.id === customerId);
    if (!c) return;
    actions.logEvent({
      type: "catalog",
      customerId: c.id,
      title: `ارسال کاتالوگ «${item.name}»`,
      note: `از طریق ${channel} — محصول: ${item.name}`,
      by: user.marketerId,
    });
    toast.success(`کاتالوگ «${item.name}» برای ${c.name} ارسال شد`);
    setCustomerId(null);
    setQ("");
    setChannel("پیامک");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] overflow-y-auto rounded-2xl sm:max-w-lg [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="text-start sm:text-start">
          <DialogTitle>ارسال «{item.name}» به مشتری</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block">انتخاب مشتری</Label>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجوی نام یا موبایل…"
                className="h-11 w-full rounded-xl border bg-card pe-3 ps-10 text-sm outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
          <div className="max-h-64 space-y-1 overflow-y-auto rounded-2xl border p-1.5">
            {filtered.slice(0, 30).map((c) => (
              <button
                key={c.id}
                onClick={() => setCustomerId(c.id)}
                className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-start transition ${customerId === c.id ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-muted"}`}
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
            {!filtered.length && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                مشتری یافت نشد
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block">کانال ارسال</Label>
            <FilterSelect
              value={channel}
              onChange={setChannel}
              options={CHANNELS}
              className="h-11 w-full"
            />
          </div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="h-11"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>
            <Button className="h-11 px-6" disabled={!customerId} onClick={send}>
              <Send className="h-4 w-4" />
              ارسال
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
