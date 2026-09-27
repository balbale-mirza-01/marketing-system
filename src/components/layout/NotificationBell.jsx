import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Bell, CalendarDays, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";
import { notifications } from "@/data/notifications";

const TYPES = {
  lead: { icon: UserPlus, cls: "bg-sky-50 text-sky-700" },
  overdue: { icon: AlertTriangle, cls: "bg-rose-50 text-rose-700" },
  meeting: { icon: CalendarDays, cls: "bg-violet-50 text-violet-700" },
};

export default function NotificationBell() {
  const [read, setRead] = useState([]);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !read.includes(n.id)).length;

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute end-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {toFa(unread)}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] max-w-[360px] rounded-2xl p-0"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="font-semibold">اعلان‌ها</p>
          <button
            onClick={() => setRead(notifications.map((n) => n.id))}
            className="text-xs text-primary"
          >
            علامت‌گذاری همه به‌عنوان خوانده‌شده
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-1.5">
          {notifications.map((n) => {
            const t = TYPES[n.type];
            return (
              <DropdownMenuItem
                key={n.id}
                onSelect={() => {
                  setRead((r) => [...r, n.id]);
                  navigate(n.link);
                }}
                className="flex cursor-pointer items-start gap-3 rounded-xl p-3"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    t.cls,
                  )}
                >
                  <t.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-sm leading-6",
                      !read.includes(n.id) && "font-semibold",
                    )}
                  >
                    {n.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {n.time}
                  </span>
                </span>
                {!read.includes(n.id) && (
                  <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
