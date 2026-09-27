import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import FilterSelect from "@/components/common/FilterSelect";
import MeetingCard from "@/components/meetings/MeetingCard";
import { meetingColumns } from "@/components/meetings/MeetingColumns";
import { filterMeetings } from "@/services/meetingService";
import { getMarketer, getMarketers } from "@/services/customerService";
import { useStore } from "@/services/store";
import useTableState from "@/hooks/useTableState";
import { MEETING_CHANNELS, MEETING_STATUS } from "@/data/meetings";
import { toFa } from "@/lib/fa";

const INIT = { q: "", channel: "all", owner: "all", status: "all" };

export default function Meetings() {
  const navigate = useNavigate();
  const meetings = useStore((s) => s.meetings);
  const [filters, setFilters] = useState(INIT);
  const rows = useMemo(
    () => filterMeetings(meetings, filters),
    [meetings, filters],
  );
  const t = useTableState(rows, {
    owner: (r) => getMarketer(r.ownerId)?.name || "",
    date: (r) => new Date(r.date).getTime(),
  });
  const set = (k) => (v) => setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="جلسات"
        subtitle={`${toFa(meetings.length)} جلسه — حضوری، تلفنی و تصویری`}
      />
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <FilterSelect
          value={filters.status}
          onChange={set("status")}
          options={[
            { value: "all", label: "همه وضعیت‌ها" },
            ...Object.entries(MEETING_STATUS).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          ]}
        />
        <FilterSelect
          value={filters.channel}
          onChange={set("channel")}
          options={[
            { value: "all", label: "همه کانال‌ها" },
            ...Object.entries(MEETING_CHANNELS).map(([k, v]) => ({
              value: k,
              label: v,
            })),
          ]}
        />
        <FilterSelect
          value={filters.owner}
          onChange={set("owner")}
          options={[
            { value: "all", label: "همه مسئولین" },
            ...getMarketers().map((m) => ({ value: m.id, label: m.name })),
          ]}
        />
      </div>
      <DataTable
        columns={meetingColumns}
        rows={t.rows}
        sort={t.sort}
        onSort={t.onSort}
        onRowClick={(r) => navigate(`/meetings/${r.id}`)}
        renderCard={(r) => <MeetingCard meeting={r} />}
      />
      <Pagination {...t} />
    </div>
  );
}
