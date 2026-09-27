import { toJ, JMONTHS } from "./jalali";

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (v) => String(v ?? "").replace(/\d/g, (d) => FA[d]);
export const toEn = (v) =>
  String(v ?? "").replace(/[۰-۹]/g, (d) => FA.indexOf(d));

export const fmtDate = (iso) => {
  const [y, m, d] = toJ(new Date(iso));
  return toFa(`${d} ${JMONTHS[m - 1]} ${y}`);
};
export const fmtShort = (iso) => {
  const [y, m, d] = toJ(new Date(iso));
  return toFa(
    `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`,
  );
};
export const fmtMoney = (n) =>
  toFa(Math.round(n).toLocaleString("en-US")).replace(/,/g, "٬") + " ریال";
export const weekdayName = (date = new Date()) =>
  new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(date);

export const daysFrom = (n, h = 10) => {
  const d = new Date();
  d.setHours(h, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

export const dayDiff = (iso) => {
  const a = new Date(iso);
  a.setHours(0, 0, 0, 0);
  const b = new Date();
  b.setHours(0, 0, 0, 0);
  return Math.round((a - b) / 864e5);
};

export const relDay = (iso) => {
  const n = dayDiff(iso);
  if (n === 0) return "امروز";
  if (n === 1) return "فردا";
  if (n === -1) return "دیروز";
  return n > 0 ? `${toFa(n)} روز دیگر` : `${toFa(-n)} روز پیش`;
};
