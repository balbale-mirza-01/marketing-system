import React from "react";
import SearchInput from "@/components/common/SearchInput";
import FilterSelect from "@/components/common/FilterSelect";
import { BRANCHES, CUSTOMER_STATUS, SEGMENTS } from "@/data/constants";

const opts = (all, list) => [{ value: "all", label: all }, ...list];

export default function CustomerFilters({ value, onChange }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="lg:max-w-sm lg:flex-1">
        <SearchInput
          value={value.q}
          onChange={set("q")}
          placeholder="جستجو با نام، موبایل یا کد/شناسه ملی…"
        />
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <FilterSelect
          value={value.type}
          onChange={set("type")}
          options={opts("همه انواع", [
            { value: "individual", label: "حقیقی" },
            { value: "company", label: "حقوقی" },
          ])}
        />
        <FilterSelect
          value={value.segment}
          onChange={set("segment")}
          options={opts(
            "همه بخش‌ها",
            SEGMENTS.map((s) => ({ value: s, label: s })),
          )}
        />
        <FilterSelect
          value={value.branch}
          onChange={set("branch")}
          options={opts(
            "همه شعب",
            BRANCHES.map((b) => ({ value: b, label: b })),
          )}
        />
        <FilterSelect
          value={value.status}
          onChange={set("status")}
          options={opts(
            "همه وضعیت‌ها",
            Object.entries(CUSTOMER_STATUS).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          )}
        />
      </div>
    </div>
  );
}
