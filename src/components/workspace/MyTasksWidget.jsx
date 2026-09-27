import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CalendarClock,
  CheckSquare,
  ChevronLeft,
} from "lucide-react";
import Section from "@/components/common/Section";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { getCustomer } from "@/services/customerService";
import { isTaskOverdue, isTaskToday } from "@/services/taskService";
import { TASK_STATUS, TASK_TYPES } from "@/data/tasks";
import { relDay } from "@/lib/fa";
import { cn } from "@/lib/utils";

export default function MyTasksWidget({ tasks, my }) {
  return (
    <Section
      title={my ? "وظایف من" : "وظایف منطقه"}
      icon={CheckSquare}
      action={
        <Link to="/tasks" className="text-sm font-medium text-primary">
          همه وظایف
        </Link>
      }
    >
      {tasks.length ? (
        <div className="-mx-2 space-y-1">
          {tasks.map((t) => {
            const c = getCustomer(t.customerId);
            return (
              <Link
                key={t.id}
                to={`/tasks/${t.id}`}
                className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    isTaskOverdue(t)
                      ? "bg-rose-50 text-rose-600"
                      : isTaskToday(t)
                        ? "bg-teal-50 text-teal-600"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {isTaskOverdue(t) ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CalendarClock className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c?.name} · {TASK_TYPES[t.type]}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge tone={TASK_STATUS[t.status].tone}>
                    {TASK_STATUS[t.status].label}
                  </StatusBadge>
                  <span
                    className={cn(
                      "text-[11px]",
                      isTaskOverdue(t)
                        ? "font-medium text-rose-600"
                        : "text-muted-foreground",
                    )}
                  >
                    {relDay(t.dueDate)}
                  </span>
                </div>
                <ChevronLeft className="hidden h-4 w-4 text-muted-foreground sm:block" />
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={CheckSquare} title="وظیفه فعالی ندارید" />
      )}
    </Section>
  );
}
