import React from "react";
import {
  Briefcase,
  CalendarDays,
  CreditCard,
  Hash,
  User,
  Wallet,
} from "lucide-react";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import { fmtDate, fmtMoney, toFa } from "@/lib/fa";

export default function IndividualProfile({ c }) {
  const deposits = c.accounts
    .filter((a) => a.kind === "deposit" || a.kind === "current")
    .reduce((s, a) => s + a.balance, 0);
  return (
    <Section title="اطلاعات هویتی و مالی" icon={User}>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <InfoRow icon={Hash} label="کد ملی">
          <span className="tabular-nums">{toFa(c.nationalId)}</span>
        </InfoRow>
        <InfoRow icon={Briefcase} label="شغل">
          {c.job}
        </InfoRow>
        <InfoRow icon={CalendarDays} label="تاریخ عضویت">
          {fmtDate(c.joinedAt)}
        </InfoRow>
        <InfoRow icon={CreditCard} label="تعداد محصولات فعال">
          {toFa(c.accounts.length)} محصول
        </InfoRow>
        <InfoRow icon={Wallet} label="مجموع موجودی سپرده‌ها">
          {fmtMoney(deposits)}
        </InfoRow>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        * کد ملی نمونه و ساختگی است.
      </p>
    </Section>
  );
}
