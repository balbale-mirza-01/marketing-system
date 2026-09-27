import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Send, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import BlockRenderer from "@/components/catalog/BlockRenderer";
import SendToCustomerDialog from "@/components/catalog/SendToCustomerDialog";
import { getCatalogItem } from "@/services/catalogService";
import { CATEGORIES } from "@/data/catalog";
import { fmtDate } from "@/lib/fa";

export default function CatalogDetail() {
  const { id } = useParams();
  const item = getCatalogItem(id);
  const [sending, setSending] = useState(false);

  if (!item) return <EmptyState icon={SearchX} title="محصول یافت نشد" />;

  const cat = CATEGORIES[item.category];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-sm text-muted-foreground">{cat.label}</p>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold sm:text-[28px]">{item.name}</h1>
            <StatusBadge tone={item.status === "approved" ? "green" : "amber"}>
              {item.status === "approved" ? "تأییدشده" : "پیش‌نویس"}
            </StatusBadge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            آخرین به‌روزرسانی: {fmtDate(item.updatedAt)}
          </p>
        </div>
        <Button
          onClick={() => setSending(true)}
          className="h-12 rounded-xl px-6 text-base"
        >
          <Send className="h-4 w-4" />
          ارسال به مشتری
        </Button>
      </div>
      <BlockRenderer blocks={item.blocks} />
      <SendToCustomerDialog
        item={item}
        open={sending}
        onOpenChange={setSending}
      />
    </div>
  );
}
