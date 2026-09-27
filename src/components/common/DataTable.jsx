import React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import EmptyState from "./EmptyState";

function SortIcon({ active, dir }) {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
  return dir === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5" />
  );
}

export default function DataTable({
  columns,
  rows,
  onRowClick,
  renderCard,
  sort,
  onSort,
  emptyTitle = "موردی یافت نشد",
  emptyText,
}) {
  if (!rows.length)
    return (
      <EmptyState
        title={emptyTitle}
        text={emptyText || "فیلترها یا عبارت جستجو را تغییر دهید."}
      />
    );
  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border bg-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-4 py-3 text-start text-xs font-medium text-muted-foreground"
                >
                  {c.sortable ? (
                    <button
                      onClick={() => onSort(c.key)}
                      className="inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      {c.label}
                      <SortIcon active={sort?.key === c.key} dir={sort?.dir} />
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                onClick={() => onRowClick?.(r)}
                className="cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/40"
              >
                {columns.map((c) => (
                  <td key={c.key} className="whitespace-nowrap px-4 py-3.5">
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 md:hidden">
        {rows.map((r) => (
          <button
            key={r.id}
            onClick={() => onRowClick?.(r)}
            className="w-full rounded-2xl border bg-card p-4 text-start transition active:scale-[0.99]"
          >
            {renderCard(r)}
          </button>
        ))}
      </div>
    </>
  );
}
