import React from "react";
import StatusBadge from "@/components/common/StatusBadge";
import { isClosed, isOverdue } from "@/services/leadService";

export default function SlaBadge({ lead }) {
  if (isClosed(lead)) return <StatusBadge tone="gray">بسته‌شده</StatusBadge>;
  if (isOverdue(lead)) return <StatusBadge tone="red">معوق</StatusBadge>;
  return <StatusBadge tone="green">به‌موقع</StatusBadge>;
}
