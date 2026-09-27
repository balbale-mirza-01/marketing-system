import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import { taskColumns } from "@/components/tasks/TaskColumns";
import { filterTasks, isTaskOverdue } from "@/services/taskService";
import { getMarketer } from "@/services/customerService";
import { useStore } from "@/services/store";
import useTableState from "@/hooks/useTableState";
import { toFa } from "@/lib/fa";

const INIT = {
  q: "",
  status: "all",
  type: "all",
  owner: "all",
  overdue: false,
};

export default function Tasks() {
  const navigate = useNavigate();
  const tasks = useStore((s) => s.tasks);
  const [filters, setFilters] = useState(INIT);
  const [creating, setCreating] = useState(false);
  const rows = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const t = useTableState(rows, {
    owner: (r) => getMarketer(r.ownerId)?.name || "",
    dueDate: (r) => new Date(r.dueDate).getTime(),
    status: (r) => r.status,
  });
  const overdue = tasks.filter(isTaskOverdue).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="وظایف"
        subtitle={`${toFa(tasks.length)} وظیفه · ${toFa(overdue)} مورد معوق`}
        actions={
          <Button
            onClick={() => setCreating(true)}
            className="h-11 rounded-xl px-5"
          >
            <Plus className="h-4 w-4" />
            وظیفه جدید
          </Button>
        }
      />
      <TaskFilters value={filters} onChange={setFilters} />
      <DataTable
        columns={taskColumns}
        rows={t.rows}
        sort={t.sort}
        onSort={t.onSort}
        onRowClick={(r) => navigate(`/tasks/${r.id}`)}
        renderCard={(r) => <TaskCard task={r} />}
      />
      <Pagination {...t} />
      <TaskFormDialog open={creating} onOpenChange={setCreating} />
    </div>
  );
}
