import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  CalendarPlus,
  Link2,
  Phone,
  Share2,
  ShoppingBag,
  User,
  UserCheck,
} from "lucide-react";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import { getMarketer } from "@/services/customerService";
import { isOverdue } from "@/services/leadService";
import { LEAD_SOURCES } from "@/data/constants";
import { fmtDate, relDay, toFa } from "@/lib/fa";

export default function LeadInfoCard({ lead }) {
  return (
    <Section title="اطلاعات سرنخ" icon={User}>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <InfoRow icon={Phone} label="تلفن همراه">
          <a href={`tel:${lead.phone}`} className="tabular-nums text-primary">
            {toFa(lead.phone)}
          </a>
        </InfoRow>
        <InfoRow icon={User} label="نوع مشتری">
          {lead.type === "company" ? "حقوقی / شرکتی" : "حقیقی"}
        </InfoRow>
        <InfoRow icon={ShoppingBag} label="محصول مورد علاقه">
          {lead.interest}
        </InfoRow>
        <InfoRow icon={Share2} label="منابع ارجاع">
          {lead.sources.map((s) => LEAD_SOURCES[s].label).join("، ")}
        </InfoRow>
        <InfoRow icon={CalendarPlus} label="تاریخ ایجاد">
          {fmtDate(lead.createdAt)}
        </InfoRow>
        <InfoRow icon={CalendarClock} label="پیگیری بعدی">
          {lead.nextFollowUp ? (
            <span className={isOverdue(lead) ? "text-rose-600" : ""}>
              {fmtDate(lead.nextFollowUp)} ({relDay(lead.nextFollowUp)})
            </span>
          ) : (
            "—"
          )}
        </InfoRow>
        <InfoRow icon={UserCheck} label="مالک (بازاریاب)">
          {getMarketer(lead.ownerId)?.name || (
            <span className="text-amber-700">بدون مالک</span>
          )}
        </InfoRow>
        {lead.customerId && (
          <InfoRow icon={Link2} label="پرونده مشتری">
            <Link to={`/customers/${lead.customerId}`} className="text-primary">
              مشاهده نمای ۳۶۰ مشتری
            </Link>
          </InfoRow>
        )}
      </div>
    </Section>
  );
}
