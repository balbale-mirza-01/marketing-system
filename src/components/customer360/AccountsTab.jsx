import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import AccountCard from "./AccountCard";
import AccountDialog from "./AccountDialog";

export default function AccountsTab({ c }) {
  const [selected, setSelected] = useState(null);
  if (!c.accounts.length) {
    return (
      <EmptyState
        icon={CreditCard}
        title="محصولی ثبت نشده است"
        text="این مشتری بالقوه است و هنوز از محصولات و خدمات بانک استفاده نمی‌کند."
      />
    );
  }
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {c.accounts.map((a) => (
          <AccountCard key={a.id} a={a} onClick={() => setSelected(a)} />
        ))}
      </div>
      <AccountDialog
        account={selected}
        customer={c}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
