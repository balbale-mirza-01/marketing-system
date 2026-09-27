import { getMarketer } from "./customerService";
import { LEAD_STATUS } from "@/data/constants";
import { toFa } from "@/lib/fa";

const mName = (id) => getMarketer(id)?.name;
const byDate = (a, b) => new Date(b.date) - new Date(a.date);

const leadStatusItems = (l) =>
  l.history.map((h, k) => ({
    id: `${l.id}-h${k}`,
    type: "status",
    title: `وضعیت سرنخ: ${LEAD_STATUS[h.status].label}`,
    note: h.note || l.interest,
    date: h.date,
    by: mName(h.by),
  }));

export function buildCustomerTimeline(c, leads, events, tasks, meetings) {
  return [
    ...c.interactions.map((x) => ({
      id: x.id,
      type: "interaction",
      title: `${x.type} — ${x.channel}`,
      note: x.note,
      date: x.date,
      by: mName(x.by),
    })),
    ...c.accounts.map((a) => ({
      id: `p-${a.id}`,
      type: "product",
      title: `فعال‌سازی ${a.name}`,
      note: `شماره ${toFa(a.number)}`,
      date: a.openedAt,
    })),
    ...c.followups.map((f) => ({
      id: f.id,
      type: "followup",
      title: f.note,
      note: `نتیجه: ${f.result}`,
      date: f.date,
      by: mName(f.by),
    })),
    ...c.extras.map((e) => ({ ...e, by: mName(e.by) })),
    ...leads.filter((l) => l.customerId === c.id).flatMap(leadStatusItems),
    ...tasks
      .filter((t) => t.customerId === c.id)
      .map((t) => ({
        id: t.id,
        type: "task",
        title: `وظیفه: ${t.title}`,
        note: t.notes,
        date: t.dueDate,
        by: mName(t.ownerId),
      })),
    ...meetings
      .filter((m) => m.customerId === c.id)
      .map((m) => ({
        id: m.id,
        type: "meeting",
        title: `جلسه: ${m.title}`,
        note: m.agenda,
        date: m.date,
        by: mName(m.ownerId),
      })),
    ...events
      .filter((e) => e.customerId === c.id)
      .map((e) => ({ ...e, by: mName(e.by) })),
  ].sort(byDate);
}

export function buildLeadTimeline(lead, events) {
  return [
    ...leadStatusItems(lead),
    ...lead.followups.map((f) => ({
      id: f.id,
      type: "followup",
      title: `پیگیری (${f.channel})`,
      note: f.note,
      date: f.date,
      by: mName(f.by),
    })),
    ...events
      .filter((e) => e.leadId === lead.id)
      .map((e) => ({ ...e, by: mName(e.by) })),
  ].sort(byDate);
}
