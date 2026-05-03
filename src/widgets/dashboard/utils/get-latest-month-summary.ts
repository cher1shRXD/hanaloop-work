import { Company } from "@/entities/company/types";

export type LatestMonthSummary = { month: string; total: number; delta: number | null };

export const getLatestMonthSummary = (companies: Company[]): LatestMonthSummary => {
  const map = new Map<string, number>();
  for (const c of companies)
    for (const e of c.emissions)
      map.set(e.yearMonth, (map.get(e.yearMonth) ?? 0) + e.emissions);

  const months = [...map.keys()].sort();
  const latest = months[months.length - 1];
  const prev   = months[months.length - 2];
  const latestTotal = Math.round(map.get(latest) ?? 0);
  const prevTotal   = prev ? (map.get(prev) ?? 0) : null;
  const delta = prevTotal ? Math.round(((latestTotal - prevTotal) / prevTotal) * 100) : null;
  const [, m] = latest.split("-");
  return { month: `${parseInt(m)}월`, total: latestTotal, delta };
};
