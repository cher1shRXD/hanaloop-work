import { Company } from "@/entities/company/types";

export type ScopeRow = { scope: number; total: number };

export const getScopeData = (companies: Company[]): ScopeRow[] => {
  const map = new Map<number, number>();
  for (const c of companies)
    for (const e of c.emissions)
      map.set(e.scope, (map.get(e.scope) ?? 0) + e.emissions);
  return [1, 2, 3].map((s) => ({ scope: s, total: Math.round(map.get(s) ?? 0) }));
};
