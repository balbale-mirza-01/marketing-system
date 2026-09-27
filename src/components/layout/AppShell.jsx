import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Sidebar className="fixed inset-y-0 start-0 z-40 hidden w-64 lg:flex" />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-72 border-0 p-0 [&>button]:left-4 [&>button]:right-auto [&>button]:text-white"
        >
          <Sidebar className="flex h-full" onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex min-h-screen flex-col lg:ps-64">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:pb-12">
          <Outlet />
        </main>
      </div>
      <MobileNav onMenu={() => setOpen(true)} />
      <Toaster
        position="top-center"
        dir="rtl"
        richColors
        toastOptions={{ style: { fontFamily: "Vazirmatn" } }}
      />
    </div>
  );
}
