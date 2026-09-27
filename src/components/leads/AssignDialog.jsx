import React, { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/common/Avatar";
import PriorityBanner from "./PriorityBanner";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";
import { assignLead, isClosed } from "@/services/leadService";
import { getMarketer, getMarketers } from "@/services/customerService";
import { useCurrentUser, useStore } from "@/services/store";

export default function AssignDialog({ lead, open, onOpenChange }) {
  const leads = useStore((s) => s.leads);
  const user = useCurrentUser();
  const [sel, setSel] = useState(lead.ownerId);
  const load = (id) =>
    leads.filter((l) => l.ownerId === id && !isClosed(l)).length;

  const save = () => {
    assignLead(lead.id, sel, user.marketerId);
    toast.success(`سرنخ به ${getMarketer(sel).name} تخصیص یافت`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] overflow-y-auto rounded-2xl sm:max-w-lg [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="text-start sm:text-start">
          <DialogTitle>تخصیص سرنخ «{lead.name}»</DialogTitle>
        </DialogHeader>
        {lead.sources.length > 1 && <PriorityBanner lead={lead} />}
        <div className="space-y-2">
          {getMarketers().map((m) => (
            <button
              key={m.id}
              onClick={() => setSel(m.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition",
                sel === m.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:bg-muted",
              )}
            >
              <Avatar name={m.name} className="h-11 w-11" />
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {m.name}
                  {m.id === lead.ownerId && (
                    <span className="ms-2 text-xs font-normal text-muted-foreground">
                      (مالک فعلی)
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {m.title} · {m.branch} · {toFa(load(m.id))} سرنخ باز
                </p>
              </div>
              {sel === m.id && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="h-11"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
          <Button
            className="h-11 px-6"
            disabled={!sel || sel === lead.ownerId}
            onClick={save}
          >
            تأیید تخصیص
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
