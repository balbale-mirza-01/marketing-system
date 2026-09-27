import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navItems";

const MAIN = NAV_ITEMS.slice(0, 4);

export default function MobileNav({ onMenu }) {
  const item =
    "flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {MAIN.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === "/"}
            className={({ isActive }) =>
              cn(item, isActive ? "text-primary" : "text-muted-foreground")
            }
          >
            <i.icon className="h-5 w-5" />
            {i.label}
          </NavLink>
        ))}
        <button onClick={onMenu} className={cn(item, "text-muted-foreground")}>
          <Menu className="h-5 w-5" />
          منو
        </button>
      </div>
    </nav>
  );
}
