import React from "react";
import { Menu } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export default function Topbar({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-10">
        <button
          onClick={onMenu}
          className="-ms-2 flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <GlobalSearch />
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
