import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FilterSelect from "@/components/common/FilterSelect";
import JalaliDatePicker from "@/components/common/JalaliDatePicker";
import CustomerPicker from "@/components/common/CustomerPicker";
import { createTask } from "@/services/taskService";
import { getMarketers } from "@/services/customerService";
import { useCurrentUser } from "@/services/store";
import { TASK_TYPES } from "@/data/tasks";

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export default function TaskFormDialog({
  open,
  onOpenChange,
  preselectCustomerId,
}) {
  const user = useCurrentUser();
  const init = () => ({
    title: "",
    type: "call",
    customerId: preselectCustomerId || null,
    dueDate: null,
    ownerId: user.marketerId || "none",
    notes: "",
  });
  const [f, setF] = useState(init);
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (open) {
      setF(init());
      setErr({});
    }
  }, [open, preselectCustomerId]);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.title.trim()) er.title = "عنوان الزامی است";
    if (!f.customerId) er.customer = "انتخاب مشتری الزامی است";
    if (!f.dueDate) er.dueDate = "تاریخ سررسید الزامی است";
    setErr(er);
    if (Object.keys(er).length) return;
    const id = createTask({
      ...f,
      title: f.title.trim(),
      ownerId: f.ownerId === "none" ? null : f.ownerId,
    });
    toast.success("وظیفه جدید ثبت شد");
    onOpenChange(false);
    navigate(`/tasks/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] overflow-y-auto rounded-2xl sm:max-w-xl [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="text-start sm:text-start">
          <DialogTitle>ثبت وظیفه جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Field label="عنوان وظیفه" error={err.title}>
            <Input
              className="h-11"
              value={f.title}
              onChange={(e) => set("title")(e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="نوع">
              <FilterSelect
                value={f.type}
                onChange={set("type")}
                className="h-11 w-full"
                options={Object.entries(TASK_TYPES).map(([k, v]) => ({
                  value: k,
                  label: v,
                }))}
              />
            </Field>
            <Field label="تخصیص به">
              <FilterSelect
                value={f.ownerId}
                onChange={set("ownerId")}
                className="h-11 w-full"
                options={[
                  { value: "none", label: "بدون مالک" },
                  ...getMarketers().map((m) => ({
                    value: m.id,
                    label: m.name,
                  })),
                ]}
              />
            </Field>
          </div>
          <Field label="تاریخ سررسید" error={err.dueDate}>
            <JalaliDatePicker value={f.dueDate} onChange={set("dueDate")} />
          </Field>
          <Field label="مشتری مرتبط" error={err.customer}>
            <CustomerPicker value={f.customerId} onChange={set("customerId")} />
          </Field>
          <Field label="توضیحات">
            <Textarea
              rows={2}
              value={f.notes}
              onChange={(e) => set("notes")(e.target.value)}
            />
          </Field>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>
            <Button type="submit" className="h-11 px-6">
              ثبت وظیفه
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
