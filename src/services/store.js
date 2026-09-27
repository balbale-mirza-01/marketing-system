import { useSyncExternalStore } from "react";
import { leadsSeed } from "@/data/leads";
import { tasksSeed } from "@/data/tasks";
import { meetingsSeed } from "@/data/meetings";
import { ROLES } from "@/data/marketers";

// In-memory session store — swap for API calls (Django REST) later.
let state = {
  leads: leadsSeed,
  tasks: tasksSeed,
  meetings: meetingsSeed,
  events: [],
  role: "marketer",
};
const listeners = new Set();

const set = (fn) => {
  state = { ...state, ...fn(state) };
  listeners.forEach((l) => l());
};
const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useStore = (selector) =>
  useSyncExternalStore(subscribe, () => selector(state));

export const actions = {
  setRole: (role) => set(() => ({ role })),
  addLead: (lead) => set((s) => ({ leads: [lead, ...s.leads] })),
  updateLead: (id, fn) =>
    set((s) => ({
      leads: s.leads.map((l) => (l.id === id ? { ...l, ...fn(l) } : l)),
    })),
  addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
  updateTask: (id, fn) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...fn(t) } : t)),
    })),
  addMeeting: (m) => set((s) => ({ meetings: [m, ...s.meetings] })),
  logEvent: (e) =>
    set((s) => ({
      events: [
        { id: `e${Date.now()}`, date: new Date().toISOString(), ...e },
        ...s.events,
      ],
    })),
};

export function useCurrentUser() {
  const role = useStore((s) => s.role);
  return { role, ...ROLES[role] };
}
