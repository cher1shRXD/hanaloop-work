import { Company } from "@/entities/company/types";

export type SourceRow = { source: string; total: number; scope: 1 | 2 | 3 };

export const getSourceData = (companies: Company[]): SourceRow[] => {
  const map = new Map<string, { total: number; scope: 1 | 2 | 3 }>();
  for (const c of companies)
    for (const e of c.emissions) {
      const prev = map.get(e.source);
      map.set(e.source, { total: (prev?.total ?? 0) + e.emissions, scope: e.scope });
    }
  return [...map.entries()]
    .map(([source, { total, scope }]) => ({ source, total: Math.round(total), scope }))
    .sort((a, b) => b.total - a.total);
};
