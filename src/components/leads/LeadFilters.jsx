import React from "react";
import { Switch } from "@/components/ui/switch";
import SearchInput from "@/components/common/SearchInput";
import FilterSelect from "@/components/common/FilterSelect";
import { LEAD_SOURCES, LEAD_STATUS } from "@/data/constants";
import { getMarketers } from "@/services/customerService";

export default function LeadFilters({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="xl:max-w-xs xl:flex-1">
        <SearchInput
          value={value.q}
          onChange={set("q")}
          placeholder="جستجو با نام یا موبایل…"
        />
      </div>
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 xl:mx-0 xl:px-0">
        <FilterSelect
          value={value.status}
          onChange={set("status")}
          options={[
            { value: "all", label: "همه وضعیت‌ها" },
            ...Object.entries(LEAD_STATUS).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          ]}
        />
        <FilterSelect
          value={value.source}
          onChange={set("source")}
          className="min-w-[170px]"
          options={[
            { value: "all", label: "همه منابع" },
            ...Object.entries(LEAD_SOURCES).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          ]}
        />
        <FilterSelect
          value={value.owner}
          onChange={set("owner")}
          options={[
            { value: "all", label: "همه مالکان" },
            { value: "none", label: "بدون مالک" },
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
