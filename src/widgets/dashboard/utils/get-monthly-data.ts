import { Company } from "@/entities/company/types";

export type MonthlyRow = { label: string; total: number; yearMonth: string };

export const getMonthlyData = (companies: Company[]): MonthlyRow[] => {
  const map = new Map<string, number>();
  for (const c of companies)
    for (const e of c.emissions)
      map.set(e.yearMonth, (map.get(e.yearMonth) ?? 0) + e.emissions);

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ym, total]) => ({
      label: `${parseInt(ym.split("-")[1])}월`,
      total: Math.round(total),
      yearMonth: ym,
    }));
};
