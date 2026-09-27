import React from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toFa } from "@/lib/fa";

function HeroBlock({ block }) {
  return (
    <div className="rounded-2xl bg-gradient-to-l from-primary/5 to-accent p-6 sm:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{block.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {block.subtitle}
      </p>
    </div>
  );
}

function DescriptionBlock({ block }) {
  return (
    <p className="text-sm leading-8 text-muted-foreground sm:text-[15px]">
      {block.text}
    </p>
  );
}

function RateTableBlock({ block }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">{block.title}</h3>
      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <tbody>
            {block.rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-muted/30" : ""}>
                <td className="px-4 py-3 text-muted-foreground">{r.label}</td>
                <td className="px-4 py-3 font-semibold">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentBlock({ block }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
        <FileText className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold">{block.docTitle}</p>
        <p className="text-xs text-muted-foreground">
          فرمت {block.docType} · {toFa(block.docSize)} مگابایت
        </p>
      </div>
      <Button variant="outline" size="sm" className="h-9">
        <Download className="h-4 w-4" />
        دریافت
      </Button>
    </div>
  );
}

const RENDERERS = {
  hero: HeroBlock,
  description: DescriptionBlock,
  rateTable: RateTableBlock,
  document: DocumentBlock,
};

export default function BlockRenderer({ blocks }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        const R = RENDERERS[b.type];
        return R ? <R key={i} block={b} /> : null;
      })}
    </div>
  );
}
