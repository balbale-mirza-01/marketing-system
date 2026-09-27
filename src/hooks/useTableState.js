import { useEffect, useMemo, useState } from "react";

export default function useTableState(rows, getters = {}, pageSize = 10) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const g = getters[sort.key] || ((r) => r[sort.key]);
    return [...rows].sort((a, b) => {
      const x = g(a) ?? "",
        y = g(b) ?? "";
      const c =
        typeof x === "number"
          ? x - y
          : String(x).localeCompare(String(y), "fa");
      return sort.dir === "asc" ? c : -c;
    });
  }, [rows, sort]);

  useEffect(() => setPage(1), [rows]);

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pages);
  const onSort = (key) =>
    setSort((s) => ({
      key,
      dir: s.key === key && s.dir === "asc" ? "desc" : "asc",
    }));

  return {
    rows: sorted.slice((current - 1) * pageSize, current * pageSize),
    sort,
    onSort,
    page: current,
    pages,
    setPage,
    total: sorted.length,
    pageSize,
  };
}
