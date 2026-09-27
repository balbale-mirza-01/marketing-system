import {
  LayoutDashboard,
  Users,
  Target,
  BookOpen,
  CheckSquare,
  CalendarDays,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "میز کار", icon: LayoutDashboard },
  { to: "/customers", label: "مشتریان", icon: Users },
  { to: "/leads", label: "سرنخ‌ها", icon: Target },
  { to: "/tasks", label: "وظایف", icon: CheckSquare },
  { to: "/meetings", label: "جلسات", icon: CalendarDays },
  { to: "/catalog", label: "کاتالوگ محصولات", icon: BookOpen },
];
