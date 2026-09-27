import { customers } from "@/data/customers";
import { marketers } from "@/data/marketers";
import { toEn } from "@/lib/fa";

export const getCustomers = () => customers;
export const getCustomer = (id) => customers.find((c) => c.id === id);
export const getMarketers = () => marketers;
export const getMarketer = (id) => marketers.find((m) => m.id === id);

export function filterCustomers(list, f) {
  const q = toEn(f.q.trim());
  return list.filter(
    (c) =>
      (!q ||
        c.name.includes(q) ||
        c.phone.includes(q) ||
        c.nationalId.includes(q)) &&
      (f.type === "all" || c.type === f.type) &&
      (f.segment === "all" || c.segment === f.segment) &&
      (f.branch === "all" || c.branch === f.branch) &&
      (f.status === "all" || c.status === f.status),
  );
}

export function searchAll(query, leads) {
  const q = toEn(query.trim());
  if (!q) return { customers: [], leads: [] };
  const match = (x) => x.name.includes(q) || x.phone.includes(q);
  return {
    customers: customers.filter(match).slice(0, 5),
    leads: leads.filter(match).slice(0, 5),
  };
}
