import React from "react";
import { cn } from "@/lib/utils";

export default function Section({
  title,
  icon: Icon,
  action,
  children,
  className,
}) {
  return (
    <section className={cn("rounded-2xl border bg-card p-5", className)}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-semibold">
            {Icon && <Icon className="h-4 w-4 text-primary" />}
            {title}
          </h3>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
