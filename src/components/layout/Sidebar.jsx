import React from "react";
import { NavLink } from "react-router-dom";
import { Landmark, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/store";
import { NAV_ITEMS } from "./navItems";

export default function Sidebar({ className, onNavigate }) {
  const user = useCurrentUser();
  return (
    <aside className={cn("flex-col bg-[#0b2436] text-slate-300", className)}>
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-600 text-white shadow-lg shadow-teal-900/40">
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-white">بانک نمونه</p>
          <p className="text-[11px] text-slate-400">بازاریابی و مدیریت مشتری</p>
        </div>
      </div>
      <p className="px-6 pb-2 pt-4 text-[11px] font-medium text-slate-500">
        منوی اصلی
      </p>
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                isActive
                  ? "bg-white/10 font-semibold text-white"
                  : "hover:bg-white/5 hover:text-white",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute inset-y-2 start-0 w-1 rounded-full bg-teal-400" />
                )}
                <i.icon className="h-[18px] w-[18px]" />
                {i.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="m-3 rounded-2xl bg-white/5 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          نقش فعلی
        </div>
        <p className="mt-1 text-sm font-semibold text-white">{user.label}</p>
        <p className="mt-1 text-[11px] leading-5 text-slate-400">
          محتوای هر صفحه بر اساس نقش شما نمایش داده می‌شود.
        </p>
      </div>
      <p className="px-6 pb-5 text-[10px] text-slate-500">
        نسخه نمایشی — فاز ۱
      </p>
    </aside>
  );
}
