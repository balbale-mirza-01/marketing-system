import React from "react";
import { PhoneCall } from "lucide-react";
import Section from "@/components/common/Section";
import FollowupForm from "./FollowupForm";
import { getMarketer } from "@/services/customerService";
import { fmtDate, relDay } from "@/lib/fa";

export default function FollowupLog({ lead }) {
  const items = [...lead.followups].reverse();
  return (
    <Section title="گزارش پیگیری‌ها" icon={PhoneCall}>
      <FollowupForm lead={lead} />
      <div className="mt-4 divide-y">
        {items.length ? (
          items.map((f) => (
            <div key={f.id} className="flex gap-3 py-3">
              <span className="mt-1 h-fit rounded-lg bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                {f.channel}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6">{f.note}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {fmtDate(f.date)} · {relDay(f.date)} ·{" "}
                  {getMarketer(f.by)?.name || "سیستم"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">
            هنوز پیگیری‌ای ثبت نشده است.
          </p>
        )}
      </div>
    </Section>
  );
}
