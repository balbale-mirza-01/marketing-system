import React from "react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";

export default function CustomerAvatar({ c, className }) {
  if (c.type === "company") {
    return (
      <span
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
          className,
        )}
      >
        <Building2 className="h-[45%] w-[45%]" />
      </span>
    );
  }
  return <Avatar name={c.name} className={className} />;
}
