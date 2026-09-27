import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronRight,
  Landmark,
  MessageSquare,
  Phone,
  Plus,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import NextAction from "@/components/common/NextAction";
import CustomerAvatar from "@/components/customers/CustomerAvatar";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import { getMarketer } from "@/services/customerService";
import { CUSTOMER_STATUS } from "@/data/constants";
import { toFa } from "@/lib/fa";

export default function CustomerHeader({ c }) {
  const [addingTask, setAddingTask] = useState(false);
  const st = CUSTOMER_STATUS[c.status];
  const isCo = c.type === "company";
  const meta = [
    [isCo ? Briefcase : User, isCo ? c.sector : `مشتری حقیقی · ${c.job}`],
    [Landmark, c.branch],
    [Phone, toFa(c.phone)],
    [Tag, c.segment],
  ];
  return (
    <div className="rounded-3xl border bg-card p-5 sm:p-7">
      <Link
        to="/customers"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
        مشتریان
      </Link>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <CustomerAvatar c={c} className="h-16 w-16 rounded-2xl text-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold sm:text-2xl">{c.name}</h1>
            <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {meta.map(([Icon, text]) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4" />
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <a href={`tel:${c.phone}`}>
              <Phone className="h-4 w-4" />
              تماس
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <a href={`sms:${c.phone}`}>
              <MessageSquare className="h-4 w-4" />
              پیامک
            </a>
          </Button>
          <Button
            onClick={() => setAddingTask(true)}
            className="h-11 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            وظیفه
          </Button>
        </div>
      </div>
      <NextAction
        className="mt-5"
        text={c.nextAction}
        owner={getMarketer(c.marketerId)?.name}
      />
      <TaskFormDialog
        open={addingTask}
        onOpenChange={setAddingTask}
        preselectCustomerId={c.id}
      />
    </div>
  );
}
