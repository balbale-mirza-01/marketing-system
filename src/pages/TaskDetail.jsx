import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  SearchX,
  StickyNote,
  User,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import StatusBadge from "@/components/common/StatusBadge";
import { getCustomer, getMarketer } from "@/services/customerService";
import { changeTaskStatus, isTaskOverdue } from "@/services/taskService";
import { useStore } from "@/services/store";
import { TASK_STATUS, TASK_TYPES } from "@/data/tasks";
import { fmtDate, relDay } from "@/lib/fa";

export default function TaskDetail() {
  const { id } = useParams();
  const task = useStore((s) => s.tasks.find((t) => t.id === id));
  if (!task) return <EmptyState icon={SearchX} title="وظیفه یافت نشد" />;
  const c = getCustomer(task.customerId);
  const owner = getMarketer(task.ownerId);
  const st = TASK_STATUS[task.status];
  const active = ["pending", "in_progress"].includes(task.status);
  const onStatus = (s) => {
    changeTaskStatus(task.id, s);
    toast.success(`وضعیت به «${TASK_STATUS[s].label}» تغییر کرد`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-card p-5 sm:p-7">
        <Link
          to="/tasks"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
          وظایف
        </Link>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{task.title}</h1>
              <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
              {active && isTaskOverdue(task) && (
                <StatusBadge tone="red">معوق</StatusBadge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {TASK_TYPES[task.type]} · سررسید: {fmtDate(task.dueDate)} (
              {relDay(task.dueDate)})
            </p>
          </div>
          {active && (
            <div className="flex gap-2">
              {task.status === "pending" && (
                <Button
                  variant="outline"
                  className="h-11"
                  onClick={() => onStatus("in_progress")}
                >
                  شروع انجام
                </Button>
              )}
              <Button className="h-11" onClick={() => onStatus("done")}>
                <CheckCircle2 className="h-4 w-4" />
                تکمیل وظیفه
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="اطلاعات وظیفه" icon={User} className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            <InfoRow icon={Clock} label="نوع">
              {TASK_TYPES[task.type]}
            </InfoRow>
            <InfoRow icon={Clock} label="سررسید">
              {fmtDate(task.dueDate)}
            </InfoRow>
            <InfoRow icon={UserCheck} label="مسئول">
              {owner?.name || "بدون مالک"}
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
        </Section>
        <Section title="توضیحات" icon={StickyNote}>
          <p className="text-sm leading-7 text-muted-foreground">
            {task.notes || "توضیحاتی ثبت نشده است."}
          </p>
        </Section>
      </div>
    </div>
  );
}
