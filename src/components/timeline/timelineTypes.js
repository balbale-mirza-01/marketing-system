import {
  MessageSquare,
  CreditCard,
  PhoneCall,
  Users,
  BookOpen,
  FileText,
  StickyNote,
  Activity,
  CheckSquare,
} from "lucide-react";

export const TIMELINE_TYPES = {
  interaction: {
    label: "تعامل",
    icon: MessageSquare,
    cls: "bg-sky-50 text-sky-700 ring-sky-200",
    chip: "bg-sky-50 text-sky-700",
  },
  product: {
    label: "تغییر محصول",
    icon: CreditCard,
    cls: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    chip: "bg-emerald-50 text-emerald-700",
  },
  followup: {
    label: "پیگیری",
    icon: PhoneCall,
    cls: "bg-amber-50 text-amber-700 ring-amber-200",
    chip: "bg-amber-50 text-amber-700",
  },
  meeting: {
    label: "جلسه",
    icon: Users,
    cls: "bg-violet-50 text-violet-700 ring-violet-200",
    chip: "bg-violet-50 text-violet-700",
  },
  catalog: {
    label: "ارسال کاتالوگ",
    icon: BookOpen,
    cls: "bg-teal-50 text-teal-700 ring-teal-200",
    chip: "bg-teal-50 text-teal-700",
  },
  content: {
    label: "ارسال محتوا",
    icon: FileText,
    cls: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    chip: "bg-indigo-50 text-indigo-700",
  },
  note: {
    label: "یادداشت",
    icon: StickyNote,
    cls: "bg-slate-100 text-slate-700 ring-slate-200",
    chip: "bg-slate-100 text-slate-700",
  },
  status: {
    label: "تغییر وضعیت",
    icon: Activity,
    cls: "bg-rose-50 text-rose-700 ring-rose-200",
    chip: "bg-rose-50 text-rose-700",
  },
  task: {
    label: "وظیفه",
    icon: CheckSquare,
    cls: "bg-sky-50 text-sky-700 ring-sky-200",
    chip: "bg-sky-50 text-sky-700",
  },
};
