export type Company = {
  id: string;
  name: string;
  country: string; // Country.code
  emissions: GhgEmission[];
};

export type GhgEmission = {
  yearMonth: string;  // "2025-01", "2025-02", "2025-03"
  source: string; // gasoline, lpg, diesel 등
  scope: 1 | 2 | 3; // 1: 직접배출, 2: 간접(에너지), 3: 기타 간접
  emissions: number; // CO2 환산 톤
};