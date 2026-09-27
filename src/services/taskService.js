import { actions } from "./store";
import { dayDiff, toEn } from "@/lib/fa";

export const isTaskOverdue = (t) =>
  ["pending", "in_progress"].includes(t.status) && dayDiff(t.dueDate) < 0;
export const isTaskToday = (t) =>
  ["pending", "in_progress"].includes(t.status) && dayDiff(t.dueDate) === 0;
export const isTaskActive = (t) =>
  ["pending", "in_progress"].includes(t.status);

export function filterTasks(tasks, f) {
  const q = toEn(f.q.trim());
  return tasks.filter(
    (t) =>
      (!q || t.title.includes(q)) &&
      (f.status === "all" || t.status === f.status) &&
      (f.type === "all" || t.type === f.type) &&
      (f.owner === "all" || t.ownerId === f.owner) &&
      (!f.overdue || isTaskOverdue(t)),
  );
}

export const createTask = (data) => {
  const id = `t${Date.now()}`;
  actions.addTask({
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
    ...data,
  });
  return id;
};

export const changeTaskStatus = (id, status) =>
  actions.updateTask(id, () => ({ status }));
