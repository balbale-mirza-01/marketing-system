import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import CustomerFilters from "@/components/customers/CustomerFilters";
import CustomerCard from "@/components/customers/CustomerCard";
import { customerColumns } from "@/components/customers/customerColumns";
import {
  filterCustomers,
  getCustomers,
  getMarketer,
} from "@/services/customerService";
import useTableState from "@/hooks/useTableState";
import { toFa } from "@/lib/fa";

const INIT = {
  q: "",
  type: "all",
  segment: "all",
  branch: "all",
  status: "all",
};

export default function Customers() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INIT);
  const rows = useMemo(
    () => filterCustomers(getCustomers(), filters),
    [filters],
  );
  const t = useTableState(rows, {
    marketer: (r) => getMarketer(r.marketerId)?.name,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="مشتریان"
        subtitle={`${toFa(getCustomers().length)} مشتری و مشتری بالقوه — حقیقی، شرکتی و اصناف`}
      />
      <CustomerFilters value={filters} onChange={setFilters} />
      <DataTable
        columns={customerColumns}
        rows={t.rows}
        sort={t.sort}
        onSort={t.onSort}
        onRowClick={(r) => navigate(`/customers/${r.id}`)}
        renderCard={(r) => <CustomerCard c={r} />}
      />
      <Pagination {...t} />
    </div>
  );
}
