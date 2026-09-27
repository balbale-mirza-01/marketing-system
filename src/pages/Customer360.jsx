import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UserX } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Timeline from "@/components/timeline/Timeline";
import CustomerHeader from "@/components/customer360/CustomerHeader";
import TabStrip from "@/components/customer360/TabStrip";
import OverviewTab from "@/components/customer360/OverviewTab";
import AccountsTab from "@/components/customer360/AccountsTab";
import PersonsTab from "@/components/customer360/PersonsTab";
import InteractionsTab from "@/components/customer360/InteractionsTab";
import FollowupsTab from "@/components/customer360/FollowupsTab";
import { getCustomer } from "@/services/customerService";
import { buildCustomerTimeline } from "@/services/timelineService";
import { useStore } from "@/services/store";

export default function Customer360() {
  const { id } = useParams();
  const c = getCustomer(id);
  const leads = useStore((s) => s.leads);
  const events = useStore((s) => s.events);
  const tasks = useStore((s) => s.tasks);
  const meetings = useStore((s) => s.meetings);
  const [tab, setTab] = useState("overview");
  const timeline = useMemo(
    () => (c ? buildCustomerTimeline(c, leads, events, tasks, meetings) : []),
    [c, leads, events, tasks, meetings],
  );
  const related = useMemo(
    () => leads.filter((l) => l.customerId === id),
    [leads, id],
  );

  if (!c)
    return (
      <EmptyState
        icon={UserX}
        title="مشتری یافت نشد"
        text="ممکن است این مشتری حذف شده باشد."
      />
    );

  const tabs = [
    { id: "overview", label: "نمای کلی" },
    { id: "accounts", label: "حساب‌ها و محصولات", count: c.accounts.length },
    c.type === "company" && {
      id: "persons",
      label: "اشخاص مرتبط",
      count: c.persons.length,
    },
    { id: "interactions", label: "تعاملات", count: c.interactions.length },
    { id: "timeline", label: "خط زمانی" },
    { id: "followups", label: "پیگیری و فروش" },
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <CustomerHeader c={c} />
      <TabStrip tabs={tabs} active={tab} onChange={setTab} />
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === "overview" && (
          <OverviewTab
            c={c}
            timeline={timeline}
            onShowTimeline={() => setTab("timeline")}
          />
        )}
        {tab === "accounts" && <AccountsTab c={c} />}
        {tab === "persons" && <PersonsTab c={c} />}
        {tab === "interactions" && <InteractionsTab c={c} />}
        {tab === "timeline" && (
          <div className="rounded-2xl border bg-card p-5">
            <Timeline items={timeline} filterable />
          </div>
        )}
        {tab === "followups" && <FollowupsTab c={c} leads={related} />}
      </motion.div>
    </div>
  );
}
