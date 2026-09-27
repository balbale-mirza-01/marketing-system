export const BRANCHES = [
  "شعبه ولیعصر",
  "شعبه میرداماد",
  "شعبه شریعتی",
  "شعبه ونک",
  "شعبه تجریش",
  "شعبه سعادت‌آباد",
];
export const SEGMENTS = ["عادی", "طلایی", "ویژه", "شرکتی (SME)", "اصناف"];

export const CUSTOMER_STATUS = {
  active: { label: "فعال", tone: "green" },
  prospect: { label: "بالقوه", tone: "blue" },
  inactive: { label: "غیرفعال", tone: "gray" },
};

export const SIZE_BANDS = {
  micro: "خرد (کمتر از ۱۰ نفر)",
  small: "کوچک (۱۰ تا ۵۰ نفر)",
  medium: "متوسط (۵۰ تا ۲۵۰ نفر)",
};

export const SCORES = {
  high: { label: "بالا", tone: "green", level: 3 },
  medium: { label: "متوسط", tone: "amber", level: 2 },
  low: { label: "پایین", tone: "red", level: 1 },
};

export const LEAD_STATUS = {
  new: { label: "جدید", tone: "blue" },
  assigned: { label: "تخصیص‌یافته", tone: "teal" },
  contacted: { label: "تماس‌گرفته‌شده", tone: "amber" },
  qualified: { label: "واجد شرایط", tone: "violet" },
  converted: { label: "تبدیل‌شده", tone: "green" },
  lost: { label: "ازدست‌رفته", tone: "red" },
};

export const LEAD_SOURCES = {
  branch: { label: "شعبه", short: "شعبه", rank: 1 },
  regional: { label: "سرپرستی منطقه", short: "سرپرستی منطقه", rank: 2 },
  marketing: { label: "مدیریت بازاریابی", short: "مدیریت بازاریابی", rank: 3 },
  senior: { label: "ارجاع موردی مدیران ارشد", short: "مدیران ارشد", rank: 4 },
};

export const ACCOUNT_KINDS = {
  deposit: "سپرده",
  current: "جاری",
  loan: "تسهیلات",
  card: "کارت",
  service: "خدمت",
};

export const ACCOUNT_STATUS = {
  active: { label: "فعال", tone: "green" },
  blocked: { label: "مسدود موقت", tone: "amber" },
};
