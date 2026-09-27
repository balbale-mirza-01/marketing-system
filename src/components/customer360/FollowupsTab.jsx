import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, PhoneCall, Target } from "lucide-react";
import Section from "@/components/common/Section";
import StatusBadge from "@/components/common/StatusBadge";
import { getMarketer } from "@/services/customerService";
import { LEAD_STATUS } from "@/data/constants";
import { fmtDate } from "@/lib/fa";

const RESULT = {
  "پذیرفته شد": "green",
  علاقه‌مند: "teal",
  "در انتظار": "amber",
  "بدون پاسخ": "gray",
};

export default function FollowupsTab({ c, leads }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="سوابق پیگیری و فروش" icon={PhoneCall}>
        <div className="divide-y">
          {c.followups.map((f) => (
            <div
              key={f.id}
              className="flex items-start justify-between gap-3 py-3"
            >
              <div>
                <p className="text-sm font-medium">{f.note}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {fmtDate(f.date)} · {getMarketer(f.by)?.name}
                </p>
              </div>
              <StatusBadge tone={RESULT[f.result]}>{f.result}</StatusBadge>
            </div>
          ))}
        </div>
      </Section>
      <Section title="سرنخ‌های مرتبط" icon={Target}>
        {leads.length ? (
          leads.map((l) => (
            <Link
              key={l.id}
              to={`/leads/${l.id}`}
              className="flex items-center justify-between gap-3 rounded-xl p-3 hover:bg-muted"
            >
              <div>
                <p className="text-sm font-medium">{l.interest}</p>
                <p className="text-xs text-muted-foreground">
                  ثبت در {fmtDate(l.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge tone={LEAD_STATUS[l.status].tone}>
                  {LEAD_STATUS[l.status].label}
                </StatusBadge>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            سرنخ فعالی برای این مشتری ثبت نشده است.
          </p>
        )}
      </Section>
    </div>
  );
}
