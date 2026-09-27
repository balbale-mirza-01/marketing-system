import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Target } from "lucide-react";
import Section from "@/components/common/Section";
import StatusBadge from "@/components/common/StatusBadge";
import Avatar from "@/components/common/Avatar";
import EmptyState from "@/components/common/EmptyState";
import { isOverdue } from "@/services/leadService";
import { LEAD_STATUS } from "@/data/constants";
import { relDay } from "@/lib/fa";
import { cn } from "@/lib/utils";

export default function MyLeadsWidget({ title, leads, className }) {
  return (
    <Section
      title={title}
      icon={Target}
      className={className}
      action={
        <Link to="/leads" className="text-sm font-medium text-primary">
          همه سرنخ‌ها
        </Link>
      }
    >
      {leads.length ? (
        <div className="-mx-2 space-y-1">
          {leads.map((l) => (
            <Link
              key={l.id}
              to={`/leads/${l.id}`}
              className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted"
            >
              <Avatar name={l.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{l.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {l.interest}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge tone={LEAD_STATUS[l.status].tone}>
                  {LEAD_STATUS[l.status].label}
                </StatusBadge>
                {l.nextFollowUp && (
                  <span
                    className={cn(
                      "text-[11px]",
                      isOverdue(l)
                        ? "font-medium text-rose-600"
                        : "text-muted-foreground",
                    )}
                  >
                    پیگیری: {relDay(l.nextFollowUp)}
                  </span>
                )}
              </div>
              <ChevronLeft className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState icon={Target} title="سرنخ بازی ندارید" />
      )}
    </Section>
  );
}
