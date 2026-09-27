import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/common/StatusBadge";
import { ACCOUNT_KINDS, ACCOUNT_STATUS } from "@/data/constants";
import { fmtDate, fmtMoney, toFa } from "@/lib/fa";

export default function AccountDialog({ account, customer, onClose }) {
  const related = account
    ? customer.interactions.filter((i) => i.accountId === account.id)
    : [];
  return (
    <Dialog open={!!account} onOpenChange={(o) => !o && onClose()}>
      {account && (
        <DialogContent
          dir="rtl"
          className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg [&>button]:left-4 [&>button]:right-auto"
        >
          <DialogHeader className="text-start sm:text-start">
            <p className="text-xs text-muted-foreground">
              نمای ۳۶۰ حساب / محصول
            </p>
            <DialogTitle className="text-xl">{account.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["نوع", ACCOUNT_KINDS[account.kind]],
              [
                "وضعیت",
                <StatusBadge key="s" tone={ACCOUNT_STATUS[account.status].tone}>
                  {ACCOUNT_STATUS[account.status].label}
                </StatusBadge>,
              ],
              [
                "شماره",
                <span key="n" dir="ltr" className="tabular-nums">
                  {toFa(account.number)}
                </span>,
              ],
              ["تاریخ افتتاح", fmtDate(account.openedAt)],
              [
                account.kind === "loan" ? "مانده بدهی" : "موجودی",
                fmtMoney(account.balance),
              ],
              ["شعبه", customer.branch],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-muted/50 p-3">
                <p className="text-[11px] text-muted-foreground">{k}</p>
                <div className="mt-1 text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">تعاملات مرتبط</p>
            {related.length ? (
              related.map((i) => (
                <div key={i.id} className="border-b py-2.5 last:border-0">
                  <p className="text-sm">
                    {i.type} — {i.channel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {i.note} · {fmtDate(i.date)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                تعاملی برای این حساب ثبت نشده است.
              </p>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
