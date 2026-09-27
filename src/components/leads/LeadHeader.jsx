import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/common/StatusBadge";
import Avatar from "@/components/common/Avatar";
import NextAction from "@/components/common/NextAction";
import FilterSelect from "@/components/common/FilterSelect";
import SlaBadge from "./SlaBadge";
import PriorityBanner from "./PriorityBanner";
import { changeStatus, leadNextAction } from "@/services/leadService";
import { getMarketer } from "@/services/customerService";
import { useCurrentUser } from "@/services/store";
import { LEAD_STATUS } from "@/data/constants";
import { fmtDate } from "@/lib/fa";

const STATUS_OPTS = Object.entries(LEAD_STATUS).map(([k, v]) => ({
  value: k,
  label: v.label,
}));

export default function LeadHeader({ lead, onAssign }) {
  const user = useCurrentUser();
  const st = LEAD_STATUS[lead.status];
  const onStatus = (s) => {
    if (s === lead.status) return;
    changeStatus(lead.id, s, user.marketerId);
    toast.success(`وضعیت به «${LEAD_STATUS[s].label}» تغییر کرد`);
  };
  return (
    <div className="rounded-3xl border bg-card p-5 sm:p-7">
      <Link
        to="/leads"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
        سرنخ‌ها
      </Link>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={lead.name} className="h-14 w-14 text-lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{lead.name}</h1>
              <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
              <SlaBadge lead={lead} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {lead.interest} · ثبت در {fmtDate(lead.createdAt)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <FilterSelect
            value={lead.status}
            onChange={onStatus}
            options={STATUS_OPTS}
            className="h-11 w-full sm:w-44"
          />
          <Button onClick={onAssign} className="h-11 rounded-xl">
            <UserPlus className="h-4 w-4" />
            {lead.ownerId ? "تخصیص مجدد" : "تخصیص"}
          </Button>
        </div>
      </div>
      {lead.sources.length > 1 && (
        <PriorityBanner lead={lead} className="mt-5" />
      )}
      <NextAction
        className="mt-4"
        text={leadNextAction(lead)}
        owner={getMarketer(lead.ownerId)?.name}
      />
    </div>
  );
}
