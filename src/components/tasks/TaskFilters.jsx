import React from "react";
import { Switch } from "@/components/ui/switch";
import SearchInput from "@/components/common/SearchInput";
import FilterSelect from "@/components/common/FilterSelect";
import { TASK_STATUS, TASK_TYPES } from "@/data/tasks";
import { getMarketers } from "@/services/customerService";

export default function TaskFilters({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="xl:max-w-xs xl:flex-1">
        <SearchInput
          value={value.q}
          onChange={set("q")}
          placeholder="جستجوی عنوان وظیفه…"
        />
      </div>
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 xl:mx-0 xl:px-0">
        <FilterSelect
          value={value.status}
          onChange={set("status")}
          options={[
            { value: "all", label: "همه وضعیت‌ها" },
            ...Object.entries(TASK_STATUS).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          ]}
        />
        <FilterSelect
          value={value.type}
          onChange={set("type")}
          options={[
            { value: "all", label: "همه انواع" },
            ...Object.entries(TASK_TYPES).map(([k, v]) => ({
              value: k,
              label: v,
            })),
          ]}
        />
        <FilterSelect
          value={value.owner}
          onChange={set("owner")}
          options={[
            { value: "all", label: "همه مسئولین" },
            ...getMarketers().map((m) => ({ value: m.id, label: m.name })),
          ]}
        />
        <label className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl border bg-card px-3 text-sm">
          <Switch
            checked={value.overdue}
            onCheckedChange={set("overdue")}
            dir="ltr"
          />
          فقط معوق‌ها
        </label>
      </div>
    </div>
  );
}
