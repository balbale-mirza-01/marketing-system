import { dayDiff, toEn } from "@/lib/fa";

export const isMeetingUpcoming = (m) =>
  dayDiff(m.date) >= 0 && m.status === "scheduled";

export function filterMeetings(meetings, f) {
  const q = toEn(f.q.trim());
  return meetings.filter(
    (m) =>
      (!q || m.title.includes(q)) &&
      (f.channel === "all" || m.channel === f.channel) &&
      (f.owner === "all" || m.ownerId === f.owner) &&
      (f.status === "all" || m.status === f.status),
  );
}
