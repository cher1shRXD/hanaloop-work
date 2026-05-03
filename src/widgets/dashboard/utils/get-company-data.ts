import { Company } from "@/entities/company/types";

export type CompanyRow = { name: string; total: number };

export const getCompanyData = (companies: Company[]): CompanyRow[] =>
  companies.map((c) => ({
    name: c.name,
    total: Math.round(c.emissions.reduce((s, e) => s + e.emissions, 0)),
  }));
