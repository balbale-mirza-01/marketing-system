import React, { useMemo } from "react";
import { AlertTriangle, CalendarDays, CheckSquare, Target } from "lucide-react";
import KpiCard from "@/components/common/KpiCard";
import WorkspaceHero from "@/components/workspace/WorkspaceHero";
import MyLeadsWidget from "@/components/workspace/MyLeadsWidget";
import MyCustomersWidget from "@/components/workspace/MyCustomersWidget";
import MyTasksWidget from "@/components/workspace/MyTasksWidget";
import MyMeetingsWidget from "@/components/workspace/MyMeetingsWidget";
import { isClosed, isOverdue } from "@/services/leadService";
import {
  isTaskActive,
  isTaskOverdue,
  isTaskToday,
} from "@/services/taskService";
import { isMeetingUpcoming } from "@/services/meetingService";
import { getCustomers } from "@/services/customerService";
import { useCurrentUser, useStore } from "@/services/store";
import { dayDiff } from "@/lib/fa";

const due = (l) =>
  l.nextFollowUp ? new Date(l.nextFollowUp).getTime() : Infinity;

export default function Workspace() {
  const user = useCurrentUser();
  const leads = useStore((s) => s.leads);
  const tasks = useStore((s) => s.tasks);
  const meetings = useStore((s) => s.meetings);
  const my = !!user.marketerId;
  const mine = (list) =>
    my ? list.filter((x) => x.ownerId === user.marketerId) : list;

  const myLeads = mine(leads);
  const myTasks = mine(tasks);
  const open = myLeads.filter((l) => !isClosed(l));
  const activeTasks = myTasks
    .filter(isTaskActive)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const upcomingMeetings = meetings
    .filter(
      (m) => (!my || m.ownerId === user.marketerId) && isMeetingUpcoming(m),
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const customers = useMemo(
    () => getCustomers().filter((c) => !my || c.marketerId === user.marketerId),
    [user.marketerId, my],
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <WorkspaceHero user={user} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KpiCard
          label={my ? "سرنخ‌های باز من" : "سرنخ‌های باز"}
          value={open.length}
          icon={Target}
          tone="blue"
        />
        <KpiCard
          label="وظایف امروز"
          value={myTasks.filter(isTaskToday).length}
          icon={CheckSquare}
          tone="teal"
          delay={0.05}
        />
        <KpiCard
          label="وظایف معوق"
          value={myTasks.filter(isTaskOverdue).length}
          icon={AlertTriangle}
          tone="red"
          delay={0.1}
        />
        <KpiCard
          label="جلسات پیش‌رو"
          value={upcomingMeetings.length}
          icon={CalendarDays}
          tone="green"
          delay={0.15}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <MyTasksWidget tasks={activeTasks.slice(0, 6)} my={my} />
        <MyMeetingsWidget meetings={upcomingMeetings.slice(0, 4)} my={my} />
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <MyLeadsWidget
          title={my ? "سرنخ‌های من" : "سرنخ‌های منطقه"}
          leads={[...open].sort((a, b) => due(a) - due(b)).slice(0, 6)}
          className="lg:col-span-3"
        />
        <MyCustomersWidget
          title={my ? "مشتریان من" : "مشتریان منطقه"}
          customers={customers.slice(0, 6)}
          total={customers.length}
          className="lg:col-span-2"
        />
      </div>
    </div>
  );
}
