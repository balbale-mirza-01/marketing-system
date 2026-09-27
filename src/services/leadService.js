import { actions } from "./store";
import { getMarketer } from "./customerService";
import { LEAD_SOURCES } from "@/data/constants";
import { dayDiff, relDay, toEn, toFa } from "@/lib/fa";

const stamp = () => new Date().toISOString();

export const isClosed = (l) => ["converted", "lost"].includes(l.status);
export const isOverdue = (l) =>
  !isClosed(l) && !!l.nextFollowUp && dayDiff(l.nextFollowUp) < 0;
export const prioritySource = (l) =>
  [...l.sources].sort((a, b) => LEAD_SOURCES[b].rank - LEAD_SOURCES[a].rank)[0];

export function leadNextAction(l) {
  if (l.status === "converted")
    return "پیگیری رضایت مشتری و معرفی محصولات مکمل";
  if (l.status === "lost") return "بازبینی علت و تماس مجدد پس از ۳ ماه";
  if (!l.ownerId) return "تخصیص سرنخ به بازاریاب مسئول";
  if (isOverdue(l))
    return `تماس پیگیری فوری — ${toFa(-dayDiff(l.nextFollowUp))} روز از موعد گذشته`;
  if (l.nextFollowUp) return `تماس پیگیری ${relDay(l.nextFollowUp)}`;
  return "تعیین زمان پیگیری بعدی";
}

export const changeStatus = (id, status, by) =>
  actions.updateLead(id, (l) => ({
    status,
    history: [...l.history, { status, date: stamp(), by }],
    nextFollowUp: ["converted", "lost"].includes(status)
      ? null
      : l.nextFollowUp,
  }));

export const assignLead = (id, ownerId, by) =>
  actions.updateLead(id, (l) => {
    const next = l.status === "new" ? "assigned" : l.status;
    return {
      ownerId,
      status: next,
      history: [
        ...l.history,
        {
          status: next,
          date: stamp(),
          by,
          note: `تخصیص به ${getMarketer(ownerId).name}`,
        },
      ],
    };
  });

export const addFollowup = (id, { nextFollowUp, ...f }) =>
  actions.updateLead(id, (l) => ({
    followups: [...l.followups, { id: `f${Date.now()}`, date: stamp(), ...f }],
    nextFollowUp: nextFollowUp || l.nextFollowUp,
  }));

export const updateLeadFields = (id, patch) =>
  actions.updateLead(id, () => patch);

export function createLead({ by, ...data }) {
  const id = `l${Date.now()}`;
  const history = [{ status: "new", date: stamp(), by }];
  if (data.ownerId) history.push({ status: "assigned", date: stamp(), by });
  actions.addLead({
    id,
    status: data.ownerId ? "assigned" : "new",
    createdAt: stamp(),
    followups: [],
    lostReason: "",
    customerId: null,
    history,
    ...data,
  });
  return id;
}

export function filterLeads(leads, f) {
  const q = toEn(f.q.trim());
  return leads.filter(
    (l) =>
      (!q || l.name.includes(q) || l.phone.includes(q)) &&
      (f.status === "all" || l.status === f.status) &&
      (f.source === "all" || l.sources.includes(f.source)) &&
      (f.owner === "all" ||
        (f.owner === "none" ? !l.ownerId : l.ownerId === f.owner)) &&
      (!f.overdue || isOverdue(l)),
  );
}
