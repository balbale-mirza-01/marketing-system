import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FilterSelect from "@/components/common/FilterSelect";
import JalaliDatePicker from "@/components/common/JalaliDatePicker";
import { addFollowup } from "@/services/leadService";
import { useCurrentUser } from "@/services/store";

const CHANNELS = ["تلفن", "حضوری", "پیامک", "ایمیل"].map((c) => ({
  value: c,
  label: c,
}));

export default function FollowupForm({ lead }) {
  const user = useCurrentUser();
  const [note, setNote] = useState("");
  const [channel, setChannel] = useState("تلفن");
  const [next, setNext] = useState(null);

  const submit = () => {
    addFollowup(lead.id, {
      note: note.trim(),
      channel,
      by: user.marketerId || lead.ownerId,
      nextFollowUp: next,
    });
    setNote("");
    setNext(null);
    toast.success("پیگیری ثبت شد");
  };

  return (
    <div className="space-y-3 rounded-2xl bg-muted/50 p-4">
      <Textarea
        rows={2}
        className="bg-card"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="شرح پیگیری انجام‌شده…"
      />
      <div className="grid gap-2 sm:grid-cols-[auto_1fr_auto]">
        <FilterSelect
          value={channel}
          onChange={setChannel}
          options={CHANNELS}
          className="h-10 w-full sm:w-32"
        />
        <JalaliDatePicker
          value={next}
          onChange={setNext}
          placeholder="پیگیری بعدی (اختیاری)"
        />
        <Button disabled={!note.trim()} onClick={submit} className="h-10">
          ثبت پیگیری
        </Button>
      </div>
    </div>
  );
}
