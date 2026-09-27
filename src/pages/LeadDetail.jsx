import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { History, SearchX } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Section from "@/components/common/Section";
import Timeline from "@/components/timeline/Timeline";
import LeadHeader from "@/components/leads/LeadHeader";
import LeadInfoCard from "@/components/leads/LeadInfoCard";
import QualificationCard from "@/components/leads/QualificationCard";
import FollowupLog from "@/components/leads/FollowupLog";
import StatusHistory from "@/components/leads/StatusHistory";
import AssignDialog from "@/components/leads/AssignDialog";
import { buildLeadTimeline } from "@/services/timelineService";
import { useStore } from "@/services/store";

export default function LeadDetail() {
  const { id } = useParams();
  const lead = useStore((s) => s.leads.find((l) => l.id === id));
  const events = useStore((s) => s.events);
  const [assigning, setAssigning] = useState(false);
  const timeline = useMemo(
    () => (lead ? buildLeadTimeline(lead, events) : []),
    [lead, events],
  );

  if (!lead) return <EmptyState icon={SearchX} title="سرنخ یافت نشد" />;

  return (
    <div className="space-y-6">
      <LeadHeader lead={lead} onAssign={() => setAssigning(true)} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <LeadInfoCard lead={lead} />
          <QualificationCard key={`${lead.id}-${lead.status}`} lead={lead} />
          <FollowupLog lead={lead} />
        </div>
        <div className="space-y-6">
          <StatusHistory lead={lead} />
          <Section title="خط زمانی سرنخ" icon={History}>
            <Timeline items={timeline} />
          </Section>
        </div>
      </div>
      {assigning && (
        <AssignDialog
          lead={lead}
          open={assigning}
          onOpenChange={setAssigning}
        />
      )}
    </div>
  );
}
