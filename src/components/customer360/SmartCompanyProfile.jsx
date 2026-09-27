import React from "react";
import {
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  Hash,
  Receipt,
  Users,
} from "lucide-react";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import AiScoreCard from "./AiScoreCard";
import { SIZE_BANDS } from "@/data/constants";
import { fmtDate, toFa } from "@/lib/fa";

export default function SmartCompanyProfile({ c }) {
  return (
    <Section title="پروفایل هوشمند شرکت" icon={Building2}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-x-6 sm:grid-cols-2">
          <InfoRow icon={Hash} label="شناسه ملی">
            <span className="tabular-nums">{toFa(c.nationalId)}</span>
          </InfoRow>
          <InfoRow icon={FileText} label="شماره ثبت">
            {toFa(c.regNo)}
          </InfoRow>
          <InfoRow icon={Receipt} label="کد اقتصادی">
            <span className="tabular-nums">{toFa(c.economicCode)}</span>
          </InfoRow>
          <InfoRow icon={CalendarDays} label="تاریخ ثبت شرکت">
            {fmtDate(c.registeredAt)}
          </InfoRow>
          <InfoRow icon={Briefcase} label="حوزه فعالیت اقتصادی">
            {c.sector}
          </InfoRow>
          <InfoRow icon={Users} label="اندازه تخمینی">
            {SIZE_BANDS[c.size]}
          </InfoRow>
        </div>
        <AiScoreCard score={c.score} />
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        * شناسه‌ها صرفاً نمونه و ساختگی هستند.
      </p>
    </Section>
  );
}
