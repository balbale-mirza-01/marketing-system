import React, { useState } from "react";
import { ClipboardCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Section from "@/components/common/Section";
import { updateLeadFields } from "@/services/leadService";

export default function QualificationCard({ lead }) {
  const [notes, setNotes] = useState(lead.notes);
  const [reason, setReason] = useState(lead.lostReason);
  const save = (patch, msg) => {
    updateLeadFields(lead.id, patch);
    toast.success(msg);
  };

  return (
    <Section title="یادداشت‌های ارزیابی" icon={ClipboardCheck}>
      <Textarea
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="نتیجه ارزیابی و شرایط مشتری را ثبت کنید…"
      />
      <div className="mt-2 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          disabled={notes === lead.notes}
          onClick={() => save({ notes }, "یادداشت ارزیابی ذخیره شد")}
        >
          ذخیره یادداشت
        </Button>
      </div>
      {lead.status === "lost" && (
        <div className="mt-4 rounded-2xl bg-rose-50/70 p-4 ring-1 ring-rose-200">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-800">
            <XCircle className="h-4 w-4" />
            دلیل از دست رفتن
          </p>
          {!lead.lostReason && (
            <p className="mb-2 text-xs text-rose-700">
              لطفاً دلیل از دست رفتن این سرنخ را ثبت کنید.
            </p>
          )}
          <Textarea
            rows={2}
            className="bg-white"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="مثلاً: نرخ سود بانک رقیب بالاتر بود"
          />
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              disabled={!reason.trim() || reason === lead.lostReason}
              onClick={() =>
                save({ lostReason: reason.trim() }, "دلیل از دست رفتن ثبت شد")
              }
            >
              ثبت دلیل
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
