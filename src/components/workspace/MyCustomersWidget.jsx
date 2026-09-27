import React from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import Section from "@/components/common/Section";
import StatusBadge from "@/components/common/StatusBadge";
import CustomerAvatar from "@/components/customers/CustomerAvatar";
import { CUSTOMER_STATUS } from "@/data/constants";
import { toFa } from "@/lib/fa";

export default function MyCustomersWidget({
  title,
  customers,
  total,
  className,
}) {
  return (
    <Section
      title={title}
      icon={Users}
      className={className}
      action={
        <Link to="/customers" className="text-sm font-medium text-primary">
          همه ({toFa(total)})
        </Link>
      }
    >
      <div className="-mx-2 space-y-1">
        {customers.map((c) => (
          <Link
            key={c.id}
            to={`/customers/${c.id}`}
            className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted"
          >
            <CustomerAvatar c={c} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.segment}</p>
            </div>
            <StatusBadge tone={CUSTOMER_STATUS[c.status].tone}>
              {CUSTOMER_STATUS[c.status].label}
            </StatusBadge>
          </Link>
        ))}
      </div>
    </Section>
  );
}
