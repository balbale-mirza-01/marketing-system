import React from "react";
import { Contact, Landmark, Mail, MapPin, Phone, Tag } from "lucide-react";
import Section from "@/components/common/Section";
import InfoRow from "@/components/common/InfoRow";
import Avatar from "@/components/common/Avatar";
import { getMarketer } from "@/services/customerService";
import { toFa } from "@/lib/fa";

export default function BaseInfoPanel({ c }) {
  const m = getMarketer(c.marketerId);
  return (
    <Section title="اطلاعات پایه" icon={Contact}>
      <div className="divide-y">
        <InfoRow icon={Phone} label="تلفن همراه">
          <span className="tabular-nums">{toFa(c.phone)}</span>
        </InfoRow>
        {c.email && (
          <InfoRow icon={Mail} label="ایمیل">
            <span dir="ltr">{c.email}</span>
          </InfoRow>
        )}
        <InfoRow icon={MapPin} label="نشانی">
          {c.address}
        </InfoRow>
        <InfoRow icon={Landmark} label="شعبه">
          {c.branch}
        </InfoRow>
        <InfoRow icon={Tag} label="بخش مشتری">
          {c.segment}
        </InfoRow>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/60 p-3">
        <Avatar name={m.name} />
        <div>
          <p className="text-xs text-muted-foreground">
            مسئول ارتباط / بازاریاب
          </p>
          <p className="text-sm font-semibold">
            {m.name}{" "}
            <span className="font-normal text-muted-foreground">
              · {m.branch}
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
}
