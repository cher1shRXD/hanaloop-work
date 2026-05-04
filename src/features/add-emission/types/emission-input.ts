export type EmissionInput = {
  companyId: string;
  yearMonth: string;
  fuel: { source: string; factor: number; usage: number };
  electricity: { usage: number };
  material: { source: string; factor: number; weight: number };
  transport: { weight: number; distance: number };
};
