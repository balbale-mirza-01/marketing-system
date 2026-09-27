import React, { useState } from "react";
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
import SourceCheckboxes from "./SourceCheckboxes";
import { createLead } from "@/services/leadService";
import { getMarketers } from "@/services/customerService";
import { useCurrentUser } from "@/services/store";
import { toEn } from "@/lib/fa";

const EMPTY = {
  name: "",
  phone: "",
  type: "individual",
  sources: [],
  interest: "",
  ownerId: "none",
  nextFollowUp: null,
  notes: "",
};

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export default function LeadFormDialog({ open, onOpenChange }) {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const user = useCurrentUser();
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const phone = toEn(f.phone.trim());
    const er = {};
    if (!f.name.trim()) er.name = "نام الزامی است";
    if (!/^09\d{9}$/.test(phone))
      er.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
    if (!f.sources.length) er.sources = "حداقل یک منبع ارجاع را انتخاب کنید";
    setErr(er);
    if (Object.keys(er).length) return;
    const id = createLead({
      ...f,
      name: f.name.trim(),
      phone,
      interest: f.interest.trim() || "نامشخص",
      ownerId: f.ownerId === "none" ? null : f.ownerId,
      by: user.marketerId,
    });
    toast.success("سرنخ جدید با موفقیت ثبت شد");
    setF(EMPTY);
    onOpenChange(false);
    navigate(`/leads/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] overflow-y-auto rounded-2xl sm:max-w-xl [&>button]:left-4 [&>button]:right-auto"
      >
        <DialogHeader className="text-start sm:text-start">
          <DialogTitle>ثبت سرنخ جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="نام مشتری / شرکت" error={err.name}>
              <Input
                className="h-11"
                value={f.name}
                onChange={(e) => set("name")(e.target.value)}
              />
            </Field>
            <Field label="تلفن همراه" error={err.phone}>
              <Input
                className="h-11 text-start"
                inputMode="tel"
                dir="ltr"
                placeholder="09xxxxxxxxx"
                value={f.phone}
                onChange={(e) => set("phone")(e.target.value)}
              />
            </Field>
            <Field label="نوع مشتری">
              <FilterSelect
                value={f.type}
                onChange={set("type")}
                className="h-11 w-full"
                options={[
                  { value: "individual", label: "حقیقی" },
                  { value: "company", label: "حقوقی / شرکتی" },
                ]}
              />
            </Field>
            <Field label="محصول مورد علاقه">
              <Input
                className="h-11"
                value={f.interest}
                onChange={(e) => set("interest")(e.target.value)}
                placeholder="مثلاً تسهیلات خرد"
              />
            </Field>
          </div>
          <Field label="منبع ارجاع (امکان انتخاب چند منبع)" error={err.sources}>
            <SourceCheckboxes value={f.sources} onChange={set("sources")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="تخصیص به بازاریاب">
              <FilterSelect
                value={f.ownerId}
                onChange={set("ownerId")}
                className="h-11 w-full"
                options={[
                  { value: "none", label: "فعلاً بدون مالک" },
                  ...getMarketers().map((m) => ({
                    value: m.id,
                    label: m.name,
                  })),
                ]}
              />
            </Field>
            <Field label="تاریخ پیگیری بعدی">
              <JalaliDatePicker
                value={f.nextFollowUp}
                onChange={set("nextFollowUp")}
              />
            </Field>
          </div>
          <Field label="یادداشت">
            <Textarea
              value={f.notes}
              onChange={(e) => set("notes")(e.target.value)}
              rows={3}
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
              ثبت سرنخ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
