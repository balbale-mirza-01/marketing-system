import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";

function PBtn({ active, disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition disabled:opacity-40",
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

export default function Pagination({ page, pages, setPage, total }) {
  if (!total) return null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <p className="text-muted-foreground">
        {toFa(total)} مورد · صفحه {toFa(page)} از {toFa(pages)}
      </p>
      <div className="flex items-center gap-1">
        <PBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
          <ChevronRight className="h-4 w-4" />
        </PBtn>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <PBtn key={n} active={n === page} onClick={() => setPage(n)}>
            {toFa(n)}
          </PBtn>
        ))}
        <PBtn disabled={page === pages} onClick={() => setPage(page + 1)}>
          <ChevronLeft className="h-4 w-4" />
        </PBtn>
      </div>
    </div>
  );
}
