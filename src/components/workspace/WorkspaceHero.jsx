import React from "react";
import { motion } from "framer-motion";
import { fmtDate, weekdayName } from "@/lib/fa";

export default function WorkspaceHero({ user }) {
  const now = new Date().toISOString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-[#0b2436] via-[#0f3a52] to-[#11616a] p-6 text-white sm:p-8"
    >
      <div className="absolute -start-16 -top-16 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="absolute -bottom-20 end-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="relative">
        <p className="text-sm text-white/70">
          {weekdayName()}، {fmtDate(now)}
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          {user.name}، روز بخیر
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-7 text-white/75">
          {user.marketerId
            ? "سرنخ‌ها و مشتریان شما در یک نگاه — پیگیری‌های امروز و موارد معوق را از دست ندهید."
            : "نمای کلی سرنخ‌ها و مشتریان همه بازاریابان منطقه تحت سرپرستی شما."}
        </p>
        <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/20">
          {user.label}
        </span>
      </div>
    </motion.div>
  );
}
