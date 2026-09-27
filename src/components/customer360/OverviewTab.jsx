import React from "react";
import { History } from "lucide-react";
import Section from "@/components/common/Section";
import Timeline from "@/components/timeline/Timeline";
import SmartCompanyProfile from "./SmartCompanyProfile";
import IndividualProfile from "./IndividualProfile";
import BaseInfoPanel from "./BaseInfoPanel";

export default function OverviewTab({ c, timeline, onShowTimeline }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {c.type === "company" ? (
          <SmartCompanyProfile c={c} />
        ) : (
          <IndividualProfile c={c} />
        )}
        <Section
          title="آخرین رویدادها"
          icon={History}
          action={
            <button
              onClick={onShowTimeline}
              className="text-sm font-medium text-primary"
            >
              مشاهده همه
            </button>
          }
        >
          <Timeline items={timeline.slice(0, 4)} />
        </Section>
      </div>
      <BaseInfoPanel c={c} />
    </div>
  );
}
