import React from "react";
import { Check, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";
import { actions, useCurrentUser } from "@/services/store";
import { ROLES } from "@/data/marketers";
import Avatar from "@/components/common/Avatar";

export default function UserMenu() {
  const user = useCurrentUser();
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl p-1 pe-2 hover:bg-muted">
          <Avatar name={user.name} />
          <span className="hidden text-start md:block">
            <span className="block text-sm font-semibold leading-5">
              {user.name}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {user.label}
            </span>
          </span>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-2xl p-1.5">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          تغییر نقش نمایشی
        </DropdownMenuLabel>
        {Object.entries(ROLES).map(([key, r]) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => actions.setRole(key)}
            className="cursor-pointer gap-2 rounded-lg py-2"
          >
            <span className="flex-1">
              <span className="block text-sm">{r.label}</span>
              <span className="text-xs text-muted-foreground">{r.name}</span>
            </span>
            {user.role === key && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => base44.auth.logout()}
          className="cursor-pointer gap-2 rounded-lg text-rose-600"
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
