import React from "react";
import { Network, Phone, Users } from "lucide-react";
import Section from "@/components/common/Section";
import Avatar from "@/components/common/Avatar";
import StatusBadge from "@/components/common/StatusBadge";
import RelationshipMap from "./RelationshipMap";
import { toFa } from "@/lib/fa";

export default function PersonsTab({ c }) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Section title="نقشه ارتباطات" icon={Network} className="lg:col-span-3">
        <RelationshipMap c={c} />
      </Section>
      <Section
        title="اشخاص مرتبط و تصمیم‌گیرندگان"
        icon={Users}
        className="lg:col-span-2"
      >
        <div className="space-y-3">
          {c.persons.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-xl border p-3"
            >
              <Avatar name={p.name} className="h-11 w-11" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{p.name}</p>
                  {p.signatory && (
                    <StatusBadge tone="teal" dot={false}>
                      صاحب امضا
                    </StatusBadge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{p.role}</p>
              </div>
              <a
                href={`tel:${p.phone}`}
                className="flex h-10 items-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-medium tabular-nums"
              >
                <Phone className="h-3.5 w-3.5" />
                {toFa(p.phone)}
              </a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
