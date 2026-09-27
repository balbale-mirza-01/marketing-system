import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  SearchX,
  User,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import StatusBadge from "@/components/common/StatusBadge";
import Avatar from "@/components/common/Avatar";
import { getCustomer, getMarketer } from "@/services/customerService";
import { MEETING_CHANNELS, MEETING_STATUS } from "@/data/meetings";
import { useStore } from "@/services/store";
import { fmtDate, toFa } from "@/lib/fa";

const ICONS = { inperson: MapPin, call: Phone, video: Video };

export default function MeetingDetail() {
  const { id } = useParams();
  const meeting = useStore((s) => s.meetings.find((m) => m.id === id));
  if (!meeting) return <EmptyState icon={SearchX} title="جلسه یافت نشد" />;
  const c = getCustomer(meeting.customerId);
  const owner = getMarketer(meeting.ownerId);
  const Icon = ICONS[meeting.channel];
  const st = MEETING_STATUS[meeting.status];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-card p-5 sm:p-7">
        <Link
          to="/meetings"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
          جلسات
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{meeting.title}</h1>
              <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {MEETING_CHANNELS[meeting.channel]} · {fmtDate(meeting.date)} ·
              ساعت <span className="tabular-nums">{toFa(meeting.time)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Section
          title="جزئیات جلسه"
          icon={CalendarDays}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            <InfoRow icon={Clock} label="تاریخ">
              {fmtDate(meeting.date)}
            </InfoRow>
            <InfoRow icon={Clock} label="ساعت">
              <span className="tabular-nums">{toFa(meeting.time)}</span>
            </InfoRow>
            <InfoRow icon={MapPin} label="مکان / کانال">
              {meeting.location || MEETING_CHANNELS[meeting.channel]}
            </InfoRow>
            <InfoRow icon={UserCheck} label="مسئول">
              {owner?.name}
            </InfoRow>
            <InfoRow icon={User} label="مشتری مرتبط">
              {c ? (
                <Link
                  to={`/customers/${c.id}`}
                  className="text-primary hover:underline"
                >
                  {c.name}
                </Link>
              ) : (
                "—"
              )}
            </InfoRow>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">دستور جلسه</p>
            <p className="text-sm leading-7 text-muted-foreground">
              {meeting.agenda || "ثبت نشده است."}
            </p>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">نتیجه / خلاصه</p>
            <p className="text-sm leading-7 text-muted-foreground">
              {meeting.outcome || "هنوز ثبت نشده است."}
            </p>
          </div>
        </Section>
        <Section title="شرکت‌کنندگان" icon={Users}>
          <div className="space-y-3">
            {[owner?.name, ...meeting.attendees]
              .filter(Boolean)
              .map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar name={name} />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "بازاریاب" : "شرکت‌کننده"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
