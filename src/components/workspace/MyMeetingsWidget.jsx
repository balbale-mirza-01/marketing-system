import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronLeft, MapPin, Phone, Video } from "lucide-react";
import Section from "@/components/common/Section";
import EmptyState from "@/components/common/EmptyState";
import { getCustomer } from "@/services/customerService";
import { MEETING_CHANNELS } from "@/data/meetings";
import { fmtDate, toFa } from "@/lib/fa";

const ICONS = { inperson: MapPin, call: Phone, video: Video };

export default function MyMeetingsWidget({ meetings, my }) {
  return (
    <Section
      title={my ? "جلسات پیش‌روی من" : "جلسات پیش‌رو"}
      icon={CalendarDays}
      action={
        <Link to="/meetings" className="text-sm font-medium text-primary">
          همه جلسات
        </Link>
      }
    >
      {meetings.length ? (
        <div className="-mx-2 space-y-1">
          {meetings.map((m) => {
            const c = getCustomer(m.customerId);
            const Icon = ICONS[m.channel];
            return (
              <Link
                key={m.id}
                to={`/meetings/${m.id}`}
                className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c?.name} · {MEETING_CHANNELS[m.channel]}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs font-semibold tabular-nums">
                    {toFa(m.time)}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {fmtDate(m.date)}
                  </span>
                </div>
                <ChevronLeft className="hidden h-4 w-4 text-muted-foreground sm:block" />
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={CalendarDays} title="جلسه پیش‌رویی ندارید" />
      )}
    </Section>
  );
}
