import { Company } from "@/entities/company/types";
import { SCOPE_LABELS } from "../constants/scope-labels";
import { getMonthlyData } from "./get-monthly-data";
import { getCompanyData } from "./get-company-data";
import { getSourceData } from "./get-source-data";
import { getScopeData } from "./get-scope-data";
import { getLatestMonthSummary } from "./get-latest-month-summary";

export const processDashboardData = (companies: Company[], yearMonth?: string) => {
  const filteredCompanies = yearMonth
    ? companies.map((c) => ({
        ...c,
        emissions: c.emissions.filter((e) => e.yearMonth === yearMonth),
      }))
    : companies;

  const monthlyData = getMonthlyData(companies);
  const companyData = getCompanyData(filteredCompanies);
  const sourceData = getSourceData(filteredCompanies);
  const latestMonth = getLatestMonthSummary(filteredCompanies);
  const scopeData = getScopeData(filteredCompanies).map((d) => ({
    ...d,
    name: SCOPE_LABELS[d.scope],
  }));

  const grandTotal = companyData.reduce((s, c) => s + c.total, 0);
  const scopeTotal = scopeData.reduce((s, d) => s + d.total, 0);
  const topSource = sourceData[0];
  const scope1Pct =
    scopeTotal > 0
      ? Math.round(
          ((scopeData.find((d) => d.scope === 1)?.total ?? 0) / scopeTotal) * 100,
        )
      : 0;

  const scope1Sub = sourceData
    .filter((d) => d.scope === 1)
    .map((d) => d.source)
    .join(" · ");

  return {
    monthlyData,
    companyData,
    sourceData,
    scopeData,
    latestMonth,
    grandTotal,
    scopeTotal,
    topSource,
    scope1Pct,
    scope1Sub,
  };
};
