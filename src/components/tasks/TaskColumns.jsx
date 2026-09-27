import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { getCustomer, getMarketer } from "@/services/customerService";
import { isTaskOverdue } from "@/services/taskService";
import { TASK_STATUS, TASK_TYPES } from "@/data/tasks";
import { relDay } from "@/lib/fa";

export const taskColumns = [
  {
    key: "title",
    label: "عنوان وظیفه",
    sortable: true,
    render: (t) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <CheckSquare className="h-4 w-4" />
        </span>
        <div>
          <p className="font-medium">{t.title}</p>
          <p className="text-xs text-muted-foreground">{TASK_TYPES[t.type]}</p>
        </div>
      </div>
    ),
  },
  {
    key: "customer",
    label: "مشتری",
    render: (t) => {
      const c = getCustomer(t.customerId);
      return c ? (
        <Link
          to={`/customers/${c.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-primary hover:underline"
        >
          {c.name}
        </Link>
      ) : (
        "—"
      );
    },
  },
  {
    key: "owner",
    label: "مسئول",
    sortable: true,
    render: (t) =>
      getMarketer(t.ownerId)?.name || (
        <span className="text-amber-700">بدون مالک</span>
      ),
  },
  {
    key: "dueDate",
    label: "سررسید",
    sortable: true,
    render: (t) => (
      <span className={isTaskOverdue(t) ? "font-medium text-rose-600" : ""}>
        {relDay(t.dueDate)}
      </span>
    ),
  },
  {
    key: "status",
    label: "وضعیت",
    sortable: true,
    render: (t) => (
      <StatusBadge tone={TASK_STATUS[t.status].tone}>
        {TASK_STATUS[t.status].label}
      </StatusBadge>
    ),
  },
];
