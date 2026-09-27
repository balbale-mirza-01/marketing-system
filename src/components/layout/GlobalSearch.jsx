import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/services/store";
import { searchAll } from "@/services/customerService";
import SearchResults from "./SearchResults";

export default function GlobalSearch() {
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [mobile, setMobile] = useState(false);
  const leads = useStore((s) => s.leads);
  const navigate = useNavigate();
  const results = useMemo(() => searchAll(q, leads), [q, leads]);
  const go = (to) => {
    navigate(to);
    setQ("");
    setMobile(false);
    setFocus(false);
  };

  return (
    <>
      <button
        onClick={() => setMobile(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted sm:hidden"
      >
        <Search className="h-5 w-5" />
      </button>
      <div
        className={cn(
          mobile
            ? "fixed inset-x-0 top-0 z-50 flex h-16 items-center gap-2 border-b bg-background px-4"
            : "hidden w-full max-w-md sm:block",
        )}
      >
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus={mobile}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 150)}
            placeholder="جستجوی مشتری یا سرنخ با نام یا موبایل…"
            className="h-10 w-full rounded-xl border bg-muted/50 pe-3 ps-9 text-sm outline-none transition focus:bg-background focus:ring-2 focus:ring-ring/20"
          />
          {focus && q && <SearchResults results={results} onPick={go} />}
        </div>
        {mobile && (
          <button
            onClick={() => setMobile(false)}
            className="px-2 text-sm text-muted-foreground"
          >
            انصراف
          </button>
        )}
      </div>
    </>
  );
}
