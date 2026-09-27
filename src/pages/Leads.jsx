import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadStatusChips from "@/components/leads/LeadStatusChips";
import LeadCard from "@/components/leads/LeadCard";
import LeadFormDialog from "@/components/leads/LeadFormDialog";
import { leadColumns } from "@/components/leads/leadColumns";
import { filterLeads, isOverdue } from "@/services/leadService";
import { getMarketer } from "@/services/customerService";
import { useStore } from "@/services/store";
import useTableState from "@/hooks/useTableState";
import { toFa } from "@/lib/fa";

const INIT = {
  q: "",
  status: "all",
  source: "all",
  owner: "all",
  overdue: false,
};

export default function Leads() {
  const navigate = useNavigate();
  const leads = useStore((s) => s.leads);
  const [filters, setFilters] = useState(INIT);
  const [creating, setCreating] = useState(false);
  const rows = useMemo(() => filterLeads(leads, filters), [leads, filters]);
  const t = useTableState(rows, {
    owner: (r) => getMarketer(r.ownerId)?.name || "",
    sla: (r) => (isOverdue(r) ? 1 : 0),
    nextFollowUp: (r) =>
      r.nextFollowUp ? new Date(r.nextFollowUp).getTime() : Infinity,
  });
  const overdue = leads.filter(isOverdue).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="سرنخ‌ها"
        subtitle={`${toFa(leads.length)} سرنخ · ${toFa(overdue)} مورد معوق`}
        actions={
          <Button
            onClick={() => setCreating(true)}
            className="h-11 rounded-xl px-5"
          >
            <Plus className="h-4 w-4" />
            سرنخ جدید
          </Button>
        }
      />
      <LeadStatusChips
        leads={leads}
        active={filters.status}
        onChange={(status) => setFilters({ ...filters, status })}
      />
      <LeadFilters value={filters} onChange={setFilters} />
      <DataTable
        columns={leadColumns}
        rows={t.rows}
        sort={t.sort}
        onSort={t.onSort}
        onRowClick={(r) => navigate(`/leads/${r.id}`)}
        renderCard={(r) => <LeadCard lead={r} />}
      />
      <Pagination {...t} />
      <LeadFormDialog open={creating} onOpenChange={setCreating} />
    </div>
  );
}
