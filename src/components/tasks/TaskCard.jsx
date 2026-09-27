import React from "react";
import { CalendarClock, User } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { getCustomer, getMarketer } from "@/services/customerService";
import { isTaskOverdue } from "@/services/taskService";
import { TASK_STATUS, TASK_TYPES } from "@/data/tasks";
import { relDay } from "@/lib/fa";

export default function TaskCard({ task }) {
  const c = getCustomer(task.customerId);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-semibold">{task.title}</p>
        <StatusBadge tone={TASK_STATUS[task.status].tone}>
          {TASK_STATUS[task.status].label}
        </StatusBadge>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {TASK_TYPES[task.type]} · {c?.name}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {getMarketer(task.ownerId)?.name || "بدون مالک"}
        </span>
        <span
          className={`inline-flex items-center gap-1 ${isTaskOverdue(task) ? "text-rose-600" : ""}`}
        >
          <CalendarClock className="h-3.5 w-3.5" />
          {relDay(task.dueDate)}
        </span>
      </div>
    </div>
  );
}
